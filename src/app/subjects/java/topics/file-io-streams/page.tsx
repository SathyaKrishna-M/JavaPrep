'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiHardDrive, FiServer, FiFileText, FiFolder } from 'react-icons/fi'

const content = {
    title: 'File I/O Streams',
    explanationSections: [
        {
            title: 'Introduction: The Water Pipes',
            icon: <FiHardDrive className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        An <span className="text-blue-400 font-semibold">I/O Stream</span> represents a flow of data.
                        Think of it as <span className="text-cyan-400 font-bold">Water Pipes</span> connecting your program to a File.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">Input Stream:</span> A pipe bringing water <em>INTO</em> your house (Reading data).
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Output Stream:</span> A pipe draining water <em>OUT</em> of your house (Writing data).
                            </li>
                            <li>
                                <span className="text-blue-400 font-semibold">Buffered Streams:</span> A holding tank. Instead of turning the pump on for every single drop (byte), you fill a bucket and move it all at once. Highly efficient!
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Byte vs Character Streams',
            icon: <FiServer className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-blue-400 font-mono mb-2">Byte Streams (Raw)</h5>
                            <p className="text-xs text-gray-400 mb-2">For Images, Videos, Audio, PDFs.</p>
                            <ul className="list-disc list-inside text-xs text-gray-300">
                                <li>FileInputStream</li>
                                <li>FileOutputStream</li>
                                <li>Reads/Writes 8-bit bytes.</li>
                            </ul>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-green-400 font-mono mb-2">Character Streams (Text)</h5>
                            <p className="text-xs text-gray-400 mb-2">For Text Files (.txt, .json, .csv).</p>
                            <ul className="list-disc list-inside text-xs text-gray-300">
                                <li>FileReader</li>
                                <li>FileWriter</li>
                                <li>Reads/Writes 16-bit Unicode characters.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
            code: `// Example: Writing Text Efficiently (Buffered)
import java.io.*;

public class WriteDemo {
    public static void main(String[] args) {
        // try-with-resources auto-closes the file (No need for 'finally')
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
            bw.write("Hello, World!");
            bw.newLine(); // Cross-platform line break
            bw.write("Java File I/O is robust.");
            System.out.println("Written successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
// Output (in output.txt):
// Hello, World!
// Java File I/O is robust.`
        },
        {
            title: 'Reading Files: Scanner vs BufferedReader',
            icon: <FiFileText className="w-6 h-6" />,
            content: '<p className="text-gray-300"><b>Scanner:</b> Best for parsing types (int, double) and tokens.<br/><b>BufferedReader:</b> Best for reading huge chunks of text (fastest).</p>',
            code: `// Method 1: BufferedReader (Fast for lines)
try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}

// Method 2: Scanner (Good for parsing inputs)
try (Scanner sc = new Scanner(new File("numbers.txt"))) {
    while (sc.hasNextInt()) {
        int num = sc.nextInt(); // Parses text to int directly
        System.out.println("Number: " + num);
    }
}`
        },
        {
            title: 'The File Class',
            icon: <FiFolder className="w-6 h-6" />,
            content: '<p className="text-gray-300">The <code>File</code> class represents the file/directory itself (metadata), not the content.</p>',
            code: `File f = new File("data/report.txt");

if (f.exists()) {
    System.out.println("Size: " + f.length() + " bytes");
    System.out.println("Writeable: " + f.canWrite());
} else {
    try {
        f.createNewFile(); // Creates empty file
        System.out.println("Created new file.");
    } catch (IOException e) { ... }
}`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Copying a Text File',
            solution: 'Read lines from input.txt and write them to output.txt.',
            steps: [
                {
                    step: '1. Setup Streams',
                    explanation: 'Use BufferedReader for input and BufferedWriter for output.'
                },
                {
                    step: '2. Try-With-Resources',
                    explanation: 'Declare both streams in the `try(...)` block so they close automatically.'
                }
            ],
            code: `import java.io.*;

public class FileCopy {
    public static void main(String[] args) {
        try (
            BufferedReader br = new BufferedReader(new FileReader("input.txt"));
            BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))
        ) {
            String line;
            while ((line = br.readLine()) != null) {
                bw.write(line);
                bw.newLine(); 
            }
            System.out.println("Copy finished.");
        } catch (IOException e) {
            System.out.println("Error processing file: " + e.getMessage());
        }
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Why should you use try-with-resources?',
            solution: 'It automatically calls `.close()` on your streams, even if an exception occurs. This prevents memory leaks and file locks. Without it, you must use a `finally` block to verify and close streams.',
            solutionCode: `// Old way (Risky if you forget finally)
// FileWriter fw = new FileWriter("a.txt");
// fw.write("Hi");
// fw.close();

// New way (Safe - Java 7+)
// try (FileWriter fw = new FileWriter("a.txt")) {
//    fw.write("Hi");
// } // Automatically closes here via AutoCloseable interface`
        },
        {
            question: 'Can FileReader read an image file?',
            solution: 'Technically yes, but it will corrupt it. Images rely on exact byte sequences. FileReader tries to interpret bytes as characters (using default encoding), changing values that aren&apos;t valid text. Use FileInputStream instead.',
            solutionCode: `// Use FileInputStream for images!`
        }
    ] as PracticeQuestion[]
}

export default function FileIOStreamsPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
