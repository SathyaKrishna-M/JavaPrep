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
    {
      question: 'Develop a Java program to create a Student class with attributes id, name, branch, fee. Class should have methods to accept the data and print the data.',
      solution: 'Create a Student class with attributes id, name, branch, fee. Create acceptData() method using Scanner to read input, and printData() method to display all information. Use methods to handle input and output operations.',
      solutionCode: `import java.util.Scanner;

class Student {
    int id;
    String name;
    String branch;
    double fee;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Student ID: ");
        this.id = sc.nextInt();
        sc.nextLine(); // consume newline
        System.out.print("Enter Student Name: ");
        this.name = sc.nextLine();
        System.out.print("Enter Branch: ");
        this.branch = sc.nextLine();
        System.out.print("Enter Fee: ");
        this.fee = sc.nextDouble();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Student Details ===");
        System.out.println("Student ID: " + this.id);
        System.out.println("Student Name: " + this.name);
        System.out.println("Branch: " + this.branch);
        System.out.println("Fee: ₹" + this.fee);
    }
}

public class StudentDemo {
    public static void main(String[] args) {
        Student student = new Student();
        student.acceptData();
        student.printData();
    }
}`,
    },
    {
      question: 'Develop a Java program to find square value and cube value of a number using two separate methods. Each method should take number as parameter and should return the square value and cube value respectively.',
      solution: 'Create two separate methods: square() to calculate and return square of a number (n * n), and cube() to calculate and return cube of a number (n * n * n). Both methods take a number as parameter and return the calculated value.',
      solutionCode: `public class SquareCube {
    // Method to find square of a number
    public static int square(int num) {
        return num * num;
    }
    
    // Method to find cube of a number
    public static int cube(int num) {
        return num * num * num;
    }
    
    public static void main(String[] args) {
        int number = 5;
        int squareValue = square(number);
        int cubeValue = cube(number);
        System.out.println("Number: " + number);
        System.out.println("Square: " + squareValue);
        System.out.println("Cube: " + cubeValue);
    }
}`,
    },
    {
      question: 'Develop a Java program to find sum of any two numbers using a method. Method should take two integers as parameters, find the sum and should return the sum.',
      solution: 'Create a method that takes two integer parameters, calculates their sum, and returns the result. The method signature should be: public static int sum(int a, int b).',
      solutionCode: `public class SumTwoNumbers {
    // Method to find sum of two numbers
    public static int sum(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        int num1 = 15;
        int num2 = 25;
        int result = sum(num1, num2);
        System.out.println("Sum of " + num1 + " and " + num2 + " = " + result);
    }
}`,
    },
    {
      question: 'Develop a Java program to find sum of the first n natural numbers using a method. Method should take number as parameter and should return the sum.',
      solution: 'Create a method that takes an integer n as parameter, calculates the sum of first n natural numbers (1 + 2 + 3 + ... + n) using a loop, and returns the sum. Formula can also be used: n * (n + 1) / 2.',
      solutionCode: `public class SumNaturalNumbers {
    // Method to find sum of first n natural numbers
    public static int sumNatural(int n) {
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    }
    
    public static void main(String[] args) {
        int n = 10;
        int total = sumNatural(n);
        System.out.println("Sum of first " + n + " natural numbers: " + total);
    }
}`,
    },
    {
      question: 'Develop a Java program to calculate area & perimeter of rectangle using two separate methods. Methods should take length & breadth as parameters and should return area & perimeter.',
      solution: 'Create two separate methods: calculateArea() that takes length and breadth as parameters and returns area (length * breadth), and calculatePerimeter() that takes length and breadth and returns perimeter (2 * (length + breadth)).',
      solutionCode: `public class RectangleAreaPerimeter {
    // Method to calculate area of rectangle
    public static double calculateArea(double length, double breadth) {
        return length * breadth;
    }
    
    // Method to calculate perimeter of rectangle
    public static double calculatePerimeter(double length, double breadth) {
        return 2 * (length + breadth);
    }
    
    public static void main(String[] args) {
        double length = 10.5;
        double breadth = 5.5;
        double area = calculateArea(length, breadth);
        double perimeter = calculatePerimeter(length, breadth);
        System.out.println("Length: " + length);
        System.out.println("Breadth: " + breadth);
        System.out.println("Area: " + area);
        System.out.println("Perimeter: " + perimeter);
    }
}`,
    },
    {
      question: 'DJP [Develop a Java Program] to find given number is odd or even and also prime.',
      solution: 'Create methods to check if a number is odd/even and prime. isEven() returns true if number % 2 == 0. isPrime() checks if number is divisible only by 1 and itself. Use loops to check divisibility from 2 to sqrt(n).',
      solutionCode: `public class NumberCheck {
    // Method to check if number is even
    public static boolean isEven(int num) {
        return num % 2 == 0;
    }
    
    // Method to check if number is odd
    public static boolean isOdd(int num) {
        return num % 2 != 0;
    }
    
    // Method to check if number is prime
    public static boolean isPrime(int num) {
        if (num <= 1) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
    
    public static void main(String[] args) {
        int number = 17;
        System.out.println("Number: " + number);
        System.out.println("Is Even: " + isEven(number));
        System.out.println("Is Odd: " + isOdd(number));
        System.out.println("Is Prime: " + isPrime(number));
    }
}`,
    },
    {
      question: 'Develop a Java program to find the given number is perfect number or not using a method. Method should take number as parameter & should return true if number is perfect otherwise should return false.',
      solution: 'Create a method that takes a number as parameter and checks if it is a perfect number. A perfect number is equal to the sum of its proper divisors (excluding itself). Find all divisors, sum them, and compare with the number.',
      solutionCode: `public class PerfectNumber {
    // Method to check if number is perfect
    public static boolean isPerfect(int num) {
        if (num <= 1) {
            return false;
        }
        int sum = 0;
        for (int i = 1; i < num; i++) {
            if (num % i == 0) {
                sum += i;
            }
        }
        return sum == num;
    }
    
    public static void main(String[] args) {
        int number = 28;
        boolean result = isPerfect(number);
        if (result) {
            System.out.println(number + " is a perfect number");
        } else {
            System.out.println(number + " is not a perfect number");
        }
    }
}`,
    },
  ] as PracticeQuestion[],
}

export default function MethodsPage() {
  return <TopicPage content={content} />
}
