'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiSearch, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Regex - Pattern Matching & Validation',
  explanationSections: [
    {
      title: 'Introduction to Regex',
      icon: <FiSearch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Regular Expressions</span> match patterns in strings.

Common Patterns:
→ <span class="text-cyan-300">[0-9]:</span> Digits
→ <span class="text-cyan-300">[a-z]:</span> Lowercase letters
→ <span class="text-cyan-300">[A-Z]:</span> Uppercase letters
→ <span class="text-cyan-300">*:</span> Zero or more
→ <span class="text-cyan-300">+:</span> One or more
→ <span class="text-cyan-300">?:</span> Zero or one
→ <span class="text-cyan-300">^:</span> Start of string
→ <span class="text-cyan-300">$:</span> End of string`,
      code: `import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexDemo {
    public static void main(String[] args) {
        // Email pattern
        String emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        String email = "user@example.com";
        
        boolean isValid = Pattern.matches(emailPattern, email);
        System.out.println("Valid email: " + isValid);
        
        // Phone number pattern
        String phonePattern = "^[0-9]{10}$";
        String phone = "1234567890";
        System.out.println("Valid phone: " + Pattern.matches(phonePattern, phone));
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Validate an email address using regex.',
      solution: 'Use regex pattern to match email format.',
      solutionCode: `import java.util.regex.Pattern;

public class EmailValidation {
    public static boolean isValidEmail(String email) {
        String pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        return Pattern.matches(pattern, email);
    }
    
    public static void main(String[] args) {
        System.out.println(isValidEmail("test@example.com"));
    }
}`,
    },
  ],
}

export default function RegexPatternMatchingPage() {
  return <TopicPage content={content} />
}

