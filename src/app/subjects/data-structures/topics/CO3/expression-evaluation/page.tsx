'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiArrowRight, FiCheckCircle, FiCheckSquare, FiDivide } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'
import { FullProgram } from '@/components/FullProgramModal'

const balancingSymbolsProgram: FullProgram = {
    code: `import java.util.Stack;

public class BalancingSymbols {
    
    public static boolean isBalanced(String expression) {
        Stack<Character> stack = new Stack<>();
        
        for (int i = 0; i < expression.length(); i++) {
            char current = expression.charAt(i);
            
            // Push opening brackets to stack
            if (current == '(' || current == '{' || current == '[') {
                stack.push(current);
            }
            // If it's a closing bracket, check for matching pair
            else if (current == ')' || current == '}' || current == ']') {
                // If stack is empty, it means there's a closing bracket without an opening one
                if (stack.isEmpty()) {
                    return false;
                }
                
                char top = stack.pop();
                
                // Fast-fail: if the newly popped bracket doesn't form a valid pair, return false
                if (!isMatchingPair(top, current)) {
                    return false;
                }
            }
        }
        
        // After scanning the whole string, stack MUST be empty if fully balanced
        return stack.isEmpty();
    }
    
    // Helper method to check if brackets match
    private static boolean isMatchingPair(char open, char close) {
        return (open == '(' && close == ')') ||
               (open == '{' && close == '}') ||
               (open == '[' && close == ']');
    }

    public static void main(String[] args) {
        String test1 = "((a+b)*c)";
        String test2 = "[(x+y)-{z*2}]";
        String test3 = "{[a+b(c]}"; // Invalid
        
        System.out.println(test1 + " -> " + (isBalanced(test1) ? "Balanced" : "Not Balanced"));
        System.out.println(test2 + " -> " + (isBalanced(test2) ? "Balanced" : "Not Balanced"));
        System.out.println(test3 + " -> " + (isBalanced(test3) ? "Balanced" : "Not Balanced"));
    }
}`,
    explanations: [
        { lines: [1], content: "Import the built-in java.util.Stack class which we will use to keep track of the opening symbols." },
        { lines: [3, 4, 5], content: "Declare the main class and the `isBalanced` method which accepts the string expression to test and returns a true/false boolean." },
        { lines: [6, 8, 9], content: "Initialize an empty Stack of Characters. We then start a loop that will examine every single character in the string from left to right." },
        { lines: [11, 12, 13, 14], content: "If the current character is any of the opening brackets '(', '{', or '[', we push it onto the top of the stack. We must wait to find its corresponding closing bracket." },
        { lines: [15, 16], content: "Otherwise, if the character is a closing bracket..." },
        { lines: [17, 18, 19, 20], content: "...the first crucial check: If the stack is already empty, it means we found a closing bracket but there was never a previous opening bracket to match it. Immediately return false." },
        { lines: [22, 24, 25, 26, 27], content: "Pop the most recent opening bracket from the top of the stack. Call a helper method to check if it's the correct match for the current closing character. If not (e.g., opened with '[' but closed with '}'), return false." },
        { lines: [31, 32, 33], content: "After the loop finishes processing every character, we MUST check if the stack is completely empty. If opening brackets are still left inside, it means they were never closed (e.g., '((a+b)' ). Return true only if empty." },
        { lines: [35, 36, 37, 38, 39, 40], content: "A simple helper method that checks if an opening bracket character correctly corresponds to a closing bracket character based on standard keyboard layout rules." },
        { lines: [42, 43, 44, 45, 47, 48, 49, 50], content: "The main method sets up three test cases (two valid, one invalid) to run the `isBalanced` logic against and print out human-readable results." }
    ]
};

const infixToPostfixProgram: FullProgram = {
    code: `import java.util.Stack;

public class InfixToPostfix {
    static int Prec(char ch) {
        switch (ch) {
            case '+': case '-': return 1;
            case '*': case '/': return 2;
            case '^': return 3;
        }
        return -1;
    }

    static String infixToPostfix(String exp) {
        String result = new String("");
        Stack<Character> stack = new Stack<>();

        for (int i = 0; i < exp.length(); ++i) {
            char c = exp.charAt(i);

            // Step 2: If operand, add to output
            if (Character.isLetterOrDigit(c)) {
                result += c;
            } 
            // Step 3: If '(', push to stack
            else if (c == '(') {
                stack.push(c);
            } 
            // Step 4: If ')', pop until '('
            else if (c == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result += stack.pop();
                }
                stack.pop(); // discard '('
            } 
            // Step 5: Operator encountered
            else {
                while (!stack.isEmpty() && Prec(c) <= Prec(stack.peek())) {
                    result += stack.pop();
                }
                stack.push(c);
            }
        }
        
        // Pop remaining operators
        while (!stack.isEmpty()) {
            if (stack.peek() == '(') return "Invalid Expression";
            result += stack.pop();
        }
        return result;
    }

    public static void main(String[] args) {
        String exp = "A+B*C";
        System.out.println("Infix: " + exp);
        System.out.println("Postfix: " + infixToPostfix(exp));
    }
}`,
    explanations: [
        { lines: [4, 5, 6, 7, 8, 9, 10, 11], content: "A helper method to determine the precedence of operators. Higher number means higher precedence." },
        { lines: [13, 14, 15], content: "The main conversion method. We initialize an empty result string and a Stack for holding operators." },
        { lines: [17, 18], content: "Loop through each character in the given infix expression from left to right." },
        { lines: [20, 21, 22, 23], content: "If the character is an operand (letter or digit), simply concatenate it to the result string." },
        { lines: [24, 25, 26, 27], content: "If it's an opening parenthesis '(', push it onto the stack." },
        { lines: [28, 29, 30, 31, 32, 33, 34], content: "If it's a closing parenthesis ')', repeatedly pop from the stack to the result until we hit an opening '('. Then pop and discard the '('." },
        { lines: [35, 36, 37, 38, 39, 40, 41], content: "If it's an operator (+, -, *, /), pop operators with strictly greater or equal precedence from the stack to the result. Finally, push the current operator to the stack." },
        { lines: [44, 45, 46, 47, 48, 49], content: "After the loop, flush out any remaining operators in the stack to the result." },
        { lines: [51, 52, 53, 54, 55], content: "The driver code to test a simple infix to postfix conversion." }
    ]
};

const infixToPrefixProgram: FullProgram = {
    code: `import java.util.Stack;

public class InfixToPrefix {
    static int prec(char c) {
        if (c == '^') return 3;
        else if (c == '/' || c == '*') return 2;
        else if (c == '+' || c == '-') return 1;
        else return -1;
    }

    static String infixToPrefix(String infix) {
        // Step 1: Reverse infix expression
        StringBuilder reversed = new StringBuilder(infix).reverse();

        // Step 2: Swap brackets
        for (int i = 0; i < reversed.length(); i++) {
            if (reversed.charAt(i) == '(') reversed.setCharAt(i, ')');
            else if (reversed.charAt(i) == ')') reversed.setCharAt(i, '(');
        }

        // Step 3: Modified Infix to Postfix logic
        String result = new String("");
        Stack<Character> stack = new Stack<>();
        
        for (int i = 0; i < reversed.length(); i++) {
            char c = reversed.charAt(i);
            
            if (Character.isLetterOrDigit(c)) {
                result += c;
            } else if (c == '(') {
                stack.push(c);
            } else if (c == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result += stack.pop();
                }
                stack.pop();
            } else {
                // For Prefix, pop only if strictly LESS precedence (not equal)
                while (!stack.isEmpty() && prec(c) < prec(stack.peek())) {
                    result += stack.pop();
                }
                stack.push(c);
            }
        }
        
        while (!stack.isEmpty()) {
            result += stack.pop();
        }

        // Step 4: Reverse the postfix result to get prefix
        return new StringBuilder(result).reverse().toString();
    }

    public static void main(String[] args) {
        String s = "(A-B/C)*(A/K-L)";
        System.out.println("Infix: " + s);
        System.out.println("Prefix: " + infixToPrefix(s));
    }
}`,
    explanations: [
        { lines: [4, 5, 6, 7, 8, 9], content: "Helper method assigning numerical precedence values strictly mapping the standard arithmetic hierarchy." },
        { lines: [11, 12, 13], content: "Step 1: The foundational trick for Infix -> Prefix is to first completely reverse the given infix string." },
        { lines: [15, 16, 17, 18, 19], content: "Step 2: Since we reversed the string, '(' became ')' and vice-versa. So we traverse to swap them back to their functional origins." },
        { lines: [21, 22, 23], content: "Step 3 setup: We prepare to perform a standard Infix to Postfix conversion on this modified string." },
        { lines: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37], content: "Characters, '(' and ')' are handled identically to standard Postfix conversion." },
        { lines: [38, 39, 40, 41, 42, 43], content: "CRUCIAL DIFFERENCE: When an operator is encountered, we ONLY pop from the stack if the top operator has strictly GREATER precedence. In Postfix, we pop on equal precedence too." },
        { lines: [46, 47, 48], content: "Flush out the remaining elements." },
        { lines: [50, 51, 52], content: "Step 4: Take the computed result and reverse it one final time. This produces the valid Prefix notation." }
    ]
};

const evaluatePrefixProgram: FullProgram = {
    code: `import java.util.Stack;

public class EvaluatePrefix {
    static Boolean isOperand(char c) {
        // Checking if the character is a digit (0-9)
        return c >= 48 && c <= 57;
    }

    static double evaluatePrefix(String expr) {
        Stack<Double> stack = new Stack<>();

        // Scan from RIGHT to LEFT
        for (int j = expr.length() - 1; j >= 0; j--) {
            char curr = expr.charAt(j);
            
            // If operand, push to Stack
            if (isOperand(curr)) {
                stack.push((double)(curr - '0'));
            } else {
                // Operator encountered, pop two elements
                double o1 = stack.pop(); // Top element is first operand!
                double o2 = stack.pop(); // Next element is second operand!

                switch (curr) {
                    case '+': stack.push(o1 + o2); break;
                    case '-': stack.push(o1 - o2); break;
                    case '*': stack.push(o1 * o2); break;
                    case '/': stack.push(o1 / o2); break;
                }
            }
        }
        return stack.peek();
    }

    public static void main(String[] args) {
        String expr = "+*235"; // + (* 2 3) 5 = 6 + 5 = 11
        System.out.println("Prefix: " + expr);
        System.out.println("Result: " + evaluatePrefix(expr));
    }
}`,
    explanations: [
        { lines: [4, 5, 6, 7], content: "Helper function checking if character is an operand (digit) specifically assuming single-digit values (ASCII math)." },
        { lines: [9, 10, 11], content: "Method using a Stack typed as Double to support decimal divisions." },
        { lines: [12, 13, 14, 15], content: "For Prefix evaluation, you MUST scan the expression purely backwards from Right to Left." },
        { lines: [16, 17, 18], content: "If it's a number, convert it from an ascii char to an actual integer (using - '0'), cast to double, and push it." },
        { lines: [19, 20, 21, 22], content: "If it's an operator, pop two operands. NOTE FOR PREFIX: the first pop is visually on the left operand `o1`, and the second pop is on the right `o2`." },
        { lines: [24, 25, 26, 27, 28, 29, 30], content: "Evaluate the two operands depending on the operator and push the resulting calculation back into the stack." },
        { lines: [32, 33], content: "When the entire string has been processed, the last remaining item in the stack is the final result." }
    ]
};

const content = {
    title: 'Expression Evaluation & Applications',
    explanationSections: [
        {
            title: '1️⃣ Infix, Prefix, and Postfix Notations',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Humans read <strong>Infix</strong> (A + B), but machines prefer <strong>Postfix</strong> (A B +) or <strong>Prefix</strong> (+ A B) because they don't require parentheses or precedence rules during evaluation.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-800/50 text-cyan-400">
                                <tr>
                                    <th className="px-4 py-3">Notation</th>
                                    <th className="px-4 py-3">Structure</th>
                                    <th className="px-4 py-3">Example</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-gray-300">
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Infix</td>
                                    <td className="px-4 py-2">Operand Operator Operand</td>
                                    <td className="px-4 py-2 font-mono">A + B * C</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-purple-300">Postfix (Reverse Polish)</td>
                                    <td className="px-4 py-2">Operand Operand Operator</td>
                                    <td className="px-4 py-2 font-mono">A B C * +</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-green-300">Prefix (Polish)</td>
                                    <td className="px-4 py-2">Operator Operand Operand</td>
                                    <td className="px-4 py-2 font-mono">+ A * B C</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Infix to Postfix Conversion',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        We use a <strong>Stack</strong> to hold operators until operands are printed.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-teal-400 font-bold mb-2">Algorithm Steps:</h5>
                        <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
                            <li>Scan string from left to right.</li>
                            <li>If operand, print it.</li>
                            <li>If <code>'('</code>, push to stack.</li>
                            <li>If <code>')'</code>, pop and print until <code>'('</code> is found.</li>
                            <li>If operator, pop operators with <strong>higher or equal precedence</strong> from stack, then push current operator.</li>
                        </ol>
                    </div>
                    <CodeBlock
                        language="java"
                        code={`// Full Java Program for Infix -> Postfix available via "View Full Program"`}
                        fullProgram={infixToPostfixProgram}
                    />
                </div>
            ),
        },
        {
            title: '3️⃣ Infix to Prefix Conversion',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Conversion to Prefix is similar to Postfix but with a reverse strategy.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-purple-400 font-bold mb-2">Algorithm Steps:</h5>
                        <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
                            <li>Reverse the Infix expression.</li>
                            <li>Swap <code>'('</code> with <code>')'</code> and vice versa.</li>
                            <li>Convert the modified expression to <strong>Postfix</strong>.</li>
                            <li>Reverse variables in the result to get the final <strong>Prefix</strong> expression.</li>
                        </ol>
                    </div>
                    <CodeBlock
                        language="java"
                        code={`// Full Java Program for Infix -> Prefix available via "View Full Program"`}
                        fullProgram={infixToPrefixProgram}
                    />
                </div>
            ),
        },
        {
            title: '4️⃣ Evaluating Prefix Expression',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        To evaluate Prefix <code>+ * 2 3 5</code>, we scan from <strong>Right to Left</strong>.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-green-400 font-bold mb-2">Algorithm Steps:</h5>
                        <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
                            <li>Scan expression from <strong>Right to Left</strong>.</li>
                            <li>If operand, <strong>push</strong> to stack.</li>
                            <li>If operator, <strong>pop</strong> two operands.
                                <ul className="list-disc list-inside ml-4 text-xs text-gray-400 mt-1">
                                    <li>First pop is <code>val1</code> (top).</li>
                                    <li>Second pop is <code>val2</code> (next).</li>
                                    <li>Result = <code>val1 Operator val2</code> (Order matters!).</li>
                                </ul>
                            </li>
                            <li>Push result back to stack.</li>
                            <li>Final stack top is the answer.</li>
                        </ol>
                    </div>
                    <div className="bg-slate-800/30 p-2 rounded text-xs text-gray-400">
                        Complexity: Time <MathRenderer math="O(n)" />, Space <MathRenderer math="O(n)" />
                    </div>
                    <CodeBlock
                        language="java"
                        code={`// Full Java Program for Evaluating Prefix Array via "View Full Program"`}
                        fullProgram={evaluatePrefixProgram}
                    />
                </div>
            ),
        },
        {
            title: '5️⃣ Evaluating Postfix Expression',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Evaluating <code>5 3 2 * +</code>. Correct Answer: <MathRenderer math="5 + (3 \times 2) = 11" />.
                    </p>
                    <div className="bg-yellow-500/10 p-2 rounded border border-yellow-500/30">
                        <p className="text-yellow-200 text-xs font-semibold">Important Implementation Note</p>
                        <p className="text-gray-400 text-xs">
                            This basic implementation assumes <strong>single-digit operands</strong>. For multi-digit numbers (like &quot;12&quot;), you must parse the string using a tokenizer or spaces as delimiters.
                        </p>
                    </div>
                    <CodeBlock
                        language="java"
                        code={`// Algorithm
Stack<Integer> stack = new Stack<>();
for (char c : expression) {
    if (isDigit(c)) {
        stack.push(c - '0');
    } else {
        int val1 = stack.pop();
        int val2 = stack.pop();
        // Note: val2 is the first operand!
        switch (c) {
            case '+': stack.push(val2 + val1); break;
            case '-': stack.push(val2 - val1); break;
            case '*': stack.push(val2 * val1); break;
            case '/': stack.push(val2 / val1); break;
        }
    }
}
return stack.pop();`}
                    />
                </div>
            ),
        },
        {
            title: '6️⃣ Balancing Symbols (Parentheses)',
            icon: <FiDivide className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Checking if <code>((a+b)*c)</code> is valid.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                            <li>Scan string. If <code>(</code>, <code>{'{'}</code>, <code>[</code>: Push to stack.</li>
                            <li>If <code>)</code>, <code>{'}'}</code>, <code>]</code>: Check if stack is empty (Error) or if top matches the pair. If match, Pop.</li>
                            <li>At end, stack must be empty for valid string.</li>
                        </ul>
                    </div>
                    <CodeBlock
                        language="java"
                        code={`// See "View Full Program" for the complete class implementation.
boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else if (c == ')' || c == '}' || c == ']') {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if ((c == ')' && top != '(') || 
                (c == '}' && top != '{') || 
                (c == ']' && top != '[')) {
                return false;
            }
        }
    }
    return stack.isEmpty();
}`}
                        fullProgram={balancingSymbolsProgram}
                    />
                </div>
            ),
        },
        {
            title: '7️⃣ Summary & Complexity',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    {/* Complexity Analysis */}
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h5 className="text-blue-400 font-bold mb-2">Complexity Analysis</h5>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Infix → Postfix:</strong> Time <MathRenderer math="O(n)" />, Space <MathRenderer math="O(n)" /> (Stack use).</li>
                            <li><strong>Evaluation:</strong> Time <MathRenderer math="O(n)" />, Space <MathRenderer math="O(n)" />.</li>
                        </ul>
                    </div>

                    {/* Precedence Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-800/50 text-cyan-400">
                                <tr>
                                    <th className="px-4 py-2">Operator</th>
                                    <th className="px-4 py-2">Precedence</th>
                                    <th className="px-4 py-2">Associativity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-gray-300">
                                <tr>
                                    <td className="px-4 py-2 font-mono">^</td>
                                    <td className="px-4 py-2 text-red-400 font-bold">Highest</td>
                                    <td className="px-4 py-2">Right to Left</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono">* /</td>
                                    <td className="px-4 py-2 text-yellow-400 font-bold">Medium</td>
                                    <td className="px-4 py-2">Left to Right</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono">+ -</td>
                                    <td className="px-4 py-2 text-green-400 font-bold">Lowest</td>
                                    <td className="px-4 py-2">Left to Right</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Common Mistakes */}
                    <div className="bg-red-900/10 p-4 rounded-lg border border-red-500/30">
                        <h5 className="text-red-400 font-bold mb-2">Common Mistakes</h5>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li>Popping operands in the <strong>wrong order</strong> during evaluation (div/sub issues).</li>
                            <li>Ignoring <strong>operator precedence</strong> or associativity (especially <code>^</code>).</li>
                            <li>Forgetting to check if stack is <strong>empty</strong> at the end of bracket balancing.</li>
                            <li>Assuming the simplified code works for <strong>multi-digit</strong> numbers without modification.</li>
                        </ul>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Convert A + B * C to Postfix.",
            solution: "ABC*+",
        },
        {
            question: "Convert A + B * C to Prefix.",
            solution: "+A*BC",
        },
        {
            question: "Evaluate Postfix: 2 3 1 * + 9 -",
            solution: "2 + (3*1) - 9 = 2 + 3 - 9 = 5 - 9 = -4.",
        }
    ],
    exampleProblems: [],
}

export default function ExpressionEvaluationPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
