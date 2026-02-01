import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Page = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                2. Vector Operations & Applications
            </h1>

            {/* 1. Projection */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    2.1 Vector Projection
                </h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        The projection of a vector <InlineMath math="\mathbf{u}" /> onto another vector <InlineMath math="\mathbf{v}" /> is the vector component of <InlineMath math="\mathbf{u}" /> that lies in the direction of <InlineMath math="\mathbf{v}" />. This is crucial in AI for dimensionality reduction and feature extraction.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-center">
                        <BlockMath math="\text{proj}_{\mathbf{v}}(\mathbf{u}) = \left( \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{v}\|^2} \right) \mathbf{v}" />
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Example</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Find the projection of <InlineMath math="\mathbf{u} = (3,4)" /> onto <InlineMath math="\mathbf{v} = (1,0)" />.
                    </p>
                    <div className="mt-2 text-sm">
                        <BlockMath math="\mathbf{u} \cdot \mathbf{v} = (3)(1) + (4)(0) = 3" />
                        <BlockMath math="\|\mathbf{v}\|^2 = 1^2 + 0^2 = 1" />
                        <BlockMath math="\text{proj}_{\mathbf{v}}(\mathbf{u}) = \frac{3}{1} (1,0) = (3,0)" />
                    </div>
                </div>
            </section>

            {/* 2. Cosine Similarity */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    2.2 Cosine Similarity
                </h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Cosine similarity measures the cosine of the angle between two vectors. It is independent of magnitude, focusing only on orientation.
                        <br />
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">Values range from -1 to 1.</span>
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-center">
                        <BlockMath math="\text{Cosine Similarity}(\mathbf{a}, \mathbf{b}) = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \|\mathbf{b}\|}" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                            <BlockMath math="1" />
                            <span className="block mt-1">Identical Direction</span>
                        </div>
                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                            <BlockMath math="0" />
                            <span className="block mt-1">Orthogonal (Unrelated)</span>
                        </div>
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded">
                            <BlockMath math="-1" />
                            <span className="block mt-1">Opposite Direction</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Study */}
            <section className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Case Study: Movie Recommendation
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                    <p>
                        A streaming platform wants to recommend movies based on plot similarity. We convert text descriptions into vectors (Bag of Words) and calculate similarity.
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Data</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>D1 (Action):</strong> "A young hero saves the world from aliens"</li>
                        <li><strong>D2 (Action):</strong> "A brave hero fights aliens to save Earth"</li>
                        <li><strong>D3 (Romance):</strong> "A romantic story about love and friendship"</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4">Simplified Vector Representation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">vocabulary: [hero, aliens, save/s, world/earth, love]</p>

                    <div className="overflow-x-auto my-4">
                        <table className="min-w-full text-sm text-center border-collapse">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="p-2 border">Movie</th>
                                    <th className="p-2 border">hero</th>
                                    <th className="p-2 border">aliens</th>
                                    <th className="p-2 border">save/s</th>
                                    <th className="p-2 border">love</th>
                                    <th className="p-2 border">Vector</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border font-medium">D1</td>
                                    <td className="p-2 border">1</td>
                                    <td className="p-2 border">1</td>
                                    <td className="p-2 border">1</td>
                                    <td className="p-2 border">0</td>
                                    <td className="p-2 border font-mono">(1, 1, 1, 0)</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border font-medium">D2</td>
                                    <td className="p-2 border">1</td>
                                    <td className="p-2 border">1</td>
                                    <td className="p-2 border">1</td>
                                    <td className="p-2 border">0</td>
                                    <td className="p-2 border font-mono">(1, 1, 1, 0)</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border font-medium">D3</td>
                                    <td className="p-2 border">0</td>
                                    <td className="p-2 border">0</td>
                                    <td className="p-2 border">0</td>
                                    <td className="p-2 border">1</td>
                                    <td className="p-2 border font-mono">(0, 0, 0, 1)</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-gray-500 mt-2">*Simplified for demonstration. Real example uses wider vocab.</p>
                    </div>

                    <h3 className="text-lg font-semibold mt-4">Similarity Calculation</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                        <p className="mb-2"><strong>Sim(D1, D2):</strong></p>
                        <BlockMath math="\frac{(1)(1) + (1)(1) + (1)(1) + (0)(0)}{\sqrt{3}\sqrt{3}} = \frac{3}{3} = 1.0" />
                        <p className="text-green-600 font-medium mt-2"> Perfect Match (High Recommendation)</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mt-4">
                        <p className="mb-2"><strong>Sim(D1, D3):</strong></p>
                        <BlockMath math="\frac{(1)(0) + (1)(0) + (1)(0) + (0)(1)}{\sqrt{3}\sqrt{1}} = 0" />
                        <p className="text-red-600 font-medium mt-2"> No Similarity (No Recommendation)</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
