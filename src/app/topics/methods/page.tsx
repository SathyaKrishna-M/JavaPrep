'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiCode, FiRepeat, FiLayers, FiSettings } from 'react-icons/fi'

const content = {
  title: 'Methods',
  explanationSections: [
    {
      title: 'Introduction to Methods',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Methods</span> are blocks of code that perform a specific task and can be reused.

Benefits:
→ <span class="text-cyan-300">Code reusability</span> - write once, use many times
→ <span class="text-cyan-300">Modularity</span> - break complex problems into smaller parts
→ <span class="text-cyan-300">Easier maintenance</span> - fix bugs in one place
→ <span class="text-cyan-300">Better organization</span> - logical grouping of code

Structure:
→ <span class="text-blue-400">accessModifier returnType methodName(parameters)</span> { ... }
→ <span class="text-amber-300">Example:</span> <span class="text-cyan-300">public static int add(int a, int b) { return a + b; }</span>`,
      code: `public class MethodsIntro {
    // Method definition
    public static void greet() {
        System.out.println("Hello, World!");
    }
    
    public static void main(String[] args) {
        // Method call
        greet();  // Output: Hello, World!
    }
}`,
    },
    {
      title: 'Method Parameters and Return Types',
      icon: <FiSettings className="w-6 h-6" />,
      content: `Methods can accept <span class="text-blue-400 font-semibold">parameters</span> and <span class="text-blue-400 font-semibold">return values</span>.

Return Types:
→ <span class="text-cyan-300">void:</span> doesn't return anything
→ <span class="text-cyan-300">Primitive types:</span> int, double, boolean, char
→ <span class="text-cyan-300">Reference types:</span> String, arrays, objects

Parameters:
→ Methods can have <span class="text-cyan-300">zero or more</span> parameters
→ Parameters are passed <span class="text-blue-400">by value</span> (for primitives)
→ Objects are passed <span class="text-blue-400">by reference</span>`,
      code: `public class MethodParameters {
    // Method with parameters and return
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Method with no parameters
    public static void display() {
        System.out.println("No parameters");
    }
    
    // Method with array parameter
    public static int sum(int[] arr) {
        int total = 0;
        for (int num : arr) {
            total += num;
        }
        return total;
    }
    
    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println("Sum: " + result);  // 8
        
        display();  // No parameters
        
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Array sum: " + sum(numbers));  // 15
    }
}`,
    },
    {
      title: 'Method Overloading',
      icon: <FiRepeat className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Method overloading</span> allows multiple methods with the same name but different parameters.

Rules:
→ <span class="text-cyan-300">Same method name</span>
→ <span class="text-cyan-300">Different number</span> of parameters OR <span class="text-cyan-300">different types</span>
→ <span class="text-amber-300">Return type doesn't matter</span> for overloading
→ Compiler selects method based on arguments

Use Cases:
→ Different ways to perform same operation
→ <span class="text-amber-300">Default parameter values</span> (simulated)`,
      code: `public class MethodOverloading {
    // Overloaded methods
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    public static double multiply(double a, double b) {
        return a * b;
    }
    
    public static int multiply(int a, int b, int c) {
        return a * b * c;
    }
    
    public static void main(String[] args) {
        System.out.println(multiply(4, 5));        // 20 (int version)
        System.out.println(multiply(2.5, 3.5));    // 8.75 (double version)
        System.out.println(multiply(2, 3, 4));      // 24 (three parameters)
    }
}`,
    },
    {
      title: 'Static vs Instance Methods',
      icon: <FiLayers className="w-6 h-6" />,
      content: `Understanding the difference between <span class="text-blue-400 font-semibold">static</span> and <span class="text-blue-400 font-semibold">instance</span> methods.

Static Methods:
→ Belong to the <span class="text-cyan-300">class</span>
→ Called using class name: <span class="text-cyan-300">ClassName.methodName()</span>
→ Cannot access instance variables directly
→ <span class="text-amber-300">Example:</span> <span class="text-cyan-300">main()</span> method

Instance Methods:
→ Belong to <span class="text-cyan-300">objects</span>
→ Called using object reference: <span class="text-cyan-300">object.methodName()</span>
→ Can access instance variables
→ <span class="text-amber-300">Need object creation first</span>`,
      code: `public class StaticVsInstance {
    // Static method
    public static void staticMethod() {
        System.out.println("This is a static method");
    }
    
    // Instance method (would need a class with instance variables)
    public void instanceMethod() {
        System.out.println("This is an instance method");
    }
    
    public static void main(String[] args) {
        // Call static method directly
        staticMethod();
        
        // For instance method, need object
        StaticVsInstance obj = new StaticVsInstance();
        obj.instanceMethod();
    }
}`,
    },
  ] as ExplanationSection[],
  exampleCode: `public class Methods {
    // Method with no parameters and no return
    public static void greet() {
        System.out.println("Hello, World!");
    }
    
    // Method with parameters and return
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Method overloading
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    public static double multiply(double a, double b) {
        return a * b;
    }
    
    // Method with array parameter
    public static int findMax(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }
    
    public static void main(String[] args) {
        // Calling methods
        greet();
        
        int sum = add(5, 3);
        System.out.println("Sum: " + sum);
        
        int product1 = multiply(4, 5);
        double product2 = multiply(2.5, 3.5);
        System.out.println("Product1: " + product1);
        System.out.println("Product2: " + product2);
        
        int[] numbers = {10, 25, 5, 30, 15};
        int max = findMax(numbers);
        System.out.println("Maximum: " + max);
    }
}`,
  practiceQuestions: [
    {
      question: 'Write a program with a method to find factorial of a number.',
      solution: 'Create a method that takes an integer parameter and returns its factorial. Use a loop to multiply numbers from 1 to n.',
      solutionCode: `public class Factorial {
    public static int factorial(int n) {
        int fact = 1;
        for (int i = 1; i <= n; i++) {
            fact *= i;
        }
        return fact;
    }
    
    public static void main(String[] args) {
        int num = 5;
        int result = factorial(num);
        System.out.println("Factorial of " + num + " = " + result);
    }
}`,
    },
  ] as PracticeQuestion[],
}

export default function MethodsPage() {
  return <TopicPage content={content} />
}
