'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiEdit3 } from 'react-icons/fi'

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
            question: '1. Use a proof by contraposition to show that if x + y ≥ 2, where x and y are real numbers, then x ≥ 1 or y ≥ 1.',
            solution: 'Contrapositive Statement: If NOT (x ≥ 1 or y ≥ 1), then NOT (x + y ≥ 2).\nEquivalent to: If x < 1 AND y < 1, then x + y < 2.\n\nProof:\nAssume x < 1 and y < 1.\nAdding the inequalities: x + y < 1 + 1\nx + y < 2.\nThis proves the contrapositive statement is true.\nTherefore, the original statement is true.',
        },
        {
            question: '2. For integers a, b, if 5 | a and 5 | b, then 5 | (3a + 7b) by direct proof.',
            solution: 'Given: 5 | a and 5 | b.\nThis means a = 5k and b = 5m for some integers k, m.\nWe need to show 5 | (3a + 7b).\nSubstitute a and b:\n3a + 7b = 3(5k) + 7(5m)\n= 15k + 35m\n= 5(3k + 7m)\nSince (3k + 7m) is an integer, 3a + 7b is divisible by 5.\nQ.E.D.',
        },
        {
            question: '3. Use direct proof to show that if p is a prime number, then p+13 is a composite.',
            solution: 'Wait, this statement is FALSE. Counterexample: p=2 (prime). p+13 = 15 (composite). p=3 (prime). p+13 = 16 (composite). p=5 (prime). p+13 = 18 (composite). p=11 (prime). p+13 = 24. \nLet\'s check p=17. 17+13 = 30.\nIs there any prime p where p+13 is prime?\nIf p=2, p+13=15 (div by 3,5).\nIf p is odd prime, p+13 is even (odd+odd=even). Since p>2, p+13 > 15. All even numbers > 2 are composite.\nSo, for p > 2, p+13 is even and >2, thus composite.\nFor p=2, p+13=15, which is composite.\n\nProof:\nCase 1: p = 2. p+13 = 15 = 3×5. Composite.\nCase 2: p > 2. Since p is prime and > 2, p must be odd. 13 is odd.\nThe sum of two odd numbers is even. So p+13 is even.\nSince p ≥ 3, p+13 ≥ 16. The only even prime is 2.\nThus, p+13 is an even number greater than 2, so it is composite.\nIn all cases, p+13 is composite.',
        },
        {
            question: '4. Prove "If a + b = c, where a, b, c are integers, then at least one of a, b, c is even" using indirect proof by contrapositive.',
            solution: 'Statement: P → Q\nP: a + b = c\nQ: at least one of a, b, c is even.\n\nContrapositive (¬Q → ¬P):\nIf none of a, b, c is even (i.e., all are odd), then a + b ≠ c.\n\nProof:\nAssume a, b, and c are all odd.\nSum of two odd integers is even. So a + b is even.\nBut c is odd (by assumption).\nAn even number cannot equal an odd number.\nTherefore, a + b ≠ c.\nThe contrapositive is true, so the original statement is true.',
        },
        {
            question: '5. Explain how to use proof by contradiction to prove "There is a real number x such that x³ + 3x + 1 = 0".',
            solution: 'Actually, proof by contradiction is usually used to prove universal statements (by assuming existence of counterexample) or non-existence. For existence proofs, we usually use constructive proofs or Intermediate Value Theorem.\nHowever, to frame it as contradiction:\nAssume the negation: "For all real numbers x, x³ + 3x + 1 ≠ 0".\nConsider the function f(x) = x³ + 3x + 1.\nf(0) = 1 > 0.\nf(-1) = -1 - 3 + 1 = -3 < 0.\nSince f(x) is a polynomial, it is continuous.\nBy the Intermediate Value Theorem, there must exist a c between -1 and 0 such that f(c) = 0.\nThis contradicts the assumption that f(x) ≠ 0 for all x.\nThus, there exists an x such that x³ + 3x + 1 = 0.',
        },
        {
            question: '6. Using indirect proof, prove that the sum of a rational number and an irrational number is irrational.',
            solution: 'Let r be rational and i be irrational.\nWe want to prove s = r + i is irrational.\nProof by Contradiction:\nAssume s is rational.\nSince r is rational, s - r must be rational (difference of two rationals is rational).\nBut s - r = (r + i) - r = i.\nThis implies i is rational, which contradicts the given fact that i is irrational.\nTherefore, the assumption is false, and s must be irrational.',
        },
        {
            question: '7. Sabnam has 2 school bags, 3 tiffin boxes and 2 water bottles. In how many ways can she carry these items (choosing one each)?',
            solution: 'Using the Product Rule (Multiplication Principle):\nWays = (Ways to choose bag) × (Ways to choose tiffin) × (Ways to choose bottle)\n= 2 × 3 × 2\n= 12 ways.',
        },
        {
            question: '8. A student can choose a computer project from one of three lists containing 23, 15, and 19 projects. No project is on more than one list. How many choices?',
            solution: 'Since the lists are mutually exclusive (no overlap), we use the Sum Rule.\nTotal Choices = 23 + 15 + 19\n= 57 possible projects.',
        },
        {
            question: '9. In how many ways can 4 red, 3 yellow and 2 green discs be arranged in a row if discs of same colour are indistinguishable?',
            solution: 'Total discs n = 4 + 3 + 2 = 9.\nThis is a permutation with repetition.\nFormula: n! / (n₁! × n₂! × n₃!)\n= 9! / (4! × 3! × 2!)\n= 362,880 / (24 × 6 × 2)\n= 362,880 / 288\n= 1,260 ways.',
            formula: '\\frac{9!}{4!3!2!} = 1260',
        },
        {
            question: '10. Eight students should be accommodated in two 3-bed and one 2-bed rooms. In how many ways can they be accommodated?',
            solution: 'We need to divide 8 students into groups of 3, 3, and 2.\nThis is a multinomial coefficient problem.\nWays = 8! / (3! × 3! × 2!)\n= 40,320 / (6 × 6 × 2)\n= 40,320 / 72\n= 560 ways.\n(Note: If the two 3-bed rooms are identical/indistinguishable, we would divide by 2!, but usually rooms are distinct e.g., Room A, Room B). Assuming distinct rooms.',
            formula: '\\binom{8}{3,3,2} = \\frac{8!}{3!3!2!} = 560',
        },
        {
            question: '11. How many 3-digit even numbers can be made using digits 1, 2, 3, 4, 6, 7 if no digit is repeated?',
            solution: 'Digits available: {1, 2, 3, 4, 6, 7} (Total 6).\nEven digits: {2, 4, 6} (3 choices).\nFor a number to be even, the last digit must be even.\n\nStep 1: Choose last digit (Units place). 3 ways (2, 4, or 6).\nStep 2: Choose first digit (Hundreds place). 5 remaining digits.\nStep 3: Choose middle digit (Tens place). 4 remaining digits.\n\nTotal = 3 × 5 × 4 = 60 numbers.',
        },
        {
            question: '12. A question paper contains 10 questions. A student has to answer 7. Question 1 is compulsory. In how many ways?',
            solution: 'Total questions = 10.\nTo answer = 7.\nQ1 is compulsory, so we must choose Q1.\nRemaining to choose = 7 - 1 = 6.\nRemaining questions pool = 10 - 1 = 9.\n\nWe need to choose 6 questions from 9.\nC(9, 6) = 9! / (6!3!) = (9×8×7) / (3×2×1) = 504 / 6 = 84 ways.',
            formula: 'C(9, 6) = 84',
        },
        {
            question: '13. Select 4 books from 10 such that two particular books are either both included or both excluded.',
            solution: 'Let the two particular books be A and B.\nCase 1: Both A and B are included.\nWe need to choose 2 more books from the remaining 8.\nC(8, 2) = 28.\n\nCase 2: Both A and B are excluded.\nWe need to choose all 4 books from the remaining 8.\nC(8, 4) = (8×7×6×5)/(4×3×2×1) = 70.\n\nTotal ways = 28 + 70 = 98 ways.',
        },
        {
            question: '14. From 15 people (5 women, 10 men), form a team of 6 with at least 2 women.',
            solution: 'Total ways to choose 6 from 15: C(15, 6) = 5005.\nSubtract cases with < 2 women (0 or 1 woman).\n\nCase 0 Women: Choose 6 men from 10. C(10, 6) = 210.\nCase 1 Woman: Choose 1 woman from 5 AND 5 men from 10. C(5, 1) × C(10, 5) = 5 × 252 = 1260.\n\nTotal valid = Total - (Case 0 + Case 1)\n= 5005 - (210 + 1260)\n= 5005 - 1470\n= 3535 ways.',
        },
        {
            question: '15. Select team of 5 from 8 engineers and 6 designers. At least 2 designers must be included.',
            solution: 'Total: 5 members.\nPossible compositions (Designers, Engineers):\n1. (2 D, 3 E): C(6, 2) × C(8, 3) = 15 × 56 = 840\n2. (3 D, 2 E): C(6, 3) × C(8, 2) = 20 × 28 = 560\n3. (4 D, 1 E): C(6, 4) × C(8, 1) = 15 × 8 = 120\n4. (5 D, 0 E): C(6, 5) × C(8, 0) = 6 × 1 = 6\n\nTotal ways = 840 + 560 + 120 + 6 = 1526 ways.',
        },
    ],
}

export default function HomeAssignmentsCO3Page() {
    return <DMTopicPage content={content} />
}
