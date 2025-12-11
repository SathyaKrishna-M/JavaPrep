'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiZap, FiTarget, FiToggleRight, FiCpu } from 'react-icons/fi'

const content = {
  title: 'Bitwise Operators',
  explanationSections: [
    {
      title: 'Introduction: Light Switch Array',
      icon: <FiToggleRight className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Bitwise Operators</span> work directly on the binary digits (bits) of integers.
            Think of a byte as an <span className="text-cyan-400 font-bold">Array of 8 Light Switches</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">1 = ON, 0 = OFF</span>
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">AND (&):</span> Both switches must be ON for the result to be ON.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">OR (|):</span> At least one switch must be ON.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">XOR (^):</span> Switches must be DIFFERENT (one ON, one OFF).
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Operator Guide',
      icon: <FiZap className="w-6 h-6" />,
      content: `Let's look at A = 5 (0101) and B = 3 (0011).

1. <span class="text-blue-400 font-semibold">& (AND):</span> \`0101 & 0011 = 0001 (1)\`
   - Only the last bit is 1 in both.

2. <span class="text-blue-400 font-semibold">| (OR):</span> \`0101 | 0011 = 0111 (7)\`
   - Any bit that is 1 results in 1.

3. <span class="text-blue-400 font-semibold">^ (XOR):</span> \`0101 ^ 0011 = 0110 (6)\`
   - Bits that are different become 1.

4. <span class="text-blue-400 font-semibold">~ (NOT):</span> \`~0101 = 1010\`
   - Flips every bit.

5. <span class="text-blue-400 font-semibold"><< (Left Shift):</span> shifts bits to left (multiply by 2).
6. <span class="text-blue-400 font-semibold">>> (Right Shift):</span> shifts bits to right (divide by 2).`,
      code: `public class BitwiseHelp {
    public static void main(String[] args) {
        int a = 5; // 0101
        int b = 3; // 0011
        
        System.out.println("AND: " + (a & b)); // 1
        System.out.println("OR: " + (a | b));  // 7
        System.out.println("XOR: " + (a ^ b)); // 6
        
        // Efficient way to multiply/divide by powers of 2
        System.out.println("5 * 2 = " + (5 << 1)); // 10
        System.out.println("20 / 4 = " + (20 >> 2)); // 5
    }
}`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Check if Odd or Even',
      solution: 'Check the last bit (LSB). If 1, it\'s Odd. If 0, it\'s Even.',
      steps: [
        {
          step: '1. Logic',
          explanation: 'n & 1 checks ONLY the last bit.'
        },
        {
          step: '2. Efficiency',
          explanation: 'Faster than modulus (%) operation.'
        }
      ],
      code: `public class OddEven {
    public static boolean isOdd(int n) {
        return (n & 1) == 1;
    }
    public static void main(String [] args) {
        System.out.println(isOdd(5)); // true (101 & 001 = 1)
        System.out.println(isOdd(4)); // false (100 & 001 = 0)
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Swap two numbers without a temporary variable.',
      solution: 'Use XOR swap algorithm: a = a^b; b = a^b; a = a^b;',
      solutionCode: `public class Swap {
    public static void main(String[] args) {
        int a = 5, b = 10;
        
        a = a ^ b;
        b = a ^ b; // (original a)
        a = a ^ b; // (original b)
        
        System.out.println("a: " + a + ", b: " + b);
    }
}`
    },
    {
      question: 'Check if a number is a power of 2.',
      solution: 'Powers of 2 have only one bit set (e.g., 1000). (n & (n-1)) should be 0.',
      solutionCode: `public class PowerOfTwo {
    static boolean check(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class Main {
    public static void main(String[] args) {
        int n = 5; // 101
        int res = n & 1;
        System.out.println(res);
    }
}`,
  dryRunSteps: [
    { line: 3, vars: { n: 5 }, output: '', description: 'n is 5 (Binary: ...0000 0101)' },
    { line: 4, vars: { n: 5, 1: 1, res: 1 }, output: '', description: 'n & 1 => 0101 & 0001 = 0001. res becomes 1.' },
    { line: 5, vars: { res: 1 }, output: '1\\n', description: 'Prints result.' },
  ] as DryRunStep[]
}

export default function BitwiseOperatorsPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
