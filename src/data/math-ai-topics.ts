export interface Topic {
    id: string
    title: string
    description: string
    icon: string
    href: string
    co?: string
}

export const topics: Topic[] = [
    // CO1: Vectors, Matrices & Data Representation
    {
        id: 'vectors-data-representation',
        title: '1. Vectors as Data Representations',
        description: 'Scalars, Vectors, Matrices, and how image pixels, word embeddings, and sensor data are represented.',
        icon: '📊',
        href: '/subjects/mathematics-for-ai/topics/CO1/vectors-data-representation',
        co: 'CO1',
    },
    {
        id: 'vector-operations',
        title: '2. Vector Operations',
        description: 'Dot product, geometric interpretation, similarity measurement, and projection for noise removal.',
        icon: '➕',
        href: '/subjects/mathematics-for-ai/topics/CO1/vector-operations',
        co: 'CO1',
    },
    {
        id: 'matrices-transformations',
        title: '3. Matrices as Transformations',
        description: 'Linear transformations, scaling, rotation, shearing, and neural network layers as matrix multiplications.',
        icon: '🔄',
        href: '/subjects/mathematics-for-ai/topics/CO1/matrices-transformations',
        co: 'CO1',
    },
    {
        id: 'tensors-shapes',
        title: '4. Tensors & Shapes',
        description: 'Understanding tensors (0D-3D+), shapes, broadcasting, and data flow in Deep Learning frameworks.',
        icon: '🧊',
        href: '/subjects/mathematics-for-ai/topics/CO1/tensors-shapes',
        co: 'CO1',
    },

    // CO2: Linear Algebra for Learning Systems
    {
        id: 'linear-algebra-foundations',
        title: '1. Linear Algebra Foundations',
        description: 'Vector spaces, basis, independence, distance metrics (L1, L2, Cosine), and Eigenvalues.',
        icon: '🔢',
        href: '/subjects/mathematics-for-ai/topics/CO2/linear-algebra-foundations',
        co: 'CO2',
    },

    // CO3: Multivariable Calculus for AI
    {
        id: 'multivariable-calculus',
        title: '1. Multivariable Calculus',
        description: 'Partial derivatives, Gradient vector, Hessian matrix, and Taylor series approximation for loss surfaces.',
        icon: '∫',
        href: '/subjects/mathematics-for-ai/topics/CO3/multivariable-calculus',
        co: 'CO3',
    },

    // CO4: Optimization & Learning Dynamics
    {
        id: 'optimization-basics',
        title: '1. Optimization Basics',
        description: 'Loss functions (MSE, Cross-Entropy), Gradient Descent variants (SGD, Adam), and convergence.',
        icon: '📉',
        href: '/subjects/mathematics-for-ai/topics/CO4/optimization-basics',
        co: 'CO4',
    },

    // CO5: Mathematics Behind Advanced AI Concepts
    {
        id: 'advanced-ai-math',
        title: '1. Advanced AI Math',
        description: 'PCA projection, Convolution operations, Attention mechanisms (Q, K, V), and Softmax.',
        icon: '🧠',
        href: '/subjects/mathematics-for-ai/topics/CO5/advanced-ai-math',
        co: 'CO5',
    },

    // CO6: Mathematical Construction of AI Building Blocks
    {
        id: 'building-blocks',
        title: '1. AI Building Blocks',
        description: 'Forward pass calculation, manual backpropagation, and implementing simple gradient descent.',
        icon: '🧱',
        href: '/subjects/mathematics-for-ai/topics/CO6/building-blocks',
        co: 'CO6',
    },
]
