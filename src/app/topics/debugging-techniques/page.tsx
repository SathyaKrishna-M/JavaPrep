'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiAlertCircle, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Debugging Techniques',
  explanationSections: [
    {
      title: 'Introduction to Debugging',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Debugging</span> is finding and fixing errors in code.

Types of Errors:
→ <span class="text-cyan-300">Syntax errors:</span> Compilation errors
→ <span class="text-cyan-300">Runtime errors:</span> Exceptions during execution
→ <span class="text-cyan-300">Logic errors:</span> Wrong output

Techniques:
→ <span class="text-amber-300">Print statements:</span> Add System.out.println()
→ <span class="text-amber-300">Dry run:</span> Trace execution manually
→ <span class="text-amber-300">Breakpoints:</span> Pause execution
→ <span class="text-amber-300">Step through:</span> Execute line by line`,
      code: `public class DebuggingExample {
    public static void main(String[] args) {
        int a = 10;
        int b = 5;
        
        // Add print statements to debug
        System.out.println("a = " + a);
        System.out.println("b = " + b);
        
        int result = a / b;
        System.out.println("Result: " + result);
        
        // Check for errors
        if (b == 0) {
            System.out.println("Error: Division by zero");
        }
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Debug a program that calculates average but gives wrong result. Add print statements to trace execution.',
      solution: 'Add print statements to track variable values and identify the bug.',
      solutionCode: `public class DebugAverage {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};
        int sum = 0;
        
        // Debug: Print array
        System.out.println("Numbers: " + java.util.Arrays.toString(numbers));
        
        for (int i = 0; i < numbers.length; i++) {
            sum += numbers[i];
            // Debug: Print each step
            System.out.println("i=" + i + ", number=" + numbers[i] + ", sum=" + sum);
        }
        
        double average = sum / numbers.length;
        System.out.println("Average: " + average);
    }
}`,
    },
  ],
}

export default function DebuggingTechniquesPage() {
  return <TopicPage content={content} />
}

