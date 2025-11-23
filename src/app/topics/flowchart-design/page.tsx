'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLayers, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Flowchart Design',
  explanationSections: [
    {
      title: 'Introduction to Flowcharts',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Flowchart</span> is a visual representation of an algorithm.

Symbols:
→ <span class="text-cyan-300">Oval:</span> Start/End
→ <span class="text-cyan-300">Rectangle:</span> Process
→ <span class="text-cyan-300">Diamond:</span> Decision
→ <span class="text-cyan-300">Parallelogram:</span> Input/Output
→ <span class="text-cyan-300">Arrows:</span> Flow direction

Benefits:
→ <span class="text-amber-300">Visual clarity:</span> Easy to understand
→ <span class="text-amber-300">Algorithm design:</span> Plan before coding
→ <span class="text-amber-300">Documentation:</span> Explain logic`,
      code: `// Flowchart for finding maximum of two numbers
// Start → Input a, b → Is a > b? → Yes: max = a → No: max = b → Output max → End

public class FlowchartExample {
    public static void main(String[] args) {
        int a = 10, b = 20;
        int max;
        
        if (a > b) {
            max = a;
        } else {
            max = b;
        }
        
        System.out.println("Maximum: " + max);
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Design a flowchart for checking if a number is even or odd.',
      solution: 'Start → Input number → Is number % 2 == 0? → Yes: Even → No: Odd → End',
      solutionCode: `public class EvenOdd {
    public static void main(String[] args) {
        int num = 10;
        if (num % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
    }
}`,
    },
  ],
}

export default function FlowchartDesignPage() {
  return <TopicPage content={content} />
}

