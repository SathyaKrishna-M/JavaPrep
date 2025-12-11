'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiRefreshCw, FiTarget, FiCode, FiCpu } from 'react-icons/fi'

const content = {
  title: 'Type Casting',
  explanationSections: [
    {
      title: 'Introduction: The Bucket Analogy',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Type Casting</span> is converting a value from one data type to another.
            Think of variables as containers or <span className="text-cyan-400 font-bold">buckets</span> of different sizes.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Widening (Implicit):</span> Pouring water from a small cup (<code className="text-pink-400">byte</code>) into a large bucket (<code className="text-pink-400">double</code>). <br />
                <span className="text-sm text-gray-400 ml-6">→ No risk of spilling (No data loss). Happens automatically.</span>
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Narrowing (Explicit):</span> Pouring water from a large bucket (<code className="text-pink-400">double</code>) into a small cup (<code className="text-pink-400">int</code>). <br />
                <span className="text-sm text-gray-400 ml-6">→ Risk of spilling! (Data loss/Truncation). You must do it manually (Explicitly).</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Widening Casting (Implicit)',
      icon: <FiTarget className="w-6 h-6" />,
      content: `Converting a smaller type to a larger type size. Done automatically by Java.

Order:
<span class="text-cyan-300">byte</span> → <span class="text-cyan-300">short</span> → <span class="text-cyan-300">int</span> → <span class="text-cyan-300">long</span> → <span class="text-cyan-300">float</span> → <span class="text-cyan-300">double</span>

<span class="text-amber-300">Why safe?</span> The target type is large enough to hold the source value without losing information.`,
      code: `public class WideningCasting {
    public static void main(String[] args) {
        int myInt = 9;
        double myDouble = myInt; // Automatic casting: int to double

        System.out.println(myInt);      // Outputs 9
        System.out.println(myDouble);   // Outputs 9.0
    }
}`,
    },
    {
      title: 'Narrowing Casting (Explicit)',
      icon: <FiCode className="w-6 h-6" />,
      content: `Converting a larger type to a smaller size type. Must be done manually by placing the type in parentheses \`()\`.

Syntax:
<span class="text-blue-400">(targetType) value</span>

<span class="text-red-300">Warning:</span> This strips away the fractional part for floating-point numbers (truncation) or overflows if the number is too big for the target type.`,
      code: `public class NarrowingCasting {
    public static void main(String[] args) {
        double myDouble = 9.78d;
        int myInt = (int) myDouble; // Explicit casting: double to int

        System.out.println(myDouble);   // Outputs 9.78
        System.out.println(myInt);      // Outputs 9 (Fractional part lost!)
    }
}`,
    },
    {
      title: 'Type Promotion in Expressions',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: `When evaluating expressions, Java automatically promotes smaller types to larger types to ensure precision.

Rules:
1. If one operand is <code class="text-pink-400">double</code>, the result is <code class="text-pink-400">double</code>.
2. If one is <code class="text-pink-400">float</code>, the result is <code class="text-pink-400">float</code>.
3. If one is <code class="text-pink-400">long</code>, the result is <code class="text-pink-400">long</code>.
4. Otherwise, all <code class="text-pink-400">byte</code>, <code class="text-pink-400">short</code>, and <code class="text-pink-400">char</code> operands are promoted to <code class="text-pink-400">int</code>.`,
      code: `byte a = 10;
byte b = 30;
// byte c = a * b; // Error! Result is promoted to int
int c = a * b;    // Correct: 300`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Loyalty Points Calculation',
      solution: 'Convert a purchase amount (double) to loyalty points (int) by truncating the decimal value.',
      steps: [
        {
          step: '1. Why Casting?',
          explanation: 'Prices have cents (decimals), but points are usually whole numbers. We need to discard the cents.'
        },
        {
          step: '2. Implementation',
          explanation: (
            <div className="font-mono text-sm">
              double price = 99.99; <br />
                      // Explicitly cast double to int to truncate .99 <br />
              int points = (int) price; <br />
              System.out.println("Points earned: " + points); // 99 points
            </div>
          )
        }
      ]
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Demonstrate widening casting by converting a byte to double through all intermediate types.',
      solution: 'Start with byte, convert to short, int, long, float, and finally double.',
      solutionCode: `public class WideningDemo {
{{ ... }}
        int sum = (int) (b + i + d);
        System.out.println("Sum (cast to int): " + sum);
    }
}`,
    },
  ] as PracticeQuestion[],
}

export default function TypeCastingPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
