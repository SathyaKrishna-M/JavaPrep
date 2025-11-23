'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiTool, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Constructors & this Keyword',
  explanationSections: [
    {
      title: 'Constructors',
      icon: <FiTool className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Constructor</span> initializes objects when created.

Types:
→ <span class="text-cyan-300">Default:</span> No parameters
→ <span class="text-cyan-300">Parameterized:</span> With parameters
→ <span class="text-cyan-300">Overloaded:</span> Multiple constructors

Key Points:
→ <span class="text-amber-300">Same name as class</span>
→ <span class="text-amber-300">No return type</span>
→ <span class="text-amber-300">Called automatically</span>`,
      code: `public class ConstructorDemo {
    String name;
    int age;
    
    // Default constructor
    public ConstructorDemo() {
        name = "Unknown";
        age = 0;
    }
    
    // Parameterized constructor
    public ConstructorDemo(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
    
    public static void main(String[] args) {
        ConstructorDemo obj1 = new ConstructorDemo();
        ConstructorDemo obj2 = new ConstructorDemo("Alice", 20);
        obj1.display();
        obj2.display();
    }
}`,
    },
    {
      title: 'this Keyword',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">this</span> refers to current object.

Uses:
→ <span class="text-cyan-300">this.variable:</span> Access instance variable
→ <span class="text-cyan-300">this.method():</span> Call instance method
→ <span class="text-cyan-300">this():</span> Call constructor

Purpose:
→ <span class="text-amber-300">Resolve name conflicts</span>
→ <span class="text-amber-300">Refer to current object</span>`,
      code: `public class ThisKeyword {
    String name;
    int age;
    
    public ThisKeyword(String name, int age) {
        this.name = name;  // this.name refers to instance variable
        this.age = age;    // name refers to parameter
    }
    
    public void display() {
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
    }
    
    public static void main(String[] args) {
        ThisKeyword obj = new ThisKeyword("Alice", 20);
        obj.display();
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Create a class with default and parameterized constructors. Use this keyword to initialize instance variables.',
      solution: 'Define multiple constructors and use this to refer to instance variables.',
      solutionCode: `public class ConstructorExample {
    String name;
    int age;
    
    public ConstructorExample() {
        this("Unknown", 0);
    }
    
    public ConstructorExample(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public static void main(String[] args) {
        ConstructorExample obj = new ConstructorExample("John", 25);
    }
}`,
    },
  ],
}

export default function ConstructorsThisPage() {
  return <TopicPage content={content} />
}

