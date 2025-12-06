'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiHash, FiGrid, FiUsers, FiLayers } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Counting Principles',
  explanationSections: [
    {
      title: '🔢 Basics of Counting',
      icon: <FiHash className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Fundamental Counting Principles</span> form the basis of combinatorics.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Product Rule:</p>
            <p className="text-gray-300">
              If a task can be broken down into a sequence of <MathRenderer math="k" /> subtasks, where subtask <MathRenderer math="i" /> can be performed in <MathRenderer math="n_i" /> ways, then the total number of ways to perform the task is:
            </p>
            <MathRenderer display math="n_1 \times n_2 \times \dots \times n_k" />
            <p className="text-gray-400 italic mt-2">Example: 3 shirts and 4 pants = <MathRenderer math="3 \times 4 = 12" /> outfits.</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Sum Rule:</p>
            <p className="text-gray-300">
              If a task can be done in either one of <MathRenderer math="n_1" /> ways or one of <MathRenderer math="n_2" /> ways, where none of the set of <MathRenderer math="n_1" /> ways is the same as any of the set of <MathRenderer math="n_2" /> ways, then there are <MathRenderer math="n_1 + n_2" /> ways to do the task.
            </p>
            <p className="text-gray-400 italic mt-2">Example: Pick a project from 3 biology projects or 4 chemistry projects = <MathRenderer math="3 + 4 = 7" /> choices.</p>
          </div>
        </div>
      ),
    },
    {
      title: '🕊️ Pigeonhole Principle',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">The Pigeonhole Principle</span> states that if <MathRenderer math="k+1" /> or more objects are placed into <MathRenderer math="k" /> boxes, then there is at least one box containing two or more objects.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Generalized Pigeonhole Principle:</p>
            <p className="text-gray-300">
              If <MathRenderer math="N" /> objects are placed into <MathRenderer math="k" /> boxes, then there is at least one box containing at least <MathRenderer math="\lceil N/k \rceil" /> objects.
            </p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Application:</p>
            <p className="text-gray-300">
              In a group of 367 people, there must be at least two people with the same birthday (since there are only 366 possible birthdays).
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '🔄 Permutations',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Permutations</span> refer to the arrangement of objects in a specific order.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Formula:</p>
            <p className="text-gray-300">
              The number of permutations of <MathRenderer math="n" /> distinct objects taken <MathRenderer math="r" /> at a time is:
            </p>
            <MathRenderer display math="P(n, r) = \frac{n!}{(n-r)!}" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Key Points:</p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Order matters (<MathRenderer math="ABC \neq CBA" />)</li>
              <li>Repetition is not allowed (in standard permutations)</li>
    B --> B2[Option C]
              style Start fill:#1e293b,stroke:#3b82f6,stroke-width:2px
              style A fill:#1e293b,stroke:#10b981,stroke-width:2px
              style B fill:#1e293b,stroke:#10b981,stroke-width:2px
              style A1 fill:#1e293b,stroke:#ec4899,stroke-width:2px
              style A2 fill:#1e293b,stroke:#ec4899,stroke-width:2px
              style B1 fill:#1e293b,stroke:#ec4899,stroke-width:2px
              style B2 fill:#1e293b,stroke:#ec4899,stroke-width:2px`,
    },
              {
                title: '👥 Combinations',
              icon: <FiUsers className="w-6 h-6" />,
              content: (
              <div className="space-y-4">
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-semibold text-lg">Combinations</span> refer to the selection of objects where order does not matter.
                </p>
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                  <p className="text-amber-300 font-semibold mb-2">Formula:</p>
                  <p className="text-gray-300">
                    The number of combinations of <MathRenderer math="n" /> distinct objects taken <MathRenderer math="r" /> at a time is:
                  </p>
                  <MathRenderer display math="C(n, r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}" />
                </div>
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                  <p className="text-lime-300 font-semibold mb-2">Key Points:</p>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Order does not matter (<MathRenderer math="ABC = CBA" />)</li>
                    <li>Useful for forming teams, committees, or hands of cards</li>
                    <li><MathRenderer math="C(n, r) = C(n, n-r)" /></li>
                  </ul>
                </div>
              </div>
              ),
              formula: 'C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}',
    },
              {
                title: '⚖️ Permutations vs Combinations',
              icon: <FiLayers className="w-6 h-6" />,
              content: (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="uppercase tracking-wider border-b-2 border-slate-700">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-cyan-400">Feature</th>
                      <th scope="col" className="px-6 py-4 text-cyan-400">Permutations (Order Matters)</th>
                      <th scope="col" className="px-6 py-4 text-cyan-400">Combinations (Order Doesn&apos;t Matter)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="px-6 py-4 font-medium text-white">Keywords</td>
                      <td className="px-6 py-4 text-slate-300">Arrange, Order, Schedule, Rank</td>
                      <td className="px-6 py-4 text-slate-300">Choose, Select, Group, Committee</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="px-6 py-4 font-medium text-white">Example</td>
                      <td className="px-6 py-4 text-slate-300">Password, Race winners (1st, 2nd, 3rd)</td>
                      <td className="px-6 py-4 text-slate-300">Lottery numbers, Team members</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="px-6 py-4 font-medium text-white">Formula</td>
                      <td className="px-6 py-4 text-slate-300"><MathRenderer math="P(n, r) = \frac{n!}{(n-r)!}" /></td>
                      <td className="px-6 py-4 text-slate-300"><MathRenderer math="C(n, r) = \frac{n!}{r!(n-r)!}" /></td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="px-6 py-4 font-medium text-white">Relationship</td>
                      <td className="px-6 py-4 text-slate-300"><MathRenderer math="P(n, r) = C(n, r) \times r!" /></td>
                      <td className="px-6 py-4 text-slate-300"><MathRenderer math="C(n, r) = \frac{P(n, r)}{r!}" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              ),
    },
              ],
              practiceQuestions: [
              {
                question: 'How many different 5-letter passwords can be made from the English alphabet if repetition is allowed?',
              solution: (
              <div className="space-y-4">
                <p className="text-gray-300">
                  We have 26 choices for each of the 5 positions.
                </p>
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                  <p className="font-semibold text-cyan-400">By the Product Rule:</p>
                  <MathRenderer display math="\text{Total passwords} = 26 \times 26 \times 26 \times 26 \times 26 = 26^5 = 11,881,376" />
                </div>
              </div>
              ),
    },
              {
                question: 'In a class of 10 students, how many ways can we select a president, vice-president, and treasurer?',
              solution: (
              <div className="space-y-4">
                <p className="text-gray-300">
                  Order matters here (President <MathRenderer math="\neq" /> Treasurer).
                  <br />
                  We are selecting 3 students from 10.
                </p>
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                  <p className="font-semibold text-cyan-400">Using Permutations:</p>
                  <MathRenderer display math="P(10, 3) = \frac{10!}{(10-3)!} = \frac{10!}{7!} = 10 \times 9 \times 8 = 720 \text{ ways}" />
                </div>
              </div>
              ),
              formula: 'P(10, 3) = 10 \\times 9 \\times 8 = 720',
    },
              {
                question: 'In a class of 10 students, how many ways can we select a committee of 3 students?',
              solution: (
              <div className="space-y-4">
                <p className="text-gray-300">
                  Order does not matter here (Committee <MathRenderer math="\{A, B, C\}" /> is same as <MathRenderer math="\{C, B, A\}" />).
                  <br />
                  We are selecting 3 students from 10.
                </p>
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                  <p className="font-semibold text-cyan-400">Using Combinations:</p>
                  <MathRenderer display math="C(10, 3) = \frac{10!}{3! \times 7!} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = \frac{720}{6} = 120 \text{ ways}" />
                </div>
              </div>
              ),
              formula: 'C(10, 3) = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120',
    },
              {
                question: 'Show that among any group of 5 integers, there are two with the same remainder when divided by 4.',
              solution: (
              <div className="space-y-4">
                <p className="text-gray-300">
                  Possible remainders when divided by 4 are <MathRenderer math="\{0, 1, 2, 3\}" />.
                </p>
                <ul className="list-disc list-inside text-gray-300">
                  <li>There are <MathRenderer math="k = 4" /> boxes (remainders).</li>
                  <li>There are <MathRenderer math="N = 5" /> objects (integers).</li>
                </ul>
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                  <p className="text-green-300">
                    By Pigeonhole Principle, at least one remainder must be shared by <MathRenderer math="\lceil 5/4 \rceil = 2" /> integers.
                  </p>
                </div>
              </div>
              ),
    },
              ],
              exampleProblems: [
              {
                problem: 'How many bit strings of length 8 contain exactly three 1s?',
              solution: (
              <div className="space-y-4">
                <p className="text-gray-300">
                  We need to choose 3 positions out of 8 to place the 1s. The order of selection doesn&apos;t matter (all 1s are identical).
                </p>
              </div>
              ),
              steps: [
              {
                step: 'Identify the problem type',
              explanation: (
              <span>
                Selection of positions without order <MathRenderer math="\to" /> Combinations.
              </span>
              ),
        },
              {
                step: 'Apply formula',
              explanation: (
              <MathRenderer math="C(8, 3) = \frac{8!}{3! \times 5!}" />
              ),
        },
              {
                step: 'Calculate',
              explanation: (
              <MathRenderer math="\frac{8 \times 7 \times 6}{3 \times 2 \times 1} = \frac{336}{6} = 56" />
              ),
        },
              ],
              formula: 'C(8, 3) = 56',
    },
              ],
}

              export default function CountingPrinciplesPage() {
  return <DMTopicPage content={content} />
}
