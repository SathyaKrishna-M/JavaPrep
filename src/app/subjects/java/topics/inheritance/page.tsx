'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiGitMerge, FiUsers, FiArrowUp, FiShare2 } from 'react-icons/fi'

const content = {
    title: 'Inheritance',
    explanationSections: [
        {
            title: 'Introduction: The Family Tree (DNA)',
            icon: <FiUsers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Inheritance</span> allows a class to acquire the properties (fields) and methods of another class.
                        Think of it as <span className="text-cyan-400 font-bold">DNA Transfer</span>.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">The Parent (Super Class):</span> You inherit your eye color from your parent. You didn&apos;t &quot;code&quot; that yourself; you got it for free.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">The Child (Sub Class):</span> You have your parent&apos;s features + your own new skills (e.g., coding Java).
                            </li>
                            <li>
                                <span className="text-blue-400 font-semibold">The Goal:</span> <span className="text-green-400">Reusability</span>. Why rewrite common code? Just inherit it!
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Types of Inheritance',
            icon: <FiGitMerge className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Java supports three main types of class inheritance:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-cyan-400 font-semibold mb-2">Single</h5>
                            <p className="text-xs text-gray-400">A → B</p>
                            <p className="text-xs text-gray-400 mt-1">One child extends one parent.</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-green-400 font-semibold mb-2">Multilevel</h5>
                            <p className="text-xs text-gray-400">A → B → C</p>
                            <p className="text-xs text-gray-400 mt-1">Grandparent → Parent → Child.</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-purple-400 font-semibold mb-2">Hierarchical</h5>
                            <p className="text-xs text-gray-400">A → B, A → C</p>
                            <p className="text-xs text-gray-400 mt-1">One parent, many children.</p>
                        </div>
                    </div>
                    <p className="text-red-400 text-xs mt-2">
                        * Note: Java does NOT support Multiple Inheritance (A ← B, C) with classes to avoid ambiguity.
                    </p>
                </div>
            ),
            mermaid: `classDiagram
      class Animal {
          +eat()
          +sleep()
      }
      class Dog {
          +bark()
      }
      class Cat {
          +meow()
      }
      Animal <|-- Dog
      Animal <|-- Cat`,
            code: `class Animal {
    void eat() { System.out.println("Eating..."); }
}

class Dog extends Animal { // 'extends' links them
    void bark() { System.out.println("Barking..."); }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat(); // Inherited from Animal
        d.bark(); // Defines in Dog
    }
}`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Employee Hierarchy',
            solution: 'A system where Manager inherits from Employee but adds a bonus feature.',
            steps: [
                {
                    step: '1. Base Class',
                    explanation: 'Create an `Employee` class with `salary` and `work()`.'
                },
                {
                    step: '2. Sub Class',
                    explanation: 'Create `Manager` that extends `Employee` and adds `bonus`.'
                }
            ],
            code: `class Employee {
    float salary = 40000;
    void work() { System.out.println("Working..."); }
}

class Manager extends Employee {
    float bonus = 10000;
    
    void manage() {
        System.out.println("Managing team...");
    }
}

public class Main {
    public static void main(String[] args) {
        Manager m = new Manager();
        System.out.println("Total Pay: " + (m.salary + m.bonus));
        m.work();   // From Employee
        m.manage(); // From Manager
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Create a multilevel inheritance chain: Shape → Rectangle → Cube.',
            solution: 'Shape has color, Rectangle adds area logic, Cube adds volume logic.',
            solutionCode: `class Shape {
    void display() { System.out.println("I am a shape"); }
}

class Rectangle extends Shape {
    void area() { System.out.println("Area calculation"); }
}

class Cube extends Rectangle {
    void volume() { System.out.println("Volume calculation"); }
}

public class Main {
    public static void main(String[] args) {
        Cube c = new Cube();
        c.display();
        c.area();
        c.volume();
    }
}`
        },
        {
            question: 'Why does Java not support multiple inheritance with classes?',
            solution: 'To prevent the "Diamond Problem" where two parents have the same method, and the compiler doesn\'t know which one to pick.',
            solutionCode: `// This is NOT allowed in Java
/*
class A { void msg() { System.out.println("Hello"); } }
class B { void msg() { System.out.println("Welcome"); } }

class C extends A, B { // Error!
   // Which msg() would be called? A's or B's?
}
*/`
        }
    ] as PracticeQuestion[]
}

export default function InheritancePage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
