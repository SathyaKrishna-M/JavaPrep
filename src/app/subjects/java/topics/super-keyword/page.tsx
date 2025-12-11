'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiArrowUp, FiCornerLeftUp, FiUsers } from 'react-icons/fi'

const content = {
    title: 'Super Keyword',
    explanationSections: [
        {
            title: 'Introduction: Call Your Parents',
            icon: <FiArrowUp className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        The <span className="text-blue-400 font-semibold">super</span> keyword is used to access the immediate parent class.
                        Think of it as <span className="text-cyan-400 font-bold">Calling Your Parents</span> for help.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">super.variable:</span> "Mom, I need *your* car key, not mine." (Access parent's field).
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">super.method():</span> "Dad, how do you fix this?" (Call parent's method).
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">super():</span> "Parents, initialize me." (Call parent constructor).
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Common Uses',
            icon: <FiCornerLeftUp className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The <code>super</code> keyword solves ambiguity and initialization issues.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-green-400 font-mono mb-2">Accessing Hidden Fields</h5>
                            <p className="text-xs text-gray-400 mb-2">If Child and Parent have same variable name.</p>
                            <pre className="text-xs bg-gray-900 p-2 rounded text-gray-300">
                                {`class Parent { int x = 10; }
class Child extends Parent { 
    int x = 20; 
    void print() {
        System.out.println(super.x); // 10
    }
}`}
                            </pre>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-blue-400 font-mono mb-2">Parent Constructor</h5>
                            <p className="text-xs text-gray-400 mb-2">Must be the <strong>first line</strong> in child constructor.</p>
                            <pre className="text-xs bg-gray-900 p-2 rounded text-gray-300">
                                {`class Child extends Parent {
    Child() {
        super(); // Calls Parent()
        System.out.println("Child created");
    }
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            ),
            code: `class Animal {
    Animal() { System.out.println("Animal created"); }
    void eat() { System.out.println("Eating..."); }
}

class Dog extends Animal {
    Dog() {
        super(); // 1. Calls Animal constructor
        System.out.println("Dog created");
    }
    
    void eat() {
        super.eat(); // 2. Calls Animal's eat()
        System.out.println("Eating bread...");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat();
    }
}`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Constructor Chaining',
            solution: 'Initialize Parent variables before Child variables.',
            steps: [
                {
                    step: '1. Parent Class',
                    explanation: '`Person` class expects `name`.'
                },
                {
                    step: '2. Child Class',
                    explanation: '`Student` class expects `name` AND `rollNo`. It passes `name` to `super(name)`.'
                }
            ],
            code: `class Person {
    String name;
    Person(String n) { this.name = n; }
}

class Student extends Person {
    int rollNo;
    
    Student(String n, int r) {
        super(n); // Pass name to Parent
        this.rollNo = r;
    }
    
    void display() {
        System.out.println(name + " : " + rollNo);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Alice", 101);
        s.display();
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Can you use "super" in a static method?',
            solution: 'No. "super" refers to the parent object instance. Static methods belong to the class, not an instance.',
            solutionCode: `class Parent { 
    int x = 10; 
}
class Child extends Parent {
    static void test() {
        // System.out.println(super.x); // ERROR!
        // Cannot use super in static context
    }
}`
        },
        {
            question: 'What happens if you don\'t write super() in a constructor?',
            solution: 'Java compiler automatically inserts "super()" (no-args) as the first line. If Parent doesn\'t have a no-args constructor, you get a compile error.',
            solutionCode: `class A {
    A() { System.out.println("A created"); }
}

class B extends A {
    B() {
        // super(); is effectively here
        System.out.println("B created");
    }
}`
        }
    ] as PracticeQuestion[]
}

export default function SuperKeywordPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
