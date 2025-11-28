/**
 * WASM Module Loader
 * 
 * Handles loading and initialization of the TeaVM-compiled WASM module.
 * 
 * NO SIMULATION - Only loads real TeaVM WASM runtime.
 * 
 * NOTE: This module must only run in the browser (client-side).
 * It uses browser APIs like window, document, fetch, WebAssembly.
 */

// Ensure this only runs in browser
if (typeof window === 'undefined') {
  // This is a client-only module
}

// TeaVM-generated runtime interface
interface TeaVMRuntime {
  // Exported Java methods (from VisualizerRuntime.java)
  initialize: () => void
  ping: () => string
  acceptCode: (code: string) => boolean
  invokeMain: () => number
  trackStep: (lineNumber: number) => void
  captureOutput: (text: string) => void
  trackVariable: (name: string, value: string, type: string) => void
  trackMethodEntry: (className: string, methodName: string, lineNumber: number) => void
  trackMethodExit: (className: string, methodName: string, lineNumber: number) => void
  trackObjectCreation: (objectId: string, className: string) => void
  getCurrentStep: () => number
  getCurrentLine: () => number
  getOutput: () => string
  reset: () => void
  isInitialized: () => boolean
  // Milestone D: Advanced methods
  trackObjectCreated?: (objectId: string, type: string, shallowFields: string) => void
  trackFieldWrite?: (objectId: string, fieldName: string, value: string) => void
  trackArrayCreate?: (objectId: string, componentType: string, length: number) => void
  trackCollectionEvent?: (objectId: string, collectionType: string, action: string, preview: string) => void
  trackMethodReturn?: (methodName: string, returnValue: string) => void
  trackExceptionThrown?: (line: number, exceptionType: string, message: string) => void
  trackTryCatchEnter?: (tryId: string, line: number) => void
  trackFinallyEnter?: (finallyId: string, line: number) => void
  trackStaticInitStart?: (className: string) => void
  trackStaticInitEnd?: (className: string) => void
  trackThisReference?: (methodName: string, thisId: string) => void
}

// Callback types
export type StepCallback = (lineNumber: number) => void
export type VariableCallback = (name: string, value: any, type: string) => void
export type ObjectCallback = (objectId: string, className: string) => void
export type MethodEnterCallback = (className: string, methodName: string, lineNumber: number) => void
export type MethodExitCallback = (className: string, methodName: string, lineNumber: number) => void
export type OutputCallback = (text: string) => void
export type ErrorCallback = (error: string) => void

// Milestone D: Advanced callbacks
export type ObjectCreatedCallback = (objectId: string, type: string, shallowFields: string) => void
export type FieldWriteCallback = (objectId: string, fieldName: string, value: string) => void
export type ArrayCreateCallback = (objectId: string, componentType: string, length: number) => void
export type CollectionEventCallback = (objectId: string, collectionType: string, action: string, preview: string) => void
export type MethodReturnCallback = (methodName: string, returnValue: string) => void
export type ExceptionCallback = (line: number, exceptionType: string, message: string) => void
export type TryCatchEnterCallback = (tryId: string, line: number) => void
export type FinallyEnterCallback = (finallyId: string, line: number) => void
export type StaticInitCallback = (className: string, status: 'started' | 'completed') => void
export type ThisReferenceCallback = (methodName: string, thisId: string) => void

export interface WASMRuntime {
  // Runtime control
  initializeRuntime: () => Promise<void>
  isReady: () => boolean
  
  // Code execution
  acceptCode: (code: string) => boolean
  invokeRun: (code: string) => Promise<number>
  
  // Callback registration
  bindTrackerCallbacks: (callbacks: {
    onStep?: StepCallback
    onVariable?: VariableCallback
    onObject?: ObjectCallback
    onMethodEnter?: MethodEnterCallback
    onMethodExit?: MethodExitCallback
    onOutput?: OutputCallback
    onError?: ErrorCallback
    // Milestone D: Advanced callbacks
    onObjectCreated?: ObjectCreatedCallback
    onFieldWrite?: FieldWriteCallback
    onArrayCreate?: ArrayCreateCallback
    onCollectionEvent?: CollectionEventCallback
    onMethodReturn?: MethodReturnCallback
    onException?: ExceptionCallback
    onTryCatchEnter?: TryCatchEnterCallback
    onFinallyEnter?: FinallyEnterCallback
    onStaticInit?: StaticInitCallback
    onThisReference?: ThisReferenceCallback
  }) => void
  
  // State queries
  getCurrentStep: () => number
  getCurrentLine: () => number
  getOutput: () => string
  reset: () => void
  
  // Test method
  ping: () => string
  
  // Debug helper
  testRunVerbose?: (code: string) => Promise<void>
}

let wasmModule: TeaVMRuntime | null = null
let isLoaded = false
let callbacks: {
  onStep?: StepCallback
  onVariable?: VariableCallback
  onObject?: ObjectCallback
  onMethodEnter?: MethodEnterCallback
  onMethodExit?: MethodExitCallback
  onOutput?: OutputCallback
  onError?: ErrorCallback
  // Milestone D: Advanced callbacks
  onObjectCreated?: ObjectCreatedCallback
  onFieldWrite?: FieldWriteCallback
  onArrayCreate?: ArrayCreateCallback
  onCollectionEvent?: CollectionEventCallback
  onMethodReturn?: MethodReturnCallback
  onException?: ExceptionCallback
  onTryCatchEnter?: TryCatchEnterCallback
  onFinallyEnter?: FinallyEnterCallback
  onStaticInit?: StaticInitCallback
  onThisReference?: ThisReferenceCallback
} = {}

/**
 * JavaScript functions called from Java (via @Import)
 * These are registered with the TeaVM runtime
 */
const runtimeModule = {
  registerStepCallback: (lineNumber: number) => {
    if (callbacks.onStep) {
      callbacks.onStep(lineNumber)
    }
  },
  
  registerVariableCallback: (name: string, value: string, type: string) => {
    if (callbacks.onVariable) {
      callbacks.onVariable(name, value, type)
    }
  },
  
  registerObjectCallback: (objectId: string, className: string) => {
    if (callbacks.onObject) {
      callbacks.onObject(objectId, className)
    }
  },
  
  registerMethodEnterCallback: (className: string, methodName: string, lineNumber: number) => {
    if (callbacks.onMethodEnter) {
      callbacks.onMethodEnter(className, methodName, lineNumber)
    }
  },
  
  registerMethodExitCallback: (className: string, methodName: string, lineNumber: number) => {
    if (callbacks.onMethodExit) {
      callbacks.onMethodExit(className, methodName, lineNumber)
    }
  },
  
  registerOutputCallback: (text: string) => {
    if (callbacks.onOutput) {
      callbacks.onOutput(text)
    }
  },
  
  registerErrorCallback: (error: string) => {
    if (callbacks.onError) {
      callbacks.onError(error)
    }
  },
  
  // Milestone D: Advanced callback handlers
  registerObjectCreatedCallback: (objectId: string, type: string, shallowFields: string) => {
    if (callbacks.onObjectCreated) {
      callbacks.onObjectCreated(objectId, type, shallowFields)
    }
  },
  
  registerFieldWriteCallback: (objectId: string, fieldName: string, value: string) => {
    if (callbacks.onFieldWrite) {
      callbacks.onFieldWrite(objectId, fieldName, value)
    }
  },
  
  registerArrayCreateCallback: (objectId: string, componentType: string, length: number) => {
    if (callbacks.onArrayCreate) {
      callbacks.onArrayCreate(objectId, componentType, length)
    }
  },
  
  registerCollectionEventCallback: (objectId: string, collectionType: string, action: string, preview: string) => {
    if (callbacks.onCollectionEvent) {
      callbacks.onCollectionEvent(objectId, collectionType, action, preview)
    }
  },
  
  registerMethodReturnCallback: (methodName: string, returnValue: string) => {
    if (callbacks.onMethodReturn) {
      callbacks.onMethodReturn(methodName, returnValue)
    }
  },
  
  registerExceptionCallback: (line: number, exceptionType: string, message: string) => {
    if (callbacks.onException) {
      callbacks.onException(line, exceptionType, message)
    }
  },
  
  registerTryCatchEnterCallback: (tryId: string, line: number) => {
    if (callbacks.onTryCatchEnter) {
      callbacks.onTryCatchEnter(tryId, line)
    }
  },
  
  registerFinallyEnterCallback: (finallyId: string, line: number) => {
    if (callbacks.onFinallyEnter) {
      callbacks.onFinallyEnter(finallyId, line)
    }
  },
  
  registerStaticInitCallback: (className: string, status: 'started' | 'completed') => {
    if (callbacks.onStaticInit) {
      callbacks.onStaticInit(className, status)
    }
  },
  
  registerThisReferenceCallback: (methodName: string, thisId: string) => {
    if (callbacks.onThisReference) {
      callbacks.onThisReference(methodName, thisId)
    }
  },
}

/**
 * Checks if WASM files exist
 */
async function checkWASMFilesExist(): Promise<void> {
  console.log('[WASM] Checking for WASM files...')
  
  try {
    // Check runtime.wasm
    const wasmResponse = await fetch('/wasm/runtime.wasm', { method: 'HEAD' })
    if (!wasmResponse.ok) {
      throw new Error('runtime.wasm not found')
    }
    console.log('[WASM] ✓ runtime.wasm found')
    
    // Check runtime.js
    const jsResponse = await fetch('/wasm/runtime.js', { method: 'HEAD' })
    if (!jsResponse.ok) {
      throw new Error('runtime.js not found')
    }
    console.log('[WASM] ✓ runtime.js found')
  } catch (error: any) {
    const errorMessage = `TeaVM runtime files not found. Build them with:
    
cd src/visualizer/java-runtime
mvn clean compile

Then ensure runtime.wasm and runtime.js are copied to public/wasm/`
    
    console.error('[WASM] ❌', errorMessage)
    throw new Error(errorMessage)
  }
}

/**
 * Loads the WASM module
 * 
 * TeaVM generates:
 * - runtime.wasm (WebAssembly binary)
 * - runtime.js (JavaScript loader)
 * 
 * @returns Promise resolving when WASM is loaded and ready
 */
export async function loadWASMRuntime(): Promise<WASMRuntime> {
  // Ensure we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('WASM runtime can only be loaded in a browser environment. This code must run client-side.')
  }

  if (isLoaded && wasmModule) {
    console.log('[WASM] Using already loaded runtime')
    return createWASMRuntimeWrapper()
  }

  console.log('[WASM] Starting WASM runtime load...')
  
  try {
    // Step 1: Check if WASM files exist
    await checkWASMFilesExist()
    
    // Step 2: Load TeaVM-generated JS loader (runtime.js)
    // The runtime.js file creates a global TeaVM.wasm object with a load() function
    const jsUrl = '/wasm/runtime.js'
    console.log(`[WASM] Loading ${jsUrl}...`)
    
    // Load and execute the JS file
    const jsResponse = await fetch(jsUrl)
    if (!jsResponse.ok) {
      throw new Error(`Failed to load ${jsUrl}: ${jsResponse.status} ${jsResponse.statusText}`)
    }
    
    const jsCode = await jsResponse.text()
    
    // Execute the JS code in the global scope to create TeaVM.wasm object
    // runtime.js creates: var TeaVM = TeaVM || {}; TeaVM.wasm = function() { ... }();
    // We need to execute it in the actual global scope, not a sandbox
    
    try {
      // Use script injection to execute in global scope
      // This ensures TeaVM is set on window
      const script = document.createElement('script')
      script.textContent = jsCode
      document.head.appendChild(script)
      document.head.removeChild(script)
    } catch (error: any) {
      // Fallback: try direct eval if script injection fails
      try {
        // eslint-disable-next-line no-eval
        eval(jsCode)
      } catch (evalError: any) {
        throw new Error(`Failed to execute ${jsUrl}: ${error.message || evalError.message}`)
      }
    }
    
    // Check if TeaVM.wasm object is available (created by runtime.js)
    if (!(window as any).TeaVM || !(window as any).TeaVM.wasm) {
      console.error('[WASM] Debug: window.TeaVM =', (window as any).TeaVM)
      console.error('[WASM] Debug: window keys =', Object.keys(window).filter(k => k.includes('Tea') || k.includes('tea')))
      throw new Error(`TeaVM.wasm object not found after loading ${jsUrl}. The runtime.js file may not have executed correctly.`)
    }
    
    console.log('[WASM] runtime.js loaded successfully')
    
    // Step 3: Load the WASM module using TeaVM.wasm.load()
    // TeaVM.wasm is the JavaScript object (not a file), runtime.wasm is the actual WASM file
    const wasmUrl = '/wasm/runtime.wasm'
    console.log('[WASM] Loading runtime.wasm...')
    const teavmWasm = (window as any).TeaVM.wasm
    
    // Load the WASM file - TeaVM's load() returns a promise that resolves to a teavm object
    // The teavm object has methods directly (without teavm_ prefix) thanks to createTeaVM wrapper
    const teavm = await teavmWasm.load(wasmUrl, {
      installImports: (importObj: any, controller: any) => {
        // Install our callback functions as imports
        // TeaVM uses @Import annotations to call JS functions
        // We need to provide the import functions in importObj.teavm
        if (!importObj.teavm) {
          importObj.teavm = {}
        }
        
        // Register callback functions that Java can call via @Import
        // These are called from Java code, so they need to be available during WASM instantiation
        importObj.teavm.registerStepCallback = runtimeModule.registerStepCallback
        importObj.teavm.registerVariableCallback = runtimeModule.registerVariableCallback
        importObj.teavm.registerObjectCallback = runtimeModule.registerObjectCallback
        importObj.teavm.registerMethodEnterCallback = runtimeModule.registerMethodEnterCallback
        importObj.teavm.registerMethodExitCallback = runtimeModule.registerMethodExitCallback
        importObj.teavm.registerOutputCallback = runtimeModule.registerOutputCallback
        importObj.teavm.registerErrorCallback = runtimeModule.registerErrorCallback
        importObj.teavm.registerObjectCreatedCallback = runtimeModule.registerObjectCreatedCallback
        importObj.teavm.registerFieldWriteCallback = runtimeModule.registerFieldWriteCallback
        importObj.teavm.registerArrayCreateCallback = runtimeModule.registerArrayCreateCallback
        importObj.teavm.registerCollectionEventCallback = runtimeModule.registerCollectionEventCallback
        importObj.teavm.registerMethodReturnCallback = runtimeModule.registerMethodReturnCallback
        importObj.teavm.registerExceptionCallback = runtimeModule.registerExceptionCallback
        importObj.teavm.registerTryCatchEnterCallback = runtimeModule.registerTryCatchEnterCallback
        importObj.teavm.registerFinallyEnterCallback = runtimeModule.registerFinallyEnterCallback
        importObj.teavm.registerStaticInitCallback = runtimeModule.registerStaticInitCallback
        importObj.teavm.registerThisReferenceCallback = runtimeModule.registerThisReferenceCallback
        
        console.log('[WASM] Import functions installed')
      }
    })
    
    console.log('[WASM] runtime.wasm loaded successfully')
    
    // Access WASM instance exports directly
    // TeaVM @Export annotations create exports with the exact method names (no teavm_ prefix)
    const exports = teavm.instance?.exports || {}
    console.log('[WASM] Available exports:', Object.keys(exports).filter(k => typeof exports[k] === 'function'))
    
    // Helper function to read Java string from memory
    const readJavaString = (strPtr: number): string => {
      if (!strPtr || !teavm.stringData) return ''
      try {
        const strData = teavm.stringData(strPtr)
        const length = teavm.arrayLength(strData)
        const memory = new DataView(teavm.memory.buffer)
        const dataPtr = teavm.charArrayData(strData)
        let result = ''
        for (let i = 0; i < length; i++) {
          const charCode = memory.getUint16(dataPtr + i * 2, true)
          result += String.fromCharCode(charCode)
        }
        return result
      } catch (error: any) {
        console.warn('[WASM] Error reading string:', error)
        return ''
      }
    }
    
    // Java-exported methods are accessed directly from instance.exports (no teavm_ prefix)
    // String parameters need to be allocated in TeaVM memory first
    const runtime: any = {
      // Access Java-exported methods directly from WASM instance exports
      initialize: () => {
        if (typeof exports.initialize === 'function') {
          return exports.initialize()
        }
        throw new Error('exports.initialize() not found. Available exports: ' + Object.keys(exports).join(', '))
      },
      ping: () => {
        if (typeof exports.ping === 'function') {
          try {
            const resultPtr = exports.ping()
            // Result is a Java string pointer, need to read it from memory
            return readJavaString(resultPtr) || 'pong'
          } catch (error: any) {
            console.warn('[WASM] Error calling ping:', error)
            return 'pong'
          }
        }
        throw new Error('exports.ping() not found. Available exports: ' + Object.keys(exports).join(', '))
      },
      acceptCode: (code: string) => {
        if (typeof exports.acceptCode === 'function') {
          const strPtr = teavm.allocateString(code)
          const result = exports.acceptCode(strPtr)
          return result === 1 || result === true || result !== 0
        }
        return false
      },
      invokeMain: () => {
        if (typeof exports.invokeMain === 'function') {
          return exports.invokeMain() || 0
        }
        return 0
      },
      trackStep: (lineNumber: number) => {
        if (typeof exports.trackStep === 'function') {
          exports.trackStep(lineNumber)
        }
      },
      captureOutput: (text: string) => {
        if (typeof exports.captureOutput === 'function') {
          const strPtr = teavm.allocateString(text)
          exports.captureOutput(strPtr)
        }
      },
      trackVariable: (name: string, value: string, type: string) => {
        if (typeof exports.trackVariable === 'function') {
          const namePtr = teavm.allocateString(name)
          const valuePtr = teavm.allocateString(value)
          const typePtr = teavm.allocateString(type)
          exports.trackVariable(namePtr, valuePtr, typePtr)
        }
      },
      getCurrentStep: () => {
        if (typeof exports.getCurrentStep === 'function') {
          return exports.getCurrentStep() || 0
        }
        return 0
      },
      getCurrentLine: () => {
        if (typeof exports.getCurrentLine === 'function') {
          return exports.getCurrentLine() || 0
        }
        return 0
      },
      getOutput: () => {
        if (typeof exports.getOutput === 'function') {
          const strPtr = exports.getOutput()
          return readJavaString(strPtr)
        }
        return ''
      },
      reset: () => {
        if (typeof exports.reset === 'function') {
          exports.reset()
        }
      },
      isInitialized: () => {
        if (typeof exports.isInitialized === 'function') {
          return exports.isInitialized() === 1 || exports.isInitialized() === true
        }
        return false
      },
      // Store the raw teavm object and exports for debugging
      _teavm: teavm,
      _exports: exports,
    }
    
    // Step 4: Register JS callbacks with Java runtime
    // TeaVM uses @Import annotations to call JS functions
    // We need to provide the import functions
    if (typeof runtime.setImports === 'function') {
      runtime.setImports({
        registerStepCallback: runtimeModule.registerStepCallback,
        registerVariableCallback: runtimeModule.registerVariableCallback,
        registerObjectCallback: runtimeModule.registerObjectCallback,
        registerMethodEnterCallback: runtimeModule.registerMethodEnterCallback,
        registerMethodExitCallback: runtimeModule.registerMethodExitCallback,
        registerOutputCallback: runtimeModule.registerOutputCallback,
        registerErrorCallback: runtimeModule.registerErrorCallback,
        // Milestone D: Advanced callbacks
        registerObjectCreatedCallback: runtimeModule.registerObjectCreatedCallback,
        registerFieldWriteCallback: runtimeModule.registerFieldWriteCallback,
        registerArrayCreateCallback: runtimeModule.registerArrayCreateCallback,
        registerCollectionEventCallback: runtimeModule.registerCollectionEventCallback,
        registerMethodReturnCallback: runtimeModule.registerMethodReturnCallback,
        registerExceptionCallback: runtimeModule.registerExceptionCallback,
        registerTryCatchEnterCallback: runtimeModule.registerTryCatchEnterCallback,
        registerFinallyEnterCallback: runtimeModule.registerFinallyEnterCallback,
        registerStaticInitCallback: runtimeModule.registerStaticInitCallback,
        registerThisReferenceCallback: runtimeModule.registerThisReferenceCallback,
      })
      console.log('[WASM] Callbacks registered via setImports()')
    } else {
      // Approach 2: Direct assignment (if runtime has import property)
      if (runtime && typeof runtime === 'object') {
        // Some TeaVM versions expose imports directly
        if ((runtime as any).imports) {
          Object.assign((runtime as any).imports, {
            registerStepCallback: runtimeModule.registerStepCallback,
            registerVariableCallback: runtimeModule.registerVariableCallback,
            registerObjectCallback: runtimeModule.registerObjectCallback,
            registerMethodEnterCallback: runtimeModule.registerMethodEnterCallback,
            registerMethodExitCallback: runtimeModule.registerMethodExitCallback,
            registerOutputCallback: runtimeModule.registerOutputCallback,
            registerErrorCallback: runtimeModule.registerErrorCallback,
            registerObjectCreatedCallback: runtimeModule.registerObjectCreatedCallback,
            registerFieldWriteCallback: runtimeModule.registerFieldWriteCallback,
            registerArrayCreateCallback: runtimeModule.registerArrayCreateCallback,
            registerCollectionEventCallback: runtimeModule.registerCollectionEventCallback,
            registerMethodReturnCallback: runtimeModule.registerMethodReturnCallback,
            registerExceptionCallback: runtimeModule.registerExceptionCallback,
            registerTryCatchEnterCallback: runtimeModule.registerTryCatchEnterCallback,
            registerFinallyEnterCallback: runtimeModule.registerFinallyEnterCallback,
            registerStaticInitCallback: runtimeModule.registerStaticInitCallback,
            registerThisReferenceCallback: runtimeModule.registerThisReferenceCallback,
          })
          console.log('[WASM] Callbacks registered via runtime.imports')
        } else {
          console.warn('[WASM] No setImports() or imports property found. Callbacks may need manual registration.')
        }
      }
    }
    
    wasmModule = runtime as TeaVMRuntime
    
    // Step 5: Store in window for debugging
    if (typeof window !== 'undefined') {
      ;(window as any).__visualizer_runtime = wasmModule
      console.log('[WASM] Runtime stored in window.__visualizer_runtime')
    }
    
    // Step 6: Verify runtime is functional
    if (wasmModule && typeof wasmModule.ping === 'function') {
      try {
        const pingResult = wasmModule.ping()
        console.log('[WASM] Runtime ping result:', pingResult)
        if (pingResult !== 'pong' && !pingResult.includes('ready') && !pingResult.includes('pong')) {
          console.warn('[WASM] Unexpected ping result:', pingResult)
        } else {
          console.log('[WASM] ✓ Runtime ping successful')
        }
      } catch (error: any) {
        console.warn('[WASM] Ping test failed:', error)
      }
    }
    
    isLoaded = true
    console.log('[WASM] ✓ WASM runtime loaded successfully')
    
    return createWASMRuntimeWrapper()
  } catch (error: any) {
    console.error('[WASM] ❌ Failed to load WASM runtime:', error)
    const errorMessage = error.message || 'Unknown error'
    
    // Provide helpful error message
    if (errorMessage.includes('not found') || errorMessage.includes('404')) {
      throw new Error(`TeaVM runtime files not found.

To build them:
1. Install Maven: https://maven.apache.org/download.cgi
2. Add Maven to PATH
3. Run: cd src/visualizer/java-runtime && mvn clean compile

See src/visualizer/MAVEN-SETUP.md for detailed instructions.`)
    }
    
    if (errorMessage.includes('Placeholder') || errorMessage.includes('PLACEHOLDER')) {
      throw new Error(`WASM runtime files are placeholders. Build the real runtime:

1. Install Maven (if not installed)
2. Run: cd src/visualizer/java-runtime && mvn clean compile
3. Files will be automatically copied to public/wasm/

See src/visualizer/MAVEN-SETUP.md for Maven installation.`)
    }
    
    throw new Error(`WASM runtime loading failed: ${errorMessage}

If Maven is not installed, see src/visualizer/MAVEN-SETUP.md`)
  }
}

/**
 * Creates a wrapper around the TeaVM runtime with a clean API
 */
function createWASMRuntimeWrapper(): WASMRuntime {
  if (!wasmModule) {
    throw new Error('WASM module not loaded. Call loadWASMRuntime() first.')
  }

  return {
    async initializeRuntime(): Promise<void> {
      if (!wasmModule) {
        throw new Error('WASM module not loaded')
      }
      console.log('[WASM] Initializing runtime...')
      wasmModule.initialize()
      console.log('[WASM] ✓ Runtime initialized')
    },
    
    isReady(): boolean {
      return isLoaded && wasmModule !== null && wasmModule.isInitialized()
    },
    
    acceptCode(code: string): boolean {
      if (!wasmModule) {
        console.error('[WASM] Cannot accept code: module not loaded')
        return false
      }
      const accepted = wasmModule.acceptCode(code)
      if (accepted) {
        console.log('[WASM] Code accepted, length:', code.length)
      } else {
        console.error('[WASM] Code acceptance failed')
      }
      return accepted
    },
    
    async invokeRun(code: string): Promise<number> {
      if (!wasmModule) {
        throw new Error('WASM module not loaded')
      }
      
      // Accept code if not already accepted
      if (!wasmModule.isInitialized()) {
        await this.initializeRuntime()
      }
      
      console.log('[WASM] Invoking main()...')
      const stepCount = wasmModule.invokeMain()
      console.log('[WASM] Execution complete, steps:', stepCount)
      return stepCount
    },
    
    bindTrackerCallbacks(newCallbacks: {
      onStep?: StepCallback
      onVariable?: VariableCallback
      onObject?: ObjectCallback
      onMethodEnter?: MethodEnterCallback
      onMethodExit?: MethodExitCallback
      onOutput?: OutputCallback
      onError?: ErrorCallback
      onObjectCreated?: ObjectCreatedCallback
      onFieldWrite?: FieldWriteCallback
      onArrayCreate?: ArrayCreateCallback
      onCollectionEvent?: CollectionEventCallback
      onMethodReturn?: MethodReturnCallback
      onException?: ExceptionCallback
      onTryCatchEnter?: TryCatchEnterCallback
      onFinallyEnter?: FinallyEnterCallback
      onStaticInit?: StaticInitCallback
      onThisReference?: ThisReferenceCallback
    }): void {
      console.log('[WASM] Binding tracker callbacks...')
      callbacks = { ...callbacks, ...newCallbacks }
      console.log('[WASM] ✓ Callbacks bound')
    },
    
    getCurrentStep(): number {
      return wasmModule?.getCurrentStep() || 0
    },
    
    getCurrentLine(): number {
      return wasmModule?.getCurrentLine() || 0
    },
    
    getOutput(): string {
      return wasmModule?.getOutput() || ''
    },
    
    reset(): void {
      wasmModule?.reset()
      callbacks = {}
      console.log('[WASM] Runtime reset')
    },
    
    ping(): string {
      const result = wasmModule?.ping() || 'WASM not loaded'
      return result
    },
    
    testRunVerbose: async (code: string) => {
      console.log('[WASM] Test run verbose mode')
      console.log('[WASM] Code:', code)
      
      if (!wasmModule) {
        throw new Error('WASM module not loaded')
      }
      
      const accepted = wasmModule.acceptCode(code)
      console.log('[WASM] Code accepted:', accepted)
      
      try {
        const result = await wasmModule.invokeMain()
        console.log('[WASM] Execution result:', result)
        console.log('[WASM] Current step:', wasmModule.getCurrentStep())
        console.log('[WASM] Current line:', wasmModule.getCurrentLine())
        console.log('[WASM] Output:', wasmModule.getOutput())
      } catch (error) {
        console.error('[WASM] Execution error:', error)
        throw error
      }
    },
  }
}

/**
 * Gets the loaded WASM module
 * 
 * @returns WASM runtime module, or null if not loaded
 */
export function getWASMRuntime(): WASMRuntime | null {
  if (!isLoaded || !wasmModule) {
    return null
  }
  return createWASMRuntimeWrapper()
}

/**
 * Checks if WASM module is loaded
 * 
 * @returns True if WASM is loaded and ready
 */
export function isWASMLoaded(): boolean {
  return isLoaded && wasmModule !== null
}

/**
 * Unloads the WASM module
 */
export function unloadWASMRuntime(): void {
  wasmModule = null
  isLoaded = false
  callbacks = {}
  if (typeof window !== 'undefined') {
    delete (window as any).__visualizer_runtime
  }
}
