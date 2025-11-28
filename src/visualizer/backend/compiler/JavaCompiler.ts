/**
 * Java Compiler
 * 
 * Compiles Java source code on the server using javac
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFile, mkdir, readdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { CompilationResult, CompilationOptions } from './types'

const execAsync = promisify(exec)

export class JavaCompiler {
  private static readonly COMPILE_DIR = join(process.cwd(), 'tmp', 'compile')
  private static readonly MAX_COMPILE_TIME = 10000 // 10 seconds

  /**
   * Compiles Java source code
   */
  static async compile(
    sourceCode: string,
    tracePrinterCode: string,
    options: CompilationOptions = {}
  ): Promise<CompilationResult> {
    const compileId = uuidv4()
    const compileDir = join(this.COMPILE_DIR, compileId)
    
    try {
      // Create compile directory
      await mkdir(compileDir, { recursive: true })
      
      // Write source files
      const mainJavaPath = join(compileDir, 'Main.java')
      const tracePrinterPath = join(compileDir, 'TracePrinter.java')
      
      await writeFile(mainJavaPath, sourceCode, 'utf-8')
      await writeFile(tracePrinterPath, tracePrinterCode, 'utf-8')
      
      // Compile with javac
      // Use relative paths to avoid issues with spaces in paths
      const javacCommand = `javac -encoding UTF-8 Main.java TracePrinter.java`
      
      try {
        const { stdout, stderr } = await execAsync(javacCommand, {
          timeout: options.timeout || this.MAX_COMPILE_TIME,
          cwd: compileDir,
          maxBuffer: 1024 * 1024, // 1MB buffer
        })
        
        // Check if .class files were created
        const mainClassExists = existsSync(join(compileDir, 'Main.class'))
        const tracePrinterClassExists = existsSync(join(compileDir, 'TracePrinter.class'))
        
        if (!mainClassExists || !tracePrinterClassExists) {
          const errorMsg = stderr || stdout || 'Compilation failed - class files not created'
          console.error('[JavaCompiler] Compilation failed:', errorMsg)
          console.error('[JavaCompiler] Main.java preview:', sourceCode.substring(0, 200))
          return {
            success: false,
            classpath: compileDir,
            errors: [errorMsg],
            warnings: [],
          }
        }
        
        return {
          success: true,
          classpath: compileDir,
          errors: [],
          warnings: stderr ? [stderr] : [],
        }
      } catch (error: any) {
        const errorMsg = error.stderr || error.stdout || error.message || 'Compilation failed'
        console.error('[JavaCompiler] Compilation error:', errorMsg)
        console.error('[JavaCompiler] Error details:', error)
        return {
          success: false,
          classpath: compileDir,
          errors: [errorMsg],
          warnings: [],
        }
      }
    } catch (error: any) {
      return {
        success: false,
        classpath: '',
        errors: [`Failed to setup compilation: ${error.message}`],
        warnings: [],
      }
    }
  }
}

