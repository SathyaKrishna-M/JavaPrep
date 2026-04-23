'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiList, FiLayers, FiCode, FiCheckCircle } from 'react-icons/fi'
import GraphDiagram from '@/components/visuals/GraphDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Topological Sort & Strongly Connected Components',
  explanationSections: [
    {
      title: '1️⃣ Topological Sort',
      icon: <FiList className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">topological ordering</span> of a DAG (Directed Acyclic Graph) is a linear ordering of vertices such that for every directed edge u→v, u appears before v. Used for task scheduling, build systems, course prerequisites.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Method 1 — DFS (Reverse Finish)</p>
              <p className="text-gray-300 text-sm">Run DFS. Push each vertex to a stack when it finishes. The stack popped order is the topological order.</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Method 2 — Kahn's Algorithm (BFS)</p>
              <p className="text-gray-300 text-sm">Repeatedly remove vertices with in-degree 0. Add them to result, decrement neighbours' in-degrees. If result has V vertices — valid topological order.</p>
            </div>
          </div>
          <GraphDiagram
            title="DAG — topological order: 5, 4, 0, 2, 3, 1 (or variants)"
            width={480} height={240}
            nodes={[
              { id: '5', label: '5', x: 70,  y: 50,  color: 'amber', highlight: true },
              { id: '4', label: '4', x: 70,  y: 190, color: 'amber', highlight: true },
              { id: '0', label: '0', x: 200, y: 120, color: 'cyan',  visited: true   },
              { id: '2', label: '2', x: 310, y: 55,  color: 'cyan',  visited: true   },
              { id: '3', label: '3', x: 420, y: 120, color: 'green'                  },
              { id: '1', label: '1', x: 310, y: 200, color: 'green'                  },
            ]}
            edges={[
              { from: '5', to: '0', directed: true, highlight: true },
              { from: '5', to: '2', directed: true, highlight: true },
              { from: '4', to: '0', directed: true },
              { from: '4', to: '1', directed: true },
              { from: '2', to: '3', directed: true, highlight: true },
              { from: '3', to: '1', directed: true },
            ]}
          />
          <AlgoStepper
            title="Kahn's algorithm (BFS topological sort)"
            steps={[
              { title: 'Compute in-degrees', description: 'In-degree: 0→2, 1→2, 2→1, 3→1, 4→0, 5→0. Nodes 4 and 5 have no prerequisites.', code: 'inDegree = [2,2,1,1,0,0]' },
              { title: 'Enqueue in-degree-0 nodes', description: 'Add 4 and 5 to queue. These have no incoming edges.', code: 'queue = [4, 5]' },
              { title: 'Process 4 → decrement neighbours 0 and 1', description: 'result=[4]. in-degree of 0 becomes 1, in-degree of 1 becomes 1.', code: 'result=[4], inDegree[0]=1, inDegree[1]=1' },
              { title: 'Process 5 → decrement neighbours 0 and 2', description: 'result=[4,5]. in-degree of 0 → 0 (add!), in-degree of 2 → 0 (add!).', code: 'result=[4,5], queue=[0,2]' },
              { title: 'Process 0 (no unvisited neighbours), then 2 → decrement 3', description: 'result=[4,5,0,2]. in-degree of 3 → 0 (add to queue).', code: 'queue=[3], result=[4,5,0,2]' },
              { title: 'Process 3 → decrement 1; then process 1', description: 'result=[4,5,0,2,3,1]. Size=6=V. Valid topological sort!', code: 'order.size()==V → no cycle detected ✓' },
            ]}
          />
        </div>
      ),
    },
    {
      title: "2️⃣ Kahn's Algorithm (BFS-based)",
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <PyCode language="java">{`// Kahn's algorithm — O(V + E)
List<Integer> topologicalSort(List<Integer>[] adj, int V) {
    int[] inDegree = new int[V];
    for (int u = 0; u < V; u++)
        for (int v : adj[u])
            inDegree[v]++;

    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < V; i++)
        if (inDegree[i] == 0) queue.add(i);

    List<Integer> order = new ArrayList<>();
    while (!queue.isEmpty()) {
        int u = queue.poll();
        order.add(u);
        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) queue.add(v);
        }
    }

    if (order.size() != V) {
        System.out.println("Cycle detected — no topological order!");
        return null;
    }
    return order;
}`}</PyCode>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Cycle Detection Bonus</p>
            <p className="text-gray-300 text-sm">If the result has fewer than V vertices, a cycle exists in the graph — topological sort is impossible (only defined for DAGs).</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Strongly Connected Components (SCC)',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">An <span className="text-cyan-400 font-semibold">SCC</span> is a maximal set of vertices such that there is a path from each vertex to every other vertex in the set. Only in directed graphs.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Kosaraju's Algorithm (2 DFS passes):</p>
            <p className="text-gray-300">Step 1: DFS on original graph → push to stack by finish time</p>
            <p className="text-gray-300">Step 2: Transpose graph (reverse all edges)</p>
            <p className="text-gray-300">Step 3: DFS in stack-pop order on transposed graph</p>
            <p className="text-gray-300">         → each DFS tree = one SCC</p>
          </div>
          <PyCode language="java">{`// Kosaraju's SCC — O(V + E)
int sccCount = 0;

void korasaju(List<Integer>[] adj, int V) {
    // Step 1: DFS + finish-time stack
    boolean[] visited = new boolean[V];
    Stack<Integer> stack = new Stack<>();
    for (int i = 0; i < V; i++)
        if (!visited[i]) dfs1(adj, i, visited, stack);

    // Step 2: Transpose graph
    List<Integer>[] transAdj = new ArrayList[V];
    for (int i = 0; i < V; i++) transAdj[i] = new ArrayList<>();
    for (int u = 0; u < V; u++)
        for (int v : adj[u]) transAdj[v].add(u);

    // Step 3: DFS on transposed in stack order
    Arrays.fill(visited, false);
    while (!stack.isEmpty()) {
        int v = stack.pop();
        if (!visited[v]) {
            dfs2(transAdj, v, visited);
            sccCount++;
        }
    }
}

void dfs1(List<Integer>[] adj, int u, boolean[] vis, Stack<Integer> st) {
    vis[u] = true;
    for (int v : adj[u]) if (!vis[v]) dfs1(adj, v, vis, st);
    st.push(u);  // push after all descendants done
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Topological sort:</strong> only on DAGs — linear order respecting all edges</li>
            <li><strong>DFS approach:</strong> reverse of finish times = topological order</li>
            <li><strong>Kahn's algorithm:</strong> BFS, remove in-degree-0 vertices repeatedly, detects cycles</li>
            <li><strong>SCC:</strong> maximal groups where every vertex reaches every other</li>
            <li><strong>Kosaraju's:</strong> 2 DFS passes — original + transposed graph, O(V+E)</li>
            <li><strong>Applications:</strong> build systems (toposort), package managers, SCC used in 2-SAT, compiler analysis</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is topological sorting and when is it applicable?', solution: 'Topological sorting produces a linear ordering of vertices in a DAG such that every directed edge u→v has u before v. Only applicable to DAGs (directed acyclic graphs) — cycles make ordering impossible. Used in task scheduling, build systems (make), package managers (npm install), course prerequisites.' },
    { question: "Explain Kahn's algorithm for topological sort.", solution: 'Compute in-degrees of all vertices. Add all 0-in-degree vertices to a queue. While queue not empty: pop vertex u, add to result, decrement all neighbours\' in-degrees, add newly 0-in-degree vertices to queue. If result size < V, a cycle exists. Time: O(V+E).' },
    { question: 'What is a Strongly Connected Component (SCC)?', solution: 'An SCC is a maximal set of vertices in a directed graph where every vertex can reach every other. For vertices u,v in an SCC: there exists both a path u→v and a path v→u. Every directed graph can be decomposed into SCCs (condensation graph, which is a DAG).' },
    { question: "MCQ: Kahn's algorithm detects a cycle when:\n A) Queue becomes empty with n vertices processed\n B) The result has fewer than V vertices\n C) In-degree becomes negative\n D) The queue has more than V elements", solution: 'B) If the result has fewer than V vertices after Kahn\'s completes, some vertices could never have their in-degree reach 0 — this happens only if they are part of a cycle where in-degrees are never decremented to 0.' },
    { question: "MCQ: Kosaraju's algorithm for SCC requires how many DFS passes?\n A) 1\n B) 2\n C) 3\n D) V", solution: "B) 2 passes — Pass 1 on original graph to get finish-time order. Pass 2 on transposed graph in that order. Each DFS tree in pass 2 is an SCC." },
    { question: 'Topological sort of: 5→0, 5→2, 4→0, 4→1, 2→3, 3→1. Trace Kahn\'s.', solution: 'In-degrees: 0:2, 1:2, 2:1, 3:1, 4:0, 5:0. Queue:[4,5]. Process 4: result=[4], decrement 0(1), 1(1). Process 5: result=[4,5], decrement 0(0→add), 2(0→add). Process 0: result=[4,5,0]. Process 2: decrement 3(0→add). Process 3: decrement 1(0→add). Process 1: result=[4,5,0,2,3,1]. Complete: 6=V. Valid topological order.' },
    { question: 'Interview: How are SCCs used in solving the 2-SAT problem?', solution: '2-SAT: given clauses of form (x OR y) per clause, is there a satisfying assignment? Encode: clause (a OR b) = (NOT a → b) AND (NOT b → a). Build implication graph with 2V nodes (x and NOT x per variable). Compute SCCs. If any variable x and NOT x are in the same SCC, unsatisfiable. Otherwise, satisfiable. Assignment: for each variable, if x\'s SCC has a higher topological order than NOT x\'s SCC, set x=true. SCC decomposition solves 2-SAT in O(V+E).' },
  ],
  exampleProblems: [],
}

export default function TopologicalSortSCCPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
