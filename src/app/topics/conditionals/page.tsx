'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiCheckCircle, FiArrowRight, FiLayers, FiCode } from 'react-icons/fi'

const content = {
  title: 'Conditionals',
  explanationSections: [
    {
      title: 'if Statement',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">if</span> statement executes a code block if the condition is <span class="text-cyan-300">true</span>.

Syntax:
→ <span class="text-cyan-300">if (condition) { ... }</span>

Key Points:
→ Condition must evaluate to <span class="text-cyan-300">boolean</span> (<span class="text-cyan-300">true</span> or <span class="text-cyan-300">false</span>)
→ Use <span class="text-cyan-300">{}</span> for multiple statements
→ Optional for single statement

<span class="text-amber-300">Use when:</span> You need to execute code only when a condition is true.`,
      code: `public class IfStatement {
    public static void main(String[] args) {
        int age = 18;
        
        if (age >= 18) {
            System.out.println("You are an adult");
        }
    }
}`,
    },
    {
      title: 'if-else Statement',
      icon: <FiArrowRight className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">if-else</span> statement executes one block if condition is <span class="text-cyan-300">true</span>, another if <span class="text-cyan-300">false</span>.

Syntax:
→ <span class="text-cyan-300">if (condition) { ... } else { ... }</span>

Key Points:
→ Always executes one of the two blocks
→ <span class="text-cyan-300">else</span> block executes when condition is <span class="text-cyan-300">false</span>
→ Useful for binary decisions

<span class="text-amber-300">Use when:</span> You need to handle both true and false cases.`,
      code: `public class IfElse {
    public static void main(String[] args) {
        int num = 5;
        
        if (num % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
    }
}`,
    },
    {
      title: 'if-else-if Ladder',
      icon: <FiLayers className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">if-else-if</span> ladder checks multiple conditions in sequence.

Syntax:
→ <span class="text-cyan-300">if (condition1) { ... } else if (condition2) { ... } else { ... }</span>

Key Points:
→ Conditions are checked <span class="text-amber-300">top to bottom</span>
→ First <span class="text-cyan-300">true</span> condition executes its block
→ <span class="text-cyan-300">else</span> block is optional
→ Only one block executes

<span class="text-amber-300">Use when:</span> You have multiple mutually exclusive conditions.`,
      code: `public class IfElseIf {
    public static void main(String[] args) {
        int score = 85;
        
        if (score >= 90) {
            System.out.println("Grade A");
        } else if (score >= 80) {
            System.out.println("Grade B");
        } else if (score >= 70) {
            System.out.println("Grade C");
        } else {
            System.out.println("Grade F");
        }
    }
}`,
    },
    {
      title: 'Nested if',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Nested if</span> statements are if statements inside other if statements.

Key Points:
→ Allows checking multiple conditions in sequence
→ Inner <span class="text-cyan-300">if</span> executes only if outer <span class="text-cyan-300">if</span> is <span class="text-cyan-300">true</span>
→ Can nest multiple levels deep
→ Useful for complex decision trees

<span class="text-amber-300">Use when:</span> You need to check conditions that depend on previous conditions.`,
      code: `public class NestedIf {
    public static void main(String[] args) {
        int age = 20;
        boolean hasLicense = true;
        
        if (age >= 18) {
            if (hasLicense) {
                System.out.println("You can drive");
            } else {
                System.out.println("Get a license first");
            }
        } else {
            System.out.println("Too young to drive");
        }
    }
}`,
    },
    {
      title: 'switch Statement',
      icon: <FiCode className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">switch</span> statement is an alternative to if-else-if for multiple conditions.

Syntax:
→ <span class="text-cyan-300">switch (variable) { case value1: ... break; default: ... }</span>

Key Points:
→ Compares variable against multiple <span class="text-cyan-300">case</span> values
→ Use <span class="text-cyan-300">break</span> to prevent fall-through
→ <span class="text-cyan-300">default</span> case is optional but recommended
→ Can use <span class="text-cyan-300">String</span> (Java 7+), <span class="text-cyan-300">int</span>, <span class="text-cyan-300">char</span>, etc.

<span class="text-amber-300">Use when:</span> You have multiple values to compare against a single variable.`,
      code: `public class SwitchStatement {
    public static void main(String[] args) {
        int day = 3;
        
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}`,
    },
  ] as ExplanationSection[],
  exampleCode: `public class Conditionals {
    public static void main(String[] args) {
        int score = 85;
        char grade;
        
        // if-else-if ladder
        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 70) {
            grade = 'C';
        } else {
            grade = 'F';
        }
        
        System.out.println("Score: " + score);
        System.out.println("Grade: " + grade);
        
        // switch statement
        int day = 3;
        String dayName;
        switch (day) {
            case 1:
                dayName = "Monday";
                break;
            case 2:
                dayName = "Tuesday";
                break;
            case 3:
                dayName = "Wednesday";
                break;
            default:
                dayName = "Invalid day";
        }
        System.out.println("Day " + day + " is " + dayName);
    }
}`,
  practiceQuestions: [
    {
      question: 'Write a program to check if a year is a leap year.',
      solution: 'A year is a leap year if it is divisible by 4, but not by 100, OR if it is divisible by 400. Use if-else statements to check these conditions.',
      solutionCode: `public class LeapYear {
    public static void main(String[] args) {
        int year = 2024;
        
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            System.out.println(year + " is a leap year");
        } else {
            System.out.println(year + " is not a leap year");
        }
    }
}`,
    },
  ] as PracticeQuestion[],
  dryRunCode: `public class Conditionals {
    public static void main(String[] args) {
        int score = 85;
        char grade;
        
        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else {
            grade = 'F';
        }
        
        System.out.println("Score: " + score);
        System.out.println("Grade: " + grade);
    }
}`,
  dryRunSteps: [
    {
      line: 3,
      vars: { score: 85 },
      output: '',
      description: 'Initializing score variable',
    },
    {
      line: 4,
      vars: { score: 85, grade: undefined },
      output: '',
      description: 'Declaring grade variable',
    },
    {
      line: 6,
      vars: { score: 85, grade: undefined },
      output: '',
      conditionResult: false,
      description: 'Checking if score >= 90 (85 >= 90 is false)',
    },
    {
      line: 9,
      vars: { score: 85, grade: undefined },
      output: '',
      conditionResult: true,
      description: 'Checking if score >= 80 (85 >= 80 is true)',
    },
    {
      line: 10,
      vars: { score: 85, grade: 'B' },
      output: '',
      description: 'Assigning grade = B',
    },
    {
      line: 14,
      vars: { score: 85, grade: 'B' },
      output: 'Score: 85\\n',
      description: 'Displaying score',
    },
    {
      line: 15,
      vars: { score: 85, grade: 'B' },
      output: 'Score: 85\\nGrade: B\\n',
      description: 'Displaying grade',
    },
  ] as DryRunStep[],
}

export default function ConditionalsPage() {
  return <TopicPage content={content} />
}
