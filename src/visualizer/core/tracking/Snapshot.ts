/**
 * Snapshot System for Java Execution Tracking
 * 
 * Defines the data structures and management for execution snapshots
 * that capture the state of the Java program at each step.
 * 
 * TODO: Implement snapshot creation from WASM callbacks
 * TODO: Implement snapshot serialization/deserialization
 * TODO: Implement snapshot diffing for efficient storage
 * TODO: Implement snapshot filtering and querying
 */

export interface Variable {
  name: string
  value: any
  type: string
  scope?: string
}

export interface HeapObject {
  id: string
  type: string
  fields: Record<string, any>
  references?: string[] // IDs of referenced objects
  shallowPreview?: Record<string, any> // Lightweight field preview
  createdAt?: number // Step index when created
}

export interface CollectionPreview {
  objectId: string
  type: string // "ArrayList", "HashMap", etc.
  size: number
  elementsPreview?: any[] // First N elements
  keysPreview?: any[] // For maps: first N keys
  valuesPreview?: any[] // For maps: first N values
}

export interface ExceptionInfo {
  type: string
  message: string
  line: number
  stack?: string[]
  throwSite?: number // Step index where thrown
  catchSite?: number // Step index where caught
}

export interface ReturnValue {
  method: string
  value: any
  type?: string
}

export interface RecursionInfo {
  depth: number
  repeatingFrames: Array<{ className: string; methodName: string }>
  isRecursive: boolean
}

export interface StaticInitInfo {
  className: string
  status: 'started' | 'completed'
  stepIndex: number
}

export interface StackFrame {
  methodName: string
  className: string
  lineNumber: number
  localVariables: Variable[]
  parameters?: Variable[]
}

export interface ExecutionSnapshot {
  stepIndex: number
  lineNumber: number
  timestamp: number
  variables: Variable[]
  callStack: StackFrame[]
  heap: HeapObject[]
  output: string
  explanation?: string
  conditionResult?: boolean
  arrayState?: Array<{ index: number; value: any; highlighted?: boolean }>
  
  // Milestone D: Advanced features
  collectionsPreview?: Map<string, CollectionPreview> // objectId -> preview
  exception?: ExceptionInfo | null
  lastReturn?: ReturnValue | null
  activeTryId?: string | null
  activeFinallyId?: string | null
  staticInits?: StaticInitInfo[]
  recursionInfo?: RecursionInfo
  thisReference?: string // Object ID of 'this' in current method
}

export class SnapshotManager {
  private snapshots: ExecutionSnapshot[] = []
  private currentIndex: number = -1

  /**
   * Adds a new snapshot to the collection
   * 
   * TODO: Validate snapshot data
   * TODO: Optimize storage (diff-based compression)
   * TODO: Handle snapshot deduplication
   * 
   * @param snapshot - Execution snapshot to add
   */
  addSnapshot(snapshot: ExecutionSnapshot): void {
    // TODO: Implement snapshot validation and optimization
    this.snapshots.push(snapshot)
    this.currentIndex = this.snapshots.length - 1
  }

  /**
   * Loads snapshots from an array (e.g., from WASM execution)
   * 
   * TODO: Validate all snapshots
   * TODO: Sort snapshots by stepIndex
   * TODO: Build index for fast lookup
   * 
   * @param snapshots - Array of execution snapshots
   */
  load(snapshots: ExecutionSnapshot[]): void {
    // TODO: Implement validation and sorting
    this.snapshots = snapshots.sort((a, b) => a.stepIndex - b.stepIndex)
    this.currentIndex = this.snapshots.length > 0 ? 0 : -1
  }

  /**
   * Gets snapshot at a specific step index
   * 
   * @param index - Step index (0-based)
   * @returns Snapshot at index, or null if not found
   */
  getSnapshot(index: number): ExecutionSnapshot | null {
    if (index >= 0 && index < this.snapshots.length) {
      return this.snapshots[index]
    }
    return null
  }

  /**
   * Gets the current snapshot
   * 
   * @returns Current snapshot, or null if none
   */
  getCurrentSnapshot(): ExecutionSnapshot | null {
    if (this.currentIndex >= 0 && this.currentIndex < this.snapshots.length) {
      return this.snapshots[this.currentIndex]
    }
    return null
  }

  /**
   * Gets snapshot at a specific line number
   * 
   * TODO: Build line number index for O(1) lookup
   * TODO: Handle multiple snapshots at same line
   * 
   * @param lineNumber - Line number to find
   * @returns Array of snapshots at that line
   */
  getSnapshotsAtLine(lineNumber: number): ExecutionSnapshot[] {
    // TODO: Implement efficient line-based lookup
    return this.snapshots.filter(s => s.lineNumber === lineNumber)
  }

  /**
   * Gets all snapshots
   * 
   * @returns Array of all snapshots
   */
  getAllSnapshots(): ExecutionSnapshot[] {
    return [...this.snapshots]
  }

  /**
   * Gets total number of snapshots
   * 
   * @returns Total snapshot count
   */
  getSnapshotCount(): number {
    return this.snapshots.length
  }

  /**
   * Sets the current snapshot index
   * 
   * @param index - Step index to set as current
   */
  setCurrentIndex(index: number): void {
    if (index >= 0 && index < this.snapshots.length) {
      this.currentIndex = index
    }
  }

  /**
   * Gets the current snapshot index
   * 
   * @returns Current index, or -1 if no snapshots
   */
  getCurrentIndex(): number {
    return this.currentIndex
  }

  /**
   * Gets the next snapshot
   * 
   * @returns Next snapshot, or null if at end
   */
  next(): ExecutionSnapshot | null {
    if (this.currentIndex < this.snapshots.length - 1) {
      this.currentIndex++
      return this.getCurrentSnapshot()
    }
    return null
  }

  /**
   * Gets the previous snapshot
   * 
   * @returns Previous snapshot, or null if at start
   */
  prev(): ExecutionSnapshot | null {
    if (this.currentIndex > 0) {
      this.currentIndex--
      return this.getCurrentSnapshot()
    }
    return null
  }

  /**
   * Seeks to a specific step index
   * 
   * @param index - Step index to seek to
   * @returns Snapshot at index, or null if not found
   */
  seek(index: number): ExecutionSnapshot | null {
    this.setCurrentIndex(index)
    return this.getCurrentSnapshot()
  }

  /**
   * Gets the total number of snapshots
   * 
   * @returns Total snapshot count
   */
  length(): number {
    return this.snapshots.length
  }

  /**
   * Gets snapshot at step index (alias for getSnapshot)
   * 
   * @param step - Step index
   * @returns Snapshot at step, or null if not found
   */
  getStep(step: number): ExecutionSnapshot | null {
    return this.getSnapshot(step)
  }

  /**
   * Clears all snapshots
   * 
   * TODO: Clean up any resources
   */
  clear(): void {
    this.snapshots = []
    this.currentIndex = -1
  }

  /**
   * Gets the difference between two snapshots
   * 
   * TODO: Implement efficient diff algorithm
   * TODO: Track variable changes, heap changes, output changes
   * 
   * @param fromIndex - Starting snapshot index
   * @param toIndex - Ending snapshot index
   * @returns Diff object showing what changed
   */
  getDiff(fromIndex: number, toIndex: number): {
    variablesChanged: Variable[]
    heapChanged: HeapObject[]
    outputAdded: string
    stackChanged: boolean
  } {
    // TODO: Implement snapshot diffing
    const from = this.getSnapshot(fromIndex)
    const to = this.getSnapshot(toIndex)
    
    if (!from || !to) {
      return {
        variablesChanged: [],
        heapChanged: [],
        outputAdded: '',
        stackChanged: false,
      }
    }

    // TODO: Compare variables, heap, output, stack
    return {
      variablesChanged: [],
      heapChanged: [],
      outputAdded: to.output.slice(from.output.length),
      stackChanged: false,
    }
  }

  /**
   * Exports snapshots to JSON
   * 
   * TODO: Implement serialization with proper formatting
   * 
   * @returns JSON string of all snapshots
   */
  exportToJSON(): string {
    // TODO: Implement proper JSON serialization
    return JSON.stringify(this.snapshots, null, 2)
  }

  /**
   * Imports snapshots from JSON
   * 
   * TODO: Implement deserialization with validation
   * 
   * @param json - JSON string of snapshots
   */
  importFromJSON(json: string): void {
    // TODO: Implement JSON deserialization and validation
    try {
      const snapshots = JSON.parse(json) as ExecutionSnapshot[]
      this.load(snapshots)
    } catch (error) {
      console.error('Failed to import snapshots:', error)
    }
  }
}

