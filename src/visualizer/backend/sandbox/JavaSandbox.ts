/**
 * Java Sandbox
 * 
 * Executes Java programs securely with resource limits
 */

import { spawn } from 'child_process'
import { join } from 'path'
import { EXECUTION_LIMITS } from './limits'

export interface ExecutionResult {
  success: boolean
  stdout: string
  stderr: string
  exitCode: number
  error?: string
  timedOut: boolean
}

export class JavaSandbox {
  /**
   * Executes a Java program in a sandboxed environment
   */
  static async execute(classpath: string): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      const javaCommand = 'java'
      const args = [
        `-Xmx${EXECUTION_LIMITS.MAX_MEMORY}`,
        '-Dfile.encoding=UTF-8',
        '-cp',
        classpath,
        'Main',
      ]
      
      const process = spawn(javaCommand, args, {
        cwd: classpath,
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      
      let stdout = ''
      let stderr = ''
      let timedOut = false
      
      // Set timeout
      const timeout = setTimeout(() => {
        timedOut = true
        process.kill('SIGKILL')
        resolve({
          success: false,
          stdout: stdout.substring(0, EXECUTION_LIMITS.MAX_OUTPUT_SIZE),
          stderr: stderr.substring(0, EXECUTION_LIMITS.MAX_STDERR_SIZE),
          exitCode: -1,
          error: 'Execution timeout (3 seconds)',
          timedOut: true,
        })
      }, EXECUTION_LIMITS.TIMEOUT_MS)
      
      // Collect stdout
      process.stdout?.on('data', (data: Buffer) => {
        stdout += data.toString('utf-8')
        if (stdout.length > EXECUTION_LIMITS.MAX_OUTPUT_SIZE) {
          process.kill('SIGKILL')
        }
      })
      
      // Collect stderr (trace events)
      process.stderr?.on('data', (data: Buffer) => {
        stderr += data.toString('utf-8')
        if (stderr.length > EXECUTION_LIMITS.MAX_STDERR_SIZE) {
          process.kill('SIGKILL')
        }
      })
      
      // Handle process exit
      process.on('exit', (code) => {
        clearTimeout(timeout)
        resolve({
          success: code === 0 && !timedOut,
          stdout: stdout.substring(0, EXECUTION_LIMITS.MAX_OUTPUT_SIZE),
          stderr: stderr.substring(0, EXECUTION_LIMITS.MAX_STDERR_SIZE),
          exitCode: code || 0,
          timedOut: false,
        })
      })
      
      // Handle process errors
      process.on('error', (error) => {
        clearTimeout(timeout)
        resolve({
          success: false,
          stdout: stdout.substring(0, EXECUTION_LIMITS.MAX_OUTPUT_SIZE),
          stderr: stderr.substring(0, EXECUTION_LIMITS.MAX_STDERR_SIZE),
          exitCode: -1,
          error: error.message,
          timedOut: false,
        })
      })
    })
  }
}

