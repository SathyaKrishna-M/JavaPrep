'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DMTopicPage'
import { FiList } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Important Questions (CO4)',
    explanationSections: [
        {
            title: 'CO4 Important Practice Questions',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        This section contains a curated list of <span className="text-blue-400 font-semibold">12 Important Questions</span> covering <span className="text-yellow-400">CO4</span> (OOP Foundations & Modularization).
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Classes & Objects (Creation, Usage)</li>
                            <li>Constructors & Types (Default, Parameterized, Overloading)</li>
                            <li>Methods & Encapsulation (Access Modifiers, Getters/Setters)</li>
                            <li>Static Members & &apos;this&apos; keyword</li>
                        </ul>
                    </div>
                </div>
            ),
        }
    ] as ExplanationSection[],
    practiceQuestions: [
        {
            question: '1. Develop a Java Program to define a Class and create an Object',
            solution: (
                <div className="space-y-4">
                    <div className="text-gray-300">
                        <p>A class is a blueprint for creating objects. An object is an instance of a class.</p>
                    </div>
                    <CodeBlock code={`class Student {
    String name;
    int id;

    // Method to display details
    void display() {
        System.out.println("Name: " + name);
        System.out.println("ID: " + id);
    }
}

public class ClassObjectDemo {
    public static void main(String[] args) {
        // Creating an object of Student class
        Student s1 = new Student();
        
        // Initializing fields
        s1.name = "John";
        s1.id = 101;
        
        // Calling method
        s1.display();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Name: John<br />
                            ID: 101
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '2. Develop a Java Program to demonstrate Default and Parameterized Constructors',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`class Employee {
    int id;
    String name;

    // Default Constructor
    Employee() {
        System.out.println("Default Constructor called");
        id = 0;
        name = "Unknown";
    }

    // Parameterized Constructor
    Employee(int i, String n) {
        System.out.println("Parameterized Constructor called");
        id = i;
        name = n;
    }

    void show() {
        System.out.println(id + " " + name);
    }
}

public class ConstructorDemo {
    public static void main(String[] args) {
        Employee e1 = new Employee(); // Calls Default
        e1.show();

        Employee e2 = new Employee(101, "Alice"); // Calls Parameterized
        e2.show();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Default Constructor called<br />
                            0 Unknown<br />
                            Parameterized Constructor called<br />
                            101 Alice
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '3. Develop a Java Program to demonstrate Constructor Overloading',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300 text-sm">Constructor overloading allows a class to have more than one constructor with different parameter lists.</p>
                    <CodeBlock code={`class Box {
    double width, height, depth;

    // Constructor with no dimensions
    Box() {
        width = height = depth = -1;
    }

    // Constructor with cube dimension
    Box(double len) {
        width = height = depth = len;
    }

    // Constructor with all dimensions
    Box(double w, double h, double d) {
        width = w;
        height = h;
        depth = d;
    }

    double volume() {
        return width * height * depth;
    }
}

public class OverloadConst {
    public static void main(String[] args) {
        Box b1 = new Box();
        Box b2 = new Box(10);
        Box b3 = new Box(10, 20, 30);

        System.out.println("Volume b1: " + b1.volume());
        System.out.println("Volume b2: " + b2.volume());
        System.out.println("Volume b3: " + b3.volume());
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Volume b1: -1.0<br />
                            Volume b2: 1000.0<br />
                            Volume b3: 6000.0
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '4. Explain \'this\' keyword with a Java Program',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300 text-sm">The <code>this</code> keyword refers to the current class instance variable. It is used to resolve name conflicts between instance variables and parameters.</p>
                    <CodeBlock code={`class Student {
    int rollno;
    String name;

    Student(int rollno, String name) {
        // this.rollno refers to instance variable
        // rollno refers to parameter
        this.rollno = rollno;
        this.name = name;
    }

    void display() {
        System.out.println(rollno + " " + name);
    }
}

public class ThisDemo {
    public static void main(String[] args) {
        Student s1 = new Student(111, "Ankit");
        Student s2 = new Student(112, "Sumit");
        s1.display();
        s2.display();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            111 Ankit<br />
                            112 Sumit
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '5. Develop a Java Program to implement Method Overloading',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300 text-sm">Method Overloading allows multiple methods with the same name but different parameters (number or type) in the same class.</p>
                    <CodeBlock code={`class Calculator {
    // 2 integer parameters
    int add(int a, int b) {
        return a + b;
    }

    // 3 integer parameters
    int add(int a, int b, int c) {
        return a + b + c;
    }

    // 2 double parameters
    double add(double a, double b) {
        return a + b;
    }
}

public class OverloadingDemo {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Sum (10, 20): " + calc.add(10, 20));
        System.out.println("Sum (10, 20, 30): " + calc.add(10, 20, 30));
        System.out.println("Sum (10.5, 20.5): " + calc.add(10.5, 20.5));
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Sum (10, 20): 30<br />
                            Sum (10, 20, 30): 60<br />
                            Sum (10.5, 20.5): 31.0
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '6. Explain Static variables and Static methods with example',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300 text-sm"><strong>Static Variable:</strong> Shared among all objects of the class. Memory allocated once.<br /><strong>Static Method:</strong> Can be called without creating an object. Can only access static data members.</p>
                    <CodeBlock code={`class Counter {
    static int count = 0; // Static variable
    
    Counter() {
        count++; // Increments shared variable
    }
    
    // Static method
    static void displayCount() {
        System.out.println("Total Objects: " + count);
    }
}

public class StaticDemo {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();
        
        // Calling static method via Class name
        Counter.displayCount();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Total Objects: 3
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '7. Develop a Java Program to demonstrate Encapsulation (Getters & Setters)',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300 text-sm">Encapsulation wraps data (variables) and code (methods) together. We make variables <code>private</code> and provide <code>public</code> getters and setters.</p>
                    <CodeBlock code={`class Account {
    private long acc_no;
    private String name;
    private float amount;

    public long getAcc_no() { return acc_no; }
    public void setAcc_no(long acc_no) { this.acc_no = acc_no; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public float getAmount() { return amount; }
    public void setAmount(float amount) { this.amount = amount; }
}

public class EncapDemo {
    public static void main(String[] args) {
        Account acc = new Account();
        acc.setAcc_no(7560504000L);
        acc.setName("Sonoo Jaiswal");
        acc.setAmount(500000f);
        
        System.out.println(acc.getName() + " " + acc.getAmount());
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Sonoo Jaiswal 500000.0
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '8. Explain different Access Modifiers in Java',
            solution: (
                <div className="space-y-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300 border-collapse border border-gray-700">
                            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                                <tr>
                                    <th className="px-4 py-2 border border-gray-700">Modifier</th>
                                    <th className="px-4 py-2 border border-gray-700">Class</th>
                                    <th className="px-4 py-2 border border-gray-700">Package</th>
                                    <th className="px-4 py-2 border border-gray-700">Subclass</th>
                                    <th className="px-4 py-2 border border-gray-700">World</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-4 py-2 border-r border-gray-700 font-mono text-blue-400">public</td>
                                    <td className="px-4 py-2 border-r border-gray-700">Yes</td>
                                    <td className="px-4 py-2 border-r border-gray-700">Yes</td>
                                    <td className="px-4 py-2 border-r border-gray-700">Yes</td>
                                    <td className="px-4 py-2">Yes</td>
                                </tr>
                                <tr className="bg-gray-800 border-b border-gray-700">
                                    <td className="px-4 py-2 border-r border-gray-700 font-mono text-blue-400">protected</td>
                                    <td className="px-4 py-2 border-r border-gray-700">Yes</td>
                                    <td className="px-4 py-2 border-r border-gray-700">Yes</td>
                                    <td className="px-4 py-2 border-r border-gray-700">Yes</td>
                                    <td className="px-4 py-2">No</td>
                                </tr>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-4 py-2 border-r border-gray-700 font-mono text-blue-400">default</td>
                                    <td className="px-4 py-2 border-r border-gray-700">Yes</td>
                                    <td className="px-4 py-2 border-r border-gray-700">Yes</td>
                                    <td className="px-4 py-2 border-r border-gray-700">No</td>
                                    <td className="px-4 py-2">No</td>
                                </tr>
                                <tr className="bg-gray-800">
                                    <td className="px-4 py-2 border-r border-gray-700 font-mono text-blue-400">private</td>
                                    <td className="px-4 py-2 border-r border-gray-700">Yes</td>
                                    <td className="px-4 py-2 border-r border-gray-700">No</td>
                                    <td className="px-4 py-2 border-r border-gray-700">No</td>
                                    <td className="px-4 py-2">No</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        },
        {
            question: '9. Develop a Java Program to pass an Object as a parameter',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`class Printer {
    String msg;

    Printer(String msg) {
        this.msg = msg;
    }

    // Method accepting object as parameter
    void display(Printer p) {
        System.out.println("Processing: " + p.msg);
    }
}

public class ObjPassDemo {
    public static void main(String[] args) {
        Printer p1 = new Printer("Document 1");
        Printer p2 = new Printer("Document 2");
        
        p1.display(p2); // Passing p2 object
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Processing: Document 2
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '10. Differentiate between Static and Non-Static members',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <strong>Static members:</strong> Belong to the class. Loaded once when class is loaded. Accessible via Class Name. Shared by all instances.<br />
                        <strong>Non-Static members:</strong> Belong to the object. Created each time an object is made. Accessible via Object reference. Unique to each instance.
                    </p>
                    <CodeBlock code={`class Demo {
    static int x = 10; // Static
    int y = 20;        // Non-Static
}

public class DiffDemo {
    public static void main(String[] args) {
        Demo d1 = new Demo();
        d1.x = 888;
        d1.y = 999;
        
        Demo d2 = new Demo();
        // x is shared, so change is reflected. y is independent.
        System.out.println("d2.x: " + d2.x + " (Shared)"); 
        System.out.println("d2.y: " + d2.y + " (Independent)");
    }
}`} />
                </div>
            ),
        },
        {
            question: '11. Develop a Java Program to return an Object from a method',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`class Test {
    int a;
    Test(int a) { this.a = a; }

    Test incrByTen() {
        // Create new object and return it
        Test temp = new Test(a + 10);
        return temp;
    }
}

public class RetObjDemo {
    public static void main(String[] args) {
        Test t1 = new Test(5);
        System.out.println("Original: " + t1.a);
        
        Test t2 = t1.incrByTen();
        System.out.println("New Object: " + t2.a);
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Original: 5<br />
                            New Object: 15
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '12. Explain the purpose of Garbage Collection in Java',
            solution: (
                <div className="space-y-4 text-gray-300">
                    <p>
                        <strong>Garbage Collection (GC)</strong> is the process of automatically reclaiming runtime memory by destroying unused objects.
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>It makes Java memory-efficient because the programmer does not need to explicitly delete objects.</li>
                        <li>It is performed by the <strong>JVM (Java Virtual Machine)</strong>.</li>
                        <li>Objects become eligible for GC if they are unreachable (e.g., reference set to <code>null</code>, reference out of scope).</li>
                        <li>The method <code>finalize()</code> is called by GC before destroying the object (though deprecated in newer versions).</li>
                        <li>We can request GC using <code>System.gc()</code>, but execution is not guaranteed immediately.</li>
                    </ul>
                </div>
            ),
        },
    ] as PracticeQuestion[]
}

export default function Page() {
    return <DMTopicPage content={content} subjectName="Java" subjectHref="/subjects/java" />
}
