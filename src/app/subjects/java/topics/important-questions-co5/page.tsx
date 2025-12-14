'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DMTopicPage'
import { FiList } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Important Questions (CO5)',
    explanationSections: [
        {
            title: 'CO5 Important Practice Questions',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        This section contains a curated list of <span className="text-blue-400 font-semibold">12 Important Questions</span> covering <span className="text-yellow-400">CO5</span> (Inheritance, Abstract Classes, and Interfaces).
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Basics of Inheritance & Types</li>
                            <li>Abstract Classes & Interfaces</li>
                            <li>Keywords: super, final</li>
                            <li>Polymorphism (Dynamic Method Dispatch)</li>
                        </ul>
                    </div>
                </div>
            ),
        }
    ] as ExplanationSection[],
    practiceQuestions: [
        {
            question: '1. Different types of inheritance',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Java supports the following types of inheritance:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li><strong className="text-purple-400">Single Inheritance:</strong> A sub class inherits from one super class. (A -&gt; B)</li>
                        <li><strong className="text-purple-400">Multilevel Inheritance:</strong> A sub class inherits from a super class, which in turn inherits from another super class. (A -&gt; B -&gt; C)</li>
                        <li><strong className="text-purple-400">Hierarchical Inheritance:</strong> Multiple sub classes inherit from a single super class. (A -&gt; B, A -&gt; C)</li>
                        <li><strong className="text-purple-400">Multiple Inheritance:</strong> Not supported directly in Java through classes (to avoid ambiguity), but achieved via Interfaces. (A, B -&gt; C)</li>
                        <li><strong className="text-purple-400">Hybrid Inheritance:</strong> Combination of two or more types. Supported only through interfaces.</li>
                    </ul>
                    <div className="bg-black/30 p-4 rounded border border-white/10 mt-2">
                        <p className="text-sm font-mono text-gray-400 text-center">
                            [Class A] <br />
                            ↓ <br />
                            [Class B] <br />
                            (Single)
                        </p>
                    </div>
                </div>
            ),
        },
        {
            question: '2. Program to demonstrate abstract class',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`abstract class Shape {
    abstract void draw(); // Abstract method (no body)
    
    void display() { // Concrete method
        System.out.println("This is a shape.");
    }
}

class Circle extends Shape {
    void draw() {
        System.out.println("Drawing Circle...");
    }
}

public class AbstractDemo {
    public static void main(String[] args) {
        Shape s = new Circle(); // Upcasting
        s.draw();
        s.display();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Drawing Circle...<br />
                            This is a shape.
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> <code>Shape</code> is abstract and cannot be instantiated. <code>Circle</code> extends <code>Shape</code> and MUST provide an implementation for the abstract method <code>draw()</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '3. Program to demonstrate interface',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`interface Animal {
    void sound(); // Public and abstract by default
}

interface Pet {
    void play();
}

class Dog implements Animal, Pet { // Multiple inheritance via interfaces
    public void sound() {
        System.out.println("Dog barks");
    }
    public void play() {
        System.out.println("Dog plays fetch");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.sound();
        d.play();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Dog barks<br />
                            Dog plays fetch
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> <code>Dog</code> implements both <code>Animal</code> and <code>Pet</code> interfaces, providing definitions for all methods. Interfaces define a contract that implementing classes must fulfill.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '4. Program to demonstrate single level inheritance',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`class Parent {
    void show() {
        System.out.println("Parent Method");
    }
}

class Child extends Parent { // Single Inheritance
    void display() {
        System.out.println("Child Method");
    }
}

public class SingleInherit {
    public static void main(String[] args) {
        Child c = new Child();
        c.show();    // Inherited
        c.display(); // Own
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Parent Method<br />
                            Child Method
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> <code>Child</code> inherits properties and methods from <code>Parent</code>. Creating an object of <code>Child</code> allows access to both its own members and the parent&apos;s members.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '5. Program to demonstrate multi-level inheritance',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`class GrandParent {
    void msg() {
        System.out.println("Grandparent...");
    }
}

class Parent extends GrandParent {
    void show() {
        System.out.println("Parent...");
    }
}

class Child extends Parent {
    void display() {
        System.out.println("Child...");
    }
}

public class MultiLevelDemo {
    public static void main(String[] args) {
        Child c = new Child();
        c.msg();     // From GrandParent
        c.show();    // From Parent
        c.display(); // Own
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Grandparent...<br />
                            Parent...<br />
                            Child...
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> A chain of inheritance: <code>Child</code> extends <code>Parent</code>, which extends <code>GrandParent</code>. The child class has access to all non-private members up the hierarchy.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '6. Program to demonstrate hierarchical inheritance',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`class Animal {
    void eat() {
        System.out.println("Eating...");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking...");
    }
}

class Cat extends Animal {
    void meow() {
        System.out.println("Meowing...");
    }
}

public class HierarchicalDemo {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat(); // Inherited
        d.bark();

        Cat c = new Cat();
        c.eat(); // Inherited (Shared)
        c.meow();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Eating...<br />
                            Barking...<br />
                            Eating...<br />
                            Meowing...
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Both <code>Dog</code> and <code>Cat</code> extend the same <code>Animal</code> class. They share the common method <code>eat()</code> but have distinct behaviors <code>bark()</code> and <code>meow()</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '7. Differences between abstract class and interface',
            solution: (
                <div className="space-y-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300 border-collapse border border-gray-700">
                            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 border border-gray-700">Property</th>
                                    <th className="px-6 py-3 border border-gray-700">Abstract Class</th>
                                    <th className="px-6 py-3 border border-gray-700">Interface</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Definition</td>
                                    <td className="px-6 py-4 border-r border-gray-700">Can have both abstract and concrete methods.</td>
                                    <td className="px-6 py-4">Only abstract methods (until Java 8). Now supports default/static.</td>
                                </tr>
                                <tr className="bg-gray-800 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Inheritance</td>
                                    <td className="px-6 py-4 border-r border-gray-700">Does NOT support multiple inheritance.</td>
                                    <td className="px-6 py-4">Supports multiple inheritance (impl multiple interfaces).</td>
                                </tr>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Variables</td>
                                    <td className="px-6 py-4 border-r border-gray-700">Can have final, non-final, static, non-static.</td>
                                    <td className="px-6 py-4">Variables are <code>public static final</code> by default.</td>
                                </tr>
                                <tr className="bg-gray-800">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Keyword</td>
                                    <td className="px-6 py-4 border-r border-gray-700"><code>extends</code></td>
                                    <td className="px-6 py-4"><code>implements</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ),
        },
        {
            question: '8. Role of super keyword in inheritance',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The <code>super</code> keyword is a reference variable used to refer to the immediate parent class object. It is used to:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                        <li>Invoke the parent class constructor: <code>super()</code></li>
                        <li>Invoke the parent class method (if overridden): <code>super.method()</code></li>
                        <li>Access hidden parent class instance variables: <code>super.variable</code></li>
                    </ul>
                    <CodeBlock code={`class Parent {
    Parent() { System.out.println("Parent Constructor"); }
    void show() { System.out.println("Parent Show"); }
}

class Child extends Parent {
    Child() {
        super(); // Calls Parent Constructor
        System.out.println("Child Constructor");
    }
    void show() {
        super.show(); // Calls Parent Show
        System.out.println("Child Show");
    }
}

public class SuperDemo {
    public static void main(String[] args) {
        Child c = new Child();
        c.show();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Parent Constructor<br />
                            Child Constructor<br />
                            Parent Show<br />
                            Child Show
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '9. Role of final keyword in inheritance',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The <code>final</code> keyword restricts the user in several ways:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                        <li><strong>Final Variable:</strong> Value cannot be changed (constant).</li>
                        <li><strong>Final Method:</strong> Cannot be overridden by subclasses.</li>
                        <li><strong>Final Class:</strong> Cannot be inherited (extended).</li>
                    </ul>
                    <CodeBlock code={`class Parent {
    final void display() {
        System.out.println("This method cannot be overridden.");
    }
}

class Child extends Parent {
    // void display() { ... } // Compiler Error!
}

public class FinalDemo {
    public static void main(String[] args) {
        new Child().display();
    }
}`} />
                </div>
            ),
        },
        {
            question: '10. Dynamic method dispatch and runtime polymorphism concepts (Late Binding)',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Dynamic Method Dispatch is the mechanism by which a call to an overridden method is resolved at runtime rather than compile-time. This is how Java implements Runtime Polymorphism. A superclass reference refers to a subclass object.
                    </p>
                    <CodeBlock code={`class Bank {
    int getRate() { return 0; }
}
class SBI extends Bank {
    int getRate() { return 8; }
}
class HDFC extends Bank {
    int getRate() { return 9; }
}

public class PolyDemo {
    public static void main(String[] args) {
        Bank b; // Reference of superclass
        
        b = new SBI(); // Object of SBI
        System.out.println("SBI Rate: " + b.getRate()); // Calls SBI's method
        
        b = new HDFC(); // Object of HDFC
        System.out.println("HDFC Rate: " + b.getRate()); // Calls HDFC's method
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            SBI Rate: 8<br />
                            HDFC Rate: 9
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '11. Inheritance basic definitions',
            solution: (
                <div className="space-y-4 text-gray-300">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Class:</strong> A template or blueprint from which objects are created.</li>
                        <li><strong>Sub Class/Child Class:</strong> A class that inherits from another class. It can also add its own fields and methods.</li>
                        <li><strong>Super Class/Parent Class:</strong> The class from being inherited from.</li>
                        <li><strong>Reusability:</strong> Inheritance supports the concept of &quot;reusability&quot;, i.e., when we want to create a new class and there is already a class that includes some of the code that we want, we can derive our new class from the existing class.</li>
                    </ul>
                </div>
            ),
        },
        {
            question: '12. Why java does not support multiple inheritance (optional)',
            solution: (
                <div className="space-y-4 text-gray-300">
                    <p>
                        Java does not support multiple inheritance with classes to avoid the <strong>Diamond Problem</strong>.
                    </p>
                    <p>
                        Imagine class A has a method <code>show()</code>. Classes B and C extend A and override <code>show()</code>. If Class D extends both B and C, and we call <code>d.show()</code>, the compiler would be ambiguous about which version of <code>show()</code> to call (B&apos;s or C&apos;s).
                    </p>
                    <p>
                        However, Java supports multiple inheritance through <strong>Interfaces</strong> because interfaces only declare methods (abstractly) without implementation (prior to Java 8 default methods, and even then, there are rules to resolve conflicts explicitly).
                    </p>
                </div>
            ),
        }
    ] as PracticeQuestion[]
}

export default function Page() {
    return <DMTopicPage content={content} subjectName="Java" subjectHref="/subjects/java" />
}
