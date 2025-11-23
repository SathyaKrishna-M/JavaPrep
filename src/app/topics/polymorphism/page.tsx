'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLayers, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Polymorphism',
  explanationSections: [
    {
      title: 'Types of Polymorphism',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Polymorphism</span> means "many forms" - same interface, different implementations.

Types:
→ <span class="text-cyan-300">Compile-time:</span> Method overloading
→ <span class="text-cyan-300">Runtime:</span> Method overriding

Compile-time (Overloading):
→ <span class="text-amber-300">Same method name</span>
→ <span class="text-amber-300">Different parameters</span>
→ <span class="text-amber-300">Resolved at compile time</span>

Runtime (Overriding):
→ <span class="text-amber-300">Same method signature</span>
→ <span class="text-amber-300">Different implementations</span>
→ <span class="text-amber-300">Resolved at runtime</span>`,
      code: `// Compile-time polymorphism (Overloading)
class Calculator {
    int add(int a, int b) {
        return a + b;
    }
    
    double add(double a, double b) {
        return a + b;
    }
}

// Runtime polymorphism (Overriding)
class Animal {
    void makeSound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Woof!");
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        // Compile-time
        Calculator calc = new Calculator();
        System.out.println(calc.add(5, 3));
        System.out.println(calc.add(5.5, 3.2));
        
        // Runtime
        Animal a = new Dog();
        a.makeSound();  // Calls Dog's version
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Demonstrate both compile-time and runtime polymorphism.',
      solution: 'Use method overloading for compile-time and overriding for runtime.',
      solutionCode: `class MathOps {
    int multiply(int a, int b) {
        return a * b;
    }
    
    double multiply(double a, double b) {
        return a * b;
    }
}

class Shape {
    void draw() {
        System.out.println("Drawing shape");
    }
}

class Circle extends Shape {
    void draw() {
        System.out.println("Drawing circle");
    }
}

public class PolymorphismExample {
    public static void main(String[] args) {
        MathOps ops = new MathOps();
        System.out.println(ops.multiply(5, 3));
        
        Shape s = new Circle();
        s.draw();
    }
}`,
    },
  ],
}

export default function PolymorphismPage() {
  return <TopicPage content={content} />
}

