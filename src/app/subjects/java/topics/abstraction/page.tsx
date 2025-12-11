'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiLayout, FiLayers, FiCpu, FiBox } from 'react-icons/fi'

const content = {
    title: 'Abstraction',
    explanationSections: [
        {
            title: 'Introduction: The Car Dashboard',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Abstraction</span> means hiding the complex details and exposing only the essential features.
                        Think of a <span className="text-cyan-400 font-bold">Car Dashboard</span>.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">What You See:</span> Steering wheel, pedals, speedometer. You know <em>what</em> they do.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">What is Hidden:</span> Engine combustion, gear mechanisms, fuel injection. You don&apos;t need to know <em>how</em> they work to drive.
                            </li>
                            <li>
                                <span className="text-blue-400 font-semibold">Concept:</span> Abstraction focuses on the <strong>&quot;What&quot;</strong> rather than the <strong>&quot;How&quot;</strong>.
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Ways to Achieve Abstraction',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        In Java, we achieve abstraction using <strong>Abstract Classes</strong> and <strong>Interfaces</strong>.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-purple-400 font-mono mb-2">Abstract Class (0-100%)</h5>
                            <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                                <li>Can have abstract & concrete methods.</li>
                                <li>Use <code className="text-purple-300">extends</code>.</li>
                                <li>&quot;is-a&quot; relationship (Car is a Vehicle).</li>
                            </ul>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-orange-400 font-mono mb-2">Interface (100%)</h5>
                            <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                                <li>Only abstract methods (mostly).</li>
                                <li>Use <code className="text-orange-300">implements</code>.</li>
                                <li>&quot;can-do&quot; relationship (Car can-do Fly... wait no).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
            code: `// Abstract Class
abstract class Vehicle {
    abstract void start(); // No body (Abstract)
    
    void stop() { // Concrete method
        System.out.println("Vehicle stopped."); 
    }
}

class Car extends Vehicle {
    void start() {
        System.out.println("Car starts with Button.");
    }
}`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Payment System using Interface',
            solution: 'Define a Payment interface with pay() method. Implement it in CreditCard and PayPal classes.',
            steps: [
                {
                    step: '1. Create Interface',
                    explanation: 'Define the contract. Every payment method MUST have a pay() function.'
                },
                {
                    step: '2. Implement Classes',
                    explanation: 'Provide specific logic for each payment type (e.g. Card validation vs. PayPal login).'
                }
            ],
            code: `interface Payment {
    void pay(double amount);
}

class CreditCard implements Payment {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " using Card.");
    }
}

class PayPal implements Payment {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " via PayPal.");
    }
}

public class Main {
    public static void main(String[] args) {
        Payment p = new CreditCard(); 
        p.pay(100); // We don't care HOW it pays, just that it pays.
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Create an abstract class "Animal" with an abstract method "sound()". Implement "Dog" and "Cat".',
            solution: 'Dog prints "Bark", Cat prints "Meow".',
            solutionCode: `abstract class Animal {
    abstract void sound();
}

class Dog extends Animal {
    void sound() {
        System.out.println("Bark");
    }
}

class Cat extends Animal {
    void sound() {
        System.out.println("Meow");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound();
    }
}`
        },
        {
            question: 'Design a "Shape" interface with "area()" method. Implement for Circle and Rectangle.',
            solution: 'Circle uses PI*r*r, Rectangle uses w*h.',
            solutionCode: `interface Shape {
    double area();
}

class Circle implements Shape {
    double r;
    Circle(double r) { this.r = r; }
    public double area() { return 3.14 * r * r; }
}

class Rectangle implements Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    public double area() { return w * h; }
}`
        }
    ] as PracticeQuestion[]
}

export default function AbstractionPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
