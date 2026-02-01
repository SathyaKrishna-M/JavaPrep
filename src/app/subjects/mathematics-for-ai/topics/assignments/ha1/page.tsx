import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Page = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Home Assignment 1: Solutions
            </h1>

            <div className="space-y-8">
                {/* Q1 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        1. Combined Embedding Vector
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Identify the combined embedding feature vector from vectors <InlineMath math="\vec{e}_1 = (0,1,2)" />, <InlineMath math="\vec{e}_2 = (1, -1,2)" />, <InlineMath math="\vec{e}_3 = (-1,0,2)" />.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Solution</h4>
                        <div className="text-gray-700 dark:text-gray-300 space-y-2">
                            <p>The combined vector is the sum of individual vectors:</p>
                            <BlockMath math="\vec{R} = \vec{e}_1 + \vec{e}_2 + \vec{e}_3" />
                            <BlockMath math="\vec{R} = (0+1-1, 1-1+0, 2+2+2)" />
                            <BlockMath math="\vec{R} = (0, 0, 6)" />
                        </div>
                    </div>
                </div>

                {/* Q2 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        2. Neural Network Dimensions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        In a neural network layer, if the input vector is <InlineMath math="\mathbf{x} \in \mathbb{R}^3" /> and weight matrix is <InlineMath math="W \in \mathbb{R}^{2 \times 3}" />, identify the dimension of the output vector.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Solution</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            The operation is <InlineMath math="\mathbf{y} = W\mathbf{x}" />.
                            <br />
                            Matrix multiplication dimensions: <InlineMath math="(m \times n) \times (n \times 1) \rightarrow (m \times 1)" />.
                            <br />
                            Here: <InlineMath math="(2 \times 3) \times (3 \times 1) \rightarrow (2 \times 1)" />.
                            <br />
                            <strong>Answer:</strong> The output vector has dimension 2 (<InlineMath math="\mathbb{R}^2" />).
                        </p>
                    </div>
                </div>

                {/* Q3 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        3. Norms and Dot Product
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Determine the norms of <InlineMath math="\mathbf{u}" /> and <InlineMath math="\mathbf{v}" />, and evaluate <InlineMath math="\mathbf{u} \cdot \mathbf{v}" />, if <InlineMath math="\mathbf{u} = (a, 2a, 3a, \dots, na)" /> and <InlineMath math="\mathbf{v} = (b, b, b, \dots, b)" />.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Solution</h4>
                        <div className="text-gray-700 dark:text-gray-300 space-y-4">
                            <div>
                                <strong>1. Norm of u:</strong>
                                <BlockMath math="\|\mathbf{u}\| = \sqrt{a^2 + (2a)^2 + \dots + (na)^2} = \sqrt{a^2(1^2 + 2^2 + \dots + n^2)}" />
                                <p>Using sum of squares formula <InlineMath math="\sum k^2 = \frac{n(n+1)(2n+1)}{6}" />:</p>
                                <BlockMath math="\|\mathbf{u}\| = |a| \sqrt{\frac{n(n+1)(2n+1)}{6}}" />
                            </div>
                            <div>
                                <strong>2. Norm of v:</strong>
                                <BlockMath math="\|\mathbf{v}\| = \sqrt{b^2 + b^2 + \dots + b^2} = \sqrt{n b^2} = |b|\sqrt{n}" />
                            </div>
                            <div>
                                <strong>3. Dot Product:</strong>
                                <BlockMath math="\mathbf{u} \cdot \mathbf{v} = (a)(b) + (2a)(b) + \dots + (na)(b)" />
                                <BlockMath math="= ab(1 + 2 + \dots + n)" />
                                <p>Using sum of natural numbers <InlineMath math="\sum k = \frac{n(n+1)}{2}" />:</p>
                                <BlockMath math="\mathbf{u} \cdot \mathbf{v} = ab \frac{n(n+1)}{2}" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Q4 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        4. Geometric Transformation (Area)
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Matrix <InlineMath math="A = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix}" /> based transformation. Original area = 6 sq units. Find new area.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Solution</h4>
                        <div className="text-gray-700 dark:text-gray-300">
                            <p>The scaling factor is the determinant of the matrix.</p>
                            <BlockMath math="\det(A) = (1)(2) - (0)(0) = 2" />
                            <BlockMath math="\text{New Area} = |\det(A)| \times \text{Original Area}" />
                            <BlockMath math="\text{New Area} = 2 \times 6 = 12 \text{ sq units}" />
                        </div>
                    </div>
                </div>

                {/* Q5 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        5. TF-IDF & Cosine Similarity
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                        <p><strong>Movie A:</strong> "A young wizard discovers his powers at a magic school."</p>
                        <p><strong>Movie B:</strong> "A boy with magical abilities studies spells in a wizard school."</p>
                        <p>Analyze similarity using simplified TF-IDF and Cosine Similarity.</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Solution</h4>
                        <div className="text-gray-700 dark:text-gray-300 text-sm space-y-3">
                            <p><strong>Key Terms (Overlap):</strong> wizard, school. (magic/magical are variations, loose match).</p>
                            <p>Assuming a simplified vocabulary of distinct important words: [wizard, school, magic, powers, boy, spells].</p>

                            <p><strong>Vector A (approx):</strong> [1, 1, 1, 1, 0, 0]</p>
                            <p><strong>Vector B (approx):</strong> [1, 1, 1, 0, 1, 1] (Counting 'magical' as 'magic' match for simplicity)</p>

                            <BlockMath math="\text{Cosine Sim} = \frac{A \cdot B}{\|A\|\|B\|}" />
                            <BlockMath math="A \cdot B = 1+1+1+0+0+0 = 3" />
                            <BlockMath math="\|A\| = \sqrt{4} = 2, \quad \|B\| = \sqrt{5} \approx 2.23" />
                            <BlockMath math="\text{Sim} \approx \frac{3}{2 \times 2.23} = \frac{3}{4.46} \approx 0.67" />

                            <p><strong>Interpretation:</strong> The value 0.67 indicates a high degree of similarity. The system would correctly recommend Movie B to a user who liked Movie A as they share core thematic elements (Wizard, School, Magic).</p>
                        </div>
                    </div>
                </div>

                {/* Q6 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        6. Real Estate Neural Network
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <strong>Input:</strong> <InlineMath math="X = [2, 1, 3]^T" /><br />
                        <strong>Layer 1:</strong> <InlineMath math="W_1 = \begin{bmatrix} 0.3 & -0.2 & -0.1 \\ 0.4 & -0.3 & -0.2 \end{bmatrix}, b_1 = [0.2, 0.3]^T" /><br />
                        <strong>Layer 2:</strong> <InlineMath math="W_2 = [0.2, 0.3], b_2 = 0.2" />
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Solution</h4>
                        <div className="text-gray-700 dark:text-gray-300 space-y-4">
                            <div>
                                <strong>Step 1: Hidden Layer Output (<InlineMath math="Z_1" />)</strong>
                                <BlockMath math="Z_1 = W_1 X + b_1" />
                                <BlockMath math="W_1 X = \begin{bmatrix} (0.3)(2) + (-0.2)(1) + (-0.1)(3) \\ (0.4)(2) + (-0.3)(1) + (-0.2)(3) \end{bmatrix}" />
                                <BlockMath math="= \begin{bmatrix} 0.6 - 0.2 - 0.3 \\ 0.8 - 0.3 - 0.6 \end{bmatrix} = \begin{bmatrix} 0.1 \\ -0.1 \end{bmatrix}" />
                                <BlockMath math="Z_1 = \begin{bmatrix} 0.1 \\ -0.1 \end{bmatrix} + \begin{bmatrix} 0.2 \\ 0.3 \end{bmatrix} = \begin{bmatrix} 0.3 \\ 0.2 \end{bmatrix}" />
                            </div>
                            <div>
                                <strong>Step 2: Final Output (<InlineMath math="Y" />)</strong>
                                <BlockMath math="Y = W_2 Z_1 + b_2" />
                                <BlockMath math="Y = \begin{bmatrix} 0.2 & 0.3 \end{bmatrix} \begin{bmatrix} 0.3 \\ 0.2 \end{bmatrix} + 0.2" />
                                <BlockMath math="Y = ((0.2)(0.3) + (0.3)(0.2)) + 0.2" />
                                <BlockMath math="Y = (0.06 + 0.06) + 0.2 = 0.12 + 0.2 = 0.32" />
                            </div>
                            <div>
                                <strong>Result:</strong> Estimated House Price Score = 0.32
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;
