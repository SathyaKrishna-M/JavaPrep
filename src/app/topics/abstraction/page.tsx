'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiEye, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Abstraction',
  explanationSections: [
    {
      title: 'Introduction to Abstraction',
      icon: <FiEye className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Abstraction</span> hides implementation details, shows only essential features.

Benefits:
→ <span class="text-cyan-300">Simplifies:</span> Focus on what, not how
→ <span class="text-cyan-300">Security:</span> Hide internal details
→ <span class="text-cyan-300">Maintainability:</span> Change implementation without affecting users

Ways to Achieve:
→ <span class="text-amber-300">Abstract classes</span>
→ <span class="text-amber-300">Interfaces</span>
→ <span class="text-amber-300">Access modifiers</span>`,
      code: `// Abstract class example
abstract class Shape {
    abstract double area();  // Abstract method
    
    void display() {  // Concrete method
        System.out.println("Area: " + area());
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

public class AbstractionDemo {
    public static void main(String[] args) {
        Shape s = new Circle(5);
        s.display();  // Uses abstraction
    }
}`,
    },
  ],
  exampleCode: `// Abstract class example
abstract class Shape {
    abstract double area();  // Abstract method
    
    void display() {  // Concrete method
        System.out.println("Area: " + area());
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

public class AbstractionDemo {
    public static void main(String[] args) {
        Shape s1 = new Circle(5);
        s1.display();  // Uses abstraction
        
        Shape s2 = new Rectangle(4, 6);
        s2.display();  // Uses abstraction
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an abstract class Vehicle with abstract method start(). Create Car class implementing it.',
      solution: 'Define abstract class with abstract method, implement in subclass.',
      solutionCode: `abstract class Vehicle {
    abstract void start();
}

class Car extends Vehicle {
    void start() {
        System.out.println("Car started");
    }
}

public class AbstractionExample {
    public static void main(String[] args) {
        Vehicle v = new Car();
        v.start();
    }
}`,
    },
  ],
}

export default function AbstractionPage() {
  return <TopicPage content={content} />
}

