'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiCheckCircle, FiAlertTriangle, FiUsers, FiActivity } from 'react-icons/fi'

const content = {
  title: 'Analyzing Class Design',
  explanationSections: [
    {
      title: 'Introduction: The Team Manager',
      icon: <FiUsers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            Designing classes is like building a <span className="text-blue-400 font-semibold">Project Team</span>.
            You want specialists who do one thing well (<span className="text-green-400">High Cohesion</span>) and can work independently without constantly nagging others (<span className="text-green-400">Low Coupling</span>).
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Cohesion (The Specialist):</span> A class should represent <em>one single concept</em>. A &quot;Swiss Army Knife&quot; class is bad design.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Coupling (The Dependency):</span> If Class A breaks every time Class B changes, they are <em>tightly coupled</em>. We want them to be loosely connected.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Cohesion vs Coupling',
      icon: <FiActivity className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <h5 className="text-green-300 font-semibold mb-2">High Cohesion (Good)</h5>
              <p className="text-sm text-gray-300">
                A `Printer` class only prints. It doesn&apos;t calculate taxes or cook coffee.
              </p>
              <code className="text-xs text-green-200 mt-2 block">class Printer &#123; print(data); &#125;</code>
            </div>
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <h5 className="text-red-300 font-semibold mb-2">Tight Coupling (Bad)</h5>
              <p className="text-sm text-gray-300">
                `Order` class directly creates `EmailService`. If Email changes, Order breaks.
              </p>
              <code className="text-xs text-red-200 mt-2 block">new EmailService(); // In Order class</code>
            </div>
          </div>
        </div>
      ),
      code: `// Ideally: Dependency Injection (Loose Coupling)
class Order {
    private NotificationService notifier;
    
    // We pass the notifier in, we don't create it here.
    public Order(NotificationService notifier) {
        this.notifier = notifier;
    }
    
    public void checkout() {
        // Logic...
        notifier.send("Order placed!");
    }
}`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Refactoring a God Class',
      solution: 'Split the massive class into smaller, focused classes.',
      steps: [
        {
          step: '1. Identify Responsibilities',
          explanation: 'The "UserManager" class is doing validation, database saving, AND email sending.'
        },
        {
          step: '2. Extract Classes',
          explanation: 'Create "UserValidator", "UserRepository", and "EmailService".'
        }
      ],
      code: `// BAD: The God Class
class UserManager {
    void register(String name, String email) {
        if(!email.contains("@")) return; // Validation
        System.out.println("Saving to DB..."); // Persistence
        System.out.println("Sending welcome email..."); // Notification
    }
}

// GOOD: Separation of Concerns
class UserValidator {
    boolean isValid(String email) { return email.contains("@"); }
}

class UserRepository {
    void save(String name) { System.out.println("Saving " + name); }
}

class NotificationService {
    void sendWelcome() { System.out.println("Sending email"); }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Analyze the "Invoice" class. If it handles printing, does it have high cohesion?',
      solution: 'No. Printing should be in a separate "InvoicePrinter" class.',
      solutionCode: `class Invoice {
    public void calculateTotal() { /* arithmetic */ }
}

class InvoicePrinter {
    public void print(Invoice i) {
        System.out.println("Invoice...");
    }
}`
    }
  ] as PracticeQuestion[]
}

export default function AnalyzingClassDesignPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
