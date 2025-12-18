'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DMTopicPage'
import { FiCpu } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Advanced Questions',
    explanationSections: [
        {
            title: 'Advanced Mixed-Topic Challenges',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        This section contains <span className="text-blue-400 font-semibold">4 Advanced Coding Challenges</span> that combine multiple concepts:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                            <h4 className="text-blue-300 font-medium mb-2">Concepts Covered</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                <li>Recursion & String Manipulation</li>
                                <li>2D Arrays & Mathematical Logic</li>
                                <li>OOP (Inheritance, Polymorphism)</li>
                                <li>Exception Handling & File I/O</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        }
    ] as ExplanationSection[],
    practiceQuestions: [
        {
            question: '1. Decode String (Recursion + String Manipulation)\nGiven an encoded string, return its decoded string.\nThe encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.\nYou may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.\nFurthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k.\nE.g. "3[a]2[bc]" -> "aaabcbc", "3[a2[c]]" -> "accaccacc"',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300 text-sm italic">
                        <strong>Logic:</strong> This problem is best solved using <strong>recursion</strong> or a <strong>stack</strong>. We need to parse the integer 'k', then recursively decode the content inside the brackets '[]', and repeat it 'k' times.
                    </p>
                    <CodeBlock code={`class DecodeString {
    private int pos = 0;

    public String decodeString(String s) {
        StringBuilder sb = new StringBuilder();
        String num = "";
        
        for (int i = pos; i < s.length(); i++) {
            char c = s.charAt(i);
            
            if (Character.isDigit(c)) {
                num += c;
            } else if (c == '[') {
                int n = Integer.parseInt(num);
                num = ""; // Reset number for nest
                pos = i + 1; // Move past '['
                String sub = decodeString(s); // Recursive Call
                
                // Repeat the returned substring n times
                for (int count = 0; count < n; count++) {
                    sb.append(sub);
                }
                
                // Update 'i' to the current global position 'pos' 
                // because the recursive call advanced it.
                i = pos; 
            } else if (c == ']') {
                pos = i; // Store position of closing bracket
                return sb.toString();
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        DecodeString solver = new DecodeString();
        System.out.println(solver.decodeString("3[a]2[bc]"));
        
        solver.pos = 0; // Reset for next call
        System.out.println(solver.decodeString("3[a2[c]]"));
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            aaabcbc<br />
                            accaccacc
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '2. Prime Spiral Matrix (2D Arrays + Math logic)\nCreate a "Spiral Matrix" of size N x N. Fill it with numbers starting from 1 in a spiral order (clockwise, starting from top-left).\nHowever, replace all Non-Prime numbers with 0.\nInput: N = 3\nSpiral: \n1 2 3\n8 9 4\n7 6 5\nOutput (Primes Only):\n0 2 3\n0 0 0\n7 0 5',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300 text-sm italic">
                        <strong>Logic:</strong> First, generate a standard spiral matrix using 4 pointers (top, bottom, left, right). Then, iterate through the matrix and apply a `isPrime()` check to replace non-primes with 0.
                    </p>
                    <CodeBlock code={`import java.util.Scanner;

public class PrimeSpiral {
    
    // Helper to check for prime
    static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter N: ");
        int n = sc.nextInt();
        
        int[][] matrix = new int[n][n];
        int val = 1;
        
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        
        // 1. Generate Spiral
        while (top <= bottom && left <= right) {
            // Left to Right
            for (int i = left; i <= right; i++) matrix[top][i] = val++;
            top++;
            
            // Top to Bottom
            for (int i = top; i <= bottom; i++) matrix[i][right] = val++;
            right--;
            
            // Right to Left
            if (top <= bottom) {
                for (int i = right; i >= left; i--) matrix[bottom][i] = val++;
                bottom--;
            }
            
            // Bottom to Top
            if (left <= right) {
                for (int i = bottom; i >= top; i--) matrix[i][left] = val++;
                left++;
            }
        }
        
        // 2. Filter Primes and Print
        System.out.println("Prime Spiral:");
        for(int i=0; i<n; i++) {
            for(int j=0; j<n; j++) {
                if(isPrime(matrix[i][j])) {
                    System.out.print(matrix[i][j] + "\\t");
                } else {
                    System.out.print("0\\t");
                }
            }
            System.out.println();
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output (N=3):</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            0       2       3 <br />
                            0       0       0 <br />
                            7       0       5
                        </pre>
                    </div>
                </div>
            ),
        },
        {
            question: '3. Custom Banking System (OOP + Exceptions + Arrays)\nDesign a Bank System. \n1. Abstract Class `Account` with fields `accNo`, `balance` and abstract methods `deposit(double amt)`, `withdraw(double amt)`.\n2. Interface `Loanable` with method `checkLoanEligibility()`.\n3. Class `SavingsAccount` extends `Account` implements `Loanable`.\n   - Maintains a minimum balance of 500. Throws `MinBalanceException` if withdrawal goes below 500.\n   - Loan eligible if balance > 10,000.\n4. Create a main class to manage an array of 5 accounts.',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`// Custom Exception
class MinBalanceException extends Exception {
    public MinBalanceException(String msg) { super(msg); }
}

// Interface
interface Loanable {
    boolean checkLoanEligibility();
}

// Abstract Class
abstract class Account {
    int accNo;
    double balance;
    
    public Account(int accNo, double balance) {
        this.accNo = accNo;
        this.balance = balance;
    }
    
    abstract void deposit(double amt);
    abstract void withdraw(double amt) throws MinBalanceException;
}

// Concrete Class
class SavingsAccount extends Account implements Loanable {
    
    public SavingsAccount(int accNo, double balance) {
        super(accNo, balance);
    }
    
    @Override
    void deposit(double amt) {
        balance += amt;
        System.out.println("Deposited: " + amt + ". New Balance: " + balance);
    }
    
    @Override
    void withdraw(double amt) throws MinBalanceException {
        if (balance - amt < 500) {
            throw new MinBalanceException("Failed: Balance cannot go below 500.");
        }
        balance -= amt;
        System.out.println("Withdrawn: " + amt + ". Remaining: " + balance);
    }
    
    @Override
    public boolean checkLoanEligibility() {
        return balance > 10000;
    }
}

public class BankSystem {
    public static void main(String[] args) {
        SavingsAccount sa = new SavingsAccount(101, 5000);
        
        try {
            sa.deposit(6000); // Bal: 11000
            
            if(sa.checkLoanEligibility()) 
                System.out.println("Loan Eligible!");
                
            sa.withdraw(10600); // Bal: 400 (Should throw exception)
            
        } catch (MinBalanceException e) {
            System.out.println("Exception: " + e.getMessage());
        }
    }
}`} />
                </div>
            ),
        },
        {
            question: '4. Employee Payroll Processor (File I/O + OOP)\nCreate a system that reads employee data from a file "employees.csv".\nFormat: "ID,Name,Type,BasicSalary"\nType can be "M" (Manager) or "D" (Developer).\n- Manager gets 20% bonus.\n- Developer gets 10% bonus.\nRead the file, calculate net salary for each, and write a report to "payroll_report.txt" with: "Name: [NetSalary]".',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.io.*;

class Employee {
    String name;
    double basic;
    
    Employee(String name, double basic) {
        this.name = name;
        this.basic = basic;
    }
    
    double calculateSalary() { return basic; }
}

class Manager extends Employee {
    Manager(String n, double b) { super(n, b); }
    
    @Override
    double calculateSalary() { return basic + (basic * 0.20); }
}

class Developer extends Employee {
    Developer(String n, double b) { super(n, b); }
    
    @Override
    double calculateSalary() { return basic + (basic * 0.10); }
}

public class PayrollSystem {
    public static void main(String[] args) {
        // Create dummy CSV for demo
        createDummyData(); 
        
        try (BufferedReader br = new BufferedReader(new FileReader("employees.csv"));
             BufferedWriter bw = new BufferedWriter(new FileWriter("payroll_report.txt"))) {
                 
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(","); // ID,Name,Type,Basic
                if(parts.length < 4) continue;
                
                String name = parts[1];
                String type = parts[2];
                double basic = Double.parseDouble(parts[3]);
                
                Employee emp = null;
                if(type.equalsIgnoreCase("M")) emp = new Manager(name, basic);
                else if(type.equalsIgnoreCase("D")) emp = new Developer(name, basic);
                
                if(emp != null) {
                    double net = emp.calculateSalary();
                    bw.write("Name: " + name + " | Net Salary: " + net);
                    bw.newLine();
                }
            }
            System.out.println("Payroll Report Generated!");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    static void createDummyData() {
        try(FileWriter fw = new FileWriter("employees.csv")) {
            fw.write("101,Alice,M,50000\\n");
            fw.write("102,Bob,D,30000\\n");
        } catch(Exception e){}
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>payroll_report.txt Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Name: Alice | Net Salary: 60000.0 <br />
                            Name: Bob | Net Salary: 33000.0
                        </pre>
                    </div>
                </div>
            ),
        }
    ] as PracticeQuestion[]
}

export default function Page() {
    return <DMTopicPage content={content} subjectName="Java" subjectHref="/subjects/java" />
}
