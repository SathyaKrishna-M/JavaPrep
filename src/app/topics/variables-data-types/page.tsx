'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiType, FiTarget, FiCode, FiLayers } from 'react-icons/fi'

const content = {
  title: 'Variables and Data Types',
  explanationSections: [
    {
      title: 'Introduction to Variables',
      icon: <FiType className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Variables</span> are containers that store data values in memory.

Key Concepts:
→ <span class="text-cyan-300">Declaration:</span> Creating a variable with a name and type
→ <span class="text-cyan-300">Initialization:</span> Assigning a value to a variable
→ <span class="text-cyan-300">Assignment:</span> Changing the value of a variable
→ <span class="text-cyan-300">Naming rules:</span> Must start with letter, underscore, or $; can contain letters, digits, _, $

Syntax:
→ <span class="text-blue-400">dataType variableName;</span> (declaration)
→ <span class="text-blue-400">dataType variableName = value;</span> (declaration + initialization)`,
      code: `public class VariablesIntro {
    public static void main(String[] args) {
        // Declaration
        int age;
        
        // Initialization
        age = 20;
        
        // Declaration and initialization
        String name = "Alice";
        double salary = 50000.50;
        boolean isActive = true;
        
        // Display values
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: $" + salary);
        System.out.println("Active: " + isActive);
    }
}`,
    },
    {
      title: 'Primitive Data Types',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Primitive Data Types</span> are basic data types built into Java.

Types:
→ <span class="text-cyan-300">byte:</span> 8-bit integer (-128 to 127)
→ <span class="text-cyan-300">short:</span> 16-bit integer (-32,768 to 32,767)
→ <span class="text-cyan-300">int:</span> 32-bit integer (-2³¹ to 2³¹-1)
→ <span class="text-cyan-300">long:</span> 64-bit integer (-2⁶³ to 2⁶³-1)
→ <span class="text-cyan-300">float:</span> 32-bit floating point
→ <span class="text-cyan-300">double:</span> 64-bit floating point
→ <span class="text-cyan-300">char:</span> 16-bit Unicode character
→ <span class="text-cyan-300">boolean:</span> true or false

Default Values:
→ <span class="text-amber-300">Numeric types:</span> 0
→ <span class="text-amber-300">char:</span> '\\u0000'
→ <span class="text-amber-300">boolean:</span> false`,
      code: `public class PrimitiveTypes {
    public static void main(String[] args) {
        // Integer types
        byte b = 100;
        short s = 1000;
        int i = 100000;
        long l = 1000000000L;  // L suffix for long
        
        // Floating point types
        float f = 3.14f;  // f suffix for float
        double d = 3.14159265359;
        
        // Character type
        char c = 'A';
        
        // Boolean type
        boolean flag = true;
        
        // Display all values
        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
        System.out.println("boolean: " + flag);
    }
}`,
    },
    {
      title: 'Reference Data Types',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Reference Data Types</span> store references to objects in memory.

Types:
→ <span class="text-cyan-300">String:</span> Sequence of characters
→ <span class="text-cyan-300">Arrays:</span> Collection of elements
→ <span class="text-cyan-300">Classes:</span> User-defined types
→ <span class="text-cyan-300">Interfaces:</span> Contract definitions

Key Points:
→ <span class="text-amber-300">Default value:</span> null
→ <span class="text-amber-300">Memory:</span> Stored in heap
→ <span class="text-amber-300">Reference:</span> Variable holds address, not value`,
      code: `public class ReferenceTypes {
    public static void main(String[] args) {
        // String (reference type)
        String name = "Java";
        String message = new String("Hello");
        
        // Array (reference type)
        int[] numbers = {1, 2, 3, 4, 5};
        String[] names = new String[3];
        names[0] = "Alice";
        names[1] = "Bob";
        names[2] = "Charlie";
        
        // Display
        System.out.println("Name: " + name);
        System.out.println("Message: " + message);
        System.out.println("Numbers: " + java.util.Arrays.toString(numbers));
        System.out.println("Names: " + java.util.Arrays.toString(names));
    }
}`,
    },
    {
      title: 'Variable Naming Conventions',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Naming Conventions</span> make code readable and maintainable.

Rules:
→ <span class="text-cyan-300">Start with:</span> Letter, underscore (_), or dollar sign ($)
→ <span class="text-cyan-300">Can contain:</span> Letters, digits, underscore, dollar sign
→ <span class="text-cyan-300">Case sensitive:</span> age and Age are different
→ <span class="text-cyan-300">Cannot be:</span> Java keywords (if, class, public, etc.)

Conventions:
→ <span class="text-amber-300">camelCase:</span> For variables and methods (studentName, calculateTotal)
→ <span class="text-amber-300">PascalCase:</span> For classes (Student, BankAccount)
→ <span class="text-amber-300">UPPER_CASE:</span> For constants (MAX_SIZE, PI)
→ <span class="text-amber-300">Descriptive:</span> Use meaningful names`,
      code: `public class NamingConventions {
    // Constants (UPPER_CASE)
    public static final int MAX_SIZE = 100;
    public static final double PI = 3.14159;
    
    // Variables (camelCase)
    private String studentName;
    private int studentAge;
    private double totalMarks;
    
    // Methods (camelCase)
    public void calculateTotal() {
        totalMarks = 85.5;
    }
    
    public void displayInfo() {
        System.out.println("Name: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("Marks: " + totalMarks);
    }
    
    public static void main(String[] args) {
        NamingConventions obj = new NamingConventions();
        obj.studentName = "Alice";
        obj.studentAge = 20;
        obj.calculateTotal();
        obj.displayInfo();
        
        System.out.println("Max Size: " + MAX_SIZE);
        System.out.println("PI: " + PI);
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Declare and initialize variables for storing a student\'s name, age, and marks. Display all values.',
      solution: 'Use appropriate data types: String for name, int for age, double for marks.',
      solutionCode: `public class StudentInfo {
    public static void main(String[] args) {
        String name = "John Doe";
        int age = 20;
        double marks = 85.5;
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Marks: " + marks);
    }
}`,
    },
    {
      question: 'Create variables for different primitive types and display their values.',
      solution: 'Declare variables of each primitive type: byte, short, int, long, float, double, char, boolean.',
      solutionCode: `public class PrimitiveDemo {
    public static void main(String[] args) {
        byte b = 100;
        short s = 1000;
        int i = 100000;
        long l = 1000000000L;
        float f = 3.14f;
        double d = 3.14159;
        char c = 'A';
        boolean flag = true;
        
        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
        System.out.println("boolean: " + flag);
    }
}`,
    },
    {
      question: 'Create a program that demonstrates variable declaration, initialization, and reassignment.',
      solution: 'Declare a variable, initialize it, then reassign a new value.',
      solutionCode: `public class VariableDemo {
    public static void main(String[] args) {
        // Declaration
        int number;
        
        // Initialization
        number = 10;
        System.out.println("Initial value: " + number);
        
        // Reassignment
        number = 20;
        System.out.println("After reassignment: " + number);
        
        number = 30;
        System.out.println("Final value: " + number);
    }
}`,
    },
    {
      question: 'Create variables following Java naming conventions: camelCase for variables, UPPER_CASE for constants.',
      solution: 'Use camelCase for regular variables and UPPER_CASE for constants with final keyword.',
      solutionCode: `public class NamingDemo {
    // Constants (UPPER_CASE)
    public static final int MAX_STUDENTS = 50;
    public static final double TAX_RATE = 0.15;
    
    public static void main(String[] args) {
        // Variables (camelCase)
        String studentName = "Alice";
        int studentAge = 20;
        double studentMarks = 85.5;
        
        System.out.println("Name: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("Marks: " + studentMarks);
        System.out.println("Max Students: " + MAX_STUDENTS);
        System.out.println("Tax Rate: " + TAX_RATE);
    }
}`,
    },
    {
      question: 'Create variables for a bank account: account number (int), balance (double), and account holder name (String).',
      solution: 'Use appropriate data types for each field and display the account information.',
      solutionCode: `public class BankAccount {
    public static void main(String[] args) {
        int accountNumber = 12345;
        double balance = 10000.50;
        String accountHolder = "John Smith";
        
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + balance);
    }
}`,
    },
    {
      question: 'Demonstrate the difference between primitive and reference types by creating examples of each.',
      solution: 'Create primitive variables (int, double, boolean) and reference variables (String, array).',
      solutionCode: `public class TypeDemo {
    public static void main(String[] args) {
        // Primitive types
        int age = 25;
        double salary = 50000.0;
        boolean isActive = true;
        
        // Reference types
        String name = "Alice";
        int[] numbers = {1, 2, 3, 4, 5};
        
        System.out.println("Primitive types:");
        System.out.println("Age: " + age);
        System.out.println("Salary: " + salary);
        System.out.println("Active: " + isActive);
        
        System.out.println("\\nReference types:");
        System.out.println("Name: " + name);
        System.out.println("Numbers: " + java.util.Arrays.toString(numbers));
    }
}`,
    },
  ],
}

export default function VariablesDataTypesPage() {
  return <TopicPage content={content} />
}

