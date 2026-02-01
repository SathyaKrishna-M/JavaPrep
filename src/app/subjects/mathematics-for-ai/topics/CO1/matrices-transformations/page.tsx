import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Page = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                3. Matrices as Transformations
            </h1>

            {/* 1. Matrix Definition */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    3.1 Basics
                </h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        A matrix <InlineMath math="A" /> of order <InlineMath math="m \times n" /> is a rectangular array of numbers.
                        It can represent a system of linear equations or a linear transformation.
                    </p>
                    <BlockMath math="A = \begin{bmatrix} a_{11} & a_{12} & \dots & a_{1n} \\ a_{21} & a_{22} & \dots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \dots & a_{mn} \end{bmatrix}" />
                </div>
            </section>

            {/* 2. Operations */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    3.2 Matrix Multiplication
                </h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">Rule:</p>
                    <p className="text-gray-700 dark:text-gray-300">
                        For <InlineMath math="AB" /> to be defined, the number of columns in <InlineMath math="A" /> must equal the number of rows in <InlineMath math="B" />.
                        <br />
                        <InlineMath math="(m \times n) \times (n \times p) \rightarrow (m \times p)" />
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-3">Example</h3>
                    <BlockMath math="A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 2 & 0 \\ 1 & 5 \end{bmatrix}" />
                    <BlockMath math="AB = \begin{bmatrix} (1)(2)+(2)(1) & (1)(0)+(2)(5) \\ (3)(2)+(4)(1) & (3)(0)+(4)(5) \end{bmatrix} = \begin{bmatrix} 4 & 10 \\ 10 & 20 \end{bmatrix}" />
                </div>
            </section>

            {/* 3. Geometric Interpretation */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    3.3 Geometric Interpretation
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Multiplying a vector by a matrix transforms the vector.
                    <InlineMath math="A\mathbf{x} = \mathbf{y}" /> maps input space to output space.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                        <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Scaling</h4>
                        <BlockMath math="\begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}" />
                        <p className="text-sm mt-2">Doubles size in X and Y (stretches space).</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                        <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Rotation (90°)</h4>
                        <BlockMath math="\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}" />
                        <p className="text-sm mt-2">Rotates vector 90 degrees counter-clockwise.</p>
                    </div>
                </div>
            </section>

            {/* 4. Neural Networks */}
            <section className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Application: Linear Layers in Neural Networks
                </h2>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300">
                        In Deep Learning, a linear (dense) layer is simply a matrix multiplication followed by vector addition (bias).
                    </p>
                    <div className="my-6 text-center bg-gray-900 text-white p-4 rounded-lg font-mono text-xl">
                        <InlineMath math="\mathbf{y} = W\mathbf{x} + \mathbf{b}" />
                    </div>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Case Study: Predicting Performance</h3>
                    <p>
                        <strong>Input <InlineMath math="\mathbf{x}" />:</strong> [Hours Studied, Attendance %, Prev Score]<br />
                        <strong>Weights <InlineMath math="W" />:</strong> Matrix mapping 3 inputs to 2 features (neurons).
                    </p>

                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg my-4">
                        <p className="font-mono text-sm mb-4">
                            x = [6, 8, 7] <span className="text-gray-500">(Student Stats)</span><br />
                            W = [[0.5, 0.2, 0.3], [0.1, 0.6, 0.4]]<br />
                            b = [1, 0.5]
                        </p>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="font-semibold mb-2">Computation:</p>
                            <BlockMath math="W\mathbf{x} = \begin{bmatrix} (0.5)(6) + (0.2)(8) + (0.3)(7) \\ (0.1)(6) + (0.6)(8) + (0.4)(7) \end{bmatrix} = \begin{bmatrix} 3 + 1.6 + 2.1 \\ 0.6 + 4.8 + 2.8 \end{bmatrix} = \begin{bmatrix} 6.7 \\ 8.2 \end{bmatrix}" />
                            <BlockMath math="\mathbf{z} = W\mathbf{x} + \mathbf{b} = \begin{bmatrix} 6.7 \\ 8.2 \end{bmatrix} + \begin{bmatrix} 1 \\ 0.5 \end{bmatrix} = \begin{bmatrix} 7.7 \\ 8.7 \end{bmatrix}" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Practice Problems */}
            <section className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Practice Problem</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <p className="font-medium mb-4">
                        A square of area 10 units undergoes transformation <InlineMath math="A = \begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}" />. Find the new area.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border-l-4 border-indigo-500 text-sm">
                        <p className="mb-2"><strong>Solution:</strong></p>
                        <p>The scaling factor of area is given by the determinent of the transformation matrix.</p>
                        <BlockMath math="\text{Area}_{new} = |\det(A)| \times \text{Area}_{old}" />
                        <BlockMath math="\det(A) = (1)(1) - (k)(0) = 1" />
                        <p>Since <InlineMath math="\det(A) = 1" />, the area remains unchanged.</p>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            *Geometric Note: This is a shearing transformation. It slants the shape but preserves parallel lines and total area.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Page;
