'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiAward, FiAlertOctagon, FiPlusCircle, FiAlertCircle } from 'react-icons/fi'

const content = {
    title: 'Custom Exceptions',
    explanationSections: [
        {
            title: 'Introduction: The Customized Warning Sign',
            icon: <FiAlertOctagon className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        Java provides many standard exceptions (e.g., <code>NullPointerException</code>), but sometimes they aren&apos;t enough.
                        Think of <span className="text-blue-400 font-semibold">Custom Exceptions</span> as highly specific <span className="text-cyan-400 font-bold">Warning Signs</span> tailored to your business rules.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">Standard Exception:</span> A generic &quot;STOP&quot; sign. It stops you, but doesn&apos;t tell you why (bad weather? construction? accident?).
                            </li>
                            <li>
                                <span className="text-green-400 font-semibold">Custom Exception:</span> A sign saying &quot;DANGER: HIGH VOLTAGE&quot;. It tells the user <em>exactly what</em> went wrong in your specific application context.
                            </li>
                            <li>
                                <span className="text-blue-400 font-semibold">Why use them?</span> To make your code more readable, debuggable, and to handle domain-specific errors (like &quot;insufficient funds&quot; or &quot;invalid email&quot;) distinctly.
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'How to Create One',
            icon: <FiAward className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Creating a custom exception is simple: just inherit from a parent Exception class.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-orange-400 font-mono mb-2">Checked Exception</h5>
                            <p className="text-xs text-gray-400 mb-2">Extend <code>Exception</code>.</p>
                            <p className="text-xs text-gray-500">Forces the programmer to handle it (try-catch) or declare it (throws). Use this for recoverable errors (e.g., &quot;Invalid Login&quot;).</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-red-400 font-mono mb-2">Unchecked Exception</h5>
                            <p className="text-xs text-gray-400 mb-2">Extend <code>RuntimeException</code>.</p>
                            <p className="text-xs text-gray-500">Optional handling. Use this for logic errors or unrecoverable states (e.g., &quot;Configuration Missing&quot;).</p>
                        </div>
                    </div>
                </div>
            ),
            code: `// 1. Define the exception
class InsufficientFundsException extends Exception {
    // Constructor that accepts a message
    public InsufficientFundsException(String message) {
        super(message); // Pass message to parent Exception class
    }
}

// 2. Use it in a class
class BankAccount {
    double balance = 100.0;
    
    // Declare that this method throws the Checked Exception
    void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Need " + (amount - balance) + " more!");
        }
        balance -= amount;
        System.out.println("Remaining Balance: " + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acct = new BankAccount();
        try {
            acct.withdraw(150.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Transaction Failed: " + e.getMessage());
        }
    }
}
// Output:
// Transaction Failed: Need 50.0 more!`
        },
        {
            title: 'Advanced: Chaining Exceptions',
            icon: <FiPlusCircle className="w-6 h-6" />,
            content: '<p className="text-gray-300">You can also wrap an underlying exception inside your custom exception using <code>super(message, cause)</code>. This preserves the original stack trace.</p>',
            code: `class DatabaseException extends Exception {
    public DatabaseException(String msg, Throwable cause) {
        super(msg, cause);
    }
}

try {
    // Low-level error
    throw new IOException("Connection timeout");
} catch (IOException e) {
    // Wrap it in a high-level exception
    throw new DatabaseException("Could not save user", e);
}`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Bank Withdrawal System',
            solution: 'Throw exception if withdrawal amount exceeds balance.',
            steps: [
                {
                    step: '1. Create Exception',
                    explanation: '`InsufficientBalanceException` extends Exception (Checked).'
                },
                {
                    step: '2. Business Logic',
                    explanation: 'Check balance. If low, throw new Exception with clear message.'
                },
                {
                    step: '3. Handle It',
                    explanation: 'Caller must use try-catch to handle the rejection gracefully.'
                }
            ],
            code: `class InsufficientBalanceException extends Exception {
    InsufficientBalanceException(String msg) { super(msg); }
}

public class ATM {
    static void withdraw(int amount) throws InsufficientBalanceException {
        int balance = 500;
        System.out.println("Requesting: " + amount);
        
        if(amount > balance) {
            throw new InsufficientBalanceException("Not enough cash. Balance is " + balance);
        }
        System.out.println("Dispensing cash...");
    }

    public static void main(String[] args) {
        try {
            withdraw(1000);
        } catch (InsufficientBalanceException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
// Output:
// Requesting: 1000
// Error: Not enough cash. Balance is 500`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Create a custom exception "InvalidAgeException" for a voting system (Unchecked).',
            solution: 'Throw if age < 18. Since it is Unchecked, extend RuntimeException.',
            solutionCode: `class InvalidAgeException extends RuntimeException {
    InvalidAgeException(String s) { super(s); }
}

class Voter {
    void vote(int age) {
        if(age < 18) throw new InvalidAgeException("Too young to vote");
        System.out.println("Voted successfully!");
    }
}
// Usage:
// new Voter().vote(16); // Crashes with InvalidAgeException`
        },
        {
            question: 'Why must we pass the string to super(message)?',
            solution: 'The parent `Exception` class has logic to store and retrieve the error message via `getMessage()`. If you don\'t pass it up, `getMessage()` will return null.',
            solutionCode: `class MyError extends Exception {
    MyError(String msg) {
        super(msg); // Crucial! Connects your msg to the system
    }
}`
        }
    ] as PracticeQuestion[]
}

export default function CustomExceptionsPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
