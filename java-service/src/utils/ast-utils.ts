/**
 * AST Utility Functions
 * 
 * Helper functions for working with Java AST nodes.
 */

export type NodeType = 
  | 'VariableDeclaration'
  | 'Assignment'
  | 'MethodCall'
  | 'ObjectCreation'
  | 'ControlFlow'
  | 'Return'
  | 'Expression'
  | 'Block'
  | 'Class'
  | 'Method'
  | 'Field'
  | 'Unknown'

export interface ASTNode {
  type: NodeType
  line: number
  content: string
  children?: ASTNode[]
  metadata?: Record<string, any>
}

/**
 * Checks if a node represents an executable statement
 */
export function isExecutableNode(node: ASTNode | any): boolean {
  if (!node || !node.type) return false

  const executableTypes: NodeType[] = [
    'VariableDeclaration',
    'Assignment',
    'MethodCall',
    'ObjectCreation',
    'ControlFlow',
    'Return',
    'Expression',
  ]

  return executableTypes.includes(node.type)
}

/**
 * Extracts variable names from a statement
 */
export function extractVariableNames(node: ASTNode | string): string[] {
  const content = typeof node === 'string' ? node : node.content || ''
  const variables: string[] = []

  // Match variable declarations: int x = 5; or String name;
  const declMatch = content.match(/(?:int|String|double|float|boolean|char|byte|short|long|var)\s+(\w+)/)
  if (declMatch) {
    variables.push(declMatch[1])
  }

  // Match assignments: x = 5; or arr[i] = value;
  const assignRegex = /(\w+)\s*=\s*[^=]/g
  let assignMatch: RegExpExecArray | null
  while ((assignMatch = assignRegex.exec(content)) !== null) {
    if (!variables.includes(assignMatch[1])) {
      variables.push(assignMatch[1])
    }
  }

  // Match array access: arr[i]
  const arrayRegex = /(\w+)\s*\[/g
  let arrayMatch: RegExpExecArray | null
  while ((arrayMatch = arrayRegex.exec(content)) !== null) {
    if (!variables.includes(arrayMatch[1])) {
      variables.push(arrayMatch[1])
    }
  }

  return variables
}

/**
 * Gets the node type from content
 */
export function getNodeType(content: string): NodeType {
  const trimmed = content.trim()

  if (trimmed.match(/^(int|String|double|float|boolean|char|byte|short|long|var)\s+\w+/)) {
    return 'VariableDeclaration'
  }
  if (trimmed.match(/\w+\s*=\s*[^=]/)) {
    return 'Assignment'
  }
  if (trimmed.match(/new\s+\w+/)) {
    return 'ObjectCreation'
  }
  if (trimmed.match(/^(if|for|while|do|switch)\s*\(/)) {
    return 'ControlFlow'
  }
  if (trimmed.match(/^return\s+/)) {
    return 'Return'
  }
  if (trimmed.match(/\w+\s*\(/)) {
    return 'MethodCall'
  }
  if (trimmed.match(/^class\s+\w+/)) {
    return 'Class'
  }
  if (trimmed.match(/(public|private|protected)?\s*(static)?\s*\w+\s+\w+\s*\(/)) {
    return 'Method'
  }

  return 'Unknown'
}

/**
 * Checks if a line contains a multi-line statement
 */
export function isMultiLineStatement(line: string): boolean {
  // Check for incomplete statements (ends with operator, comma, etc.)
  const incompletePatterns = [
    /[+\-*/%=<>!&|^]\s*$/,  // Ends with operator
    /,\s*$/,                 // Ends with comma
    /\(\s*$/,                 // Ends with opening paren
    /\[\s*$/,                 // Ends with opening bracket
    /\.\s*$/,                 // Ends with dot
  ]

  return incompletePatterns.some(pattern => pattern.test(line.trim()))
}

/**
 * Extracts method name from a method call
 */
export function extractMethodName(content: string): string | null {
  const match = content.match(/(\w+)\s*\(/)
  return match ? match[1] : null
}

/**
 * Extracts class name from object creation
 */
export function extractClassName(content: string): string | null {
  const match = content.match(/new\s+(\w+)/)
  return match ? match[1] : null
}

/**
 * Checks if a statement is a System.out call
 */
export function isSystemOutCall(content: string): boolean {
  return /System\.out\.(print|println)/.test(content)
}

/**
 * Extracts the expression from System.out.println/print
 */
export function extractSystemOutExpression(content: string): string | null {
  const match = content.match(/System\.out\.(print|println)\s*\(\s*(.+?)\s*\)/)
  return match ? match[2] : null
}

/**
 * Checks if a method is recursive (simple check)
 */
export function isRecursiveCall(methodName: string, content: string): boolean {
  return new RegExp(`\\b${methodName}\\s*\\(`).test(content)
}

/**
 * Counts nesting depth at a given line
 */
export function countNestingDepth(lines: string[], upToLine: number): number {
  let depth = 0
  const relevantLines = lines.slice(0, upToLine)

  for (const line of relevantLines) {
    const openBraces = (line.match(/\{/g) || []).length
    const closeBraces = (line.match(/\}/g) || []).length
    depth += openBraces - closeBraces
  }

  return Math.max(0, depth)
}

