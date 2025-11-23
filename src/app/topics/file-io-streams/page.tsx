'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiFile, FiTarget } from 'react-icons/fi'

const content = {
  title: 'File I/O Streams',
  explanationSections: [
    {
      title: 'File Reading and Writing',
      icon: <FiFile className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">File I/O</span> reads from and writes to files.

Classes:
→ <span class="text-cyan-300">FileReader/FileWriter:</span> Character streams
→ <span class="text-cyan-300">BufferedReader/BufferedWriter:</span> Buffered for efficiency
→ <span class="text-cyan-300">FileInputStream/FileOutputStream:</span> Byte streams
→ <span class="text-cyan-300">Scanner:</span> Read from file

Reading:
→ <span class="text-blue-400">FileReader → BufferedReader → readLine()</span>

Writing:
→ <span class="text-blue-400">FileWriter → BufferedWriter → write()</span>`,
      code: `import java.io.*;

public class FileIODemo {
    // Writing to file
    public static void writeToFile(String filename, String content) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            writer.write(content);
            System.out.println("Written to file");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
    
    // Reading from file
    public static void readFromFile(String filename) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
    
    public static void main(String[] args) {
        writeToFile("test.txt", "Hello World\\nJava Programming");
        readFromFile("test.txt");
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Write a program to read from a file and display its contents.',
      solution: 'Use BufferedReader with FileReader to read file line by line.',
      solutionCode: `import java.io.*;

public class FileReadExample {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
    },
  ],
}

export default function FileIOStreamsPage() {
  return <TopicPage content={content} />
}

