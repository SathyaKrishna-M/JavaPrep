'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLock, FiTarget, FiCode } from 'react-icons/fi'

const content = {
  title: 'Strings and Immutability',
  explanationSections: [
    {
      title: 'Introduction to Strings',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">String</span> is a sequence of characters in Java.

Key Points:
→ <span class="text-cyan-300">Reference type:</span> String is a class, not primitive
→ <span class="text-cyan-300">Immutable:</span> Cannot be changed after creation
→ <span class="text-cyan-300">String Pool:</span> Java optimizes string storage
→ <span class="text-cyan-300">Two ways to create:</span> Literal and new keyword

Creation:
→ <span class="text-blue-400">String str = "Hello";</span> (literal - uses pool)
→ <span class="text-blue-400">String str = new String("Hello");</span> (new object)`,
      code: `public class StringIntro {
    public static void main(String[] args) {
        // String literal (uses string pool)
        String str1 = "Hello";
        String str2 = "Hello";
        
        // String object (creates new object)
        String str3 = new String("Hello");
        
        // Comparison
        System.out.println("str1 == str2: " + (str1 == str2));  // true (same reference)
        System.out.println("str1 == str3: " + (str1 == str3));  // false (different objects)
        System.out.println("str1.equals(str3): " + str1.equals(str3));  // true (same content)
        
        // String methods
        System.out.println("Length: " + str1.length());
        System.out.println("Uppercase: " + str1.toUpperCase());
        System.out.println("Lowercase: " + str1.toLowerCase());
    }
}`,
    },
    {
      title: 'String Immutability',
      icon: <FiLock className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">String Immutability</span> means strings cannot be changed after creation.

What Happens:
→ <span class="text-cyan-300">Operations create new strings:</span> Original string unchanged
→ <span class="text-cyan-300">Memory efficient:</span> String pool reuses strings
→ <span class="text-cyan-300">Thread safe:</span> Immutable objects are thread-safe

Example:
→ <span class="text-blue-400">str = str + " World";</span>
→ <span class="text-cyan-300">Creates new string:</span> Original "Hello" still exists
→ <span class="text-cyan-300">str references new string:</span> "Hello World"`,
      code: `public class StringImmutability {
    public static void main(String[] args) {
        String str = "Hello";
        System.out.println("Original: " + str);
        System.out.println("Hash code: " + str.hashCode());
        
        // String operations create new strings
        str = str + " World";
        System.out.println("After concatenation: " + str);
        System.out.println("New hash code: " + str.hashCode());
        
        // Original "Hello" still exists in memory
        String original = "Hello";
        System.out.println("Original still exists: " + original);
        
        // toUpperCase() creates new string
        String upper = str.toUpperCase();
        System.out.println("Uppercase: " + upper);
        System.out.println("Original unchanged: " + str);
    }
}`,
    },
    {
      title: 'Common String Methods',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Common String Methods</span> for string manipulation.

Important Methods:
→ <span class="text-cyan-300">length():</span> Get string length
→ <span class="text-cyan-300">charAt(index):</span> Get character at index
→ <span class="text-cyan-300">substring(start, end):</span> Extract substring
→ <span class="text-cyan-300">indexOf(str):</span> Find index of substring
→ <span class="text-cyan-300">equals(str):</span> Compare strings
→ <span class="text-cyan-300">toUpperCase()/toLowerCase():</span> Change case
→ <span class="text-cyan-300">trim():</span> Remove leading/trailing spaces`,
      code: `public class StringMethods {
    public static void main(String[] args) {
        String str = "  Hello World  ";
        
        // Length
        System.out.println("Length: " + str.length());
        
        // Character access
        System.out.println("Char at 5: " + str.charAt(5));
        
        // Substring
        System.out.println("Substring (0,5): " + str.substring(0, 5));
        System.out.println("Substring (7): " + str.substring(7));
        
        // Index of
        System.out.println("Index of 'World': " + str.indexOf("World"));
        
        // Case conversion
        System.out.println("Uppercase: " + str.toUpperCase());
        System.out.println("Lowercase: " + str.toLowerCase());
        
        // Trim
        System.out.println("Trimmed: '" + str.trim() + "'");
        
        // Comparison
        System.out.println("Equals 'Hello': " + str.trim().equals("Hello World"));
        System.out.println("Starts with 'Hello': " + str.trim().startsWith("Hello"));
        System.out.println("Ends with 'World': " + str.trim().endsWith("World"));
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Create a String variable and demonstrate various string operations.',
      solution: 'Create a string and use methods like length(), toUpperCase(), substring().',
      solutionCode: `public class StringOperations {
    public static void main(String[] args) {
        String text = "Java Programming";
        
        System.out.println("Original: " + text);
        System.out.println("Length: " + text.length());
        System.out.println("Uppercase: " + text.toUpperCase());
        System.out.println("Lowercase: " + text.toLowerCase());
        System.out.println("Substring: " + text.substring(0, 4));
        System.out.println("Char at 5: " + text.charAt(5));
    }
}`,
    },
    {
      question: 'Demonstrate string immutability by showing that string operations create new strings.',
      solution: 'Perform string operations and show that original string remains unchanged.',
      solutionCode: `public class ImmutabilityDemo {
    public static void main(String[] args) {
        String original = "Hello";
        System.out.println("Original: " + original);
        
        String modified = original + " World";
        System.out.println("Modified: " + modified);
        System.out.println("Original unchanged: " + original);
        
        String upper = original.toUpperCase();
        System.out.println("Uppercase: " + upper);
        System.out.println("Original still: " + original);
    }
}`,
    },
    {
      question: 'Compare two strings using == and equals() methods. Explain the difference.',
      solution: 'Use == for reference comparison and equals() for content comparison.',
      solutionCode: `public class StringComparison {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "Hello";
        String str3 = new String("Hello");
        
        System.out.println("str1 == str2: " + (str1 == str2));  // true
        System.out.println("str1 == str3: " + (str1 == str3));  // false
        System.out.println("str1.equals(str3): " + str1.equals(str3));  // true
    }
}`,
    },
  ],
}

export default function StringsImmutabilityPage() {
  return <TopicPage content={content} />
}

