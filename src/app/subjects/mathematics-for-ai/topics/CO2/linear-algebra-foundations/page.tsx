import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Page = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                1. Linear Algebra Foundations
            </h1>

            {/* 1. Linear Independence */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    1.1 Linear Independence
                </h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        A set of vectors is <strong>linearly independent</strong> if no vector in the set can be written as a linear combination of the others.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                        <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-2">Equation condition:</p>
                        <BlockMath math="c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_n\mathbf{v}_n = \mathbf{0} \implies c_1 = c_2 = \dots = 0" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border-l-4 border-green-500">
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Independent Example</h3>
                            <p className="text-sm mt-1 mb-2"><InlineMath math="\mathbf{v}_1 = (1,0), \mathbf{v}_2 = (0,1)" /></p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Standard basis vectors cannot form each other.</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border-l-4 border-red-500">
                            <h3 className="font-semibold text-red-700 dark:text-red-300">Dependent Example</h3>
                            <p className="text-sm mt-1 mb-2"><InlineMath math="\mathbf{v}_1 = (1,2), \mathbf{v}_2 = (2,4)" /></p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Notice <InlineMath math="\mathbf{v}_2 = 2\mathbf{v}_1" />. Redundant info.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Rank */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    1.2 Matrix Rank
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    The <strong>Rank</strong> of a matrix is the maximum number of linearly independent rows or columns. It tells us the "true" amount of information in the data.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <p className="mb-2">// Full Rank (Rank = 2)</p>
                    <BlockMath math="A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}" />
                    <p className="mb-6 text-gray-500">Rows are unique directions.</p>

                    <p className="mb-2">// Low Rank (Rank = 1)</p>
                    <BlockMath math="B = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}" />
                    <p className="text-gray-500">Row 2 is just <InlineMath math="2 \times" /> Row 1.</p>
                </div>
            </section>

            {/* 3. Case Study */}
            <section className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Case Study: Sensor Redundancy
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                    <p>
                        An industrial system uses 4 sensors. We collect readings into a matrix <InlineMath math="A" /> where columns are sensors.
                    </p>
                    <BlockMath math="A = \begin{bmatrix} 1 & 2 & 3 & 1 \\ 2 & 4 & 6 & 2 \\ 1 & 2 & 3 & 1 \end{bmatrix}" />

                    <h3 className="font-semibold text-lg mt-4">Analysis</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li><strong>Col 2:</strong> <InlineMath math="2 \times" /> Col 1</li>
                        <li><strong>Col 3:</strong> <InlineMath math="3 \times" /> Col 1</li>
                        <li><strong>Col 4:</strong> <InlineMath math="1 \times" /> Col 1</li>
                    </ul>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
                        <p><strong>Conclusion:</strong> Rank = 1.</p>
                        <p className="mt-1">
                            Sensors <InlineMath math="S_2, S_3, S_4" /> are <strong>redundant</strong>.
                            We only need <InlineMath math="S_1" /> to capture 100% of the information variance.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Page;
