'use client'


import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiBox, FiCpu, FiLayers, FiAlertTriangle, FiType, FiTarget } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'Variables and Data Types',
    explanationSections: [
        {
            title: '📦 What is a Variable?',
            icon: <FiBox className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">variable</span> is a container for storing data values. In Java, every variable must have a specified data type, which determines the size and layout of the variable&apos;s memory; the range of values that can be stored within that memory; and the set of operations that can be applied to the variable.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-amber-300 font-semibold mb-2">Syntax:</p>
                        <code className="text-green-300 block bg-black/30 p-2 rounded">
                            dataType variableName = value;
                        </code>
                        <p className="text-gray-400 mt-2 text-sm">Example: <code className="text-cyan-300">int age = 25;</code></p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                        <p className="text-purple-300 font-semibold mb-2">Naming Conventions:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Variables should start with a <strong>lowercase letter</strong> (e.g., <code className="text-sm">myVar</code>).</li>
                            <li>Use <strong>camelCase</strong> for multi-word variables (e.g., <code className="text-sm">firstName</code>).</li>
                            <li>Names cannot contain whitespace or special characters (except <code>_</code> and <code>$</code>).</li>
                            <li>Names are case-sensitive (<code className="text-sm">myVar</code> and <code className="text-sm">myvar</code> are different).</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '🧬 Primitive Data Types',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Java has 8 primitive data types, which are the fundamental building blocks of data manipulation.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="uppercase tracking-wider border-b-2 border-slate-700 bg-slate-800/50">
                                <tr>
                                    <th className="px-4 py-3 text-cyan-400">Type</th>
                                    <th className="px-4 py-3 text-cyan-400">Size</th>
                                    <th className="px-4 py-3 text-cyan-400">Description</th>
                                    <th className="px-4 py-3 text-cyan-400">Example</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                <tr>
                                    <td className="px-4 py-2 font-mono text-pink-400">byte</td>
                                    <td className="px-4 py-2 text-gray-400">1 byte</td>
                                    <td className="px-4 py-2 text-gray-300">Stores whole numbers from -128 to 127</td>
                                    <td className="px-4 py-2 font-mono text-green-300">byte b = 100;</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-pink-400">short</td>
                                    <td className="px-4 py-2 text-gray-400">2 bytes</td>
                                    <td className="px-4 py-2 text-gray-300">Stores whole numbers from -32,768 to 32,767</td>
                                    <td className="px-4 py-2 font-mono text-green-300">short s = 5000;</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-pink-400">int</td>
                                    <td className="px-4 py-2 text-gray-400">4 bytes</td>
                                    <td className="px-4 py-2 text-gray-300">Standard integer type</td>
                                    <td className="px-4 py-2 font-mono text-green-300">int i = 100000;</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-pink-400">long</td>
                                    <td className="px-4 py-2 text-gray-400">8 bytes</td>
                                    <td className="px-4 py-2 text-gray-300">Large integers (suffix &apos;L&apos;)</td>
                                    <td className="px-4 py-2 font-mono text-green-300">long l = 100000L;</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-pink-400">float</td>
                                    <td className="px-4 py-2 text-gray-400">4 bytes</td>
                                    <td className="px-4 py-2 text-gray-300">Decimal numbers (suffix &apos;f&apos;)</td>
                                    <td className="px-4 py-2 font-mono text-green-300">float f = 5.75f;</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-pink-400">double</td>
                                    <td className="px-4 py-2 text-gray-400">8 bytes</td>
                                    <td className="px-4 py-2 text-gray-300">Precise decimal numbers</td>
                                    <td className="px-4 py-2 font-mono text-green-300">double d = 19.99;</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-pink-400">boolean</td>
                                    <td className="px-4 py-2 text-gray-400">1 bit</td>
                                    <td className="px-4 py-2 text-gray-300">True or False</td>
                                    <td className="px-4 py-2 font-mono text-green-300">boolean isJavaFun = true;</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-pink-400">char</td>
                                    <td className="px-4 py-2 text-gray-400">2 bytes</td>
                                    <td className="px-4 py-2 text-gray-300">Single character (ASCII/Unicode)</td>
                                    <td className="px-4 py-2 font-mono text-green-300">char Grade = &apos;A&apos;;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ),
        },
        {
            title: '🔄 Type Casting',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Type casting is when you assign a value of one primitive data type to another type.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                            <p className="text-green-300 font-semibold mb-2">Widening Casting (Automatic):</p>
                            <p className="text-sm text-gray-400 mb-2">Converting a smaller type to a larger type size.</p>
                            <code className="block bg-black/30 p-2 rounded text-sm text-gray-300">
                                byte &#8594; short &#8594; char &#8594; int &#8594; long &#8594; float &#8594; double
                            </code>
                            <div className="mt-2 bg-black/40 p-2 rounded border-l-2 border-green-500">
                                <code className="text-xs text-gray-300">
                                    int myInt = 9;<br />
                                    double myDouble = myInt; // 9.0
                                </code>
                            </div>
                        </div>

                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                            <p className="text-red-300 font-semibold mb-2">Narrowing Casting (Manual):</p>
                            <p className="text-sm text-gray-400 mb-2">Converting a larger type to a smaller size type.</p>
                            <code className="block bg-black/30 p-2 rounded text-sm text-gray-300">
                                double &#8594; float &#8594; long &#8594; int &#8594; char &#8594; short &#8594; byte
                            </code>
                            <div className="mt-2 bg-black/40 p-2 rounded border-l-2 border-red-500">
                                <code className="text-xs text-gray-300">
                                    double myDouble = 9.78;<br />
                                    int myInt = (int) myDouble; // 9
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },

        {
            title: 'Introduction to Variables',
            icon: <FiType className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <span className="text-blue-400 font-semibold">Variables</span> are containers that store data values in memory.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-cyan-300 font-semibold mb-2">Key Concepts:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li><span className="text-cyan-300">Declaration:</span> Creating a variable with a name and type</li>
                            <li><span className="text-cyan-300">Initialization:</span> Assigning a value to a variable</li>
                            <li><span className="text-cyan-300">Assignment:</span> Changing the value of a variable</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: 'Reference Data Types',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <span className="text-blue-400 font-semibold">Reference Data Types</span> store references to objects in memory.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                            <p className="text-purple-300 font-semibold mb-2">Common Types:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                <li><span className="text-cyan-300">String:</span> Sequence of characters</li>
                                <li><span className="text-cyan-300">Arrays:</span> Collection of elements</li>
                                <li><span className="text-cyan-300">Classes:</span> User-defined types</li>
                            </ul>
                        </div>
                        <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                            <p className="text-amber-300 font-semibold mb-2">Key Characteristics:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                <li>Default value: <code className="text-red-300">null</code></li>
                                <li>Stored in: <strong className="text-amber-200">Heap memory</strong></li>
                                <li>Variable holds address, not value</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: 'Declare and initialize variables for storing a student\'s name, age, and marks. Display all values.',
            solution: (
                <div className="space-y-2">
                    <p className="text-gray-300">Use appropriate data types: String for name, int for age, double for marks.</p>
                    <div className="font-mono text-sm bg-black/30 p-2 rounded">
                        String name = &quot;John Doe&quot;;<br />
                        int age = 20;<br />
                        double marks = 85.5;<br />
                    </div>
                </div>
            ),
        },
        {
            question: 'Create variables for different primitive types and display their values.',
            solution: (
                <div className="space-y-2">
                    <p className="text-gray-300">Declare variables of each primitive type: byte, short, int, long, float, double, char, boolean.</p>
                </div>
            ),
        },
        {
            question: 'Create a program that demonstrates variable declaration, initialization, and reassignment.',
            solution: (
                <div className="space-y-2">
                    <p className="text-gray-300">Declare a variable, initialize it, then reassign a new value.</p>
                    <div className="font-mono text-sm bg-black/30 p-2 rounded">
                        int number;<br />
                        number = 10; // Init<br />
                        number = 20; // Reassign
                    </div>
                </div>
            ),
        },
        {
            question: 'Create variables following Java naming conventions: camelCase for variables, UPPER_CASE for constants.',
            solution: (
                <div className="space-y-2">
                    <p className="text-gray-300">Use camelCase for regular variables and UPPER_CASE for constants with final keyword.</p>
                </div>
            ),
        },
        {
            question: 'Create variables for a bank account: account number (int), balance (double), and account holder name (String).',
            solution: (
                <div className="space-y-2">
                    <p className="text-gray-300">Use appropriate data types for each field.</p>
                </div>
            ),
        },
        {
            question: 'Demonstrate the difference between primitive and reference types by creating examples of each.',
            solution: (
                <div className="space-y-2">
                    <p className="text-gray-300">Create primitive variables (int, double, boolean) and reference variables (String, array).</p>
                </div>
            ),
        },
        {
            question: (
                <span>
                    Which of the following variable names is <strong>invalid</strong> in Java?
                </span>
            ),
            solution: (
                <div className="space-y-2">
                    <p className="text-red-400 font-semibold">1stName</p>
                    <p className="text-gray-300">
                        Variable names cannot start with a number. They must start with a letter, underscore (<code>_</code>), or dollar sign (<code>$</code>).
                    </p>
                    <p className="text-gray-400 text-sm">Valid examples: <code>firstName</code>, <code>_name</code>, <code>$salary</code>.</p>
                </div>
            ),
        },
        {
            question: 'What is the output of the following code snippet?',
            formula: 'int x = 10; \ndouble y = x; \nSystem.out.println(y);',
            solution: (
                <div className="space-y-2">
                    <p className="text-green-400 font-semibold font-mono">10.0</p>
                    <p className="text-gray-300">
                        This is an example of <strong>Widening Casting</strong>. The integer value <code>10</code> is automatically converted to the double value <code>10.0</code>.
                    </p>
                </div>
            ),
        },
        {
            question: 'Will this code compile? If not, why?',
            formula: 'double myVal = 10.5; \nint myInt = myVal;',
            solution: (
                <div className="space-y-2">
                    <p className="text-red-400 font-semibold">No, Compilation Error.</p>
                    <p className="text-gray-300">
                        You are trying to assign a <code>double</code> (8 bytes) to an <code>int</code> (4 bytes) directly. This requires <strong>Explicit Narrowing Casting</strong> because data loss might occur (the .5 decimal part).
                    </p>
                    <p className="text-green-300 text-sm">Correction: <code>int myInt = (int) myVal;</code></p>
                </div>
            ),
        },
    ],
    exampleProblems: [
        {
            problem: 'Swap Two Numbers using a Temporary Variable',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The values of <code>a</code> and <code>b</code> are exchanged using <code>temp</code> as a placeholder.
                    </p>
                    <div className="bg-black/40 p-4 rounded-lg font-mono text-sm text-gray-300">
                        Before: a = 5, b = 10 <br />
                        After: a = 10, b = 5
                    </div>
                </div>
            ),
            steps: [
                {
                    step: 'Initialize Variables',
                    explanation: (
                        <div className="font-mono text-sm bg-black/30 p-2 rounded">
                            int a = 5;<br />
                            int b = 10;<br />
                            int temp;
                        </div>
                    )
                },
                {
                    step: 'Store First Value',
                    explanation: (
                        <span>
                            Save the value of <code>a</code> into <code>temp</code>.
                            <br />
                            <code className="text-green-400">temp = a;</code> (temp is now 5)
                        </span>
                    )
                },
                {
                    step: 'Swap First Value',
                    explanation: (
                        <span>
                            Assign the value of <code>b</code> to <code>a</code>.
                            <br />
                            <code className="text-green-400">a = b;</code> (a is now 10)
                        </span>
                    )
                },
                {
                    step: 'Retrieve Saved Value',
                    explanation: (
                        <span>
                            Assign the value of <code>temp</code> to <code>b</code>.
                            <br />
                            <code className="text-green-400">b = temp;</code> (b is now 5)
                        </span>
                    )
                },
            ],
        },
        {
            problem: 'Calculate Area of a Circle',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Calculates area using the formula <MathRenderer math="A = \pi r^2" />.
                    </p>
                </div>
            ),
            steps: [
                {
                    step: 'Define Constants and Variables',
                    explanation: (
                        <div className="font-mono text-sm bg-black/30 p-2 rounded">
                            double radius = 7.5;<br />
                            final double PI = 3.14159;
                        </div>
                    )
                },
                {
                    step: 'Calculate Area',
                    explanation: (
                        <span>
                            <code className="text-green-400">double area = PI * radius * radius;</code>
                        </span>
                    )
                },
                {
                    step: 'Output Result',
                    explanation: (
                        <span>
                            <code className="text-green-400">System.out.println(&quot;Area: &quot; + area);</code>
                            <br />
                            Output: Area: 176.7144375
                        </span>
                    )
                },
            ],
            formula: 'A = \\pi r^2'
        },
    ],
}

export default function VariablesDataTypesPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Java Programming"
            subjectHref="/subjects/java"
        />
    )
}
