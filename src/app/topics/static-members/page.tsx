'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLink, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Static Members',
  explanationSections: [
    {
      title: 'Static Variables',
      icon: <FiLink className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Static Variables</span> belong to class, not objects.

Key Points:
→ <span class="text-cyan-300">Shared:</span> All objects share same variable
→ <span class="text-cyan-300">Class-level:</span> Accessed via class name
→ <span class="text-cyan-300">Memory:</span> Single copy in memory
→ <span class="text-cyan-300">Initialization:</span> When class is loaded

Use When:
→ <span class="text-amber-300">Counter for objects</span>
→ <span class="text-amber-300">Constants</span>
→ <span class="text-amber-300">Shared data</span>`,
      code: `public class StaticVariable {
    static int count = 0;  // Shared by all objects
    String name;
    
    public StaticVariable(String name) {
        this.name = name;
        count++;  // Increment shared counter
    }
    
    public static void main(String[] args) {
        StaticVariable obj1 = new StaticVariable("Alice");
        StaticVariable obj2 = new StaticVariable("Bob");
        System.out.println("Total objects: " + StaticVariable.count);  // 2
    }
}`,
    },
    {
      title: 'Static Methods',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Static Methods</span> belong to class, not objects.

Key Points:
→ <span class="text-cyan-300">No object needed:</span> Call via class name
→ <span class="text-cyan-300">Cannot access:</span> Instance variables/methods
→ <span class="text-cyan-300">Can access:</span> Static variables/methods

Use When:
→ <span class="text-amber-300">Utility methods</span>
→ <span class="text-amber-300">Helper functions</span>
→ <span class="text-amber-300">No instance needed</span>`,
      code: `public class StaticMethod {
    static int count = 0;
    
    // Static method
    public static void increment() {
        count++;
    }
    
    public static int getCount() {
        return count;
    }
    
    public static void main(String[] args) {
        StaticMethod.increment();
        StaticMethod.increment();
        System.out.println("Count: " + StaticMethod.getCount());  // 2
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Create a class with static variable to count number of objects created.',
      solution: 'Use static variable and increment in constructor.',
      solutionCode: `public class ObjectCounter {
    static int count = 0;
    
    public ObjectCounter() {
        count++;
    }
    
    public static int getCount() {
        return count;
    }
    
    public static void main(String[] args) {
        new ObjectCounter();
        new ObjectCounter();
        System.out.println("Count: " + ObjectCounter.getCount());
    }
}`,
    },
  ],
}

export default function StaticMembersPage() {
  return <TopicPage content={content} />
}

