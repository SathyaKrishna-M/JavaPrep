'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiCast, FiCpu, FiRepeat, FiShuffle } from 'react-icons/fi'

const content = {
    title: 'Polymorphism',
    explanationSections: [
        {
            title: 'Introduction: The Universal Remote',
            icon: <FiCast className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Polymorphism</span> means "Many Forms".
                        Think of a <span className="text-cyan-400 font-bold">Universal Remote Control</span>.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">One Interface:</span> The remote has a "Power" button.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Many Forms:</span>
                                <ul className="pl-6 list-white mt-1 space-y-1">
                                    <li>If pointed at TV, it turns on TV.</li>
                                    <li>If pointed at AC, it turns on AC.</li>
                                </ul>
                            </li>
                            <li>
                                <span className="text-blue-400 font-semibold">Concept:</span> The Action (Power On) is the same, but the Result depends on the Object (TV vs AC).
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Two Types of Polymorphism',
            icon: <FiShuffle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-purple-400 font-mono mb-2">Compile-Time (Static)</h5>
                            <p className="text-xs text-gray-400 mb-2">Method Overloading</p>
                            <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                                <li>Same method name.</li>
                                <li>Different parameters.</li>
                                <li>Example: <code>add(2, 3)</code> vs <code>add(2.5, 3.5)</code></li>
                            </ul>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-orange-400 font-mono mb-2">Run-Time (Dynamic)</h5>
                            <p className="text-xs text-gray-400 mb-2">Method Overriding</p>
                            <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                                <li>Same method signature.</li>
                                <li>Parent reference, Child object.</li>
                                <li>Example: <code>Animal a = new Dog(); a.sound();</code></li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
            code: `// 1. Compile-Time (Overloading)
class MathHelper {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}

// 2. Run-Time (Overriding)
class Animal {
    void sound() { System.out.println("Unknown Sound"); }
}
class Dog extends Animal {
    void sound() { System.out.println("Bark"); }
}

public class Main {
    public static void main(String[] args) {
        // Compile-Time: Compiler decides based on args
        MathHelper m = new MathHelper();
        m.add(2, 3); 
        
        // Run-Time: JVM decides based on Object type
        Animal myDog = new Dog(); // Upcasting
        myDog.sound(); // Prints "Bark"
    }
}`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Payment Gateway Integration',
            solution: 'Process payments for CreditCard and UPI using a common method.',
            steps: [
                {
                    step: '1. Common Parent',
                    explanation: 'Create parent class `Payment` with method `process()`.'
                },
                {
                    step: '2. Child Implementations',
                    explanation: 'Override `process()` in `CreditCard` and `UPI`.'
                },
                {
                    step: '3. Polymorphic Call',
                    explanation: 'Pass different objects to a function expecting `Payment`.'
                }
            ],
            code: `class Payment {
    void process() { System.out.println("Processing..."); }
}

class CreditCard extends Payment {
    void process() { System.out.println("Validating Card Number..."); }
}

class UPI extends Payment {
    void process() { System.out.println("Verifying VPA..."); }
}

public class Shop {
    // This method works for ANY Payment type!
    static void checkout(Payment p) {
        p.process(); 
    }

    public static void main(String[] args) {
        checkout(new CreditCard());
        checkout(new UPI());
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'What is Upcasting? Give an example.',
            solution: 'Treating a Child object as a Parent reference. Useful for writing generic code.',
            solutionCode: `class Animal {}
class Cat extends Animal {}

public class Main {
    public static void main(String[] args) {
        Animal a = new Cat(); // Upcasting
        // We can treat 'a' as just an Animal, 
        // effectively ignoring Cat-specific methods unless overridden.
    }
}`
        },
        {
            question: 'Can you override static methods?',
            solution: 'No. Static methods belong to the Class, not the Object. If you redefine a static method in a child, it is called "Method Hiding", not overriding.',
            solutionCode: `class Parent {
    static void show() { System.out.println("Parent"); }
}
class Child extends Parent {
    static void show() { System.out.println("Child"); }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show(); // Prints "Parent" because it's static (Class binding)
    }
}`
        }
    ] as PracticeQuestion[]
}

export default function PolymorphismPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
