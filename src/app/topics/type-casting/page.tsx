'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiRefreshCw, FiTarget, FiCode } from 'react-icons/fi'

const content = {
  title: 'Type Casting',
  explanationSections: [
    {
      title: 'Introduction to Type Casting',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Type Casting</span> converts a value from one data type to another.

Types:
→ <span class="text-cyan-300">Widening (Implicit):</span> Automatic conversion (smaller to larger)
→ <span class="text-cyan-300">Narrowing (Explicit):</span> Manual conversion (larger to smaller)

Widening Casting:
→ <span class="text-amber-300">byte → short → int → long → float → double</span>
→ <span class="text-amber-300">char → int</span>
→ <span class="text-cyan-300">Automatic:</span> No explicit casting needed

Narrowing Casting:
→ <span class="text-amber-300">double → float → long → int → short → byte</span>
→ <span class="text-cyan-300">Manual:</span> Requires explicit casting`,
      code: `public class TypeCastingIntro {
    public static void main(String[] args) {
        // Widening casting (automatic)
        int intValue = 100;
        long longValue = intValue;  // Automatic
        float floatValue = longValue;  // Automatic
        double doubleValue = floatValue;  // Automatic
        
        System.out.println("int: " + intValue);
        System.out.println("long: " + longValue);
        System.out.println("float: " + floatValue);
        System.out.println("double: " + doubleValue);
        
        // Narrowing casting (explicit)
        double d = 100.5;
        int i = (int) d;  // Explicit cast
        System.out.println("double: " + d);
        System.out.println("int: " + i);  // 100 (truncated)
    }
}`,
    },
    {
      title: 'Widening Casting',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Widening Casting</span> converts smaller types to larger types automatically.

Order:
→ <span class="text-cyan-300">byte → short → int → long → float → double</span>
→ <span class="text-cyan-300">char → int</span>

Characteristics:
→ <span class="text-amber-300">Automatic:</span> Java does it automatically
→ <span class="text-amber-300">Safe:</span> No data loss
→ <span class="text-amber-300">No syntax:</span> No casting operator needed`,
      code: `public class WideningCasting {
    public static void main(String[] args) {
        byte b = 100;
        short s = b;  // byte to short
        int i = s;    // short to int
        long l = i;   // int to long
        float f = l;  // long to float
        double d = f; // float to double
        
        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);
        
        // char to int
        char c = 'A';
        int charValue = c;
        System.out.println("char: " + c);
        System.out.println("int value: " + charValue);  // 65 (ASCII)
    }
}`,
    },
    {
      title: 'Narrowing Casting',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Narrowing Casting</span> converts larger types to smaller types manually.

Syntax:
→ <span class="text-blue-400">(targetType) value</span>

Characteristics:
→ <span class="text-cyan-300">Explicit:</span> Must use casting operator
→ <span class="text-cyan-300">Data loss:</span> May lose precision
→ <span class="text-cyan-300">Truncation:</span> Decimal part removed for integers`,
      code: `public class NarrowingCasting {
    public static void main(String[] args) {
        double d = 100.99;
        float f = (float) d;  // double to float
        long l = (long) f;    // float to long
        int i = (int) l;      // long to int
        short s = (short) i;  // int to short
        byte b = (byte) s;    // short to byte
        
        System.out.println("double: " + d);
        System.out.println("float: " + f);
        System.out.println("long: " + l);
        System.out.println("int: " + i);
        System.out.println("short: " + s);
        System.out.println("byte: " + b);
        
        // Decimal truncation
        double price = 99.99;
        int intPrice = (int) price;
        System.out.println("Price: $" + price);
        System.out.println("Int Price: $" + intPrice);  // 99 (truncated)
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Demonstrate widening casting by converting a byte to double through all intermediate types.',
      solution: 'Start with byte, convert to short, int, long, float, and finally double.',
      solutionCode: `public class WideningDemo {
    public static void main(String[] args) {
        byte b = 100;
        short s = b;
        int i = s;
        long l = i;
        float f = l;
        double d = f;
        
        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);
    }
}`,
    },
    {
      question: 'Demonstrate narrowing casting by converting a double to byte, showing data loss.',
      solution: 'Convert double to float, long, int, short, and byte using explicit casting.',
      solutionCode: `public class NarrowingDemo {
    public static void main(String[] args) {
        double d = 123.456;
        float f = (float) d;
        long l = (long) f;
        int i = (int) l;
        short s = (short) i;
        byte b = (byte) s;
        
        System.out.println("double: " + d);
        System.out.println("float: " + f);
        System.out.println("long: " + l);
        System.out.println("int: " + i);
        System.out.println("short: " + s);
        System.out.println("byte: " + b);
    }
}`,
    },
    {
      question: 'Convert a char to int and display its ASCII value.',
      solution: 'Assign char to int variable (automatic widening).',
      solutionCode: `public class CharToInt {
    public static void main(String[] args) {
        char c = 'A';
        int asciiValue = c;  // Automatic widening
        
        System.out.println("Character: " + c);
        System.out.println("ASCII Value: " + asciiValue);
        
        char digit = '5';
        int digitValue = digit;
        System.out.println("Character: " + digit);
        System.out.println("ASCII Value: " + digitValue);
    }
}`,
    },
    {
      question: 'Convert a double value to int, showing truncation of decimal part.',
      solution: 'Use explicit casting (int) to convert double to int.',
      solutionCode: `public class DoubleToInt {
    public static void main(String[] args) {
        double price = 99.99;
        int intPrice = (int) price;
        
        System.out.println("Original price: $" + price);
        System.out.println("Truncated price: $" + intPrice);
        
        double value = 123.456;
        int intValue = (int) value;
        System.out.println("Original: " + value);
        System.out.println("Truncated: " + intValue);
    }
}`,
    },
    {
      question: 'Convert an int to char and display the character.',
      solution: 'Use explicit casting (char) to convert int to char.',
      solutionCode: `public class IntToChar {
    public static void main(String[] args) {
        int asciiValue = 65;
        char character = (char) asciiValue;  // Explicit narrowing
        
        System.out.println("ASCII Value: " + asciiValue);
        System.out.println("Character: " + character);
        
        int value = 97;
        char ch = (char) value;
        System.out.println("ASCII Value: " + value);
        System.out.println("Character: " + ch);
    }
}`,
    },
    {
      question: 'Perform arithmetic operations involving different data types and show type promotion.',
      solution: 'Perform operations between different types and observe automatic type promotion.',
      solutionCode: `public class TypePromotion {
    public static void main(String[] args) {
        byte b = 10;
        int i = 20;
        double d = 30.5;
        
        // Type promotion in expressions
        double result1 = b + i;  // byte and int promoted to int, then to double
        double result2 = i + d;   // int promoted to double
        double result3 = b + i + d;  // All promoted to double
        
        System.out.println("b + i = " + result1);
        System.out.println("i + d = " + result2);
        System.out.println("b + i + d = " + result3);
        
        // Explicit casting in expressions
        int sum = (int) (b + i + d);
        System.out.println("Sum (cast to int): " + sum);
    }
}`,
    },
  ],
}

export default function TypeCastingPage() {
  return <TopicPage content={content} />
}

