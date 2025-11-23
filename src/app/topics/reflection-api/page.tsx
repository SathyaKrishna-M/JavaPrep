'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiSearch, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Reflection API',
  explanationSections: [
    {
      title: 'Introduction to Reflection',
      icon: <FiSearch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Reflection API</span> inspects classes, methods, fields at runtime.

Capabilities:
→ <span class="text-cyan-300">Inspect classes:</span> Get class information
→ <span class="text-cyan-300">Access fields:</span> Get/set field values
→ <span class="text-cyan-300">Invoke methods:</span> Call methods dynamically
→ <span class="text-cyan-300">Create objects:</span> Instantiate classes dynamically

Use Cases:
→ <span class="text-amber-300">Frameworks:</span> Spring, Hibernate
→ <span class="text-amber-300">Testing:</span> JUnit
→ <span class="text-amber-300">Debugging:</span> Inspect objects`,
      code: `import java.lang.reflect.*;

class Student {
    private String name;
    public int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = Student.class;
        
        // Get class name
        System.out.println("Class: " + clazz.getName());
        
        // Get methods
        Method[] methods = clazz.getDeclaredMethods();
        for (Method m : methods) {
            System.out.println("Method: " + m.getName());
        }
        
        // Create instance
        Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
        Student s = (Student) constructor.newInstance("Alice", 20);
        s.display();
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Use Reflection API to get all methods of a class and invoke one method.',
      solution: 'Use Class.getDeclaredMethods() and Method.invoke().',
      solutionCode: `import java.lang.reflect.*;

class TestClass {
    public void method1() {
        System.out.println("Method 1");
    }
    
    public void method2() {
        System.out.println("Method 2");
    }
}

public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = TestClass.class;
        Method[] methods = clazz.getDeclaredMethods();
        
        for (Method m : methods) {
            System.out.println("Method: " + m.getName());
        }
        
        TestClass obj = new TestClass();
        Method method = clazz.getMethod("method1");
        method.invoke(obj);
    }
}`,
    },
  ],
}

export default function ReflectionAPIPage() {
  return <TopicPage content={content} />
}

