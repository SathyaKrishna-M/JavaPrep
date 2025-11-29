/**
 * Execution limits and constants
 */

export const EXECUTION_LIMITS = {
  TIMEOUT_MS: 3000, // 3 seconds
  MAX_MEMORY: '64m', // 64 MB
  MAX_OUTPUT_SIZE: 1024 * 1024, // 1 MB
  MAX_STDERR_SIZE: 1024 * 1024, // 1 MB
} as const

