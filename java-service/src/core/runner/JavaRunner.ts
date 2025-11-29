/**
 * Java Execution Runner
 * 
 * Handles execution of instrumented Java code in the WASM runtime
 * and collects execution snapshots via callback hooks.
 * 
 * Milestone C: Full execution implementation with callback collection
 */

import {
  ExecutionSnapshot,
  Variable,
  StackFrame,
  HeapObject,
  CollectionPreview,
  ExceptionInfo,
  ReturnValue,
  RecursionInfo,
  StaticInitInfo,
} from '../tracking/Snapshot'
import { InstrumentationResult, LineMap } from '../instrumenter/JavaInstrumenter'
import { WASMRuntime } from '../../utils/wasm-loader'

export interface RunnerConfig {
  maxSteps?: number
  timeout?: number
  enableHeapTracking?: boolean
  enableStackTracking?: boolean
}

// Execution event types
enum EventType {
  STEP = 'STEP',
  VARIABLE = 'VARIABLE',
  OBJECT = 'OBJECT',
  METHOD_ENTER = 'METHOD_ENTER',
  METHOD_EXIT = 'METHOD_EXIT',
  OUTPUT = 'OUTPUT',
  // Milestone D: Advanced events
  OBJECT_CREATED = 'OBJECT_CREATED',
  FIELD_WRITE = 'FIELD_WRITE',
  ARRAY_CREATED = 'ARRAY_CREATED',
  COLLECTION_EVENT = 'COLLECTION_EVENT',
  METHOD_RETURN = 'METHOD_RETURN',
  EXCEPTION = 'EXCEPTION',
  TRY_ENTER = 'TRY_ENTER',
  FINALLY_ENTER = 'FINALLY_ENTER',
  STATIC_INIT = 'STATIC_INIT',
  THIS_REF = 'THIS_REF',
}

interface ExecutionEvent {
  type: EventType
  timestamp: number
  data: any
}

export class JavaRunner {
  private wasmModule: WASMRuntime | null = null
  private isInitialized: boolean = false
  private snapshotCallbacks: Array<(snapshot: ExecutionSnapshot) => void> = []
  private lineMapping: LineMap | null = null
  private eventBuffer: ExecutionEvent[] = []
  private executionPromise: Promise<ExecutionSnapshot[]> | null = null

  // Execution state
  private currentSnapshot: Partial<ExecutionSnapshot> | null = null
  private snapshots: ExecutionSnapshot[] = []
  private variables: Map<string, Variable> = new Map()
  private callStack: StackFrame[] = []
  private heap: Map<string, HeapObject> = new Map()
  private output: string = ''

  // Milestone D: Advanced state tracking
  private collectionsPreview: Map<string, CollectionPreview> = new Map()
  private activeException: ExceptionInfo | null = null
  private lastReturn: ReturnValue | null = null
  private activeTryId: string | null = null
  private activeFinallyId: string | null = null
  private staticInits: StaticInitInfo[] = []
  private recursionInfo: RecursionInfo | null = null
  private thisReference: string | null = null

  // Configuration
  private maxHeapObjects: number = 5000
  private maxCollectionPreviewSize: number = 50

  /**
   * Initializes the WASM runtime
   * 
   * @returns Promise that resolves when runtime is ready
   */
  async initializeRuntime(): Promise<void> {
    if (this.isInitialized) {
      console.log('[JavaRunner] Runtime already initialized')
      return
    }

    console.log('[JavaRunner] Initializing WASM runtime...')

    // Load WASM module using wasm-loader
    const { loadWASMRuntime } = await import('../../utils/wasm-loader')

    try {
      this.wasmModule = await loadWASMRuntime()
    } catch (error: any) {
      console.error('[JavaRunner] Failed to load WASM runtime:', error)
      throw new Error(`WASM runtime failed to load: ${error.message}`)
    }

    if (!this.wasmModule) {
      throw new Error('WASM module is null after loading')
    }

    // Initialize the runtime
    await this.wasmModule.initializeRuntime()

    // Set up callback bindings
    this.wasmModule.bindTrackerCallbacks({
      onStep: (lineNumber) => {
        this.handleStepEvent(lineNumber)
      },
      onVariable: (name, value, type) => {
        this.handleVariableEvent(name, value, type)
      },
      onObject: (objectId, className) => {
        this.handleObjectEvent(objectId, className)
      },
      onMethodEnter: (className, methodName, lineNumber) => {
        this.handleMethodEnterEvent(className, methodName, lineNumber)
      },
      onMethodExit: (className, methodName, lineNumber) => {
        this.handleMethodExitEvent(className, methodName, lineNumber)
      },
      onOutput: (text) => {
        this.handleOutputEvent(text)
      },
      onError: (error) => {
        console.error('[JavaRunner] Execution error:', error)
        throw new Error(`Execution error: ${error}`)
      },
    })

    this.isInitialized = true
    console.log('[JavaRunner] ✓ WASM Runtime ready')
  }

  /**
   * Runs instrumented Java code and collects snapshots
   * 
   * @param instrumentedCode - Instrumented Java code from JavaInstrumenter
   * @param config - Runner configuration options
   * @returns Promise resolving to array of execution snapshots
   */
  async run(
    instrumentedCode: InstrumentationResult,
    config: RunnerConfig = {}
  ): Promise<ExecutionSnapshot[]> {
    if (!this.isInitialized) {
      await this.initializeRuntime()
    }

    if (!this.wasmModule) {
      throw new Error('WASM module not initialized. Simulation runtime was removed. WASM must be available.')
    }

    if (!this.wasmModule.isReady()) {
      throw new Error('WASM runtime is not ready. Call initializeRuntime() first.')
    }

    // Reset state
    this.resetExecutionState()
    this.lineMapping = instrumentedCode.lineMapping

    // Accept the instrumented code
    const accepted = this.wasmModule.acceptCode(instrumentedCode.instrumentedCode)
    if (!accepted) {
      throw new Error('Failed to accept instrumented code')
    }

    // Set up timeout if specified
    const timeout = config.timeout || 30000 // Default 30 seconds
    const timeoutPromise = new Promise<ExecutionSnapshot[]>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Execution timeout after ${timeout}ms`))
      }, timeout)
    })

    // Execute code and collect events
    const executionPromise = this.executeCode(instrumentedCode, config)

    try {
      // Race between execution and timeout
      const snapshots = await Promise.race([executionPromise, timeoutPromise])
      return snapshots as ExecutionSnapshot[]
    } catch (error: any) {
      // Check for infinite loop
      if (this.snapshots.length > (config.maxSteps || 10000)) {
        throw new Error(`Infinite loop detected: exceeded ${config.maxSteps || 10000} steps`)
      }
      throw error
    }
  }

  /**
   * Executes the code and collects events
   */
  private async executeCode(
    instrumentedCode: InstrumentationResult,
    config: RunnerConfig
  ): Promise<ExecutionSnapshot[]> {
    return new Promise((resolve, reject) => {
      try {
        // Clear event buffer
        this.eventBuffer = []

        // Debug: Log before execution
        if (process.env.NEXT_PUBLIC_VERBOSE_SNAPSHOTS === 'true') {
          console.log('[JavaRunner] Starting execution with instrumented code:')
          console.log(instrumentedCode.instrumentedCode)
          console.log('[JavaRunner] Line mapping:', Array.from(instrumentedCode.lineMapping.originalToInstrumented.entries()))
        }

        // Start execution
        this.wasmModule!.invokeRun(instrumentedCode.instrumentedCode)
          .then((stepCount) => {
            // Debug: Log event buffer
            if (process.env.NEXT_PUBLIC_VERBOSE_SNAPSHOTS === 'true') {
              console.log('[JavaRunner] Execution complete. Step count:', stepCount)
              console.log('[JavaRunner] Event buffer:', this.eventBuffer)
              console.log('[JavaRunner] Output collected:', this.output)
              console.log('[JavaRunner] Variables:', Array.from(this.variables.entries()))
            }

            // Convert events to snapshots
            const snapshots = this.convertEventsToSnapshots()

            // Debug: Log snapshots
            if (process.env.NEXT_PUBLIC_VERBOSE_SNAPSHOTS === 'true') {
              console.log('[JavaRunner] Generated snapshots:', snapshots.length)
              snapshots.forEach((snap, idx) => {
                console.log(`[JavaRunner] Snapshot ${idx}: line=${snap.lineNumber}, output="${snap.output}", vars=${snap.variables.length}`)
              })
            }

            // Map instrumented line numbers to original line numbers
            const mappedSnapshots = this.mapSnapshotsToOriginalLines(snapshots)

            resolve(mappedSnapshots)
          })
          .catch(reject)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Handles step event
   */
  private handleStepEvent(lineNumber: number): void {
    // Finalize current snapshot if exists
    if (this.currentSnapshot) {
      this.finalizeCurrentSnapshot()
    }

    // Start new snapshot
    this.currentSnapshot = {
      stepIndex: this.snapshots.length,
      lineNumber: lineNumber,
      timestamp: Date.now(),
      variables: Array.from(this.variables.values()),
      callStack: [...this.callStack],
      heap: Array.from(this.heap.values()),
      output: this.output,
    }

    this.eventBuffer.push({
      type: EventType.STEP,
      timestamp: Date.now(),
      data: { lineNumber },
    })
  }

  /**
   * Handles variable event
   */
  private handleVariableEvent(name: string, value: any, type: string): void {
    const variable: Variable = {
      name,
      value: this.parseValue(value),
      type,
    }

    this.variables.set(name, variable)

    if (this.currentSnapshot) {
      this.currentSnapshot.variables = Array.from(this.variables.values())
    }

    this.eventBuffer.push({
      type: EventType.VARIABLE,
      timestamp: Date.now(),
      data: { name, value, type },
    })
  }

  /**
   * Handles object creation event
   */
  private handleObjectEvent(objectId: string, className: string): void {
    const heapObject: HeapObject = {
      id: objectId,
      type: className,
      fields: {},
    }

    this.heap.set(objectId, heapObject)

    if (this.currentSnapshot) {
      this.currentSnapshot.heap = Array.from(this.heap.values())
    }

    this.eventBuffer.push({
      type: EventType.OBJECT,
      timestamp: Date.now(),
      data: { objectId, className },
    })
  }

  /**
   * Handles method entry event
   */
  private handleMethodEnterEvent(className: string, methodName: string, lineNumber: number): void {
    const frame: StackFrame = {
      methodName,
      className,
      lineNumber,
      localVariables: [],
    }

    this.callStack.push(frame)

    if (this.currentSnapshot) {
      this.currentSnapshot.callStack = [...this.callStack]
    }

    this.eventBuffer.push({
      type: EventType.METHOD_ENTER,
      timestamp: Date.now(),
      data: { className, methodName, lineNumber },
    })
  }

  /**
   * Handles method exit event
   */
  private handleMethodExitEvent(className: string, methodName: string, lineNumber: number): void {
    if (this.callStack.length > 0) {
      this.callStack.pop()
    }

    if (this.currentSnapshot) {
      this.currentSnapshot.callStack = [...this.callStack]
    }

    this.eventBuffer.push({
      type: EventType.METHOD_EXIT,
      timestamp: Date.now(),
      data: { className, methodName, lineNumber },
    })
  }

  /**
   * Handles output event
   * IMPORTANT: OUTPUT events should always create a new snapshot to show output changes
   */
  private handleOutputEvent(text: string): void {
    // Debug logging
    if ((process.env.NEXT_PUBLIC_VERBOSE_SNAPSHOTS ?? '') === 'true') {
      console.log('[JavaRunner] EVENT_OUTPUT:', text, 'Current output:', this.output)
    }

    this.output += text

    // If we have a current snapshot, update it
    if (this.currentSnapshot) {
      this.currentSnapshot.output = this.output
    } else {
      // If no current snapshot, create one for this output
      this.currentSnapshot = {
        stepIndex: this.snapshots.length,
        lineNumber: this.wasmModule?.getCurrentLine() || 0,
        timestamp: Date.now(),
        variables: Array.from(this.variables.values()),
        callStack: [...this.callStack],
        heap: Array.from(this.heap.values()),
        output: this.output,
      }
    }

    // Always finalize snapshot on OUTPUT event to show output changes immediately
    // This ensures each print statement creates a visible snapshot
    this.finalizeCurrentSnapshot()

    this.eventBuffer.push({
      type: EventType.OUTPUT,
      timestamp: Date.now(),
      data: { text },
    })
  }

  /**
   * Finalizes the current snapshot
   */
  private finalizeCurrentSnapshot(): void {
    if (!this.currentSnapshot) return

    // Detect recursion
    this.detectRecursion()

    const snapshot: ExecutionSnapshot = {
      stepIndex: this.currentSnapshot.stepIndex!,
      lineNumber: this.currentSnapshot.lineNumber!,
      timestamp: this.currentSnapshot.timestamp!,
      variables: this.currentSnapshot.variables || [],
      callStack: this.currentSnapshot.callStack || [],
      heap: Array.from(this.heap.values()),
      output: this.currentSnapshot.output || '',
      explanation: this.generateExplanation(this.currentSnapshot),
      conditionResult: undefined, // TODO: Extract from execution context
      arrayState: undefined, // TODO: Extract from heap
      // Milestone D: Advanced features
      collectionsPreview: this.collectionsPreview.size > 0 ? this.collectionsPreview : undefined,
      exception: this.activeException,
      lastReturn: this.lastReturn,
      activeTryId: this.activeTryId,
      activeFinallyId: this.activeFinallyId,
      staticInits: this.staticInits.length > 0 ? [...this.staticInits] : undefined,
      recursionInfo: this.recursionInfo || undefined,
      thisReference: this.thisReference || undefined,
    }

    this.snapshots.push(snapshot)

    // Notify callbacks
    this.snapshotCallbacks.forEach(callback => callback(snapshot))

    // Clear transient state (but keep heap, collections, etc.)
    this.lastReturn = null
  }

  /**
   * Converts events to snapshots
   */
  private convertEventsToSnapshots(): ExecutionSnapshot[] {
    // Finalize last snapshot
    if (this.currentSnapshot) {
      this.finalizeCurrentSnapshot()
    }

    return this.snapshots
  }

  /**
   * Maps instrumented line numbers to original line numbers
   */
  private mapSnapshotsToOriginalLines(snapshots: ExecutionSnapshot[]): ExecutionSnapshot[] {
    if (!this.lineMapping) {
      return snapshots
    }

    return snapshots.map(snapshot => {
      const originalLine = this.lineMapping!.instrumentedToOriginal.get(snapshot.lineNumber)
      if (originalLine !== undefined) {
        return {
          ...snapshot,
          lineNumber: originalLine,
        }
      }
      return snapshot
    })
  }

  /**
   * Generates explanation for a snapshot
   */
  private generateExplanation(snapshot: Partial<ExecutionSnapshot>): string {
    if (!snapshot.lineNumber) return ''

    const lineNum = snapshot.lineNumber
    const vars = snapshot.variables || []

    if (vars.length > 0) {
      const varList = vars.map(v => `${v.name} = ${v.value}`).join(', ')
      return `Executing line ${lineNum}. Variables: ${varList}`
    }

    return `Executing line ${lineNum}`
  }

  /**
   * Parses a value string to appropriate type
   */
  private parseValue(value: any): any {
    if (typeof value === 'string') {
      // Try to parse as number
      if (!isNaN(Number(value)) && value.trim() !== '') {
        return Number(value)
      }
      // Try to parse as boolean
      if (value === 'true' || value === 'false') {
        return value === 'true'
      }
      // Remove quotes if present
      return value.replace(/^"(.*)"$/, '$1')
    }
    return value
  }

  /**
   * Detects recursion in call stack
   */
  private detectRecursion(): void {
    if (this.callStack.length < 2) {
      this.recursionInfo = null
      return
    }

    // Check for repeated method signatures
    const frameSignatures = this.callStack.map(f => `${f.className}.${f.methodName}`)
    const seen = new Set<string>()
    const repeating: Array<{ className: string; methodName: string }> = []

    for (const sig of frameSignatures) {
      if (seen.has(sig)) {
        const [className, methodName] = sig.split('.')
        repeating.push({ className, methodName })
      }
      seen.add(sig)
    }

    if (repeating.length > 0) {
      this.recursionInfo = {
        depth: this.callStack.length,
        repeatingFrames: repeating,
        isRecursive: true,
      }
    } else {
      this.recursionInfo = null
    }
  }

  /**
   * Resets execution state
   */
  private resetExecutionState(): void {
    this.eventBuffer = []
    this.currentSnapshot = null
    this.snapshots = []
    this.variables.clear()
    this.callStack = []
    this.heap.clear()
    this.output = ''
    this.wasmModule?.reset()
  }

  /**
   * Registers a callback for snapshot collection
   * 
   * @param callback - Function to call when snapshot is created
   */
  onSnapshot(callback: (snapshot: ExecutionSnapshot) => void): void {
    this.snapshotCallbacks.push(callback)
  }

  /**
   * Removes a snapshot callback
   * 
   * @param callback - Callback function to remove
   */
  offSnapshot(callback: (snapshot: ExecutionSnapshot) => void): void {
    this.snapshotCallbacks = this.snapshotCallbacks.filter(cb => cb !== callback)
  }

  /**
   * Executes code step-by-step (for manual stepping)
   * 
   * TODO: Implement step execution in WASM runtime
   * 
   * @param instrumentedCode - Instrumented Java code
   * @returns Promise resolving to next snapshot, or null if complete
   */
  async step(instrumentedCode: InstrumentationResult): Promise<ExecutionSnapshot | null> {
    // TODO: Implement step-by-step execution
    // This allows manual control over execution flow
    return null
  }

  /**
   * Pauses execution (if running)
   */
  pause(): void {
    // TODO: Implement pause mechanism in WASM runtime
  }

  /**
   * Resumes execution (if paused)
   */
  resume(): void {
    // TODO: Implement resume mechanism in WASM runtime
  }

  /**
   * Stops execution and cleans up
   */
  stop(): void {
    this.resetExecutionState()
    this.snapshotCallbacks = []
  }

  /**
   * Resets the runner state
   */
  reset(): void {
    this.resetExecutionState()
    this.snapshotCallbacks = []
  }

  /**
   * Checks if runtime is initialized
   * 
   * @returns True if runtime is ready
   */
  isReady(): boolean {
    return this.isInitialized
  }
}
