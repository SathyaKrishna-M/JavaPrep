'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiCode, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Lambda Expressions',
  explanationSections: [
    {
      title: 'Introduction to Lambda',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Lambda Expressions</span> provide concise way to implement functional interfaces.

Syntax:
→ <span class="text-blue-400">(parameters) -> expression</span>
→ <span class="text-blue-400">(parameters) -> { statements }</span>

Features:
→ <span class="text-cyan-300">Functional interface:</span> Interface with one abstract method
→ <span class="text-cyan-300">Method reference:</span> ClassName::methodName
→ <span class="text-cyan-300">Concise:</span> Less boilerplate code

Use Cases:
→ <span class="text-amber-300">Event handlers</span>
→ <span class="text-amber-300">Collections operations</span>
→ <span class="text-amber-300">Stream API</span>`,
      code: `import java.util.*;

@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

public class LambdaDemo {
    public static void main(String[] args) {
        // Lambda expression
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;
        
        System.out.println("Sum: " + add.calculate(5, 3));
        System.out.println("Product: " + multiply.calculate(5, 3));
        
        // With collections
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        names.forEach(name -> System.out.println(name));
        
        // Method reference
        names.forEach(System.out::println);
        
        // Runnable with lambda
        Runnable r = () -> System.out.println("Running");
        new Thread(r).start();
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Use lambda expression to implement a functional interface that adds two numbers.',
      solution: 'Create functional interface and implement using lambda expression.',
      solutionCode: `@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

public class LambdaExample {
    public static void main(String[] args) {
        MathOperation add = (a, b) -> a + b;
        System.out.println("Result: " + add.operate(10, 20));
    }
}`,
    },
  ],
}

export default function LambdaExpressionsPage() {
  return <TopicPage content={content} />
}

