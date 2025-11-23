'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiAlertCircle, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Exception Handling',
  explanationSections: [
    {
      title: 'Introduction to Exceptions',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Exception</span> is an error that occurs during program execution.

Types:
→ <span class="text-cyan-300">Checked:</span> Must be handled (IOException, SQLException)
→ <span class="text-cyan-300">Unchecked:</span> Runtime exceptions (NullPointerException, ArrayIndexOutOfBoundsException)
→ <span class="text-cyan-300">Error:</span> Serious problems (OutOfMemoryError)

Handling:
→ <span class="text-blue-400">try-catch:</span> Handle exceptions
→ <span class="text-blue-400">finally:</span> Always executes
→ <span class="text-blue-400">throw:</span> Throw exception
→ <span class="text-blue-400">throws:</span> Declare exception`,
      code: `public class ExceptionHandling {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);  // ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index out of bounds: " + e.getMessage());
        } finally {
            System.out.println("Finally block always executes");
        }
        
        // Multiple catch blocks
        try {
            int result = 10 / 0;  // ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Division by zero: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("General exception: " + e.getMessage());
        }
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Handle division by zero exception using try-catch block.',
      solution: 'Use try-catch to catch ArithmeticException when dividing by zero.',
      solutionCode: `public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int a = 10;
            int b = 0;
            int result = a / b;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
    },
  ],
}

export default function ExceptionHandlingPage() {
  return <TopicPage content={content} />
}

