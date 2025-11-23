'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiAlertTriangle, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Custom Exceptions',
  explanationSections: [
    {
      title: 'Creating Custom Exceptions',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Custom Exceptions</span> are user-defined exception classes.

Steps:
→ <span class="text-cyan-300">Extend Exception:</span> For checked exceptions
→ <span class="text-cyan-300">Extend RuntimeException:</span> For unchecked exceptions
→ <span class="text-cyan-300">Add constructors:</span> Default and parameterized
→ <span class="text-cyan-300">Throw:</span> Use throw keyword

Use Cases:
→ <span class="text-amber-300">Domain-specific errors</span>
→ <span class="text-amber-300">Better error messages</span>
→ <span class="text-amber-300">Application-specific handling</span>`,
      code: `// Custom checked exception
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

// Custom unchecked exception
class NegativeNumberException extends RuntimeException {
    public NegativeNumberException(String message) {
        super(message);
    }
}

class AgeValidator {
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 0 || age > 120) {
            throw new InvalidAgeException("Age must be between 0 and 120");
        }
    }
}

public class CustomExceptionDemo {
    public static void main(String[] args) {
        try {
            AgeValidator.validateAge(150);
        } catch (InvalidAgeException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Unchecked exception
        if (true) {
            throw new NegativeNumberException("Number cannot be negative");
        }
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Create a custom exception InvalidEmailException and use it to validate email format.',
      solution: 'Extend Exception class and throw it when email is invalid.',
      solutionCode: `class InvalidEmailException extends Exception {
    public InvalidEmailException(String message) {
        super(message);
    }
}

class EmailValidator {
    public static void validate(String email) throws InvalidEmailException {
        if (!email.contains("@")) {
            throw new InvalidEmailException("Email must contain @");
        }
    }
}

public class CustomExceptionExample {
    public static void main(String[] args) {
        try {
            EmailValidator.validate("invalid-email");
        } catch (InvalidEmailException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
    },
  ],
}

export default function CustomExceptionsPage() {
  return <TopicPage content={content} />
}

