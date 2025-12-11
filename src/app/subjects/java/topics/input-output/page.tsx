'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'

import { FiTerminal, FiPrinter, FiFileText, FiKey, FiMic, FiSpeaker } from 'react-icons/fi'

const content = {
  title: 'Input/Output',
  explanationSections: [
    {
      title: 'Introduction: Talking to the Machine',
      icon: <FiMic className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Input/Output (I/O)</span> is how a user interacts with a program.
            Without I/O, a program is like a person talking to themselves in a sealed room—useless to the outside world.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="flex items-center gap-2 text-cyan-300 font-bold mb-2"><FiMic /> Input (System.in)</h4>
              <p className="text-gray-400 text-sm">Getting data <strong>INTO</strong> the program (Keyboard, Mouse, Files). <br /> <em>Analogy: Your Ears / Microphone.</em></p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-green-300 font-bold mb-2"><FiSpeaker /> Output (System.out)</h4>
              <p className="text-gray-400 text-sm">Sending data <strong>OUT</strong> of the program (Screen, Printer, Files). <br /> <em>Analogy: Your Mouth / Speaker.</em></p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Scanner Class',
      icon: <FiTerminal className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">Scanner</span> class is the tool we use to "listen" to keyboard input.

Key Features:
→ <span class="text-cyan-300">Import required:</span> <span class="text-blue-400">import java.util.Scanner;</span>
→ <span class="text-cyan-300">Create Scanner object:</span> <span class="text-blue-400">Scanner sc = new Scanner(System.in);</span>
→ Read different data types: <span class="text-cyan-300">nextInt()</span>, <span class="text-cyan-300">nextDouble()</span>, <span class="text-cyan-300">nextLine()</span>
→ <span class="text-amber-300">Always close</span> the scanner when done: <span class="text-cyan-300">sc.close();</span>`,
      code: `import java.util.Scanner;

public class ScannerExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
{{ ... }}
}`,
    },
    {
      title: 'Output Methods',
      icon: <FiPrinter className="w-6 h-6" />,
      content: `How we display information to the user.

Methods:
→ <span class="text-cyan-300">System.out.println()</span> - Prints and moves cursor to the <span class="text-amber-300">next line</span>.
→ <span class="text-cyan-300">System.out.print()</span> - Prints stays on the <span class="text-amber-300">same line</span>.
→ <span class="text-cyan-300">System.out.printf()</span> - Formatted print (e.g., controlling decimal places).`,
      code: `public class OutputExample {
    public static void main(String[] args) {
        String name = "Java";
        int version = 17;
        
        System.out.println("Language: " + name); // Moves to next line
        System.out.print("Version: ");           // Stays on same line
        System.out.println(version);
        System.out.printf("Formatted: %s %d%n", name, version);
    }
}`,
    },
    {
      title: 'BufferedReader (Advanced)',
      icon: <FiFileText className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">BufferedReader</span> is an older, slightly faster way to read input, mostly used in competitive programming.

Comparison:
→ <span class="text-green-300">Scanner</span>: Easier to use, parses text (nextInt, nextDouble). Slower.
→ <span class="text-amber-300">BufferedReader</span>: Fast. Reads entire lines. Must parse numbers manually (Integer.parseInt).`,
      code: `import java.io.BufferedReader;
import java.io.InputStreamReader;

public class BufferedReaderExample {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        System.out.print("Enter your name: ");
        String name = br.readLine();
        
        System.out.println("Hello, " + name + "!");
    }
}`,
    },
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Basic Personal Info Collector',
      solution: 'Use Scanner to read a String, int, and double, showing the difference in input methods.',
      steps: [
        {
          step: '1. Setup',
          explanation: 'Import Scanner and create an instance connected to System.in.'
        },
        {
          step: '2. Input',
          explanation: 'Prompt and read name (String), age (int), and height (double).'
        },
        {
          step: '3. Output',
          explanation: 'Print all collected data back to the user.'
        }
      ],
      code: `import java.util.Scanner;

public class InputOutput {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        
        System.out.print("Enter your height: ");
        double height = sc.nextDouble(); // example: 5.9
        
        System.out.println("\\n=== Your Information ===");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height + " ft");
        
        sc.close();
    }
}`
    }
  ] as ExampleProblem[],
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
    },

  ] as PracticeQuestion[],
}

export default function InputOutputPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
