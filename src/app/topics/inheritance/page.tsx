'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLink, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Inheritance',
  explanationSections: [
    {
      title: 'Introduction to Inheritance',
      icon: <FiLink className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Inheritance</span> allows a class to inherit properties and methods from another class.

Syntax:
→ <span class="text-blue-400">class Child extends Parent { ... }</span>

Benefits:
→ <span class="text-cyan-300">Code reuse:</span> Inherit existing code
→ <span class="text-cyan-300">IS-A relationship:</span> Child is a type of Parent
→ <span class="text-cyan-300">Polymorphism:</span> Use child as parent

Types:
→ <span class="text-amber-300">Single:</span> One parent class
→ <span class="text-amber-300">Multilevel:</span> Grandparent → Parent → Child
→ <span class="text-amber-300">Hierarchical:</span> Multiple children from one parent`,
      code: `// Parent class
class Animal {
    String name;
    
    void eat() {
        System.out.println(name + " is eating");
    }
}

// Child class
class Dog extends Animal {
    void bark() {
        System.out.println(name + " is barking");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.name = "Buddy";
        dog.eat();   // Inherited method
        dog.bark();  // Own method
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Create a Vehicle class and Car class that extends Vehicle. Demonstrate inheritance.',
      solution: 'Use extends keyword to create inheritance relationship.',
      solutionCode: `class Vehicle {
    String brand;
    void start() {
        System.out.println(brand + " started");
    }
}

class Car extends Vehicle {
    void drive() {
        System.out.println("Driving " + brand);
    }
}

public class InheritanceExample {
    public static void main(String[] args) {
        Car car = new Car();
        car.brand = "Toyota";
        car.start();
        car.drive();
    }
}`,
    },
  ],
}

export default function InheritancePage() {
  return <TopicPage content={content} />
}

