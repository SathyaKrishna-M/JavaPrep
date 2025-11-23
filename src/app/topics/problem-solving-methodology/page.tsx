'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiTarget, FiCode, FiLayers } from 'react-icons/fi'

const content = {
  title: 'Problem-Solving Methodology',
  explanationSections: [
    {
      title: 'Introduction to Problem Solving',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Problem-Solving Methodology</span> is a systematic approach to solving programming problems.

Steps:
→ <span class="text-cyan-300">1. Understand:</span> Read and understand the problem
→ <span class="text-cyan-300">2. Plan:</span> Design algorithm/approach
→ <span class="text-cyan-300">3. Code:</span> Implement the solution
→ <span class="text-cyan-300">4. Test:</span> Verify with test cases
→ <span class="text-cyan-300">5. Debug:</span> Fix errors if any

Key Questions:
→ <span class="text-amber-300">What is the input?</span>
→ <span class="text-amber-300">What is the expected output?</span>
→ <span class="text-amber-300">What are the constraints?</span>
→ <span class="text-amber-300">What is the approach?</span>`,
      code: `// Problem: Find sum of two numbers
// Step 1: Understand - Read two numbers, find sum
// Step 2: Plan - Use addition operator
// Step 3: Code
public class ProblemSolving {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int sum = a + b;
        System.out.println("Sum: " + sum);
    }
}`,
    },
    {
      title: 'Understanding the Problem',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Understanding</span> is the first and most important step.

Process:
→ <span class="text-cyan-300">Read carefully:</span> Read problem statement multiple times
→ <span class="text-cyan-300">Identify inputs:</span> What data is given?
→ <span class="text-cyan-300">Identify outputs:</span> What is expected?
→ <span class="text-cyan-300">Identify constraints:</span> Limits, edge cases
→ <span class="text-cyan-300">Examples:</span> Work through examples manually`,
      code: `// Example: Find maximum of three numbers
// Input: Three integers
// Output: Maximum value
// Constraints: All integers
// Example: max(5, 10, 3) = 10

public class UnderstandingProblem {
    public static int findMax(int a, int b, int c) {
        // Plan: Compare all three numbers
        if (a >= b && a >= c) {
            return a;
        } else if (b >= a && b >= c) {
            return b;
        } else {
            return c;
        }
    }
    
    public static void main(String[] args) {
        System.out.println("Max: " + findMax(5, 10, 3));  // 10
    }
}`,
    },
    {
      title: 'Planning the Solution',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Planning</span> involves designing the algorithm.

Approaches:
→ <span class="text-cyan-300">Break down:</span> Divide into smaller subproblems
→ <span class="text-cyan-300">Choose data structures:</span> Arrays, variables, etc.
→ <span class="text-cyan-300">Choose algorithms:</span> Loops, conditionals, etc.
→ <span class="text-cyan-300">Pseudocode:</span> Write algorithm in plain language
→ <span class="text-cyan-300">Flowchart:</span> Visual representation`,
      code: `// Problem: Count even numbers in array
// Plan:
// 1. Traverse array
// 2. Check if number is even
// 3. Count even numbers
// 4. Return count

public class PlanningSolution {
    public static int countEven(int[] arr) {
        int count = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] % 2 == 0) {
                count++;
            }
        }
        return count;
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6};
        System.out.println("Even count: " + countEven(numbers));
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Apply problem-solving methodology to find the factorial of a number.',
      solution: 'Understand (input: n, output: n!), Plan (use loop), Code, Test.',
      solutionCode: `public class Factorial {
    public static int factorial(int n) {
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
    }
}`,
    },
  ],
}

export default function ProblemSolvingMethodologyPage() {
  return <TopicPage content={content} />
}

