/**
 * Custom Error Classes for Instrumentation
 * 
 * Provides structured error handling with helpful messages for students.
 */

export class InstrumentationError extends Error {
  constructor(
    message: string,
    public cause?: Error,
    public lineNumber?: number
  ) {
    super(message)
    this.name = 'InstrumentationError'
    Object.setPrototypeOf(this, InstrumentationError.prototype)
  }

  /**
   * Formats error message with context
   */
  getFormattedMessage(): string {
    let msg = this.message
    if (this.lineNumber) {
      msg += ` (at line ${this.lineNumber})`
    }
    if (this.cause) {
      msg += `\nCause: ${this.cause.message}`
    }
    return msg
  }
}

export class UnsupportedFeatureError extends InstrumentationError {
  constructor(
    public feature: string,
    message: string,
    public suggestion?: string
  ) {
    super(message)
    this.name = 'UnsupportedFeatureError'
    Object.setPrototypeOf(this, UnsupportedFeatureError.prototype)
  }

  /**
   * Gets a user-friendly error message
   */
  getUserMessage(): string {
    let msg = `❌ ${this.feature} is not supported in the visualizer.\n\n`
    msg += `Reason: ${this.message}\n\n`
    
    if (this.suggestion) {
      msg += `💡 Suggestion: ${this.suggestion}\n\n`
    } else {
      msg += `💡 Try removing or replacing this feature to visualize your code.\n\n`
    }

    msg += `Supported features:\n`
    msg += `  ✓ Variable declarations and assignments\n`
    msg += `  ✓ Arithmetic and logical operations\n`
    msg += `  ✓ Control flow (if/else, for, while, do-while)\n`
    msg += `  ✓ Method calls and returns\n`
    msg += `  ✓ Object creation (new)\n`
    msg += `  ✓ Arrays (basic operations)\n`
    msg += `  ✓ System.out.println/print\n`
    msg += `  ✓ Classes and methods\n`

    return msg
  }
}

export class ParsingError extends InstrumentationError {
  constructor(
    message: string,
    public syntax: string,
    public expected?: string
  ) {
    super(message)
    this.name = 'ParsingError'
    Object.setPrototypeOf(this, ParsingError.prototype)
  }

  /**
   * Gets a user-friendly parsing error message
   */
  getUserMessage(): string {
    let msg = `❌ Syntax Error: ${this.message}\n\n`
    msg += `Found: "${this.syntax}"\n\n`
    
    if (this.expected) {
      msg += `Expected: ${this.expected}\n\n`
    }

    msg += `💡 Please check your Java syntax and try again.`

    return msg
  }
}

export class LineMappingError extends InstrumentationError {
  constructor(
    message: string,
    public originalLine: number,
    public instrumentedLine?: number
  ) {
    super(message)
    this.name = 'LineMappingError'
    Object.setPrototypeOf(this, LineMappingError.prototype)
  }
}

/**
 * Error helper functions
 */
export function createUnsupportedFeatureError(feature: string, context?: string): UnsupportedFeatureError {
  const messages: Record<string, { message: string; suggestion?: string }> = {
    'System.exit()': {
      message: 'System.exit() terminates the program and cannot be visualized.',
      suggestion: 'Remove System.exit() calls or replace with return statements.',
    },
    'Threading': {
      message: 'Thread operations create concurrent execution which cannot be visualized step-by-step.',
      suggestion: 'Use sequential code instead of threads for visualization.',
    },
    'Reflection': {
      message: 'Reflection APIs access runtime type information which is not supported.',
      suggestion: 'Use direct method calls and class references instead of reflection.',
    },
    'File I/O': {
      message: 'File I/O operations interact with the file system which is not available in the browser.',
      suggestion: 'Use String variables or arrays to simulate file data.',
    },
    'Unsafe API': {
      message: 'Unsafe APIs provide low-level memory access which is not supported.',
      suggestion: 'Use standard Java APIs instead.',
    },
    'Native methods': {
      message: 'Native methods call platform-specific code which cannot be executed in WASM.',
      suggestion: 'Replace native methods with Java implementations.',
    },
    'Runtime execution': {
      message: 'Runtime execution allows executing external processes which is not supported.',
      suggestion: 'Remove Runtime.getRuntime() calls.',
    },
  }

  const errorInfo = messages[feature] || {
    message: `${feature} is not supported in the visualizer.`,
  }

  return new UnsupportedFeatureError(feature, errorInfo.message, errorInfo.suggestion)
}

