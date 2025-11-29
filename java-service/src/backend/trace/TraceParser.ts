/**
 * Trace Parser
 * 
 * Parses trace output from TracePrinter into ExecutionSnapshot format
 */

import { ExecutionSnapshot, Variable, StackFrame } from '../../core/tracking/Snapshot'

export interface ParsedTrace {
  snapshots: ExecutionSnapshot[]
  output: string
  errors: string[]
}

export class TraceParser {
  /**
   * Parses trace output into snapshots
   */
  static parse(stderr: string, stdout: string): ParsedTrace {
    const lines = stderr.split('\n').filter(line => line.trim())
    const snapshots: ExecutionSnapshot[] = []
    const errors: string[] = []
    
    let currentStep: Partial<ExecutionSnapshot> | null = null
    let stepIndex = 0
    let currentVars: Record<string, Variable> = {}
    let callStack: StackFrame[] = []
    let output = stdout
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      if (trimmed.startsWith('STEP ')) {
        // Finalize previous step
        if (currentStep) {
          snapshots.push({
            stepIndex: currentStep.stepIndex || 0,
            lineNumber: currentStep.lineNumber || 0,
            timestamp: Date.now(),
            variables: Object.values(currentVars),
            callStack: [...callStack],
            heap: [],
            output: currentStep.output || '',
          } as ExecutionSnapshot)
        }
        
        // Start new step
        const lineNumStr = trimmed.substring(5).trim()
        const lineNum = parseInt(lineNumStr, 10)
        
        // Validate line number
        if (isNaN(lineNum) || lineNum < 1) {
          console.warn(`[TraceParser] Invalid line number in STEP: "${lineNumStr}" -> ${lineNum}`)
          // Skip this step or use 1 as fallback
          continue
        }
        
        currentStep = {
          stepIndex: stepIndex++,
          lineNumber: lineNum,
          output: '',
        }
        // Keep current vars and call stack
      } else if (trimmed.startsWith('VAR ')) {
        // VAR name value
        const parts = trimmed.substring(4).split(/\s+/, 2)
        if (parts.length >= 2) {
          const name = parts[0]
          const value = parts.slice(1).join(' ')
          currentVars[name] = {
            name,
            value: this.parseValue(value),
            type: this.inferType(value),
          }
        }
      } else if (trimmed.startsWith('OUT ')) {
        // OUT text
        const text = trimmed.substring(4)
        if (currentStep) {
          currentStep.output = (currentStep.output || '') + text
        }
        output += text
      } else if (trimmed.startsWith('CALL ')) {
        // CALL methodName
        const methodName = trimmed.substring(5).trim()
        callStack.push({
          methodName,
          className: 'Main',
          lineNumber: currentStep?.lineNumber || 0,
          localVariables: [],
        })
      } else if (trimmed.startsWith('RET ')) {
        // RET methodName value
        const parts = trimmed.substring(4).split(/\s+/, 2)
        if (parts.length >= 1) {
          const methodName = parts[0]
          // Pop from call stack
          const index = callStack.findIndex(f => f.methodName === methodName)
          if (index >= 0) {
            callStack.splice(index, 1)
          }
        }
      } else if (trimmed.startsWith('EXCEPTION ')) {
        // EXCEPTION type message line
        const parts = trimmed.substring(10).split(/\s+/, 3)
        if (parts.length >= 2) {
          errors.push(`${parts[0]}: ${parts[1]}`)
        }
      } else if (trimmed === 'END') {
        // Finalize last step
        if (currentStep) {
          snapshots.push({
            stepIndex: currentStep.stepIndex || 0,
            lineNumber: currentStep.lineNumber || 0,
            timestamp: Date.now(),
            variables: Object.values(currentVars),
            callStack: [...callStack],
            heap: [],
            output: currentStep.output || '',
          } as ExecutionSnapshot)
        }
        break
      }
    }
    
    // Add final step if not already added
    if (currentStep && snapshots.length === 0) {
      snapshots.push({
        stepIndex: currentStep.stepIndex || 0,
        lineNumber: currentStep.lineNumber || 0,
        timestamp: Date.now(),
        variables: Object.values(currentVars),
        callStack: [...callStack],
        heap: [],
        output: currentStep.output || '',
      } as ExecutionSnapshot)
    }
    
    return {
      snapshots,
      output: output.trim(),
      errors,
    }
  }
  
  /**
   * Parses a string value into appropriate type
   */
  private static parseValue(valueStr: string): any {
    const trimmed = valueStr.trim()
    
    // Try to parse as number
    if (/^-?\d+$/.test(trimmed)) {
      return parseInt(trimmed, 10)
    }
    if (/^-?\d+\.\d+$/.test(trimmed)) {
      return parseFloat(trimmed)
    }
    
    // Boolean
    if (trimmed === 'true' || trimmed === 'false') {
      return trimmed === 'true'
    }
    
    // String (remove quotes if present)
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1)
    }
    
    // Return as-is
    return trimmed
  }
  
  /**
   * Infers type from value string
   */
  private static inferType(valueStr: string): string {
    const trimmed = valueStr.trim()
    
    if (/^-?\d+$/.test(trimmed)) {
      return 'int'
    }
    if (/^-?\d+\.\d+$/.test(trimmed)) {
      return 'double'
    }
    if (trimmed === 'true' || trimmed === 'false') {
      return 'boolean'
    }
    if (trimmed === 'null') {
      return 'Object'
    }
    
    return 'String'
  }
}

