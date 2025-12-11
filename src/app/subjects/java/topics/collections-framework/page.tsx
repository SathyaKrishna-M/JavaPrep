'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiDatabase, FiGrid, FiList, FiLayers, FiCheckSquare } from 'react-icons/fi'

const content = {
  title: 'Collections Framework',
  explanationSections: [
    {
      title: 'Introduction: The Toolbox',
      icon: <FiDatabase className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            The <span className="text-blue-400 font-semibold">Collections Framework</span> is a set of pre-built data structures.
            Think of it as your <span className="text-cyan-400 font-bold">Toolbox</span> for storing objects.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">List (Backpack):</span> Ordered collection. You can throw in anything, even duplicates. Access by index (0, 1, 2...).
              </li>
              <li>
                <span className="text-green-400 font-semibold">Set (Stamp Collection):</span> Unique items only. Duplicates are rejected. Order usually doesn&apos;t matter (unless you use TreeSet).
              </li>
              <li>
                <span className="text-purple-400 font-semibold">Map (Dictionary):</span> Key-Value pairs. Look up a word (Key) to find its definition (Value). Keys must be unique.
              </li>
              <li>
                <span className="text-orange-400 font-semibold">Queue (Cafeteria Line):</span> First-In-First-Out (FIFO). Process items in order of arrival.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Common Implementations',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-yellow-400 font-mono mb-2">List: ArrayList vs LinkedList</h5>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                <li><b>ArrayList:</b> Fast random access (get(50)). Slow inserts in middle. Use by default.</li>
                <li><b>LinkedList:</b> Fast inserts/deletes (head/tail). Slow random access. Use for queues.</li>
              </ul>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h5 className="text-green-400 font-mono mb-2">Set: HashSet vs TreeSet</h5>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                <li><b>HashSet:</b> Fast (O(1)). Unordered.</li>
                <li><b>TreeSet:</b> Slower (O(log n)). Sorted order (Natural/Comparator).</li>
              </ul>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800 col-span-2">
              <h5 className="text-purple-400 font-mono mb-2">Map: HashMap vs TreeMap</h5>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                <li><b>HashMap:</b> Fast lookup (O(1)). Unordered keys.</li>
                <li><b>TreeMap:</b> Sorted keys. Great for "Rangemap" operations.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // --- LIST ---
        List<String> backpack = new ArrayList<>();
        backpack.add("Book");
        backpack.add("Pen");
        backpack.add("Pen"); // Duplicates OK
        System.out.println("List: " + backpack);

        // --- SET ---
        Set<String> stamps = new HashSet<>();
        stamps.add("USA");
        stamps.add("UK");
        stamps.add("USA"); // Duplicate Ignored!
        System.out.println("Set: " + stamps);
        
        // --- MAP ---
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 80);
        scores.put("Alice", 100); // Overwrites previous value
        System.out.println("Alice's Score: " + scores.get("Alice"));
    }
}
// Output:
// List: [Book, Pen, Pen]
// Set: [USA, UK]  (Order may vary)
// Alice's Score: 100`
    },
    {
      title: 'Iterating Collections',
      icon: <FiList className="w-6 h-6" />,
      content: '<p class="text-gray-300">You can loop through collections using the enhanced for-loop or an Iterator.</p>',
      code: `List<String> list = Arrays.asList("A", "B", "C");

// 1. Enhanced For-Loop (Read only)
for(String s : list) {
    System.out.print(s + " ");
}

// 2. Iterator (Allows removal safely)
Iterator<String> it = list.iterator();
while(it.hasNext()) {
    String s = it.next();
    if(s.equals("B")) it.remove(); // Safely removes "B"
}
// Note: Arrays.asList() returns a fixed-size list, so remove() might throw UnsupportedOperationException if not wrapped in new ArrayList<>(...)
// Output: A B C`
    },
    {
      title: 'Utility Class: Collections',
      icon: <FiCheckSquare className="w-6 h-6" />,
      content: '<p class="text-gray-300">The <code>Collections</code> class (plural) contains static helper methods.</p>',
      code: `List<Integer> nums = new ArrayList<>(Arrays.asList(3, 1, 2));

Collections.sort(nums);      // [1, 2, 3]
Collections.reverse(nums);   // [3, 2, 1]
Collections.shuffle(nums);   // Random order
System.out.println("Max: " + Collections.max(nums)); // 3`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Frequency Counter',
      solution: 'Count how many times each word appears in a list using a Map.',
      steps: [
        {
          step: '1. Visualize',
          explanation: 'Input: ["Apple", "Banana", "Apple"]. Output: {Apple=2, Banana=1}.'
        },
        {
          step: '2. Logic',
          explanation: 'For each word: If Key exists, increment Value. If not, add Key with Value 1.'
        },
        {
          step: '3. Helper Method',
          explanation: 'Use `map.getOrDefault(key, 0)` for cleaner code.'
        }
      ],
      code: `import java.util.*;

public class FrequencyCounter {
    public static void main(String[] args) {
        String[] words = {"apple", "banana", "apple", "orange", "banana", "apple"};
        Map<String, Integer> counts = new HashMap<>();
        
        for(String word : words) {
            // If word exists, get curr count, else 0. Then add 1.
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        
        System.out.println(counts); 
    }
}
// Output:
// {banana=2, orange=1, apple=3}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Which collection should you use to store a waiting list of customers?',
      solution: 'LinkedList or ArrayDeque (Queue interface). Since it is a "waiting list", you want First-In-First-Out (FIFO) behavior.',
      solutionCode: `Queue<String> queue = new LinkedList<>();
queue.add("Customer 1");
queue.add("Customer 2");
System.out.println(queue.poll()); // Removes & Returns "Customer 1"`
    },
    {
      question: 'Why avoid Vector and Hashtable?',
      solution: 'They are legacy classes (Java 1.0). They are synchronized (thread-safe) which makes them slow for single-threaded apps. Use ArrayList and HashMap instead. If you need thread safety, use Collections.synchronizedList() or ConcurrentHashMap.',
      solutionCode: `// Bad
Vector<String> v = new Vector<>();
// Good
List<String> l = new ArrayList<>();`
    }
  ] as PracticeQuestion[]
}

export default function CollectionsFrameworkPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
