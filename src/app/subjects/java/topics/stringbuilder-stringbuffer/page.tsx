'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiTool, FiTarget, FiEdit2, FiRepeat } from 'react-icons/fi'

const content = {
  title: 'StringBuilder & StringBuffer',
  explanationSections: [
    {
      title: 'Introduction: The Whiteboard',
      icon: <FiEdit2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">StringBuilder</span> allows for mutable strings.
            Think of it as a <span className="text-cyan-400 font-bold">Whiteboard</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Mutable:</span> You can write, erase, and overwrite on the same board without needing a new one.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Efficient:</span> Modifying a String directly creates garbage (old strings). Modifying a StringBuilder simply updates the internal array.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'StringBuilder vs StringBuffer',
      icon: <FiTool className="w-6 h-6" />,
      content: `Both classes provide the same API for string manipulation. The difference is thread safety.

1. <span class="text-blue-400 font-semibold">StringBuilder (Fast):</span>
   - Not thread-safe.
   - Use in single-threaded environments (most common).
   - <span class="text-green-400">Preferred Choice.</span>

2. <span class="text-blue-400 font-semibold">StringBuffer (Safe):</span>
   - Thread-safe (Synchronized).
   - Slower due to locking overhead.
   - Use only when multiple threads modify the same string.`,
      code: `public class BuilderVsBuffer {
    public static void main(String[] args) {
        // Fast, Mutable
        StringBuilder sb = new StringBuilder("Start");
        sb.append(" Finishing");
        System.out.println(sb); 

        // Thread-Safe, Mutable
        StringBuffer sbf = new StringBuffer("Secure");
        sbf.append(" Start");
        System.out.println(sbf);
    }
}`
    },
    {
      title: 'Common Methods',
      icon: <FiRepeat className="w-6 h-6" />,
      content: `Use these methods to manipulate content *in-place*.

- \`.append(str)\`: Add to end.
- \`.insert(index, str)\`: Add to middle.
- \`.delete(start, end)\`: Remove section.
- \`.reverse()\`: Flip content.
- \`.toString()\`: Convert back to immutable String.`,
      code: `public class Operations {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Java");
        
        sb.append(" Rules");     // "Java Rules"
        sb.insert(5, "Core ");   // "Java Core Rules"
        sb.replace(0, 4, "Key"); // "Key Core Rules"
        sb.delete(4, 9);         // "Key Rules"
        sb.reverse();            // "seluR yeK"
        
        System.out.println(sb.toString());
    }
}`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Efficient Concatenation',
      solution: 'Concatenate numbers 0 to 9999. Using String + operator is O(N^2). StringBuilder is O(N).',
      steps: [
        {
          step: '1. Create Builder',
          explanation: 'Initialize `sb`.'
        },
        {
          step: '2. Loop & Append',
          explanation: 'Append each number to the buffer.'
        }
      ],
      code: `public class Efficiency {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            sb.append(i);
        }
        
        System.out.println("Time: " + (System.currentTimeMillis() - start) + "ms");
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Reverse a String using StringBuilder.',
      solution: 'Create StringBuilder with input string, call reverse(), then toString().',
      solutionCode: `public class Reverse {
    public static String reverseString(String input) {
        return new StringBuilder(input).reverse().toString();
    }
}`
    },
    {
      question: 'Remove all vowels from a string.',
      solution: 'Loop through string, if char is NOT vowel, append to StringBuilder. Efficient filtering.',
      solutionCode: `public class RemoveVowels {
    public static String remove(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if ("aeiouAEIOU".indexOf(c) == -1) {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hi");
        sb.append("!");
        System.out.println(sb);
    }
}`,
  dryRunSteps: [
    { line: 3, vars: { sb: 'SB@100 ["H", "i", _, _...]' }, output: '', description: 'Creates StringBuilder. Internal array has capacity (default 16 + length).' },
    { line: 4, vars: { sb: 'SB@100 ["H", "i", "!", _...]' }, output: '', description: 'Appends "!". Modifies SAME object at address 100.' },
    { line: 5, vars: {}, output: 'Hi!\\n', description: 'Prints content.' },
  ] as DryRunStep[]
}

export default function StringBuilderStringBufferPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
