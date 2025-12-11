'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiCode, FiRepeat, FiLayers, FiSettings, FiUser } from 'react-icons/fi'

const content = {
    title: 'Methods',
    explanationSections: [
        {
            title: 'Introduction: The Worker Bot',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Methods</span> are blocks of code that perform a specific task.
                        Think of a method as a <span className="text-cyan-400 font-bold">Worker Bot</span>.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">Inputs (Parameters):</span> You give it raw materials (data).
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Processing (Body):</span> It does the work (calculation, printing, etc.).
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Output (Return Value):</span> It hands you back the finished product (result).
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Anatomy of a Method',
            icon: <FiSettings className="w-6 h-6" />,
            content: `A method definition tells the bot <span class="text-blue-400 font-semibold">what to do</span> and <span class="text-blue-400 font-semibold">how to do it</span>.

Syntax:
\`accessModifier returnType methodName(parameterList) { ... }\`

Breakdown:
→ <span class="text-cyan-300">void:</span> Returns nothing (just does work).
→ <span class="text-cyan-300">int/String/etc.:</span> Returns a specific value.
→ <span class="text-cyan-300">Parameters:</span> Variables you pass IN.`,
            code: `public class Calculator {
    
    // Method Definition
    // Returns int, takes two ints
    public int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        // Method Call
        int sum = calc.add(5, 10);
        System.out.println("Sum: " + sum);
    }
}`
        },
        {
            title: 'Static vs Instance Methods',
            icon: <FiLayers className="w-6 h-6" />,
            content: `There are two types of bots:

1. <span class="text-blue-400 font-semibold">Static Methods (Shared Bots):</span>
   - Belong to the Class itself.
   - <span class="text-amber-300">No object required</span> to call them.
   - Example: \`Math.sqrt()\`, \`main()\`.

2. <span class="text-blue-400 font-semibold">Instance Methods (Private Bots):</span>
   - Belong to a specific Object.
   - <span class="text-amber-300">Must create an object</span> (new) to call them.
   - Can access the object's private data (fields).`,
            code: `public class Example {
    static void sayHello() {
        System.out.println("Hello from Static!");
    }
    
    void sayHi() {
        System.out.println("Hi from Instance!");
    }
    
    public static void main(String[] args) {
        Example.sayHello(); // Works directly
        
        // Example.sayHi(); // ERROR! Need object
        
        Example obj = new Example();
        obj.sayHi(); // Works now
    }
}`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Calculator Bot',
            solution: 'Create methods for add, subtract, multiply, and divide.',
            steps: [
                {
                    step: '1. Define Methods',
                    explanation: 'Create 4 methods. Handle division carefully (return double).'
                },
                {
                    step: '2. Call Methods',
                    explanation: 'Invoke them from main with test values.'
                }
            ],
            code: `public class Calculator {
    public int add(int a, int b) { return a + b; }
    public int sub(int a, int b) { return a - b; }
    
    public static void main(String[] args) {
        Calculator c = new Calculator();
        System.out.println("Add: " + c.add(10, 5));
        System.out.println("Sub: " + c.sub(10, 5));
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Create a method "isEven" that returns true if a number is even, else false.',
            solution: 'Return boolean. Check modulus 2.',
            solutionCode: `public class CheckEven {
    public boolean isEven(int n) {
        return n % 2 == 0;
    }
    
    public static void main(String[] args) {
        CheckEven obj = new CheckEven();
        System.out.println(obj.isEven(4)); // true
        System.out.println(obj.isEven(7)); // false
    }
}`
        },
        {
            question: 'Create a method "getGrade" that takes marks (int) and returns grade (String). \n >=90: A, >=80: B, else C.',
            solution: 'Use if-else ladder inside the method and return the string literal.',
            solutionCode: `public class Grader {
    public String getGrade(int marks) {
        if (marks >= 90) return "A";
        else if (marks >= 80) return "B";
        else return "C";
    }
    
    public static void main(String[] args) {
        Grader g = new Grader();
        System.out.println(g.getGrade(85));
    }
}`
        },
        {
            question: 'Create a Student class with `acceptData` and `printData`.',
            solution: 'Use Scanner in `acceptData` to fill instance variables. Use System.out in `printData` to show them.',
            solutionCode: `import java.util.Scanner;
class Student {
    String name;
    int id;

    void acceptData() {
        Scanner sc = new Scanner(System.in);
        // In real app, be careful with Scanner resource
        System.out.print("Name: ");
        name = sc.next();
        System.out.print("ID: ");
        id = sc.nextInt();
    }

    void printData() {
        System.out.println(name + " (" + id + ")");
    }
}`
        }
    ] as PracticeQuestion[],
    dryRunCode: `public class ScopeDemo {
    public static void update(int x) {
        x = 100; // Changes copy only
    }
    public static void main(String[] args) {
        int a = 10;
        update(a);
        System.out.println(a);
    }
}`,
    dryRunSteps: [
        { line: 6, vars: { a: 10 }, output: '', description: 'Main: a is set to 10.' },
        { line: 7, vars: { a: 10, x: 10 }, output: '', description: 'Call update(10). x gets a COPY of 10.' },
        { line: 2, vars: { x: 10 }, output: '', description: 'Inside Method: x is 10.' },
        { line: 3, vars: { x: 100 }, output: '', description: 'Inside Method: x changed to 100. a is untouched.' },
        { line: 4, vars: {}, output: '', description: 'Method ends. x is destroyed.' },
        { line: 8, vars: { a: 10 }, output: '10\\n', description: 'Main: Print a. It is still 10.' },
    ] as DryRunStep[]
}

export default function MethodsPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
