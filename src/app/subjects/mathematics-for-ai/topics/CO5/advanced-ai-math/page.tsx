import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Page = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                1. Advanced AI Math: PCA & SVD
            </h1>

            {/* 1. Eigenvalues and Eigenvectors */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    1.1 Eigenvalues & Eigenvectors
                </h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        For a square matrix <InlineMath math="A" />, an eigenvector is a non-zero vector <InlineMath math="\mathbf{v}" /> that does not change direction when <InlineMath math="A" /> is applied to it, only its scale.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-center">
                        <BlockMath math="A\mathbf{v} = \lambda \mathbf{v}" />
                    </div>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                        <li><InlineMath math="\mathbf{v}" />: Eigenvector (Direction)</li>
                        <li><InlineMath math="\lambda" />: Eigenvalue (Scaling Factor)</li>
                    </ul>
                </div>
            </section>

            {/* 2. PCA Case Study */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span className="text-3xl">👺</span> Case Study: Face Recognition (Eigenfaces)
                </h2>

                <div className="prose dark:prose-invert max-w-none space-y-4">
                    <p>
                        <strong>Principal Component Analysis (PCA)</strong> reduces the dimensionality of image data while preserving unique features. In face recognition, the principal components are called "Eigenfaces".
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200">The Workflow</h3>
                        <ol className="list-decimal pl-5 space-y-2 mt-2 text-sm text-gray-700 dark:text-gray-300">
                            <li><strong>Flatten Images:</strong> Convert <InlineMath math="64 \times 64" /> image to <InlineMath math="4096 \times 1" /> vector.</li>
                            <li><strong>Mean Center:</strong> Subtract the average face from all images.</li>
                            <li><strong>Covariance Matrix:</strong> Compute <InlineMath math="C = XX^T" /> to find pixel correlations.</li>
                            <li><strong>Eigen Decomposition:</strong> Find eigenvectors of <InlineMath math="C" />. Top vectors = Eigenfaces.</li>
                            <li><strong>Projection:</strong> Represent each face as a weighted sum of Eigenfaces (e.g., <InlineMath math="0.5(\text{Face}_1) + 0.2(\text{Face}_2)" />).</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* 3. SVD */}
            <section className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    1.3 Singular Value Decomposition (SVD)
                </h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <p className="mb-4">
                        SVD is a generalization of Eigendecomposition for <strong>rectangular matrices</strong>. It is the engine behind compression, search, and recommendation systems.
                    </p>
                    <div className="bg-gray-900 text-white p-6 rounded-lg text-center font-mono text-xl">
                        <BlockMath math="A = U \Sigma V^T" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-center">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <BlockMath math="U" />
                            <p className="text-sm font-semibold mt-2">Left Singular Vectors</p>
                            <p className="text-xs text-gray-500">(Input Rotation)</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <BlockMath math="\Sigma" />
                            <p className="text-sm font-semibold mt-2">Singular Values</p>
                            <p className="text-xs text-gray-500">(Scaling / Importance)</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <BlockMath math="V^T" />
                            <p className="text-sm font-semibold mt-2">Right Singular Vectors</p>
                            <p className="text-xs text-gray-500">(Output Rotation)</p>
                        </div>
                    </div>
                </div>

                {/* SVD Example */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-indigo-100 dark:border-gray-700">
                    <h3 className="font-semibold text-lg mb-4 text-indigo-600 dark:text-indigo-400">Step-by-Step SVD Calculation</h3>
                    <p className="text-sm mb-4">Let <InlineMath math="A = \begin{bmatrix} 3 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 1 \end{bmatrix}" /> (Diagonal Matrix Example)</p>

                    <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <div>
                            <strong>1. Compute <InlineMath math="A^T A" />:</strong>
                            <BlockMath math="A^T A = \begin{bmatrix} 9 & 0 & 0 \\ 0 & 4 & 0 \\ 0 & 0 & 1 \end{bmatrix}" />
                        </div>
                        <div>
                            <strong>2. Eigenvalues of <InlineMath math="A^T A" />:</strong>
                            <BlockMath math="\lambda_1 = 9, \lambda_2 = 4, \lambda_3 = 1" />
                        </div>
                        <div>
                            <strong>3. Singular Values (<InlineMath math="\sigma = \sqrt{\lambda}" />):</strong>
                            <BlockMath math="\sigma_1 = 3, \sigma_2 = 2, \sigma_3 = 1" />
                            <p className="mt-1 text-gray-500">These form the diagonal matrix <InlineMath math="\Sigma" />.</p>
                        </div>
                        <div>
                            <strong>4. Rank-1 Approximation (Compression):</strong>
                            <p>Keep only largest <InlineMath math="\sigma" /> (Lossy Compression).</p>
                            <BlockMath math="A_{approx} = \sigma_1 \mathbf{u}_1 \mathbf{v}_1^T = \begin{bmatrix} 3 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Page;
