'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiEdit3 } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'CO-3 Home Assignments',
    explanationSections: [
        {
            title: '📝 Assignment Overview',
            icon: <FiEdit3 className="w-6 h-6" />,
            content: `This section contains solutions to the Home Assignment problems for **CO-3: Proof Methods & Counting**.
      
<span class="text-amber-300 font-semibold">Topics Covered:</span>
• Direct & Indirect Proofs
• Proof by Contraposition & Contradiction
• Permutations & Combinations
• Pigeonhole Principle`,
        },
    ],
    practiceQuestions: [
        {
            question: (
                <span>
                    1. Use a proof by contraposition to show that if <MathRenderer math="x + y \ge 2" />, where <MathRenderer math="x" /> and <MathRenderer math="y" /> are real numbers, then <MathRenderer math="x \ge 1" /> or <MathRenderer math="y \ge 1" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Understand the Statements</p>
                    <p className="text-gray-300">
                        Original Statement <MathRenderer math="P \to Q" />:
                        <br />
                        <MathRenderer math="P: x + y \ge 2" />
                        <br />
                        <MathRenderer math="Q: x \ge 1 \text{ or } y \ge 1" />
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: Form the Contrapositive</p>
                    <p className="text-gray-300">
                        The contrapositive is <MathRenderer math="\neg Q \to \neg P" />.
                        <br />
                        <MathRenderer math="\neg Q" />: It is NOT the case that (<MathRenderer math="x \ge 1" /> or <MathRenderer math="y \ge 1" />).
                        <br />
                        Using De Morgan&apos;s Law, this becomes: <MathRenderer math="x < 1 \text{ AND } y < 1" />.
                        <br />
                        <MathRenderer math="\neg P" />: <MathRenderer math="x + y < 2" />.
                        <br />
                        <span className="text-yellow-300">New Goal: Prove if <MathRenderer math="x < 1" /> and <MathRenderer math="y < 1" />, then <MathRenderer math="x + y < 2" />.</span>
                    </p>
                    <p className="font-semibold text-cyan-400">Step 3: Direct Proof of Contrapositive</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <ol className="list-decimal list-inside text-gray-300 space-y-2">
                            <li>Assume <MathRenderer math="x < 1" />.</li>
                            <li>Assume <MathRenderer math="y < 1" />.</li>
                            <li>Add the two inequalities together:
                                <div className="ml-4 mt-1">
                                    <MathRenderer math="x + y < 1 + 1" />
                                </div>
                            </li>
                            <li>Simplify:
                                <div className="ml-4 mt-1">
                                    <MathRenderer math="x + y < 2" />
                                </div>
                            </li>
                        </ol>
                    </div>
                    <p className="text-green-400">
                        Since we proved the contrapositive is true, the original statement is logicaly equivalent and therefore also true. Q.E.D.
                    </p>
                </div>
            ),
        },
        {
            question: (
                <span>
                    2. For integers <MathRenderer math="a, b" />, if <MathRenderer math="5 | a" /> and <MathRenderer math="5 | b" />, then <MathRenderer math="5 | (3a + 7b)" /> by direct proof.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Translate &quot;Divides&quot; to Equations</p>
                    <p className="text-gray-300">
                        We are given:
                        <ul className="list-disc list-inside ml-4">
                            <li><MathRenderer math="5 | a" /> means <MathRenderer math="a = 5k" /> for some integer <MathRenderer math="k" />.</li>
                            <li><MathRenderer math="5 | b" /> means <MathRenderer math="b = 5m" /> for some integer <MathRenderer math="m" />.</li>
                        </ul>
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: Substitute into the Target Expression</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            We want to analyze <MathRenderer math="3a + 7b" />.
                            <br />
                            Substitute <MathRenderer math="a = 5k" /> and <MathRenderer math="b = 5m" />:
                            <br />
                            <br />
                            <MathRenderer display math="3a + 7b = 3(5k) + 7(5m)" />
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">Step 3: Factor Factor out the 5</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <MathRenderer display math="= 15k + 35m" />
                            Factor out 5:
                            <MathRenderer display math="= 5(3k + 7m)" />
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">Step 4: Conclusion</p>
                    <p className="text-gray-300">
                        Since <MathRenderer math="k" /> and <MathRenderer math="m" /> are integers, <MathRenderer math="3k + 7m" /> is also an integer (let&apos;s call it <MathRenderer math="z" />).
                        <br />
                        So, <MathRenderer math="3a + 7b = 5z" />.
                        <br />
                        <span className="text-green-400">By definition of divisibility, 5 divides (3a + 7b). Q.E.D.</span>
                    </p>
                </div>
            ),
        },
        {
            question: (
                <span>
                    3. Use direct proof to show that if <MathRenderer math="p" /> is a prime number, then <MathRenderer math="p+13" /> is a composite.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30 my-2">
                        <p className="text-red-300 font-semibold">Important Note:</p>
                        <p className="text-gray-300">
                            This statement is technically <strong>FALSE</strong> for the specific case <MathRenderer math="p=2" /> (the only even prime).
                            <MathRenderer math="2 + 13 = 15" />, which is composite. Wait, 15 IS composite.
                            <br />
                            Ah, let&apos;s re-read carefully. &quot;If p is prime, p+13 is composite&quot;.
                            <br />
                            Checking <MathRenderer math="p=2" />: <MathRenderer math="2+13=15" /> is divisible by 3 and 5. Composite. True.
                            <br />
                            Checking <MathRenderer math="p=3" />: <MathRenderer math="3+13=16" /> (Composite). True.
                            <br />
                            Checking <MathRenderer math="p=5" />: <MathRenderer math="5+13=18" /> (Composite). True.
                            <br />
                            Actually, the statement holds! Let&apos;s prove it by cases.
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">Proof by Cases:</p>
                    <div className="space-y-4">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                            <p className="font-semibold text-white">Case 1: p = 2</p>
                            <p className="text-gray-300">
                                <MathRenderer math="p + 13 = 2 + 13 = 15" />.
                                <br />
                                15 is divisible by 1, 3, 5, 15. Since it has factors other than 1 and itself, it is <strong>composite</strong>.
                            </p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                            <p className="font-semibold text-white">Case 2: p &gt; 2</p>
                            <p className="text-gray-300">
                                <ol className="list-decimal list-inside space-y-2">
                                    <li>Since <MathRenderer math="p" /> is a prime greater than 2, <MathRenderer math="p" /> must be <strong>odd</strong> (2 is the only even prime).</li>
                                    <li>13 is also an <strong>odd</strong> number.</li>
                                    <li>The sum of two odd numbers is always <strong>even</strong>.
                                        <br />
                                        <MathRenderer math="\text{Odd} + \text{Odd} = \text{Even}" />.
                                    </li>
                                    <li>So, <MathRenderer math="p + 13" /> is an even number.</li>
                                    <li>Since <MathRenderer math="p \ge 3" />, <MathRenderer math="p + 13 \ge 16" />.</li>
                                    <li>Any even number greater than 2 is divisible by 2.</li>
                                    <li>Therefore, <MathRenderer math="p + 13" /> has a factor of 2, making it <strong>composite</strong>.</li>
                                </ol>
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            question: (
                <span>
                    4. Prove &quot;If <MathRenderer math="a + b = c" />, where <MathRenderer math="a, b, c" /> are integers, then at least one of <MathRenderer math="a, b, c" /> is even&quot; using indirect proof by contrapositive.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Formulate the Contrapositive</p>
                    <p className="text-gray-300">
                        Original <MathRenderer math="P \to Q" />:
                        <br />
                        <MathRenderer math="Q" />: At least one of a, b, c is even.
                        <br />
                        <MathRenderer math="\neg Q" />: None of a, b, c is even (meaning <strong>a, b, and c are all ODD</strong>).
                        <br />
                        <MathRenderer math="P" />: <MathRenderer math="a + b = c" />.
                        <br />
                        <MathRenderer math="\neg P" />: <MathRenderer math="a + b \neq c" />.
                        <br />
                        <span className="text-yellow-300">Goal: Prove if a, b, c are all odd, then <MathRenderer math="a + b \neq c" />.</span>
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: Proof</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <ol className="list-decimal list-inside text-gray-300 space-y-2">
                            <li>Assume <MathRenderer math="a" /> and <MathRenderer math="b" /> are odd integers.</li>
                            <li>Recall property: The sum of two odd integers is always <strong>even</strong>.
                                <br />
                                (<MathRenderer math="(2k+1) + (2m+1) = 2(k+m+1)" />).
                            </li>
                            <li>Therefore, <MathRenderer math="a + b" /> must be an <strong>even</strong> number.</li>
                            <li>However, we also assumed <MathRenderer math="c" /> is an <strong>odd</strong> integer.</li>
                            <li>An even number cannot equal an odd number.
                                <br />
                                <MathRenderer math="\text{Even} \neq \text{Odd}" />.
                            </li>
                            <li>Therefore, <MathRenderer math="a + b \neq c" />.</li>
                        </ol>
                    </div>
                    <p className="text-green-400">
                        The contrapositive is true, so the original statement is true. Q.E.D.
                    </p>
                </div>
            ),
        },
        {
            question: (
                <span>
                    5. Explain how to use proof by contradiction to prove &quot;There is a real number <MathRenderer math="x" /> such that <MathRenderer math="x^3 + 3x + 1 = 0" />&quot;.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Assume the Negation</p>
                    <p className="text-gray-300">
                        The statement says &quot;There exists an x...&quot;.
                        <br />
                        The negation is &quot;For ALL real numbers x, <MathRenderer math="x^3 + 3x + 1 \neq 0" />&quot;.
                        <br />
                        Basically, we assume the equation has <strong>NO solution</strong>.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: Find a Contradiction using IVT</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            Let <MathRenderer math="f(x) = x^3 + 3x + 1" />.
                            <br />
                            Since it is a polynomial, it is a continuous function curve.
                        </p>
                        <ul className="list-disc list-inside mt-2 text-gray-300">
                            <li>Test <MathRenderer math="x = 0" />:
                                <br />
                                <MathRenderer math="f(0) = 0^3 + 3(0) + 1 = 1" /> (Positive)
                            </li>
                            <li>Test <MathRenderer math="x = -1" />:
                                <br />
                                <MathRenderer math="f(-1) = (-1)^3 + 3(-1) + 1 = -1 - 3 + 1 = -3" /> (Negative)
                            </li>
                        </ul>
                        <p className="text-gray-300 mt-2">
                            A continuous line connecting a negative point (-3) to a positive point (1) <strong>MUST cross zero</strong> at some point.
                            <br />
                            This is the <strong>Intermediate Value Theorem</strong>.
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">Step 3: Conclusion</p>
                    <p className="text-gray-300">
                        The IVT guarantees there is a number <MathRenderer math="c" /> between -1 and 0 such that <MathRenderer math="f(c) = 0" />.
                        <br />
                        This contradicts our assumption that <MathRenderer math="f(x) \neq 0" /> for all x.
                        <br />
                        <span className="text-green-400">Therefore, a real root MUST exist.</span>
                    </p>
                </div>
            ),
        },
        {
            question: (
                <span>
                    6. Using indirect proof, prove that the sum of a rational number and an irrational number is irrational.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Setup and Assumption</p>
                    <p className="text-gray-300">
                        Let <MathRenderer math="r" /> be a rational number <MathRenderer math="(r \in \mathbb{Q})" />.
                        <br />
                        Let <MathRenderer math="i" /> be an irrational number <MathRenderer math="(i \notin \mathbb{Q})" />.
                        <br />
                        We want to prove their sum <MathRenderer math="s = r + i" /> is irrational.
                        <br />
                        <span className="text-yellow-300">Assumption (Contradiction): Assume the sum <MathRenderer math="s" /> IS rational.</span>
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: Algebraic Manipulation</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            Equation: <MathRenderer math="s = r + i" />
                            <br />
                            Rearrange to solve for <MathRenderer math="i" />:
                            <br />
                            <MathRenderer display math="i = s - r" />
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">Step 3: Analyze Logic</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <ul className="list-disc list-inside text-gray-300">
                            <li>We assumed <MathRenderer math="s" /> is rational.</li>
                            <li>We know <MathRenderer math="r" /> is rational.</li>
                            <li>The difference of two rational numbers is ALWAYS rational. (If you subtract two fractions, you get a fraction).</li>
                            <li>Therefore, <MathRenderer math="s - r" /> must be rational.</li>
                            <li>This implies <MathRenderer math="i" /> must be rational.</li>
                        </ul>
                    </div>
                    <p className="font-semibold text-cyan-400">Step 4: Contradiction</p>
                    <p className="text-gray-300">
                        We reached the conclusion that <MathRenderer math="i" /> is rational.
                        <br />
                        BUT we were given that <MathRenderer math="i" /> is <strong>irrational</strong>.
                        <br />
                        This is a contradiction. Therefore, our assumption that <MathRenderer math="s" /> is rational must be false.
                        <br />
                        <span className="text-green-400">The sum must be irrational. Q.E.D.</span>
                    </p>
                </div>
            ),
        },
        {
            question: '7. Sabnam has 2 school bags, 3 tiffin boxes and 2 water bottles. In how many ways can she carry these items (choosing one each)?',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Identify the Principle</p>
                    <p className="text-gray-300">
                        Since she needs to choose a bag AND a tiffin AND a bottle, these are independent sequential choices.
                        <br />
                        We use the <strong>Multiplication Principle (Product Rule)</strong>.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: List Choices</p>
                    <ul className="list-disc list-inside text-gray-300">
                        <li>Ways to choose Bag: 2</li>
                        <li>Ways to choose Tiffin: 3</li>
                        <li>Ways to choose Bottle: 2</li>
                    </ul>
                    <p className="font-semibold text-cyan-400">Step 3: Calculate</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="\text{Total Ways} = 2 \times 3 \times 2 = 12" />
                    </div>
                </div>
            ),
        },
        {
            question: '8. A student can choose a computer project from one of three lists containing 23, 15, and 19 projects. No project is on more than one list. How many choices?',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Identify the Principle</p>
                    <p className="text-gray-300">
                        Since the student chooses ONE project from List A OR List B OR List C (mutually exclusive), we use the <strong>Addition Principle (Sum Rule)</strong>.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: Calculate</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="\text{Total Choices} = 23 + 15 + 19" />
                        <MathRenderer display math="= 57 \text{ possible projects}" />
                    </div>
                </div>
            ),
        },
        {
            question: '9. In how many ways can 4 red, 3 yellow and 2 green discs be arranged in a row if discs of same colour are indistinguishable?',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Identify Problem Type</p>
                    <p className="text-gray-300">
                        We are arranging items in a row, so it&apos;s a permutation.
                        <br />
                        However, there are duplicate items (same color discs are identical).
                        <br />
                        This is <strong>Permutation with Repetition</strong>.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: Setup Formula</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300 mb-2">
                            Total items <MathRenderer math="n = 4 (\text{red}) + 3 (\text{yellow}) + 2 (\text{green}) = 9" />.
                        </p>
                        <MathRenderer display math="\text{Formula} = \frac{n!}{n_1! \cdot n_2! \cdot n_3!}" />
                        <MathRenderer display math="= \frac{9!}{4! \cdot 3! \cdot 2!}" />
                    </div>
                    <p className="font-semibold text-cyan-400">Step 3: Expand and Calculate</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            Expand 9! partially to cancel the largest denominator (4!):
                            <br />
                            <br />
                            <MathRenderer display math="\frac{9 \times 8 \times 7 \times 6 \times 5 \times 4!}{4! \times (3 \times 2 \times 1) \times (2 \times 1)}" />
                            <br />
                            Cancel 4!:
                            <br />
                            <MathRenderer display math="\frac{9 \times 8 \times 7 \times 6 \times 5}{6 \times 2}" />
                            <br />
                            Simplify: <MathRenderer math="6" /> cancels with <MathRenderer math="3 \times 2" />. <MathRenderer math="8 / 2 = 4" />.
                            <br />
                            <MathRenderer display math="9 \times 4 \times 7 \times 5 \times 1 = 1260" />
                        </p>
                        <p className="text-green-400 font-bold mt-2">Answer: 1,260 ways</p>
                    </div>
                </div>
            ),
        },
        {
            question: '10. Eight students should be accommodated in two 3-bed and one 2-bed rooms. In how many ways can they be accommodated?',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Identify Problem Type</p>
                    <p className="text-gray-300">
                        We are partitioning a set of 8 distinct students into three distinct groups of sizes 3, 3, and 2.
                        <br />
                        This uses the <strong>Multinomial Coefficient</strong>.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="\binom{n}{n_1, n_2, n_3} = \frac{n!}{n_1! n_2! n_3!}" />
                        <MathRenderer display math="\binom{8}{3, 3, 2} = \frac{8!}{3! \cdot 3! \cdot 2!}" />
                    </div>
                    <p className="font-semibold text-cyan-400">Step 2: Calculate</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <MathRenderer math="8! = 40,320" />
                            <br />
                            <MathRenderer math="3! = 6" />, <MathRenderer math="2! = 2" />
                            <br />
                            Denominator = <MathRenderer math="6 \times 6 \times 2 = 72" />
                            <br />
                            <MathRenderer display math="\frac{40,320}{72} = 560" />
                        </p>
                        <p className="text-green-400 font-bold mt-2">Answer: 560 ways</p>
                    </div>
                </div>
            ),
        },
        {
            question: '11. How many 3-digit even numbers can be made using digits 1, 2, 3, 4, 6, 7 if no digit is repeated?',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Analysis:</p>
                    <ul className="list-disc list-inside text-gray-300">
                        <li>We need to form a 3-digit number: <strong>[Hundreds] [Tens] [Units]</strong>.</li>
                        <li>Available digits: <MathRenderer math="\{1, 2, 3, 4, 6, 7\}" /> (Total 6).</li>
                        <li>Constraint 1: <strong>Even number</strong> <MathRenderer math="\to" /> Units digit must be <MathRenderer math="\{2, 4, 6\}" />.</li>
                        <li>Constraint 2: <strong>No repetition</strong>.</li>
                    </ul>
                    <p className="font-semibold text-cyan-400">Step-by-Step Selection:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <ol className="list-decimal list-inside text-gray-300 space-y-2">
                            <li>
                                <strong>Fill Units Place first (Restriction):</strong>
                                <br />
                                Must be 2, 4, or 6.
                                <br />
                                <span className="text-white">Choices = 3</span>
                            </li>
                            <li>
                                <strong>Fill Hundreds Place:</strong>
                                <br />
                                Can be any remaining digit. Started with 6 digits, used 1.
                                <br />
                                <span className="text-white">Choices = 5</span>
                            </li>
                            <li>
                                <strong>Fill Tens Place:</strong>
                                <br />
                                Can be any remaining digit. Used 2 digits.
                                <br />
                                <span className="text-white">Choices = 4</span>
                            </li>
                        </ol>
                    </div>
                    <p className="font-semibold text-cyan-400">Total Calculation:</p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <MathRenderer display math="3 \times 5 \times 4 = 60 \text{ numbers}" />
                    </div>
                </div>
            ),
        },
        {
            question: '12. A question paper contains 10 questions. A student has to answer 7. Question 1 is compulsory. In how many ways?',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Step 1: Account for Compulsory Question</p>
                    <p className="text-gray-300">
                        Total Questions: 10
                        <br />
                        Questions to Answer: 7
                        <br />
                        Since Q1 is <strong>compulsory</strong>, the student MUST pick Q1.
                        <br />
                        We now need to select <MathRenderer math="7 - 1 = 6" /> more questions.
                        <br />
                        We assume Q1 is taken, so there are <MathRenderer math="10 - 1 = 9" /> questions remaining to choose from.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: Apply Combinations</p>
                    <p className="text-gray-300">
                        We need to choose 6 questions from the remaining 9. Order of answering doesn&apos;t matter.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="C(9, 6) = \binom{9}{6} = \frac{9!}{6! \times (9-6)!}" />
                        <MathRenderer display math="= \frac{9 \times 8 \times 7}{3 \times 2 \times 1}" />
                        <MathRenderer display math="= 3 \times 4 \times 7 = 84" />
                    </div>
                    <p className="text-green-400 font-bold">Answer: 84 ways</p>
                </div>
            ),
        },
        {
            question: '13. Select 4 books from 10 such that two particular books are either both included or both excluded.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">Let the &quot;particular books&quot; be Book A and Book B. We have 2 separate cases.</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">Case 1: Include BOTH A and B</p>
                        <p className="text-gray-300">
                            We have already picked 2 books (A & B).
                            <br />
                            We need to pick <MathRenderer math="4 - 2 = 2" /> more books.
                            <br />
                            Pool of remaining books = <MathRenderer math="10 - 2 = 8" />.
                            <br />
                            <MathRenderer math="C(8, 2) = \frac{8 \times 7}{2 \times 1} = 28" />.
                        </p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">Case 2: Exclude BOTH A and B</p>
                        <p className="text-gray-300">
                            We must not pick A or B.
                            <br />
                            We need to pick all 4 books from the remaining 8.
                            <br />
                            <MathRenderer math="C(8, 4) = \frac{8 \times 7 \times 6 \times 5}{4 \times 3 \times 2 \times 1} = 70" />.
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">Total:</p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <MathRenderer display math="\text{Case 1} + \text{Case 2} = 28 + 70 = 98 \text{ ways}" />
                    </div>
                </div>
            ),
        },
        {
            question: '14. From 15 people (5 women, 10 men), form a team of 6 with at least 2 women.',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Strategy: Total - Unwanted</p>
                    <p className="text-gray-300">
                        Calculating &quot;at least 2&quot; directly means calculating (2W, 3W, 4W, 5W) which is 4 calculations.
                        <br />
                        It is easier to take the <strong>Total Combinations</strong> and subtract the invalid cases:
                        <br />
                        1. <strong>0 Women</strong> (All men)
                        <br />
                        2. <strong>1 Woman</strong> (Exactly 1 woman)
                    </p>
                    <p className="font-semibold text-cyan-400">Step 1: Total Combinations</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer math="C(15, 6) = 5005" /> ways to pick any 6 people.
                    </div>
                    <p className="font-semibold text-cyan-400">Step 2: Calculate Unwanted Cases</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <strong>Case: 0 Women</strong> (All 6 from 10 Men)
                            <br />
                            <MathRenderer math="C(10, 6) = 210" />.
                            <br />
                            <br />
                            <strong>Case: 1 Woman</strong> (1 W from 5, 5 M from 10)
                            <br />
                            <MathRenderer math="C(5, 1) \times C(10, 5) = 5 \times 252 = 1260" />.
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">Step 3: Subtract</p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <MathRenderer display math="5005 - (210 + 1260) = 5005 - 1470 = 3535 \text{ ways}" />
                    </div>
                </div>
            ),
        },
        {
            question: '15. Select team of 5 from 8 engineers and 6 designers. At least 2 designers must be included.',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Strategy: Sum of Valid Cases</p>
                    <p className="text-gray-300">
                        We need a team of 5 with <MathRenderer math="D \ge 2" />.
                        <br />
                        Possible splits (Designers, Engineers):
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <ul className="list-disc list-inside space-y-4 text-gray-300">
                            <li>
                                <strong>Case 1: 2 Designers, 3 Engineers</strong>
                                <br />
                                <MathRenderer math="C(6, 2) \times C(8, 3) = 15 \times 56 = 840" />
                            </li>
                            <li>
                                <strong>Case 2: 3 Designers, 2 Engineers</strong>
                                <br />
                                <MathRenderer math="C(6, 3) \times C(8, 2) = 20 \times 28 = 560" />
                            </li>
                            <li>
                                <strong>Case 3: 4 Designers, 1 Engineer</strong>
                                <br />
                                <MathRenderer math="C(6, 4) \times C(8, 1) = 15 \times 8 = 120" />
                            </li>
                            <li>
                                <strong>Case 4: 5 Designers, 0 Engineers</strong>
                                <br />
                                <MathRenderer math="C(6, 5) \times C(8, 0) = 6 \times 1 = 6" />
                            </li>
                        </ul>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <p className="font-semibold text-green-400">Total Ways:</p>
                        <MathRenderer display math="840 + 560 + 120 + 6 = 1526 \text{ ways}" />
                    </div>
                </div>
            ),
        },
    ],
}

export default function HomeAssignmentsCO3Page() {
    return <DMTopicPage content={content} />
}
