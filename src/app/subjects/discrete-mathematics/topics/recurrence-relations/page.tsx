'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiRefreshCw, FiActivity, FiLayers } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import Mermaid from '@/components/Mermaid'

const content = {
  title: 'Recurrence Relations',
  explanationSections: [
    {
      title: '🔄 Introduction to Recurrence Relations',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Definition:</span> A <span className="text-white font-semibold">recurrence relation</span> for a sequence <MathRenderer math="\{a_n\}" /> is an equation that expresses <MathRenderer math="a_n" /> in terms of one or more of the previous terms of the sequence, namely, <MathRenderer math="a_0, a_1, ..., a_{n-1}" />, for all integers <MathRenderer math="n" /> with <MathRenderer math="n \ge n_0" />, where <MathRenderer math="n_0" /> is a nonnegative integer.
          </p>
          <p className="text-gray-300">A sequence is called a <span className="text-white font-semibold">solution</span> of a recurrence relation if its terms satisfy the recurrence relation.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Key Concepts:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Order of Recurrence:</span> The difference between the highest and lowest subscripts of the terms in the relation.
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Example: <MathRenderer math="a_n = a_{n-1} + a_{n-2}" /> is of order 2 (since <MathRenderer math="n - (n-2) = 2" />).</li>
                </ul>
              </li>
              <li><span className="text-cyan-300">Initial Conditions:</span> The values of the first few terms required to define a unique sequence. For a relation of order <MathRenderer math="k" />, we typically need <MathRenderer math="k" /> initial conditions.</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Real-World Applications:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-300">Compound Interest:</span> <MathRenderer math="A_n = (1 + r)A_{n-1}" /> (Order 1).</li>
              <li><span className="text-cyan-300">Fibonacci Sequence:</span> Modeling rabbit populations (Order 2).</li>
              <li><span className="text-cyan-300">Tower of Hanoi:</span> <MathRenderer math="H_n = 2H_{n-1} + 1" /> (Order 1).</li>
              <li><span className="text-cyan-300">Algorithm Analysis:</span> Merge Sort complexity <MathRenderer math="T(n) = 2T(n/2) + n" />.</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      title: '📈 Linear Homogeneous Recurrence Relations',
      icon: <FiActivity className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Definition:</span> A <span className="text-white font-semibold">linear homogeneous recurrence relation of degree k with constant coefficients</span> is a recurrence relation of the form:
          </p>
          <MathRenderer display math="a_n = c_1 a_{n-1} + c_2 a_{n-2} + ... + c_k a_{n-k}" />
          <p className="text-gray-300">where <MathRenderer math="c_1, c_2, ..., c_k" /> are real numbers and <MathRenderer math="c_k \neq 0" />.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-300">Linear:</span> The RHS is a sum of previous terms multiplied by constants (no squares, cubes, etc.).</li>
              <li><span className="text-cyan-300">Homogeneous:</span> No term depends only on <MathRenderer math="n" /> (i.e., no extra function <MathRenderer math="F(n)" /> added).</li>
              <li><span className="text-cyan-300">Constant Coefficients:</span> The <MathRenderer math="c_i" /> are constants, not functions of <MathRenderer math="n" />.</li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-amber-300 font-semibold mb-2">The Characteristic Roots Method:</p>
            <p className="text-gray-300">This method is used to solve linear homogeneous recurrence relations.</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-2">
              <li><span className="text-cyan-300">Form the Characteristic Equation:</span>
                <p className="ml-4 text-gray-400">Assume <MathRenderer math="a_n = r^n" />. Substitute and divide by <MathRenderer math="r^{n-k}" />:</p>
                <MathRenderer display math="r^k - c_1 r^{k-1} - c_2 r^{k-2} - ... - c_k = 0" />
              </li>
              <li><span className="text-cyan-300">Find the Roots:</span> Solve for <MathRenderer math="r" />. Let roots be <MathRenderer math="r_1, r_2, ..., r_k" />.</li>
              <li><span className="text-cyan-300">Form the General Solution:</span></li>
            </ol>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b-2 border-slate-700">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-cyan-400">Case</th>
                    <th scope="col" className="px-6 py-4 text-cyan-400">Nature of Roots</th>
                    <th scope="col" className="px-6 py-4 text-cyan-400">General Solution Form</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700">
                    <td className="px-6 py-4 font-medium text-white">1</td>
                    <td className="px-6 py-4 text-slate-300">Distinct Real Roots (<MathRenderer math="r_1 \neq r_2 \neq ..." />)</td>
                    <td className="px-6 py-4 text-slate-300"><MathRenderer math="a_n = \alpha_1 r_1^n + \alpha_2 r_2^n + ..." /></td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-6 py-4 font-medium text-white">2</td>
                    <td className="px-6 py-4 text-slate-300">Repeated Real Roots (<MathRenderer math="r_1" /> with multiplicity <MathRenderer math="m" />)</td>
                    <td className="px-6 py-4 text-slate-300"><MathRenderer math="a_n = (\alpha_1 + \alpha_2 n + ... + \alpha_m n^{m-1})r_1^n" /></td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-6 py-4 font-medium text-white">3</td>
                    <td className="px-6 py-4 text-slate-300">
                      <p>3rd Order Cases:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Distinct: <MathRenderer math="r_1 \neq r_2 \neq r_3" /></li>
                        <li>All Equal: <MathRenderer math="r_1 = r_2 = r_3" /></li>
                        <li>Two Equal: <MathRenderer math="r_1 = r_2 \neq r_3" /></li>
                      </ul>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <div className="space-y-2">
                        <p><MathRenderer math="a_n = A_1 r_1^n + A_2 r_2^n + A_3 r_3^n" /></p>
                        <p><MathRenderer math="a_n = (A_1 + nA_2 + n^2 A_3)r_1^n" /></p>
                        <p><MathRenderer math="a_n = (A_1 + nA_2)r_1^n + A_3 r_3^n" /></p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 mt-4">
            <p className="text-gray-300 mb-2">Solving Pipeline:</p>
            <Mermaid
              chart={`%%{init: {'flowchart': {'defaultRenderer': 'elk', 'curve': 'linear'}, 'graph': {'curve': 'linear'}}}%%
flowchart TD
    A["Recurrence Relation"] --> B["Characteristic Equation"]
    B --> C["Find Roots"]
    C --> D["General Solution"]
    D --> E["Apply Initial Conditions"]
    style A fill:#1e293b,stroke:#3b82f6,stroke-width:2px
    style B fill:#1e293b,stroke:#10b981,stroke-width:2px
    style C fill:#1e293b,stroke:#ec4899,stroke-width:2px
    style D fill:#1e293b,stroke:#f59e0b,stroke-width:2px
    style E fill:#1e293b,stroke:#8b5cf6,stroke-width:2px`}
            />
          </div>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 mt-4">
            <p className="text-purple-300 font-semibold mb-2">Detailed Example (Characteristic Roots):</p>
            <p className="text-gray-300"><span className="text-white font-semibold">Problem:</span> Solve <MathRenderer math="a_n - 5a_{n-1} + 6a_{n-2} = 0" /> with initial conditions <MathRenderer math="a_0 = 2, a_1 = 5" />.</p>

            <p className="text-cyan-300 mt-3 font-medium">Step 1: Form Characteristic Equation</p>
            <p className="text-gray-400 ml-4">Rewrite as <MathRenderer math="a_n - 5a_{n-1} + 6a_{n-2} = 0" />. The characteristic equation is:</p>
            <MathRenderer display math="r^2 - 5r + 6 = 0" />

            <p className="text-cyan-300 mt-3 font-medium">Step 2: Find Roots</p>
            <p className="text-gray-400 ml-4">Factor the quadratic equation:</p>
            <MathRenderer display math="(r - 2)(r - 3) = 0" />
            <p className="text-gray-400 ml-4">So, the roots are <MathRenderer math="r_1 = 2" /> and <MathRenderer math="r_2 = 3" /> (Distinct Real Roots).</p>

            <p className="text-cyan-300 mt-3 font-medium">Step 3: General Solution</p>
            <p className="text-gray-400 ml-4">Since roots are distinct, the form is <MathRenderer math="a_n = \alpha_1 (2)^n + \alpha_2 (3)^n" />.</p>

            <p className="text-cyan-300 mt-3 font-medium">Step 4: Apply Initial Conditions</p>
            <ul className="list-disc list-inside ml-4 text-gray-400 space-y-1">
              <li>For <MathRenderer math="n=0" />: <MathRenderer math="\alpha_1 + \alpha_2 = 2" /> (Eq 1)</li>
              <li>For <MathRenderer math="n=1" />: <MathRenderer math="2\alpha_1 + 3\alpha_2 = 5" /> (Eq 2)</li>
            </ul>
            <p className="text-gray-400 ml-4 mt-2">Solving system:</p>
            <p className="text-gray-400 ml-4">From Eq 1: <MathRenderer math="\alpha_1 = 2 - \alpha_2" />. Substitute into Eq 2:</p>
            <MathRenderer display math="2(2 - \alpha_2) + 3\alpha_2 = 5 \implies 4 - 2\alpha_2 + 3\alpha_2 = 5 \implies \alpha_2 = 1" />
            <p className="text-gray-400 ml-4">Then <MathRenderer math="\alpha_1 = 2 - 1 = 1" />.</p>

            <p className="text-green-400 mt-3 font-semibold">Final Solution:</p>
            <MathRenderer display math="a_n = 1 \cdot 2^n + 1 \cdot 3^n = 2^n + 3^n" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Generating Functions:</p>
            <p className="text-gray-300">Generating functions transform problems about sequences into problems about functions.</p>
            <p className="text-gray-300 mt-2"><span className="text-cyan-300">Steps:</span></p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Multiply recurrence by <MathRenderer math="x^n" /> and sum over valid <MathRenderer math="n" />.</li>
              <li>Express sum in terms of <MathRenderer math="G(x)" />.</li>
              <li>Solve for <MathRenderer math="G(x)" />.</li>
              <li>Expand <MathRenderer math="G(x)" /> to find coefficient of <MathRenderer math="x^n" /> (which is <MathRenderer math="a_n" />).</li>
            </ol>
            <p className="text-gray-300 mt-2"><span className="text-cyan-300">Common Series:</span></p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="1/(1-x) = \sum x^n" /></li>
              <li><MathRenderer math="1/(1-x)^2 = \sum (n+1)x^n" /></li>
              <li><MathRenderer math="(1+x)^n = \sum C(n,k)x^k" /> (Binomial Theorem)</li>
            </ul>
            <div className="mt-4">
              <Mermaid
                chart={`%%{init: {'flowchart': {'defaultRenderer': 'elk', 'curve': 'linear'}, 'graph': {'curve': 'linear'}}}%%
flowchart TD
    A["Sequence a0, a1, a2..."] --> B["Convert to G(x)"]
    B --> C["Manipulate Algebraically"]
    C --> D["Solve or Extract Coefficients"]
    style A fill:#1e293b,stroke:#3b82f6,stroke-width:2px
    style B fill:#1e293b,stroke:#10b981,stroke-width:2px
    style C fill:#1e293b,stroke:#ec4899,stroke-width:2px
    style D fill:#1e293b,stroke:#f59e0b,stroke-width:2px`}
              />
            </div>
          </div>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 mt-4">
            <p className="text-purple-300 font-semibold mb-2">Detailed Example (Generating Functions):</p>
            <p className="text-gray-300"><span className="text-white font-semibold">Problem:</span> Solve <MathRenderer math="a_n - 3a_{n-1} = 2" /> for <MathRenderer math="n \ge 1" /> with <MathRenderer math="a_0 = 1" />.</p>

            <p className="text-cyan-300 mt-3 font-medium">Step 1: Multiply and Sum</p>
            <p className="text-gray-400 ml-4">Multiply by <MathRenderer math="x^n" /> and sum from <MathRenderer math="n=1" /> to <MathRenderer math="\infty" />:</p>
            <MathRenderer display math="\sum_{n=1}^{\infty} a_n x^n - 3 \sum_{n=1}^{\infty} a_{n-1} x^n = \sum_{n=1}^{\infty} 2 x^n" />

            <p className="text-cyan-300 mt-3 font-medium">Step 2: Convert to G(x)</p>
            <p className="text-gray-400 ml-4">Let <MathRenderer math="G(x) = \sum_{n=0}^{\infty} a_n x^n" />.</p>
            <ul className="list-disc list-inside ml-4 text-gray-400">
              <li><MathRenderer math="\sum_{n=1}^{\infty} a_n x^n = G(x) - a_0 = G(x) - 1" /></li>
              <li><MathRenderer math="\sum_{n=1}^{\infty} a_{n-1} x^n = x \sum_{n=1}^{\infty} a_{n-1} x^{n-1} = xG(x)" /></li>
              <li><MathRenderer math="\sum_{n=1}^{\infty} 2 x^n = 2 \left( \frac{1}{1-x} - 1 \right) = \frac{2x}{1-x}" /> (Geometric Series)</li>
            </ul>
            <p className="text-gray-400 ml-4 mt-2">Substitute back:</p>
            <MathRenderer display math="(G(x) - 1) - 3xG(x) = \frac{2x}{1-x}" />

            <p className="text-cyan-300 mt-3 font-medium">Step 3: Solve for G(x)</p>
            <MathRenderer display math="G(x)(1 - 3x) = 1 + \frac{2x}{1-x} = \frac{1-x+2x}{1-x} = \frac{1+x}{1-x}" />
            <MathRenderer display math="G(x) = \frac{1+x}{(1-x)(1-3x)}" />

            <p className="text-cyan-300 mt-3 font-medium">Step 4: Partial Fractions</p>
            <p className="text-gray-400 ml-4">Decompose <MathRenderer math="\frac{1+x}{(1-x)(1-3x)}" /> into <MathRenderer math="\frac{A}{1-x} + \frac{B}{1-3x}" />.</p>
            <p className="text-gray-400 ml-4">Solving gives <MathRenderer math="A = -1" /> and <MathRenderer math="B = 2" />.</p>
            <MathRenderer display math="G(x) = \frac{2}{1-3x} - \frac{1}{1-x}" />

            <p className="text-cyan-300 mt-3 font-medium">Step 5: Extract Coefficients</p>
            <p className="text-gray-400 ml-4">Expand both terms as series:</p>
            <MathRenderer display math="2 \sum (3x)^n - \sum x^n = \sum (2 \cdot 3^n - 1) x^n" />
            <p className="text-green-400 mt-2 font-semibold">Final Solution:</p>
            <MathRenderer display math="a_n = 2 \cdot 3^n - 1" />
          </div>
        </div>
      ),
      formula: 'G(x) = \\sum_{n=0}^{\\infty} a_n x^n',
    },
    {
      title: '⚡ Linear Non-Homogeneous Recurrence Relations',
      icon: <FiActivity className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">General Form:</span> <MathRenderer math="c_0 a_n + c_1 a_{n-1} + ... + c_k a_{n-k} = \phi(n)" />
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>If <MathRenderer math="\phi(n) = 0" />, it is <span className="text-white">Homogeneous</span>.</li>
            <li>If <MathRenderer math="\phi(n) \neq 0" />, it is <span className="text-white">Non-Homogeneous</span>.</li>
          </ul>

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">General Solution Structure:</p>
            <MathRenderer display math="a_n = CF + PI" />
            <p className="text-gray-300">Where:</p>
            <ul className="list-disc list-inside text-gray-400 ml-4">
              <li><span className="text-white">CF (Complementary Function):</span> Solution to the associated homogeneous relation (<MathRenderer math="\phi(n)=0" />). Found using Characteristic Roots.</li>
              <li><span className="text-white">PI (Particular Integral):</span> A specific solution satisfying the non-homogeneous part.</li>
            </ul>
          </div>

          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-amber-300 font-semibold mb-2">Method to Find PI:</p>
            <p className="text-gray-300 mb-2">Suppose <MathRenderer math="\phi(n) = (b_0 + b_1 n + ... + b_k n^k)s^n" />.</p>
            <ul className="list-decimal list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-cyan-300">Case 1:</span> If <MathRenderer math="s" /> is <strong>not</strong> a root of the Characteristic Equation:
                <div className="ml-4 mt-1 bg-black/20 p-2 rounded">
                  <MathRenderer math="PI = (P_0 + P_1 n + ... + P_k n^k)s^n" />
                </div>
              </li>
              <li>
                <span className="text-cyan-300">Case 2:</span> If <MathRenderer math="s" /> <strong>is</strong> a root of the Characteristic Equation with multiplicity <MathRenderer math="m" />:
                <div className="ml-4 mt-1 bg-black/20 p-2 rounded">
                  <MathRenderer math="PI = n^m (P_0 + P_1 n + ... + P_k n^k)s^n" />
                </div>
              </li>
            </ul>
            <p className="text-gray-400 text-sm mt-2">Where <MathRenderer math="P_0, P_1..." /> are constants to be determined.</p>
          </div>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example Problem from Notes:</p>
            <p className="text-gray-300"><span className="text-white font-semibold">Problem:</span> Solve <MathRenderer math="a_n = 3a_{n-1}" /> for <MathRenderer math="n \ge 1" /> with <MathRenderer math="a_0 = -1" />.</p>

            <div className="mt-2 space-y-2">
              <p className="text-gray-300">Rewrite: <MathRenderer math="a_n - 3a_{n-1} = 0" /></p>
              <p className="text-gray-300">This is Homogeneous, so <MathRenderer math="PI = 0" />.</p>

              <p className="text-cyan-300 font-medium">Step 1: Characteristic Equation</p>
              <MathRenderer display math="r - 3 = 0 \implies r = 3" />

              <p className="text-cyan-300 font-medium">Step 2: General Solution (CF)</p>
              <MathRenderer math="CF = A_1 (3)^n" />
              <p className="text-gray-300">So, <MathRenderer math="a_n = A_1 3^n" /> (since <MathRenderer math="PI=0" />)</p>

              <p className="text-cyan-300 font-medium">Step 3: Initial Conditions</p>
              <p className="text-gray-300">Given <MathRenderer math="a_0 = -1" />:</p>
              <MathRenderer math="-1 = A_1 (3)^0 \implies A_1 = -1" />

              <p className="text-green-400 font-semibold mt-2">Final Particular Solution:</p>
              <MathRenderer display math="a_n = (-1)3^n" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '🏗️ Applications & Examples',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-400 font-semibold text-lg">1. The Tower of Hanoi</p>
            <p className="text-gray-300"><span className="text-amber-300">Problem:</span> Move <MathRenderer math="n" /> disks from peg 1 to peg 3, using peg 2 as auxiliary, without placing a larger disk on a smaller one.</p>
            <p className="text-gray-300 mt-2"><span className="text-amber-300">Recurrence:</span> Let <MathRenderer math="H_n" /> be the number of moves.</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Move top <MathRenderer math="n-1" /> disks from 1 to 2: <MathRenderer math="H_{n-1}" /> moves.</li>
              <li>Move largest disk from 1 to 3: 1 move.</li>
              <li>Move <MathRenderer math="n-1" /> disks from 2 to 3: <MathRenderer math="H_{n-1}" /> moves.</li>
            </ol>
            <p className="text-gray-300 mt-2">Total: <MathRenderer math="H_n = 2H_{n-1} + 1" /> with <MathRenderer math="H_1 = 1" />.</p>
            <p className="text-green-400 font-semibold">Solution: <MathRenderer math="H_n = 2^n - 1" />.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-400 font-semibold text-lg">2. Binary Strings without Consecutive 0s</p>
            <p className="text-gray-300"><span className="text-amber-300">Problem:</span> Find number of binary strings of length <MathRenderer math="n" /> without two consecutive zeros.</p>
            <p className="text-gray-300 mt-2"><span className="text-amber-300">Recurrence:</span> Let <MathRenderer math="a_n" /> be the count.</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Ends in 1: Preceding <MathRenderer math="n-1" /> bits valid (<MathRenderer math="a_{n-1}" />)</li>
              <li>Ends in 0: Must end in 10. Preceding <MathRenderer math="n-2" /> bits valid (<MathRenderer math="a_{n-2}" />)</li>
            </ul>
            <p className="text-gray-300 mt-2">Total: <MathRenderer math="a_n = a_{n-1} + a_{n-2}" />.</p>
            <p className="text-gray-300">Initial Conditions: <MathRenderer math="a_1 = 2" /> (&quot;0&quot;, &quot;1&quot;), <MathRenderer math="a_2 = 3" /> (&quot;01&quot;, &quot;10&quot;, &quot;11&quot;).</p>
            <p className="text-green-400 font-semibold">This is related to the Fibonacci sequence!</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          Solve <MathRenderer math="a_n = 6a_{n-1} - 9a_{n-2}" /> with <MathRenderer math="a_0 = 1, a_1 = 6" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Characteristic Eq: <MathRenderer math="r^2 - 6r + 9 = 0" /></li>
            <li>Factor: <MathRenderer math="(r - 3)^2 = 0" /></li>
            <li>Roots: <MathRenderer math="r = 3" /> (multiplicity 2)</li>
            <li>General Solution: <MathRenderer math="a_n = (\alpha_1 + \alpha_2 n)3^n" /></li>
            <li>Initial Conditions:
              <ul className="list-disc list-inside ml-4">
                <li><MathRenderer math="n=0: (\alpha_1 + 0) = 1 \implies \alpha_1 = 1" /></li>
                <li><MathRenderer math="n=1: (1 + \alpha_2)3 = 6 \implies 1 + \alpha_2 = 2 \implies \alpha_2 = 1" /></li>
              </ul>
            </li>
            <li>Final Solution: <MathRenderer math="a_n = (1 + n)3^n" /></li>
          </ol>
        </div>
      ),
      formula: 'a_n = (1+n)3^n',
    },
    {
      question: (
        <span>
          Find the generating function for <MathRenderer math="a_n = 3^n" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="G(x) = \sum_{n=0}^{\infty} (3x)^n = 1 + 3x + (3x)^2 + ..." />
          <p className="text-gray-300">This is a geometric series with ratio <MathRenderer math="3x" />.</p>
          <MathRenderer display math="G(x) = \frac{1}{1 - 3x}" />
        </div>
      ),
      formula: 'G(x) = \\frac{1}{1-3x}',
    },
    {
      question: (
        <span>
          Solve <MathRenderer math="a_n - 3a_{n-1} = 5 \cdot 3^n" /> using generating functions.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Multiply by <MathRenderer math="x^n" /> and sum:</p>
          <MathRenderer display math="\sum a_n x^n - 3x \sum a_{n-1} x^{n-1} = 5 \sum 3^n x^n" />
          <p className="text-gray-300">This transforms to:</p>
          <MathRenderer display math="G(x) - a_0 - 3xG(x) = 5 \cdot \frac{3x}{1-3x}" />
          <p className="text-gray-300">(Assuming n starts at 1 and adjusting for initial terms appropriately)</p>
          <p className="text-gray-300">Basically, we transform the recurrence into an algebraic equation in <MathRenderer math="G(x)" />.</p>
        </div>
      ),
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Solve the Fibonacci recurrence <MathRenderer math="F_n = F_{n-1} + F_{n-2}" /> with <MathRenderer math="F_0 = 0, F_1 = 1" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="F_n = \frac{1}{\sqrt{5}} \left[ \left(\frac{1+\sqrt{5}}{2}\right)^n - \left(\frac{1-\sqrt{5}}{2}\right)^n \right]" />
        </div>
      ),
      steps: [
        {
          step: 'Characteristic Equation',
          explanation: (
            <MathRenderer math="r^2 - r - 1 = 0" />
          ),
        },
        {
          step: 'Find Roots',
          explanation: (
            <span>
              Using quadratic formula: <MathRenderer math="r = \frac{1 \pm \sqrt{5}}{2}" />.<br />
              Let <MathRenderer math="\phi = \frac{1+\sqrt{5}}{2}" /> and <MathRenderer math="\psi = \frac{1-\sqrt{5}}{2}" />.
            </span>
          ),
        },
        {
          step: 'General Solution',
          explanation: (
            <MathRenderer math="F_n = \alpha_1 \phi^n + \alpha_2 \psi^n" />
          ),
        },
        {
          step: 'Solve for constants',
          explanation: (
            <span>
              <MathRenderer math="F_0 = 0 \implies \alpha_1 + \alpha_2 = 0 \implies \alpha_2 = -\alpha_1" /><br />
              <MathRenderer math="F_1 = 1 \implies \alpha_1 \phi + \alpha_2 \psi = 1 \implies \alpha_1(\phi - \psi) = 1" /><br />
              <MathRenderer math="\phi - \psi = \sqrt{5}" /><br />
              So <MathRenderer math="\alpha_1 = 1/\sqrt{5}, \alpha_2 = -1/\sqrt{5}" />
            </span>
          ),
        },
      ],
      formula: 'F_n = \\frac{1}{\\sqrt{5}} \\left[ \\left(\\frac{1+\\sqrt{5}}{2}\\right)^n - \\left(\\frac{1-\\sqrt{5}}{2}\\right)^n \\right]',
    },
  ],
}

export default function RecurrenceRelationsPage() {
  return <DMTopicPage content={content} />
}
