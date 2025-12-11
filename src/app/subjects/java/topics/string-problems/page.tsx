'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiCode, FiTarget } from 'react-icons/fi'

const content = {
  title: 'String Problems',
  explanationSections: [
    {
      title: 'Palindrome Check',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Palindrome</span> reads same forwards and backwards.

Algorithm:
→ <span class="text-cyan-300">Compare:</span> Characters from start and end
→ <span class="text-cyan-300">Two pointers:</span> Move towards center
→ <span class="text-cyan-300">Check:</span> All characters match

Time Complexity: O(n)
Space Complexity: O(1)`,
      code: `public class Palindrome {
    public static boolean isPalindrome(String str) {
        int left = 0;
        int right = str.length() - 1;
        
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));  // true
        System.out.println(isPalindrome("hello"));     // false
    }
}`,
    },
    {
      title: 'Anagram Check',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Anagram</span> has same characters in different order.

Algorithm:
→ <span class="text-cyan-300">Count frequency:</span> Count each character
→ <span class="text-cyan-300">Compare:</span> Frequencies must match
→ <span class="text-cyan-300">Alternative:</span> Sort and compare

Time Complexity: O(n)
Space Complexity: O(1)`,
      code: `public class Anagram {
    public static boolean isAnagram(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        
        int[] count = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            count[s1.charAt(i) - 'a']++;
            count[s2.charAt(i) - 'a']--;
        }
        
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println(isAnagram("listen", "silent"));  // true
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Check if a string is a palindrome.',
      solution: 'Use two pointers to compare characters from start and end.',
      solutionCode: `public class PalindromeCheck {
    public static boolean isPalindrome(String str) {
        int i = 0, j = str.length() - 1;
        while (i < j) {
            if (str.charAt(i) != str.charAt(j)) return false;
            i++;
            j--;
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("madam"));
    }
}`,
    },
  ],
}

export default function StringProblemsPage() {
  return <TopicPage content={content} />
}

