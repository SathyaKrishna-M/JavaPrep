'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiMonitor, FiPackage, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Capstone Mini-Project: Student Manager',
    explanationSections: [
        {
            title: 'Project Overview',
            icon: <FiMonitor className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Goal:</span> Build a Student Management System console app.
                        This project demonstrates how all the CO6 concepts work together.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li><span className="text-yellow-400 font-semibold">Collections (ArrayList):</span> Ideally suited for storing a dynamic list of students in memory.</li>
                            <li><span className="text-green-400 font-semibold">Custom Exception (InvalidAgeException):</span> Ensures data integrity by rejecting bad inputs (e.g., age -5).</li>
                            <li><span className="text-blue-400 font-semibold">File I/O (Serialization):</span> Persists data to a file (<code>students.dat</code>) so it survives application restarts.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Full Source Code',
            icon: <FiPackage className="w-6 h-6" />,
            content: 'Below is the complete, runnable implementation.',
            code: `import java.io.*;
import java.util.*;

// 1. Custom Exception
class InvalidAgeException extends Exception {
    public InvalidAgeException(String msg) { super(msg); }
}

// 2. Student Class (Must implement Serializable)
class Student implements Serializable {
    private static final long serialVersionUID = 1L; // Version Control
    String name;
    int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() { return name + " (Age: " + age + ")"; }
}

// 3. Manager Class
public class StudentManager {
    private static final String FILE_NAME = "students.dat";
    private List<Student> students = new ArrayList<>();

    // Feature: Add Student with Validation
    public void addStudent(String name, int age) {
        try {
            if (age < 0 || age > 120) {
                throw new InvalidAgeException("Age " + age + " is invalid!");
            }
            students.add(new Student(name, age));
            System.out.println("✅ Student added: " + name);
        } catch (InvalidAgeException e) {
            System.out.println("❌ Error: " + e.getMessage());
        }
    }

    // Feature: Save to File (Serialization)
    public void saveToFile() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(students); // Write entire list at once
            System.out.println("💾 Data saved to " + FILE_NAME);
        } catch (IOException e) {
            System.out.println("Save failed: " + e.getMessage());
        }
    }

    // Feature: Load from File (Deserialization)
    @SuppressWarnings("unchecked")
    public void loadFromFile() {
        File f = new File(FILE_NAME);
        if(!f.exists()) return; // Nothing to load

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(f))) {
            students = (List<Student>) ois.readObject();
            System.out.println("📂 Loaded " + students.size() + " students.");
        } catch (Exception e) {
            System.out.println("Load failed.");
        }
    }

    public void display() {
        System.out.println("\\n--- Student List ---");
        if(students.isEmpty()) System.out.println("(Empty)");
        else students.forEach(System.out::println);
        System.out.println("--------------------\\n");
    }

    // Main Driver
    public static void main(String[] args) {
        StudentManager sm = new StudentManager();
        sm.loadFromFile(); // 1. Load previous data

        System.out.println("Processing updates...");
        sm.addStudent("Alice", 20);
        sm.addStudent("Bob", -5); // Triggers Exception (Invalid Age)
        sm.addStudent("Charlie", 22);
        
        sm.display();
        
        sm.saveToFile(); // 2. Save new data
    }
}
// FIRST RUN Output:
// Processing updates...
// ✅ Student added: Alice
// ❌ Error: Age -5 is invalid!
// ✅ Student added: Charlie
//
// --- Student List ---
// Alice (Age: 20)
// Charlie (Age: 22)
// --------------------
//
// 💾 Data saved to students.dat

// SECOND RUN Output:
// 📂 Loaded 2 students.
// Processing updates...
// ...`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Challenge: Search Functionality',
            solution: 'Add a method to find a student by name using Stream API.',
            steps: [
                {
                    step: '1. Stream Filter',
                    explanation: 'Use stream().filter() to find matches (ignore case).'
                },
                {
                    step: '2. Find First',
                    explanation: 'Use .findFirst() which returns an Optional<Student>.'
                }
            ],
            code: `public void findStudent(String name) {
    Optional<Student> found = students.stream()
        .filter(s -> s.name.equalsIgnoreCase(name))
        .findFirst();
        
    if(found.isPresent()) {
        System.out.println("Found: " + found.get());
    } else {
        System.out.println("Student '" + name + "' not found.");
    }
}
// Output:
// Found: Alice (Age: 20)`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'How would you handle concurrent access?',
            solution: 'If multiple threads were adding students at the same time, ArrayList would fail (ConcurrentModificationException). Use `Collections.synchronizedList(new ArrayList<>())` or `CopyOnWriteArrayList`.',
            solutionCode: `List<Student> syncList = Collections.synchronizedList(new ArrayList<>());`
        }
    ] as PracticeQuestion[]
}

export default function CapstoneProjectPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
