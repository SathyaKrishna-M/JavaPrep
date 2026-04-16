'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGrid, FiShare2, FiList, FiCode, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const content = {
  title: 'Knowledge Representation',
  explanationSections: [
    {
      title: '1️⃣ Why Knowledge Representation?',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            For an AI agent to reason and make decisions, it must <span className="text-cyan-400 font-semibold">represent knowledge</span> about the world in a form it can manipulate. Knowledge representation (KR) is the field of AI concerned with how knowledge can be encoded so that agents can use it to solve complex problems.
          </p>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-2">Requirements of a Good KR Scheme</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li><strong>Representational adequacy:</strong> Can express all the knowledge needed</li>
              <li><strong>Inferential adequacy:</strong> Can derive new knowledge from stored knowledge</li>
              <li><strong>Inferential efficiency:</strong> Reasoning is fast enough to be practical</li>
              <li><strong>Acquisitional efficiency:</strong> Easy for humans (or systems) to add new knowledge</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Graphs for State Spaces',
      icon: <FiShare2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Graphs are the most natural structure for representing <span className="text-cyan-400 font-semibold">state spaces</span> in search problems. Each node is a state; each directed edge is an action with associated cost.
          </p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`# Graph as adjacency dict with costs
romania_map = {
    'Arad':     [('Zerind', 75), ('Sibiu', 140), ('Timisoara', 118)],
    'Zerind':   [('Arad', 75), ('Oradea', 71)],
    'Sibiu':    [('Arad', 140), ('Fagaras', 99), ('Rimnicu', 80)],
    'Timisoara':[('Arad', 118), ('Lugoj', 111)],
    'Bucharest':[('Pitesti', 101), ('Fagaras', 211), ('Giurgiu', 90)],
    # ... more cities
}

def get_neighbors(graph, city):
    return graph.get(city, [])`}</pre>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Directed Graph</p>
              <p className="text-gray-300 text-sm">Actions may be one-way. E.g., a one-way road from A to B.</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Undirected Graph</p>
              <p className="text-gray-300 text-sm">Both directions available. E.g., a bidirectional road.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Trees for Hierarchical Knowledge',
      icon: <FiShare2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Trees represent <span className="text-cyan-400 font-semibold">hierarchical relationships</span>. In AI, trees appear as: decision trees, search trees (unrolled from state-space graphs), parse trees in NLP, and classification trees.
          </p>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <p className="text-purple-300 font-semibold mb-2">Search Tree vs State Space Graph</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li><strong>State space graph:</strong> each state appears once as a node</li>
              <li><strong>Search tree:</strong> each node is a path; the same state may appear multiple times at different depths</li>
              <li>A search tree can be infinite even if the state space is finite (due to cycles)</li>
            </ul>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`# Decision tree as nested dict
weather_tree = {
    'outlook': {
        'Sunny': {'humidity': {
            'High': 'No', 'Normal': 'Yes'
        }},
        'Overcast': 'Yes',
        'Rain': {'wind': {
            'Strong': 'No', 'Weak': 'Yes'
        }}
    }
}

def classify(tree, sample):
    if isinstance(tree, str):
        return tree
    attr = list(tree.keys())[0]
    return classify(tree[attr][sample[attr]], sample)`}</pre>
        </div>
      ),
    },
    {
      title: '4️⃣ Rule-Based (Production) Systems',
      icon: <FiList className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Production rules</span> encode knowledge as IF–THEN statements. A rule-based system has three parts: a <em>knowledge base</em> (rules), a <em>working memory</em> (current facts), and an <em>inference engine</em> (applies rules).
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Example Rules (Medical Diagnosis)</p>
            <pre className="text-green-300 text-sm font-mono">{`IF fever AND cough THEN possible_flu
IF possible_flu AND body_ache THEN diagnose_flu
IF diagnose_flu THEN recommend_rest_and_fluids`}</pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Forward Chaining</p>
              <p className="text-gray-300 text-sm">Start from known facts → apply rules → derive new facts → repeat until goal reached. <em>Data-driven.</em></p>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-semibold mb-2">Backward Chaining</p>
              <p className="text-gray-300 text-sm">Start from goal → find rules that could prove it → check if conditions are met. <em>Goal-driven.</em></p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Constraint Networks',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            A <span className="text-cyan-400 font-semibold">constraint network</span> represents a CSP: nodes are variables, edges connect variables that share a constraint. Used to model scheduling, configuration, and combinatorial problems.
          </p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`# Constraint network for map coloring
variables = ['WA', 'NT', 'SA', 'Q', 'NSW', 'V', 'T']
domains = {v: ['red', 'green', 'blue'] for v in variables}
constraints = [
    ('WA', 'NT'), ('WA', 'SA'),
    ('NT', 'SA'), ('NT', 'Q'),
    ('SA', 'Q'), ('SA', 'NSW'), ('SA', 'V'),
    ('Q', 'NSW'), ('NSW', 'V'),
]

def is_consistent(assignment, var, value):
    for (v1, v2) in constraints:
        if v1 == var and v2 in assignment:
            if assignment[v2] == value: return False
        if v2 == var and v1 in assignment:
            if assignment[v1] == value: return False
    return True`}</pre>
        </div>
      ),
    },
    {
      title: '6️⃣ Semantic Networks & Frames',
      icon: <FiShare2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Semantic networks</span> represent knowledge as a graph of concepts connected by labeled relationships (IS-A, HAS-A, PART-OF). <span className="text-violet-400 font-semibold">Frames</span> are structured records with slots for attributes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <p className="text-purple-300 font-semibold mb-2">Semantic Network Example</p>
              <pre className="text-green-300 text-xs font-mono">{`Dog IS-A Mammal
Mammal IS-A Animal
Dog HAS-A Tail
Fido IS-A Dog
→ Fido IS-A Animal (by inheritance)`}</pre>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Frame Example (Python dict)</p>
              <pre className="text-green-300 text-xs font-mono">{`dog_frame = {
  'isa': 'Mammal',
  'legs': 4,
  'sound': 'bark',
  'has_tail': True,
}
fido = {
  'isa': 'Dog',
  'name': 'Fido',
  'color': 'brown',
}`}</pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '7️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Graphs:</strong> State spaces — nodes = states, edges = actions + costs</li>
            <li><strong>Trees:</strong> Hierarchical knowledge — decision trees, search trees</li>
            <li><strong>Production rules:</strong> IF–THEN facts + forward/backward chaining</li>
            <li><strong>Constraint networks:</strong> Variables + domains + binary constraints</li>
            <li><strong>Semantic networks:</strong> Concepts linked by IS-A, HAS-A relationships</li>
            <li><strong>Frames:</strong> Structured objects with attribute slots</li>
            <li>Choose representation based on the type of knowledge and reasoning needed.</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What are the four requirements of a good knowledge representation scheme?', solution: 'Representational adequacy (can express needed knowledge), Inferential adequacy (can derive new knowledge), Inferential efficiency (reasoning is fast), Acquisitional efficiency (easy to add knowledge).' },
    { question: 'Distinguish between a state-space graph and a search tree.', solution: 'In a state-space graph, each state appears once. In a search tree, each node represents a path from root to that state — the same state may appear multiple times at different depths. Search trees can be infinite even when the state space is finite due to cycles.' },
    { question: 'What is forward chaining in a rule-based system?', solution: 'Forward chaining starts from known facts in working memory, applies matching IF-THEN rules to derive new facts, and repeats until the goal is derived or no more rules apply. It is data-driven.' },
    { question: 'What is a constraint network?', solution: 'A constraint network is a graph where nodes represent CSP variables and edges connect variables that share a constraint. It visually shows the structure of a Constraint Satisfaction Problem.' },
    { question: 'MCQ: In a semantic network, the IS-A relationship represents:\n A) Composition\n B) Inheritance / class membership\n C) Causality\n D) Temporal ordering', solution: 'B) Inheritance / class membership. "Dog IS-A Mammal" means every dog is a type of mammal, inheriting all mammal properties.' },
    { question: 'MCQ: Which KR scheme is most natural for encoding search problems?\n A) Frames\n B) Production rules\n C) Graphs\n D) Semantic networks', solution: 'C) Graphs — nodes represent states and edges represent actions/transitions in the state space.' },
    { question: 'Give two advantages of rule-based systems over graph-based representations.', solution: '1. Rules are human-readable and easy to inspect/modify. 2. They can encode complex conditional logic compactly. Drawback: rule conflicts and scalability challenges.' },
    { question: 'How would you represent the knowledge "All students who pass the exam and submit the project receive a certificate" as a production rule?', solution: 'IF passed_exam(X) AND submitted_project(X) THEN receives_certificate(X).' },
    { question: 'Interview: Why is knowledge representation a foundational challenge in AI?', solution: 'Intelligent behaviour requires the agent to reason about the world. Without a structured way to encode knowledge, the agent cannot draw inferences, plan actions, or explain decisions. The choice of representation directly determines what the agent can know, reason about, and how efficiently it can do so.' },
  ],
  exampleProblems: [],
}

export default function KnowledgeRepresentationPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
