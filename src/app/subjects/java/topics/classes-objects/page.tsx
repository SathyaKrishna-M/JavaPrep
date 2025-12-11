'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiBox, FiTarget, FiHome, FiCpu, FiUser } from 'react-icons/fi'

const content = {
  title: 'Classes & Objects',
  explanationSections: [
    {
      title: 'Introduction: Blueprint and House',
      icon: <FiHome className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Classes and Objects</span> are the building blocks of Java.
            Think of it like a <span className="text-cyan-400 font-bold">House Blueprint</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">The Class (Blueprint):</span> It&apos;s just a design on paper. It defines that a house <em>should</em> have walls, windows, and doors. It takes up no space in the real world (memory).
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">The Object (House):</span> It&apos;s the physical construction based on the blueprint. You can build <span className="text-amber-300">multiple houses</span> (objects) from <span className="text-amber-300">one blueprint</span> (class). Each house takes up real space (heap memory).
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Defining a Class',
      icon: <FiBox className="w-6 h-6" />,
      content: `A class is a template that defines the state (fields) and behavior (methods) of an object.

Structure:
→ <span className="text-cyan-300">Fields (Variables):</span> What the object <em>knows</em> (e.g., color, size).
→ <span className="text-cyan-300">Methods:</span> What the object <em>does</em> (e.g., open door, turn on lights).
→ <span className="text-blue-400">Syntax:</span> \`class ClassName { ... }\``,
      code: `public class Car {
    // Fields (State)
    String color;
    String model;
    int speed;
    
    // Method (Behavior)
    public void drive() {
        System.out.println("Vroom! " + model + " is driving.");
    }
}`,
    },
    {
      title: 'Creating Objects (Instantiation)',
      icon: <FiTarget className="w-6 h-6" />,
      content: `Creating an object is called <span className="text-blue-400 font-semibold">Instantiation</span>.

Mechanism:
→ <span className="text-blue-400">new Keyword:</span> Forces Java to allocate memory in the Heap for the object.
→ <span className="text-cyan-300">Reference Variable:</span> Holds the <em>address</em> of the object in memory.
 
<span className="text-amber-300">Syntax:</span> \`ClassName refName = new ClassName();\``,
      code: `public class Main {
    public static void main(String[] args) {
        // 'myCar' is a reference variable
        // 'new Car()' creates the actual object in Heap memory
        Car myCar = new Car();
        
        // Accessing fields and methods using dot (.)
        myCar.model = "Tesla";
        myCar.drive();
    }
}`,
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Student Management System',
      solution: 'Create a Student class to store details and display them.',
      steps: [
        {
          step: '1. Design Class',
          explanation: 'Define fields: name (String), rollNo (int).'
        },
        {
          step: '2. Create Methods',
          explanation: 'Add a method `displayInfo` to print the details.'
        },
        {
          step: '3. Instantiate',
          explanation: 'In the main method, create two distinct student objects and set their data.'
        }
      ],
      code: `public class Student {
    String name;
    int rollNo;
    
    public void displayInfo() {
        System.out.println("Student: " + name + " (Roll: " + rollNo + ")");
    }
    
    public static void main(String[] args) {
        // Object 1
        Student s1 = new Student();
        s1.name = "Alice";
        s1.rollNo = 101;
        
        // Object 2 (Independent copy)
        Student s2 = new Student();
        s2.name = "Bob";
        s2.rollNo = 102;
        
        s1.displayInfo(); // Prints Alice
        s2.displayInfo(); // Prints Bob
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Create a "Book" class with title and author. Create two objects representing different books.',
      solution: 'Define Book class with title/author fields. Instantiate two objects in main.',
      solutionCode: `public class Book {
    String title;
    String author;
    
    public void showBook() {
        System.out.println("'" + title + "' by " + author);
    }
    
    public static void main(String[] args) {
        Book b1 = new Book();
        b1.title = "The Alchemist";
        b1.author = "Paulo Coelho";
        
        Book b2 = new Book();
        b2.title = "1984";
        b2.author = "George Orwell";
        
        b1.showBook();
        b2.showBook();
    }
}`
    },
    {
      question: 'What happens if you use an object reference without creating the object (referencing null)?',
      solution: 'It throws a NullPointerException. The reference points to nothing.',
      solutionCode: `public class NullDemo {
    public static void main(String[] args) {
        String str = null;
        // This causes Runtime Error
        // System.out.println(str.length()); 
        
        if (str != null) {
            System.out.println(str.length());
        } else {
            System.out.println("String is null");
        }
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class Main {
    public static void main(String[] args) {
        Car c1 = new Car();
        c1.speed = 10;
        
        Car c2 = c1; // c2 references the SAME object as c1
        c2.speed = 20;
        
        System.out.println(c1.speed);
    }
}`,
  dryRunSteps: [
    { line: 3, vars: { c1: 'ObjRef@100' }, output: '', description: 'Created Car Object at address 100. c1 points to it.' },
    { line: 4, vars: { 'c1.speed': 10 }, output: '', description: 'Set speed of object at 100 to 10.' },
    { line: 6, vars: { c1: 'ObjRef@100', c2: 'ObjRef@100' }, output: '', description: 'Assigned c1 to c2. Both now point to address 100.' },
    { line: 7, vars: { 'c2.speed': 20, 'c1.speed': 20 }, output: '', description: 'c2 changes speed to 20. Since c1 points to same object, c1.speed is also 20.' },
    { line: 9, vars: { 'c1.speed': 20 }, output: '20\\n', description: 'Printed c1.speed. Reference copy demonstrated.' },
  ] as DryRunStep[]
}

export default function ClassesObjectsPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
