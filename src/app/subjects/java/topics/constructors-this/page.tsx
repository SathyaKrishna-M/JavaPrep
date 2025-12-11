'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiTool, FiTarget, FiBox, FiCpu, FiUser } from 'react-icons/fi'

const content = {
  title: 'Constructors & this Keyword',
  explanationSections: [
    {
      title: 'Introduction: The Factory',
      icon: <FiTool className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Constructors</span> are special methods used to initialize objects.
            Think of it as a <span className="text-cyan-400 font-bold">Car Factory Assembly Line</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">The Job:</span> When a car (object) rolls off the line, it shouldn&apos;t be empty. It needs an engine, wheels, and paint.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Automatic:</span> The factory (Constructor) runs <span className="text-amber-300">automatically</span> as soon as you say \`new Car()\`.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">No Return:</span> It doesn&apos;t return a value; it returns the object itself (implicitly).
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Types of Constructors',
      icon: <FiBox className="w-6 h-6" />,
      content: `1. <span className="text-blue-400 font-semibold">Default Constructor:</span>
   - Takes no parameters.
   - Sets standard values (e.g., all cars are White by default).
   - If you don't write <em>any</em> constructor, Java gives you an empty one for free.

2. <span className="text-blue-400 font-semibold">Parameterized Constructor:</span>
   - Takes arguments.
   - Allows custom options (e.g., Red car with Sunroof).`,
      code: `public class Car {
    String color;
    
    // Default Constructor
    Car() {
        color = "White"; // Default
    }
    
    // Parameterized Constructor
    Car(String c) {
        color = c; // Custom
    }
    
    public static void main(String[] args) {
        Car c1 = new Car();        // c1.color is White
        Car c2 = new Car("Red");   // c2.color is Red
    }
}`,
    },
    {
      title: 'The `this` Keyword',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">this</span> refers to the <span className="text-cyan-300">current object</span> calling the method.
      
Common Problem: <span className="text-red-300">Shadowing</span>.
When a parameter name matches a field name, Java is confused. \`name = name\` does nothing useful!

Solution:
\`this.name\` = Field (Global to object)
\`name\` = Parameter (Local to method)`,
      code: `public class Person {
    String name; // Field
    
    // Without 'this', ambiguity occurs
    Person(String name) {
        this.name = name; // Field = Parameter
    }
    
    void introduce() {
        System.out.println("I am " + this.name);
    }
}`,
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Smartphone Factory',
      solution: 'Create a class with overloaded constructors for different phone models.',
      steps: [
        {
          step: '1. Basic Model',
          explanation: 'Default constructor sets basic specs (4GB RAM).'
        },
        {
          step: '2. Pro Model',
          explanation: 'Parameterized constructor sets high specs (8GB RAM, 256GB Storage).'
        }
      ],
      code: `public class Smartphone {
    String model;
    int ram;
    
    // Basic
    Smartphone() {
        this.model = "Basic";
        this.ram = 4;
    }
    
    // Custom
    Smartphone(String model, int ram) {
        this.model = model;
        this.ram = ram;
    }
    
    void showSpecs() {
        System.out.println(model + " with " + ram + "GB RAM");
    }
    
    public static void main(String[] args) {
        new Smartphone().showSpecs();
        new Smartphone("Pro Max", 12).showSpecs();
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Create a "Box" class with dimensions. Initialize it using constructors.',
      solution: 'Use a parameterized constructor to set length, width, height.',
      solutionCode: `public class Box {
    double width, height, depth;

    // Custom Constructor
    Box(double w, double h, double d) {
        this.width = w;
        this.height = h;
        this.depth = d;
    }
    
    // Return volume
    double volume() {
        return width * height * depth;
    }
    
    public static void main(String[] args) {
        Box mybox = new Box(10, 20, 15);
        double vol = mybox.volume();
        System.out.println("Volume is " + vol);
    }
}`
    },
    {
      question: 'Chain constructors using `this()`.',
      solution: 'Call one constructor from another to avoid code duplication.',
      solutionCode: `public class Employee {
    String name;
    int id;

    // Default call parameterized
    Employee() {
        this("Unknown", -1); // Calls constructor below
    }
    
    Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }
    
    public static void main(String[] args) {
       Employee e = new Employee();
       System.out.println(e.name); // Prints Unknown
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class Person {
    String name;
    Person(String name) {
        this.name = name;
    }
    public static void main(String[] args) {
        Person p1 = new Person("Alice");
    }
}`,
  dryRunSteps: [
    { line: 3, vars: { 'Parameter name': '&quot;Alice&quot;' }, output: '', description: 'Constructor called with &quot;Alice&quot;' },
    { line: 4, vars: { 'this.name': '&quot;Alice&quot;', 'Parameter name': '&quot;Alice&quot;' }, output: '', description: 'this.name (Field) gets value from Parameter name.' },
    { line: 7, vars: { p1: 'ObjRef' }, output: '', description: 'Object created and assigned to p1.' },
  ] as DryRunStep[]
}

export default function ConstructorsThisPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
