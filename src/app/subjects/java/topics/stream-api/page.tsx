'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiTrendingUp, FiFilter, FiRefreshCw, FiCopy } from 'react-icons/fi'

const content = {
  title: 'Stream API',
  explanationSections: [
    {
      title: 'Introduction: The Assembly Line',
      icon: <FiTrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            The <span className="text-blue-400 font-semibold">Stream API</span> (Java 8) is for processing sequences of elements.
            Think of it as a <span className="text-cyan-400 font-bold">Factory Assembly Line</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Source (Raw Material):</span> The start of the belt (List, Set, Array).
              </li>
              <li>
                <span className="text-blue-400 font-semibold">Intermediate Ops (Stations):</span> Robots that modify the items as they pass by. They return a new Stream.
                <ul className="pl-6 mt-1 list-circle text-sm text-gray-400">
                  <li><code>filter()</code>: Robot arm kicks off bad parts.</li>
                  <li><code>map()</code>: Paint station paints each part.</li>
                  <li><code>sorted()</code>: Organizes parts.</li>
                </ul>
              </li>
              <li>
                <span className="text-green-400 font-semibold">Terminal Op (Packaging):</span> The end of the line. Collects the result. Nothing moves until this step runs!
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Advanced Operations',
      icon: <FiFilter className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-blue-400 font-mono mb-2">flatMap()</h5>
              <p className="text-xs text-gray-400 mb-2">Flattens nested structures. <code>List&lt;List&lt;String&gt;&gt;</code> becomes <code>Stream&lt;String&gt;</code>.</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-purple-400 font-mono mb-2">distinct()</h5>
              <p className="text-xs text-gray-400 mb-2">Removes duplicates (uses equals()).</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-green-400 font-mono mb-2">sorted()</h5>
              <p className="text-xs text-gray-400 mb-2">Sorts elements naturally or via Comparator.</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-orange-400 font-mono mb-2">limit(n) / skip(n)</h5>
              <p className="text-xs text-gray-400 mb-2">Takes first n elements / Skips first n elements.</p>
            </div>
          </div>
        </div>
      ),
      code: `import java.util.*;
import java.util.stream.*;

public class StreamOps {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Alice", "David");

        List<String> result = names.stream()
            .distinct()                    // Remove duplicate Alice
            .filter(n -> n.length() > 3)   // Alice, Charlie, David
            .sorted()                      // Alice, Charlie, David
            .map(String::toUpperCase)      // ALICE, CHARLIE, DAVID
            .limit(2)                      // ALICE, CHARLIE
            .collect(Collectors.toList());

        System.out.println(result); 
    }
}
// Output:
// [ALICE, CHARLIE]`
    },
    {
      title: 'Parallel Streams',
      icon: <FiCopy className="w-6 h-6" />,
      content: '<p className="text-gray-300">Use <code>parallelStream()</code> to split work across multiple CPU cores. Great for huge datasets, but overhead might slow down small tasks.</p>',
      code: `List<Integer> bigList = Arrays.asList(1, 2, 3, 4, 5);

bigList.parallelStream().forEach(n -> {
    System.out.println(n + " " + Thread.currentThread().getName());
});
// Output (Order is random!):
// 3 ForkJoinPool.commonPool-worker-1
// 1 main
// ...`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Sum of Squared Evens',
      solution: 'Find the sum of squares of all even numbers in a list.',
      steps: [
        {
          step: '1. Filter',
          explanation: 'Keep only even numbers: `n % 2 == 0`.'
        },
        {
          step: '2. Map',
          explanation: 'Square each number: `n * n`.'
        },
        {
          step: '3. Reduce',
          explanation: 'Sum them up: `Integer::sum`.'
        }
      ],
      code: `import java.util.*;

public class SumSquares {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        int sum = numbers.stream()
            .filter(n -> n % 2 == 0) // Keeps: 2, 4
            .map(n -> n * n)         // Becomes: 4, 16
            .reduce(0, Integer::sum); // Sum: 20
        
        System.out.println("Sum: " + sum);
    }
}
// Output:
// Sum: 20`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Can you reuse a Stream?',
      solution: 'No! Once a terminal operation is called, the stream is &quot;closed&quot;. You must create a new stream from the source to process it again.',
      solutionCode: `Stream<String> s = list.stream();
s.forEach(System.out::println);
// s.count(); // EXCEPTION: Stream has already been operated upon or closed.`
    },
    {
      question: 'How to convert a Stream back to an Array?',
      solution: 'Use `.toArray()`.',
      solutionCode: `// Typed Array
String[] strArr = list.stream().toArray(String[]::new);`
    }
  ] as PracticeQuestion[]
}

export default function StreamAPIPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
