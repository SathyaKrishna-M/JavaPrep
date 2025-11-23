'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLink, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Interfaces',
  explanationSections: [
    {
      title: 'Introduction to Interfaces',
      icon: <FiLink className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Interface</span> defines contract that classes must implement.

Features:
→ <span class="text-cyan-300">Abstract methods:</span> No implementation
→ <span class="text-cyan-300">Multiple inheritance:</span> Class can implement multiple interfaces
→ <span class="text-cyan-300">Default methods:</span> Java 8+ (with implementation)
→ <span class="text-cyan-300">Static methods:</span> Java 8+ (with implementation)

Syntax:
→ <span class="text-blue-400">interface InterfaceName { ... }</span>
→ <span class="text-blue-400">class ClassName implements InterfaceName { ... }</span>`,
      code: `interface Drawable {
    void draw();  // Abstract method
    
    default void display() {  // Default method
        System.out.println("Displaying");
    }
}

class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Drawable d = new Circle();
        d.draw();
        d.display();
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Create an interface Playable with method play(). Implement it in MusicPlayer class.',
      solution: 'Define interface with abstract method, implement in class.',
      solutionCode: `interface Playable {
    void play();
}

class MusicPlayer implements Playable {
    public void play() {
        System.out.println("Playing music");
    }
}

public class InterfaceExample {
    public static void main(String[] args) {
        Playable p = new MusicPlayer();
        p.play();
    }
}`,
    },
  ],
}

export default function InterfacesPage() {
  return <TopicPage content={content} />
}

