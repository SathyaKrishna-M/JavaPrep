'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiFile, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Abstract Classes',
  explanationSections: [
    {
      title: 'Introduction to Abstract Classes',
      icon: <FiFile className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Abstract Class</span> cannot be instantiated, must be extended.

Features:
→ <span class="text-cyan-300">Abstract methods:</span> No implementation, must override
→ <span class="text-cyan-300">Concrete methods:</span> Can have implementation
→ <span class="text-cyan-300">Partial abstraction:</span> Mix of abstract and concrete
→ <span class="text-cyan-300">Cannot instantiate:</span> Must use child class

Syntax:
→ <span class="text-blue-400">abstract class ClassName { ... }</span>`,
      code: `abstract class Shape {
    abstract double area();  // Abstract method
    
    void display() {  // Concrete method
        System.out.println("Area: " + area());
    }
}

class Rectangle extends Shape {
    double width, height;
    
    Rectangle(double w, double h) {
        width = w;
        height = h;
    }
    
    double area() {
        return width * height;
    }
}

public class AbstractClassDemo {
    public static void main(String[] args) {
        Shape s = new Rectangle(5, 10);
        s.display();
    }
}`,
    },
  ],
  exampleCode: `abstract class Shape {
    abstract double area();  // Abstract method
    
    void display() {  // Concrete method
        System.out.println("Area: " + area());
    }
}

class Rectangle extends Shape {
    double width, height;
    
    Rectangle(double w, double h) {
        width = w;
        height = h;
    }
    
    double area() {
        return width * height;
    }
}

class Circle extends Shape {
    double radius;
    
    Circle(double r) {
        radius = r;
    }
    
    double area() {
        return Math.PI * radius * radius;
    }
}

public class AbstractClassDemo {
    public static void main(String[] args) {
        Shape s1 = new Rectangle(5, 10);
        s1.display();  // Area: 50.0
        
        Shape s2 = new Circle(7);
        s2.display();  // Area: 153.93804002589985
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an abstract class Animal with abstract method makeSound(). Create Dog class extending it.',
      solution: 'Define abstract class with abstract method, implement in subclass.',
      solutionCode: `abstract class Animal {
    abstract void makeSound();
}

class Dog extends Animal {
    void makeSound() {
        System.out.println("Woof!");
    }
}

public class AbstractExample {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.makeSound();
    }
}`,
    },
  ],
}

export default function AbstractClassesPage() {
  return <TopicPage content={content} />
}

