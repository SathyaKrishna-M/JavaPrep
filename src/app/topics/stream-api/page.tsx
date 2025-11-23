'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLayers, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Stream API',
  explanationSections: [
    {
      title: 'Introduction to Streams',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Stream API</span> processes collections in functional style.

Features:
→ <span class="text-cyan-300">Functional:</span> Declarative programming
→ <span class="text-cyan-300">Lazy:</span> Operations executed on demand
→ <span class="text-cyan-300">Pipeline:</span> Chain operations
→ <span class="text-cyan-300">Parallel:</span> Can process in parallel

Operations:
→ <span class="text-amber-300">filter():</span> Filter elements
→ <span class="text-amber-300">map():</span> Transform elements
→ <span class="text-amber-300">reduce():</span> Aggregate values
→ <span class="text-amber-300">collect():</span> Collect results
→ <span class="text-amber-300">forEach():</span> Perform action`,
      code: `import java.util.*;
import java.util.stream.*;

public class StreamDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filter even numbers
        List<Integer> evens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        System.out.println("Evens: " + evens);
        
        // Map to squares
        List<Integer> squares = numbers.stream()
            .map(n -> n * n)
            .collect(Collectors.toList());
        System.out.println("Squares: " + squares);
        
        // Sum using reduce
        int sum = numbers.stream()
            .reduce(0, (a, b) -> a + b);
        System.out.println("Sum: " + sum);
        
        // Filter and map
        List<Integer> result = numbers.stream()
            .filter(n -> n > 5)
            .map(n -> n * 2)
            .collect(Collectors.toList());
        System.out.println("Result: " + result);
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Use Stream API to filter even numbers from a list and calculate their sum.',
      solution: 'Use stream().filter() to get evens, then reduce() to sum.',
      solutionCode: `import java.util.*;
import java.util.stream.*;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        int sum = numbers.stream()
            .filter(n -> n % 2 == 0)
            .reduce(0, Integer::sum);
        
        System.out.println("Sum of evens: " + sum);
    }
}`,
    },
  ],
}

export default function StreamAPIPage() {
  return <TopicPage content={content} />
}

