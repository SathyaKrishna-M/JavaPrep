'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiAlertTriangle, FiShield, FiRepeat, FiAlertCircle, FiLayers } from 'react-icons/fi'

const content = {
  title: 'Exception Handling',
  explanationSections: [
    {
      title: 'Introduction: The Safety Net',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            An <span className="text-blue-400 font-semibold">Exception</span> is an event that disrupts the normal flow of the program.
            Think of a <span className="text-cyan-400 font-bold">Trapeze Artist</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Normal Flow:</span> The artist swings from bar to bar successfully.
              </li>
              <li>
                <span className="text-red-400 font-semibold">Exception:</span> The artist slips and falls! (e.g., Division by Zero, File Not Found).
              </li>
              <li>
                <span className="text-green-400 font-semibold">Catch Block:</span> The <span className="font-bold">Safety Net</span> at the bottom catches them. The show continues!
              </li>
              <li>
                <span className="text-blue-400 font-semibold">Crash:</span> Without the net, the show ends abruptly (Program Terminates).
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Exception Hierarchy',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            All exceptions inherit from the <code>Throwable</code> class.
          </p>
          <div className="flex justify-center my-4">
            <div className="bg-black/30 p-4 rounded-xl border border-gray-800 text-center w-full">
              <div className="font-bold text-red-500 mb-2">Throwable</div>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <div className="flex flex-col items-center">
                  <div className="h-4 w-0.5 bg-gray-600 hidden md:block"></div>
                  <div className="p-2 bg-gray-800 rounded text-sm text-red-300 w-32 border border-red-900/50">Error</div>
                  <div className="text-xs text-gray-500 mt-1">System Failures<br />(OutOfMemory)<br />Unrecoverable</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-4 w-0.5 bg-gray-600 hidden md:block"></div>
                  <div className="p-2 bg-gray-800 rounded text-sm text-yellow-300 w-32 border border-yellow-900/50">Exception</div>
                  <div className="flex gap-2 mt-2">
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-green-400 border border-green-900/50 p-1 rounded w-24">Checked<br />(Compile-time)</div>
                      <p className="text-[10px] text-gray-500 mt-1">IOException, SQLException</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-orange-400 border border-orange-900/50 p-1 rounded w-24">Unchecked<br />(Run-time)</div>
                      <p className="text-[10px] text-gray-500 mt-1">NullPointer, Arithmetic</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Keywords: try, catch, finally',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 p-3 rounded">
            <h5 className="text-blue-400 font-bold">try</h5>
            <p className="text-xs text-gray-400">The &quot;Risk Zone&quot;. Code that might throw an error goes here.</p>
          </div>
          <div className="bg-gray-800/50 p-3 rounded">
            <h5 className="text-green-400 font-bold">catch</h5>
            <p className="text-xs text-gray-400">The &quot;Handler&quot;. Catches specific exceptions thrown in the try block.</p>
          </div>
          <div className="bg-gray-800/50 p-3 rounded">
            <h5 className="text-purple-400 font-bold">finally</h5>
            <p className="text-xs text-gray-400">The &quot;Cleanup Crew&quot;. Executes ALWAYS, whether an exception occurred or not.</p>
          </div>
        </div>
      ),
      code: `public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int data = 50 / 0; // Risky code
            System.out.println("Result: " + data); // Skipped
        } catch (ArithmeticException e) {
            System.out.println("Caught: Division by zero!"); // Safety net
        } finally {
            System.out.println("Cleanup: Closing connections..."); // Always runs
        }
    }
}
// Output:
// Caught: Division by zero!
// Cleanup: Closing connections...`
    },
    {
      title: 'throw vs throws',
      icon: <FiRepeat className="w-6 h-6" />,
      content: '<p className="text-gray-300"><b>throw:</b> Used <i>inside</i> a method to explicitly throw an exception object.<br/><b>throws:</b> Used in the <i>method signature</i> to declare that this method <i>might</i> throw an exception, forcing the caller to handle it.</p>',
      code: `// 'throws' warns the caller
static void checkAge(int age) throws ArithmeticException {
    if (age < 18) {
        // 'throw' actually throws it
        throw new ArithmeticException("Access Denied - Too young"); 
    } else {
        System.out.println("Access Granted");
    }
}

public static void main(String[] args) {
    try {
        checkAge(15);
    } catch (ArithmeticException e) {
        System.out.println("Exception: " + e.getMessage());
    }
}
// Output:
// Exception: Access Denied - Too young`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Handling Multiple Exceptions',
      solution: 'A single try block can have multiple catch blocks. Specific exceptions must come BEFORE generic ones.',
      steps: [
        {
          step: '1. Specific Catch',
          explanation: 'Catch `ArithmeticException` (math errors) and `ArrayIndexOutOfBoundsException` (array errors) individually.'
        },
        {
          step: '2. Generic Catch',
          explanation: 'Catch `Exception` at the end to handle any other unforeseen errors. This is the &quot;catch-all&quot; bucket.'
        }
      ],
      code: `public class MultipleCatch {
    public static void main(String[] args) {
        try {
            int[] numbers = new int[5];
            numbers[10] = 50 / 0; // Index 10 doesn't exist AND div by 0? 
                                  // (Actually div by 0 happens first here as it is evaluated before assignment)
        } catch (ArithmeticException e) {
            System.out.println("Math Error: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index Error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Generic Error: " + e.getMessage()); 
        }
        System.out.println("Program continues...");
    }
}
// Output:
// Math Error: / by zero
// Program continues...`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'What happens if you put catch(Exception e) before catch(ArithmeticException e)?',
      solution: 'Compile-time error! &quot;Unreachable code&quot;. Child exceptions must be caught before Parent exceptions. Since Exception catches everything, the specialized block underneath would never be reached.',
      solutionCode: `// ERROR: Unreachable code
/*
try {
   int x = 10/0;
} catch (Exception e) { 
   // Handles everything
} catch (ArithmeticException e) { // COMPILER ERROR
   // "I will never reach here!"
}
*/`
    },
    {
      question: 'Does generic catch block handle Errors (like StackOverflowError)?',
      solution: 'No. Check the hierarchy. `Exception` is a sibling of `Error`. To catch errors, you need `catch(Throwable t)` or `catch(Error e)`, but catching Errors is usually bad practice as they indicate serious system failures you cannot recover from.',
      solutionCode: `try {
    recursive(); // Causes StackOverflowError
} catch (Exception e) {
    // Will NOT catch it
} catch (Error e) {
    // Will catch it, but you likely can't fix the stack being full.
    // Best to let the program crash and fix the code.
}`
    }
  ] as PracticeQuestion[]
}

export default function ExceptionHandlingPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
