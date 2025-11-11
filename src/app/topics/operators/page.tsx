'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { 
  FiPlus, 
  FiArrowRight,
  FiCheckCircle,
  FiArrowUp,
  FiCode,
  FiBook
} from 'react-icons/fi'

const content = {
  title: 'Operators',
  explanationSections: [
    {
      title: 'Arithmetic Operators',
      icon: <FiPlus className="w-6 h-6" />,
      content: `Perform mathematical operations on numeric values.

Operators:
→ <span class="text-blue-400 font-semibold">+</span> (addition) - Adds two values
→ <span class="text-blue-400 font-semibold">-</span> (subtraction) - Subtracts second value from first
→ <span class="text-blue-400 font-semibold">*</span> (multiplication) - Multiplies two values
→ <span class="text-blue-400 font-semibold">/</span> (division) - Divides first value by second
→ <span class="text-blue-400 font-semibold">%</span> (modulus) - Returns remainder after division

<span class="text-amber-300">Note:</span> These operators work with integers, floating-point numbers, and can be used in expressions.`,
      code: `public class ArithmeticOperators {
    public static void main(String[] args) {
        int a = 10, b = 3;
        
        System.out.println("a + b = " + (a + b));  // 13
        System.out.println("a - b = " + (a - b));  // 7
        System.out.println("a * b = " + (a * b));  // 30
        System.out.println("a / b = " + (a / b));  // 3
        System.out.println("a % b = " + (a % b));  // 1
    }
}`,
    },
    {
      title: 'Relational Operators',
      icon: <FiArrowRight className="w-6 h-6" />,
      content: `Compare two values and return a <span class="text-cyan-300">boolean</span> result (<span class="text-cyan-300">true</span> or <span class="text-cyan-300">false</span>).

Operators:
→ <span class="text-blue-400 font-semibold">==</span> (equal to) - Checks if two values are equal
→ <span class="text-blue-400 font-semibold">!=</span> (not equal to) - Checks if two values are not equal
→ <span class="text-blue-400 font-semibold">></span> (greater than) - Checks if first value is greater
→ <span class="text-blue-400 font-semibold"><</span> (less than) - Checks if first value is smaller
→ <span class="text-blue-400 font-semibold">>=</span> (greater than or equal to) - Checks if first value is greater or equal
→ <span class="text-blue-400 font-semibold"><=</span> (less than or equal to) - Checks if first value is smaller or equal

<span class="text-amber-300">Used in:</span> Conditional statements and loops to make decisions.`,
      code: `public class RelationalOperators {
    public static void main(String[] args) {
        int a = 10, b = 5;
        
        System.out.println("a > b: " + (a > b));    // true
        System.out.println("a < b: " + (a < b));    // false
        System.out.println("a == b: " + (a == b));  // false
        System.out.println("a != b: " + (a != b));  // true
        System.out.println("a >= b: " + (a >= b));  // true
        System.out.println("a <= b: " + (a <= b));  // false
    }
}`,
    },
    {
      title: 'Logical Operators',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: `Combine or negate <span class="text-cyan-300">boolean</span> expressions.

Operators:
→ <span class="text-blue-400 font-semibold">&&</span> (logical AND) - Returns <span class="text-cyan-300">true</span> only if both conditions are <span class="text-cyan-300">true</span>
→ <span class="text-blue-400 font-semibold">||</span> (logical OR) - Returns <span class="text-cyan-300">true</span> if at least one condition is <span class="text-cyan-300">true</span>
→ <span class="text-blue-400 font-semibold">!</span> (logical NOT) - Reverses the boolean value (<span class="text-cyan-300">true</span> becomes <span class="text-cyan-300">false</span>, and vice versa)

<span class="text-amber-300">Essential for:</span> Complex conditional logic and decision-making in programs.`,
      code: `public class LogicalOperators {
    public static void main(String[] args) {
        boolean x = true, y = false;
        
        System.out.println("x && y: " + (x && y));  // false
        System.out.println("x || y: " + (x || y));  // true
        System.out.println("!x: " + (!x));          // false
        System.out.println("!y: " + (!y));          // true
    }
}`,
    },
    {
      title: 'Assignment Operators',
      icon: <FiCode className="w-6 h-6" />,
      content: `Assign values to variables, with optional compound operations.

Operators:
→ <span class="text-blue-400 font-semibold">=</span> (assignment) - Assigns value to variable
→ <span class="text-blue-400 font-semibold">+=</span> (add and assign) - Adds and assigns: <span class="text-cyan-300">a += b</span> is same as <span class="text-cyan-300">a = a + b</span>
→ <span class="text-blue-400 font-semibold">-=</span> (subtract and assign) - Subtracts and assigns
→ <span class="text-blue-400 font-semibold">*=</span> (multiply and assign) - Multiplies and assigns
→ <span class="text-blue-400 font-semibold">/=</span> (divide and assign) - Divides and assigns
→ <span class="text-blue-400 font-semibold">%=</span> (modulus and assign) - Modulus and assigns

<span class="text-amber-300">Benefit:</span> Compound assignment operators make code more concise and efficient.`,
      code: `public class AssignmentOperators {
    public static void main(String[] args) {
        int a = 10;
        
        a += 5;  // a = a + 5, now a = 15
        System.out.println("After +=: " + a);
        
        a -= 3;  // a = a - 3, now a = 12
        System.out.println("After -=: " + a);
        
        a *= 2;  // a = a * 2, now a = 24
        System.out.println("After *=: " + a);
        
        a /= 4;  // a = a / 4, now a = 6
        System.out.println("After /=: " + a);
        
        a %= 4;  // a = a % 4, now a = 2
        System.out.println("After %=: " + a);
    }
}`,
    },
    {
      title: 'Increment/Decrement Operators',
      icon: <FiArrowUp className="w-6 h-6" />,
      content: `Increase or decrease a variable's value by <span class="text-cyan-300">1</span>.

Operators:
→ <span class="text-blue-400 font-semibold">++</span> (increment) - Increases value by 1
→ <span class="text-blue-400 font-semibold">--</span> (decrement) - Decreases value by 1

Two Forms:
→ <span class="text-cyan-300">Prefix (++i, --i):</span> Increments/decrements first, then uses the new value
→ <span class="text-cyan-300">Postfix (i++, i--):</span> Uses the current value first, then increments/decrements

<span class="text-amber-300">Commonly used in:</span> Loops and counters.`,
      code: `public class IncrementDecrement {
    public static void main(String[] args) {
        int i = 5;
        
        // Postfix: use then increment
        System.out.println("i++: " + (i++));  // Prints 5, then i becomes 6
        System.out.println("i: " + i);        // Prints 6
        
        // Prefix: increment then use
        System.out.println("++i: " + (++i));  // i becomes 7, prints 7
        System.out.println("i: " + i);        // Prints 7
        
        // Decrement examples
        System.out.println("i--: " + (i--));  // Prints 7, then i becomes 6
        System.out.println("--i: " + (--i));  // i becomes 5, prints 5
    }
}`,
    },
    {
      title: 'Ternary Operator',
      icon: <FiBook className="w-6 h-6" />,
      content: `A shorthand for <span class="text-cyan-300">if-else</span> statements that returns a value.

Syntax:
→ <span class="text-blue-400 font-semibold">condition ? valueIfTrue : valueIfFalse</span>

The ternary operator evaluates the condition:
→ If <span class="text-cyan-300">true</span>, returns <span class="text-cyan-300">valueIfTrue</span>
→ If <span class="text-cyan-300">false</span>, returns <span class="text-cyan-300">valueIfFalse</span>

<span class="text-amber-300">Benefit:</span> Provides a concise way to assign values based on conditions.`,
      code: `public class TernaryOperator {
    public static void main(String[] args) {
        int a = 10, b = 5;
        
        // Find maximum
        int max = (a > b) ? a : b;
        System.out.println("Max: " + max);  // 10
        
        // Check even/odd
        String result = (a % 2 == 0) ? "Even" : "Odd";
        System.out.println(a + " is " + result);  // Even
        
        // Assign based on condition
        int value = (b > 0) ? b * 2 : 0;
        System.out.println("Value: " + value);  // 10
    }
}`,
    },
    {
      title: 'Operator Precedence',
      icon: <FiBook className="w-6 h-6" />,
      content: `The order in which operators are evaluated in an expression.

Precedence Order (highest to lowest):
→ <span class="text-blue-400 font-semibold">Parentheses ()</span> - Highest precedence, always evaluated first
→ <span class="text-blue-400 font-semibold">Unary operators (++, --, !)</span> - Applied to single operands
→ <span class="text-blue-400 font-semibold">Arithmetic (*, /, %)</span> - Multiplication, division, modulus
→ <span class="text-blue-400 font-semibold">Arithmetic (+, -)</span> - Addition, subtraction
→ <span class="text-blue-400 font-semibold">Relational (<, >, <=, >=)</span> - Comparison operators
→ <span class="text-blue-400 font-semibold">Equality (==, !=)</span> - Equality checks
→ <span class="text-blue-400 font-semibold">Logical AND (&&)</span> - Logical conjunction
→ <span class="text-blue-400 font-semibold">Logical OR (||)</span> - Logical disjunction
→ <span class="text-blue-400 font-semibold">Assignment (=)</span> - Lowest precedence, evaluated last

<span class="text-amber-300">Tip:</span> Use parentheses to explicitly control evaluation order when needed.`,
      code: `public class OperatorPrecedence {
    public static void main(String[] args) {
        int a = 2, b = 3, c = 4;
        
        // Without parentheses: * has higher precedence than +
        int result1 = a + b * c;  // 2 + (3 * 4) = 14
        System.out.println("a + b * c = " + result1);
        
        // With parentheses: + evaluated first
        int result2 = (a + b) * c;  // (2 + 3) * 4 = 20
        System.out.println("(a + b) * c = " + result2);
        
        // Logical operators precedence
        boolean x = true, y = false, z = true;
        boolean result3 = x || y && z;  // x || (y && z) = true
        System.out.println("x || y && z = " + result3);
    }
}`,
    },
  ],
  exampleCode: `public class Operators {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        
        // Arithmetic operators
        System.out.println("a + b = " + (a + b));  // 13
        System.out.println("a - b = " + (a - b));  // 7
        System.out.println("a * b = " + (a * b));  // 30
        System.out.println("a / b = " + (a / b));  // 3
        System.out.println("a % b = " + (a % b));  // 1
        
        // Relational operators
        System.out.println("a > b: " + (a > b));   // true
        System.out.println("a == b: " + (a == b)); // false
        
        // Logical operators
        boolean x = true;
        boolean y = false;
        System.out.println("x && y: " + (x && y)); // false
        System.out.println("x || y: " + (x || y)); // true
        
        // Increment/Decrement
        int i = 5;
        System.out.println("i++: " + (i++));  // 5 (postfix)
        System.out.println("i: " + i);        // 6
        System.out.println("++i: " + (++i));  // 7 (prefix)
        
        // Ternary operator
        int max = (a > b) ? a : b;
        System.out.println("Max: " + max);    // 10
    }
}`,
  practiceQuestions: [
    {
      question: 'Write a program to check whether a number is positive or negative using relational operators.',
      solution: 'Use relational operators to compare the number with 0. If num > 0, it\'s positive; otherwise, it\'s negative.',
      solutionCode: `public class PositiveNegative {
    public static void main(String[] args) {
        int num = -5;
        
        if (num > 0) {
            System.out.println("Positive");
        } else {
            System.out.println("Negative");
        }
    }
}`,
    },
  ] as PracticeQuestion[],
}

export default function OperatorsPage() {
  return <TopicPage content={content} />
}

