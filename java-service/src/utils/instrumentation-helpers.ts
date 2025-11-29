/**
 * Instrumentation Helper Functions
 * 
 * Utilities for injecting tracking hooks and transforming code.
 */

/**
 * Builds a tracking call to VisualizerRuntime
 */
export function buildTrackingCall(methodName: string, args: any[]): string {
  const argsStr = args
    .map(arg => {
      if (typeof arg === 'string') {
        return `"${arg.replace(/"/g, '\\"')}"`
      }
      return String(arg)
    })
    .join(', ')

  return `        VisualizerRuntime.${methodName}(${argsStr});`
}

/**
 * Replaces System.out.println/print calls with output capture
 * IMPORTANT: Replaces the original call entirely (does not keep System.out.print)
 */
export function wrapSystemOut(line: string): string {
  // Match System.out.println(...) or System.out.print(...)
  const printlnMatch = line.match(/System\.out\.println\s*\(\s*(.+?)\s*\)/)
  const printMatch = line.match(/System\.out\.print\s*\(\s*(.+?)\s*\)/)

  if (printlnMatch) {
    const expression = printlnMatch[1]
    const indent = line.match(/^(\s*)/)?.[1] || ''
    // Replace entirely - do not keep original System.out.println
    return `${indent}VisualizerRuntime.captureOutput(String.valueOf(${expression}) + "\\n");`
  }

  if (printMatch) {
    const expression = printMatch[1]
    const indent = line.match(/^(\s*)/)?.[1] || ''
    // Replace entirely - do not keep original System.out.print
    return `${indent}VisualizerRuntime.captureOutput(String.valueOf(${expression}));`
  }

  return line
}

/**
 * Injects a hook before a line
 */
export function injectHook(lines: string[], lineNumber: number, hookCode: string): string[] {
  const newLines = [...lines]
  const insertIndex = lineNumber - 1
  newLines.splice(insertIndex, 0, hookCode)
  return newLines
}

/**
 * Injects a hook after a line
 */
export function injectHookAfter(lines: string[], lineNumber: number, hookCode: string): string[] {
  const newLines = [...lines]
  const insertIndex = lineNumber
  newLines.splice(insertIndex, 0, hookCode)
  return newLines
}

/**
 * Preserves indentation from original line
 */
export function preserveIndentation(originalLine: string, newCode: string): string {
  const indentMatch = originalLine.match(/^(\s*)/)
  const indent = indentMatch ? indentMatch[1] : ''
  return indent + newCode.trim()
}

/**
 * Builds a variable tracking call
 */
export function buildVariableTracking(variableName: string, value: string, type: string): string {
  return buildTrackingCall('trackVariable', [variableName, value, type])
}

/**
 * Builds an object creation tracking call
 */
export function buildObjectTracking(objectId: string, className: string): string {
  return buildTrackingCall('trackObjectCreation', [objectId, className])
}

/**
 * Builds a method entry tracking call
 */
export function buildMethodEntryTracking(className: string, methodName: string, lineNumber: number): string {
  return buildTrackingCall('trackMethodEntry', [className, methodName, lineNumber])
}

/**
 * Builds a method exit tracking call
 */
export function buildMethodExitTracking(className: string, methodName: string, lineNumber: number): string {
  return buildTrackingCall('trackMethodExit', [className, methodName, lineNumber])
}

/**
 * Builds a step tracking call
 */
export function buildStepTracking(lineNumber: number): string {
  return buildTrackingCall('trackStep', [lineNumber])
}

/**
 * Builds an object created tracking call (Milestone D)
 */
export function buildObjectCreatedTracking(objectId: string, type: string, shallowFields: string): string {
  return buildTrackingCall('trackObjectCreated', [objectId, type, shallowFields])
}

/**
 * Builds a field write tracking call (Milestone D)
 */
export function buildFieldWriteTracking(objectId: string, fieldName: string, value: string): string {
  return buildTrackingCall('trackFieldWrite', [objectId, fieldName, value])
}

/**
 * Builds an array creation tracking call (Milestone D)
 */
export function buildArrayCreateTracking(objectId: string, componentType: string, length: number): string {
  return buildTrackingCall('trackArrayCreate', [objectId, componentType, length])
}

/**
 * Builds a collection event tracking call (Milestone D)
 */
export function buildCollectionEventTracking(
  objectId: string,
  collectionType: string,
  action: string,
  preview: string
): string {
  return buildTrackingCall('trackCollectionEvent', [objectId, collectionType, action, preview])
}

/**
 * Builds a method return tracking call (Milestone D)
 */
export function buildMethodReturnTracking(methodName: string, returnValue: string): string {
  return buildTrackingCall('trackMethodReturn', [methodName, returnValue])
}

/**
 * Builds an exception tracking call (Milestone D)
 */
export function buildExceptionTracking(lineNumber: number, exceptionType: string, message: string): string {
  return buildTrackingCall('trackExceptionThrown', [lineNumber, exceptionType, message])
}

/**
 * Builds a try/catch enter tracking call (Milestone D)
 */
export function buildTryCatchEnterTracking(tryId: string, lineNumber: number): string {
  return buildTrackingCall('trackTryCatchEnter', [tryId, lineNumber])
}

/**
 * Builds a finally enter tracking call (Milestone D)
 */
export function buildFinallyEnterTracking(finallyId: string, lineNumber: number): string {
  return buildTrackingCall('trackFinallyEnter', [finallyId, lineNumber])
}

/**
 * Builds a static init tracking call (Milestone D)
 */
export function buildStaticInitTracking(className: string, status: 'started' | 'completed'): string {
  return buildTrackingCall(status === 'started' ? 'trackStaticInitStart' : 'trackStaticInitEnd', [className])
}

/**
 * Builds a this reference tracking call (Milestone D)
 */
export function buildThisReferenceTracking(methodName: string, thisId: string): string {
  return buildTrackingCall('trackThisReference', [methodName, thisId])
}

/**
 * Annotates a line with original line number (as comment)
 */
export function annotateWithLineNumber(code: string, originalLine: number): string {
  return `${code} // [Original: ${originalLine}]`
}

/**
 * Handles multi-line statements by finding the complete statement
 */
export function findCompleteStatement(lines: string[], startLine: number): { endLine: number; statement: string } {
  let endLine = startLine
  let statement = lines[startLine - 1]
  let openParens = (statement.match(/\(/g) || []).length
  let closeParens = (statement.match(/\)/g) || []).length
  let openBraces = (statement.match(/\{/g) || []).length
  let closeBraces = (statement.match(/\}/g) || []).length
  let openBrackets = (statement.match(/\[/g) || []).length
  let closeBrackets = (statement.match(/\]/g) || []).length

  while (
    (openParens > closeParens || 
     openBraces > closeBraces || 
     openBrackets > closeBrackets ||
     statement.trim().endsWith(',') ||
     statement.trim().endsWith('+') ||
     statement.trim().endsWith('-') ||
     statement.trim().endsWith('*') ||
     statement.trim().endsWith('/')) &&
    endLine < lines.length
  ) {
    endLine++
    const nextLine = lines[endLine - 1]
    statement += ' ' + nextLine.trim()
    openParens += (nextLine.match(/\(/g) || []).length
    closeParens += (nextLine.match(/\)/g) || []).length
    openBraces += (nextLine.match(/\{/g) || []).length
    closeBraces += (nextLine.match(/\}/g) || []).length
    openBrackets += (nextLine.match(/\[/g) || []).length
    closeBrackets += (nextLine.match(/\]/g) || []).length
  }

  return { endLine, statement }
}

