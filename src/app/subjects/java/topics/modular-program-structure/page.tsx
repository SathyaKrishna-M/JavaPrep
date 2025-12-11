'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiLayers, FiPackage, FiFolder, FiGrid } from 'react-icons/fi'

const content = {
    title: 'Modular Program Structure',
    explanationSections: [
        {
            title: 'Introduction: Organizing a Library',
            icon: <FiPackage className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Modular Programming</span> is like organizing a massive library.
                        You don't pile all books in one room. You split them into <strong>Sections</strong> (Packages).
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">Packages:</span> Like "Science", "Fiction", "History". In Java, these are folders grouping related classes.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Classes:</span> The Books themselves.
                            </li>
                            <li>
                                <span className="text-blue-400 font-semibold">Access:</span> Some sections are "Staff Only" (private/default), others are "Public".
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Key Components',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A modular Java program consists of:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-cyan-400 font-semibold mb-2">Packages</h5>
                            <p className="text-xs text-gray-400">namespaces that organize a set of related classes and interfaces.</p>
                            <code className="text-xs text-blue-300 mt-2 block">package com.app.utils;</code>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-green-400 font-semibold mb-2">Imports</h5>
                            <p className="text-xs text-gray-400">Using classes from other packages.</p>
                            <code className="text-xs text-green-300 mt-2 block">import java.util.Scanner;</code>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-pink-400 font-semibold mb-2">Access Control</h5>
                            <p className="text-xs text-gray-400">Defining visibility limits.</p>
                            <code className="text-xs text-pink-300 mt-2 block">public, private, protected</code>
                        </div>
                    </div>
                </div>
            ),
            code: `package com.library.books;

public class Book {
    public String title;
    
    public void read() {
        System.out.println("Reading " + title);
    }
}

// In another file:
// import com.library.books.Book;`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Separate Logic and Display',
            solution: 'Create a MathUtils class (Logic) and a Main class (Display).',
            steps: [
                {
                    step: '1. Logic Module',
                    explanation: 'Create a class solely for calculations. It should not print anything.'
                },
                {
                    step: '2. Display Module',
                    explanation: 'Create a class to handle user input and showing results.'
                }
            ],
            code: `// File: MathUtils.java
class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }
}

// File: Main.java
public class Main {
    public static void main(String[] args) {
        int result = MathUtils.add(10, 20);
        System.out.println("Result: " + result);
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Create a package "shapes" with a Circle class. Use it in a "main" package.',
            solution: 'Define package shapes; at top of Circle. Import shapes.Circle in Main.',
            solutionCode: `// shapes/Circle.java
package shapes;

public class Circle {
    public void draw() {
        System.out.println("Drawing Circle");
    }
}

// main/Main.java
package main;
import shapes.Circle;

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle();
        c.draw();
    }
}`
        }
    ] as PracticeQuestion[]
}

export default function ModularProgramStructurePage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
