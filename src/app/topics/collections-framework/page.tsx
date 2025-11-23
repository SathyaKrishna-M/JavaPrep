'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLayers, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Collections Framework',
  explanationSections: [
    {
      title: 'Collections Overview',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Collections Framework</span> provides data structures and algorithms.

Interfaces:
→ <span class="text-cyan-300">List:</span> Ordered, allows duplicates (ArrayList, LinkedList)
→ <span class="text-cyan-300">Set:</span> No duplicates (HashSet, TreeSet)
→ <span class="text-cyan-300">Map:</span> Key-value pairs (HashMap, TreeMap)
→ <span class="text-cyan-300">Queue:</span> FIFO (PriorityQueue)

Common Operations:
→ <span class="text-amber-300">add()</span>
→ <span class="text-amber-300">remove()</span>
→ <span class="text-amber-300">contains()</span>
→ <span class="text-amber-300">size()</span>`,
      code: `import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        // ArrayList
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");
        System.out.println("List: " + list);
        
        // HashSet
        Set<Integer> set = new HashSet<>();
        set.add(1);
        set.add(2);
        set.add(1);  // Duplicate ignored
        System.out.println("Set: " + set);
        
        // HashMap
        Map<String, Integer> map = new HashMap<>();
        map.put("Alice", 20);
        map.put("Bob", 25);
        System.out.println("Map: " + map);
        System.out.println("Alice's age: " + map.get("Alice"));
        
        // Iteration
        for (String item : list) {
            System.out.println(item);
        }
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Use ArrayList to store and display a list of student names.',
      solution: 'Create ArrayList, add elements, and iterate using for-each loop.',
      solutionCode: `import java.util.*;

public class CollectionsExample {
    public static void main(String[] args) {
        List<String> students = new ArrayList<>();
        students.add("Alice");
        students.add("Bob");
        students.add("Charlie");
        
        for (String student : students) {
            System.out.println(student);
        }
    }
}`,
    },
  ],
}

export default function CollectionsFrameworkPage() {
  return <TopicPage content={content} />
}

