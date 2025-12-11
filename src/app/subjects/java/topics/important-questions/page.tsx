'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DMTopicPage'
import { FiCode, FiBook, FiTarget, FiHelpCircle, FiList, FiCpu } from 'react-icons/fi'

const content = {
    title: 'Important Questions',
    explanationSections: [
        {
            title: 'Introduction to Java Problem Solving',
            icon: <FiHelpCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        Welcome to the comprehensive collection of <span className="text-blue-400 font-semibold">Important Java Questions</span>.
                        This repository covers essential topics ranging from basic I/O to complex Object-Oriented paradigms.
                        Mastering these questions ensures a strong foundation in Java programming.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Topic Roadmap</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300 text-sm">
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full" />Input/Output Operations</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full" />Control Flow (If-Else, Switch)</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full" />Loops & Nested Loops</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full" />Arrays (1D & 2D)</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full" />Methods & Recursion</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full" />Objects and Classes</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: 'Your First Java Program',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>Every journey begins with a single step. Below is the classic &quot;Hello World&quot; program structure.</p>
                    <div className="p-4 bg-black/50 rounded-lg border border-gray-800 font-mono text-sm leading-relaxed">
                        <span className="text-pink-400">public class</span> <span className="text-yellow-400">HelloWorld</span> {'{'}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">public static void</span> <span className="text-blue-400">main</span>(String[] args) {'{'}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span className="text-green-400">&quot;Hello World&quot;</span>);<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
                        {'}'}
                    </div>
                </div>
            )
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Pattern Printing: Right-Angled Triangle',
            solution: 'Use nested loops: the outer loop controls the rows, and the inner loop controls the columns (stars).',
            steps: [
                {
                    step: '1. Understand the Logic',
                    explanation: 'For row `i`, we print `i` stars. For example, Row 1 has 1 star, Row 2 has 2 stars, etc.'
                },
                {
                    step: '2. Implementation',
                    explanation: (
                        <div className="font-mono text-sm">
                            for (int i = 1; i &lt;= 5; i++) {'{'}<br />
                            &nbsp;&nbsp;for (int j = 1; j &lt;= i; j++) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.print(&quot;* &quot;);<br />
                            &nbsp;&nbsp;{'}'}<br />
                            &nbsp;&nbsp;System.out.println(); // New line after each row<br />
                            {'}'}
                        </div>
                    )
                }
            ]
        },
        {
            problem: 'Fibonacci Series (First N terms)',
            solution: 'Use variables to store previous two numbers and update them in a loop.',
            steps: [
                {
                    step: '1. Initialization',
                    explanation: 'Start with term1 = 0, term2 = 1. Print them.'
                },
                {
                    step: '2. Loop from 3 to N',
                    explanation: 'Calculate nextTerm = term1 + term2. Print nextTerm. Update term1 = term2, term2 = nextTerm.'
                }
            ]
        }
    ],
    practiceQuestions: [
        // ==================== I/O STATEMENTS ====================
        {
            question: '1. Write a Java program to display "Hello World".',
            solution: 'Use System.out.println() to display the message.',
            solutionCode: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
        },
        {
            question: '2. Write a Java program to perform basic arithmetic operations (+, -, *, /) on 2 int values and display result.',
            solution: 'Read two integers, perform all arithmetic operations, and display the results.',
            solutionCode: `import java.util.Scanner;

public class ArithmeticOperations {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int a = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int b = sc.nextInt();
        
        System.out.println("Addition: " + (a + b));
        System.out.println("Subtraction: " + (a - b));
        System.out.println("Multiplication: " + (a * b));
        System.out.println("Division: " + (a / b));
        
        sc.close();
    }
}`,
        },
        {
            question: '3. Write a Java program to find the area of triangle.',
            solution: 'Area of triangle = (base * height) / 2',
            solutionCode: `import java.util.Scanner;

public class TriangleArea {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter base: ");
        double base = sc.nextDouble();
        
        System.out.print("Enter height: ");
        double height = sc.nextDouble();
        
        double area = (base * height) / 2;
        System.out.println("Area of triangle: " + area);
        
        sc.close();
    }
}`,
        },
        {
            question: '4. Write a Java program to find the area of rectangle.',
            solution: 'Area of rectangle = length * breadth',
            solutionCode: `import java.util.Scanner;

public class RectangleArea {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter length: ");
        double length = sc.nextDouble();
        
        System.out.print("Enter breadth: ");
        double breadth = sc.nextDouble();
        
        double area = length * breadth;
        System.out.println("Area of rectangle: " + area);
        
        sc.close();
    }
}`,
        },
        {
            question: '5. Write a Java program to find the area of square.',
            solution: 'Area of square = side * side',
            solutionCode: `import java.util.Scanner;

public class SquareArea {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter side: ");
        double side = sc.nextDouble();
        
        double area = side * side;
        System.out.println("Area of square: " + area);
        
        sc.close();
    }
}`,
        },
        {
            question: '6. Write a Java program to find the perimeter of rectangle.',
            solution: 'Perimeter of rectangle = 2 * (length + breadth)',
            solutionCode: `import java.util.Scanner;

public class RectanglePerimeter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter length: ");
        double length = sc.nextDouble();
        
        System.out.print("Enter breadth: ");
        double breadth = sc.nextDouble();
        
        double perimeter = 2 * (length + breadth);
        System.out.println("Perimeter of rectangle: " + perimeter);
        
        sc.close();
    }
}`,
        },
        {
            question: '7. Write a Java program to find the perimeter of square.',
            solution: 'Perimeter of square = 4 * side',
            solutionCode: `import java.util.Scanner;

public class SquarePerimeter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter side: ");
        double side = sc.nextDouble();
        
        double perimeter = 4 * side;
        System.out.println("Perimeter of square: " + perimeter);
        
        sc.close();
    }
}`,
        },
        {
            question: '8. Write a Java program to find the Perimeter of Cuboid = 4(l + b + h).',
            solution: 'Perimeter of cuboid = 4 * (length + breadth + height)',
            solutionCode: `import java.util.Scanner;

public class CuboidPerimeter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter length: ");
        double l = sc.nextDouble();
        
        System.out.print("Enter breadth: ");
        double b = sc.nextDouble();
        
        System.out.print("Enter height: ");
        double h = sc.nextDouble();
        
        double perimeter = 4 * (l + b + h);
        System.out.println("Perimeter of cuboid: " + perimeter);
        
        sc.close();
    }
}`,
        },
        {
            question: '9. Write a Java program to find the Perimeter of cube = 4(a + a + a).',
            solution: 'Perimeter of cube = 4 * (a + a + a) = 12 * a',
            solutionCode: `import java.util.Scanner;

public class CubePerimeter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter edge length: ");
        double a = sc.nextDouble();
        
        double perimeter = 4 * (a + a + a);
        System.out.println("Perimeter of cube: " + perimeter);
        
        sc.close();
    }
}`,
        },
        {
            question: '10. Write a Java program to find the Volume of the Cuboid = (l x b x h) cubic units.',
            solution: 'Volume of cuboid = length * breadth * height',
            solutionCode: `import java.util.Scanner;

public class CuboidVolume {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter length: ");
        double l = sc.nextDouble();
        
        System.out.print("Enter breadth: ");
        double b = sc.nextDouble();
        
        System.out.print("Enter height: ");
        double h = sc.nextDouble();
        
        double volume = l * b * h;
        System.out.println("Volume of cuboid: " + volume + " cubic units");
        
        sc.close();
    }
}`,
        },
        {
            question: '11. Write a Java program to find the Volume of Cube = edge x edge x edge = a³ cubic units.',
            solution: 'Volume of cube = a * a * a = a³',
            solutionCode: `import java.util.Scanner;

public class CubeVolume {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter edge length: ");
        double a = sc.nextDouble();
        
        double volume = a * a * a;
        System.out.println("Volume of cube: " + volume + " cubic units");
        
        sc.close();
    }
}`,
        },
        {
            question: '12. Write a Java program to find the Circumference (C) of a circle = 2πr.',
            solution: 'Circumference = 2 * π * radius, where π = 3.14159',
            solutionCode: `import java.util.Scanner;

public class CircleCircumference {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        final double PI = 3.14159;
        
        System.out.print("Enter radius: ");
        double r = sc.nextDouble();
        
        double circumference = 2 * PI * r;
        System.out.println("Circumference of circle: " + circumference);
        
        sc.close();
    }
}`,
        },
        {
            question: '13. Write a Java program to calculate vegetable bill for the given quantity and cost of 4 vegetables.',
            solution: 'Read quantity and cost for 4 vegetables, calculate total bill.',
            solutionCode: `import java.util.Scanner;

public class VegetableBill {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        double totalBill = 0;
        
        for (int i = 1; i <= 4; i++) {
            System.out.print("Enter quantity for vegetable " + i + ": ");
            double quantity = sc.nextDouble();
            
            System.out.print("Enter cost per unit for vegetable " + i + ": ");
            double cost = sc.nextDouble();
            
            double bill = quantity * cost;
            totalBill += bill;
            System.out.println("Bill for vegetable " + i + ": " + bill);
        }
        
        System.out.println("Total vegetable bill: " + totalBill);
        sc.close();
    }
}`,
        },
        {
            question: '14. Write a Java program to find the cost of one dozen apple for the given cost for 1Kg as input (assume 1Kg has 3 apples).',
            solution: '1 dozen = 12 apples. If 1Kg = 3 apples, then 12 apples = 4Kg. Cost of 1 dozen = 4 * cost per Kg',
            solutionCode: `import java.util.Scanner;

public class AppleCost {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter cost per Kg: ");
        double costPerKg = sc.nextDouble();
        
        // 1 dozen = 12 apples, 1Kg = 3 apples
        // 12 apples = 4Kg
        double costPerDozen = 4 * costPerKg;
        
        System.out.println("Cost of one dozen apples: " + costPerDozen);
        
        sc.close();
    }
}`,
        },
        {
            question: '15. Write a Java program to convert the given temperature in centigrade to fahrenheit.',
            solution: 'Fahrenheit = (Centigrade * 9/5) + 32',
            solutionCode: `import java.util.Scanner;

public class TemperatureConversion {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter temperature in Centigrade: ");
        double celsius = sc.nextDouble();
        
        double fahrenheit = (celsius * 9.0 / 5.0) + 32;
        System.out.println("Temperature in Fahrenheit: " + fahrenheit);
        
        sc.close();
    }
}`,
        },
        {
            question: '16. Write a Java program to calculate percentage of marks for the given 5 subject marks.',
            solution: 'Percentage = (sum of marks / total marks) * 100. Assume each subject has 100 marks.',
            solutionCode: `import java.util.Scanner;

public class PercentageCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int totalMarks = 0;
        int maxMarksPerSubject = 100;
        
        for (int i = 1; i <= 5; i++) {
            System.out.print("Enter marks for subject " + i + ": ");
            int marks = sc.nextInt();
            totalMarks += marks;
        }
        
        int totalMaxMarks = 5 * maxMarksPerSubject;
        double percentage = (totalMarks * 100.0) / totalMaxMarks;
        
        System.out.println("Total marks: " + totalMarks);
        System.out.println("Percentage: " + percentage + "%");
        
        sc.close();
    }
}`,
        },
        {
            question: '17. Write a Java program to find total travel bill by taking 3 inputs: rate per Km, waiting charge per hr, no.of Kms travelled.',
            solution: 'Total bill = (rate per Km * distance) + (waiting charge per hr * waiting hours)',
            solutionCode: `import java.util.Scanner;

public class TravelBill {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rate per Km: ");
        double ratePerKm = sc.nextDouble();
        
        System.out.print("Enter waiting charge per hour: ");
        double waitingCharge = sc.nextDouble();
        
        System.out.print("Enter distance in Kms: ");
        double distance = sc.nextDouble();
        
        System.out.print("Enter waiting hours: ");
        double waitingHours = sc.nextDouble();
        
        double totalBill = (ratePerKm * distance) + (waitingCharge * waitingHours);
        System.out.println("Total travel bill: " + totalBill);
        
        sc.close();
    }
}`,
        },
        {
            question: '18. Write a Java program to find sum of first digit and last digit in a given 4 digit number as input.',
            solution: 'Extract first digit by dividing by 1000, last digit by modulo 10.',
            solutionCode: `import java.util.Scanner;

public class FirstLastDigit {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a 4-digit number: ");
        int num = sc.nextInt();
        
        int firstDigit = num / 1000;
        int lastDigit = num % 10;
        
        int sum = firstDigit + lastDigit;
        System.out.println("First digit: " + firstDigit);
        System.out.println("Last digit: " + lastDigit);
        System.out.println("Sum: " + sum);
        
        sc.close();
    }
}`,
        },
        {
            question: '19. Write a Java program to find middle digit from the given three digit number (separate 3rd digit).',
            solution: 'For a 3-digit number, extract the middle digit by (num / 10) % 10',
            solutionCode: `import java.util.Scanner;

public class MiddleDigit {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a 3-digit number: ");
        int num = sc.nextInt();
        
        int middleDigit = (num / 10) % 10;
        
        System.out.println("Middle digit: " + middleDigit);
        
        sc.close();
    }
}`,
        },
        {
            question: '20. Write a Java program to find product of given 4 digit number.',
            solution: 'Extract each digit and multiply them together.',
            solutionCode: `import java.util.Scanner;

public class ProductOfDigits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a 4-digit number: ");
        int num = sc.nextInt();
        
        int digit1 = num / 1000;
        int digit2 = (num / 100) % 10;
        int digit3 = (num / 10) % 10;
        int digit4 = num % 10;
        
        int product = digit1 * digit2 * digit3 * digit4;
        System.out.println("Product of digits: " + product);
        
        sc.close();
    }
}`,
        },
        // ==================== CONDITIONAL STATEMENTS ====================
        {
            question: '1. Write a Java program to display "good" or "bad" based on the given number. Display "good" if number ends with 0, else "bad".',
            solution: 'Check if the last digit (num % 10) is 0.',
            solutionCode: `import java.util.Scanner;

public class GoodBad {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        if (num % 10 == 0) {
            System.out.println("good");
        } else {
            System.out.println("bad");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '2. Write a Java program to find whether student is eligible to write exam or not for the given attendance as input. If >=85% eligible, else not eligible.',
            solution: 'Check if attendance is greater than or equal to 85.',
            solutionCode: `import java.util.Scanner;

public class ExamEligibility {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter attendance percentage: ");
        double attendance = sc.nextDouble();
        
        if (attendance >= 85) {
            System.out.println("Eligible to write exam");
        } else {
            System.out.println("Not eligible");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '3. Write a Java program to find difference between you and your sibling for the given age.',
            solution: 'Calculate absolute difference between two ages.',
            solutionCode: `import java.util.Scanner;

public class AgeDifference {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter your age: ");
        int myAge = sc.nextInt();
        
        System.out.print("Enter sibling age: ");
        int siblingAge = sc.nextInt();
        
        int difference = Math.abs(myAge - siblingAge);
        System.out.println("Age difference: " + difference + " years");
        
        sc.close();
    }
}`,
        },
        {
            question: '4. Write a Java program to find product of two numbers when the first number is less than second number, otherwise find quotient and remainder.',
            solution: 'If first < second, find product. Otherwise, find quotient and remainder.',
            solutionCode: `import java.util.Scanner;

public class ProductOrQuotient {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int num1 = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int num2 = sc.nextInt();
        
        if (num1 < num2) {
            int product = num1 * num2;
            System.out.println("Product: " + product);
        } else {
            int quotient = num1 / num2;
            int remainder = num1 % num2;
            System.out.println("Quotient: " + quotient);
            System.out.println("Remainder: " + remainder);
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '5. Write a Java program to find whether the given year is leap year or not.',
            solution: 'A year is leap if divisible by 4, but not by 100, unless also divisible by 400.',
            solutionCode: `import java.util.Scanner;

public class LeapYear {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter year: ");
        int year = sc.nextInt();
        
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            System.out.println(year + " is a leap year");
        } else {
            System.out.println(year + " is not a leap year");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '6. Write a Java program to find whether you are eligible to apply driving license for the given age as input (>=18).',
            solution: 'Check if age is greater than or equal to 18.',
            solutionCode: `import java.util.Scanner;

public class DrivingLicense {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter age: ");
        int age = sc.nextInt();
        
        if (age >= 18) {
            System.out.println("Eligible to apply for driving license");
        } else {
            System.out.println("Not eligible");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '7. Write a Java program to display weather condition based on the given temperature as input: <=10: Very cool, Between 10&20: Cool, Between 20&30: Normal, Between 30&40: Hot, More than 40: very hot.',
            solution: 'Use if-else if ladder to check temperature ranges.',
            solutionCode: `import java.util.Scanner;

public class WeatherCondition {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter temperature: ");
        double temp = sc.nextDouble();
        
        if (temp <= 10) {
            System.out.println("Very cool");
        } else if (temp > 10 && temp <= 20) {
            System.out.println("Cool");
        } else if (temp > 20 && temp <= 30) {
            System.out.println("Normal");
        } else if (temp > 30 && temp <= 40) {
            System.out.println("Hot");
        } else {
            System.out.println("very hot");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '8. Write a Java program to find income tax and net salary for the given salary as input: <30K: No tax, 30K-50K: 5%, 50K-75K: 10%, 75K-1L: 15%, >1L: 20%.',
            solution: 'Calculate income tax based on salary ranges and subtract from salary to get net salary.',
            solutionCode: `import java.util.Scanner;

public class IncomeTax {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter salary: ");
        double salary = sc.nextDouble();
        double incomeTax = 0;
        
        if (salary < 30000) {
            incomeTax = 0;
        } else if (salary >= 30000 && salary < 50000) {
            incomeTax = salary * 0.05;
        } else if (salary >= 50000 && salary < 75000) {
            incomeTax = salary * 0.10;
        } else if (salary >= 75000 && salary < 100000) {
            incomeTax = salary * 0.15;
        } else {
            incomeTax = salary * 0.20;
        }
        
        double netSalary = salary - incomeTax;
        
        System.out.println("Income Tax: " + incomeTax);
        System.out.println("Net Salary: " + netSalary);
        
        sc.close();
    }
}`,
        },
        {
            question: '9. Write a Java program to calculate BMI for the given weight & height as input. (Height in cm, Weight in kg) Determine if underweight, normal, overweight or obese. BMI = weight/(height²).',
            solution: 'Convert height from cm to meters, calculate BMI, then check ranges: <18: underweight, 18-24: normal, 24-30: overweight, >30: obese.',
            solutionCode: `import java.util.Scanner;

public class BMI {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter weight (kg): ");
        double weight = sc.nextDouble();
        
        System.out.print("Enter height (cm): ");
        double height = sc.nextDouble();
        
        // Convert height from cm to meters
        double heightInMeters = height / 100.0;
        double bmi = weight / (heightInMeters * heightInMeters);
        
        System.out.println("BMI: " + bmi);
        
        if (bmi < 18) {
            System.out.println("Status: Under weight");
        } else if (bmi >= 18 && bmi < 24) {
            System.out.println("Status: Normal");
        } else if (bmi >= 24 && bmi < 30) {
            System.out.println("Status: Over weight");
        } else {
            System.out.println("Status: Obese");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '10. Write a Java program to find whether the given number is positive, negative or zero.',
            solution: 'Check if number is greater than, less than, or equal to zero.',
            solutionCode: `import java.util.Scanner;

public class PositiveNegative {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        if (num > 0) {
            System.out.println("Positive");
        } else if (num < 0) {
            System.out.println("Negative");
        } else {
            System.out.println("Neutral (Zero)");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '11. Write a Java program to find the nature of the triangle based on the given angle as input.',
            solution: 'Check if triangle is acute (all angles < 90), right (one angle = 90), or obtuse (one angle > 90).',
            solutionCode: `import java.util.Scanner;

public class TriangleNature {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first angle: ");
        int angle1 = sc.nextInt();
        
        System.out.print("Enter second angle: ");
        int angle2 = sc.nextInt();
        
        System.out.print("Enter third angle: ");
        int angle3 = sc.nextInt();
        
        if (angle1 + angle2 + angle3 != 180) {
            System.out.println("Invalid triangle");
        } else if (angle1 == 90 || angle2 == 90 || angle3 == 90) {
            System.out.println("Right-angled triangle");
        } else if (angle1 > 90 || angle2 > 90 || angle3 > 90) {
            System.out.println("Obtuse-angled triangle");
        } else {
            System.out.println("Acute-angled triangle");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '12. Write a Java program to find increment in salary for the given experience as input: >10 years: 20%, 5-10 years: 10%, 2-5 years: 5%, <2 years: No increment.',
            solution: 'Calculate salary increment based on experience ranges.',
            solutionCode: `import java.util.Scanner;

public class SalaryIncrement {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter salary: ");
        double salary = sc.nextDouble();
        
        System.out.print("Enter experience (years): ");
        int experience = sc.nextInt();
        
        double increment = 0;
        double incrementPercent = 0;
        
        if (experience > 10) {
            incrementPercent = 20;
        } else if (experience >= 5 && experience <= 10) {
            incrementPercent = 10;
        } else if (experience >= 2 && experience < 5) {
            incrementPercent = 5;
        } else {
            incrementPercent = 0;
        }
        
        increment = salary * incrementPercent / 100;
        double newSalary = salary + increment;
        
        System.out.println("Increment: " + incrementPercent + "%");
        System.out.println("Increment amount: " + increment);
        System.out.println("New salary: " + newSalary);
        
        sc.close();
    }
}`,
        },
        {
            question: '13. A student has attempted three tests. Display the highest marks of the three tests.',
            solution: 'Compare three marks and find the maximum.',
            solutionCode: `import java.util.Scanner;

public class HighestMarks {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter marks of test 1: ");
        int marks1 = sc.nextInt();
        
        System.out.print("Enter marks of test 2: ");
        int marks2 = sc.nextInt();
        
        System.out.print("Enter marks of test 3: ");
        int marks3 = sc.nextInt();
        
        int highest = marks1;
        if (marks2 > highest) {
            highest = marks2;
        }
        if (marks3 > highest) {
            highest = marks3;
        }
        
        System.out.println("Highest marks: " + highest);
        
        sc.close();
    }
}`,
        },
        {
            question: '14. Check whether the entered input character is alphabet, digit or a special symbol.',
            solution: 'Use Character.isLetter() and Character.isDigit() methods.',
            solutionCode: `import java.util.Scanner;

public class CharacterType {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);
        
        if (Character.isLetter(ch)) {
            System.out.println("Alphabet");
        } else if (Character.isDigit(ch)) {
            System.out.println("Digit");
        } else {
            System.out.println("Special symbol");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '15. A shopkeeper buys an item and again sells it. Determine whether the shopkeeper made a profit, loss, or no profit/no loss.',
            solution: 'Compare buying price and selling price.',
            solutionCode: `import java.util.Scanner;

public class ProfitLoss {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter buying price: ");
        double buyingPrice = sc.nextDouble();
        
        System.out.print("Enter selling price: ");
        double sellingPrice = sc.nextDouble();
        
        if (sellingPrice > buyingPrice) {
            double profit = sellingPrice - buyingPrice;
            System.out.println("Profit: " + profit);
        } else if (sellingPrice < buyingPrice) {
            double loss = buyingPrice - sellingPrice;
            System.out.println("Loss: " + loss);
        } else {
            System.out.println("No profit, no loss");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '16. Take the length of the three sides of a triangle and check the type of triangle (isosceles, scalene, equilateral).',
            solution: 'Equilateral: all sides equal, Isosceles: two sides equal, Scalene: all sides different.',
            solutionCode: `import java.util.Scanner;

public class TriangleType {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter side 1: ");
        double side1 = sc.nextDouble();
        
        System.out.print("Enter side 2: ");
        double side2 = sc.nextDouble();
        
        System.out.print("Enter side 3: ");
        double side3 = sc.nextDouble();
        
        if (side1 == side2 && side2 == side3) {
            System.out.println("Equilateral triangle");
        } else if (side1 == side2 || side2 == side3 || side1 == side3) {
            System.out.println("Isosceles triangle");
        } else {
            System.out.println("Scalene triangle");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '17. Read the highest angle of a triangle. Determine whether it is acute, obtuse or a right angle triangle.',
            solution: 'Right angle: 90°, Obtuse: >90°, Acute: <90°.',
            solutionCode: `import java.util.Scanner;

public class TriangleAngle {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter highest angle: ");
        int angle = sc.nextInt();
        
        if (angle == 90) {
            System.out.println("Right-angled triangle");
        } else if (angle > 90) {
            System.out.println("Obtuse-angled triangle");
        } else {
            System.out.println("Acute-angled triangle");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '18. Find the roots of a quadratic equation. Determine the type of the roots.',
            solution: 'For ax² + bx + c = 0, discriminant = b² - 4ac. If discriminant > 0: real and distinct, = 0: real and equal, < 0: imaginary.',
            solutionCode: `import java.util.Scanner;

public class QuadraticEquation {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a: ");
        double a = sc.nextDouble();
        
        System.out.print("Enter b: ");
        double b = sc.nextDouble();
        
        System.out.print("Enter c: ");
        double c = sc.nextDouble();
        
        double discriminant = b * b - 4 * a * c;
        
        if (discriminant > 0) {
            System.out.println("Real and distinct roots");
            double root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            double root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            System.out.println("Root 1: " + root1);
            System.out.println("Root 2: " + root2);
        } else if (discriminant == 0) {
            System.out.println("Real and equal roots");
            double root = -b / (2 * a);
            System.out.println("Root: " + root);
        } else {
            System.out.println("Imaginary roots");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '19. On OOR (Out of Range) check whether the speed is within the limit, otherwise display the user to pay fine 1000 rupees.',
            solution: 'Check if speed exceeds the limit (assuming limit is 60 km/h).',
            solutionCode: `import java.util.Scanner;

public class SpeedLimit {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        final int SPEED_LIMIT = 60;
        
        System.out.print("Enter speed: ");
        int speed = sc.nextInt();
        
        if (speed > SPEED_LIMIT) {
            System.out.println("Speed exceeds limit. Pay fine 1000 rupees");
        } else {
            System.out.println("Speed is within limit");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '20. Determine if a person is eligible for a loan. Conditions: a) At least 18 years old, b) Annual income > 300 dollars, c) Employed for at least 2 years.',
            solution: 'Check all three conditions using AND operator.',
            solutionCode: `import java.util.Scanner;

public class LoanEligibility {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter age: ");
        int age = sc.nextInt();
        
        System.out.print("Enter annual income: ");
        double income = sc.nextDouble();
        
        System.out.print("Enter years of employment: ");
        int yearsEmployed = sc.nextInt();
        
        if (age >= 18 && income > 300 && yearsEmployed >= 2) {
            System.out.println("Eligible for loan");
        } else {
            System.out.println("Not eligible for loan");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '21. Write a Java program to display the given alphabet in flip order (A becomes Z, B becomes Y, etc.).',
            solution: 'For uppercase: flipped = (90 - ch + 65), For lowercase: flipped = (122 - ch + 97).',
            solutionCode: `import java.util.Scanner;

public class FlipAlphabet {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter an alphabet: ");
        char ch = sc.next().charAt(0);
        
        char flipped;
        if (ch >= 'A' && ch <= 'Z') {
            flipped = (char) ('Z' - (ch - 'A'));
        } else if (ch >= 'a' && ch <= 'z') {
            flipped = (char) ('z' - (ch - 'a'));
        } else {
            System.out.println("Invalid input");
            sc.close();
            return;
        }
        
        System.out.println("Flipped alphabet: " + flipped);
        sc.close();
    }
}`,
        },
        {
            question: '22. Write a Java program to find the alphabetical position for the given alphabet as input (A=1, B=2, ..., Z=26).',
            solution: 'Convert character to uppercase and subtract 64 (or use char - \'A\' + 1).',
            solutionCode: `import java.util.Scanner;

public class AlphabetPosition {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter an alphabet: ");
        char ch = sc.next().charAt(0);
        
        ch = Character.toUpperCase(ch);
        
        if (ch >= 'A' && ch <= 'Z') {
            int position = ch - 'A' + 1;
            System.out.println("Alphabetical position: " + position);
        } else {
            System.out.println("Invalid input");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '23. Write a Java program to accept the alphabet and find the alphabetical position from reverse order (Z=1, Y=2, ..., A=26).',
            solution: 'For reverse: position = 27 - (ch - \'A\' + 1).',
            solutionCode: `import java.util.Scanner;

public class ReverseAlphabetPosition {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter an alphabet: ");
        char ch = sc.next().charAt(0);
        
        ch = Character.toUpperCase(ch);
        
        if (ch >= 'A' && ch <= 'Z') {
            int position = 27 - (ch - 'A' + 1);
            System.out.println("Reverse alphabetical position: " + position);
        } else {
            System.out.println("Invalid input");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '24. Write a Java program to accept 2 alphabets and display and find the alphabetical gap between them.',
            solution: 'Calculate absolute difference between positions.',
            solutionCode: `import java.util.Scanner;

public class AlphabetGap {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first alphabet: ");
        char ch1 = sc.next().charAt(0);
        
        System.out.print("Enter second alphabet: ");
        char ch2 = sc.next().charAt(0);
        
        ch1 = Character.toUpperCase(ch1);
        ch2 = Character.toUpperCase(ch2);
        
        int pos1 = ch1 - 'A' + 1;
        int pos2 = ch2 - 'A' + 1;
        int gap = Math.abs(pos2 - pos1);
        
        System.out.println("Alphabetical gap: " + gap);
        
        sc.close();
    }
}`,
        },
        {
            question: '25. Write a Java program to accept an alphabet or accept a character and find whether it is in upper case or lower case.',
            solution: 'Use Character.isUpperCase() and Character.isLowerCase() methods.',
            solutionCode: `import java.util.Scanner;

public class CaseCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);
        
        if (Character.isUpperCase(ch)) {
            System.out.println("Upper case");
        } else if (Character.isLowerCase(ch)) {
            System.out.println("Lower case");
        } else {
            System.out.println("Not an alphabet");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '26-29. (Duplicate questions from 21-24, skipping)',
            solution: 'Already covered in previous questions.',
            solutionCode: `// See questions 21-24 for solutions`,
        },
        {
            question: '30. Write a Java program to find income tax percentage for the given salary and gender: Male: <50K: 0%, 50K-75K: 5%, 75K-1L: 10%, >1L: 20%. Female: <1L: 0%, >1L: 10%.',
            solution: 'Use nested if-else to check gender first, then salary ranges.',
            solutionCode: `import java.util.Scanner;

public class IncomeTaxByGender {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter gender (M/F): ");
        char gender = sc.next().charAt(0);
        
        System.out.print("Enter salary: ");
        double salary = sc.nextDouble();
        
        double taxPercent = 0;
        
        if (gender == 'M' || gender == 'm') {
            if (salary < 50000) {
                taxPercent = 0;
            } else if (salary >= 50000 && salary < 75000) {
                taxPercent = 5;
            } else if (salary >= 75000 && salary < 100000) {
                taxPercent = 10;
            } else {
                taxPercent = 20;
            }
        } else if (gender == 'F' || gender == 'f') {
            if (salary < 100000) {
                taxPercent = 0;
            } else {
                taxPercent = 10;
            }
        }
        
        double tax = salary * taxPercent / 100;
        System.out.println("Income tax percentage: " + taxPercent + "%");
        System.out.println("Income tax: " + tax);
        
        sc.close();
    }
}`,
        },
        {
            question: '31. Write a Java program to calculate whether the student is eligible for placement or not for the given 3 inputs (SSC GPA, Inter marks, Btech CGPA).',
            solution: 'Define eligibility criteria (e.g., SSC GPA >= 8, Inter marks >= 85, CGPA >= 7.5).',
            solutionCode: `import java.util.Scanner;

public class PlacementEligibility {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter SSC GPA: ");
        double sscGpa = sc.nextDouble();
        
        System.out.print("Enter Inter marks: ");
        double interMarks = sc.nextDouble();
        
        System.out.print("Enter Btech CGPA: ");
        double cgpa = sc.nextDouble();
        
        if (sscGpa >= 8.0 && interMarks >= 85 && cgpa >= 7.5) {
            System.out.println("Eligible for placement");
        } else {
            System.out.println("Not eligible for placement");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '32. Write a Java program to find the quadrants 1, 2, 3, 4 for the given x, y values.',
            solution: 'Quadrant 1: x>0, y>0; Quadrant 2: x<0, y>0; Quadrant 3: x<0, y<0; Quadrant 4: x>0, y<0.',
            solutionCode: `import java.util.Scanner;

public class Quadrant {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter x: ");
        int x = sc.nextInt();
        
        System.out.print("Enter y: ");
        int y = sc.nextInt();
        
        if (x > 0 && y > 0) {
            System.out.println("Quadrant 1");
        } else if (x < 0 && y > 0) {
            System.out.println("Quadrant 2");
        } else if (x < 0 && y < 0) {
            System.out.println("Quadrant 3");
        } else if (x > 0 && y < 0) {
            System.out.println("Quadrant 4");
        } else {
            System.out.println("On axis");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '33. Write a Java program to take 4 numbers as input and display the numbers except the smallest number.',
            solution: 'Find the smallest number and display all others.',
            solutionCode: `import java.util.Scanner;

public class ExceptSmallest {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number 1: ");
        int num1 = sc.nextInt();
        
        System.out.print("Enter number 2: ");
        int num2 = sc.nextInt();
        
        System.out.print("Enter number 3: ");
        int num3 = sc.nextInt();
        
        System.out.print("Enter number 4: ");
        int num4 = sc.nextInt();
        
        int smallest = num1;
        if (num2 < smallest) smallest = num2;
        if (num3 < smallest) smallest = num3;
        if (num4 < smallest) smallest = num4;
        
        System.out.println("Numbers except smallest:");
        if (num1 != smallest) System.out.println(num1);
        if (num2 != smallest) System.out.println(num2);
        if (num3 != smallest) System.out.println(num3);
        if (num4 != smallest) System.out.println(num4);
        
        sc.close();
    }
}`,
        },
        {
            question: '34. Write a Java program to take 3 attempts in a race and find the average of best two.',
            solution: 'Find the worst time, sum all three, subtract worst, divide by 2.',
            solutionCode: `import java.util.Scanner;

public class BestTwoAverage {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter attempt 1: ");
        double attempt1 = sc.nextDouble();
        
        System.out.print("Enter attempt 2: ");
        double attempt2 = sc.nextDouble();
        
        System.out.print("Enter attempt 3: ");
        double attempt3 = sc.nextDouble();
        
        double worst = attempt1;
        if (attempt2 > worst) worst = attempt2;
        if (attempt3 > worst) worst = attempt3;
        
        double sum = attempt1 + attempt2 + attempt3;
        double bestTwoSum = sum - worst;
        double average = bestTwoSum / 2;
        
        System.out.println("Average of best two: " + average);
        
        sc.close();
    }
}`,
        },
        {
            question: '35. Write a Java program to take a two-digit number and display pure odd, pure even, oddeven, or evenodd.',
            solution: 'Pure odd: both digits odd, Pure even: both digits even, oddeven: first odd second even, evenodd: first even second odd.',
            solutionCode: `import java.util.Scanner;

public class TwoDigitType {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a two-digit number: ");
        int num = sc.nextInt();
        
        int digit1 = num / 10;
        int digit2 = num % 10;
        
        boolean firstOdd = (digit1 % 2 != 0);
        boolean secondOdd = (digit2 % 2 != 0);
        
        if (firstOdd && secondOdd) {
            System.out.println("pure odd");
        } else if (!firstOdd && !secondOdd) {
            System.out.println("pure even");
        } else if (firstOdd && !secondOdd) {
            System.out.println("oddeven");
        } else {
            System.out.println("evenodd");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '36. Write a Java program to test whether the given number is even or odd using switch case.',
            solution: 'Use switch case on number % 2.',
            solutionCode: `import java.util.Scanner;

public class EvenOddSwitch {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        switch (num % 2) {
            case 0:
                System.out.println("Even");
                break;
            case 1:
                System.out.println("Odd");
                break;
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '37. Write a Java program to display "Good Morning", "Good Afternoon", "Good Evening", or "Good Night" based on the given time.',
            solution: 'Time ranges: 5-10 AM: Good Morning, 11 AM-3 PM: Good Afternoon, 4-9 PM: Good Evening, 10 PM-4 AM: Good Night.',
            solutionCode: `import java.util.Scanner;

public class Greeting {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter time (24-hour format, e.g., 14 for 2 PM): ");
        int time = sc.nextInt();
        
        if (time >= 5 && time < 11) {
            System.out.println("Good Morning");
        } else if (time >= 11 && time <= 15) {
            System.out.println("Good Afternoon");
        } else if (time >= 16 && time <= 21) {
            System.out.println("Good Evening");
        } else {
            System.out.println("Good Night");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '38. Write a Java program to find in which department the student has joined using switch case.',
            solution: 'Use switch case for department codes (e.g., CSE, ECE, MECH, etc.).',
            solutionCode: `import java.util.Scanner;

public class Department {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter department code (1-CSE, 2-ECE, 3-MECH, 4-EEE): ");
        int deptCode = sc.nextInt();
        
        switch (deptCode) {
            case 1:
                System.out.println("Computer Science and Engineering");
                break;
            case 2:
                System.out.println("Electronics and Communication Engineering");
                break;
            case 3:
                System.out.println("Mechanical Engineering");
                break;
            case 4:
                System.out.println("Electrical and Electronics Engineering");
                break;
            default:
                System.out.println("Invalid department code");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '39. Write the difference between if statement and switch case.',
            solution: 'Key differences: if-else can handle ranges and complex conditions, switch-case works with discrete values. if-else is more flexible, switch-case is more readable for multiple discrete values.',
            solutionCode: `/*
Differences between if-else and switch-case:

1. Condition Type:
   - if-else: Can handle ranges, complex conditions, boolean expressions
   - switch-case: Works only with discrete values (int, char, String, enum)

2. Flexibility:
   - if-else: More flexible, can use any condition
   - switch-case: Limited to equality checks

3. Performance:
   - if-else: Checks conditions sequentially
   - switch-case: Can use jump tables (more efficient for many cases)

4. Readability:
   - if-else: Better for complex conditions
   - switch-case: Better for multiple discrete values

5. Default:
   - if-else: Uses else for default case
   - switch-case: Uses default keyword

Example:
if-else: if (score >= 90) { ... } else if (score >= 80) { ... }
switch-case: switch (grade) { case 'A': ... case 'B': ... }
*/`,
        },
        {
            question: '40. Write a Java program to swap 2 numbers using XOR operator.',
            solution: 'Use XOR properties: a = a ^ b, b = a ^ b, a = a ^ b.',
            solutionCode: `import java.util.Scanner;

public class SwapXOR {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int a = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int b = sc.nextInt();
        
        System.out.println("Before swap: a = " + a + ", b = " + b);
        
        a = a ^ b;
        b = a ^ b;
        a = a ^ b;
        
        System.out.println("After swap: a = " + a + ", b = " + b);
        
        sc.close();
    }
}`,
        },
        // ==================== LOOPING STATEMENTS ====================
        {
            question: '1. Write a Java program to display all numbers between -n to +n where n is given as input.',
            solution: 'Use a for loop from -n to +n.',
            solutionCode: `import java.util.Scanner;

public class DisplayRange {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = -n; i <= n; i++) {
            System.out.print(i + " ");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '2. Write a Java program to display first n odd numbers.',
            solution: 'Use a loop to display n odd numbers starting from 1.',
            solutionCode: `import java.util.Scanner;

public class FirstNOdd {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        int count = 0;
        int num = 1;
        
        while (count < n) {
            if (num % 2 != 0) {
                System.out.print(num + " ");
                count++;
            }
            num++;
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '3. Write a Java program to display up to n odd numbers.',
            solution: 'Display all odd numbers from 1 to n.',
            solutionCode: `import java.util.Scanner;

public class UptoNOdd {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            if (i % 2 != 0) {
                System.out.print(i + " ");
            }
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '4. Write a Java program to display all factors of x up to n where x and n are given as input.',
            solution: 'Check if x is divisible by numbers from 1 to n.',
            solutionCode: `import java.util.Scanner;

public class FactorsRange {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter x: ");
        int x = sc.nextInt();
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        System.out.println("Factors of " + x + " up to " + n + ":");
        for (int i = 1; i <= n; i++) {
            if (x % i == 0) {
                System.out.print(i + " ");
            }
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '5. Write a Java program to find sum of first n natural numbers using looping statement.',
            solution: 'Use a loop to sum numbers from 1 to n.',
            solutionCode: `import java.util.Scanner;

public class SumNatural {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        
        System.out.println("Sum of first " + n + " natural numbers: " + sum);
        
        sc.close();
    }
}`,
        },
        {
            question: '6. Write a Java program to print "KLH" 50 times.',
            solution: 'Use a for loop to print "KLH" 50 times.',
            solutionCode: `public class PrintKLH {
    public static void main(String[] args) {
        for (int i = 1; i <= 50; i++) {
            System.out.println("KLH");
        }
    }
}`,
        },
        {
            question: '7. Write a Java program to print first n natural numbers (1 to n).',
            solution: 'Use a for loop to print numbers from 1 to n.',
            solutionCode: `import java.util.Scanner;

public class PrintNatural {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            System.out.print(i + " ");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '8. Write a Java program to print first n natural numbers (n to 1).',
            solution: 'Use a for loop to print numbers from n to 1 in reverse.',
            solutionCode: `import java.util.Scanner;

public class PrintNaturalReverse {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = n; i >= 1; i--) {
            System.out.print(i + " ");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '9. Write a Java program to display natural numbers from m to n.',
            solution: 'Use a for loop from m to n.',
            solutionCode: `import java.util.Scanner;

public class NaturalRange {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter m: ");
        int m = sc.nextInt();
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = m; i <= n; i++) {
            System.out.print(i + " ");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '10. Write a Java program to display all even numbers up to n.',
            solution: 'Use a loop to display even numbers from 2 to n.',
            solutionCode: `import java.util.Scanner;

public class EvenNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 2; i <= n; i += 2) {
            System.out.print(i + " ");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '11. Write a Java program to display A to Z.',
            solution: 'Use a loop to display alphabets from A to Z.',
            solutionCode: `public class AtoZ {
    public static void main(String[] args) {
        for (char ch = 'A'; ch <= 'Z'; ch++) {
            System.out.print(ch + " ");
        }
    }
}`,
        },
        {
            question: '12. Write a Java program to display Z to A.',
            solution: 'Use a loop to display alphabets from Z to A in reverse.',
            solutionCode: `public class ZtoA {
    public static void main(String[] args) {
        for (char ch = 'Z'; ch >= 'A'; ch--) {
            System.out.print(ch + " ");
        }
    }
}`,
        },
        {
            question: '13. Write a Java program to display nth multiplication table.',
            solution: 'Use a loop to display multiplication table of n.',
            solutionCode: `import java.util.Scanner;

public class MultiplicationTable {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        System.out.println("Multiplication table of " + n + ":");
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '14. Write a Java program to display all multiples of 9 from m to n range.',
            solution: 'Display all multiples of 9 in the range m to n.',
            solutionCode: `import java.util.Scanner;

public class MultiplesOf9 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter m: ");
        int m = sc.nextInt();
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        System.out.println("Multiples of 9 from " + m + " to " + n + ":");
        for (int i = m; i <= n; i++) {
            if (i % 9 == 0) {
                System.out.print(i + " ");
            }
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '15. Write a Java program to find sum of first n natural numbers.',
            solution: 'Same as question 5.',
            solutionCode: `import java.util.Scanner;

public class SumNatural {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        
        System.out.println("Sum: " + sum);
        
        sc.close();
    }
}`,
        },
        {
            question: '16. Write a Java program to find average of n numbers.',
            solution: 'Read n numbers, sum them, and divide by n.',
            solutionCode: `import java.util.Scanner;

public class Average {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            System.out.print("Enter number " + i + ": ");
            int num = sc.nextInt();
            sum += num;
        }
        
        double average = (double) sum / n;
        System.out.println("Average: " + average);
        
        sc.close();
    }
}`,
        },
        {
            question: '17. Write a Java program to find sum of even and odd numbers separately till n.',
            solution: 'Separate even and odd numbers and sum them separately.',
            solutionCode: `import java.util.Scanner;

public class SumEvenOdd {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        int sumEven = 0;
        int sumOdd = 0;
        
        for (int i = 1; i <= n; i++) {
            if (i % 2 == 0) {
                sumEven += i;
            } else {
                sumOdd += i;
            }
        }
        
        System.out.println("Sum of even numbers: " + sumEven);
        System.out.println("Sum of odd numbers: " + sumOdd);
        
        sc.close();
    }
}`,
        },
        {
            question: '18. Write a Java program to find factors of a number.',
            solution: 'Find all numbers that divide the given number.',
            solutionCode: `import java.util.Scanner;

public class Factors {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        System.out.println("Factors of " + num + ":");
        for (int i = 1; i <= num; i++) {
            if (num % i == 0) {
                System.out.print(i + " ");
            }
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '19. Write a Java program to count number of factors of a number.',
            solution: 'Count how many numbers divide the given number.',
            solutionCode: `import java.util.Scanner;

public class CountFactors {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int count = 0;
        for (int i = 1; i <= num; i++) {
            if (num % i == 0) {
                count++;
            }
        }
        
        System.out.println("Number of factors: " + count);
        
        sc.close();
    }
}`,
        },
        {
            question: '20. Write a Java program to find sum of factors of a number.',
            solution: 'Sum all factors of the given number.',
            solutionCode: `import java.util.Scanner;

public class SumFactors {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int sum = 0;
        for (int i = 1; i <= num; i++) {
            if (num % i == 0) {
                sum += i;
            }
        }
        
        System.out.println("Sum of factors: " + sum);
        
        sc.close();
    }
}`,
        },
        {
            question: '21. Write a Java program to find product of the digits of the given number.',
            solution: 'Extract each digit and multiply them.',
            solutionCode: `import java.util.Scanner;

public class ProductOfDigits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int product = 1;
        while (num > 0) {
            int digit = num % 10;
            product *= digit;
            num /= 10;
        }
        
        System.out.println("Product of digits: " + product);
        
        sc.close();
    }
}`,
        },
        {
            question: '22. Write a Java program to display all multiples of 5 between two given numbers.',
            solution: 'Display all multiples of 5 in the given range.',
            solutionCode: `import java.util.Scanner;

public class MultiplesOf5 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int m = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int n = sc.nextInt();
        
        System.out.println("Multiples of 5 between " + m + " and " + n + ":");
        for (int i = m; i <= n; i++) {
            if (i % 5 == 0) {
                System.out.print(i + " ");
            }
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '23. Write a Java program to test whether the given number is truly even or not.',
            solution: 'A number is truly even if all its digits are even.',
            solutionCode: `import java.util.Scanner;

public class TrulyEven {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        boolean isTrulyEven = true;
        int temp = num;
        
        while (temp > 0) {
            int digit = temp % 10;
            if (digit % 2 != 0) {
                isTrulyEven = false;
                break;
            }
            temp /= 10;
        }
        
        if (isTrulyEven) {
            System.out.println(num + " is truly even");
        } else {
            System.out.println(num + " is not truly even");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '24. Write a Java program to find whether the given number is cyclic number or not (if first digit and last digit are same).',
            solution: 'Check if first and last digits are equal.',
            solutionCode: `import java.util.Scanner;

public class CyclicNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int lastDigit = num % 10;
        int firstDigit = num;
        
        while (firstDigit >= 10) {
            firstDigit /= 10;
        }
        
        if (firstDigit == lastDigit) {
            System.out.println(num + " is a cyclic number");
        } else {
            System.out.println(num + " is not a cyclic number");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '25. Write a Java program to count number of even digits in the given number.',
            solution: 'Count even digits in the number.',
            solutionCode: `import java.util.Scanner;

public class CountEvenDigits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int count = 0;
        while (num > 0) {
            int digit = num % 10;
            if (digit % 2 == 0) {
                count++;
            }
            num /= 10;
        }
        
        System.out.println("Number of even digits: " + count);
        
        sc.close();
    }
}`,
        },
        {
            question: '26. Write a Java program to find whether the given number is prime number or not. If it is prime, find the sum of the digits, otherwise find product of the digit.',
            solution: 'Check if number is prime, then find sum or product of digits accordingly.',
            solutionCode: `import java.util.Scanner;

public class PrimeDigitOperation {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        boolean isPrime = true;
        if (num <= 1) {
            isPrime = false;
        } else {
            for (int i = 2; i <= Math.sqrt(num); i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        
        int temp = num;
        if (isPrime) {
            int sum = 0;
            while (temp > 0) {
                sum += temp % 10;
                temp /= 10;
            }
            System.out.println(num + " is prime. Sum of digits: " + sum);
        } else {
            int product = 1;
            while (temp > 0) {
                product *= temp % 10;
                temp /= 10;
            }
            System.out.println(num + " is not prime. Product of digits: " + product);
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '27. Write a Java program to find whether the given number is super number or not. Super number = sum of first half of the number = sum of second half of the number.',
            solution: 'Split the number into two halves and compare their digit sums.',
            solutionCode: `import java.util.Scanner;

public class SuperNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        String numStr = String.valueOf(num);
        int len = numStr.length();
        
        if (len % 2 != 0) {
            System.out.println("Not a super number (odd digits)");
            sc.close();
            return;
        }
        
        int firstHalf = Integer.parseInt(numStr.substring(0, len / 2));
        int secondHalf = Integer.parseInt(numStr.substring(len / 2));
        
        int sum1 = 0, sum2 = 0;
        
        while (firstHalf > 0) {
            sum1 += firstHalf % 10;
            firstHalf /= 10;
        }
        
        while (secondHalf > 0) {
            sum2 += secondHalf % 10;
            secondHalf /= 10;
        }
        
        if (sum1 == sum2) {
            System.out.println(num + " is a super number");
        } else {
            System.out.println(num + " is not a super number");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '28. Write a Java program to find factorial of a given number.',
            solution: 'Factorial of n = n * (n-1) * (n-2) * ... * 1.',
            solutionCode: `import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        
        long factorial = 1;
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }
        
        System.out.println("Factorial of " + n + ": " + factorial);
        
        sc.close();
    }
}`,
        },
        {
            question: '29. Write a Java program to find sum of the digits of a number.',
            solution: 'Extract each digit and sum them.',
            solutionCode: `import java.util.Scanner;

public class SumOfDigits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int sum = 0;
        while (num > 0) {
            sum += num % 10;
            num /= 10;
        }
        
        System.out.println("Sum of digits: " + sum);
        
        sc.close();
    }
}`,
        },
        {
            question: '30. Write a Java program to check if a given number is palindrome or not.',
            solution: 'Reverse the number and compare with original.',
            solutionCode: `import java.util.Scanner;

public class Palindrome {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int original = num;
        int reverse = 0;
        
        while (num > 0) {
            reverse = reverse * 10 + num % 10;
            num /= 10;
        }
        
        if (original == reverse) {
            System.out.println(original + " is a palindrome");
        } else {
            System.out.println(original + " is not a palindrome");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '31. Write a Java program to check if a given number is Armstrong number or not.',
            solution: 'Armstrong number: sum of cubes of digits equals the number itself.',
            solutionCode: `import java.util.Scanner;

public class Armstrong {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int original = num;
        int sum = 0;
        
        while (num > 0) {
            int digit = num % 10;
            sum += digit * digit * digit;
            num /= 10;
        }
        
        if (original == sum) {
            System.out.println(original + " is an Armstrong number");
        } else {
            System.out.println(original + " is not an Armstrong number");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '32. Write a Java program to generate multiplication table.',
            solution: 'Display multiplication table for a given number.',
            solutionCode: `import java.util.Scanner;

public class MultiplicationTable {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        
        System.out.println("Multiplication table of " + n + ":");
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '33. Write a Java program to check if a given number is prime number or not.',
            solution: 'Check if number is divisible only by 1 and itself.',
            solutionCode: `import java.util.Scanner;

public class PrimeNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        boolean isPrime = true;
        if (num <= 1) {
            isPrime = false;
        } else {
            for (int i = 2; i <= Math.sqrt(num); i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        
        if (isPrime) {
            System.out.println(num + " is a prime number");
        } else {
            System.out.println(num + " is not a prime number");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '34. Write a Java program to check if a given number is perfect number or not.',
            solution: 'Perfect number: sum of proper divisors equals the number itself.',
            solutionCode: `import java.util.Scanner;

public class PerfectNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int sum = 0;
        for (int i = 1; i < num; i++) {
            if (num % i == 0) {
                sum += i;
            }
        }
        
        if (sum == num) {
            System.out.println(num + " is a perfect number");
        } else {
            System.out.println(num + " is not a perfect number");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '35. Write a Java program to generate Fibonacci series.',
            solution: 'Fibonacci series: 0, 1, 1, 2, 3, 5, 8, ... (each number is sum of previous two).',
            solutionCode: `import java.util.Scanner;

public class Fibonacci {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        int a = 0, b = 1;
        System.out.print("Fibonacci series: " + a + " " + b + " ");
        
        for (int i = 2; i < n; i++) {
            int c = a + b;
            System.out.print(c + " ");
            a = b;
            b = c;
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '36. Write a Java program to display all even numbers between two given numbers.',
            solution: 'Display even numbers in the given range.',
            solutionCode: `import java.util.Scanner;

public class EvenBetween {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int m = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int n = sc.nextInt();
        
        System.out.println("Even numbers between " + m + " and " + n + ":");
        for (int i = m; i <= n; i++) {
            if (i % 2 == 0) {
                System.out.print(i + " ");
            }
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '39. Write a Java program to find GCD and LCM for the two given numbers.',
            solution: 'GCD: Greatest Common Divisor, LCM: Least Common Multiple.',
            solutionCode: `import java.util.Scanner;

public class GCDLCM {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int a = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int b = sc.nextInt();
        
        int num1 = a, num2 = b;
        
        // Find GCD using Euclidean algorithm
        while (num2 != 0) {
            int temp = num2;
            num2 = num1 % num2;
            num1 = temp;
        }
        int gcd = num1;
        
        // LCM = (a * b) / GCD
        int lcm = (a * b) / gcd;
        
        System.out.println("GCD: " + gcd);
        System.out.println("LCM: " + lcm);
        
        sc.close();
    }
}`,
        },
        {
            question: '40. Write a Java program to find sum of all numbers except the numbers which are divisible by 3.',
            solution: 'Sum all numbers from 1 to n except those divisible by 3.',
            solutionCode: `import java.util.Scanner;

public class SumExceptDiv3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            if (i % 3 != 0) {
                sum += i;
            }
        }
        
        System.out.println("Sum: " + sum);
        
        sc.close();
    }
}`,
        },
        {
            question: '41. Write a Java program to count number of digits in a given number.',
            solution: 'Count digits by repeatedly dividing by 10.',
            solutionCode: `import java.util.Scanner;

public class CountDigits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        int count = 0;
        while (num > 0) {
            count++;
            num /= 10;
        }
        
        System.out.println("Number of digits: " + count);
        
        sc.close();
    }
}`,
        },
        // ==================== NESTED LOOPING ====================
        {
            question: '1. Write a Java program to print the following pattern up to n:\n1\n12\n123',
            solution: 'Use nested loops: outer loop for rows, inner loop for numbers.',
            solutionCode: `import java.util.Scanner;

public class Pattern1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '2. Write a Java program to show the following pattern:\n1\n2 2\n3 3 3\n4 4 4 4',
            solution: 'Print row number i times in each row.',
            solutionCode: `import java.util.Scanner;

public class Pattern2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '3. Write a Java program to print the following pattern up to n:\n*\n* *\n* * *',
            solution: 'Print stars in increasing order.',
            solutionCode: `import java.util.Scanner;

public class Pattern3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '4. Write a Java program to show the following pattern:\nA\nB C\nD E F\nG H I J',
            solution: 'Print alphabets in sequence using a counter.',
            solutionCode: `import java.util.Scanner;

public class Pattern4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        char ch = 'A';
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(ch + " ");
                ch++;
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '5. Write a Java program to show the following pattern:\nA\nA B\nA B C\nA B C D',
            solution: 'Print alphabets starting from A in each row.',
            solutionCode: `import java.util.Scanner;

public class Pattern5 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print((char)('A' + j) + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '6. Write a Java program to show the following pattern:\n* * * *\n* * *\n* *\n*',
            solution: 'Print stars in decreasing order.',
            solutionCode: `import java.util.Scanner;

public class Pattern6 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '7. Write a Java program to print the following pattern up to n:\n        1\n    1    2\n1    2     3',
            solution: 'Print numbers with spaces for alignment.',
            solutionCode: `import java.util.Scanner;

public class Pattern7 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print("    ");
            }
            // Print numbers
            for (int j = 1; j <= i; j++) {
                System.out.print(j + "   ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '8. Write a Java program to print the following pattern up to n:\n        *\n     * *\n  *  *   *',
            solution: 'Print stars with spaces for alignment.',
            solutionCode: `import java.util.Scanner;

public class Pattern8 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print("  ");
            }
            // Print stars
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '9. Write a Java program to show the following pattern:\n* * * *\n    * * *\n       *  *\n           *',
            solution: 'Print stars with right alignment.',
            solutionCode: `import java.util.Scanner;

public class Pattern9 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = n; i >= 1; i--) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print("  ");
            }
            // Print stars
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '10. Write a Java program to show the following pattern:\n                A\n          A    B\n     A   B    C\nA  B    C    D',
            solution: 'Print alphabets with spaces for alignment.',
            solutionCode: `import java.util.Scanner;

public class Pattern10 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print("    ");
            }
            // Print alphabets
            for (int j = 0; j < i; j++) {
                System.out.print((char)('A' + j) + "   ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '11. Write a Java program to show the following pattern:\n            1\n        2  2\n    3  3  3\n4  4  4  4',
            solution: 'Print row number with spaces for alignment.',
            solutionCode: `import java.util.Scanner;

public class Pattern11 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print("  ");
            }
            // Print numbers
            for (int j = 1; j <= i; j++) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '12. Write a Java program to print the following pattern up to n:\n             1\n       2         2\n3           3            3',
            solution: 'Print numbers with larger spaces for alignment.',
            solutionCode: `import java.util.Scanner;

public class Pattern12 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print("        ");
            }
            // Print numbers
            for (int j = 1; j <= i; j++) {
                System.out.print(i + "       ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '13. Write a Java program to display the following pattern for the given number of lines:\n****\n****\n****',
            solution: 'Print a square pattern of stars.',
            solutionCode: `import java.util.Scanner;

public class Pattern13 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of lines: ");
        int n = sc.nextInt();
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '14. Write a Java program to show the following pattern:\nA B C D\nE F G H\nI J  K  L',
            solution: 'Print alphabets in sequence row by row.',
            solutionCode: `import java.util.Scanner;

public class Pattern14 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        char ch = 'A';
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                System.out.print(ch + " ");
                ch++;
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '15. Write a Java program to show the following pattern:\n1 2   3    4\n5 6   7    8\n9 10 11 12',
            solution: 'Print numbers in sequence row by row.',
            solutionCode: `import java.util.Scanner;

public class Pattern15 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        int num = 1;
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                System.out.print(num + " ");
                num++;
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '16. Write a Java program to show the following pattern:\n1 2 3 4\n1 2 3 4\n1 2 3 4\n1 2 3 4',
            solution: 'Print same numbers in each row.',
            solutionCode: `import java.util.Scanner;

public class Pattern16 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        // ==================== 1D ARRAYS ====================
        {
            question: '1. Write a Java program to create an array of n book costs and find the minimum cost and max cost and find difference between them.',
            solution: 'Read n book costs into an array, find min and max, then calculate difference.',
            solutionCode: `import java.util.Scanner;

public class BookCosts {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of books: ");
        int n = sc.nextInt();
        
        double[] costs = new double[n];
        
        System.out.println("Enter book costs:");
        for (int i = 0; i < n; i++) {
            costs[i] = sc.nextDouble();
        }
        
        double min = costs[0];
        double max = costs[0];
        
        for (int i = 1; i < n; i++) {
            if (costs[i] < min) {
                min = costs[i];
            }
            if (costs[i] > max) {
                max = costs[i];
            }
        }
        
        double difference = max - min;
        
        System.out.println("Minimum cost: " + min);
        System.out.println("Maximum cost: " + max);
        System.out.println("Difference: " + difference);
        
        sc.close();
    }
}`,
        },
        {
            question: '2. Write a Java program to create an array of n employees salaries, find the average salary and also find number of employees whose salary is greater than average salary.',
            solution: 'Calculate average salary, then count employees with salary greater than average.',
            solutionCode: `import java.util.Scanner;

public class EmployeeSalary {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of employees: ");
        int n = sc.nextInt();
        
        double[] salaries = new double[n];
        
        System.out.println("Enter salaries:");
        double sum = 0;
        for (int i = 0; i < n; i++) {
            salaries[i] = sc.nextDouble();
            sum += salaries[i];
        }
        
        double average = sum / n;
        int count = 0;
        
        for (int i = 0; i < n; i++) {
            if (salaries[i] > average) {
                count++;
            }
        }
        
        System.out.println("Average salary: " + average);
        System.out.println("Number of employees with salary > average: " + count);
        
        sc.close();
    }
}`,
        },
        {
            question: '3. Write a Java program to create an array to store n students CGPA from max CGPA to min CGPA.',
            solution: 'Sort the array in descending order.',
            solutionCode: `import java.util.Scanner;
import java.util.Arrays;

public class StudentCGPA {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of students: ");
        int n = sc.nextInt();
        
        double[] cgpa = new double[n];
        
        System.out.println("Enter CGPA:");
        for (int i = 0; i < n; i++) {
            cgpa[i] = sc.nextDouble();
        }
        
        // Sort in descending order
        Arrays.sort(cgpa);
        for (int i = 0; i < n / 2; i++) {
            double temp = cgpa[i];
            cgpa[i] = cgpa[n - 1 - i];
            cgpa[n - 1 - i] = temp;
        }
        
        System.out.println("CGPA from max to min:");
        for (int i = 0; i < n; i++) {
            System.out.println(cgpa[i]);
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '4. Write a Java program to create an array to store n cricketers total runs and find whether the total runs is equal to 10k or not.',
            solution: 'Sum all runs and check if it equals 10000.',
            solutionCode: `import java.util.Scanner;

public class CricketerRuns {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of cricketers: ");
        int n = sc.nextInt();
        
        int[] runs = new int[n];
        
        System.out.println("Enter total runs:");
        int sum = 0;
        for (int i = 0; i < n; i++) {
            runs[i] = sc.nextInt();
            sum += runs[i];
        }
        
        if (sum == 10000) {
            System.out.println("Total runs equals 10k");
        } else {
            System.out.println("Total runs: " + sum + " (not equal to 10k)");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '5. Write a Java program to create an array to store n students age and find number of students eligible to vote or not (age >= 18).',
            solution: 'Count students with age >= 18.',
            solutionCode: `import java.util.Scanner;

public class VotingEligibility {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of students: ");
        int n = sc.nextInt();
        
        int[] ages = new int[n];
        
        System.out.println("Enter ages:");
        for (int i = 0; i < n; i++) {
            ages[i] = sc.nextInt();
        }
        
        int eligible = 0;
        for (int i = 0; i < n; i++) {
            if (ages[i] >= 18) {
                eligible++;
            }
        }
        
        System.out.println("Number of eligible students: " + eligible);
        System.out.println("Number of non-eligible students: " + (n - eligible));
        
        sc.close();
    }
}`,
        },
        {
            question: '6. Write a Java program to count how many double numbers are there in the array having more than 2 digits after decimal points.',
            solution: 'Check each number\'s decimal part.',
            solutionCode: `import java.util.Scanner;

public class DecimalDigits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        
        double[] arr = new double[n];
        
        System.out.println("Enter numbers:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextDouble();
        }
        
        int count = 0;
        for (int i = 0; i < n; i++) {
            String str = String.valueOf(arr[i]);
            int dotIndex = str.indexOf('.');
            if (dotIndex != -1 && str.length() - dotIndex - 1 > 2) {
                count++;
            }
        }
        
        System.out.println("Numbers with more than 2 decimal digits: " + count);
        
        sc.close();
    }
}`,
        },
        {
            question: '7. Write a Java program to find mean, median, and mode from the array of n elements.',
            solution: 'Calculate mean (average), median (middle value), and mode (most frequent value).',
            solutionCode: `import java.util.Scanner;
import java.util.Arrays;

public class MeanMedianMode {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        int sum = 0;
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
            sum += arr[i];
        }
        
        // Mean
        double mean = (double) sum / n;
        System.out.println("Mean: " + mean);
        
        // Median
        Arrays.sort(arr);
        double median;
        if (n % 2 == 0) {
            median = (arr[n/2 - 1] + arr[n/2]) / 2.0;
        } else {
            median = arr[n/2];
        }
        System.out.println("Median: " + median);
        
        // Mode
        int maxCount = 0;
        int mode = arr[0];
        for (int i = 0; i < n; i++) {
            int count = 0;
            for (int j = 0; j < n; j++) {
                if (arr[j] == arr[i]) {
                    count++;
                }
            }
            if (count > maxCount) {
                maxCount = count;
                mode = arr[i];
            }
        }
        System.out.println("Mode: " + mode);
        
        sc.close();
    }
}`,
        },
        {
            question: '8. Write a Java program to remove the duplicate elements and ensure each element occurs only once.',
            solution: 'Create a new array with unique elements only.',
            solutionCode: `import java.util.Scanner;

public class RemoveDuplicates {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        int[] unique = new int[n];
        int uniqueCount = 0;
        
        for (int i = 0; i < n; i++) {
            boolean isDuplicate = false;
            for (int j = 0; j < uniqueCount; j++) {
                if (arr[i] == unique[j]) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                unique[uniqueCount++] = arr[i];
            }
        }
        
        System.out.println("Array without duplicates:");
        for (int i = 0; i < uniqueCount; i++) {
            System.out.print(unique[i] + " ");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '9. Write a Java program to store n elements and display all the elements that start with one.',
            solution: 'Check if first digit of each element is 1.',
            solutionCode: `import java.util.Scanner;

public class StartsWithOne {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        System.out.println("Elements starting with 1:");
        for (int i = 0; i < n; i++) {
            int num = arr[i];
            while (num >= 10) {
                num /= 10;
            }
            if (num == 1) {
                System.out.print(arr[i] + " ");
            }
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '10. Write a Java program to count number of times data x is present in the array.',
            solution: 'Count occurrences of x in the array.',
            solutionCode: `import java.util.Scanner;

public class CountOccurrences {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        System.out.print("Enter data to search: ");
        int x = sc.nextInt();
        
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] == x) {
                count++;
            }
        }
        
        System.out.println("Number of times " + x + " is present: " + count);
        
        sc.close();
    }
}`,
        },
        {
            question: '15. Write a Java program to create an array to store n students age and find number of students eligible to vote [based on age].',
            solution: 'Same as question 5.',
            solutionCode: `// See question 5 for solution`,
        },
        {
            question: '17. Write a Java program to find mean, median, and mode from the array of n elements.',
            solution: 'Same as question 7.',
            solutionCode: `// See question 7 for solution`,
        },
        {
            question: '18. Write a Java program to create an array to store n elements and display all elements that start with one.',
            solution: 'Same as question 9.',
            solutionCode: `// See question 9 for solution`,
        },
        // ==================== 2D ARRAYS ====================
        {
            question: '1. Write a Java program to find row-wise sum, average, and maximum.',
            solution: 'Calculate sum, average, and maximum for each row.',
            solutionCode: `import java.util.Scanner;

public class RowWiseOperations {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        int[][] matrix = new int[rows][cols];
        
        System.out.println("Enter matrix elements:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        for (int i = 0; i < rows; i++) {
            int sum = 0;
            int max = matrix[i][0];
            
            for (int j = 0; j < cols; j++) {
                sum += matrix[i][j];
                if (matrix[i][j] > max) {
                    max = matrix[i][j];
                }
            }
            
            double average = (double) sum / cols;
            
            System.out.println("Row " + (i + 1) + ": Sum = " + sum + ", Average = " + average + ", Max = " + max);
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '2. Write a Java program to find column-wise sum, average, and maximum.',
            solution: 'Calculate sum, average, and maximum for each column.',
            solutionCode: `import java.util.Scanner;

public class ColumnWiseOperations {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        int[][] matrix = new int[rows][cols];
        
        System.out.println("Enter matrix elements:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        for (int j = 0; j < cols; j++) {
            int sum = 0;
            int max = matrix[0][j];
            
            for (int i = 0; i < rows; i++) {
                sum += matrix[i][j];
                if (matrix[i][j] > max) {
                    max = matrix[i][j];
                }
            }
            
            double average = (double) sum / rows;
            
            System.out.println("Column " + (j + 1) + ": Sum = " + sum + ", Average = " + average + ", Max = " + max);
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '3. Write a Java program to find maximum and minimum of the matrix.',
            solution: 'Find maximum and minimum values in the entire matrix.',
            solutionCode: `import java.util.Scanner;

public class MatrixMinMax {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        int[][] matrix = new int[rows][cols];
        
        System.out.println("Enter matrix elements:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        int max = matrix[0][0];
        int min = matrix[0][0];
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (matrix[i][j] > max) {
                    max = matrix[i][j];
                }
                if (matrix[i][j] < min) {
                    min = matrix[i][j];
                }
            }
        }
        
        System.out.println("Maximum: " + max);
        System.out.println("Minimum: " + min);
        
        sc.close();
    }
}`,
        },
        {
            question: '4. Write a Java program to find column-wise max and min of the matrix.',
            solution: 'Find maximum and minimum for each column.',
            solutionCode: `import java.util.Scanner;

public class ColumnMinMax {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        int[][] matrix = new int[rows][cols];
        
        System.out.println("Enter matrix elements:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        for (int j = 0; j < cols; j++) {
            int max = matrix[0][j];
            int min = matrix[0][j];
            
            for (int i = 0; i < rows; i++) {
                if (matrix[i][j] > max) {
                    max = matrix[i][j];
                }
                if (matrix[i][j] < min) {
                    min = matrix[i][j];
                }
            }
            
            System.out.println("Column " + (j + 1) + ": Max = " + max + ", Min = " + min);
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '5. Write a Java program to perform addition of two matrices if (m₁ == m₂) && (n₁ == n₂).',
            solution: 'Add corresponding elements of two matrices.',
            solutionCode: `import java.util.Scanner;

public class MatrixAddition {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        int[][] matrix1 = new int[rows][cols];
        int[][] matrix2 = new int[rows][cols];
        
        System.out.println("Enter first matrix:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix1[i][j] = sc.nextInt();
            }
        }
        
        System.out.println("Enter second matrix:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix2[i][j] = sc.nextInt();
            }
        }
        
        int[][] result = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }
        
        System.out.println("Result matrix:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(result[i][j] + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '6. Write a Java program to perform subtraction of two matrices.',
            solution: 'Subtract corresponding elements of two matrices.',
            solutionCode: `import java.util.Scanner;

public class MatrixSubtraction {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        int[][] matrix1 = new int[rows][cols];
        int[][] matrix2 = new int[rows][cols];
        
        System.out.println("Enter first matrix:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix1[i][j] = sc.nextInt();
            }
        }
        
        System.out.println("Enter second matrix:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix2[i][j] = sc.nextInt();
            }
        }
        
        int[][] result = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = matrix1[i][j] - matrix2[i][j];
            }
        }
        
        System.out.println("Result matrix:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(result[i][j] + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '7. Write a Java program to perform multiplication of two matrices.',
            solution: 'Multiply two matrices using matrix multiplication rules.',
            solutionCode: `import java.util.Scanner;

public class MatrixMultiplication {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows of first matrix: ");
        int rows1 = sc.nextInt();
        
        System.out.print("Enter cols of first matrix: ");
        int cols1 = sc.nextInt();
        
        System.out.print("Enter rows of second matrix: ");
        int rows2 = sc.nextInt();
        
        System.out.print("Enter cols of second matrix: ");
        int cols2 = sc.nextInt();
        
        if (cols1 != rows2) {
            System.out.println("Matrix multiplication not possible");
            sc.close();
            return;
        }
        
        int[][] matrix1 = new int[rows1][cols1];
        int[][] matrix2 = new int[rows2][cols2];
        
        System.out.println("Enter first matrix:");
        for (int i = 0; i < rows1; i++) {
            for (int j = 0; j < cols1; j++) {
                matrix1[i][j] = sc.nextInt();
            }
        }
        
        System.out.println("Enter second matrix:");
        for (int i = 0; i < rows2; i++) {
            for (int j = 0; j < cols2; j++) {
                matrix2[i][j] = sc.nextInt();
            }
        }
        
        int[][] result = new int[rows1][cols2];
        for (int i = 0; i < rows1; i++) {
            for (int j = 0; j < cols2; j++) {
                for (int k = 0; k < cols1; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
        
        System.out.println("Result matrix:");
        for (int i = 0; i < rows1; i++) {
            for (int j = 0; j < cols2; j++) {
                System.out.print(result[i][j] + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '8. Write a Java program to consider a matrix of size m × n to find trace of the matrix (sum of principal diagonal).',
            solution: 'Trace is sum of elements on the principal diagonal.',
            solutionCode: `import java.util.Scanner;

public class MatrixTrace {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        if (rows != cols) {
            System.out.println("Trace can only be found for square matrix");
            sc.close();
            return;
        }
        
        int[][] matrix = new int[rows][cols];
        
        System.out.println("Enter matrix elements:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        int trace = 0;
        for (int i = 0; i < rows; i++) {
            trace += matrix[i][i];
        }
        
        System.out.println("Trace of matrix: " + trace);
        
        sc.close();
    }
}`,
        },
        {
            question: '9. Write a Java program to consider a square matrix to check whether the given matrix is symmetric or not.',
            solution: 'A matrix is symmetric if matrix[i][j] == matrix[j][i] for all i, j.',
            solutionCode: `import java.util.Scanner;

public class SymmetricMatrix {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter size of square matrix: ");
        int n = sc.nextInt();
        
        int[][] matrix = new int[n][n];
        
        System.out.println("Enter matrix elements:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        boolean isSymmetric = true;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] != matrix[j][i]) {
                    isSymmetric = false;
                    break;
                }
            }
            if (!isSymmetric) {
                break;
            }
        }
        
        if (isSymmetric) {
            System.out.println("Matrix is symmetric");
        } else {
            System.out.println("Matrix is not symmetric");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '10. Write a Java program to create m×n matrix to store CGPA of students and display in the matrix and transpose form.',
            solution: 'Display the matrix and its transpose.',
            solutionCode: `import java.util.Scanner;

public class MatrixTranspose {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter rows: ");
        int rows = sc.nextInt();
        
        System.out.print("Enter cols: ");
        int cols = sc.nextInt();
        
        double[][] matrix = new double[rows][cols];
        
        System.out.println("Enter CGPA:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = sc.nextDouble();
            }
        }
        
        System.out.println("Original matrix:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        
        System.out.println("Transpose matrix:");
        for (int j = 0; j < cols; j++) {
            for (int i = 0; i < rows; i++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}`,
        },
        // ==================== METHODS ====================
        {
            question: '1. Write a Java program to define four methods (Breakfast: 7 to 9, Lunch: 12 to 14, Dinner: 19 to 21, NoFood).',
            solution: 'Create methods for different meal times.',
            solutionCode: `import java.util.Scanner;

public class MealTime {
    public static void breakfast() {
        System.out.println("Breakfast time: 7 to 9");
    }
    
    public static void lunch() {
        System.out.println("Lunch time: 12 to 14");
    }
    
    public static void dinner() {
        System.out.println("Dinner time: 19 to 21");
    }
    
    public static void noFood() {
        System.out.println("No food time");
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter time: ");
        int time = sc.nextInt();
        
        if (time >= 7 && time <= 9) {
            breakfast();
        } else if (time >= 12 && time <= 14) {
            lunch();
        } else if (time >= 19 && time <= 21) {
            dinner();
        } else {
            noFood();
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '2. Write a Java program to define class "MovieDrama" and create four methods showing the famous actors and movies in Telugu, Hindi, Any other language.',
            solution: 'Create methods for different languages.',
            solutionCode: `public class MovieDrama {
    public static void telugu() {
        System.out.println("Telugu: Actor - Prabhas, Movie - Baahubali");
    }
    
    public static void hindi() {
        System.out.println("Hindi: Actor - Shah Rukh Khan, Movie - DDLJ");
    }
    
    public static void other() {
        System.out.println("Other: Actor - Tom Hanks, Movie - Forrest Gump");
    }
    
    public static void main(String[] args) {
        telugu();
        hindi();
        other();
    }
}`,
        },
        {
            question: '3. Write a Java program to compute the volume, total surface area, lateral surface area, perimeter of base, and space diagonal of a cuboid using static methods with class name as "cuboid calculators".',
            solution: 'Create static methods for cuboid calculations.',
            solutionCode: `import java.util.Scanner;

public class CuboidCalculators {
    public static double volume(double l, double b, double h) {
        return l * b * h;
    }
    
    public static double totalSurfaceArea(double l, double b, double h) {
        return 2 * (l * b + b * h + h * l);
    }
    
    public static double lateralSurfaceArea(double l, double b, double h) {
        return 2 * h * (l + b);
    }
    
    public static double perimeterOfBase(double l, double b) {
        return 2 * (l + b);
    }
    
    public static double spaceDiagonal(double l, double b, double h) {
        return Math.sqrt(l * l + b * b + h * h);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter length: ");
        double l = sc.nextDouble();
        
        System.out.print("Enter breadth: ");
        double b = sc.nextDouble();
        
        System.out.print("Enter height: ");
        double h = sc.nextDouble();
        
        System.out.println("Volume: " + volume(l, b, h));
        System.out.println("Total Surface Area: " + totalSurfaceArea(l, b, h));
        System.out.println("Lateral Surface Area: " + lateralSurfaceArea(l, b, h));
        System.out.println("Perimeter of Base: " + perimeterOfBase(l, b));
        System.out.println("Space Diagonal: " + spaceDiagonal(l, b, h));
        
        sc.close();
    }
}`,
        },
        {
            question: '4. Write a Java program to find nCr for the given n and r values. (nCr = n!/(r!*(n-r)!)',
            solution: 'Calculate factorial and use the formula.',
            solutionCode: `import java.util.Scanner;

public class Combination {
    public static long factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        long fact = 1;
        for (int i = 2; i <= n; i++) {
            fact *= i;
        }
        return fact;
    }
    
    public static long nCr(int n, int r) {
        return factorial(n) / (factorial(r) * factorial(n - r));
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        System.out.print("Enter r: ");
        int r = sc.nextInt();
        
        System.out.println("nCr: " + nCr(n, r));
        
        sc.close();
    }
}`,
        },
        {
            question: '5. Write a Java program to implement mini calculator where the calculator should perform 5 operations (1-addition, 2-subtraction, 3-Multiplication, 4-Division, 5-Remainder, 6-Exit).',
            solution: 'Use switch case for different operations.',
            solutionCode: `import java.util.Scanner;

public class MiniCalculator {
    public static double add(double a, double b) {
        return a + b;
    }
    
    public static double subtract(double a, double b) {
        return a - b;
    }
    
    public static double multiply(double a, double b) {
        return a * b;
    }
    
    public static double divide(double a, double b) {
        if (b == 0) {
            System.out.println("Division by zero not allowed");
            return 0;
        }
        return a / b;
    }
    
    public static double remainder(double a, double b) {
        return a % b;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        while (true) {
            System.out.println("1 - Addition");
            System.out.println("2 - Subtraction");
            System.out.println("3 - Multiplication");
            System.out.println("4 - Division");
            System.out.println("5 - Remainder");
            System.out.println("6 - Exit");
            
            System.out.print("Enter choice: ");
            int choice = sc.nextInt();
            
            if (choice == 6) {
                System.out.println("Exiting...");
                break;
            }
            
            if (choice < 1 || choice > 6) {
                System.out.println("Invalid input");
                continue;
            }
            
            System.out.print("Enter first number: ");
            double a = sc.nextDouble();
            
            System.out.print("Enter second number: ");
            double b = sc.nextDouble();
            
            double result = 0;
            switch (choice) {
                case 1:
                    result = add(a, b);
                    break;
                case 2:
                    result = subtract(a, b);
                    break;
                case 3:
                    result = multiply(a, b);
                    break;
                case 4:
                    result = divide(a, b);
                    break;
                case 5:
                    result = remainder(a, b);
                    break;
            }
            
            System.out.println("Result: " + result);
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '9. Define a class Employee having three member variables: Employee Id, Employee Name, Employee Salary. Define four methods: InputEmployeeData(), ShowEmployeeData(), FindIncomeTax() (If salary > 100000, income tax = salary × 10 / 100), FindAnnualSalary().',
            solution: 'Create Employee class with methods.',
            solutionCode: `import java.util.Scanner;

public class Employee {
    private int empId;
    private String empName;
    private double salary;
    
    public void inputEmployeeData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Employee ID: ");
        this.empId = sc.nextInt();
        System.out.print("Enter Employee Name: ");
        this.empName = sc.next();
        System.out.print("Enter Salary: ");
        this.salary = sc.nextDouble();
    }
    
    public void showEmployeeData() {
        System.out.println("Employee ID: " + this.empId);
        System.out.println("Employee Name: " + this.empName);
        System.out.println("Salary: " + this.salary);
    }
    
    public double findIncomeTax() {
        if (this.salary > 100000) {
            return this.salary * 10 / 100;
        }
        return 0;
    }
    
    public double findAnnualSalary() {
        return this.salary * 12;
    }
    
    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.inputEmployeeData();
        emp.showEmployeeData();
        System.out.println("Income Tax: " + emp.findIncomeTax());
        System.out.println("Annual Salary: " + emp.findAnnualSalary());
    }
}`,
        },
        // ==================== RECURSIONS ====================
        {
            question: '1. Write a recursive function to find a^b (e.g., 3^4 = 3 * 3^3).',
            solution: 'Use recursion to calculate power.',
            solutionCode: `import java.util.Scanner;

public class PowerRecursive {
    public static long power(int a, int b) {
        if (b == 0) {
            return 1;
        }
        return a * power(a, b - 1);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter base: ");
        int a = sc.nextInt();
        
        System.out.print("Enter exponent: ");
        int b = sc.nextInt();
        
        System.out.println(a + "^" + b + " = " + power(a, b));
        
        sc.close();
    }
}`,
        },
        {
            question: '2. Write a recursive function to find the product of digits.',
            solution: 'Recursively multiply digits.',
            solutionCode: `import java.util.Scanner;

public class ProductOfDigitsRecursive {
    public static int productOfDigits(int num) {
        if (num < 10) {
            return num;
        }
        return (num % 10) * productOfDigits(num / 10);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        System.out.println("Product of digits: " + productOfDigits(num));
        
        sc.close();
    }
}`,
        },
        {
            question: '3. Write a Java program to find the multiplication of two numbers using recursive methods.',
            solution: 'Use recursion to multiply two numbers.',
            solutionCode: `import java.util.Scanner;

public class MultiplyRecursive {
    public static int multiply(int a, int b) {
        if (b == 0) {
            return 0;
        }
        if (b > 0) {
            return a + multiply(a, b - 1);
        } else {
            return -multiply(a, -b);
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int a = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int b = sc.nextInt();
        
        System.out.println("Product: " + multiply(a, b));
        
        sc.close();
    }
}`,
        },
        {
            question: '4. Write a program to find Fibonacci series using recursive methods.',
            solution: 'Use recursion to generate Fibonacci series.',
            solutionCode: `import java.util.Scanner;

public class FibonacciRecursive {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        System.out.println("Fibonacci series:");
        for (int i = 0; i < n; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        
        sc.close();
    }
}`,
        },
        {
            question: '5. Write a Java program to find GCD of number using recursive methods.',
            solution: 'Use Euclidean algorithm recursively.',
            solutionCode: `import java.util.Scanner;

public class GCDRecursive {
    public static int gcd(int a, int b) {
        if (b == 0) {
            return a;
        }
        return gcd(b, a % b);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int a = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int b = sc.nextInt();
        
        System.out.println("GCD: " + gcd(a, b));
        
        sc.close();
    }
}`,
        },
        {
            question: '6. Write a Java program to find reverse of a number using recursive method.',
            solution: 'Recursively reverse a number.',
            solutionCode: `import java.util.Scanner;

public class ReverseRecursive {
    public static int reverse(int num, int rev) {
        if (num == 0) {
            return rev;
        }
        return reverse(num / 10, rev * 10 + num % 10);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        
        System.out.println("Reverse: " + reverse(num, 0));
        
        sc.close();
    }
}`,
        },
        {
            question: '7. Write a recursive method to find the sum of elements stored in an integer array.',
            solution: 'Recursively sum array elements.',
            solutionCode: `import java.util.Scanner;

public class SumArrayRecursive {
    public static int sumArray(int[] arr, int index) {
        if (index == arr.length) {
            return 0;
        }
        return arr[index] + sumArray(arr, index + 1);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        System.out.println("Sum: " + sumArray(arr, 0));
        
        sc.close();
    }
}`,
        },
        {
            question: '8. Write a Java program to find factorial of a given number using recursion.',
            solution: 'Recursively calculate factorial.',
            solutionCode: `import java.util.Scanner;

public class FactorialRecursive {
    public static long factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        
        System.out.println("Factorial: " + factorial(n));
        
        sc.close();
    }
}`,
        },
        {
            question: '9. Write a recursive function to find sum of n natural numbers.',
            solution: 'Recursively sum natural numbers.',
            solutionCode: `import java.util.Scanner;

public class SumNaturalRecursive {
    public static int sumNatural(int n) {
        if (n <= 1) {
            return n;
        }
        return n + sumNatural(n - 1);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        System.out.println("Sum: " + sumNatural(n));
        
        sc.close();
    }
}`,
        },
        // ==================== OBJECTS AND CLASSES ====================
        {
            question: '1. Write a Java program to define a class Employee having 3 member variables: Employee Id, Employee Name, Salary. Include 4 methods: Input Employee Data, Print Employee Data, Find Income Tax (If salary < 1L → 0%, 1L to 1.5L → 10%, 1.5L to 2L → 15%, > 2L → 25%), Find Annual Salary.',
            solution: 'Create Employee class with all required methods.',
            solutionCode: `import java.util.Scanner;

public class Employee {
    private int empId;
    private String empName;
    private double salary;
    
    public void inputEmployeeData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Employee ID: ");
        this.empId = sc.nextInt();
        System.out.print("Enter Employee Name: ");
        this.empName = sc.next();
        System.out.print("Enter Salary: ");
        this.salary = sc.nextDouble();
    }
    
    public void printEmployeeData() {
        System.out.println("Employee ID: " + this.empId);
        System.out.println("Employee Name: " + this.empName);
        System.out.println("Salary: " + this.salary);
    }
    
    public double findIncomeTax() {
        if (this.salary < 100000) {
            return 0;
        } else if (this.salary >= 100000 && this.salary < 150000) {
            return this.salary * 0.10;
        } else if (this.salary >= 150000 && this.salary < 200000) {
            return this.salary * 0.15;
        } else {
            return this.salary * 0.25;
        }
    }
    
    public double findAnnualSalary() {
        return this.salary * 12;
    }
    
    public static void main(String[] args) {
        Employee emp1 = new Employee();
        Employee emp2 = new Employee();
        
        System.out.println("Enter details for Employee 1:");
        emp1.inputEmployeeData();
        
        System.out.println("\\nEnter details for Employee 2:");
        emp2.inputEmployeeData();
        
        System.out.println("\\nEmployee 1 Details:");
        emp1.printEmployeeData();
        System.out.println("Income Tax: " + emp1.findIncomeTax());
        System.out.println("Annual Salary: " + emp1.findAnnualSalary());
        
        System.out.println("\\nEmployee 2 Details:");
        emp2.printEmployeeData();
        System.out.println("Income Tax: " + emp2.findIncomeTax());
        System.out.println("Annual Salary: " + emp2.findAnnualSalary());
    }
}`,
        },
        {
            question: '2. Write a Java program to define 4 member variables: bookID, name, price, authorName. Include 3 methods: Input book data, Show book data, Find whether book is costly or not (If book cost is more than number of pages).',
            solution: 'Create Book class with required methods.',
            solutionCode: `import java.util.Scanner;

public class Book {
    private int bookID;
    private String name;
    private double price;
    private String authorName;
    private int pages;
    
    public void inputBookData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Book ID: ");
        this.bookID = sc.nextInt();
        System.out.print("Enter Book Name: ");
        this.name = sc.next();
        System.out.print("Enter Price: ");
        this.price = sc.nextDouble();
        System.out.print("Enter Author Name: ");
        this.authorName = sc.next();
        System.out.print("Enter Number of Pages: ");
        this.pages = sc.nextInt();
    }
    
    public void showBookData() {
        System.out.println("Book ID: " + this.bookID);
        System.out.println("Book Name: " + this.name);
        System.out.println("Price: " + this.price);
        System.out.println("Author Name: " + this.authorName);
        System.out.println("Pages: " + this.pages);
    }
    
    public void findCostly() {
        if (this.price > this.pages) {
            System.out.println("Book is costly");
        } else {
            System.out.println("Book is not costly");
        }
    }
    
    public static void main(String[] args) {
        Book book = new Book();
        book.inputBookData();
        book.showBookData();
        book.findCostly();
    }
}`,
        },
        {
            question: '3. Define a class Hospital with: Name, location, number of beds in the hospital. Include methods to: Input hospital information, Output hospital information, Find hospital size (by changing or using number of beds). Create 3 objects.',
            solution: 'Create Hospital class with methods.',
            solutionCode: `import java.util.Scanner;

public class Hospital {
    private String name;
    private String location;
    private int numberOfBeds;
    
    public void inputHospitalInformation() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Hospital Name: ");
        this.name = sc.nextLine();
        System.out.print("Enter Location: ");
        this.location = sc.nextLine();
        System.out.print("Enter Number of Beds: ");
        this.numberOfBeds = sc.nextInt();
    }
    
    public void outputHospitalInformation() {
        System.out.println("Hospital Name: " + this.name);
        System.out.println("Location: " + this.location);
        System.out.println("Number of Beds: " + this.numberOfBeds);
    }
    
    public void findHospitalSize() {
        if (this.numberOfBeds < 50) {
            System.out.println("Hospital Size: Small");
        } else if (this.numberOfBeds >= 50 && this.numberOfBeds < 200) {
            System.out.println("Hospital Size: Medium");
        } else {
            System.out.println("Hospital Size: Large");
        }
    }
    
    public static void main(String[] args) {
        Hospital h1 = new Hospital();
        Hospital h2 = new Hospital();
        Hospital h3 = new Hospital();
        
        System.out.println("Enter details for Hospital 1:");
        h1.inputHospitalInformation();
        
        System.out.println("\\nEnter details for Hospital 2:");
        h2.inputHospitalInformation();
        
        System.out.println("\\nEnter details for Hospital 3:");
        h3.inputHospitalInformation();
        
        System.out.println("\\nHospital 1 Information:");
        h1.outputHospitalInformation();
        h1.findHospitalSize();
        
        System.out.println("\\nHospital 2 Information:");
        h2.outputHospitalInformation();
        h2.findHospitalSize();
        
        System.out.println("\\nHospital 3 Information:");
        h3.outputHospitalInformation();
        h3.findHospitalSize();
    }
}`,
        },
        {
            question: '4. Write a Java program that defines a class Mobile with attributes — brand, model, and price. Create at least two objects of the Mobile class and display their specifications. Include the following methods: input, print, mobile type.',
            solution: 'Create Mobile class with required methods.',
            solutionCode: `import java.util.Scanner;

public class Mobile {
    private String brand;
    private String model;
    private double price;
    
    public void input() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Brand: ");
        this.brand = sc.next();
        System.out.print("Enter Model: ");
        this.model = sc.next();
        System.out.print("Enter Price: ");
        this.price = sc.nextDouble();
    }
    
    public void print() {
        System.out.println("Brand: " + this.brand);
        System.out.println("Model: " + this.model);
        System.out.println("Price: " + this.price);
    }
    
    public void mobileType() {
        if (this.price > 50000) {
            System.out.println("Mobile Type: Premium");
        } else if (this.price >= 20000 && this.price <= 50000) {
            System.out.println("Mobile Type: Mid-range");
        } else {
            System.out.println("Mobile Type: Budget");
        }
    }
    
    public static void main(String[] args) {
        Mobile m1 = new Mobile();
        Mobile m2 = new Mobile();
        
        System.out.println("Enter details for Mobile 1:");
        m1.input();
        
        System.out.println("\\nEnter details for Mobile 2:");
        m2.input();
        
        System.out.println("\\nMobile 1 Specifications:");
        m1.print();
        m1.mobileType();
        
        System.out.println("\\nMobile 2 Specifications:");
        m2.print();
        m2.mobileType();
    }
}`,
        },
    ] as PracticeQuestion[],
}

export default function ImportantQuestionsPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}

