import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Page = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Home Assignment 2: Solutions
            </h1>

            <div className="space-y-8">

                {/* Q1 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">1. Area Transformation</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        <InlineMath math="A = \begin{bmatrix} 3 & 0 \\ 0 & -2 \end{bmatrix}" /> stretches/reflects regions. Original Area = 12. Find new area.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <div className="text-gray-700 dark:text-gray-300">
                            <BlockMath math="\det(A) = (3)(-2) - (0)(0) = -6" />
                            <BlockMath math="\text{Area}_{new} = |\det(A)| \times 12 = |-6| \times 12 = 6 \times 12 = 72 \text{ sq units}" />
                        </div>
                    </div>
                </div>

                {/* Q2 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">2. Zero Dot Product</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">State the implication of two feature vectors having a zero dot product.</p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <p className="text-gray-700 dark:text-gray-300">
                            They are <strong>orthogonal</strong> (perpendicular). In Data Science, this implies the features are <strong>uncorrelated</strong> and provide distinct, non-overlapping information.
                        </p>
                    </div>
                </div>

                {/* Q3 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">3. Determinant from Eigenvalues</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Eigenvalues of <InlineMath math="B" /> are <InlineMath math="15, 0, 3" />. Compute <InlineMath math="\det(B)" />.</p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <div className="text-gray-700 dark:text-gray-300">
                            <p>The determinant is the product of the eigenvalues.</p>
                            <BlockMath math="\det(B) = \lambda_1 \times \lambda_2 \times \lambda_3 = 15 \times 0 \times 3 = 0" />
                        </div>
                    </div>
                </div>

                {/* Q4 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">4. Rank & Redundancy</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Vectors: <InlineMath math="x_1 = (1,1,1), x_2 = (2,2,2), x_3 = (0,1,1)" />. Find rank and redundant features.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <div className="text-gray-700 dark:text-gray-300">
                            <p>Observe that <InlineMath math="x_2 = 2x_1" />. Thus, <InlineMath math="x_2" /> is linearly dependent on <InlineMath math="x_1" />.</p>
                            <p><InlineMath math="x_3" /> cannot be formed by <InlineMath math="x_1" /> (due to the 0 component).</p>
                            <p><strong>Rank:</strong> 2 (Two independent vectors <InlineMath math="\{x_1, x_3\}" />).</p>
                            <p><strong>Redundant Feature:</strong> <InlineMath math="x_2" />.</p>
                        </div>
                    </div>
                </div>

                {/* Q5 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">5. Singular Values Calculation</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Find singular values of <InlineMath math="A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 3 & -2 \end{bmatrix}" />.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <div className="text-gray-700 dark:text-gray-300 space-y-2">
                            <p>1. Compute <InlineMath math="AA^T" /> (smaller matrix):</p>
                            <BlockMath math="AA^T = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 3 & -2 \end{bmatrix} \begin{bmatrix} 1 & 2 \\ 2 & 3 \\ 3 & -2 \end{bmatrix} = \begin{bmatrix} 14 & 2 \\ 2 & 17 \end{bmatrix}" />
                            <p>2. Find eigenvalues of <InlineMath math="AA^T" />:</p>
                            <BlockMath math="\det(AA^T - \lambda I) = (14-\lambda)(17-\lambda) - 4 = 0" />
                            <BlockMath math="\lambda^2 - 31\lambda + 238 - 4 = 0 \Rightarrow \lambda^2 - 31\lambda + 234 = 0" />
                            <BlockMath math="(\lambda - 13)(\lambda - 18) = 0 \Rightarrow \lambda_1 = 18, \lambda_2 = 13" />
                            <p>3. Singular values are <InlineMath math="\sqrt{\lambda}" />:</p>
                            <BlockMath math="\sigma_1 = \sqrt{18} = 3\sqrt{2}, \quad \sigma_2 = \sqrt{13}" />
                        </div>
                    </div>
                </div>

                {/* Q6 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">6. High Dimensionality</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Why does high-dimensional data often contain redundant info?</p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <p className="text-gray-700 dark:text-gray-300">
                            In real-world data, many features are correlated (e.g., height and weight, or adjacent pixels in an image). As dimensions increase, the data often lies on a lower-dimensional subspace (manifold), making the extra dimensions linear combinations of others (redundant).
                        </p>
                    </div>
                </div>

                {/* Q7 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">7. Industrial Plant Features</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Features: Vibration Amp, RMS Vibration, Temp, Thermal Stress, Power, Load Factor. Identify redundant ones.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                            <li><strong>RMS Vibration</strong> is derived from Vibration Amplitude (Redundant).</li>
                            <li><strong>Thermal Stress Index</strong> is likely derived from Machine Temperature (Redundant).</li>
                            <li><strong>Electrical Load Factor</strong> is directly related to Power Consumption (Redundant).</li>
                            <li><strong>Essential Features:</strong> Vibration Amplitude, Machine Temperature, Power Consumption. (3 features retain most variances).</li>
                        </ul>
                    </div>
                </div>

                {/* Q8 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">8. SVD of Rank-1 Matrix</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        <InlineMath math="A = \begin{bmatrix} 3 & 2 \\ 1 & 0 \end{bmatrix}" />.
                        (Note: The question text in PDF likely meant to imply specific image values, but let's solve for generic SVD process).
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border-l-4 border-yellow-500">
                        <p className="text-gray-600">
                            *Correction*: The matrix <InlineMath math="\begin{bmatrix} 3 & 2 \\ 1 & 0 \end{bmatrix}" /> is full rank (determinant -2). It is not rank-1.
                            However, if we approximate to Rank-1, we keep the largest singular value.
                            Standard SVD process applies.
                        </p>
                    </div>
                </div>

                {/* Q9 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">9. SVD Computation</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        (b) <InlineMath math="A = \begin{bmatrix} -1 & -2 \\ 1 & 2 \\ 1 & 2 \end{bmatrix}" />
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <div className="text-gray-700 dark:text-gray-300 space-y-3">
                            <p>Notice columns are multiples. <InlineMath math="\text{Col}_2 = 2 \times \text{Col}_1" />. Rank is 1.</p>
                            <p>1. <InlineMath math="A^T A = \begin{bmatrix} 3 & 6 \\ 6 & 12 \end{bmatrix}" /></p>
                            <p>2. Eigenvalues: Trace=15, Det=0. <InlineMath math="\lambda_1 = 15, \lambda_2 = 0" />.</p>
                            <p>3. Singular Value: <InlineMath math="\sigma_1 = \sqrt{15}" />.</p>
                            <p>4. <InlineMath math="V" /> (Right Singular Vectors): Normalize <InlineMath math="(1, 2)" /> to <InlineMath math="\frac{1}{\sqrt{5}}(1, 2)" />.</p>
                            <p>5. <InlineMath math="U" /> (Left Singular Vectors): <InlineMath math="u_1 = \frac{1}{\sigma_1} A v_1" />.</p>
                        </div>
                    </div>
                </div>

                {/* Q10 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">10. Image Compression</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Significance of SVD in compression?
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border-l-4 border-green-500">
                        <p className="text-gray-700 dark:text-gray-300">
                            SVD decomposes an image matrix into weighted layers (<InlineMath math="\sigma_i u_i v_i^T" />). Large singular values correspond to main structural features (rank-1 approximations). By keeping only the top <InlineMath math="k" /> singular values, we can discard noise and fine detail, significantly reducing storage (<InlineMath math="k(m+n+1)" /> vs <InlineMath math="mn" />) while preserving the visual essence.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;
