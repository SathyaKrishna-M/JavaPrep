'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiRefreshCw, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Method Overriding, super & final',
  explanationSections: [
    {
      title: 'Method Overriding',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Method Overriding</span> provides specific implementation in child class.

Rules:
→ <span class="text-cyan-300">Same signature:</span> Method name and parameters
→ <span class="text-cyan-300">Access modifier:</span> Cannot be more restrictive
→ <span class="text-cyan-300">@Override:</span> Annotation (optional but recommended)

Purpose:
→ <span class="text-amber-300">Runtime polymorphism</span>
→ <span class="text-amber-300">Specific behavior</span>`,
      code: `class Animal {
    void makeSound() {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks");
    }
}

public class OverridingDemo {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.makeSound();  // Calls Dog's version
    }
}`,
    },
    {
      title: 'super Keyword',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">super</span> refers to parent class.

Uses:
→ <span class="text-cyan-300">super.variable:</span> Access parent variable
→ <span class="text-cyan-300">super.method():</span> Call parent method
→ <span class="text-cyan-300">super():</span> Call parent constructor`,
      code: `class Parent {
    String name = "Parent";
    
    void display() {
        System.out.println("Parent: " + name);
    }
}

class Child extends Parent {
    String name = "Child";
    
    void display() {
        super.display();  // Call parent method
        System.out.println("Child: " + name);
        System.out.println("Parent name: " + super.name);
    }
}

public class SuperDemo {
    public static void main(String[] args) {
        Child c = new Child();
        c.display();
    }
}`,
    },
    {
      title: 'final Keyword',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">final</span> prevents modification.

Uses:
→ <span class="text-cyan-300">final variable:</span> Constant (cannot change)
→ <span class="text-cyan-300">final method:</span> Cannot override
→ <span class="text-cyan-300">final class:</span> Cannot inherit`,
      code: `class Parent {
    final void display() {
        System.out.println("Cannot override");
    }
}

final class FinalClass {
    // Cannot be extended
}

public class FinalDemo {
    final int MAX = 100;  // Constant
    
    public static void main(String[] args) {
        FinalDemo obj = new FinalDemo();
        System.out.println("MAX: " + obj.MAX);
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Override a method in child class and use super to call parent method.',
      solution: 'Use @Override annotation and super.method() to call parent.',
      solutionCode: `class Parent {
    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override
    void show() {
        super.show();
        System.out.println("Child");
    }
}

public class OverrideExample {
    public static void main(String[] args) {
        Child c = new Child();
        c.show();
    }
}`,
    },
  ],
}

export default function MethodOverridingSuperFinalPage() {
  return <TopicPage content={content} />
}

