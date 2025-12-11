'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiLock, FiAnchor, FiShield } from 'react-icons/fi'

const content = {
    title: 'Final Keyword',
    explanationSections: [
        {
            title: 'Introduction: The Stone Tablet',
            icon: <FiLock className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        The <span className="text-blue-400 font-semibold">final</span> keyword implies restrictions.
                        Think of it as <span className="text-cyan-400 font-bold">Carved in Stone</span>.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">Final Variable:</span> Value cannot be changed (Constant). Like <code>PI = 3.14</code>.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Final Method:</span> Cannot be overridden by child classes. (Parent&apos;s word is law).
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Final Class:</span> Cannot be inherited (Sterile). No children allowed.
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Usage Scenarios',
            icon: <FiShield className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-red-400 font-mono mb-2">final int MAX = 100;</h5>
                            <p className="text-xs text-gray-400">Attempts to `MAX = 101` will cause Compile Error.</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-blue-400 font-mono mb-2">final void run()</h5>
                            <p className="text-xs text-gray-400">Child classes must use this `run()` exactly as is. No modification.</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-purple-400 font-mono mb-2">final class String</h5>
                            <p className="text-xs text-gray-400">You cannot create `class MyString extends String`. It is sealed.</p>
                        </div>
                    </div>
                </div>
            ),
            code: `
// 1. Final Class
final class Immutable {
    void show() { System.out.println("Can't touch this."); }
}
// class Copy extends Immutable {} // ERROR!

class Parent {
    // 2. Final Method
    final void display() {
        System.out.println("Final method.");
    }
}

class Child extends Parent {
    // void display() {} // ERROR! Cannot override.
}

public class Main {
    public static void main(String[] args) {
        // 3. Final Variable
        final int LIMIT = 50;
        // LIMIT = 60; // ERROR!
    }
}`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Creating Constants',
            solution: 'Use static final variables for global constants.',
            steps: [
                {
                    step: '1. Declare',
                    explanation: 'Use `static final` to make it class-level and unchangeable.'
                },
                {
                    step: '2. Naming Convention',
                    explanation: 'Use ALL_CAPS for constants.'
                }
            ],
            code: `class Constants {
    static final double PI = 3.14159;
    static final String APP_NAME = "JavaPrep";
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Constants.PI);
        // Constants.PI = 3.15; // Error
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Can a constructor be final?',
            solution: 'No. Constructors are specialized methods for object creation and are not inherited, so &quot;overriding&quot; doesn&apos;t apply to them anyway.',
            solutionCode: `// ERROR:
/*
class Test {
    final Test() { // Modifier final not allowed here
    }
}
*/`
        },
        {
            question: 'Can we inherit a final method?',
            solution: 'Yes! You can INHERIT it (use it), you just cannot OVERRIDE it (change it).',
            solutionCode: `class A {
    final void msg() { System.out.println("Hello"); }
}

class B extends A {
    // Inherits msg()
}

public class Main {
    public static void main(String[] args) {
        new B().msg(); // Works fine! Prints "Hello"
    }
}`
        }
    ] as PracticeQuestion[]
}

export default function FinalKeywordPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
