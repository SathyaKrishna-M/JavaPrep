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
        description: 'Linear transformations, rank, and neural network layers as matrix multiplications.',
        icon: '🔄',
        href: '/subjects/mathematics-for-ai/topics/CO1/matrices-transformations',
        co: 'CO1',
    },

    // CO2: Linear Algebra for Learning Systems
    {
        id: 'tensors-shapes',
        title: '1. Tensors & Shapes',
        description: 'Understanding tensors (0D-3D+), shapes, broadcasting, and data flow in Deep Learning frameworks.',
        icon: '🧊',
        href: '/subjects/mathematics-for-ai/topics/CO2/tensors-shapes',
        co: 'CO2',
    },
    {
        id: 'eigenvalues-eigenvectors',
        title: '2. Eigenvalues & Eigenvectors',
        description: 'Solving the characteristic equation and understanding fundamental vector directions that do not rotate.',
        icon: '📐',
        href: '/subjects/mathematics-for-ai/topics/CO2/eigenvalues-eigenvectors',
        co: 'CO2',
    },
    {
        id: 'principal-component-analysis',
        title: '3. Principal Component Analysis',
        description: 'Dimensionality reduction using covariance matrices and Eigenfaces for facial recognition.',
        icon: '📉',
        href: '/subjects/mathematics-for-ai/topics/CO2/principal-component-analysis',
        co: 'CO2',
    },

    // CO3: Multivariable Calculus for AI
    {
        id: 'partial-derivatives-gradients',
        title: '1. Partial Derivatives & Gradients',
        description: 'Computing partial derivatives and following the path of steepest ascent.',
        icon: '⛰️',
        href: '/subjects/mathematics-for-ai/topics/CO3/partial-derivatives-gradients',
        co: 'CO3',
    },
    {
        id: 'jacobian-hessian-matrices',
        title: '2. Jacobian & Hessian Matrices',
        description: 'First and second-order derivative matrices for vector-valued and scalar-valued functions.',
        icon: '🧮',
        href: '/subjects/mathematics-for-ai/topics/CO3/jacobian-hessian-matrices',
        co: 'CO3',
    },
    {
        id: 'taylor-series-approximation',
        title: '3. Taylor Series Approximation',
        description: 'Using Maclaurin and Taylor expansions to linearize complex algorithms like GPS distance functions.',
        icon: '📏',
        href: '/subjects/mathematics-for-ai/topics/CO3/taylor-series-approximation',
        co: 'CO3',
    },

    // CO4: Optimization & Learning Dynamics
    {
        id: 'gradient-descent-basics',
        title: '1. Gradient Descent Basics',
        description: 'Loss functions, adjusting the learning rate, and controlling divergence vs convergence.',
        icon: '👇',
        href: '/subjects/mathematics-for-ai/topics/CO4/gradient-descent-basics',
        co: 'CO4',
    },
    {
        id: 'saddle-points-momentum',
        title: '2. Saddle Points & Momentum',
        description: 'Navigating narrow valleys, accelerating through dead-zones, and physical momentum intuition.',
        icon: '⏩',
        href: '/subjects/mathematics-for-ai/topics/CO4/saddle-points-momentum',
        co: 'CO4',
    },
    {
        id: 'optimization-variants',
        title: '3. Optimization Variants',
        description: 'Comparing full Batch Gradient Descent with noisy, highly scalable Mini-Batch updates.',
        icon: '🔀',
        href: '/subjects/mathematics-for-ai/topics/CO4/optimization-variants',
        co: 'CO4',
    },

    // CO5: Mathematics Behind Advanced AI Concepts
    {
        id: 'loss-surface-geometry',
        title: '1. Loss Surface Geometry',
        description: 'Understanding curvature, elliptical bowls, and steepness impacting training stability.',
        icon: '🗺️',
        href: '/subjects/mathematics-for-ai/topics/CO5/loss-surface-geometry',
        co: 'CO5',
    },
    {
        id: 'adam-optimizer',
        title: '2. The Adam Optimizer',
        description: 'Combining RMSProp, Adaptive Rates, and Momentum into the industry standard algorithm.',
        icon: '🤖',
        href: '/subjects/mathematics-for-ai/topics/CO5/adam-optimizer',
        co: 'CO5',
    },
    {
        id: 'advanced-ai-math',
        title: '3. Advanced Topics (CNNs/Attention)',
        description: 'Applying mathematics to Convolutional filters and Transformer Q,K,V Attention queries.',
        icon: '🧠',
        href: '/subjects/mathematics-for-ai/topics/CO5/advanced-ai-math',
        co: 'CO5',
    },

    // CO6: Mathematical Construction of AI Building Blocks
    {
        id: 'forward-pass-activations',
        title: '1. Forward Pass & Non-Linearity',
        description: 'Building dense layers and applying ReLu/Sigmoid to prevent networks from collapsing into a single plane.',
        icon: '➡️',
        href: '/subjects/mathematics-for-ai/topics/CO6/forward-pass-activations',
        co: 'CO6',
    },
    {
        id: 'backpropagation-chain-rule',
        title: '2. Backpropagation Chain Rule',
        description: 'Decomposing massive nested derivatives to assign blame/error to early layers.',
        icon: '⬅️',
        href: '/subjects/mathematics-for-ai/topics/CO6/backpropagation-chain-rule',
        co: 'CO6',
    },
    {
        id: 'building-blocks',
        title: '3. AI Training Loop Code',
        description: 'Translating all mathematical operations into a standard 5-step Python training loop.',
        icon: '🧱',
        href: '/subjects/mathematics-for-ai/topics/CO6/building-blocks',
        co: 'CO6',
    },

    // Assignments
    {
        id: 'ha1',
        title: 'Home Assignment 1',
        description: 'Vectors, basic operations, and introduction to neural networks.',
        icon: '📝',
        href: '/subjects/mathematics-for-ai/topics/assignments/ha1',
        co: 'Assignments',
    },
    {
        id: 'ha2',
        title: 'Home Assignment 2',
        description: 'Linear transformations, rank, SVD, and redundancy analysis.',
        icon: '📝',
        href: '/subjects/mathematics-for-ai/topics/assignments/ha2',
        co: 'Assignments',
    },
];
