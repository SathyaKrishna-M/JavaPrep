'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiCode, FiScissors, FiFastForward, FiPackage, FiZap } from 'react-icons/fi'

const content = {
  title: 'Lambda Expressions',
  explanationSections: [
    {
      title: 'Introduction: Returns of the Jedi (Short Note)',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Lambda Expressions</span> (Java 8+) let you write concise code.
            Think of it as a <span className="text-cyan-400 font-bold">Sticky Note</span> vs a <span className="text-gray-400">Formal Letter</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Anonymous Class (Formal Letter):</span> You write a whole class definition just to pass one small action. "Dear Compiler, I hereby declare a class that implements..."
              </li>
              <li>
                <span className="text-green-400 font-semibold">Lambda (Sticky Note):</span> You just scribble the action. <code>(a, b) -&gt; a + b</code>. Short, sweet, to the point.
              </li>
              <li>
                <span className="text-blue-400 font-semibold">Functional Interface:</span> An interface with EXACTLY one abstract method (like <code>Runnable</code> or <code>Callable</code>). Lambdas stick to these.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Standard Functional Interfaces',
      icon: <FiPackage className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Java provides built-in interfaces in <code>java.util.function</code> so you don&apos;t have to create your own.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-blue-400 font-mono mb-2">Predicate&lt;T&gt;</h5>
              <p className="text-xs text-gray-400 mb-2">Checks a condition. Returns <code>boolean</code>.</p>
              <code className="text-xs text-blue-300">s -&gt; s.isEmpty()</code>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-green-400 font-mono mb-2">Consumer&lt;T&gt;</h5>
              <p className="text-xs text-gray-400 mb-2">Accepts an input, returns nothing (void).</p>
              <code className="text-xs text-green-300">s -&gt; System.out.println(s)</code>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-purple-400 font-mono mb-2">Function&lt;T, R&gt;</h5>
              <p className="text-xs text-gray-400 mb-2">Transforms T to R.</p>
              <code className="text-xs text-purple-300">s -&gt; s.length()</code>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-orange-400 font-mono mb-2">Supplier&lt;T&gt;</h5>
              <p className="text-xs text-gray-400 mb-2">Takes nothing, returns T.</p>
              <code className="text-xs text-orange-300">() -&gt; Math.random()</code>
            </div>
          </div>
        </div>
      ),
      code: `import java.util.function.*;

public class StandardInterfaces {
    public static void main(String[] args) {
        // Predicate: Is the number even?
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println("Is 4 even? " + isEven.test(4));

        // Function: Convert String to Integer
        Function<String, Integer> wordLen = s -> s.length();
        System.out.println("Length of 'Java': " + wordLen.apply("Java"));
        
        // Consumer: Print message
        Consumer<String> printer = msg -> System.out.println("Msg: " + msg);
        printer.accept("Hello Lambda");
    }
}
// Output:
// Is 4 even? true
// Length of 'Java': 4
// Msg: Hello Lambda`
    },
    {
      title: 'Variable Capture',
      icon: <FiZap className="w-6 h-6" />,
      content: '<p class="text-gray-300">Lambdas can access local variables from the enclosure, but those variables must be <b>Effectively Final</b> (never changed after initialization).</p>',
      code: `int factor = 10;
// factor = 20; // Uncommenting this breaks logic below

Function<Integer, Integer> multiplier = n -> n * factor; 
// If 'factor' changes, the lambda assumes inconsistent state.
// Compiler Error: "Local variable defined in an enclosing scope must be final or effectively final"`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Custom Functional Interface',
      solution: 'Create a math operation generic interface.',
      steps: [
        {
          step: '1. Define Interface',
          explanation: 'Use `@FunctionalInterface` annotation (optional but recommended) and one abstract method.'
        }
      ],
      code: `@FunctionalInterface
interface MathOp {
    int operate(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        // Lambda for addition
        MathOp add = (a, b) -> a + b;
        
        System.out.println(add.operate(5, 3)); // Output: 8
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Can a Lambda interface have default methods?',
      solution: 'Yes! A functional interface must have exactly one ABSTRACT method. It can have any number of default or static methods (like `and()`, `or()` in Predicate).',
      solutionCode: `@FunctionalInterface
interface Test {
    void doIt(); // The one abstract method
    default void help() { System.out.println("Help"); }
}`
    },
    {
      question: 'What is the type of a Method Reference?',
      solution: 'It matches the Functional Interface it implements.',
      solutionCode: `Consumer<String> printer = System.out::println;
// Equivalent to:
// Consumer<String> printer = s -> System.out.println(s);`
    }
  ] as PracticeQuestion[]
}

export default function LambdaExpressionsPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
