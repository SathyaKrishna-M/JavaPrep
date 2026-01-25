'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTrendingUp, FiAnchor, FiActivity, FiLayers, FiAlertTriangle, FiCheckCircle, FiCpu } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'Mathematical Background',
    explanationSections: [
        {
            title: '1️⃣ Why Mathematical Background is Needed',
            icon: <FiAnchor className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Mathematics provides the language and tools to analyze the efficiency of algorithms. It allows us to predict how an algorithm will perform as the input size grows, without running it on a specific computer.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                            <p className="text-blue-300 font-semibold mb-2">Importance:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                <li><strong>Comparison:</strong> Determine which algorithm is better objectively.</li>
                                <li><strong>Prediction:</strong> Estimate runtime for large inputs.</li>
                                <li><strong>Optimization:</strong> Identify bottlenecks.</li>
                            </ul>
                        </div>
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                            <p className="text-purple-300 font-semibold mb-2">Real-Life Analogy:</p>
                            <p className="text-gray-300 text-sm">
                                <span className="text-cyan-300">Distance vs. Speed:</span> Knowing the distance (input size) and your speed (algorithm efficiency) helps you calculate travel time (execution time).
                            </p>
                            <p className="text-gray-300 text-sm mt-2">
                                <span className="text-cyan-300">Cost vs. Quantity:</span> Buying in bulk (large input) might have a different unit cost curve (efficiency) than buying single items.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Logarithms',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-pink-400 mb-2">2.1 What is a Logarithm?</h4>
                        <p className="text-gray-300 mb-2">
                            A logarithm is the inverse operation of exponentiation. It answers the question: <em>&quot;To what power must we raise a base number to get a specific value?&quot;</em>
                        </p>
                        <div className="bg-black/30 p-4 rounded-lg">
                            <MathRenderer math="\log_b(x) = y \iff b^y = x" display={true} />
                            <p className="text-gray-400 text-sm mt-2 text-center">Base <MathRenderer math="b" /> raised to power <MathRenderer math="y" /> equals <MathRenderer math="x" />.</p>
                        </div>
                        <p className="text-gray-300 mt-4 font-semibold">Common Bases in CS:</p>
                        <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                            <li><strong>Base 2 (Binary):</strong> Most common in CS (bits, binary search). Denoted as <MathRenderer math="\lg n" />.</li>
                            <li><strong>Base 10 (Decimal):</strong> Standard math. Denoted as <MathRenderer math="\log n" />.</li>
                            <li><strong>Base e (Natural):</strong> Calculus/Analysis. Denoted as <MathRenderer math="\ln n" />.</li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-2 italic">
                            In asymptotic analysis, the base of the logarithm is ignored because it differs only by a constant factor.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-purple-400 mb-2">2.2 Important Logarithmic Properties</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                                <p className="text-purple-300 font-semibold">Product Rule</p>
                                <MathRenderer math="\log(ab) = \log a + \log b" display={true} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                                <p className="text-purple-300 font-semibold">Quotient Rule</p>
                                <MathRenderer math="\log(a/b) = \log a - \log b" display={true} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                                <p className="text-purple-300 font-semibold">Power Rule</p>
                                <MathRenderer math="\log(a^k) = k \cdot \log a" display={true} />
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                                <p className="text-purple-300 font-semibold">Change of Base</p>
                                <MathRenderer math="\log_a n = \frac{\log_b n}{\log_b a}" display={true} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">2.3 Logarithms in Algorithms</h4>
                        <p className="text-gray-300 mb-2">
                            Logarithms often appear in "Divide and Conquer" algorithms. If you repeatedly divide a problem size by 2, the number of steps is <MathRenderer math="\log_2 n" />.
                        </p>
                        <div className="bg-blue-900/20 p-4 rounded border border-blue-500/20">
                            <p className="text-gray-300 text-sm">
                                <strong>Example (Binary Search):</strong> Finding an item in a sorted list of 1000 items takes at most <MathRenderer math="\log_2 1000 \approx 10" /> steps.
                            </p>
                            <p className="text-gray-400 text-sm mt-2 italic">
                                Note: In Big-O notation, we often ignore the base (e.g., O(log n)) because changing the base only introduces a constant multiplier rule.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Summations',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">3.1 What is a Summation?</h4>
                        <p className="text-gray-300 mb-2">
                            Summation is the addition of a sequence of numbers. It's used to analyze the running time of loops.
                        </p>
                        <div className="bg-black/30 p-4 rounded-lg flex justify-center items-center gap-4">
                            <MathRenderer math="\sum_{i=1}^{n} i = 1 + 2 + 3 + ... + n" display={false} />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">3.2 Common Summations</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-800/50 text-orange-400">
                                    <tr>
                                        <th className="px-4 py-2">Summation</th>
                                        <th className="px-4 py-2">Formula</th>
                                        <th className="px-4 py-2">Where it Appears?</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700 text-gray-300">
                                    <tr>
                                        <td className="px-4 py-2"><MathRenderer math="\sum_{i=1}^{n} 1" /></td>
                                        <td className="px-4 py-2"><MathRenderer math="n" /></td>
                                        <td className="px-4 py-2">Simple loop from 1 to n</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2"><MathRenderer math="\sum_{i=1}^{n} i" /></td>
                                        <td className="px-4 py-2"><MathRenderer math="\frac{n(n+1)}{2} \approx \frac{n^2}{2}" /></td>
                                        <td className="px-4 py-2">Nested loops (j depends on i)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2"><MathRenderer math="\sum_{i=1}^{n} i^2" /></td>
                                        <td className="px-4 py-2"><MathRenderer math="\frac{n(n+1)(2n+1)}{6} \approx \frac{n^3}{3}" /></td>
                                        <td className="px-4 py-2">Complex nested loops</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="text-gray-400 text-sm mt-4 text-center">
                                Tip: Nested loops often result in summations of summations.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Growth of Functions',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">4.1 What is Growth Rate?</h4>
                        <p className="text-gray-300">
                            Growth rate describes how the runtime of an algorithm increases as the input size <MathRenderer math="n" /> increases. We care about the "rate" (slope), not exact seconds.
                        </p>
                        <p className="text-cyan-300 text-sm mt-2 font-mono bg-black/30 p-2 rounded text-center">
                            Growth rates can be ordered as: O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ)
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">4.2 Common Growth Functions</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-900/10 p-4 rounded border border-green-500/20">
                                <p className="text-green-300 font-bold font-mono">O(1)</p>
                                <p className="text-sm text-gray-400 mb-1">Constant Time</p>
                                <p className="text-xs text-gray-500">Accessing an array element. Takes same time regardless of array size.</p>
                            </div>
                            <div className="bg-green-900/10 p-4 rounded border border-green-500/20">
                                <p className="text-green-300 font-bold font-mono">O(log n)</p>
                                <p className="text-sm text-gray-400 mb-1">Logarithmic Time</p>
                                <p className="text-xs text-gray-500">Binary Search. Doubling input only adds 1 step.</p>
                            </div>
                            <div className="bg-green-900/10 p-4 rounded border border-green-500/20">
                                <p className="text-green-300 font-bold font-mono">O(n)</p>
                                <p className="text-sm text-gray-400 mb-1">Linear Time</p>
                                <p className="text-xs text-gray-500">Reading a book. 2x pages = 2x time.</p>
                            </div>
                            <div className="bg-green-900/10 p-4 rounded border border-green-500/20">
                                <p className="text-green-300 font-bold font-mono">O(n log n)</p>
                                <p className="text-sm text-gray-400 mb-1">Linearithmic Time</p>
                                <p className="text-xs text-gray-500">Efficient Sorting (Merge Sort, Quick Sort).</p>
                            </div>
                            <div className="bg-green-900/10 p-4 rounded border border-green-500/20">
                                <p className="text-green-300 font-bold font-mono">O(n²)</p>
                                <p className="text-sm text-gray-400 mb-1">Quadratic Time</p>
                                <p className="text-xs text-gray-500">Nested loops. 2x input = 4x time.</p>
                            </div>
                            <div className="bg-green-900/10 p-4 rounded border border-green-500/20">
                                <p className="text-red-400 font-bold font-mono">O(2ⁿ)</p>
                                <p className="text-sm text-gray-400 mb-1">Exponential Time</p>
                                <p className="text-xs text-gray-500">Brute-force solutions. Very slow for large n.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '5️⃣ Recurrence Relations',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400">recurrence relation</span> is an equation that defines a sequence recursively. It's used to analyze recursive algorithms.
                    </p>
                    <p className="text-gray-300 text-sm">
                        Recurrence relations describe how a problem is reduced into smaller subproblems.
                    </p>

                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 space-y-4">
                        <div>
                            <p className="text-purple-300 font-mono font-semibold">T(n) = T(n-1) + c</p>
                            <p className="text-gray-400 text-sm">Problem size decreases by 1 each step. (e.g., Factorial, Linear Search).</p>
                        </div>
                        <div className="border-t border-purple-500/20 pt-2">
                            <p className="text-purple-300 font-mono font-semibold">T(n) = 2T(n/2) + n</p>
                            <p className="text-gray-400 text-sm">Problem divides into 2 halves, plus linear work to combine. (e.g., Merge Sort).</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '6️⃣ Mathematical Tools for Analysis',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        When analyzing Big-O, we use certain mathematical conventions to simplify expressions.
                    </p>
                    <ul className="space-y-2">
                        <li className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                            <strong className="text-teal-400">Floors and Ceilings:</strong>
                            <span className="text-gray-300 text-sm block">
                                <MathRenderer math="\lfloor 3.5 \rfloor = 3" /> and <MathRenderer math="\lceil 3.5 \rceil = 4" />. Used when inputs aren't perfect powers/integers.
                            </span>
                        </li>
                        <li className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                            <strong className="text-teal-400">Ignoring Constants:</strong>
                            <span className="text-gray-300 text-sm block">
                                <MathRenderer math="5n" /> behaves like <MathRenderer math="n" /> for large n. We drop the 5.
                            </span>
                        </li>
                        <li className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                            <strong className="text-teal-400">Ignoring Lower-Order Terms:</strong>
                            <span className="text-gray-300 text-sm block">
                                In <MathRenderer math="n^2 + n" />, <MathRenderer math="n^2" /> dominates. We ignore <MathRenderer math="n" />.
                            </span>
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: '7️⃣ Summary (Quick Revision)',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: (
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li><strong>Logarithms</strong> are the inverse of exponents. <MathRenderer math="\log_2 n" /> is the number of times you can divide n by 2.</li>
                        <li><strong>Summations</strong> help calculate the total work in loops. <MathRenderer math="\sum i = O(n^2)" />.</li>
                        <li><strong>Growth Rate</strong> matters more than exact seconds. Focus on the slope.</li>
                        <li><strong>Constants</strong> and lower-order terms are ignored in asymptotic analysis.</li>
                        <li><strong>Recurrence Relations</strong> describe recursive algorithm performance.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '8️⃣ Common Mistakes',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: (
                <div className="space-y-3">
                    <div className="border-l-4 border-red-500 pl-4 py-1">
                        <strong className="text-red-400 block">Mixed Bases</strong>
                        <p className="text-gray-400 text-sm">Assuming <MathRenderer math="\log n" /> is always base 10. In CS, it's usually base 2.</p>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-4 py-1">
                        <strong className="text-amber-400 block">Exact Time vs. Complexity</strong>
                        <p className="text-gray-400 text-sm">Comparing seconds (machine dependent) instead of operations (machine independent).</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-1">
                        <strong className="text-blue-400 block">Overthinking Constants</strong>
                        <p className="text-gray-400 text-sm">Worrying if <MathRenderer math="2n" /> is slower than <MathRenderer math="n" />. In Big-O, they are the same <MathRenderer math="O(n)" />.</p>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is the value of log₂(32)?",
            solution: "5. Because 2⁵ = 32.",
        },
        {
            question: "Simplify the summation: 1 + 2 + 3 + ... + 10.",
            solution: "Using the formula n(n+1)/2 with n=10: 10(11)/2 = 55.",
        },
        {
            question: "Which grows faster: n or log(n)?",
            solution: "n grows much faster than log(n). For n=1,000,000: n is 1 million, log(n) is only approx 20.",
        },
        {
            question: "Why do we ignore constants in Big-O analysis?",
            solution: "Because Big-O measures the growth rate (trend) as inputs become very large. Constants don't change the shape of the growth curve significantly for large n.",
        },
        {
            question: "What is the result of floor(5.9) and ceiling(5.1)?",
            solution: "floor(5.9) = 5. ceiling(5.1) = 6.",
        },
        {
            question: "MCQ: Which function represents the slowest growth?\n A) O(n)\n B) O(log n)\n C) O(1)\n D) O(n²)",
            solution: "C) O(1) (Constant time is the fastest and has zero growth)",
        },
        {
            question: "MCQ: What is the Big-O complexity of the summation of numbers from 1 to n?\n A) O(n)\n B) O(n²)\n C) O(log n)\n D) O(1)",
            solution: "B) O(n²). The sum is roughly n²/2.",
        },
        {
            question: "MCQ: The recurrence T(n) = T(n-1) + 1 typically represents which algorithm?\n A) Binary Search\n B) Merge Sort\n C) Linear Search\n D) Quick Sort",
            solution: "C) Linear Search (problem reduces by 1 element at a time)",
        },
        {
            question: "Problem: If an algorithm takes log₂(n) steps, how many steps for n=1024?",
            solution: "log₂(1024) = 10 steps.",
        },
        {
            question: "Problem: Simplify O(3n² + 10n + 500).",
            solution: "O(n²). We drop the constant (500), the lower order term (10n), and the coefficient (3).",
        }
    ],
    exampleProblems: [],
}

export default function MathematicalBackgroundPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
