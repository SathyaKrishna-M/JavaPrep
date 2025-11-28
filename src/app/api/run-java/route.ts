/**
 * Java Execution API
 * 
 * Server-side Java execution endpoint
 */

import { NextRequest, NextResponse } from 'next/server'
import { Injector } from '@/visualizer/backend/trace/Injector'
import { JavaCompiler } from '@/visualizer/backend/compiler/JavaCompiler'
import { JavaSandbox } from '@/visualizer/backend/sandbox/JavaSandbox'
import { TraceParser } from '@/visualizer/backend/trace/TraceParser'
import { ExecutionSnapshot } from '@/visualizer/core/tracking/Snapshot'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = body

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid request: code is required' },
        { status: 400 }
      )
    }

    // Ensure code has a Main class declaration
    let processedCode = code.trim()
    
    // Extract class name if it exists
    const classMatch = processedCode.match(/public\s+class\s+(\w+)/)
    const className = classMatch ? classMatch[1] : null
    
    // If no class or class is not Main, wrap/rename to Main
    if (!className || className !== 'Main') {
      if (className) {
        // Replace class name with Main
        processedCode = processedCode.replace(/public\s+class\s+\w+/, 'public class Main')
      } else {
        // Wrap in a Main class if no class declaration
        processedCode = `public class Main {
    ${processedCode}
}`
      }
    }

    // Step 1: Instrument code
    const instrumented = Injector.instrument(processedCode)
    
    if (instrumented.errors.length > 0) {
      console.error('[run-java] Instrumentation errors:', instrumented.errors)
      return NextResponse.json(
        {
          success: false,
          error: 'Instrumentation failed',
          errors: instrumented.errors,
        },
        { status: 400 }
      )
    }

    // Step 2: Compile
    const compileResult = await JavaCompiler.compile(
      instrumented.instrumentedCode,
      instrumented.tracePrinterCode
    )

    if (!compileResult.success) {
      console.error('[run-java] Compilation errors:', compileResult.errors)
      console.error('[run-java] Full instrumented code:')
      console.error(instrumented.instrumentedCode)
      console.error('[run-java] Original code:')
      console.error(processedCode)
      return NextResponse.json(
        {
          success: false,
          error: 'Compilation failed',
          errors: compileResult.errors,
          warnings: compileResult.warnings,
          instrumentedCodePreview: instrumented.instrumentedCode.substring(0, 2000), // For debugging
        },
        { status: 400 }
      )
    }

    // Step 3: Execute in sandbox
    const execResult = await JavaSandbox.execute(compileResult.classpath)

    if (!execResult.success && !execResult.timedOut) {
      return NextResponse.json(
        {
          success: false,
          error: 'Execution failed',
          errors: [execResult.error || `Exit code: ${execResult.exitCode}`],
          stdout: execResult.stdout,
          stderr: execResult.stderr,
        },
        { status: 500 }
      )
    }

    // Step 4: Parse trace
    const parsed = TraceParser.parse(execResult.stderr, execResult.stdout)

    // Step 5: Return snapshots
    return NextResponse.json({
      success: true,
      snapshots: parsed.snapshots,
      output: parsed.output,
      errors: parsed.errors,
      warnings: [...instrumented.warnings, ...compileResult.warnings],
      timedOut: execResult.timedOut,
    })
  } catch (error: any) {
    console.error('[run-java] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

