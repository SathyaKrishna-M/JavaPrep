/**
 * WASM Runtime Self-Test
 * 
 * Tests that the WASM runtime is properly loaded and functional.
 */

/**
 * Tests the WASM runtime
 * 
 * @returns Promise that resolves if test passes, rejects if it fails
 */
export async function testWasmRuntime(): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('WASM self-test can only run in browser')
  }

  const runtime = (window as any).__visualizer_runtime
  
  if (!runtime) {
    throw new Error('WASM runtime not found in window.__visualizer_runtime. Runtime may not be loaded.')
  }

  // Test 1: Check ping method exists
  if (typeof runtime.ping !== 'function') {
    throw new Error('WASM runtime.ping() method not found')
  }

  // Test 2: Call ping
  const pingResult = runtime.ping()
  console.log('[WASM Self-Test] ping() result:', pingResult)
  
  if (!pingResult || typeof pingResult !== 'string') {
    throw new Error(`WASM ping() returned invalid result: ${pingResult}`)
  }

  // Test 3: Check other essential methods exist
  const requiredMethods = [
    'initialize',
    'acceptCode',
    'invokeMain',
    'getCurrentStep',
    'getCurrentLine',
    'getOutput',
    'reset',
    'isInitialized',
  ]

  for (const method of requiredMethods) {
    if (typeof runtime[method] !== 'function') {
      throw new Error(`WASM runtime.${method}() method not found`)
    }
  }

  console.log('[WASM Self-Test] ✓ All required methods present')
  console.log('[WASM Self-Test] ✓ WASM runtime is functional')
}

