'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiSearch, FiCheckCircle, FiShield, FiFilter } from 'react-icons/fi'

const content = {
  title: 'Regex - Pattern Matching',
  explanationSections: [
    {
      title: 'Introduction: Advanced Find & Replace',
      icon: <FiSearch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Regular Expressions (Regex)</span> are a powerful language for matching patterns in text.
            Think of it as <span className="text-cyan-400 font-bold">Find & Replace on Steroids</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Exact Match:</span> "Apple" matches only "Apple".
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Pattern Match:</span> "\d{3}" matches ANY 3 digits (123, 999, 007).
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Wildcards:</span> "C.t" matches Cat, Cut, Cot, etc.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Common Cheat Sheet',
      icon: <FiFilter className="w-6 h-6" />,
      content: `Basic building blocks of Regex:

1. <span class="text-blue-400 font-semibold">Quantifiers:</span>
   - \`*\`: 0 or more
   - \`+\`: 1 or more
   - \`?\`: 0 or 1
   - \`{n}\`: Exactly n times

2. <span class="text-blue-400 font-semibold">Character Classes:</span>
   - \`\\d\`: Digit [0-9]
   - \`\\w\`: Word char [a-zA-Z0-9_]
   - \`\\s\`: Whitespace
   - \`.\`: Any character

3. <span class="text-blue-400 font-semibold">Anchors:</span>
   - \`^\`: Start of line
   - \`$\`: End of line`,
      code: `import java.util.regex.*;

public class RegexBasics {
    public static void main(String[] args) {
        String input = "Order #1234 placed.";
        
        // Match ANY digits
        Pattern p = Pattern.compile("\\\\d+"); 
        Matcher m = p.matcher(input);
        
        if (m.find()) {
            System.out.println("Found number: " + m.group()); // "1234"
        }
    }
}`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Email Extraction',
      solution: 'Scan a text block and find all valid email addresses.',
      steps: [
        {
          step: '1. Define Pattern',
          explanation: 'Use `[\\w._%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}` for basic email matching.'
        },
        {
          step: '2. Iterate Loop',
          explanation: 'Use `while(matcher.find())` to get all matches.'
        }
      ],
      code: `import java.util.regex.*;

public class EmailScanner {
    public static void main(String[] args) {
        String text = "Contact support@site.com or sales@site.org";
        Pattern p = Pattern.compile("[\\\\w._%+-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,}");
        Matcher m = p.matcher(text);
        
        while(m.find()) {
            System.out.println("Found: " + m.group());
        }
        // Output:
        // Found: support@site.com
        // Found: sales@site.org
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Validate a 10-digit Phone Number.',
      solution: 'Pattern must start with digit, have exactly 10 digits, and end.',
      solutionCode: `import java.util.regex.*;

public class PhoneValidator {
    public static boolean isValid(String phone) {
        // ^ = Start, \\d{10} = 10 digits, $ = End
        return Pattern.matches("^\\\\d{10}$", phone);
    }
}`
    },
    {
      question: 'Replace all multiple spaces with a single space.',
      solution: 'Use replaceAll() with "\\s+".',
      solutionCode: `public class Spacer {
    public static void main(String[] args) {
        String messy = "Hello    World   !";
        String clean = messy.replaceAll("\\\\s+", " ");
        System.out.println(clean); // "Hello World !"
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class Main {
    public static void main(String[] args) {
        String txt = "A1 B2";
        // Find digit
        Pattern p = Pattern.compile("\\\\d");
        Matcher m = p.matcher(txt);
        while(m.find()) {
            System.out.println(m.group());
        }
    }
}`,
  dryRunSteps: [
    { line: 5, vars: { p: 'Pattern(\\d)' }, output: '', description: 'Compiles regex \\d (Digit).' },
    { line: 6, vars: { m: 'Matcher' }, output: '', description: 'Creates matcher for "A1 B2".' },
    { line: 7, vars: { 'm.find()': true }, output: '', description: 'find() scans... Skips "A", finds "1" at index 1.' },
    { line: 8, vars: { 'm.group()': '"1"' }, output: '1\\n', description: 'Prints match.' },
    { line: 7, vars: { 'm.find()': true }, output: '', description: 'find() resumes... Skips " ", Skips "B", finds "2" at index 4.' },
    { line: 8, vars: { 'm.group()': '"2"' }, output: '2\\n', description: 'Prints match.' },
    { line: 7, vars: { 'm.find()': false }, output: '', description: 'find() resumes... End of string. Returns false.' },
  ] as DryRunStep[]
}

export default function RegexPatternMatchingPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
