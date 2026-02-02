'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    SortingStep,
    generateBubbleSortSteps,
    generateSelectionSortSteps,
    generateInsertionSortSteps,
    generateMergeSortSteps,
    generateQuickSortSteps
} from '@/lib/sortingAlgorithms';
import { FiPlay, FiPause, FiRotateCcw, FiSkipForward, FiSettings } from 'react-icons/fi';

interface Item {
    id: string; // Stable ID for React reconciliation
    value: number;
}

const ALGORITHMS = {
    'Bubble Sort': generateBubbleSortSteps,
    'Selection Sort': generateSelectionSortSteps,
    'Insertion Sort': generateInsertionSortSteps,
    'Merge Sort': generateMergeSortSteps,
    'Quick Sort': generateQuickSortSteps,
};

// Explicit Hex Colors (No Tailwind classes allowed for dynamic values to avoid conflicts)
const COLORS = {
    DEFAULT: '#06b6d4', // cyan-500
    COMPARE: '#facc15', // yellow-400
    SWAP: '#ef4444',    // red-500
    PIVOT: '#a855f7',   // purple-500
    SORTED: '#22c55e',  // green-500
};

const DEFAULT_ARRAY_SIZE = 20;
const MIN_VALUE = 5;
const MAX_VALUE = 100;
const ANIMATION_SPEED_MIN = 10;
const ANIMATION_SPEED_MAX = 800;

export default function SortingVisualizer() {
    // -------------------------------------------------------------------------
    // STATE
    // -------------------------------------------------------------------------
    const [items, setItems] = useState<Item[]>([]);
    const [originalItems, setOriginalItems] = useState<Item[]>([]);
    const [steps, setSteps] = useState<SortingStep<Item>[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(200);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<keyof typeof ALGORITHMS>('Bubble Sort');

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const logContainerRef = useRef<HTMLDivElement>(null);

    // -------------------------------------------------------------------------
    // INITIALIZATION
    // -------------------------------------------------------------------------
    const generateRandomArray = useCallback(() => {
        // Generate random values with stable IDs
        const newItems: Item[] = Array.from({ length: DEFAULT_ARRAY_SIZE }, (_, i) => ({
            id: `item-${Date.now()}-${i}`,
            value: Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
        }));
        setItems(newItems);
        setOriginalItems([...newItems]);
        setSteps([]);
        setCurrentStep(0);
        setIsPlaying(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        generateRandomArray();
    }, [generateRandomArray]);

    // -------------------------------------------------------------------------
    // SORTING LOGIC TRIGGER
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (originalItems.length > 0) {
            const generator = ALGORITHMS[selectedAlgorithm];
            // Pure function generates a full trace of steps based on the STARTING state
            const generatedSteps = generator([...originalItems], (item) => item.value);
            setSteps(generatedSteps);

            // If we switch algorithms mid-play, reset to start
            if (currentStep > 0 && !isPlaying) {
                setItems([...originalItems]);
                setCurrentStep(0);
            }
        }
    }, [selectedAlgorithm, originalItems]);

    // -------------------------------------------------------------------------
    // ANIMATION ENGINE
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (isPlaying) {
            const run = () => {
                if (currentStep < steps.length) {
                    processStep(currentStep); // Apply logic for THIS step
                    setCurrentStep(prev => prev + 1);
                    timeoutRef.current = setTimeout(run, speed);
                } else {
                    setIsPlaying(false); // Done
                }
            };
            timeoutRef.current = setTimeout(run, speed);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isPlaying, currentStep, steps, speed]);

    // Auto-scroll log
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [currentStep]);


    // -------------------------------------------------------------------------
    // STEP PROCESSOR
    // -------------------------------------------------------------------------
    const processStep = (stepIndex: number) => {
        if (stepIndex >= steps.length) return;
        const step = steps[stepIndex];

        if (step.type === 'swap') {
            setItems(prev => {
                const newItems = [...prev];
                const [i, j] = step.indices;
                // Perform the actual swap in React state
                // Because we use key={item.id}, React knows these moved.
                // CSS transition will animate the 'left' property change.
                [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
                return newItems;
            });
        } else if (step.type === 'overwrite' && step.arrayState) {
            // Complex updates (like Merge Sort)
            setItems(step.arrayState);
        }
        // 'compare', 'sorted', 'pivot' only affect visualization colors, not structure
        // But we rely on 'currentStep' to derive colors during render, so no state change needed here.
    };

    const handleStepForward = () => {
        if (currentStep < steps.length) {
            processStep(currentStep);
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleReset = () => {
        setIsPlaying(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setItems([...originalItems]);
        setCurrentStep(0);
    };


    // -------------------------------------------------------------------------
    // RENDER HELPERS
    // -------------------------------------------------------------------------

    // Memoize sorted status for performance
    const sortedIndicesSet = new Set<number>();
    for (let i = 0; i < currentStep; i++) {
        if (steps[i].type === 'sorted') {
            steps[i].indices.forEach(idx => sortedIndicesSet.add(idx));
        }
    }

    const getBarColor = (index: number) => {
        if (currentStep < steps.length && steps[currentStep].indices.includes(index)) {
            const step = steps[currentStep];
            switch (step.type) {
                case 'compare': return COLORS.COMPARE;
                case 'swap':
                case 'overwrite': return COLORS.SWAP;
                case 'pivot': return COLORS.PIVOT;
                case 'sorted': return COLORS.SORTED;
            }
        }
        if (sortedIndicesSet.has(index)) {
            return COLORS.SORTED;
        }
        return COLORS.DEFAULT;
    };

    return (
        <div className="flex flex-col gap-6 w-full font-sans">

            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">

                {/* 1. CONTROLS */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <select
                            value={selectedAlgorithm}
                            onChange={(e) => {
                                setIsPlaying(false);
                                setSelectedAlgorithm(e.target.value as any);
                            }}
                            className="bg-slate-800 text-cyan-400 border border-slate-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 hover:bg-slate-700 transition"
                        >
                            {Object.keys(ALGORITHMS).map(algo => (
                                <option key={algo} value={algo}>{algo}</option>
                            ))}
                        </select>

                        <button
                            onClick={generateRandomArray}
                            className="p-2 text-gray-400 hover:text-white transition tooltip"
                            title="Randomize Array"
                        >
                            <FiSettings className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`p-2 rounded-full transition ${isPlaying ? 'bg-orange-500 text-white' : 'bg-green-500 text-white hover:bg-green-400'}`}
                        >
                            {isPlaying ? <FiPause className="w-5 h-5 fill-current" /> : <FiPlay className="w-5 h-5 fill-current" />}
                        </button>

                        <button
                            onClick={handleStepForward}
                            disabled={isPlaying || currentStep >= steps.length}
                            className="p-2 text-cyan-400 hover:text-cyan-200 disabled:opacity-30 transition"
                        >
                            <FiSkipForward className="w-5 h-5" />
                        </button>

                        <button
                            onClick={handleReset}
                            className="p-2 text-red-400 hover:text-red-200 transition"
                        >
                            <FiRotateCcw className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 ml-2 border-l border-slate-600 pl-4">
                            <span className="text-xs text-gray-400">Speed</span>
                            <input
                                type="range"
                                min={ANIMATION_SPEED_MIN}
                                max={ANIMATION_SPEED_MAX}
                                step={50}
                                value={ANIMATION_SPEED_MAX - speed + ANIMATION_SPEED_MIN}
                                onChange={(e) => setSpeed(ANIMATION_SPEED_MAX - parseInt(e.target.value) + ANIMATION_SPEED_MIN)}
                                className="w-24 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. VISUALIZATION CANVAS (Absolute Positioning) */}
                <div className="relative w-full h-[350px] bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                    {items.map((item, index) => {
                        const barWidth = 100 / items.length; // Percentage width
                        const leftPos = index * barWidth;      // Percentage left

                        return (
                            <div
                                key={item.id}
                                className="absolute bottom-0 rounded-t-sm shadow-md transition-all ease-in-out"
                                style={{
                                    // Robust positioning
                                    left: `${leftPos}%`,
                                    width: `${barWidth * 0.8}%`, // 80% of slot width for gap
                                    marginLeft: `${barWidth * 0.1}%`, // Center in slot
                                    height: `${item.value}%`,

                                    // Dynamic Color
                                    backgroundColor: getBarColor(index),

                                    // CSS Transition for smooth movement
                                    // We animate 'left' (swap), 'height' (update), 'background-color' (compare)
                                    transition: `all ${speed / 1000}s ease-in-out`
                                }}
                            >
                                {/* Optional: Value Text for small arrays */}
                                {items.length <= 20 && (
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-mono">
                                        {item.value}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* 3. LOGS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col justify-center items-center text-center min-h-[100px]">
                    <h4 className="text-cyan-400 font-semibold mb-2 text-sm uppercase tracking-wider">Current Operation</h4>
                    {steps[currentStep] ? (
                        <p className="text-xl text-white font-medium">
                            {steps[currentStep].description}
                        </p>
                    ) : (
                        <p className="text-gray-500 italic">Ready to sort...</p>
                    )}
                </div>

                <div
                    ref={logContainerRef}
                    className="bg-slate-800/30 p-4 rounded-lg border border-slate-700 h-[200px] overflow-y-auto flex flex-col relative"
                >
                    <h5 className="text-gray-500 text-xs font-bold uppercase tracking-widest sticky top-0 bg-slate-900/90 py-1 mb-2 z-10 w-full border-b border-gray-700">Execution Log</h5>

                    <div className="flex flex-col gap-2 mt-auto">
                        {steps.slice(Math.max(0, currentStep - 5), currentStep).map((step, i) => (
                            <div key={currentStep - 5 + i} className="opacity-60 text-xs text-gray-400 pl-2 border-l-2 border-gray-600 py-1">
                                <span className="uppercase text-[10px]">Step {currentStep - 5 + i + 1}:</span> {step.description}
                            </div>
                        ))}

                        {steps[currentStep] && (
                            <div className="text-sm text-cyan-300 pl-2 border-l-2 border-cyan-500 py-1 bg-cyan-900/10 rounded-r">
                                <span className="uppercase text-[10px] font-bold text-cyan-500 block">Current Step {currentStep + 1}:</span>
                                {steps[currentStep].description}
                            </div>
                        )}

                        {steps[currentStep + 1] && (
                            <div className="opacity-40 text-xs text-gray-400 pl-2 border-l-2 border-gray-700 py-1">
                                <span className="uppercase text-[10px] font-bold">Next:</span> {steps[currentStep + 1].description}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
