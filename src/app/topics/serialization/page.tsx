'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiSave, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Serialization',
  explanationSections: [
    {
      title: 'Object Serialization',
      icon: <FiSave className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Serialization</span> converts objects to byte stream for storage/transmission.

Process:
→ <span class="text-cyan-300">Serialization:</span> Object → Byte stream
→ <span class="text-cyan-300">Deserialization:</span> Byte stream → Object

Requirements:
→ <span class="text-amber-300">implements Serializable:</span> Class must implement interface
→ <span class="text-amber-300">transient:</span> Fields not serialized
→ <span class="text-amber-300">serialVersionUID:</span> Version control

Classes:
→ <span class="text-cyan-300">ObjectOutputStream:</span> Write objects
→ <span class="text-cyan-300">ObjectInputStream:</span> Read objects`,
      code: `import java.io.*;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    private transient String password;  // Not serialized
    
    public Student(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }
    
    public String toString() {
        return "Name: " + name + ", Age: " + age;
    }
}

public class SerializationDemo {
    public static void main(String[] args) {
        Student s = new Student("Alice", 20, "secret");
        
        // Serialization
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("student.ser"))) {
            oos.writeObject(s);
            System.out.println("Object serialized");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialization
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("student.ser"))) {
            Student s2 = (Student) ois.readObject();
            System.out.println("Object deserialized: " + s2);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Create a class that implements Serializable and demonstrate serialization and deserialization.',
      solution: 'Implement Serializable interface, use ObjectOutputStream and ObjectInputStream.',
      solutionCode: `import java.io.*;

class Person implements Serializable {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String toString() {
        return name + " - " + age;
    }
}

public class SerializationExample {
    public static void main(String[] args) throws Exception {
        Person p = new Person("John", 25);
        
        // Serialize
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.ser"));
        oos.writeObject(p);
        oos.close();
        
        // Deserialize
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.ser"));
        Person p2 = (Person) ois.readObject();
        ois.close();
        
        System.out.println(p2);
    }
}`,
    },
  ],
}

export default function SerializationPage() {
  return <TopicPage content={content} />
}

