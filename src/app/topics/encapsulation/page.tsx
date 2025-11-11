'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLock, FiEye, FiShield, FiKey } from 'react-icons/fi'

const content = {
  title: 'Encapsulation',
  explanationSections: [
    {
      title: 'Introduction to Encapsulation',
      icon: <FiShield className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Encapsulation</span> is one of the four fundamental <span class="text-cyan-300">OOP principles</span>. It means wrapping data and methods together in a class and hiding internal details.

Key Concepts:
→ <span class="text-blue-400">Data hiding:</span> Make instance variables <span class="text-cyan-300">private</span>
→ <span class="text-blue-400">Controlled access:</span> Provide public <span class="text-cyan-300">getter</span> and <span class="text-cyan-300">setter</span> methods
→ <span class="text-blue-400">Data security:</span> Prevent direct access to sensitive data
→ <span class="text-blue-400">Flexibility:</span> Can change implementation without affecting users

Benefits:
→ <span class="text-amber-300">Data security</span> and integrity
→ <span class="text-amber-300">Better control</span> over data validation
→ <span class="text-amber-300">Easier maintenance</span> and updates`,
      code: `public class EncapsulationIntro {
    // Private variable (data hiding)
    private String name;
    
    // Public getter method
    public String getName() {
        return name;
    }
    
    // Public setter method
    public void setName(String name) {
        this.name = name;
    }
}`,
    },
    {
      title: 'Access Modifiers',
      icon: <FiLock className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Access modifiers</span> control the visibility and accessibility of class members.

Types:
→ <span class="text-cyan-300">private:</span> Accessible only within the same class
→ <span class="text-cyan-300">default (package):</span> Accessible within the same package
→ <span class="text-cyan-300">protected:</span> Accessible within package and subclasses
→ <span class="text-cyan-300">public:</span> Accessible from anywhere

<span class="text-amber-300">Best Practice:</span> Make instance variables <span class="text-cyan-300">private</span> and provide public getters/setters.`,
      code: `public class AccessModifiers {
    private int privateVar;      // Only accessible in this class
    int defaultVar;             // Accessible in same package
    protected int protectedVar; // Accessible in package and subclasses
    public int publicVar;       // Accessible everywhere
    
    // Private variable with public accessor
    private String name;
    
    public String getName() {
        return name;  // Can access private variable within class
    }
}`,
    },
    {
      title: 'Getter and Setter Methods',
      icon: <FiKey className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Getter</span> and <span class="text-blue-400 font-semibold">setter</span> methods provide controlled access to private variables.

Getter Methods:
→ Return the value of <span class="text-cyan-300">private variable</span>
→ <span class="text-cyan-300">Naming:</span> <span class="text-blue-400">getVariableName()</span>
→ <span class="text-amber-300">Example:</span> <span class="text-cyan-300">public String getName() { return name; }</span>

Setter Methods:
→ Set the value of <span class="text-cyan-300">private variable</span>
→ <span class="text-cyan-300">Naming:</span> <span class="text-blue-400">setVariableName()</span>
→ <span class="text-amber-300">Can include validation logic</span>
→ <span class="text-amber-300">Example:</span> <span class="text-cyan-300">public void setName(String n) { name = n; }</span>`,
      code: `public class GetterSetter {
    private String name;
    private int age;
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Setter methods
    public void setName(String name) {
        this.name = name;
    }
    
    public void setAge(int age) {
        if (age > 0 && age <= 120) {
            this.age = age;
        } else {
            System.out.println("Invalid age!");
        }
    }
}`,
    },
    {
      title: 'Data Validation in Setters',
      icon: <FiEye className="w-6 h-6" />,
      content: `Setter methods can include <span class="text-blue-400 font-semibold">validation</span> to ensure data integrity.

Validation Examples:
→ Check if value is within <span class="text-cyan-300">valid range</span>
→ Ensure <span class="text-cyan-300">non-null</span> values
→ Validate <span class="text-cyan-300">format</span> (email, phone number)
→ Prevent <span class="text-cyan-300">invalid state</span> changes

Benefits:
→ <span class="text-amber-300">Prevents invalid data</span> from being stored
→ <span class="text-amber-300">Maintains object integrity</span>
→ <span class="text-amber-300">Provides clear error messages</span>`,
      code: `public class DataValidation {
    private double gpa;
    private String email;
    
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA! Must be between 0.0 and 4.0");
        }
    }
    
    public void setEmail(String email) {
        if (email != null && email.contains("@")) {
            this.email = email;
        } else {
            System.out.println("Invalid email format!");
        }
    }
}`,
    },
  ] as ExplanationSection[],
  exampleCode: `public class Student {
    // Private instance variables (data hiding)
    private String name;
    private int age;
    private double gpa;
    
    // Constructor
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public double getGpa() {
        return gpa;
    }
    
    // Setter methods with validation
    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }
    
    public void setAge(int age) {
        if (age > 0 && age <= 120) {
            this.age = age;
        } else {
            System.out.println("Invalid age!");
        }
    }
    
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA!");
        }
    }
    
    // Method to display student information
    public void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        Student student = new Student("John", 20, 3.5);
        
        // Accessing private data through public methods
        System.out.println("Name: " + student.getName());
        System.out.println("Age: " + student.getAge());
        
        // Modifying data through setter methods
        student.setAge(21);
        student.setGpa(3.7);
        
        student.display();
        
        // This would cause error - cannot access private variable directly
        // student.name = "Jane"; // Compilation error
    }
}`,
  practiceQuestions: [
    {
      question: 'Write a Java class Student with private variables and getter/setter methods.',
      solution: 'Create a Student class with private fields (name, marks), public getter methods to read values, and public setter methods to modify values. Include validation in setters if needed.',
      solutionCode: `class Student {
    private String name;
    private int marks;
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getMarks() {
        return marks;
    }
    
    // Setter methods
    public void setName(String n) {
        name = n;
    }
    
    public void setMarks(int m) {
        marks = m;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.setName("Ravi");
        s.setMarks(90);
        
        System.out.println(s.getName() + " scored " + s.getMarks());
    }
}`,
    },
  ] as PracticeQuestion[],
}

export default function EncapsulationPage() {
  return <TopicPage content={content} />
}
