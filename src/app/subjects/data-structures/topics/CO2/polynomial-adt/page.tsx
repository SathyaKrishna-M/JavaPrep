'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMinimize2, FiPlus, FiGrid, FiCheckSquare, FiDivide, FiTerminal, FiX, FiAlertTriangle } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Polynomial ADT (Linked List)',
    explanationSections: [
        {
            title: '1️⃣ What is a Polynomial ADT?',
            icon: <FiDivide className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">Polynomial</span> is a mathematical expression consisting of variables and coefficients, e.g., <MathRenderer math="3x^2 + 5x + 1" />.
                        A Linked List is an efficient way to represent polynomials, especially sparse ones (where many coefficients are zero).
                    </p>
                    <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                        <p className="text-yellow-200 text-sm font-semibold">Note on ADT vs Implementation</p>
                        <p className="text-gray-300 text-sm">
                            The <strong>Polynomial ADT</strong> defines operations (Add, Multiply, Evaluate) independent of <em>how</em> they are stored.
                            Linked Lists are just one efficient implementation choice. Arrays can also be used but are less efficient for sparse polynomials.
                        </p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Node Structure:</p>
                        <p className="text-gray-300 text-sm mb-2">Each node represents one term <MathRenderer math="ax^n" />:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Coeff:</strong> The coefficient <MathRenderer math="a" /> (e.g., 3).</li>
                            <li><strong>Exp:</strong> The exponent <MathRenderer math="n" /> (e.g., 2).</li>
                            <li><strong>Next:</strong> Pointer to the next term.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Representation',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Terms are stored in <strong>decreasing order of exponent</strong> to make operations like addition easier.
                        Example: <MathRenderer math="4x^3 + 2x^2 + 5" />
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg flex items-center gap-2 overflow-x-auto">
                        <div className="p-3 bg-purple-900 border border-purple-500 rounded text-xs text-white text-center">
                            4 | 3 | Next
                        </div>
                        <span>➡️</span>
                        <div className="p-3 bg-purple-900 border border-purple-500 rounded text-xs text-white text-center">
                            2 | 2 | Next
                        </div>
                        <span>➡️</span>
                        <div className="p-3 bg-purple-900 border border-purple-500 rounded text-xs text-white text-center">
                            5 | 0 | Next
                        </div>
                        <span>➡️</span>
                        <span className="text-gray-500 text-xs">Null</span>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Code Implementation & Display',
            icon: <FiPlus className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <h5 className="text-teal-400 font-bold">Node Class</h5>
                    <CodeBlock
                        language="java"
                        code={`class PolyNode {
    int coeff;
    int exp;
    PolyNode next;

    PolyNode(int c, int e) {
        this.coeff = c;
        this.exp = e;
        this.next = null;
    }
}`}
                    />
                    <h5 className="text-teal-400 font-bold mt-4">Displaying a Polynomial</h5>
                    <div className="text-gray-300 text-sm mb-2">Traverse the list and print terms like <code>ax^n</code>.</div>
                    <CodeBlock
                        language="java"
                        code={`void display(PolyNode head) {
    PolyNode temp = head;
    while (temp != null) {
        System.out.print(temp.coeff + "x^" + temp.exp);
        if (temp.next != null) System.out.print(" + ");
        temp = temp.next;
    }
    System.out.println();
}`}
                    />
                </div>
            ),
        },
        {
            title: '4️⃣ Polynomial Evaluation',
            icon: <FiTerminal className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Given a value <MathRenderer math="x" />, we can compute the total value of the polynomial.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                        <p className="text-gray-300 text-sm">
                            <strong>Logic:</strong> Traverse each node, compute <MathRenderer math="coeff \times x^{exp}" />, and sum them up.
                        </p>
                    </div>
                    <CodeBlock
                        language="java"
                        code={`int evaluate(PolyNode head, int x) {
    int result = 0;
    PolyNode temp = head;
    while (temp != null) {
        result += temp.coeff * Math.pow(x, temp.exp);
        temp = temp.next;
    }
    return result;
}`}
                    />
                    <p className="text-gray-400 text-xs">Time Complexity: <MathRenderer math="O(n)" /></p>
                </div>
            )
        },
        {
            title: '5️⃣ Polynomial Addition',
            icon: <FiPlus className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        To add <MathRenderer math="P1 + P2" />, we use a logic similar to <strong>merging two sorted lists</strong>.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-purple-400 font-bold mb-2">Algorithm Steps:</h5>
                        <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
                            <li>Traverse both lists simultaneously.</li>
                            <li>If <code>P1.exp == P2.exp</code>: Add coefficients. Create new node. Move both pointers.</li>
                            <li>If <code>P1.exp &gt; P2.exp</code>: P1's term comes first (descending). Add P1 Node. Move P1.</li>
                            <li>If <code>P2.exp &gt; P1.exp</code>: P2's term comes first. Add P2 Node. Move P2.</li>
                        </ol>
                    </div>
                    <CodeBlock
                        language="java"
                        code={`// Simplified Logic
while (p1 != null && p2 != null) {
    if (p1.exp == p2.exp) {
        insert(result, p1.coeff + p2.coeff, p1.exp);
        p1 = p1.next; p2 = p2.next;
    } else if (p1.exp > p2.exp) {
        insert(result, p1.coeff, p1.exp);
        p1 = p1.next;
    } else {
        insert(result, p2.coeff, p2.exp);
        p2 = p2.next;
    }
}`}
                    />
                </div>
            ),
        },
        {
            title: '6️⃣ Polynomial Multiplication',
            icon: <FiX className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Multiplying polynomials is trickier than addition. We multiply every term of the first polynomial with every term of the second.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                        <h5 className="text-purple-400 font-bold mb-2">Steps:</h5>
                        <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
                            <li>For each term in P1:</li>
                            <li>&nbsp;&nbsp;Multiply with every term in P2 (<MathRenderer math="NewCoeff = c1 \times c2" />, <MathRenderer math="NewExp = e1 + e2" />).</li>
                            <li>&nbsp;&nbsp;Insert into Result list.</li>
                            <li>Combine like terms in the Result list (add coefficients of same exponent).</li>
                        </ol>
                    </div>
                    <p className="text-gray-400 text-xs">Time Complexity: <MathRenderer math="O(m \times n)" /></p>
                </div>
            )
        },
        {
            title: '7️⃣ Complexity Analysis',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-800/50 text-cyan-400">
                            <tr>
                                <th className="px-4 py-3">Operation</th>
                                <th className="px-4 py-3">Time Complexity</th>
                                <th className="px-4 py-3">Assumption</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-gray-300">
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Addition</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(m + n)" /></td>
                                <td className="px-4 py-2">m and n are number of terms.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Multiplication</td>
                                <td className="px-4 py-2 text-red-400"><MathRenderer math="O(m \times n)" /></td>
                                <td className="px-4 py-2">Multiply every term with every other term.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-blue-300">Evaluation</td>
                                <td className="px-4 py-2 text-green-400"><MathRenderer math="O(n)" /></td>
                                <td className="px-4 py-2">Traverse once.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            title: '8️⃣ Summary & Common Mistakes',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <h5 className="text-green-300 font-bold mb-2">Summary</h5>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            <li><strong>Sparse Friendly:</strong> Great for polynomials like <MathRenderer math="x^{1000} + 1" /> (Only 2 nodes vs 1001 array slots).</li>
                            <li><strong>Efficient Operations:</strong> Addition is linear <MathRenderer math="O(n)" />. Evaluation is easy.</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h5 className="text-red-400 font-bold">Common Mistakes</h5>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Not maintaining <strong>descending order</strong> of exponents (breaks addition logic).</p>
                        </div>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Forgetting to combine like terms during multiplication.</p>
                        </div>
                        <div className="bg-red-900/10 p-2 rounded flex gap-2 items-center">
                            <FiAlertTriangle className="text-red-500 flex-shrink-0" />
                            <p className="text-gray-400 text-sm">Using Arrays for sparse polynomials (wastes memory).</p>
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why use a Linked List for Polynomials instead of an Array?",
            solution: "Arrays inefficiently store zero-coefficient terms. For sparse polynomials (e.g., x^1000 + 1), an array needs 1001 slots, most empty. A linked list only needs 2 nodes.",
        },
        {
            question: "What happens if coefficients sum to zero during addition?",
            solution: "You should technically add a check to not create a new node if sum is 0 (unless we want to preserve 0 terms explicitly). Typically, we skip creating the node.",
        },
        {
            question: "How to multiply two polynomials?",
            solution: "For each term in P1, multiply it with every term in P2 (add exponents, multiply coefficients). Then invoke the Addition function to combining like-terms in the result.",
        }
    ],
    exampleProblems: [],
}

export default function PolynomialADTPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
