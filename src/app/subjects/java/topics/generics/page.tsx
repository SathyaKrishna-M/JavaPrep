'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiBox, FiShield, FiTag, FiGitBranch, FiAlertCircle } from 'react-icons/fi'

const content = {
    title: 'Generics',
    explanationSections: [
        {
            title: 'Introduction: Labeled Boxes',
            icon: <FiBox className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Generics</span> allow you to write a class or method that can work with any object type, while enforcing strict type safety.
                        Think of it as <span className="text-cyan-400 font-bold">Labeled Boxes</span>.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">Raw Box (No Generic):</span> You throw in a <code>String</code>, a <code>Dog</code>, and a <code>Car</code>. When you reach in blindfolded, you might get bitten (ClassCastException).
                            </li>
                            <li>
                                <span className="text-green-400 font-semibold">Labeled Box (Generic):</span> <code>Box&lt;String&gt;</code> only accepts Strings. The compiler guards the box like a bouncer.
                            </li>
                            <li>
                                <span className="text-blue-400 font-semibold">Key Benefit:</span> Compile-time safety. Errors are caught <em>before</em> you run the code, eliminating manual casting.
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Generic Classes & Methods',
            icon: <FiTag className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        We use the diamond bracket syntax <code>&lt;T&gt;</code> to define a type parameter. <code>T</code> stands for Type.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-purple-400 font-mono mb-2">Generic Class</h5>
                            <p className="text-xs text-gray-400 mb-2">Class defined with a placeholder type.</p>
                            <code className="text-xs text-purple-300">class Box&lt;T&gt; &#123; T item; &#125;</code>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-orange-400 font-mono mb-2">Generic Method</h5>
                            <p className="text-xs text-gray-400 mb-2">Method that takes or returns a generic type.</p>
                            <code className="text-xs text-orange-300">&lt;T&gt; void print(T item) &#123;...&#125;</code>
                        </div>
                    </div>
                </div>
            ),
            code: `// Generic Class
class Box<T> {
    private T item;
    public void set(T t) { this.item = t; }
    public T get() { return item; }
}

public class Main {
    public static void main(String[] args) {
        // Box for Integers
        Box<Integer> intBox = new Box<>();
        intBox.set(10); 
        // intBox.set("Hello"); // Compile Error! Safe.
        
        System.out.println("Integer Value: " + intBox.get());

        // Box for Strings
        Box<String> strBox = new Box<>();
        strBox.set("Hello");
        System.out.println("String Value: " + strBox.get());
    }
}
// Output:
// Integer Value: 10
// String Value: Hello`
        },
        {
            title: 'Bounded Wildcards (?)',
            icon: <FiGitBranch className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Sometimes you want strict types (e.g., "Any type that is a subclass of Number"). We use <b>Bounded Wildcards</b>.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm">
                        <li><code>&lt;T extends Number&gt;</code>: T must be Number or its child (Integer, Double).</li>
                        <li><code>List&lt;? extends Number&gt;</code>: Accepts List of Numbers, Integers, or Floats (Upper Bound). Read-only safely.</li>
                        <li><code>List&lt;? super Integer&gt;</code>: Accepts List of Integer, Number, or Object (Lower Bound). Good for writing.</li>
                    </ul>
                </div>
            ),
            code: `import java.util.*;

public class WildcardDemo {
    // Upper Bound: Accepts List of Number or subclasses
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number n : list) {
            total += n.doubleValue();
        }
        return total;
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> dubs = Arrays.asList(1.5, 2.5);
        
        System.out.println("Int Sum: " + sum(ints));
        System.out.println("Double Sum: " + sum(dubs));
    }
}
// Output:
// Int Sum: 6.0
// Double Sum: 4.0`
        },
        {
            title: 'Type Erasure',
            icon: <FiAlertCircle className="w-6 h-6" />,
            content: '<p class="text-gray-300"><b>Note:</b> Java Generics are a compile-time feature. The JVM doesn\'t know about <code>&lt;String&gt;</code>. During compilation, Java "erases" all type parameters and replaces them with <code>Object</code> (or the bound). This ensures backward compatibility with older Java versions.</p>',
            code: `// Your Code:
// List<String> list = new ArrayList<>();
// list.add("Hi");
// String s = list.get(0);

// Compiled Bytecode (Effectively):
// List list = new ArrayList();
// list.add("Hi");
// String s = (String) list.get(0); // Auto-cast inserted`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Generic Swap Method',
            solution: 'Write a method that swaps two elements in an array of ANY type.',
            steps: [
                {
                    step: '1. Define Generic Method',
                    explanation: 'Use `<T>` before return type to signal it is generic.'
                },
                {
                    step: '2. Implementation',
                    explanation: 'Standard swap logic using a temporary variable.'
                }
            ],
            code: `public class Utils {
    // Works for Integer[], String[], Double[]...
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    public static void main(String[] args) {
        String[] words = {"World", "Hello"};
        swap(words, 0, 1);
        System.out.println(words[0] + " " + words[1]);
        
        Integer[] nums = {2, 1};
        swap(nums, 0, 1);
        System.out.println(nums[0] + " " + nums[1]);
    }
}
// Output:
// Hello World
// 1 2`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Can you use primitive types like "int" in Generics?',
            solution: 'No. Generics only work with Reference Types (Classes). You must use Wrapper classes like Integer, Double, Boolean. Java Autoboxing handles the conversion automatically.',
            solutionCode: `// Box<int> b = new Box<>(); // ERROR: Primitive type not allowed
Box<Integer> b = new Box<>(); // Correct:`
        },
        {
            question: 'Can you create an instance of T? (new T())',
            solution: 'No. Because of Type Erasure, T is unknown at runtime, so Java cannot call its constructor.',
            solutionCode: `class Box<T> {
    // T item = new T(); // ERROR: Cannot instantiate type T
}`
        }
    ] as PracticeQuestion[]
}

export default function GenericsPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
