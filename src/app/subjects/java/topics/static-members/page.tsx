'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiLink, FiTarget, FiUsers, FiLock, FiGlobe } from 'react-icons/fi'

const content = {
  title: 'Static Members',
  explanationSections: [
    {
      title: 'Introduction: The Community Notice Board',
      icon: <FiGlobe className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Static</span> members belong to the <span className="text-cyan-400 font-bold">Class</span>, not to individual objects.
            Think of it like a <span className="text-cyan-400 font-bold">Community Notice Board</span> in an apartment complex.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Instance Variables (Personal Mailbox):</span> Every apartment has its own. My letters are mine, yours are yours.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Static Variables (Notice Board):</span> There is only <span className="text-amber-300">ONE</span> for the whole building. If I pin a notice, <span className="text-amber-300">EVERYONE</span> sees the same notice.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Static Variables (Shared Memory)',
      icon: <FiLink className="w-6 h-6" />,
      content: `Use \`static\` when you want to share data across all objects.

Characteristics:
→ <span className="text-cyan-300">Memory:</span> Allocated only ONCE when the class is loaded.
→ <span className="text-cyan-300">Access:</span> Through Class Name (e.g., \`Student.schoolName\`).
→ <span className="text-blue-400">Common Use:</span> Counters, Constants, Configuration.`,
      code: `public class Counter {
    static int count = 0; // Shared
    
    Counter() {
        count++; // Increment shared variable
    }
    
    public static void main(String[] args) {
        new Counter();
        new Counter();
        new Counter();
        
        // All objects see the same 'count'
        System.out.println(Counter.count); // Output: 3
    }
}`,
    },
    {
      title: 'Static Methods',
      icon: <FiUsers className="w-6 h-6" />,
      content: `Methods that can run <span className="text-blue-400 font-semibold">without creating an object</span>.

Rules:
→ <span className="text-cyan-300">Can Access:</span> Only other static members.
→ <span className="text-red-300">Cannot Access:</span> Instance variables or \`this\` keyword (because 'this' refers to an object, and static methods don't care about objects).

Example: \`Math.sqrt()\`, \`System.out.println()\`.`,
      code: `public class MathUtils {
    // Utility method - no need for object state
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        // Call directly using Class Name
        int sum = MathUtils.add(5, 10);
    }
}`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'ID Generator',
      solution: 'Generate unique IDs for every new Student object automatically.',
      steps: [
        {
          step: '1. Static Counter',
          explanation: 'Maintain a static counter to track the last used ID.'
        },
        {
          step: '2. Instance ID',
          explanation: 'Each student gets a unique ID assigned from the counter.'
        },
        {
          step: '3. Constructor',
          explanation: 'Increment counter and assign to instance ID in the constructor.'
        }
      ],
      code: `class Student {
    static int nextId = 1; // Shared counter
    
    int id;                // Unique for each student
    String name;
    
    Student(String name) {
        this.name = name;
        this.id = nextId;  // Assign current counter
        nextId++;          // Increment for NEXT student
    }
    
    void show() {
        System.out.println(id + ": " + name);
    }
    
    public static void main(String[] args) {
        Student s1 = new Student("Alice");
        Student s2 = new Student("Bob");
        
        s1.show(); // 1: Alice
        s2.show(); // 2: Bob
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Why does accessing an instance variable from a static method cause an error?',
      solution: 'Static methods run without an object instance. Instance variables rely on a specific object being created. Since no object exists in the static context, it cannot determine WHICH object\'s variable to access.',
      solutionCode: `class Demo {
    int x = 10;
    
    public static void main(String[] args) {
        // System.out.println(x); // ERROR: Cannot make a static reference to the non-static field x
        
        Demo d = new Demo();
        System.out.println(d.x); // Fixed: Access through object
    }
}`
    },
    {
      question: 'Create a "Constants" class with static final variables for PI and GRAVITY.',
      solution: 'Use \`public static final\` for global constants.',
      solutionCode: `public class Constants {
    public static final double PI = 3.14159;
    public static final double GRAVITY = 9.8;
    
    public static void main(String[] args) {
        System.out.println("Area of circle (r=2): " + (Constants.PI * 2 * 2));
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class Main {
    static int x = 0;
    int y = 0;
    
    public Main() {
        x++;
        y++;
    }
    
    public static void main(String[] args) {
        Main m1 = new Main();
        Main m2 = new Main();
        System.out.println(m2.x + " " + m2.y);
    }
}`,
  dryRunSteps: [
    { line: 2, vars: { x: 0 }, output: '', description: 'Static x initialized to 0 (once).' },
    { line: 11, vars: { m1: 'Obj1' }, output: '', description: 'm1 created.' },
    { line: 6, vars: { x: 1, 'm1.y': 1 }, output: '', description: 'm1 Constructor: x becomes 1 (shared), m1.y becomes 1.' },
    { line: 12, vars: { m2: 'Obj2' }, output: '', description: 'm2 created.' },
    { line: 6, vars: { x: 2, 'm2.y': 1 }, output: '', description: 'm2 Constructor: x becomes 2 (shared), m2.y becomes 1 (independent).' },
    { line: 13, vars: { x: 2, 'm2.y': 1 }, output: '2 1\\n', description: 'Print m2.x (shared=2) and m2.y (instance=1).' },
  ] as DryRunStep[]
}

export default function StaticMembersPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
