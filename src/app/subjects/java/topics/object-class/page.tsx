'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiMinimize, FiHash, FiCopy, FiInfo } from 'react-icons/fi'

const content = {
    title: 'Object Class',
    explanationSections: [
        {
            title: 'Introduction: The Adam & Eve',
            icon: <FiMinimize className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        In Java, <span className="text-blue-400 font-semibold">Object</span> is the root of the class hierarchy.
                        Every class has <code>Object</code> as a superclass. It&apos;s like <span className="text-cyan-400 font-bold">The Original Ancestor</span> from whom everyone descends.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">Universal Methods:</span> Since everyone inherits from Object, everyone gets its methods: <code>toString()</code>, <code>equals()</code>, <code>hashCode()</code>.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Polymorphism Root:</span> You can refer to <em>any</em> Java object as an <code>Object</code>.
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Key Methods',
            icon: <FiInfo className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-green-400 font-mono mb-2">toString()</h5>
                            <p className="text-xs text-gray-400 mb-2">Returns string representation. Default is &quot;ClassName@HexHash&quot;. Override it for readable output!</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-blue-400 font-mono mb-2">equals(Object obj)</h5>
                            <p className="text-xs text-gray-400 mb-2">Checks reference equality (==) by default. Override it to check CONTENT equality (e.g. name vs name).</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-purple-400 font-mono mb-2">hashCode()</h5>
                            <p className="text-xs text-gray-400 mb-2">Returns integer hash. Important for HashMaps. If you override equals, override this too.</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-orange-400 font-mono mb-2">getClass()</h5>
                            <p className="text-xs text-gray-400 mb-2">Returns the runtime class. Used for Reflection.</p>
                        </div>
                    </div>
                </div>
            ),
            code: `class Person {
    String name;
    Person(String n) { name = n; }

    @Override
    public String toString() {
        return "Person: " + name; // Useful output
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person other = (Person) obj;
        return this.name.equals(other.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("Alice");
        Person p2 = new Person("Alice");
        
        System.out.println(p1); // Prints "Person: Alice"
        System.out.println(p1.equals(p2)); // true (after override)
    }
}`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Overriding toString()',
            solution: 'Make your objects print nicely.',
            steps: [
                {
                    step: '1. Default Behavior',
                    explanation: 'Printing an object prints memory address hash.'
                },
                {
                    step: '2. Override',
                    explanation: 'Return a formatted string with field values.'
                }
            ],
            code: `class Student {
    int id;
    String name;
    
    public String toString() {
        return "ID: " + id + ", Name: " + name;
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Why should you override hashCode() when you override equals()?',
            solution: 'Because equal objects MUST have equal hash codes. If they don\'t, HashMaps/Sets will treat them as different keys even if they are "equal".',
            solutionCode: `// Rule:
// if a.equals(b) is true -> a.hashCode() == b.hashCode() must be true`
        },
        {
            question: 'Does Object class have a superclass?',
            solution: 'No. Object is the top-most class. Uniquely, it has no parent.',
            solutionCode: `class Object {
    // No "extends" here
}`
        }
    ] as PracticeQuestion[]
}

export default function ObjectClassPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
