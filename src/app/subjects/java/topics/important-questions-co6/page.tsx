'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DMTopicPage'
import { FiList } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Important Questions (CO6)',
    explanationSections: [
        {
            title: 'CO6 Important Practice Questions',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        This section contains a curated list of <span className="text-blue-400 font-semibold">10 Important Questions</span> covering <span className="text-yellow-400">CO6</span> (Exception Handling and File I/O).
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Exception Handling (Rules, Checked vs Unchecked)</li>
                            <li>User-Defined Exceptions (Banking, Licensing)</li>
                            <li>File I/O (FileReader/Writer, FileOutputStream)</li>
                        </ul>
                    </div>
                </div>
            ),
        }
    ] as ExplanationSection[],
    practiceQuestions: [
        // Exception Handling
        {
            question: '1. Explain about the Role of try, catch, throw, throws and finally in exception handling',
            solution: (
                <div className="space-y-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300 border-collapse border border-gray-700">
                            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 border border-gray-700">Keyword</th>
                                    <th className="px-6 py-3 border border-gray-700">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-mono text-blue-400">try</td>
                                    <td className="px-6 py-4">Block of code where exceptions might occur. Must be followed by catch or finally.</td>
                                </tr>
                                <tr className="bg-gray-800 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-mono text-blue-400">catch</td>
                                    <td className="px-6 py-4">Catches and handles the exception thrown by the try block.</td>
                                </tr>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-mono text-blue-400">finally</td>
                                    <td className="px-6 py-4">Block that always executes (success or exception). Used for cleanup (closing connections).</td>
                                </tr>
                                <tr className="bg-gray-800 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-mono text-blue-400">throw</td>
                                    <td className="px-6 py-4">Used to explicitly throw an exception object from within a method.</td>
                                </tr>
                                <tr className="bg-gray-900">
                                    <td className="px-6 py-4 border-r border-gray-700 font-mono text-blue-400">throws</td>
                                    <td className="px-6 py-4">Used in method signature to declare that the method might throw specific exceptions.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ),
        },
        {
            question: '2. Differentiate between checked and unchecked exception',
            solution: (
                <div className="space-y-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300 border-collapse border border-gray-700">
                            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 border border-gray-700">Feature</th>
                                    <th className="px-6 py-3 border border-gray-700">Checked Exceptions</th>
                                    <th className="px-6 py-3 border border-gray-700">Unchecked Exceptions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Checking Time</td>
                                    <td className="px-6 py-4 border-r border-gray-700">Checked at <strong>Compile Time</strong>.</td>
                                    <td className="px-6 py-4">Checked at <strong>Runtime</strong>.</td>
                                </tr>
                                <tr className="bg-gray-800 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Handling</td>
                                    <td className="px-6 py-4 border-r border-gray-700">Must be handled (try-catch) or declared (throws).</td>
                                    <td className="px-6 py-4">Handling is optional.</td>
                                </tr>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Examples</td>
                                    <td className="px-6 py-4 border-r border-gray-700"><code>IOException</code>, <code>SQLException</code></td>
                                    <td className="px-6 py-4"><code>NullPointerException</code>, <code>ArithmeticException</code></td>
                                </tr>
                                <tr className="bg-gray-800">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Inheritance</td>
                                    <td className="px-6 py-4 border-r border-gray-700">Subclasses of <code>Exception</code> (excluding RuntimeException).</td>
                                    <td className="px-6 py-4">Subclasses of <code>RuntimeException</code>.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ),
        },
        {
            question: '3. Develop a Java program that checks driving license eligibility using user defined exceptions (AgeException, LicenseFailException)',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300 text-sm">Classes: Candidate, AgeException, LicenseFailException, DLExceptionDemo.</p>
                    <CodeBlock code={`import java.util.Scanner;

// Custom Exceptions
class AgeException extends Exception {
    public AgeException(String message) { super(message); }
}

class LicenseFailException extends Exception {
    public LicenseFailException(String message) { super(message); }
}

class Candidate {
    int id;
    String name;
    int age;

    public Candidate(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public void apply(int score) throws AgeException, LicenseFailException {
        if (this.age < 18) {
            throw new AgeException("Not Eligible: Age is less than 18");
        }
        if (score < 70) {
            throw new LicenseFailException("Not Eligible: Driving Test Score below 70");
        }
        System.out.println("Congratulations! License Granted.");
    }
}

public class DLExceptionDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            System.out.println("Enter ID, Name, Age:");
            int id = sc.nextInt();
            String name = sc.next();
            int age = sc.nextInt();

            Candidate c = new Candidate(id, name, age);
            
            System.out.print("Enter Driving Score: ");
            int score = sc.nextInt();

            c.apply(score);

        } catch (AgeException e) {
            System.out.println("Exception: " + e.getMessage());
        } catch (LicenseFailException e) {
            System.out.println("Exception: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Invalid Input");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output 1:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter ID, Name, Age: 101 Tom 16<br />
                            Enter Driving Score: 80<br />
                            Exception: Not Eligible: Age is less than 18
                        </pre>
                        <p className="text-sm font-mono text-gray-300 mt-2"><strong>Output 2:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter ID, Name, Age: 102 Jerry 20<br />
                            Enter Driving Score: 50<br />
                            Exception: Not Eligible: Driving Test Score below 70
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '4. Develop a Java program that checks loan eligibility using user-defined exceptions (NoPANCardException, LowCIBILScoreException)',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300 text-sm">Classes: LoanCustomer, NoPANCardException, LowCIBILScoreException, LoanExceptionDemo.</p>
                    <CodeBlock code={`class NoPANCardException extends Exception {
    public NoPANCardException(String s) { super(s); }
}

class LowCIBILScoreException extends Exception {
    public LowCIBILScoreException(String s) { super(s); }
}

class LoanCustomer {
    int id;
    String name;
    boolean hasPan;
    
    public LoanCustomer(int id, String name, boolean hasPan) {
        this.id = id;
        this.name = name;
        this.hasPan = hasPan;
    }

    public void applyLoan(int cibil) throws NoPANCardException, LowCIBILScoreException {
        if (!hasPan) {
            throw new NoPANCardException("Loan Rejected: PAN Card Required.");
        }
        if (cibil < 500) {
            throw new LowCIBILScoreException("Loan Rejected: Low CIBIL Score.");
        }
        System.out.println("Loan Approved Successfully!");
    }
}

public class LoanExceptionDemo {
    public static void main(String[] args) {
        try {
            // Case 1: No PAN
            LoanCustomer c1 = new LoanCustomer(1, "Alice", false);
            c1.applyLoan(750);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        try {
            // Case 2: Low CIBIL
            LoanCustomer c2 = new LoanCustomer(2, "Bob", true);
            c2.applyLoan(400);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Loan Rejected: PAN Card Required.<br />
                            Loan Rejected: Low CIBIL Score.
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '5. Create a Java program that reads an index from the user, performs division (a[i]/i) and modulus (a[i]%i) ... handling ArithmeticException, ArrayIndexOutOfBoundsException',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class ArrayExceptionDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] a = {10, 20, 30, 40, 50}; // Size 5 (Indices 0-4)

        try {
            System.out.print("Enter index: ");
            int i = sc.nextInt();
            
            // May throw ArrayIndexOutOfBoundsException
            int val = a[i]; 

            // May throw ArithmeticException if i is 0
            System.out.println("Division (a[i]/i): " + (val / i));
            System.out.println("Modulus (a[i]%i): " + (val % i));

        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero.");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: Index is out of bounds.");
        } catch (Exception e) {
            System.out.println("Error: Some other exception occurred (" + e + ")");
        } finally {
            sc.close();
            System.out.println("Execution Completed.");
        }
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output 1 (Valid):</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter index: 2<br />
                            Division (a[i]/i): 15<br />
                            Modulus (a[i]%i): 0
                        </pre>
                        <p className="text-sm font-mono text-gray-300 mt-2"><strong>Output 2 (Zero):</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter index: 0<br />
                            Error: Cannot divide by zero.
                        </pre>
                        <p className="text-sm font-mono text-gray-300 mt-2"><strong>Output 3 (Bounds):</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter index: 10<br />
                            Error: Index is out of bounds.
                        </pre>
                    </div>
                </div>
            ),
        },

        // File Handling
        {
            question: '6. Write a java program to write text data into a file(Use FileWriter)',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.io.FileWriter;
import java.io.IOException;

public class WriteFileDemo {
    public static void main(String[] args) {
        // Automatically closes the file using try-with-resources
        try (FileWriter fw = new FileWriter("output.txt")) {
            fw.write("Hello, World!\\n");
            fw.write("Java File Handling is easy.");
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Successfully wrote to the file.
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '7. Write a java program to read text data from the file and count number of lines, number of words and number of alphabets(Use FileReader)',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;

public class FileCounter {
    public static void main(String[] args) {
        int lines = 0, words = 0, chars = 0;
        
        try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines++;
                chars += line.length(); // Counting characters (including spaces)
                
                String[] wordsArray = line.trim().split("\\\s+");
                if (line.trim().length() > 0) {
                     words += wordsArray.length;
                }
            }
            
            System.out.println("Lines: " + lines);
            System.out.println("Words: " + words);
            System.out.println("Chars: " + chars);
            
        } catch (IOException e) {
            System.out.println("Error reading file.");
        }
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Logic:</strong></p>
                        <p className="text-xs text-gray-400 mb-2">
                            Assumes input.txt exists. <code>readLine()</code> gets lines. <code>split(&quot;\\\\s+&quot;)</code> gets words. <code>length()</code> gets characters.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            question: '8. Write a java program to write binary data into a file(Use FileOutputStream)',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.io.FileOutputStream;
import java.io.IOException;

public class ByteWriteDemo {
    public static void main(String[] args) {
        String data = "This is binary data writing example.";
        
        try (FileOutputStream fos = new FileOutputStream("binary.dat")) {
            byte[] bytes = data.getBytes(); // Convert string to byte array
            fos.write(bytes);
            System.out.println("Binary data written successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Binary data written successfully.
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '9. Write a java to read 2 numbers from the file and perform addition and show the result. (Use FileOutputStream)',
            solution: (
                <div className="space-y-4">
                    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-2 mb-2">
                        <p className="text-xs text-yellow-200">
                            Note: <code>FileOutputStream</code> is for writing. For reading numbers, we use <code>FileInputStream</code> or <code>Scanner</code>. The code below reads input from a file named &quot;numbers.txt&quot; containing two integers.
                        </p>
                    </div>
                    <CodeBlock code={`import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class FileAdd {
    public static void main(String[] args) {
        try {
            File myObj = new File("numbers.txt");
            Scanner myReader = new Scanner(myObj);
            
            if (myReader.hasNextInt()) {
                int num1 = myReader.nextInt();
                if (myReader.hasNextInt()) {
                    int num2 = myReader.nextInt();
                    int sum = num1 + num2;
                    System.out.println("Read " + num1 + " and " + num2);
                    System.out.println("Sum: " + sum);
                }
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output (if numbers.txt contains &quot;10 20&quot;):</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Read 10 and 20<br />
                            Sum: 30
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '10. Write a java program to copy the content of one file into another file.',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileCopy {
    public static void main(String[] args) {
        // Try-with-resources handles closing streams automatically
        try (FileInputStream fis = new FileInputStream("source.txt");
             FileOutputStream fos = new FileOutputStream("dest.txt")) {
            
            int c;
            // Read byte by byte. -1 indicates end of file.
            while ((c = fis.read()) != -1) {
                fos.write(c);
            }
            
            System.out.println("File copied successfully!");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            File copied successfully!
                        </pre>
                    </div>
                </div>
            ),
        },
    ] as PracticeQuestion[]
}

export default function Page() {
    return <DMTopicPage content={content} subjectName="Java" subjectHref="/subjects/java" />
}
