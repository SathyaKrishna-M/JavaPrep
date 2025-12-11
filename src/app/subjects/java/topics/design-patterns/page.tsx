'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLayers, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Design Patterns',
  explanationSections: [
    {
      title: 'Common Design Patterns',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Design Patterns</span> are reusable solutions to common problems.

Types:
→ <span className="text-cyan-300">Creational:</span> Object creation (Factory, Singleton)
→ <span className="text-cyan-300">Structural:</span> Object composition (Adapter, Decorator)
→ <span className="text-cyan-300">Behavioral:</span> Object interaction (Strategy, Observer)

Singleton Pattern:
→ <span className="text-amber-300">One instance:</span> Only one object exists
→ <span className="text-amber-300">Private constructor:</span> Prevent instantiation
→ <span className="text-amber-300">Static method:</span> Get instance`,
      code: `// Singleton Pattern
class Singleton {
    private static Singleton instance;
    
    private Singleton() {
        // Private constructor
    }
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

// Factory Pattern
interface Shape {
    void draw();
}

class Circle implements Shape {
    public void draw() {
        System.out.println("Drawing circle");
    }
}

class ShapeFactory {
    public static Shape createShape(String type) {
        if (type.equals("circle")) {
            return new Circle();
        }
        return null;
    }
}

public class DesignPatternsDemo {
    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();
        System.out.println(s1 == s2);  // true
        
        Shape shape = ShapeFactory.createShape("circle");
        shape.draw();
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Implement Singleton pattern to ensure only one instance of a class exists.',
      solution: 'Use private constructor, static instance variable, and static getInstance method.',
      solutionCode: `class Singleton {
    private static Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

public class SingletonExample {
    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();
        System.out.println("Same instance: " + (s1 == s2));
    }
}`,
    },
  ],
}

export default function DesignPatternsPage() {
  return <TopicPage content={content} />
}

