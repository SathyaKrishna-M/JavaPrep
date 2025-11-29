/**
 * Core Visualizer Module Exports
 * 
 * Central export point for all core visualizer functionality.
 */

export { JavaInstrumenter, type InstrumentationResult, type HookInfo } from './instrumenter/JavaInstrumenter'
export { JavaRunner, type RunnerConfig } from './runner/JavaRunner'
export { SnapshotManager, type ExecutionSnapshot, type Variable, type HeapObject, type StackFrame } from './tracking/Snapshot'

