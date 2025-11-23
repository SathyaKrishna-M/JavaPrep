'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiBox, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Classes & Objects',
  explanationSections: [
    {
      title: 'Introduction to Classes',
      icon: <FiBox className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Class</span> is a blueprint for creating objects.

Components:
→ <span class="text-cyan-300">Instance variables:</span> Data/attributes
→ <span class="text-cyan-300">Methods:</span> Behavior/actions
→ <span class="text-cyan-300">Constructor:</span> Initialize objects

Syntax:
→ <span class="text-blue-400">class ClassName { ... }</span>`,
      code: `public class Student {
    // Instance variables
    String name;
    int age;
    double marks;
    
    // Constructor
    public Student(String name, int age, double marks) {
        this.name = name;
        this.age = age;
        this.marks = marks;
    }
    
    // Method
    public void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Marks: " + marks);
    }
    
    public static void main(String[] args) {
        // Create object
        Student s1 = new Student("Alice", 20, 85.5);
        s1.display();
    }
}`,
    },
    {
      title: 'Objects',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Object</span> is an instance of a class.

Creation:
→ <span class="text-blue-400">ClassName obj = new ClassName();</span>

Key Points:
→ <span class="text-cyan-300">new keyword:</span> Allocates memory
→ <span class="text-cyan-300">Instance:</span> Each object is independent
→ <span class="text-cyan-300">Access:</span> Use dot operator (obj.variable)`,
      code: `public class ObjectDemo {
    public static void main(String[] args) {
        // Create multiple objects
        Student s1 = new Student("Alice", 20, 85.5);
        Student s2 = new Student("Bob", 21, 90.0);
        
        // Each object has its own data
        s1.display();
        s2.display();
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Create a Student class with name, age, and marks. Create objects and display their information.',
      solution: 'Define class with instance variables, constructor, and display method.',
      solutionCode: `public class Student {
    String name;
    int age;
    double marks;
    
    public Student(String n, int a, double m) {
        name = n;
        age = a;
        marks = m;
    }
    
    public void display() {
        System.out.println(name + " - Age: " + age + ", Marks: " + marks);
    }
    
    public static void main(String[] args) {
        Student s = new Student("John", 20, 85.5);
        s.display();
    }
}`,
    },
  ],
}

export default function ClassesObjectsPage() {
  return <TopicPage content={content} />
}

