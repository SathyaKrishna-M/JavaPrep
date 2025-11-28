/**
 * Loop Output Regression Test
 * 
 * Tests that looped System.out.print calls produce correct output and multiple snapshots.
 */

import { JavaInstrumenter } from '../../instrumenter/JavaInstrumenter'
import { JavaRunner } from '../JavaRunner'
import { ExecutionSnapshot } from '../../tracking/Snapshot'

const LOOP_TEST_CODE = `public class Example {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`

describe('Loop Output Test', () => {
  it('should produce 5+ output events and correct final output', async () => {
    // Instrument the code
    const instrumented = JavaInstrumenter.instrument(LOOP_TEST_CODE)
    
    // Verify instrumentation
    expect(instrumented.instrumentedCode).toBeDefined()
    expect(instrumented.hooks.length).toBeGreaterThan(0)
    
    // Check that System.out.print was replaced
    const hasCaptureOutput = instrumented.instrumentedCode.includes('VisualizerRuntime.captureOutput')
    expect(hasCaptureOutput).toBe(true)
    
    // Check that original System.out.print was removed
    const hasOriginalPrint = instrumented.instrumentedCode.match(/System\.out\.print\s*\([^)]*\)/)
    expect(hasOriginalPrint).toBeNull()
    
    // Initialize runner
    const runner = new JavaRunner()
    await runner.initializeRuntime()
    
    // Run the code
    const snapshots = await runner.run(instrumented, {
      maxSteps: 1000,
      timeout: 10000,
    })
    
    // Assertions
    expect(snapshots.length).toBeGreaterThanOrEqual(5) // At least 5 iterations
    
    // Count output events (snapshots with output changes)
    const outputSnapshots = snapshots.filter((snap, idx) => {
      const prevOutput = idx > 0 ? snapshots[idx - 1].output : ''
      return snap.output !== prevOutput
    })
    expect(outputSnapshots.length).toBeGreaterThanOrEqual(5) // At least 5 output events
    
    // Check final output
    const finalSnapshot = snapshots[snapshots.length - 1]
    expect(finalSnapshot.output).toContain('1')
    expect(finalSnapshot.output).toContain('2')
    expect(finalSnapshot.output).toContain('3')
    expect(finalSnapshot.output).toContain('4')
    expect(finalSnapshot.output).toContain('5')
    expect(finalSnapshot.output.trim()).toMatch(/1\s+2\s+3\s+4\s+5/)
    
    // Check that variable 'i' changes through values 1-5
    const iSnapshots = snapshots.filter(snap => 
      snap.variables.some(v => v.name === 'i')
    )
    expect(iSnapshots.length).toBeGreaterThanOrEqual(5)
    
    // Verify i values
    const iValues = new Set<number>()
    snapshots.forEach(snap => {
      const iVar = snap.variables.find(v => v.name === 'i')
      if (iVar && typeof iVar.value === 'number') {
        iValues.add(iVar.value)
      }
    })
    expect(iValues.has(1)).toBe(true)
    expect(iValues.has(2)).toBe(true)
    expect(iValues.has(3)).toBe(true)
    expect(iValues.has(4)).toBe(true)
    expect(iValues.has(5)).toBe(true)
  }, 30000) // 30 second timeout
})

