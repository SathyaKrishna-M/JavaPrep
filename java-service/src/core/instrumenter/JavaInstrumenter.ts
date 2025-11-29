/**
 * Java Code Instrumentation Module
 * 
 * This module handles parsing Java source code and injecting tracking hooks
 * for step-by-step execution visualization.
 * 
 * Milestone B: Full instrumentation implementation
 */

import { InstrumentationError, UnsupportedFeatureError } from '../../utils/errors'
import { isExecutableNode, extractVariableNames, getNodeType } from '../../utils/ast-utils'
import { 
  injectHook, 
  buildTrackingCall, 
  wrapSystemOut,
  buildObjectCreatedTracking,
  buildFieldWriteTracking,
  buildArrayCreateTracking,
  buildCollectionEventTracking,
  buildMethodReturnTracking,
  buildExceptionTracking,
  buildTryCatchEnterTracking,
  buildFinallyEnterTracking,
  buildStaticInitTracking,
  buildThisReferenceTracking,
} from '../../utils/instrumentation-helpers'

export interface InstrumentationResult {
  instrumentedCode: string
  lineMapping: LineMap
  metadata: InstrumentationMetadata
  hooks: HookInfo[]
}

export interface LineMap {
  originalToInstrumented: Map<number, number[]> // original line -> instrumented lines
  instrumentedToOriginal: Map<number, number> // instrumented line -> original line
}

export interface HookInfo {
  originalLine: number
  instrumentedLine: number
  hookType: 'statement' | 'method_entry' | 'method_exit' | 'variable_assign' | 'object_create' | 'output'
  metadata?: Record<string, any>
}

export interface InstrumentationMetadata {
  warnings: string[]
  complexityEstimate: number
  methodCount: number
  classCount: number
  loopCount: number
  maxNestingDepth: number
  hasRecursion: boolean
  unsupportedFeatures: string[]
}

export class JavaInstrumenter {
  private lineMap: LineMap
  private hooks: HookInfo[]
  private metadata: InstrumentationMetadata
  private currentLineOffset: number
  private originalLines: string[]
  private instrumentedLines: string[]

  constructor() {
    this.lineMap = {
      originalToInstrumented: new Map(),
      instrumentedToOriginal: new Map(),
    }
    this.hooks = []
    this.metadata = {
      warnings: [],
      complexityEstimate: 0,
      methodCount: 0,
      classCount: 0,
      loopCount: 0,
      maxNestingDepth: 0,
      hasRecursion: false,
      unsupportedFeatures: [],
    }
    this.currentLineOffset = 0
    this.originalLines = []
    this.instrumentedLines = []
  }

  /**
   * Main instrumentation entry point
   * 
   * @param sourceCode - Original Java source code
   * @returns Instrumented code with line mapping and metadata
   */
  static instrument(sourceCode: string): InstrumentationResult {
    const instrumenter = new JavaInstrumenter()
    return instrumenter.instrumentCode(sourceCode)
  }

  /**
   * Instruments Java source code by injecting tracking hooks
   * 
   * @param sourceCode - Original Java source code
   * @returns Instrumentation result with instrumented code, line mapping, and metadata
   */
  private instrumentCode(sourceCode: string): InstrumentationResult {
    try {
      // Step 1: Validate and preprocess
      this.validateCode(sourceCode)
      this.originalLines = sourceCode.split('\n')
      
      // Step 2: Detect unsupported features
      this.detectUnsupportedFeatures(sourceCode)
      
      // Step 3: Parse AST (simplified parser for common cases)
      const ast = this.parseAST(sourceCode)
      
      // Step 4: Walk AST and instrument
      this.instrumentAST(ast, sourceCode)
      
      // Step 5: Wrap System.out calls (REPLACE, not append)
      // This must happen after all line injections to maintain correct line mapping
      this.wrapSystemOutCalls()
      
      // Step 6: Milestone D - Instrument advanced features
      this.instrumentTryCatchFinally(sourceCode)
      this.instrumentStaticInitializers(sourceCode)
      
      // Step 7: Build final instrumented code
      const instrumentedCode = this.instrumentedLines.join('\n')
      
      // Debug: Log instrumented code if VERBOSE mode
      if (process.env.NEXT_PUBLIC_VERBOSE_SNAPSHOTS === 'true') {
        console.log('[JavaInstrumenter] Instrumented code:', instrumentedCode)
        console.log('[JavaInstrumenter] Total hooks:', this.hooks.length)
        console.log('[JavaInstrumenter] Line mapping:', Array.from(this.lineMap.originalToInstrumented.entries()))
      }
      
      // Step 7: Extract metadata
      this.extractMetadata(sourceCode)
      
      return {
        instrumentedCode,
        lineMapping: this.lineMap,
        metadata: this.metadata,
        hooks: this.hooks,
      }
    } catch (error: any) {
      if (error instanceof InstrumentationError) {
        throw error
      }
      throw new InstrumentationError(`Instrumentation failed: ${error.message}`, error)
    }
  }

  /**
   * Validates Java code structure
   */
  private validateCode(sourceCode: string): void {
    if (!sourceCode || !sourceCode.trim()) {
      throw new InstrumentationError('Empty source code provided')
    }

    // Check for basic Java structure
    if (!sourceCode.includes('class ') && !sourceCode.includes('public class ')) {
      throw new InstrumentationError('Code must contain at least one class declaration')
    }

    // Check for main method (not required, but common)
    if (!sourceCode.includes('main(') && !sourceCode.includes('public static void main')) {
      this.metadata.warnings.push('No main method found. Execution may require manual invocation.')
    }
  }

  /**
   * Detects unsupported Java features
   */
  private detectUnsupportedFeatures(sourceCode: string): void {
    const unsupported = [
      { pattern: /System\.exit\s*\(/g, feature: 'System.exit()', message: 'System.exit() is not supported in the visualizer' },
      { pattern: /Thread\.(start|sleep|join|wait|notify)/g, feature: 'Threading', message: 'Thread operations are not supported' },
      { pattern: /\.getClass\(\)|Class\.forName|\.newInstance\(\)/g, feature: 'Reflection', message: 'Reflection APIs are not supported' },
      { pattern: /File(Reader|Writer|InputStream|OutputStream)/g, feature: 'File I/O', message: 'File I/O operations are not supported' },
      { pattern: /sun\.misc\.Unsafe|Unsafe\./g, feature: 'Unsafe API', message: 'Unsafe APIs are not supported' },
      { pattern: /native\s+\w+\s+\w+\s*\(/g, feature: 'Native methods', message: 'Native methods are not supported' },
      { pattern: /Runtime\.getRuntime\(\)/g, feature: 'Runtime execution', message: 'Runtime execution is not supported' },
    ]

    unsupported.forEach(({ pattern, feature, message }) => {
      if (pattern.test(sourceCode)) {
        this.metadata.unsupportedFeatures.push(feature)
        throw new UnsupportedFeatureError(feature, message)
      }
    })
  }

  /**
   * Parses Java code into a simplified AST structure
   * 
   * TODO: Integrate full JavaParser library for complete AST support
   * Currently uses simplified parsing for common constructs
   */
  private parseAST(sourceCode: string): any {
    // Simplified AST structure for common Java constructs
    // In production, this would use JavaParser or similar library
    
    const lines = sourceCode.split('\n')
    const ast: any = {
      type: 'Program',
      classes: [],
      statements: [],
    }

    let inClass = false
    let inMethod = false
    let currentClass: any = null
    let currentMethod: any = null
    let braceDepth = 0
    let methodBraceDepth = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      const originalLine = i + 1

      // Skip empty lines and comments
      if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*')) {
        continue
      }

      // Detect class declaration
      if (line.match(/^(public\s+)?(final\s+)?class\s+\w+/)) {
        const className = line.match(/class\s+(\w+)/)?.[1]
        if (className) {
          currentClass = {
            type: 'Class',
            name: className,
            line: originalLine,
            methods: [],
            fields: [],
          }
          ast.classes.push(currentClass)
          inClass = true
          this.metadata.classCount++
        }
      }

      // Detect method declaration
      if (line.match(/(public|private|protected)?\s*(static)?\s*\w+\s+\w+\s*\(/)) {
        const methodMatch = line.match(/(\w+)\s*\(/)
        if (methodMatch && currentClass) {
          currentMethod = {
            type: 'Method',
            name: methodMatch[1],
            line: originalLine,
            statements: [],
          }
          currentClass.methods.push(currentMethod)
          inMethod = true
          this.metadata.methodCount++
          methodBraceDepth = 0
        }
      }

      // Detect executable statements
      // IMPORTANT: This must detect statements inside loop bodies too
      // We check if we're in a method OR inside a control flow block
      if (inMethod && currentMethod) {
        // Variable declaration
        if (line.match(/^(int|String|double|float|boolean|char|byte|short|long)\s+\w+/)) {
          currentMethod.statements.push({
            type: 'VariableDeclaration',
            line: originalLine,
            content: line,
          })
        }
        // Assignment
        else if (line.match(/\w+\s*=\s*[^=]/)) {
          currentMethod.statements.push({
            type: 'Assignment',
            line: originalLine,
            content: line,
          })
        }
        // System.out.print/println - treat as executable statement
        else if (line.match(/System\.out\.(print|println)/)) {
          currentMethod.statements.push({
            type: 'MethodCall',
            line: originalLine,
            content: line,
          })
        }
        // Method call (including System.out)
        else if (line.match(/\w+\s*\(/)) {
          currentMethod.statements.push({
            type: 'MethodCall',
            line: originalLine,
            content: line,
          })
        }
        // Object creation
        else if (line.match(/new\s+\w+/)) {
          currentMethod.statements.push({
            type: 'ObjectCreation',
            line: originalLine,
            content: line,
          })
        }
        // Control flow
        else if (line.match(/^(if|for|while|do)\s*\(/)) {
          currentMethod.statements.push({
            type: 'ControlFlow',
            line: originalLine,
            content: line,
          })
        }
        // Return statement
        else if (line.match(/^return\s+/)) {
          currentMethod.statements.push({
            type: 'Return',
            line: originalLine,
            content: line,
          })
        }
        // Expression statements (any statement ending with semicolon that's not already matched)
        // This catches statements inside loop bodies that might not match above patterns
        else if (line.match(/^[^}]+;\s*$/) && !line.match(/^(if|for|while|do|return|int|String|double|float|boolean|char|byte|short|long|new)\s/)) {
          currentMethod.statements.push({
            type: 'ExpressionStatement',
            line: originalLine,
            content: line,
          })
        }
      }

      // Track brace depth
      const openBraces = (line.match(/\{/g) || []).length
      const closeBraces = (line.match(/\}/g) || []).length
      braceDepth += openBraces - closeBraces
      
      if (inMethod) {
        methodBraceDepth += openBraces - closeBraces
        if (methodBraceDepth <= 0 && inMethod) {
          inMethod = false
          currentMethod = null
        }
      }
    }

    return ast
  }

  /**
   * Instruments the AST by injecting tracking hooks
   */
  private instrumentAST(ast: any, sourceCode: string): void {
    this.instrumentedLines = [...this.originalLines]
    this.currentLineOffset = 0

    // Process each class
    ast.classes.forEach((cls: any) => {
      // Process each method in the class
      cls.methods.forEach((method: any) => {
        // Instrument method entry
        this.injectMethodEntryHook(method.line, cls.name, method.name)

        // Process statements in the method
        method.statements.forEach((stmt: any) => {
          this.instrumentStatement(stmt, cls.name, method.name)
        })

        // Instrument method exit (find closing brace)
        const methodEndLine = this.findMethodEndLine(method.line, sourceCode)
        if (methodEndLine > 0) {
          this.injectMethodExitHook(methodEndLine, cls.name, method.name)
        }
      })
    })
  }

  /**
   * Instruments a single statement
   */
  private instrumentStatement(stmt: any, className: string, methodName: string): void {
    const originalLine = stmt.line
    const instrumentedLine = originalLine + this.currentLineOffset

    // Inject step tracking hook
    this.injectStepHook(originalLine, instrumentedLine)

    // Statement-specific instrumentation
    switch (stmt.type) {
      case 'VariableDeclaration':
        this.instrumentVariableDeclaration(stmt, originalLine, instrumentedLine)
        break
      case 'Assignment':
        this.instrumentAssignment(stmt, originalLine, instrumentedLine)
        break
      case 'ObjectCreation':
        this.instrumentObjectCreation(stmt, originalLine, instrumentedLine)
        break
      case 'ControlFlow':
        this.instrumentControlFlow(stmt, originalLine, instrumentedLine)
        break
      case 'MethodCall':
        // System.out calls are handled separately
        if (!stmt.content.includes('System.out')) {
          // Regular method call - just track step
        }
        break
    }
  }

  /**
   * Injects a step tracking hook
   */
  private injectStepHook(originalLine: number, instrumentedLine: number): void {
    const hookCode = buildTrackingCall('trackStep', [originalLine])
    this.insertLineBefore(instrumentedLine, hookCode)
    
    this.hooks.push({
      originalLine,
      instrumentedLine: instrumentedLine + this.currentLineOffset,
      hookType: 'statement',
    })

    this.updateLineMapping(originalLine, instrumentedLine + this.currentLineOffset)
    this.currentLineOffset++
  }

  /**
   * Injects method entry hook
   */
  private injectMethodEntryHook(line: number, className: string, methodName: string): void {
    const hookCode = buildTrackingCall('trackMethodEntry', [className, methodName, line])
    this.insertLineBefore(line + this.currentLineOffset, hookCode)
    
    this.hooks.push({
      originalLine: line,
      instrumentedLine: line + this.currentLineOffset,
      hookType: 'method_entry',
      metadata: { className, methodName },
    })

    this.currentLineOffset++
  }

  /**
   * Injects method exit hook
   */
  private injectMethodExitHook(line: number, className: string, methodName: string): void {
    const hookCode = buildTrackingCall('trackMethodExit', [className, methodName, line])
    this.insertLineBefore(line + this.currentLineOffset, hookCode)
    
    this.hooks.push({
      originalLine: line,
      instrumentedLine: line + this.currentLineOffset,
      hookType: 'method_exit',
      metadata: { className, methodName },
    })

    this.currentLineOffset++
  }

  /**
   * Instruments variable declaration
   */
  private instrumentVariableDeclaration(stmt: any, originalLine: number, instrumentedLine: number): void {
    const varMatch = stmt.content.match(/(\w+)\s+(\w+)\s*=?\s*(.*)/)
    if (varMatch) {
      const type = varMatch[1]
      const name = varMatch[2]
      const value = varMatch[3] || 'null'

      const hookCode = buildTrackingCall('trackVariable', [name, value, type])
      this.insertLineAfter(instrumentedLine + this.currentLineOffset, hookCode)
      
      this.hooks.push({
        originalLine,
        instrumentedLine: instrumentedLine + this.currentLineOffset + 1,
        hookType: 'variable_assign',
        metadata: { variableName: name, variableType: type },
      })

      this.currentLineOffset++
    }
  }

  /**
   * Instruments assignment statement
   */
  private instrumentAssignment(stmt: any, originalLine: number, instrumentedLine: number): void {
    const assignMatch = stmt.content.match(/(\w+)\s*=\s*(.+)/)
    if (assignMatch) {
      const name = assignMatch[1]
      const value = assignMatch[2]

      const hookCode = buildTrackingCall('trackVariable', [name, value, 'auto'])
      this.insertLineAfter(instrumentedLine + this.currentLineOffset, hookCode)
      
      this.hooks.push({
        originalLine,
        instrumentedLine: instrumentedLine + this.currentLineOffset + 1,
        hookType: 'variable_assign',
        metadata: { variableName: name },
      })

      this.currentLineOffset++
    }
  }

  /**
   * Instruments object creation
   * Milestone D: Enhanced with field tracking
   */
  private instrumentObjectCreation(stmt: any, originalLine: number, instrumentedLine: number): void {
    const newMatch = stmt.content.match(/new\s+(\w+)/)
    if (newMatch) {
      const className = newMatch[1]
      // Generate deterministic object ID
      const objectId = `obj_${originalLine}_${this.currentLineOffset}`
      
      // Try to extract field initializers if present
      const fieldMatch = stmt.content.match(/\{\s*([^}]+)\s*\}/)
      let shallowFields = '{}'
      if (fieldMatch) {
        // Parse field assignments: fieldName = value
        const fields: Record<string, string> = {}
        const fieldAssignments = fieldMatch[1].split(',').map((f: string) => f.trim())
        fieldAssignments.forEach((assign: string) => {
          const match = assign.match(/(\w+)\s*=\s*(.+)/)
          if (match) {
            fields[match[1]] = match[2].trim()
          }
        })
        shallowFields = JSON.stringify(fields)
      }

      // Use enhanced trackObjectCreated hook
      const hookCode = buildTrackingCall('trackObjectCreated', [objectId, className, shallowFields])
      this.insertLineAfter(instrumentedLine + this.currentLineOffset, hookCode)
      
      this.hooks.push({
        originalLine,
        instrumentedLine: instrumentedLine + this.currentLineOffset + 1,
        hookType: 'object_create',
        metadata: { className, objectId, fields: shallowFields },
      })

      this.currentLineOffset++
    }
  }

  /**
   * Instruments control flow statements
   */
  private instrumentControlFlow(stmt: any, originalLine: number, instrumentedLine: number): void {
    // Track nesting depth
    const nestingDepth = this.calculateNestingDepth(originalLine)
    this.metadata.maxNestingDepth = Math.max(this.metadata.maxNestingDepth, nestingDepth)

    if (stmt.content.match(/^(for|while|do)\s*\(/)) {
      this.metadata.loopCount++
      if (nestingDepth > 3) {
        this.metadata.warnings.push(`Deeply nested loop detected at line ${originalLine}. Performance may be affected.`)
      }
    }
  }

  /**
   * Replaces System.out.println and System.out.print calls with captureOutput
   * IMPORTANT: This REPLACES the original call (does not keep System.out.print)
   */
  private wrapSystemOutCalls(): void {
    for (let i = 0; i < this.instrumentedLines.length; i++) {
      const line = this.instrumentedLines[i]
      const wrapped = wrapSystemOut(line)
      
      if (wrapped !== line) {
        // Replace the line entirely
        this.instrumentedLines[i] = wrapped
        // Find original line number (accounting for injected hooks)
        const originalLine = this.findOriginalLineForInstrumentedLine(i + 1)
        if (originalLine) {
          this.hooks.push({
            originalLine,
            instrumentedLine: i + 1,
            hookType: 'output',
          })
        }
      }
    }
  }
  
  /**
   * Finds the original line number for an instrumented line
   */
  private findOriginalLineForInstrumentedLine(instrumentedLine: number): number | null {
    // Reverse lookup in line mapping
    const entries = Array.from(this.lineMap.instrumentedToOriginal.entries())
    for (const [orig, instr] of entries) {
      if (instr === instrumentedLine) {
        return orig
      }
    }
    // If not found, try to find closest original line
    // This is a fallback - ideally all lines should be mapped
    return null
  }

  /**
   * Inserts a line before the specified line number
   */
  private insertLineBefore(lineNum: number, code: string): void {
    const insertIndex = lineNum - 1
    this.instrumentedLines.splice(insertIndex, 0, code)
  }

  /**
   * Inserts a line after the specified line number
   */
  private insertLineAfter(lineNum: number, code: string): void {
    const insertIndex = lineNum
    this.instrumentedLines.splice(insertIndex, 0, code)
  }

  /**
   * Updates line mapping
   */
  private updateLineMapping(originalLine: number, instrumentedLine: number): void {
    if (!this.lineMap.originalToInstrumented.has(originalLine)) {
      this.lineMap.originalToInstrumented.set(originalLine, [])
    }
    this.lineMap.originalToInstrumented.get(originalLine)!.push(instrumentedLine)
    this.lineMap.instrumentedToOriginal.set(instrumentedLine, originalLine)
  }

  /**
   * Finds the end line of a method
   */
  private findMethodEndLine(startLine: number, sourceCode: string): number {
    const lines = sourceCode.split('\n')
    let braceDepth = 0
    let inMethod = false

    for (let i = startLine - 1; i < lines.length; i++) {
      const line = lines[i]
      const openBraces = (line.match(/\{/g) || []).length
      const closeBraces = (line.match(/\}/g) || []).length
      
      if (openBraces > 0) inMethod = true
      braceDepth += openBraces - closeBraces
      
      if (inMethod && braceDepth === 0) {
        return i + 1
      }
    }

    return -1
  }

  /**
   * Calculates nesting depth at a given line
   */
  private calculateNestingDepth(lineNum: number): number {
    let depth = 0
    const lines = this.originalLines.slice(0, lineNum)
    
    for (const line of lines) {
      const openBraces = (line.match(/\{/g) || []).length
      const closeBraces = (line.match(/\}/g) || []).length
      depth += openBraces - closeBraces
    }

    return Math.max(0, depth)
  }

  /**
   * Extracts metadata from the code
   */
  private extractMetadata(sourceCode: string): void {
    // Estimate complexity
    this.metadata.complexityEstimate = 
      this.metadata.loopCount * (this.metadata.maxNestingDepth + 1) +
      this.metadata.methodCount * 2

    // Detect recursion
    const methodCalls = sourceCode.match(/\w+\s*\(/g) || []
    const methodNames = new Set(this.originalLines
      .map((line, i) => {
        const match = line.match(/(public|private|protected)?\s*(static)?\s*\w+\s+(\w+)\s*\(/)
        return match ? match[3] : null
      })
      .filter(Boolean))

    // Simple recursion detection: method calls itself
    methodNames.forEach(methodName => {
      if (sourceCode.includes(`${methodName}(`)) {
        this.metadata.hasRecursion = true
        this.metadata.warnings.push(`Possible recursion detected in method: ${methodName}`)
      }
    })
  }

  // ========== Milestone D: Advanced Instrumentation Methods ==========

  /**
   * Instruments collection operations (add, remove, put, get)
   */
  private instrumentCollectionOperations(stmt: any, originalLine: number, instrumentedLine: number): void {
    const content = stmt.content
    
    // Match collection method calls: obj.add(...), map.put(...), etc.
    const collectionOps = [
      { pattern: /(\w+)\.(add|put|remove|get|clear)\s*\(/, action: 'add' },
      { pattern: /(\w+)\.(add|put|remove|get|clear)\s*\(/, action: 'remove' },
    ]

    for (const op of collectionOps) {
      const match = content.match(op.pattern)
      if (match) {
        const objName = match[1]
        const method = match[2]
        
        // Determine collection type from context (simplified)
        const collectionType = this.inferCollectionType(objName, content)
        
        // Generate preview (simplified - would need runtime evaluation)
        const preview = JSON.stringify({ size: 0, action: method })
        
        const hookCode = buildCollectionEventTracking(`collection_${objName}`, collectionType, method, preview)
        this.insertLineAfter(instrumentedLine + this.currentLineOffset, hookCode)
        
        this.currentLineOffset++
        break
      }
    }
  }

  /**
   * Instruments return statements
   */
  private instrumentReturnStatement(stmt: any, originalLine: number, instrumentedLine: number): void {
    const returnMatch = stmt.content.match(/return\s+(.+);/)
    if (returnMatch) {
      const returnValue = returnMatch[1]
      
      // Extract method name from context (simplified)
      const methodName = this.getCurrentMethodName(originalLine) || 'unknown'
      
      const hookCode = buildMethodReturnTracking(methodName, returnValue)
      this.insertLineBefore(instrumentedLine + this.currentLineOffset, hookCode)
      
      this.hooks.push({
        originalLine,
        instrumentedLine: instrumentedLine + this.currentLineOffset,
        hookType: 'statement',
        metadata: { methodName, returnValue },
      })

      this.currentLineOffset++
    }
  }

  /**
   * Instruments try/catch/finally blocks
   */
  private instrumentTryCatchFinally(sourceCode: string): void {
    const lines = sourceCode.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lineNum = i + 1
      
      // Try block
      if (line.match(/^\s*try\s*\{/)) {
        const tryId = `try_${lineNum}`
        const hookCode = buildTryCatchEnterTracking(tryId, lineNum)
        this.insertLineAfter(lineNum + this.currentLineOffset, hookCode)
        this.currentLineOffset++
      }
      
      // Catch block
      if (line.match(/^\s*catch\s*\(/)) {
        // Try block continues, no new hook needed
      }
      
      // Finally block
      if (line.match(/^\s*finally\s*\{/)) {
        const finallyId = `finally_${lineNum}`
        const hookCode = buildFinallyEnterTracking(finallyId, lineNum)
        this.insertLineAfter(lineNum + this.currentLineOffset, hookCode)
        this.currentLineOffset++
      }
    }
  }

  /**
   * Instruments static initializers
   */
  private instrumentStaticInitializers(sourceCode: string): void {
    const staticInitMatch = sourceCode.match(/static\s*\{/g)
    if (staticInitMatch) {
      const classMatch = sourceCode.match(/class\s+(\w+)/)
      if (classMatch) {
        const className = classMatch[1]
        const hookCode = buildStaticInitTracking(className, 'started')
        // Insert at class declaration line
        const classLine = this.originalLines.findIndex(l => l.includes(`class ${className}`)) + 1
        if (classLine > 0) {
          this.insertLineAfter(classLine + this.currentLineOffset, hookCode)
          this.currentLineOffset++
        }
      }
    }
  }

  /**
   * Helper: Infer collection type from variable name or context
   */
  private inferCollectionType(varName: string, context: string): string {
    // Check variable declaration
    const declMatch = context.match(new RegExp(`(ArrayList|LinkedList|HashMap|HashSet|TreeMap|Queue|Stack)\\s+${varName}`))
    if (declMatch) {
      return declMatch[1]
    }
    
    // Default to ArrayList
    return 'ArrayList'
  }

  /**
   * Helper: Get current method name at given line
   */
  private getCurrentMethodName(lineNumber: number): string | null {
    // Search backwards for method declaration
    for (let i = lineNumber - 1; i >= 0; i--) {
      const line = this.originalLines[i]
      const match = line.match(/(\w+)\s*\(/)
      if (match && !line.includes('class') && !line.includes('if') && !line.includes('for')) {
        return match[1]
      }
    }
    return null
  }
}
