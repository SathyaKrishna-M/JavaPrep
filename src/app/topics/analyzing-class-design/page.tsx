'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiSearch, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Analyzing Class Design',
  explanationSections: [
    {
      title: 'Design Principles',
      icon: <FiSearch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Class Design</span> follows principles for good architecture.

Principles:
→ <span class="text-cyan-300">Single Responsibility:</span> One class, one purpose
→ <span class="text-cyan-300">Cohesion:</span> Related functionality together
→ <span class="text-cyan-300">Coupling:</span> Minimize dependencies
→ <span class="text-cyan-300">Encapsulation:</span> Hide implementation

Analysis:
→ <span class="text-amber-300">Check responsibilities</span>
→ <span class="text-amber-300">Evaluate cohesion</span>
→ <span class="text-amber-300">Assess coupling</span>`,
      code: `// Good design: Single responsibility
class Student {
    private String name;
    private int age;
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

class StudentDisplay {
    public static void display(Student s) {
        System.out.println("Name: " + s.getName());
    }
}

// Separation of concerns
public class GoodDesign {
    public static void main(String[] args) {
        Student s = new Student();
        s.setName("Alice");
        StudentDisplay.display(s);
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Analyze and improve a class design that violates single responsibility principle.',
      solution: 'Split class into multiple classes, each with single responsibility.',
      solutionCode: `// Before: Multiple responsibilities
class BadDesign {
    String name;
    void saveToFile() { /* ... */ }
    void display() { /* ... */ }
}

// After: Separated responsibilities
class Student {
    String name;
}

class FileManager {
    void save(Student s) { /* ... */ }
}

class Display {
    void show(Student s) { /* ... */ }
}`,
    },
  ],
}

export default function AnalyzingClassDesignPage() {
  return <TopicPage content={content} />
}

