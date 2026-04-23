export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  href: string
  co?: string
}

export const topics: Topic[] = [
  // CO1 — Trees & Self-Balancing Structures
  {
    id: 'bst-concepts',
    title: '1. Binary Search Trees (BST)',
    description: 'BST properties, structure, insertion, traversals (inorder/preorder/postorder), height and shape analysis',
    icon: '🌲',
    href: '/subjects/data-structures-algorithms-2/topics/CO1/bst-concepts',
    co: 'CO1',
  },
  {
    id: 'bst-operations',
    title: '2. BST Operations & Time Complexity',
    description: 'Search, delete (3 cases), successor/predecessor, worst-case degeneracy, O(h) analysis',
    icon: '🔍',
    href: '/subjects/data-structures-algorithms-2/topics/CO1/bst-operations',
    co: 'CO1',
  },
  {
    id: 'avl-trees',
    title: '3. AVL Trees & Rotations',
    description: 'Balance factor, LL/RR/LR/RL rotations, insertion with rebalancing, deletion with rebalancing',
    icon: '⚖️',
    href: '/subjects/data-structures-algorithms-2/topics/CO1/avl-trees',
    co: 'CO1',
  },
  {
    id: 'bst-vs-avl',
    title: '4. BST vs AVL — Performance Comparison',
    description: 'Worst-case height analysis, amortised cost, when to choose AVL, practical benchmarks',
    icon: '📊',
    href: '/subjects/data-structures-algorithms-2/topics/CO1/bst-vs-avl',
    co: 'CO1',
  },
  {
    id: 'b-trees',
    title: '5. B-Trees',
    description: 'Multi-way search trees, order-m B-tree properties, search/insert/delete, disk I/O motivation',
    icon: '🗄️',
    href: '/subjects/data-structures-algorithms-2/topics/CO1/b-trees',
    co: 'CO1',
  },
  {
    id: 'b-plus-trees',
    title: '6. B+ Trees',
    description: 'Leaf-linked structure, internal vs leaf nodes, database indexing, range queries on B+ Tree',
    icon: '🗃️',
    href: '/subjects/data-structures-algorithms-2/topics/CO1/b-plus-trees',
    co: 'CO1',
  },

  // CO2 — Range Queries & Graphs
  {
    id: 'segment-trees',
    title: '7. Segment Trees',
    description: 'Range sum/min/max queries, tree construction, point updates, lazy propagation',
    icon: '📐',
    href: '/subjects/data-structures-algorithms-2/topics/CO2/segment-trees',
    co: 'CO2',
  },
  {
    id: 'fenwick-trees',
    title: '8. Fenwick Trees (Binary Indexed Tree)',
    description: 'BIT structure, prefix sum in O(log n), point update, lowbit trick, comparison with segment tree',
    icon: '🔢',
    href: '/subjects/data-structures-algorithms-2/topics/CO2/fenwick-trees',
    co: 'CO2',
  },
  {
    id: 'graph-fundamentals',
    title: '9. Graph Fundamentals & Representations',
    description: 'Vertices, edges, directed/undirected, weighted, adjacency matrix vs list, space-time trade-offs',
    icon: '🕸️',
    href: '/subjects/data-structures-algorithms-2/topics/CO2/graph-fundamentals',
    co: 'CO2',
  },
  {
    id: 'bfs-traversal',
    title: '10. BFS Graph Traversal',
    description: 'Queue-based BFS, level-order exploration, shortest path in unweighted graph, connected components',
    icon: '🌊',
    href: '/subjects/data-structures-algorithms-2/topics/CO2/bfs-traversal',
    co: 'CO2',
  },
  {
    id: 'dfs-traversal',
    title: '11. DFS Graph Traversal',
    description: 'Stack/recursive DFS, discovery/finish times, cycle detection, connected components, applications',
    icon: '🌀',
    href: '/subjects/data-structures-algorithms-2/topics/CO2/dfs-traversal',
    co: 'CO2',
  },
  {
    id: 'minimum-spanning-trees',
    title: '12. Minimum Spanning Trees',
    description: "Kruskal's algorithm (Union-Find), Prim's algorithm (priority queue), cut property, MST applications",
    icon: '🌐',
    href: '/subjects/data-structures-algorithms-2/topics/CO2/minimum-spanning-trees',
    co: 'CO2',
  },

  // CO3 — Shortest Paths & Sorting
  {
    id: 'dijkstra',
    title: "13. Dijkstra's Algorithm",
    description: 'Greedy shortest path, priority queue implementation, relaxation, limitations (no negative weights)',
    icon: '🗺️',
    href: '/subjects/data-structures-algorithms-2/topics/CO3/dijkstra',
    co: 'CO3',
  },
  {
    id: 'bellman-ford',
    title: '14. Bellman-Ford Algorithm',
    description: 'Edge relaxation over V-1 iterations, negative weight handling, negative cycle detection',
    icon: '🔄',
    href: '/subjects/data-structures-algorithms-2/topics/CO3/bellman-ford',
    co: 'CO3',
  },
  {
    id: 'floyd-warshall',
    title: '15. Floyd-Warshall Algorithm',
    description: 'All-pairs shortest path, DP on adjacency matrix, O(V³) complexity, transitive closure',
    icon: '🔁',
    href: '/subjects/data-structures-algorithms-2/topics/CO3/floyd-warshall',
    co: 'CO3',
  },
  {
    id: 'topological-sort-scc',
    title: '16. Topological Sort & SCCs',
    description: "Kahn's algorithm, DFS-based toposort, Kosaraju's SCC algorithm, DAG applications",
    icon: '📋',
    href: '/subjects/data-structures-algorithms-2/topics/CO3/topological-sort-scc',
    co: 'CO3',
  },
  {
    id: 'merge-quick-sort',
    title: '17. Merge Sort & Quick Sort',
    description: 'Divide & conquer paradigm, merge sort recurrence T(n)=2T(n/2)+n, quick sort partitioning, pivot strategies',
    icon: '⚡',
    href: '/subjects/data-structures-algorithms-2/topics/CO3/merge-quick-sort',
    co: 'CO3',
  },

  // CO4 — Advanced Sorting, Greedy & DP
  {
    id: 'heap-sort',
    title: '18. Heap Sort',
    description: 'Max-heap construction, heapify, in-place O(n log n) sort, heap vs quicksort trade-offs',
    icon: '🏔️',
    href: '/subjects/data-structures-algorithms-2/topics/CO4/heap-sort',
    co: 'CO4',
  },
  {
    id: 'counting-radix-sort',
    title: '19. Counting Sort & Radix Sort',
    description: 'Non-comparison sorts, linear time O(n+k), stable sort property, digit-by-digit radix sort',
    icon: '🔢',
    href: '/subjects/data-structures-algorithms-2/topics/CO4/counting-radix-sort',
    co: 'CO4',
  },
  {
    id: 'greedy-algorithms',
    title: '20. Greedy Algorithms',
    description: 'Greedy choice property, optimal substructure, activity selection problem, fractional knapsack',
    icon: '💰',
    href: '/subjects/data-structures-algorithms-2/topics/CO4/greedy-algorithms',
    co: 'CO4',
  },
  {
    id: 'huffman-coding',
    title: '21. Huffman Coding',
    description: 'Variable-length encoding, greedy prefix-free codes, priority queue construction, compression ratio',
    icon: '📦',
    href: '/subjects/data-structures-algorithms-2/topics/CO4/huffman-coding',
    co: 'CO4',
  },
  {
    id: 'dynamic-programming',
    title: '22. Dynamic Programming Fundamentals',
    description: 'Optimal substructure, overlapping subproblems, memoization vs tabulation, 0/1 knapsack',
    icon: '🧮',
    href: '/subjects/data-structures-algorithms-2/topics/CO4/dynamic-programming',
    co: 'CO4',
  },
  {
    id: 'lcs-lis',
    title: '23. LCS & LIS',
    description: 'Longest Common Subsequence DP table, Longest Increasing Subsequence O(n log n), reconstruction',
    icon: '🧵',
    href: '/subjects/data-structures-algorithms-2/topics/CO4/lcs-lis',
    co: 'CO4',
  },
  {
    id: 'matrix-chain-edit',
    title: '24. Matrix Chain Multiplication & Edit Distance',
    description: 'MCM optimal parenthesisation DP, Levenshtein edit distance, string alignment applications',
    icon: '🔡',
    href: '/subjects/data-structures-algorithms-2/topics/CO4/matrix-chain-edit',
    co: 'CO4',
  },
  {
    id: 'greedy-vs-dp',
    title: '25. Greedy vs Dynamic Programming',
    description: 'Decision framework: when each applies, 0/1 knapsack vs fractional knapsack, classic comparisons',
    icon: '⚖️',
    href: '/subjects/data-structures-algorithms-2/topics/CO4/greedy-vs-dp',
    co: 'CO4',
  },
]
