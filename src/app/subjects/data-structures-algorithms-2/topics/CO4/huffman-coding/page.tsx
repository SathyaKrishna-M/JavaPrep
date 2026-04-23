'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiArchive, FiCode, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import TreeDiagram from '@/components/visuals/TreeDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Huffman Coding',
  explanationSections: [
    {
      title: '1️⃣ Variable-Length Encoding',
      icon: <FiArchive className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Huffman Coding</span> is a lossless compression technique that assigns shorter binary codes to more frequent characters and longer codes to less frequent ones. It produces the optimal prefix-free code.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Prefix-Free Code</p>
              <p className="text-gray-300 text-sm">No codeword is a prefix of another. This guarantees unambiguous decoding — you can always tell where one character ends and the next begins without separators.</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Optimal Code</p>
              <p className="text-gray-300 text-sm">Huffman produces the minimum-entropy encoding — no other prefix-free binary code achieves a shorter expected codeword length for the given character frequencies.</p>
            </div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Example: "ABAACABAD" — frequencies A:5, B:2, C:1, D:1</p>
            <p className="text-gray-300">Fixed 2-bit: 9 chars × 2 bits = 18 bits</p>
            <p className="text-gray-300">Huffman: A=0(1bit), B=10(2bits), C=110(3bits), D=111(3bits)</p>
            <p className="text-gray-300">Encoded: 5×1 + 2×2 + 1×3 + 1×3 = 15 bits  (17% saving)</p>
          </div>
          <TreeDiagram
            title="Huffman tree for A:5, B:2, C:1, D:1 — path from root = codeword"
            width={540} height={285}
            nodes={[
              { id: 'rt',  label: '9',  sublabel: 'root',  x: 270, y: 40,  color: 'slate'  },
              { id: 'A',   label: 'A',  sublabel: 'f=5',   x: 120, y: 115, color: 'green',  highlight: true },
              { id: 'bcd', label: '4',  sublabel: 'BCD',   x: 420, y: 115, color: 'cyan'   },
              { id: 'B',   label: 'B',  sublabel: 'f=2',   x: 340, y: 190, color: 'violet', highlight: true },
              { id: 'cd',  label: '2',  sublabel: 'CD',    x: 500, y: 190, color: 'cyan'   },
              { id: 'C',   label: 'C',  sublabel: 'f=1',   x: 440, y: 265, color: 'amber',  highlight: true },
              { id: 'D',   label: 'D',  sublabel: 'f=1',   x: 530, y: 265, color: 'amber',  highlight: true },
            ]}
            edges={[
              { from: 'rt',  to: 'A',   label: '0' },
              { from: 'rt',  to: 'bcd', label: '1' },
              { from: 'bcd', to: 'B',   label: '0' },
              { from: 'bcd', to: 'cd',  label: '1' },
              { from: 'cd',  to: 'C',   label: '0' },
              { from: 'cd',  to: 'D',   label: '1' },
            ]}
          />
          <p className="text-gray-500 text-xs text-center">Codewords: A=0 (1 bit) · B=10 (2 bits) · C=110 (3 bits) · D=111 (3 bits) · All prefix-free ✓</p>
        </div>
      ),
    },
    {
      title: '2️⃣ Building the Huffman Tree',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Algorithm: use a <span className="text-cyan-400 font-semibold">min-heap (priority queue)</span>. Repeatedly extract the two nodes with lowest frequency, merge them into a new internal node with combined frequency, reinsert. Repeat until one node remains — the root.</p>
          <PyCode language="java">{`// Huffman Node
static class HNode implements Comparable<HNode> {
    char ch;
    int freq;
    HNode left, right;
    HNode(char c, int f) { ch = c; freq = f; }
    HNode(int f, HNode l, HNode r) { freq = f; left = l; right = r; }
    public int compareTo(HNode o) { return this.freq - o.freq; }
}

// Build Huffman Tree — O(n log n)
HNode buildHuffman(char[] chars, int[] freqs) {
    PriorityQueue<HNode> pq = new PriorityQueue<>();
    for (int i = 0; i < chars.length; i++)
        pq.add(new HNode(chars[i], freqs[i]));

    while (pq.size() > 1) {
        HNode left  = pq.poll();  // lowest freq
        HNode right = pq.poll();  // second lowest
        // Create internal node with combined frequency
        pq.add(new HNode(left.freq + right.freq, left, right));
    }
    return pq.poll();  // root of Huffman tree
}

// Generate codes by DFS
void generateCodes(HNode root, String code, Map<Character, String> map) {
    if (root == null) return;
    if (root.left == null && root.right == null)
        map.put(root.ch, code);  // leaf node
    generateCodes(root.left,  code + "0", map);
    generateCodes(root.right, code + "1", map);
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Step-by-Step Tree Construction',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Trace for A:5, B:2, C:1, D:1:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Step</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Min-heap contents (freq)</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Action</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Start', 'C:1, D:1, B:2, A:5', 'All leaves in heap'],
                  ['Step 1', 'B:2, CD:2, A:5', 'Merge C(1)+D(1)→CD(2)'],
                  ['Step 2', 'CD:2, BCD:4, A:5', 'Merge B(2)+CD(2)→BCD(4)'],
                  ['Step 3', 'ABCD:9', 'Merge A(5)+BCD(4)→root(9)'],
                ].map(([s, h, a]) => (
                  <tr key={s}>
                    <td className="px-4 py-2 text-violet-300 font-mono border border-slate-700">{s}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700 text-xs">{h}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-1">Resulting tree (left=0, right=1):</p>
            <p className="text-gray-300">         root(9)</p>
            <p className="text-gray-300">        /       \</p>
            <p className="text-gray-300">      A(5)     BCD(4)</p>
            <p className="text-gray-300">              /      \</p>
            <p className="text-gray-300">            B(2)    CD(2)</p>
            <p className="text-gray-300">                    /    \</p>
            <p className="text-gray-300">                  C(1)  D(1)</p>
            <p className="text-gray-300">Codes: A=0, B=10, C=110, D=111</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Greedy strategy:</strong> always merge the two lowest-frequency nodes</li>
            <li><strong>Prefix-free:</strong> leaf codes never prefix each other — unambiguous decoding</li>
            <li><strong>Optimal:</strong> minimizes expected code length = Σ freq(c) × depth(c)</li>
            <li><strong>Complexity:</strong> O(n log n) — n heap operations, each O(log n)</li>
            <li><strong>Applications:</strong> ZIP, gzip, JPEG, MP3, HTTP compression (zlib)</li>
            <li><strong>Limitation:</strong> requires two passes (first to count frequencies, second to encode)</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Why is Huffman coding called a greedy algorithm?', solution: 'Huffman makes a locally optimal choice at each step: always merge the two nodes with the lowest frequency. The greedy choice property holds — merging the two least frequent nodes first never leads to a worse overall code. Proof by exchange argument: any optimal code can be transformed to match the greedy construction without increasing expected length.' },
    { question: 'What is a prefix-free code and why does Huffman produce one?', solution: 'A prefix-free (or prefix-free) code assigns codewords such that no codeword is a prefix of another. Huffman\'s tree construction assigns codes only to leaf nodes — the path from root to leaf. Since no leaf is an ancestor of another leaf, no codeword is a prefix of another. This enables unambiguous decoding: read bits until you reach a leaf, emit that character, return to root.' },
    { question: 'Calculate the expected code length for A:5, B:2, C:1, D:1 with Huffman vs fixed 2-bit.', solution: 'Huffman codes: A=0(1bit), B=10(2bits), C=110(3bits), D=111(3bits). Total chars = 9. Expected length = (5×1 + 2×2 + 1×3 + 1×3)/9 = (5+4+3+3)/9 = 15/9 ≈ 1.67 bits/char. Fixed 2-bit: 2.0 bits/char. Compression ratio = 15/18 ≈ 83.3%. Entropy = −(5/9)log₂(5/9) − (2/9)log₂(2/9) − 2×(1/9)log₂(1/9) ≈ 1.66 bits — Huffman is near-optimal.' },
    { question: 'MCQ: Huffman coding\'s time complexity is:\n A) O(n)\n B) O(n log n)\n C) O(n²)\n D) O(2ⁿ)', solution: 'B) O(n log n) — building the min-heap takes O(n). Each of the n−1 merge steps extracts twice (O(log n) each) and inserts once (O(log n)). Total: O(n log n). If characters are already sorted by frequency, a simpler O(n) approach using two queues is possible.' },
    { question: 'MCQ: In a Huffman tree, the most frequent character always has:\n A) The longest code\n B) The shortest code\n C) A code of fixed length\n D) No code (it\'s an internal node)', solution: 'B) The shortest code — the most frequent character\'s node is merged last (or placed highest in the tree), resulting in the fewest bits. Least frequent characters are merged first and end up deepest (longest path = most bits). This minimizes total expected code length.' },
    { question: 'Build a Huffman tree for: E:15, T:12, A:8, O:7, I:6. Give the codes.', solution: 'Merge I(6)+O(7)=IO(13). Merge A(8)+IO(13)=AIO(21). Merge T(12)+E(15)=TE(27). Merge AIO(21)+TE(27)=root(48). Tree: root→left=AIO(21), right=TE(27). AIO→left=A(8), right=IO(13). IO→left=I(6), right=O(7). TE→left=T(12), right=E(15). Codes: A=00, I=010, O=011, T=10, E=11. Expected: (8×2+6×3+7×3+12×2+15×2)/48 = (16+18+21+24+30)/48 = 109/48 ≈ 2.27 bits.' },
    { question: 'Interview: How is Huffman coding used in JPEG compression?', solution: 'JPEG uses Huffman coding as the final entropy coding stage. The pipeline: (1) convert image to YCbCr color space; (2) 8×8 DCT transforms convert spatial data to frequency coefficients; (3) quantization reduces precision (lossy step); (4) zigzag scan reorders coefficients; (5) run-length encoding compresses runs of zeros; (6) Huffman coding encodes the resulting symbols. JPEG uses pre-defined Huffman tables (baseline JPEG) or adaptive tables (progressive JPEG) optimized for the specific image. Modern formats like WebP and HEIF use arithmetic coding instead, which achieves slightly better compression.' },
  ],
  exampleProblems: [],
}

export default function HuffmanCodingPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
