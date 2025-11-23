'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLayers, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Modular Program Structure',
  explanationSections: [
    {
      title: 'Modular Design',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Modular Design</span> breaks code into independent, reusable modules.

Benefits:
→ <span class="text-cyan-300">Reusability:</span> Use modules in multiple places
→ <span class="text-cyan-300">Maintainability:</span> Easy to update
→ <span class="text-cyan-300">Testability:</span> Test modules independently
→ <span class="text-cyan-300">Organization:</span> Clear structure

Principles:
→ <span class="text-amber-300">Single Responsibility:</span> Each class has one purpose
→ <span class="text-amber-300">Separation of Concerns:</span> Separate different functionalities
→ <span class="text-amber-300">Loose Coupling:</span> Minimize dependencies`,
      code: `// Modular structure example
class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static int multiply(int a, int b) {
        return a * b;
    }
}

class Display {
    public static void showResult(int result) {
        System.out.println("Result: " + result);
    }
}

public class ModularDemo {
    public static void main(String[] args) {
        int sum = Calculator.add(5, 3);
        Display.showResult(sum);
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Design a modular program with separate classes for data processing and display.',
      solution: 'Create separate classes for different responsibilities.',
      solutionCode: `class DataProcessor {
    public static int process(int[] data) {
        int sum = 0;
        for (int num : data) {
            sum += num;
        }
        return sum;
    }
}

class OutputDisplay {
    public static void show(int result) {
        System.out.println("Processed result: " + result);
    }
}

public class ModularExample {
    public static void main(String[] args) {
        int[] data = {1, 2, 3, 4, 5};
        int result = DataProcessor.process(data);
        OutputDisplay.show(result);
    }
}`,
    },
  ],
}

export default function ModularProgramStructurePage() {
  return <TopicPage content={content} />
}

