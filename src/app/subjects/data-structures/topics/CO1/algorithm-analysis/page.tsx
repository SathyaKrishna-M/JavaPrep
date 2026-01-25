'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiClock, FiDatabase, FiActivity, FiTrendingUp, FiAlertOctagon, FiCheckSquare, FiCode, FiCpu, FiBarChart2 } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'Algorithm Analysis',
    explanationSections: [
        {
            title: '1️⃣ What is an Algorithm?',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        An <span className="text-cyan-400 font-semibold">algorithm</span> is a step-by-step procedure or set of rules to be followed in calculations or other problem-solving operations.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Characteristics of a Good Algorithm:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong className="text-white">Correctness:</strong> Produces the correct output for every valid input.</li>
                            <li><strong className="text-white">Finiteness:</strong> Terminates after a limited number of steps.</li>
                            <li><strong className="text-white">Definiteness:</strong> Each step is clearly defined and unambiguous.</li>
                            <li><strong className="text-white">Input & Output:</strong> Takes 0+ inputs and produces 1+ outputs.</li>
                            <li><strong className="text-white">Efficiency:</strong> Uses time and resources effectively.</li>
                        </ul>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                        <p className="text-purple-300 font-semibold mb-1">Real-World Analogy:</p>
                        <p className="text-gray-300 text-sm">
                            <strong>Recipe:</strong> A recipe is an algorithm for cooking. Inputs = Ingredients. Steps = Instructions. Output = Meal. <br />
                            <strong>Navigation:</strong> Google Maps uses algorithms (like Dijkstra's) to find the best route.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Why Algorithm Analysis is Needed',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        We analyze algorithms to compare their performance independently of the hardware they run on.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h5 className="text-teal-400 font-bold mb-2">Importance</h5>
                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                <li><strong>Machine Independence:</strong> Compare logic, not CPU speed.</li>
                                <li><strong>Prediction:</strong> Know if code will crash on large data.</li>
                                <li><strong>Optimization:</strong> Save money on server costs.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h5 className="text-teal-400 font-bold mb-2">Comparison Example</h5>
                            <p className="text-gray-300 text-sm mb-2">Searching a name in a phonebook:</p>
                            <ul className="text-gray-400 text-sm space-y-1">
                                <li><span className="text-red-400">Linear Search:</span> Check every name. Slow.</li>
                                <li><span className="text-green-400">Binary Search:</span> Jump to middle repeatedly. Fast.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Time Complexity',
            icon: <FiClock className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">3.1 Definition</h4>
                        <p className="text-gray-300">
                            Time Complexity is the amount of time an algorithm takes to complete as a function of the length of the input. We count <strong>elementary operations</strong> (assignments, comparisons), not seconds.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">3.2 Types of Analysis</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-green-900/20 p-3 rounded border border-green-500/20">
                                <p className="text-green-300 font-semibold">Best Case</p>
                                <p className="text-gray-400 text-sm">Minimum time required (e.g., Item found at start).</p>
                                <p className="text-xs text-gray-500 mt-1">Notation: <MathRenderer math="\Omega" /></p>
                            </div>
                            <div className="bg-yellow-900/20 p-3 rounded border border-yellow-500/20">
                                <p className="text-yellow-300 font-semibold">Average Case</p>
                                <p className="text-gray-400 text-sm">Expected time over all possible inputs.</p>
                                <p className="text-xs text-gray-500 mt-1">Notation: <MathRenderer math="\Theta" /></p>
                            </div>
                            <div className="bg-red-900/20 p-3 rounded border border-red-500/20">
                                <p className="text-red-300 font-semibold">Worst Case</p>
                                <p className="text-gray-400 text-sm">Maximum time required (e.g., Item not found).</p>
                                <p className="text-xs text-gray-500 mt-1">Notation: <MathRenderer math="O" /></p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-2 italic">In practice, algorithms are usually analyzed using <strong>worst-case time complexity</strong> to guarantee performance bounds.</p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold text-orange-400 mb-2">3.3 How to Calculate</h4>
                        <div className="bg-black/30 p-4 rounded-lg space-y-4">
                            <div>
                                <p className="text-blue-300 text-sm font-semibold">1. Single Loop</p>
                                <code className="block text-gray-300 text-xs mt-1">
                                    for(int i=0; i&lt;n; i++) &#123; // Runs n times <br />
                                    &nbsp;&nbsp;print(i); // Constant time <br />
                                    &#125;
                                </code>
                                <p className="text-teal-400 text-xs text-right">Total: O(n)</p>
                            </div>
                            <div>
                                <p className="text-blue-300 text-sm font-semibold">2. Nested Loops</p>
                                <code className="block text-gray-300 text-xs mt-1">
                                    for(int i=0; i&lt;n; i++) &#123; // Runs n times <br />
                                    &nbsp;&nbsp;for(int j=0; j&lt;n; j++) &#123; // Runs n times for EACH i <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;print(j); <br />
                                    &nbsp;&nbsp;&#125; <br />
                                    &#125;
                                </code>
                                <p className="text-teal-400 text-xs text-right">Total: O(n * n) = O(n²)</p>
                            </div>
                            <div>
                                <p className="text-blue-300 text-sm font-semibold">3. Conditional</p>
                                <code className="block text-gray-300 text-xs mt-1">
                                    if (condition) &#123; <br />
                                    &nbsp;&nbsp;// O(1) block <br />
                                    &#125; else &#123; <br />
                                    &nbsp;&nbsp;// O(n) block <br />
                                    &#125;
                                </code>
                                <p className="text-teal-400 text-xs text-right">Worst Case: Max(O(1), O(n)) = O(n)</p>
                                <p className="text-gray-500 text-xs mt-1">When analyzing conditionals, the maximum path is considered for worst-case complexity.</p>
                            </div>
                        </div>
                    </div>
                </div >
            ),
        },
        {
            title: '4️⃣ Space Complexity',
            icon: <FiDatabase className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">4.1 Definition</h4>
                        <p className="text-gray-300">
                            Space Complexity is the amount of memory an algorithm uses.
                        </p>
                        <div className="bg-slate-800/50 p-3 rounded mt-2">
                            <MathRenderer math="\text{Total Space} = \text{Fixed Part (Constants)} + \text{Variable Part (Inputs)}" display={false} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-900/10 p-3 rounded border border-blue-500/20">
                            <p className="text-blue-300 font-semibold mb-1">Input Space</p>
                            <p className="text-gray-400 text-sm">Space used to store the input data itself.</p>
                            <code className="text-xs text-gray-500 mt-1 block">int arr[n]; // O(n)</code>
                        </div>
                        <div className="bg-blue-900/10 p-3 rounded border border-blue-500/20">
                            <p className="text-blue-300 font-semibold mb-1">Auxiliary Space</p>
                            <p className="text-gray-400 text-sm">Extra space used temporarily by the algorithm. Output space is generally not counted toward space complexity unless explicitly stated.</p>
                            <code className="text-xs text-gray-500 mt-1 block">int temp; // O(1)</code>
                        </div>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg">
                        <p className="text-purple-300 font-semibold mb-2">Recursion Stack Example</p>
                        <code className="block text-gray-300 text-xs">
                            void recursive(int n) &#123; <br />
                            &nbsp;&nbsp;if (n &lt;= 0) return; <br />
                            &nbsp;&nbsp;recursive(n-1); <br />
                            &#125;
                        </code>
                        <p className="text-gray-400 text-sm mt-2">
                            Each call adds a frame to the stack. If <MathRenderer math="n=10" />, standard usage is <MathRenderer math="O(n)" /> stack space.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '5️⃣ Asymptotic Notations',
            icon: <FiBarChart2 className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        These notations describe the limiting behavior of a function (growth rate) for large inputs.
                    </p>

                    <div className="space-y-4">
                        <div className="bg-red-900/10 p-4 rounded border-l-4 border-red-500">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-lg font-bold text-red-400">Big-O Notation <MathRenderer math="(O)" /></h4>
                                <span className="text-xs bg-red-900 text-red-200 px-2 py-1 rounded">Upper Bound</span>
                            </div>
                            <p className="text-gray-300 text-sm">Represents the worst-case scenario. The algorithm will never take <em>more</em> time than this.</p>
                            <div className="mt-2 text-xs text-gray-400">
                                <MathRenderer math="f(n) \le c \cdot g(n)" /> for large n.
                            </div>
                        </div>

                        <div className="bg-green-900/10 p-4 rounded border-l-4 border-green-500">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-lg font-bold text-green-400">Big-Omega Notation <MathRenderer math="(\Omega)" /></h4>
                                <span className="text-xs bg-green-900 text-green-200 px-2 py-1 rounded">Lower Bound</span>
                            </div>
                            <p className="text-gray-300 text-sm">Big-Omega (<MathRenderer math="\Omega" />) provides a lower bound on the running time. It does not necessarily mean best case, but the minimum growth rate of the algorithm.</p>
                            <div className="mt-2 text-xs text-gray-400">
                                <MathRenderer math="f(n) \ge c \cdot g(n)" /> for large n.
                            </div>
                        </div>

                        <div className="bg-yellow-900/10 p-4 rounded border-l-4 border-yellow-500">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-lg font-bold text-yellow-400">Big-Theta Notation <MathRenderer math="(\Theta)" /></h4>
                                <span className="text-xs bg-yellow-900 text-yellow-200 px-2 py-1 rounded">Tight Bound</span>
                            </div>
                            <p className="text-gray-300 text-sm">Represents the exact bound. The algorithm runs within constant factors of this function.</p>
                            <div className="mt-2 text-xs text-gray-400">
                                <MathRenderer math="c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n)" />.
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '6️⃣ Rules for Simplifying Complexity',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">To find Big-O, follow these simple rules:</p>
                    <div className="space-y-2">
                        <div className="bg-slate-800/50 p-3 rounded flex justify-between items-center">
                            <div>
                                <strong className="text-teal-400 block">1. Drop Constants</strong>
                                <span className="text-gray-400 text-sm">Coefficients don't affect growth rate.</span>
                            </div>
                            <code className="text-gray-300 text-sm">O(2n + 3) → O(n)</code>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded flex justify-between items-center">
                            <div>
                                <strong className="text-teal-400 block">2. Ignore Lower Order Terms</strong>
                                <span className="text-gray-400 text-sm">Only the largest power matters for large n.</span>
                            </div>
                            <code className="text-gray-300 text-sm">O(n² + n) → O(n²)</code>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded flex justify-between items-center">
                            <div>
                                <strong className="text-teal-400 block">3. Logarithms &gt; linear</strong>
                                <span className="text-gray-400 text-sm">But n &gt; log n. Order: <MathRenderer math="1 < \log n < n < n^2 < 2^n" /></span>
                            </div>
                            <code className="text-gray-300 text-sm">Dominance</code>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '7️⃣ Common Code Patterns',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/30 p-3 rounded border border-gray-700">
                        <p className="text-purple-300 font-mono text-sm mb-1">for(i=0; i&lt;n; i++)</p>
                        <p className="text-white font-bold">O(n)</p>
                        <p className="text-gray-500 text-xs">Incrementing by 1.</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded border border-gray-700">
                        <p className="text-purple-300 font-mono text-sm mb-1">for(i=1; i&lt;n; i*=2)</p>
                        <p className="text-white font-bold">O(log n)</p>
                        <p className="text-gray-500 text-xs">Multiplying by 2 (doubling).</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded border border-gray-700">
                        <p className="text-purple-300 font-mono text-sm mb-1">Nested Loops (n*n)</p>
                        <p className="text-white font-bold">O(n²)</p>
                        <p className="text-gray-500 text-xs">Outer n times, Inner n times.</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded border border-gray-700">
                        <p className="text-purple-300 font-mono text-sm mb-1">Sorting (Merge/Quick)</p>
                        <p className="text-white font-bold">O(n log n)</p>
                        <p className="text-gray-500 text-xs">Divide and Conquer.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '8️⃣ Summary & Common Mistakes',
            icon: <FiAlertOctagon className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <h5 className="text-green-300 font-bold mb-2">Summary</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Algorithm:</strong> Step-by-step problem solving.</li>
                            <li><strong>Time Complexity:</strong> Growth of runtime vs input size (Operation count).</li>
                            <li><strong>Space Complexity:</strong> Growth of memory usage.</li>
                            <li><strong>Big-O:</strong> Worst-case upper bound. Most important.</li>
                            <li><strong>Drop Constants:</strong> <MathRenderer math="O(2n)" /> becomes <MathRenderer math="O(n)" />.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-red-400 font-bold">Common Mistakes</h5>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertOctagon className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Thinking <MathRenderer math="O(1)" /> means 1 second. It means <strong>constant time</strong> (0.01s or 100s).</p>
                        </div>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertOctagon className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Confusing Input Space with Auxiliary Space. Output space typically doesn't count towards auxiliary.</p>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is the time complexity of a loop that runs n times, but inside it prints 'Hello' 5 times?",
            solution: "O(n). The 5 prints are constant O(1), repeated n times. O(5n) simplifies to O(n).",
        },
        {
            question: "Why do we assume Big-O as the worst-case complexity?",
            solution: "Because it provides a guarantee. We know the algorithm will never be slower than this bound, which is crucial for critical systems.",
        },
        {
            question: "Calculate the complexity: for (int i = 1; i < n; i *= 2) { ... }",
            solution: "O(log n). The loop variable 'i' grows exponentially (1, 2, 4, 8...), so the number of steps is logarithmic.",
        },
        {
            question: "What is the space complexity of a recursive function that calculates factorial of n?",
            solution: "O(n). This is due to the recursion stack. It goes n levels deep.",
        },
        {
            question: "Difference between O(n) and O(n^2)?",
            solution: "O(n) is linear growth (10 inputs -> 10 time). O(n^2) is quadratic (10 inputs -> 100 time). O(n^2) is much slower for large inputs.",
        },
        {
            question: "MCQ: Which notation represents the lower bound of an algorithm?\n A) Big-O\n B) Big-Omega\n C) Big-Theta\n D) Little-o",
            solution: "B) Big-Omega (Ω)",
        },
        {
            question: "MCQ: What is the Big-O complexity of checking if a number is even or odd?\n A) O(1)\n B) O(n)\n C) O(log n)\n D) O(n²)",
            solution: "A) O(1) (It's a simple arithmetic check)",
        },
        {
            question: "MCQ: If an algorithm runs in O(1) time, does it take the same time for n=10 and n=1,000,000?\n A) Yes\n B) No",
            solution: "A) Yes (Constant time means clear independence from input size)",
        },
        {
            question: "Code Analysis: What is the complexity?\n for(i=0; i<n; i++) \n   for(j=0; j<m; j++) \n     print(i,j);",
            solution: "O(n * m). Since the loops are nested and dependent on independent variables n and m.",
        },
        {
            question: "Code Analysis: What is the complexity?\n i = n; \n while(i > 0) \n   i = i / 2;",
            solution: "O(log n). The variable is repeatedly halved, typical of logarithmic complexity.",
        },
        {
            question: "Code Analysis: What is the complexity?\n for(i=0; i<n; i=i+2) \n   print(i);",
            solution: "O(n). Even though it skips steps (runs n/2 times), we drop the 1/2 constant.",
        }
    ],
    exampleProblems: [],
}

export default function AlgorithmAnalysisPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
