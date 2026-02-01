import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Page = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                1. Vectors as Data Representations
            </h1>

            {/* 1. Vectors Definition */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    1.1 Definition of a Vector
                </h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        A vector in <InlineMath math="\mathbb{R}^n" /> is an ordered <InlineMath math="n" />-tuple of real numbers.
                        It is a fundamental building block in linear algebra and AI for representing data points, features, and weights.
                    </p>
                    <div className="my-4">
                        <BlockMath math="\mathbf{x} = (x_1, x_2, x_3, \dots, x_n), \text{ where } x_i \in \mathbb{R}" />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li><InlineMath math="n" />: The dimension (number of components).</li>
                        <li><InlineMath math="x_i" />: The <InlineMath math="i" />-th component or coordinate.</li>
                    </ul>
                </div>
            </section>

            {/* 2. Geometric & Algebraic Interpretation */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    1.2 Interpretation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Geometric</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                            <li>In <InlineMath math="\mathbb{R}^2" />: A point or directed line segment (arrow) in a plane.</li>
                            <li>In <InlineMath math="\mathbb{R}^3" />: A point or arrow in 3D space.</li>
                            <li>In <InlineMath math="\mathbb{R}^n" />: Can't visualize easily, but handled algebraically.</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border-l-4 border-green-500">
                        <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Algebraic</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            An element of a vector space equipped with addition and scalar multiplication.
                        </p>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Example:</span> <InlineMath math="\mathbf{u} = (2,4) \in \mathbb{R}^2" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Representation */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    1.3 Notation
                </h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <div className="text-center">
                            <span className="block font-semibold mb-2 text-gray-600 dark:text-gray-400">Row Vector</span>
                            <BlockMath math="\mathbf{x} = [x_1, x_2, \dots, x_n]" />
                        </div>
                        <div className="text-center">
                            <span className="block font-semibold mb-2 text-gray-600 dark:text-gray-400">Column Vector</span>
                            <BlockMath math="\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Vector Operations */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    1.4 Fundamental Operations
                </h2>

                {/* Addition */}
                <div className="space-y-2">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Vector Addition</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Component-wise addition of two vectors of the same dimension.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                        <BlockMath math="\mathbf{u} + \mathbf{v} = (x_1+y_1, x_2+y_2, \dots, x_n+y_n)" />
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md text-sm">
                        <span className="font-bold text-yellow-800 dark:text-yellow-200">Example:</span> Let <InlineMath math="\mathbf{v}_1 = (2, -1, 3)" /> and <InlineMath math="\mathbf{v}_2 = (3, -4, 6)" />. Then:
                        <BlockMath math="\mathbf{v}_1 + \mathbf{v}_2 = (2+3, -1-4, 3+6) = (5, -5, 9)" />
                    </div>
                </div>

                {/* Dot Product */}
                <div className="space-y-2">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Dot Product</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        A scalar value representing the sum of the products of corresponding components.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                        <BlockMath math="\mathbf{u} \cdot \mathbf{v} = \sum_{i=1}^{n} x_i y_i = x_1 y_1 + x_2 y_2 + \dots + x_n y_n" />
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md text-sm">
                        <span className="font-bold text-yellow-800 dark:text-yellow-200">Example:</span> Let <InlineMath math="\mathbf{u} = (1, -2, 3, 4)" />, <InlineMath math="\mathbf{v} = (2, 0, -1, 5)" />.
                        <BlockMath math="\mathbf{u} \cdot \mathbf{v} = (1)(2) + (-2)(0) + (3)(-1) + (4)(5) = 2 + 0 - 3 + 20 = 19" />
                    </div>
                </div>

                {/* Norm */}
                <div className="space-y-2">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Euclidean Norm (Magnitude)</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        The length of a vector, derived from the Pythagorean theorem.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                        <BlockMath math="\|\mathbf{v}\| = \sqrt{x_1^2 + x_2^2 + \dots + x_n^2}" />
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md text-sm">
                        <span className="font-bold text-yellow-800 dark:text-yellow-200">Example:</span> Find norm of <InlineMath math="\mathbf{v} = (1, -2, 2, 1)" />.
                        <BlockMath math="\|\mathbf{v}\| = \sqrt{1^2 + (-2)^2 + 2^2 + 1^2} = \sqrt{1 + 4 + 4 + 1} = \sqrt{10} \approx 3.16" />
                    </div>
                </div>
            </section>

            {/* 5. Practice Problems */}
            <section className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    Practice Problems
                </h2>

                {/* P2 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-lg mb-4">Problem 1: Norm with Variable</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Let <InlineMath math="\mathbf{v} = (x, 2x, 3x)" />. Find <InlineMath math="\|\mathbf{v}\|" /> in terms of <InlineMath math="x" />.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border-l-4 border-indigo-500">
                        <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">Solution:</p>
                        <BlockMath math="\|\mathbf{v}\| = \sqrt{(x)^2 + (2x)^2 + (3x)^2}" />
                        <BlockMath math="\|\mathbf{v}\| = \sqrt{x^2 + 4x^2 + 9x^2}" />
                        <BlockMath math="\|\mathbf{v}\| = \sqrt{14x^2}" />
                        <BlockMath math="\|\mathbf{v}\| = |x|\sqrt{14}" />
                    </div>
                </div>

                {/* P1 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-lg mb-4">Problem 2: Linear Combination / Embedding</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Three feature embeddings are <InlineMath math="\vec{e}_1 = (1,2,3)" />, <InlineMath math="\vec{e}_2 = (2,-1,1)" />, <InlineMath math="\vec{e}_3 = (-1,1,2)" />. Find the combined embedding vector <InlineMath math="\vec{R} = \vec{e}_1 + \vec{e}_2 + \vec{e}_3" /> and its magnitude.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border-l-4 border-indigo-500">
                        <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">Solution:</p>
                        <p className="mb-2">Sum components:</p>
                        <BlockMath math="\vec{R} = (1+2-1, 2-1+1, 3+1+2) = (2, 2, 6)" />
                        <p className="mb-2">Calculate magnitude:</p>
                        <BlockMath math="\|\vec{R}\| = \sqrt{2^2 + 2^2 + 6^2} = \sqrt{4 + 4 + 36} = \sqrt{44} \approx 6.63" />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Page;
