'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiArrowRight, FiCheckCircle, FiCheckSquare, FiDivide } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Expression Evaluation & Applications',
    explanationSections: [
        {
            title: '1️⃣ Infix, Prefix, and Postfix Notations',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Humans read <strong>Infix</strong> (A + B), but machines prefer <strong>Postfix</strong> (A B +) or <strong>Prefix</strong> (+ A B) because they don't require parentheses or precedence rules during evaluation.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-800/50 text-cyan-400">
                                <tr>
                                    <th className="px-4 py-3">Notation</th>
                                    <th className="px-4 py-3">Structure</th>
                                    <th className="px-4 py-3">Example</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-gray-300">
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Infix</td>
                                    <td className="px-4 py-2">Operand Operator Operand</td>
                                    <td className="px-4 py-2 font-mono">A + B * C</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-purple-300">Postfix (Reverse Polish)</td>
                                    <td className="px-4 py-2">Operand Operand Operator</td>
                                    <td className="px-4 py-2 font-mono">A B C * +</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-green-300">Prefix (Polish)</td>
                                    <td className="px-4 py-2">Operator Operand Operand</td>
                                    <td className="px-4 py-2 font-mono">+ A * B C</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Infix to Postfix Conversion',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        We use a <strong>Stack</strong> to hold operators until operands are printed.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-teal-400 font-bold mb-2">Algorithm Steps:</h5>
                        <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
                            <li>Scan string from left to right.</li>
                            <li>If operand, print it.</li>
                            <li>If <code>'('</code>, push to stack.</li>
                            <li>If <code>')'</code>, pop and print until <code>'('</code> is found.</li>
                            <li>If operator, pop operators with <strong>higher or equal precedence</strong> from stack, then push current operator.</li>
                        </ol>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Infix to Prefix Conversion',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Conversion to Prefix is similar to Postfix but with a reverse strategy.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-purple-400 font-bold mb-2">Algorithm Steps:</h5>
                        <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
                            <li>Reverse the Infix expression.</li>
                            <li>Swap <code>'('</code> with <code>')'</code> and vice versa.</li>
                            <li>Convert the modified expression to <strong>Postfix</strong>.</li>
                            <li>Reverse variables in the result to get the final <strong>Prefix</strong> expression.</li>
                        </ol>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Evaluating Prefix Expression',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        To evaluate Prefix <code>+ * 2 3 5</code>, we scan from <strong>Right to Left</strong>.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-green-400 font-bold mb-2">Algorithm Steps:</h5>
                        <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
                            <li>Scan expression from <strong>Right to Left</strong>.</li>
                            <li>If operand, <strong>push</strong> to stack.</li>
                            <li>If operator, <strong>pop</strong> two operands.
                                <ul className="list-disc list-inside ml-4 text-xs text-gray-400 mt-1">
                                    <li>First pop is <code>val1</code> (top).</li>
                                    <li>Second pop is <code>val2</code> (next).</li>
                                    <li>Result = <code>val1 Operator val2</code> (Order matters!).</li>
                                </ul>
                            </li>
                            <li>Push result back to stack.</li>
                            <li>Final stack top is the answer.</li>
                        </ol>
                    </div>
                    <div className="bg-slate-800/30 p-2 rounded text-xs text-gray-400">
                        Complexity: Time <MathRenderer math="O(n)" />, Space <MathRenderer math="O(n)" />
                    </div>
                </div>
            ),
        },
        {
            title: '5️⃣ Evaluating Postfix Expression',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Evaluating <code>5 3 2 * +</code>. Correct Answer: <MathRenderer math="5 + (3 \times 2) = 11" />.
                    </p>
                    <div className="bg-yellow-500/10 p-2 rounded border border-yellow-500/30">
                        <p className="text-yellow-200 text-xs font-semibold">Important Implementation Note</p>
                        <p className="text-gray-400 text-xs">
                            This basic implementation assumes <strong>single-digit operands</strong>. For multi-digit numbers (like &quot;12&quot;), you must parse the string using a tokenizer or spaces as delimiters.
                        </p>
                    </div>
                    <CodeBlock
                        language="java"
                        code={`// Algorithm
Stack<Integer> stack = new Stack<>();
for (char c : expression) {
    if (isDigit(c)) {
        stack.push(c - '0');
    } else {
        int val1 = stack.pop();
        int val2 = stack.pop();
        // Note: val2 is the first operand!
        switch (c) {
            case '+': stack.push(val2 + val1); break;
            case '-': stack.push(val2 - val1); break;
            case '*': stack.push(val2 * val1); break;
            case '/': stack.push(val2 / val1); break;
        }
    }
}
return stack.pop();`}
                    />
                </div>
            ),
        },
        {
            title: '6️⃣ Balancing Symbols (Parentheses)',
            icon: <FiDivide className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Checking if <code>((a+b)*c)</code> is valid.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                            <li>Scan string. If <code>(</code>, <code>{'{'}</code>, <code>[</code>: Push to stack.</li>
                            <li>If <code>)</code>, <code>{'}'}</code>, <code>]</code>: Check if stack is empty (Error) or if top matches the pair. If match, Pop.</li>
                            <li>At end, stack must be empty for valid string.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '7️⃣ Summary & Complexity',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    {/* Complexity Analysis */}
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-blue-400 font-bold mb-2">Complexity Analysis</h5>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Infix → Postfix:</strong> Time <MathRenderer math="O(n)" />, Space <MathRenderer math="O(n)" /> (Stack use).</li>
                            <li><strong>Evaluation:</strong> Time <MathRenderer math="O(n)" />, Space <MathRenderer math="O(n)" />.</li>
                        </ul>
                    </div>

                    {/* Precedence Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-800/50 text-cyan-400">
                                <tr>
                                    <th className="px-4 py-2">Operator</th>
                                    <th className="px-4 py-2">Precedence</th>
                                    <th className="px-4 py-2">Associativity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-gray-300">
                                <tr>
                                    <td className="px-4 py-2 font-mono">^</td>
                                    <td className="px-4 py-2 text-red-400 font-bold">Highest</td>
                                    <td className="px-4 py-2">Right to Left</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono">* /</td>
                                    <td className="px-4 py-2 text-yellow-400 font-bold">Medium</td>
                                    <td className="px-4 py-2">Left to Right</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono">+ -</td>
                                    <td className="px-4 py-2 text-green-400 font-bold">Lowest</td>
                                    <td className="px-4 py-2">Left to Right</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Common Mistakes */}
                    <div className="bg-red-900/10 p-4 rounded-lg border border-red-500/30">
                        <h5 className="text-red-400 font-bold mb-2">Common Mistakes</h5>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li>Popping operands in the <strong>wrong order</strong> during evaluation (div/sub issues).</li>
                            <li>Ignoring <strong>operator precedence</strong> or associativity (especially <code>^</code>).</li>
                            <li>Forgetting to check if stack is <strong>empty</strong> at the end of bracket balancing.</li>
                            <li>Assuming the simplified code works for <strong>multi-digit</strong> numbers without modification.</li>
                        </ul>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Convert A + B * C to Postfix.",
            solution: "ABC*+",
        },
        {
            question: "Convert A + B * C to Prefix.",
            solution: "+A*BC",
        },
        {
            question: "Evaluate Postfix: 2 3 1 * + 9 -",
            solution: "2 + (3*1) - 9 = 2 + 3 - 9 = 5 - 9 = -4.",
        }
    ],
    exampleProblems: [],
}

export default function ExpressionEvaluationPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
