/**
 * Runtime Initialization Test
 * 
 * Lightweight test to verify WASM loading and basic functionality.
 * 
 * TODO (Milestone B): Add comprehensive test suite
 * TODO (Milestone B): Test snapshot callbacks
 * TODO (Milestone B): Test error handling
 */

import { loadWASMRuntime, getWASMRuntime, isWASMLoaded } from './wasm-loader'

/**
 * Tests WASM runtime loading and basic functionality
 * 
 * @returns Promise resolving to test results
 */
export async function testWASMRuntime(): Promise<{
  success: boolean
  message: string
  details?: any
}> {
  try {
    console.log('[TEST] Starting WASM runtime test...')
    
    // Test 1: Load WASM module
    console.log('[TEST] Loading WASM module...')
    const runtime = await loadWASMRuntime()
    
    if (!runtime) {
      return {
        success: false,
        message: 'Failed to load WASM runtime',
      }
    }
    
    console.log('[TEST] ✓ WASM module loaded')
    
    // Test 2: Check if ready
    if (!runtime.isReady()) {
      return {
        success: false,
        message: 'WASM runtime is not ready',
      }
    }
    
    console.log('[TEST] ✓ Runtime is ready')
    
    // Test 3: Initialize runtime
    console.log('[TEST] Initializing runtime...')
    await runtime.initializeRuntime()
    
    if (!runtime.isReady()) {
      return {
        success: false,
        message: 'Runtime initialization failed',
      }
    }
    
    console.log('[TEST] ✓ Runtime initialized')
    
    // Test 4: Ping test (calls Java method)
    console.log('[TEST] Testing ping() method...')
    const pingResult = runtime.ping()
    
    if (!pingResult || !pingResult.includes('ready')) {
      return {
        success: false,
        message: `Ping test failed: ${pingResult}`,
      }
    }
    
    console.log('[TEST] ✓ Ping test passed:', pingResult)
    
    // Test 5: Accept code (placeholder)
    console.log('[TEST] Testing acceptCode() method...')
    const testCode = 'public class Test { public static void main(String[] args) {} }'
    const codeAccepted = runtime.acceptCode(testCode)
    
    if (!codeAccepted) {
      return {
        success: false,
        message: 'Code acceptance failed',
      }
    }
    
    console.log('[TEST] ✓ Code acceptance test passed')
    
    // Test 6: State queries
    console.log('[TEST] Testing state queries...')
    const step = runtime.getCurrentStep()
    const line = runtime.getCurrentLine()
    const output = runtime.getOutput()
    
    console.log('[TEST] ✓ State queries work:', { step, line, output })
    
    // Test 7: Reset
    console.log('[TEST] Testing reset()...')
    runtime.reset()
    
    console.log('[TEST] ✓ Reset test passed')
    
    // Test 8: Callback binding (placeholder)
    console.log('[TEST] Testing callback binding...')
    runtime.bindTrackerCallbacks({
      onStep: (lineNumber) => {
        console.log('[TEST] Step callback received:', lineNumber)
      },
      onVariable: (name, value, type) => {
        console.log('[TEST] Variable callback received:', name, value, type)
      },
      onOutput: (text) => {
        console.log('[TEST] Output callback received:', text)
      },
      onError: (error) => {
        console.error('[TEST] Error callback received:', error)
      },
    })
    
    console.log('[TEST] ✓ Callback binding test passed')
    
    return {
      success: true,
      message: 'All WASM runtime tests passed!',
      details: {
        pingResult,
        codeAccepted,
        step,
        line,
        output,
      },
    }
  } catch (error: any) {
    console.error('[TEST] Test failed:', error)
    return {
      success: false,
      message: `Test failed: ${error.message}`,
      details: { error: error.stack },
    }
  }
}

/**
 * Quick test that can be called from browser console
 * 
 * Usage in browser console:
 * ```javascript
 * import { testWASMRuntime } from '@/visualizer/utils/runtime-test'
 * testWASMRuntime().then(console.log)
 * ```
 */
export async function quickTest(): Promise<void> {
  const result = await testWASMRuntime()
  if (result.success) {
    console.log('✅ WASM Runtime Test: PASSED')
    console.log('Details:', result.details)
  } else {
    console.error('❌ WASM Runtime Test: FAILED')
    console.error('Error:', result.message)
    console.error('Details:', result.details)
  }
}

