'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiLock, FiTarget, FiCode, FiMail } from 'react-icons/fi'

const content = {
  title: 'Strings and Immutability',
  explanationSections: [
    {
      title: 'Introduction: The Sealed Envelope',
      icon: <FiMail className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Strings</span> in Java are immutable.
            Think of them as <span className="text-cyan-400 font-bold">Sealed Envelopes</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Write Once:</span> Once you write a letter and seal it (create a String), you cannot change the ink inside.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Modifiers Create Copies:</span> If you want to change the message, you must write a <span className="text-amber-300">brand new letter</span> (new String object) and seal it in a new envelope. The old one remains trash until collected.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'String Constant Pool (SCP)',
      icon: <FiTarget className="w-6 h-6" />,
      content: `Java saves memory by storing string literals in a special pool.

1. <span className="text-blue-400 font-semibold">String s1 = "Hello";</span>
   - Checks SCP. If "Hello" exists, reuses it.
2. <span className="text-blue-400 font-semibold">String s2 = "Hello";</span>
   - Finds "Hello", points s2 to the SAME address.
3. <span className="text-blue-400 font-semibold">String s3 = new String("Hello");</span>
   - Forces creation of a NEW object in Heap (outside pool).`,
      code: `public class StringPool {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");
        
        // == compares ADDRESS (Reference)
        System.out.println(s1 == s2); // true (Same pool object)
        System.out.println(s1 == s3); // false (Different objects)
        
        // .equals compares CONTENT (Value)
        System.out.println(s1.equals(s3)); // true
    }
}`
    },
    {
      title: 'Why Immutability?',
      icon: <FiLock className="w-6 h-6" />,
      content: `Why can't we change Strings?

1. <span className="text-cyan-300">Security:</span> Database URLs, usernames, etc. can't be changed accidentally or maliciously once passed.
2. <span className="text-cyan-300">Caching:</span> HashCodes can be cached (great for HashMaps).
3. <span className="text-cyan-300">Thread Safety:</span> Multiple threads can read the same String without locking.`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'String Reversal',
      solution: 'Manually reverse a string using a loop (since we can\'t modify it in place).',
      steps: [
        {
          step: '1. Initialize',
          explanation: 'Create an empty string `rev = ""`. Access characters from end to start.'
        },
        {
          step: '2. Concatenate',
          explanation: 'In each loop iteration, `rev = rev + char`. Note: This creates N new string objects (inefficient but educational).'
        }
      ],
      code: `public class Reverse {
    public static void main(String[] args) {
        String original = "Code";
        String rev = "";
        
        for (int i = original.length() - 1; i >= 0; i--) {
            rev = rev + original.charAt(i);
        }
        
        System.out.println(rev); // "edoC"
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Check if a string is a Palindrome (reads same forwards and backwards).',
      solution: 'Reverse the string and use .equals() to compare with original.',
      solutionCode: `public class Palindrome {
    public static boolean check(String str) {
        String rev = "";
        for (int i = str.length() - 1; i >= 0; i--) {
            rev += str.charAt(i);
        }
        return str.equals(rev);
    }
}`
    },
    {
      question: 'Count the number of vowels in a string.',
      solution: 'Loop through string, check if charAt(i) is a,e,i,o,u.',
      solutionCode: `public class Vowels {
    public static int count(String s) {
        int count = 0;
        String lower = s.toLowerCase();
        for (int i=0; i<s.length(); i++) {
            char c = lower.charAt(i);
            if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++;
        }
        return count;
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class Main {
    public static void main(String[] args) {
        String s = "Hi";
        s = s + "!";
        System.out.println(s);
    }
}`,
  dryRunSteps: [
    { line: 3, vars: { s: '"Hi" (Pool@100)' }, output: '', description: 's points to "Hi" in String Pool.' },
    { line: 4, vars: { s: '"Hi!" (Heap@200)' }, output: '', description: 'Concatenation creates NEW string "Hi!". s now points to new address. "Hi" is abandoned.' },
    { line: 5, vars: { s: '"Hi!" (Heap@200)' }, output: 'Hi!\\n', description: 'Prints the new string.' },
  ] as DryRunStep[]
}

export default function StringsImmutabilityPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
