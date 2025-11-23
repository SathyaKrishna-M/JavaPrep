'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLayers, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Generics',
  explanationSections: [
    {
      title: 'Introduction to Generics',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Generics</span> provide type safety and eliminate type casting.

Benefits:
→ <span class="text-cyan-300">Type safety:</span> Compile-time type checking
→ <span class="text-cyan-300">No casting:</span> Eliminate explicit casts
→ <span class="text-cyan-300">Code reuse:</span> One class for multiple types

Syntax:
→ <span class="text-blue-400">class ClassName&lt;T&gt; { ... }</span>
→ <span class="text-blue-400">ClassName&lt;String&gt; obj = new ClassName&lt;&gt;();</span>

Wildcards:
→ <span class="text-cyan-300">? extends T:</span> Upper bound
→ <span class="text-cyan-300">? super T:</span> Lower bound`,
      code: `// Generic class
class Box<T> {
    private T item;
    
    public void setItem(T item) {
        this.item = item;
    }
    
    public T getItem() {
        return item;
    }
}

// Generic method
class GenericMethods {
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }
}

public class GenericsDemo {
    public static void main(String[] args) {
        // Generic class
        Box<String> stringBox = new Box<>();
        stringBox.setItem("Hello");
        System.out.println(stringBox.getItem());
        
        Box<Integer> intBox = new Box<>();
        intBox.setItem(100);
        System.out.println(intBox.getItem());
        
        // Generic method
        Integer[] intArray = {1, 2, 3, 4, 5};
        String[] strArray = {"a", "b", "c"};
        GenericMethods.printArray(intArray);
        GenericMethods.printArray(strArray);
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Create a generic class Container that can store any type of object.',
      solution: 'Use type parameter T in class definition.',
      solutionCode: `class Container<T> {
    private T value;
    
    public void setValue(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
}

public class GenericExample {
    public static void main(String[] args) {
        Container<String> strContainer = new Container<>();
        strContainer.setValue("Hello");
        System.out.println(strContainer.getValue());
        
        Container<Integer> intContainer = new Container<>();
        intContainer.setValue(100);
        System.out.println(intContainer.getValue());
    }
}`,
    },
  ],
}

export default function GenericsPage() {
  return <TopicPage content={content} />
}

