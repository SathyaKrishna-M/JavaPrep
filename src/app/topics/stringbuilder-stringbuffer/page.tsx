'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiTool, FiTarget } from 'react-icons/fi'

const content = {
  title: 'StringBuilder & StringBuffer',
  explanationSections: [
    {
      title: 'Introduction to StringBuilder',
      icon: <FiTool className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">StringBuilder</span> is mutable string class for efficient string manipulation.

Key Features:
→ <span class="text-cyan-300">Mutable:</span> Can be modified after creation
→ <span class="text-cyan-300">Efficient:</span> No new objects for modifications
→ <span class="text-cyan-300">Not thread-safe:</span> Faster but not synchronized
→ <span class="text-cyan-300">Methods:</span> append(), insert(), delete(), reverse()

Use When:
→ <span class="text-amber-300">Frequent string modifications</span>
→ <span class="text-amber-300">Single-threaded environment</span>
→ <span class="text-amber-300">Performance critical</span>`,
      code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello");
        
        // Append
        sb.append(" World");
        System.out.println(sb);  // "Hello World"
        
        // Insert
        sb.insert(5, " Java");
        System.out.println(sb);  // "Hello Java World"
        
        // Delete
        sb.delete(5, 10);
        System.out.println(sb);  // "Hello World"
        
        // Reverse
        sb.reverse();
        System.out.println(sb);  // "dlroW olleH"
    }
}`,
    },
    {
      title: 'StringBuffer',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">StringBuffer</span> is similar to StringBuilder but thread-safe.

Key Features:
→ <span class="text-cyan-300">Thread-safe:</span> Synchronized methods
→ <span class="text-cyan-300">Slower:</span> Due to synchronization
→ <span class="text-cyan-300">Same methods:</span> append(), insert(), etc.

Use When:
→ <span class="text-amber-300">Multi-threaded environment</span>
→ <span class="text-amber-300">Thread safety required</span>`,
      code: `public class StringBufferDemo {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Hello");
        sb.append(" World");
        System.out.println(sb);
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Use StringBuilder to efficiently concatenate multiple strings.',
      solution: 'Use append() method instead of + operator for better performance.',
      solutionCode: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" ");
        sb.append("World");
        System.out.println(sb.toString());
    }
}`,
    },
  ],
}

export default function StringBuilderStringBufferPage() {
  return <TopicPage content={content} />
}

