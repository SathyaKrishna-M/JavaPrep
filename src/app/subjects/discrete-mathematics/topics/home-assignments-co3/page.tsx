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
                    <p className="font-semibold text-cyan-400">Contrapositive Statement:</p>
                    <p className="text-gray-300">
                        If NOT (<MathRenderer math="x \ge 1" /> or <MathRenderer math="y \ge 1" />), then NOT (<MathRenderer math="x + y \ge 2" />).
                        <br />
                        Equivalent to: If <MathRenderer math="x < 1" /> AND <MathRenderer math="y < 1" />, then <MathRenderer math="x + y < 2" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Proof:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            Assume <MathRenderer math="x < 1" /> and <MathRenderer math="y < 1" />.
                            <br />
                            Adding the inequalities:
                            <br />
                            <MathRenderer display math="x + y < 1 + 1" />
                            <br />
                            <MathRenderer display math="x + y < 2" />
                        </p>
                    </div>
                    <p className="text-gray-300">
                        This proves the contrapositive statement is true.
                        <br />
                        Therefore, the original statement is true.
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
                    <p className="font-semibold text-cyan-400">Given:</p>
                    <p className="text-gray-300">
                        <MathRenderer math="5 | a" /> and <MathRenderer math="5 | b" />.
                        <br />
                        This means <MathRenderer math="a = 5k" /> and <MathRenderer math="b = 5m" /> for some integers <MathRenderer math="k, m" />.
                    </p>
                    <p className="font-semibold text-cyan-400">To Show:</p>
                    <p className="text-gray-300">
                        <MathRenderer math="5 | (3a + 7b)" />
                    </p>
                    <p className="font-semibold text-cyan-400">Proof:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            Substitute <MathRenderer math="a" /> and <MathRenderer math="b" />:
                            <br />
                            <MathRenderer display math="3a + 7b = 3(5k) + 7(5m)" />
                            <MathRenderer display math="= 15k + 35m" />
                            <MathRenderer display math="= 5(3k + 7m)" />
                        </p>
                    </div>
                    <p className="text-gray-300">
                        Since <MathRenderer math="(3k + 7m)" /> is an integer, <MathRenderer math="3a + 7b" /> is divisible by 5.
                        <br />
                        <span className="font-bold text-green-400">Q.E.D.</span>
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
                        <p className="text-red-300 font-semibold">Note:</p>
                        <p className="text-gray-300">
                            This statement is actually <strong>FALSE</strong> for <MathRenderer math="p=2" />.
                            <br />
                            <MathRenderer math="2 + 13 = 15" /> (Composite).
                            <br />
                            However, usually for <MathRenderer math="p > 2" />, <MathRenderer math="p" /> is odd, so <MathRenderer math="p+13" /> is even and greater than 2, thus composite.
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">Proof:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <strong>Case 1:</strong> <MathRenderer math="p = 2" />
                            <br />
                            <MathRenderer math="p + 13 = 2 + 13 = 15 = 3 \times 5" />. This is composite.
                        </p>
                        <hr className="border-blue-500/30 my-2" />
                        <p className="text-gray-300">
                            <strong>Case 2:</strong> <MathRenderer math="p > 2" />
                            <br />
                            Since <MathRenderer math="p" /> is prime and greater than 2, <MathRenderer math="p" /> must be odd.
                            <br />
                            13 is also odd.
                            <br />
                            The sum of two odd numbers is even.
                            <br />
                            <MathRenderer math="p + 13 = \text{odd} + \text{odd} = \text{even}" />
                            <br />
                            Since <MathRenderer math="p \ge 3" />, <MathRenderer math="p + 13 \ge 16" />.
                            <br />
                            The only even prime is 2. Since <MathRenderer math="p + 13 > 2" /> and is even, it must be composite.
                        </p>
                    </div>
                    <p className="text-gray-300">
                        In all cases, <MathRenderer math="p+13" /> is composite.
                    </p>
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
                    <p className="font-semibold text-cyan-400">Statement:</p>
                    <p className="text-gray-300">
                        <MathRenderer math="P \rightarrow Q" />
                        <br />
                        <MathRenderer math="P: a + b = c" />
                        <br />
                        <MathRenderer math="Q" />: at least one of <MathRenderer math="a, b, c" /> is even.
                    </p>
                    <p className="font-semibold text-cyan-400">Contrapositive (<MathRenderer math="\neg Q \rightarrow \neg P" />):</p>
                    <p className="text-gray-300">
                        If none of <MathRenderer math="a, b, c" /> is even (i.e., all are odd), then <MathRenderer math="a + b \neq c" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Proof:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            Assume <MathRenderer math="a, b" />, and <MathRenderer math="c" /> are all odd.
                            <br />
                            Sum of two odd integers is even. So <MathRenderer math="a + b" /> is even.
                            <br />
                            But <MathRenderer math="c" /> is odd (by assumption).
                            <br />
                            An even number cannot equal an odd number.
                            <br />
                            Therefore, <MathRenderer math="a + b \neq c" />.
                        </p>
                    </div>
                    <p className="text-gray-300">
                        The contrapositive is true, so the original statement is true.
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
                    <p className="text-gray-300">
                        Assume the negation: &quot;For all real numbers <MathRenderer math="x" />, <MathRenderer math="x^3 + 3x + 1 \neq 0" />&quot;.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            Consider the function <MathRenderer math="f(x) = x^3 + 3x + 1" />.
                            <br />
                            <MathRenderer math="f(0) = 1 > 0" />.
                            <br />
                            <MathRenderer math="f(-1) = -1 - 3 + 1 = -3 < 0" />.
                            <br />
                            Since <MathRenderer math="f(x)" /> is a polynomial, it is continuous.
                            <br />
                            By the Intermediate Value Theorem, there must exist a <MathRenderer math="c" /> between -1 and 0 such that <MathRenderer math="f(c) = 0" />.
                        </p>
                    </div>
                    <p className="text-gray-300">
                        This contradicts the assumption that <MathRenderer math="f(x) \neq 0" /> for all <MathRenderer math="x" />.
                        <br />
                        Thus, there exists an <MathRenderer math="x" /> such that <MathRenderer math="x^3 + 3x + 1 = 0" />.
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
                    <p className="text-gray-300">
                        Let <MathRenderer math="r" /> be rational and <MathRenderer math="i" /> be irrational.
                        <br />
                        We want to prove <MathRenderer math="s = r + i" /> is irrational.
                    </p>
                    <p className="font-semibold text-cyan-400">Proof by Contradiction:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            Assume <MathRenderer math="s" /> is rational.
                            <br />
                            Since <MathRenderer math="r" /> is rational, <MathRenderer math="s - r" /> must be rational (difference of two rationals is rational).
                            <br />
                            But <MathRenderer math="s - r = (r + i) - r = i" />.
                            <br />
                            This implies <MathRenderer math="i" /> is rational, which contradicts the given fact that <MathRenderer math="i" /> is irrational.
                        </p>
                    </div>
                    <p className="text-gray-300">
                        Therefore, the assumption is false, and <MathRenderer math="s" /> must be irrational.
                    </p>
                </div>
            ),
        },
        {
            question: '7. Sabnam has 2 school bags, 3 tiffin boxes and 2 water bottles. In how many ways can she carry these items (choosing one each)?',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Using the Product Rule (Multiplication Principle):</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="\text{Ways} = (\text{Ways to choose bag}) \times (\text{Ways to choose tiffin}) \times (\text{Ways to choose bottle})" />
                        <MathRenderer display math="= 2 \times 3 \times 2" />
                        <MathRenderer display math="= 12 \text{ ways}" />
                    </div>
                </div>
            ),
        },
        {
            question: '8. A student can choose a computer project from one of three lists containing 23, 15, and 19 projects. No project is on more than one list. How many choices?',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">Since the lists are mutually exclusive (no overlap), we use the Sum Rule.</p>
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
                    <p className="text-gray-300">
                        Total discs <MathRenderer math="n = 4 + 3 + 2 = 9" />.
                        <br />
                        This is a permutation with repetition.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="\text{Ways} = \frac{n!}{n_1! \times n_2! \times n_3!}" />
                        <MathRenderer display math="= \frac{9!}{4! \times 3! \times 2!}" />
                        <MathRenderer display math="= \frac{362,880}{24 \times 6 \times 2}" />
                        <MathRenderer display math="= \frac{362,880}{288}" />
                        <MathRenderer display math="= 1,260 \text{ ways}" />
                    </div>
                </div>
            ),
        },
        {
            question: '10. Eight students should be accommodated in two 3-bed and one 2-bed rooms. In how many ways can they be accommodated?',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        We need to divide 8 students into groups of 3, 3, and 2.
                        <br />
                        This is a multinomial coefficient problem.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="\text{Ways} = \binom{8}{3,3,2} = \frac{8!}{3! \times 3! \times 2!}" />
                        <MathRenderer display math="= \frac{40,320}{6 \times 6 \times 2}" />
                        <MathRenderer display math="= \frac{40,320}{72}" />
                        <MathRenderer display math="= 560 \text{ ways}" />
                    </div>
                </div>
            ),
        },
        {
            question: '11. How many 3-digit even numbers can be made using digits 1, 2, 3, 4, 6, 7 if no digit is repeated?',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Digits available: <MathRenderer math="\{1, 2, 3, 4, 6, 7\}" /> (Total 6).
                        <br />
                        Even digits: <MathRenderer math="\{2, 4, 6\}" /> (3 choices).
                        <br />
                        For a number to be even, the last digit must be even.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <strong>Step 1:</strong> Choose last digit (Units place). 3 ways (2, 4, or 6).
                            <br />
                            <strong>Step 2:</strong> Choose first digit (Hundreds place). 5 remaining digits.
                            <br />
                            <strong>Step 3:</strong> Choose middle digit (Tens place). 4 remaining digits.
                        </p>
                        <hr className="border-blue-500/30 my-2" />
                        <MathRenderer display math="\text{Total} = 3 \times 5 \times 4 = 60 \text{ numbers}" />
                    </div>
                </div>
            ),
        },
        {
            question: '12. A question paper contains 10 questions. A student has to answer 7. Question 1 is compulsory. In how many ways?',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Total questions = 10. To answer = 7.
                        <br />
                        Q1 is compulsory, so we must choose Q1.
                        <br />
                        Remaining to choose = <MathRenderer math="7 - 1 = 6" />.
                        <br />
                        Remaining questions pool = <MathRenderer math="10 - 1 = 9" />.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="C(9, 6) = \binom{9}{6} = \frac{9!}{6!3!}" />
                        <MathRenderer display math="= \frac{9 \times 8 \times 7}{3 \times 2 \times 1}" />
                        <MathRenderer display math="= \frac{504}{6} = 84 \text{ ways}" />
                    </div>
                </div>
            ),
        },
        {
            question: '13. Select 4 books from 10 such that two particular books are either both included or both excluded.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">Let the two particular books be A and B.</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">Case 1: Both A and B are included.</p>
                        <p className="text-gray-300">
                            We need to choose 2 more books from the remaining 8.
                            <br />
                            <MathRenderer math="C(8, 2) = 28" />.
                        </p>
                        <hr className="border-blue-500/30 my-2" />
                        <p className="font-semibold text-cyan-400">Case 2: Both A and B are excluded.</p>
                        <p className="text-gray-300">
                            We need to choose all 4 books from the remaining 8.
                            <br />
                            <MathRenderer math="C(8, 4) = \frac{8 \times 7 \times 6 \times 5}{4 \times 3 \times 2 \times 1} = 70" />.
                        </p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <MathRenderer display math="\text{Total ways} = 28 + 70 = 98 \text{ ways}" />
                    </div>
                </div>
            ),
        },
        {
            question: '14. From 15 people (5 women, 10 men), form a team of 6 with at least 2 women.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Total ways to choose 6 from 15: <MathRenderer math="C(15, 6) = 5005" />.
                        <br />
                        Subtract cases with &lt; 2 women (0 or 1 woman).
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <strong>Case 0 Women:</strong> Choose 6 men from 10. <MathRenderer math="C(10, 6) = 210" />.
                            <br />
                            <strong>Case 1 Woman:</strong> Choose 1 woman from 5 AND 5 men from 10.
                            <br />
                            <MathRenderer math="C(5, 1) \times C(10, 5) = 5 \times 252 = 1260" />.
                        </p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <MathRenderer display math="\text{Total valid} = \text{Total} - (\text{Case 0} + \text{Case 1})" />
                        <MathRenderer display math="= 5005 - (210 + 1260)" />
                        <MathRenderer display math="= 5005 - 1470" />
                        <MathRenderer display math="= 3535 \text{ ways}" />
                    </div>
                </div>
            ),
        },
        {
            question: '15. Select team of 5 from 8 engineers and 6 designers. At least 2 designers must be included.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">Total: 5 members. Possible compositions (Designers, Engineers):</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            <li>(2 D, 3 E): <MathRenderer math="C(6, 2) \times C(8, 3) = 15 \times 56 = 840" /></li>
                            <li>(3 D, 2 E): <MathRenderer math="C(6, 3) \times C(8, 2) = 20 \times 28 = 560" /></li>
                            <li>(4 D, 1 E): <MathRenderer math="C(6, 4) \times C(8, 1) = 15 \times 8 = 120" /></li>
                            <li>(5 D, 0 E): <MathRenderer math="C(6, 5) \times C(8, 0) = 6 \times 1 = 6" /></li>
                        </ul>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <MathRenderer display math="\text{Total ways} = 840 + 560 + 120 + 6 = 1526 \text{ ways}" />
                    </div>
                </div>
            ),
        },
    ],
}

export default function HomeAssignmentsCO3Page() {
    return <DMTopicPage content={content} />
}
