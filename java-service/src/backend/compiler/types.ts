/**
 * Compiler types and interfaces
 */

export interface CompilationResult {
  success: boolean
  classpath: string
  errors: string[]
  warnings: string[]
}

export interface CompilationOptions {
  timeout?: number
  maxMemory?: string
}

