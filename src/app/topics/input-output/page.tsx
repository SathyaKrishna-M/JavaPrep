'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiTerminal, FiPrinter, FiFileText, FiKey } from 'react-icons/fi'

const content = {
  title: 'Input/Output',
  explanationSections: [
    {
      title: 'Scanner Class',
      icon: <FiTerminal className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">Scanner</span> class is the most common way to read input from the keyboard in Java.

Key Features:
→ <span class="text-cyan-300">Import required:</span> <span class="text-blue-400">import java.util.Scanner;</span>
→ <span class="text-cyan-300">Create Scanner object:</span> <span class="text-blue-400">Scanner sc = new Scanner(System.in);</span>
→ Read different data types: <span class="text-cyan-300">nextInt()</span>, <span class="text-cyan-300">nextDouble()</span>, <span class="text-cyan-300">nextLine()</span>, <span class="text-cyan-300">next()</span>, etc.
→ <span class="text-amber-300">Always close</span> the scanner when done: <span class="text-cyan-300">sc.close();</span>

The Scanner class provides methods to read different types of input, making it versatile for various input scenarios.`,
      code: `import java.util.Scanner;

public class ScannerExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter an integer: ");
        int num = sc.nextInt();
        
        System.out.print("Enter a double: ");
        double value = sc.nextDouble();
        
        System.out.println("You entered: " + num + " and " + value);
        sc.close();
    }
}`,
    },
    {
      title: 'Output Methods',
      icon: <FiPrinter className="w-6 h-6" />,
      content: `Java provides several <span class="text-blue-400 font-semibold">methods</span> to display output to the console.

Methods:
→ <span class="text-cyan-300">System.out.println()</span> - Prints and moves to the next line
→ <span class="text-cyan-300">System.out.print()</span> - Prints without moving to next line
→ <span class="text-cyan-300">System.out.printf()</span> - Formatted output (like C's printf)

These methods are part of the <span class="text-blue-400">System</span> class and use the <span class="text-cyan-300">standard output stream (stdout)</span>.`,
      code: `public class OutputExample {
    public static void main(String[] args) {
        String name = "Java";
        int version = 17;
        
        System.out.println("Language: " + name);
        System.out.print("Version: ");
        System.out.println(version);
        System.out.printf("Formatted: %s %d%n", name, version);
    }
}`,
    },
    {
      title: 'BufferedReader (Advanced)',
      icon: <FiFileText className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">BufferedReader</span> is more efficient for reading large amounts of input, especially strings.

Advantages:
→ <span class="text-amber-300">Faster</span> than Scanner for reading strings
→ <span class="text-amber-300">Better</span> for reading large files
→ <span class="text-amber-300">More efficient</span> memory usage

<span class="text-amber-300">Use when:</span> You need to read large amounts of text data efficiently.`,
      code: `import java.io.BufferedReader;
import java.io.InputStreamReader;

public class BufferedReaderExample {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(
            new InputStreamReader(System.in)
        );
        
        System.out.print("Enter your name: ");
        String name = br.readLine();
        
        System.out.println("Hello, " + name + "!");
        br.close();
    }
}`,
    },
    {
      title: 'Key Points & Best Practices',
      icon: <FiKey className="w-6 h-6" />,
      content: `<span class="text-amber-300 font-semibold">Important points</span> to remember when working with I/O in Java:

→ <span class="text-amber-300">Always close</span> Scanner/BufferedReader objects to free resources
→ Use <span class="text-cyan-300">nextLine()</span> after <span class="text-cyan-300">nextInt()</span> to consume the newline character
→ <span class="text-cyan-300">System.out</span> is the standard output stream (console)
→ <span class="text-cyan-300">System.in</span> is the standard input stream (keyboard)
→ <span class="text-amber-300">Handle exceptions</span> when using BufferedReader (<span class="text-cyan-300">throws Exception</span>)

<span class="text-amber-300">Following these practices</span> ensures efficient and error-free I/O operations.`,
    },
  ] as ExplanationSection[],
  exampleCode: `import java.util.Scanner;

public class InputOutput {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        
        System.out.print("Enter your height: ");
        double height = sc.nextDouble();
        
        System.out.println("\\n=== Your Information ===");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height + " cm");
        
        sc.close();
    }
}`,
  practiceQuestions: [
    {
      question: 'Write a program to read two numbers from the user and display their sum.',
      solution: 'Create a Scanner object, read two integers using nextInt(), add them, and print the result.',
      solutionCode: `import java.util.Scanner;

public class SumTwoNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int num1 = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int num2 = sc.nextInt();
        
        int sum = num1 + num2;
        System.out.println("Sum: " + sum);
        
        sc.close();
    }
}`,
      dryRunCode: `import java.util.Scanner;

public class SumTwoNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int num1 = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int num2 = sc.nextInt();
        
        int sum = num1 + num2;
        System.out.println("Sum: " + sum);
        
        sc.close();
    }
}`,
      dryRunSteps: [
        {
          line: 4,
          vars: {},
          output: '',
          description: 'Creating Scanner object to read input',
        },
        {
          line: 6,
          vars: {},
          output: 'Enter first number: ',
          description: 'Prompting user for first number',
        },
        {
          line: 7,
          vars: { num1: 10 },
          output: 'Enter first number: ',
          description: 'Reading first number (assuming user entered 10)',
        },
        {
          line: 9,
          vars: { num1: 10 },
          output: 'Enter first number: Enter second number: ',
          description: 'Prompting user for second number',
        },
        {
          line: 10,
          vars: { num1: 10, num2: 20 },
          output: 'Enter first number: Enter second number: ',
          description: 'Reading second number (assuming user entered 20)',
        },
        {
          line: 12,
          vars: { num1: 10, num2: 20, sum: 30 },
          output: 'Enter first number: Enter second number: ',
          description: 'Calculating sum: 10 + 20 = 30',
        },
        {
          line: 13,
          vars: { num1: 10, num2: 20, sum: 30 },
          output: 'Enter first number: Enter second number: Sum: 30\\n',
          description: 'Displaying the sum',
        },
        {
          line: 15,
          vars: { num1: 10, num2: 20, sum: 30 },
          output: 'Enter first number: Enter second number: Sum: 30\\n',
          description: 'Closing Scanner object',
        },
      ] as DryRunStep[],
    },
    {
      question: 'Write a program to read a string and an integer, then display them in reverse order.',
      solution: 'Read a string using nextLine() and an integer using nextInt(), then print them in reverse order.',
      solutionCode: `import java.util.Scanner;

public class ReverseInput {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String str = sc.nextLine();
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        System.out.println("Reversed order: " + num + ", " + str);
        
        sc.close();
    }
}`,
      dryRunCode: `import java.util.Scanner;

public class ReverseInput {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String str = sc.nextLine();
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        System.out.println("Reversed order: " + num + ", " + str);
        
        sc.close();
    }
}`,
      dryRunSteps: [
        {
          line: 4,
          vars: {},
          output: '',
          description: 'Creating Scanner object',
        },
        {
          line: 6,
          vars: {},
          output: 'Enter a string: ',
          description: 'Prompting for string input',
        },
        {
          line: 7,
          vars: { str: 'Hello' },
          output: 'Enter a string: ',
          description: 'Reading string (assuming user entered "Hello")',
        },
        {
          line: 9,
          vars: { str: 'Hello' },
          output: 'Enter a string: Enter a number: ',
          description: 'Prompting for number input',
        },
        {
          line: 10,
          vars: { str: 'Hello', num: 42 },
          output: 'Enter a string: Enter a number: ',
          description: 'Reading number (assuming user entered 42)',
        },
        {
          line: 12,
          vars: { str: 'Hello', num: 42 },
          output: 'Enter a string: Enter a number: Reversed order: 42, Hello\\n',
          description: 'Displaying in reverse order',
        },
        {
          line: 14,
          vars: { str: 'Hello', num: 42 },
          output: 'Enter a string: Enter a number: Reversed order: 42, Hello\\n',
          description: 'Closing Scanner',
        },
      ] as DryRunStep[],
    },
    {
      question: 'Write a program to read a person\'s name, age, and city, then display a formatted message.',
      solution: 'Use nextLine() for name and city, nextInt() for age, then format the output message.',
      solutionCode: `import java.util.Scanner;

public class PersonInfo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        sc.nextLine(); // Consume newline
        
        System.out.print("Enter your city: ");
        String city = sc.nextLine();
        
        System.out.println("\\nHello! I'm " + name + ", " + age + 
                          " years old, from " + city + ".");
        
        sc.close();
    }
}`,
      dryRunCode: `import java.util.Scanner;

public class PersonInfo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        sc.nextLine(); // Consume newline
        
        System.out.print("Enter your city: ");
        String city = sc.nextLine();
        
        System.out.println("\\nHello! I'm " + name + ", " + age + 
                          " years old, from " + city + ".");
        
        sc.close();
    }
}`,
      dryRunSteps: [
        {
          line: 4,
          vars: {},
          output: '',
          description: 'Creating Scanner object',
        },
        {
          line: 6,
          vars: {},
          output: 'Enter your name: ',
          description: 'Prompting for name',
        },
        {
          line: 7,
          vars: { name: 'John' },
          output: 'Enter your name: ',
          description: 'Reading name (assuming user entered "John")',
        },
        {
          line: 9,
          vars: { name: 'John' },
          output: 'Enter your name: Enter your age: ',
          description: 'Prompting for age',
        },
        {
          line: 10,
          vars: { name: 'John', age: 20 },
          output: 'Enter your name: Enter your age: ',
          description: 'Reading age (assuming user entered 20)',
        },
        {
          line: 11,
          vars: { name: 'John', age: 20 },
          output: 'Enter your name: Enter your age: ',
          description: 'Consuming newline character after nextInt()',
        },
        {
          line: 13,
          vars: { name: 'John', age: 20 },
          output: 'Enter your name: Enter your age: Enter your city: ',
          description: 'Prompting for city',
        },
        {
          line: 14,
          vars: { name: 'John', age: 20, city: 'New York' },
          output: 'Enter your name: Enter your age: Enter your city: ',
          description: 'Reading city (assuming user entered "New York")',
        },
        {
          line: 16,
          vars: { name: 'John', age: 20, city: 'New York' },
          output: 'Enter your name: Enter your age: Enter your city: \\nHello! I\'m John, 20 years old, from New York.\\n',
          description: 'Displaying formatted message',
        },
        {
          line: 19,
          vars: { name: 'John', age: 20, city: 'New York' },
          output: 'Enter your name: Enter your age: Enter your city: \\nHello! I\'m John, 20 years old, from New York.\\n',
          description: 'Closing Scanner',
        },
      ] as DryRunStep[],
    },
    {
      question: 'Write a program to read three floating-point numbers and calculate their average.',
      solution: 'Read three double values, calculate their average, and display the result with 2 decimal places.',
      solutionCode: `import java.util.Scanner;

public class Average {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        double num1 = sc.nextDouble();
        
        System.out.print("Enter second number: ");
        double num2 = sc.nextDouble();
        
        System.out.print("Enter third number: ");
        double num3 = sc.nextDouble();
        
        double average = (num1 + num2 + num3) / 3;
        System.out.printf("Average: %.2f%n", average);
        
        sc.close();
    }
}`,
      dryRunCode: `import java.util.Scanner;

public class Average {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        double num1 = sc.nextDouble();
        
        System.out.print("Enter second number: ");
        double num2 = sc.nextDouble();
        
        System.out.print("Enter third number: ");
        double num3 = sc.nextDouble();
        
        double average = (num1 + num2 + num3) / 3;
        System.out.printf("Average: %.2f%n", average);
        
        sc.close();
    }
}`,
      dryRunSteps: [
        {
          line: 4,
          vars: {},
          output: '',
          description: 'Creating Scanner object',
        },
        {
          line: 6,
          vars: {},
          output: 'Enter first number: ',
          description: 'Prompting for first number',
        },
        {
          line: 7,
          vars: { num1: 10.5 },
          output: 'Enter first number: ',
          description: 'Reading first number (assuming user entered 10.5)',
        },
        {
          line: 9,
          vars: { num1: 10.5 },
          output: 'Enter first number: Enter second number: ',
          description: 'Prompting for second number',
        },
        {
          line: 10,
          vars: { num1: 10.5, num2: 20.5 },
          output: 'Enter first number: Enter second number: ',
          description: 'Reading second number (assuming user entered 20.5)',
        },
        {
          line: 12,
          vars: { num1: 10.5, num2: 20.5 },
          output: 'Enter first number: Enter second number: Enter third number: ',
          description: 'Prompting for third number',
        },
        {
          line: 13,
          vars: { num1: 10.5, num2: 20.5, num3: 30.5 },
          output: 'Enter first number: Enter second number: Enter third number: ',
          description: 'Reading third number (assuming user entered 30.5)',
        },
        {
          line: 15,
          vars: { num1: 10.5, num2: 20.5, num3: 30.5, average: 20.5 },
          output: 'Enter first number: Enter second number: Enter third number: ',
          description: 'Calculating average: (10.5 + 20.5 + 30.5) / 3 = 20.5',
        },
        {
          line: 16,
          vars: { num1: 10.5, num2: 20.5, num3: 30.5, average: 20.5 },
          output: 'Enter first number: Enter second number: Enter third number: Average: 20.50\\n',
          description: 'Displaying formatted average with 2 decimal places',
        },
        {
          line: 18,
          vars: { num1: 10.5, num2: 20.5, num3: 30.5, average: 20.5 },
          output: 'Enter first number: Enter second number: Enter third number: Average: 20.50\\n',
          description: 'Closing Scanner',
        },
      ] as DryRunStep[],
    },
    {
      question: 'Write a program to read a sentence and display the number of characters in it.',
      solution: 'Read a string using nextLine(), get its length using length() method, and display the count.',
      solutionCode: `import java.util.Scanner;

public class CharacterCount {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a sentence: ");
        String sentence = sc.nextLine();
        
        int count = sentence.length();
        System.out.println("Number of characters: " + count);
        
        sc.close();
    }
}`,
      dryRunCode: `import java.util.Scanner;

public class CharacterCount {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a sentence: ");
        String sentence = sc.nextLine();
        
        int count = sentence.length();
        System.out.println("Number of characters: " + count);
        
        sc.close();
    }
}`,
      dryRunSteps: [
        {
          line: 4,
          vars: {},
          output: '',
          description: 'Creating Scanner object',
        },
        {
          line: 6,
          vars: {},
          output: 'Enter a sentence: ',
          description: 'Prompting for sentence input',
        },
        {
          line: 7,
          vars: { sentence: 'Hello World' },
          output: 'Enter a sentence: ',
          description: 'Reading sentence (assuming user entered "Hello World")',
        },
        {
          line: 9,
          vars: { sentence: 'Hello World', count: 11 },
          output: 'Enter a sentence: ',
          description: 'Calculating length: "Hello World".length() = 11',
        },
        {
          line: 10,
          vars: { sentence: 'Hello World', count: 11 },
          output: 'Enter a sentence: Number of characters: 11\\n',
          description: 'Displaying character count',
        },
        {
          line: 12,
          vars: { sentence: 'Hello World', count: 11 },
          output: 'Enter a sentence: Number of characters: 11\\n',
          description: 'Closing Scanner',
        },
      ] as DryRunStep[],
    },
  ] as PracticeQuestion[],
  dryRunCode: `import java.util.Scanner;

public class InputOutput {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        
        sc.close();
    }
}`,
  dryRunSteps: [
    {
      line: 4,
      vars: {},
      output: '',
      description: 'Creating Scanner object to read input',
    },
    {
      line: 6,
      vars: {},
      output: 'Enter your name: ',
      description: 'Prompting user for name',
    },
    {
      line: 7,
      vars: { name: 'John' },
      output: 'Enter your name: ',
      description: 'Reading name from input (assuming user entered "John")',
    },
    {
      line: 9,
      vars: { name: 'John' },
      output: 'Enter your name: Enter your age: ',
      description: 'Prompting user for age',
    },
    {
      line: 10,
      vars: { name: 'John', age: 20 },
      output: 'Enter your name: Enter your age: ',
      description: 'Reading age from input (assuming user entered 20)',
    },
    {
      line: 12,
      vars: { name: 'John', age: 20 },
      output: 'Enter your name: Enter your age: Name: John\\n',
      description: 'Displaying name',
    },
    {
      line: 13,
      vars: { name: 'John', age: 20 },
      output: 'Enter your name: Enter your age: Name: John\\nAge: 20\\n',
      description: 'Displaying age',
    },
    {
      line: 15,
      vars: { name: 'John', age: 20 },
      output: 'Enter your name: Enter your age: Name: John\\nAge: 20\\n',
      description: 'Closing Scanner object',
    },
  ] as DryRunStep[],
}

export default function InputOutputPage() {
  return <TopicPage content={content} />
}
