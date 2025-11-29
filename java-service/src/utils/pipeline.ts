/**
 * Visualization Pipeline
 * 
 * Main pipeline that connects all components:
 * User Code → Server Execution → Snapshots → UI
 * 
 * Uses server-side Java execution instead of browser-based execution
 */

import { ExecutionSnapshot } from '../core/tracking/Snapshot'

export interface PipelineConfig {
  maxSteps?: number
  timeout?: number
  enableHeapTracking?: boolean
  enableStackTracking?: boolean
}

export interface PipelineResult {
  snapshots: ExecutionSnapshot[]
  output: string
  warnings: string[]
  errors?: string[]
  timedOut?: boolean
}

export interface PipelineProgress {
  stage: 'instrumenting' | 'compiling' | 'executing' | 'parsing' | 'complete'
  progress: number // 0-100
  message?: string
}

/**
 * Main pipeline function to visualize Java code
 * 
 * Uses server-side execution via /api/run-java
 * 
 * @param sourceCode - User's Java source code
 * @param config - Pipeline configuration
 * @param onProgress - Optional progress callback
 * @returns Promise resolving to pipeline result with snapshots
 */
export async function visualizeJava(
  sourceCode: string,
  config: PipelineConfig = {},
  onProgress?: (progress: PipelineProgress) => void
): Promise<PipelineResult> {
  try {
    onProgress?.({
      stage: 'executing',
      progress: 10,
      message: 'Sending code to server for execution...',
    })

    // Call server-side execution API
    const response = await fetch('/api/run-java', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: sourceCode }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Server error: ${response.status}`)
    }

    const result = await response.json()

    if (!result.success) {
      return {
        snapshots: [],
        output: result.output || '',
        warnings: result.warnings || [],
        errors: result.errors || [result.error || 'Execution failed'],
        timedOut: result.timedOut || false,
      }
    }

    onProgress?.({
      stage: 'complete',
      progress: 100,
      message: `Visualization complete. Generated ${result.snapshots?.length || 0} snapshots.`,
    })

    return {
      snapshots: result.snapshots || [],
      output: result.output || '',
      warnings: result.warnings || [],
      errors: result.errors?.length > 0 ? result.errors : undefined,
      timedOut: result.timedOut || false,
    }
  } catch (error: any) {
    console.error('[Pipeline] Error:', error)
    return {
      snapshots: [],
      output: '',
      warnings: [],
      errors: [error.message || 'Unknown error'],
    }
  }
}
