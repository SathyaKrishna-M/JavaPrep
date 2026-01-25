'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiClock, FiActivity, FiCpu, FiTrendingUp } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'Benchmarking & Performance Analysis',
    explanationSections: [
        {
            title: '1️⃣ What is Benchmarking?',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Benchmarking is the practice of running a computer program, a set of programs, or other operations, in order to assess their relative performance.
                    </p>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                        <p className="text-purple-300 font-semibold mb-2">Why isn't Big-O enough?</p>
                        <p className="text-gray-300 text-sm">
                            Big-O (<MathRenderer math="O(n)" />) gives us the <em>growth rate</em>, but it hides the constant factors and hardware specifics (cache hits, branch prediction). Benchmarking measures the <strong>actual wall-clock time</strong>.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ How to Benchmark in Java',
            icon: <FiClock className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Use <code>System.nanoTime()</code> for high-precision timing.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="text-green-300 text-xs mb-2">Basic Template:</p>
                        <code className="text-gray-300 text-sm">
                            long startTime = System.nanoTime();<br />
                            <br />
                            // ... Code to test (e.g., sorting an array) ...<br />
                            <br />
                            long endTime = System.nanoTime();<br />
                            long duration = (endTime - startTime); // in nanoseconds<br />
                            System.out.println("Time taken: " + duration + " ns");
                        </code>
                    </div>
                    <div className="text-xs text-amber-400 mt-2">
                        Note: Run the code multiple times (warm-up) to let the JVM Just-In-Time (JIT) compiler optimize it for accurate results.
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Comparing Sorting Algorithms',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A classic mini-project is to cmpare Bubble Sort vs Merge Sort.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-800/50 text-cyan-400">
                                <tr>
                                    <th className="px-4 py-3">Input Size (N)</th>
                                    <th className="px-4 py-3">Bubble Sort (Approx)</th>
                                    <th className="px-4 py-3">Merge Sort (Approx)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-gray-300">
                                <tr>
                                    <td className="px-4 py-2">1,000</td>
                                    <td className="px-4 py-2">3 ms</td>
                                    <td className="px-4 py-2">&lt; 1 ms</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">10,000</td>
                                    <td className="px-4 py-2">150 ms</td>
                                    <td className="px-4 py-2">2 ms</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">100,000</td>
                                    <td className="px-4 py-2">15,000 ms (15s)</td>
                                    <td className="px-4 py-2">15 ms</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-gray-400 text-xs italic">
                        *Actual results depend on your CPU speed.
                    </p>
                </div>
            ),
        },
        {
            title: '4️⃣ Java Microbenchmarking Harness (JMH)',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        For professional-grade benchmarking, avoid manual <code>nanoTime()</code> loops and use <strong>JMH</strong>.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li>Handles JVM Warmup automatically.</li>
                        <li>Avoids "dead code elimination" (where JVM skips code that does nothing).</li>
                        <li>Provides statistical average and error margins.</li>
                    </ul>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "Why should we run a benchmark multiple times?",
            solution: "To account for background OS processes and to allow the JVM JIT compiler to 'warm up' and optimize the code.",
        },
        {
            question: "If algorithm A is O(n) and B is O(log n), will B always be faster?",
            solution: "Not necessarily for small N. The constant factors and overhead in B might make it slower than A for very small inputs.",
        }
    ],
    exampleProblems: [],
}

export default function BenchmarkingPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
