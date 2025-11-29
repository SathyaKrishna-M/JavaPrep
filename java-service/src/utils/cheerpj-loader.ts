/**
 * CheerpJ Runtime Loader
 * 
 * Loads CheerpJ runtime and manages execution of compiled Java JARs in the browser.
 * Bridges Java → JavaScript callbacks for visualizer events.
 */

// CheerpJ runtime interface
interface CheerpJRuntime {
  loadJar: (jarUrl: string) => Promise<void>
  callMain: (className: string) => Promise<void>
  isLoaded: () => boolean
  getRuntime: () => any
}

// Callback types matching existing pipeline
export type StepCallback = (lineNumber: number, stepIndex: number) => void
export type VariableCallback = (name: string, value: string, type: string, scope: string) => void
export type OutputCallback = (text: string) => void
export type ObjectCallback = (objectId: string, type: string, fields: Record<string, any>) => void
export type MethodEnterCallback = (methodName: string, className: string, lineNumber: number) => void
export type MethodExitCallback = (methodName: string, className: string) => void
export type ExceptionCallback = (exceptionType: string, message: string, lineNumber: number, stackTrace: string[]) => void
export type ObjectCreatedCallback = (objectId: string, type: string, shallowFields: Record<string, any>) => void
export type FieldWriteCallback = (objectId: string, fieldName: string, value: any) => void
export type ArrayCreateCallback = (objectId: string, componentType: string, length: number) => void
export type CollectionEventCallback = (objectId: string, collectionType: string, action: string, preview: any) => void
export type MethodReturnCallback = (methodName: string, returnValue: any) => void
export type TryCatchEnterCallback = (tryId: string, lineNumber: number) => void
export type FinallyEnterCallback = (finallyId: string, lineNumber: number) => void
export type StaticInitCallback = (className: string, status: 'start' | 'end') => void
export type ThisReferenceCallback = (methodName: string, thisId: string) => void

export interface CheerpJCallbacks {
  onStep?: StepCallback
  onVariable?: VariableCallback
  onOutput?: OutputCallback
  onObject?: ObjectCallback
  onMethodEnter?: MethodEnterCallback
  onMethodExit?: MethodExitCallback
  onException?: ExceptionCallback
  onObjectCreated?: ObjectCreatedCallback
  onFieldWrite?: FieldWriteCallback
  onArrayCreate?: ArrayCreateCallback
  onCollectionEvent?: CollectionEventCallback
  onMethodReturn?: MethodReturnCallback
  onTryCatchEnter?: TryCatchEnterCallback
  onFinallyEnter?: FinallyEnterCallback
  onStaticInit?: StaticInitCallback
  onThisReference?: ThisReferenceCallback
}

let cheerpjRuntime: CheerpJRuntime | null = null
let isCheerpjLoaded = false
let isCheerpjLoading = false
let loadPromise: Promise<CheerpJRuntime> | null = null

/**
 * Checks if CheerpJ CDN runtime is available
 * The loader script should be loaded via script tag in layout.tsx
 */
export async function checkCheerpjAvailable(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false
  }

  // Check if CheerpJ is already loaded or if the loader script is present
  // The loader script is injected via <script> tag in layout.tsx
  // After initialization, window.CheerpJ or window.cj3 should exist
  return !!(window as any).CheerpJ || !!(window as any).cj3 || !!(window as any).cheerpjInit
}

/**
 * Exposes JavaScript functions to Java via CheerpJ bridge
 * This creates a global object that Java can call
 */
function setupCheerpjBridge(callbacks: CheerpJCallbacks): void {
  if (typeof window === 'undefined') {
    return
  }

  // Create global bridge object for Java to call
  ;(window as any).__visualizerBridge = {
    trackStep: (lineNumber: number, stepIndex: number) => {
      callbacks.onStep?.(lineNumber, stepIndex)
    },
    trackVariable: (name: string, value: string, type: string, scope: string) => {
      callbacks.onVariable?.(name, value, type, scope)
    },
    captureOutput: (text: string) => {
      callbacks.onOutput?.(text)
    },
    trackObject: (objectId: string, type: string, fieldsJson: string) => {
      try {
        const fields = JSON.parse(fieldsJson)
        callbacks.onObject?.(objectId, type, fields)
      } catch (e) {
        console.warn('[CheerpJ] Failed to parse object fields:', e)
      }
    },
    trackMethodEnter: (methodName: string, className: string, lineNumber: number) => {
      callbacks.onMethodEnter?.(methodName, className, lineNumber)
    },
    trackMethodExit: (methodName: string, className: string) => {
      callbacks.onMethodExit?.(methodName, className)
    },
    trackException: (exceptionType: string, message: string, lineNumber: number, stackTraceJson: string) => {
      try {
        const stackTrace = JSON.parse(stackTraceJson)
        callbacks.onException?.(exceptionType, message, lineNumber, stackTrace)
      } catch (e) {
        callbacks.onException?.(exceptionType, message, lineNumber, [])
      }
    },
    trackObjectCreated: (objectId: string, type: string, fieldsJson: string) => {
      try {
        const fields = JSON.parse(fieldsJson)
        callbacks.onObjectCreated?.(objectId, type, fields)
      } catch (e) {
        console.warn('[CheerpJ] Failed to parse object fields:', e)
      }
    },
    trackFieldWrite: (objectId: string, fieldName: string, valueJson: string) => {
      try {
        const value = JSON.parse(valueJson)
        callbacks.onFieldWrite?.(objectId, fieldName, value)
      } catch (e) {
        callbacks.onFieldWrite?.(objectId, fieldName, valueJson)
      }
    },
    trackArrayCreate: (objectId: string, componentType: string, length: number) => {
      callbacks.onArrayCreate?.(objectId, componentType, length)
    },
    trackCollectionEvent: (objectId: string, collectionType: string, action: string, previewJson: string) => {
      try {
        const preview = JSON.parse(previewJson)
        callbacks.onCollectionEvent?.(objectId, collectionType, action, preview)
      } catch (e) {
        callbacks.onCollectionEvent?.(objectId, collectionType, action, {})
      }
    },
    trackMethodReturn: (methodName: string, returnValueJson: string) => {
      try {
        const returnValue = JSON.parse(returnValueJson)
        callbacks.onMethodReturn?.(methodName, returnValue)
      } catch (e) {
        callbacks.onMethodReturn?.(methodName, returnValueJson)
      }
    },
    trackTryCatchEnter: (tryId: string, lineNumber: number) => {
      callbacks.onTryCatchEnter?.(tryId, lineNumber)
    },
    trackFinallyEnter: (finallyId: string, lineNumber: number) => {
      callbacks.onFinallyEnter?.(finallyId, lineNumber)
    },
    trackStaticInit: (className: string, status: string) => {
      callbacks.onStaticInit?.(className, status === 'start' ? 'start' : 'end')
    },
    trackThisReference: (methodName: string, thisId: string) => {
      callbacks.onThisReference?.(methodName, thisId)
    },
  }

  console.log('[CheerpJ] Bridge functions exposed to Java')
}

/**
 * Loads CheerpJ runtime from CDN
 * The loader script should already be loaded via script tag in layout.tsx
 */
export async function loadCheerpJRuntime(): Promise<CheerpJRuntime> {
  if (isCheerpjLoaded && cheerpjRuntime) {
    console.log('[CheerpJ] Using already loaded runtime')
    return cheerpjRuntime
  }

  if (isCheerpjLoading && loadPromise) {
    console.log('[CheerpJ] Waiting for ongoing load...')
    return loadPromise
  }

  if (typeof window === 'undefined') {
    throw new Error('CheerpJ can only be loaded in a browser environment')
  }

  isCheerpjLoading = true
  loadPromise = (async () => {
    try {
      console.log('[CheerpJ] Initializing CheerpJ runtime from CDN...')

      // Wait for the loader script to be available
      // The script is loaded via <script> tag in layout.tsx
      let retries = 100
      while (retries > 0 && !(window as any).cheerpjInit) {
        await new Promise(resolve => setTimeout(resolve, 100))
        retries--
      }

      if (!(window as any).cheerpjInit) {
        throw new Error(
          'CheerpJ loader script not found. Ensure the script tag is present in layout.tsx: <script async src="https://cheerpj.com/latest/loader.js"></script>'
        )
      }

      // Initialize CheerpJ using cheerpjInit
      const cheerpjInit = (window as any).cheerpjInit
      await cheerpjInit({ canvas: null })

      // Wait for CheerpJ to be fully initialized
      // After initialization, window.CheerpJ or window.cj3 should exist
      retries = 100
      while (retries > 0 && !(window as any).CheerpJ && !(window as any).cj3) {
        await new Promise(resolve => setTimeout(resolve, 100))
        retries--
      }

      if (!(window as any).CheerpJ && !(window as any).cj3) {
        throw new Error('CheerpJ runtime not found after initialization. window.CheerpJ or window.cj3 should exist.')
      }

      const CheerpJ = (window as any).CheerpJ || (window as any).cj3
      console.log('[CheerpJ] Runtime initialized')
      console.log('[CheerpJ] window.CheerpJ:', !!(window as any).CheerpJ)
      console.log('[CheerpJ] window.cj3:', !!(window as any).cj3)

      // Create runtime wrapper
      cheerpjRuntime = {
        loadJar: async (jarUrl: string) => {
          console.log(`[CheerpJ] Loading JAR: ${jarUrl}`)
          
          // Use cheerpjLoadJar if available (CDN API)
          if ((window as any).cheerpjLoadJar) {
            await (window as any).cheerpjLoadJar(jarUrl)
          } else if (CheerpJ.loadJar) {
            await CheerpJ.loadJar(jarUrl)
          } else if (CheerpJ.load) {
            await CheerpJ.load(jarUrl)
          } else {
            throw new Error('cheerpjLoadJar function not found. CheerpJ may not be fully initialized.')
          }
          
          console.log(`[CheerpJ] JAR loaded: ${jarUrl}`)
        },
        callMain: async (className: string) => {
          console.log(`[CheerpJ] Invoking main: ${className}`)
          
          // Use CheerpJ API to invoke main method
          if (CheerpJ.getClass) {
            const mainClass = CheerpJ.getClass(className)
            const mainMethod = mainClass.getMethod('main', '[Ljava/lang/String;')
            mainMethod.invoke(null, [])
          } else if (CheerpJ.callMain) {
            await CheerpJ.callMain(className)
          } else {
            throw new Error(`Cannot invoke main method for class: ${className}`)
          }
          
          console.log(`[CheerpJ] Main execution completed`)
        },
        isLoaded: () => true,
        getRuntime: () => CheerpJ,
      }

      isCheerpjLoaded = true
      isCheerpjLoading = false
      console.log('[CheerpJ] ✓ Runtime ready')

      return cheerpjRuntime
    } catch (error: any) {
      isCheerpjLoading = false
      loadPromise = null
      console.error('[CheerpJ] Initialization error:', error)
      throw error
    }
  })()

  return loadPromise
}

/**
 * Loads a user JAR and prepares it for execution
 */
export async function loadUserJar(
  jarUrl: string,
  mainClass: string,
  callbacks: CheerpJCallbacks
): Promise<{ invokeMain: () => Promise<void> }> {
  const runtime = await loadCheerpJRuntime()

  // Setup bridge before loading JAR
  setupCheerpjBridge(callbacks)

  // Load the JAR
  await runtime.loadJar(jarUrl)

  // Return invoker
  return {
    invokeMain: async () => {
      await runtime.callMain(mainClass)
    },
  }
}

/**
 * Checks if CheerpJ is loaded and ready
 */
export function isCheerpjReady(): boolean {
  return isCheerpjLoaded && cheerpjRuntime !== null
}

