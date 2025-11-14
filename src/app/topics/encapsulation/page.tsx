'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLock, FiEye, FiShield, FiKey } from 'react-icons/fi'

const content = {
  title: 'Encapsulation',
  explanationSections: [
    {
      title: 'Introduction to Encapsulation',
      icon: <FiShield className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Encapsulation</span> is one of the four fundamental <span class="text-cyan-300">OOP principles</span>. It means wrapping data and methods together in a class and hiding internal details.

Key Concepts:
→ <span class="text-blue-400">Data hiding:</span> Make instance variables <span class="text-cyan-300">private</span>
→ <span class="text-blue-400">Controlled access:</span> Provide public <span class="text-cyan-300">getter</span> and <span class="text-cyan-300">setter</span> methods
→ <span class="text-blue-400">Data security:</span> Prevent direct access to sensitive data
→ <span class="text-blue-400">Flexibility:</span> Can change implementation without affecting users

Benefits:
→ <span class="text-amber-300">Data security</span> and integrity
→ <span class="text-amber-300">Better control</span> over data validation
→ <span class="text-amber-300">Easier maintenance</span> and updates`,
      code: `public class EncapsulationIntro {
    // Private variable (data hiding)
    private String name;
    
    // Public getter method
    public String getName() {
        return this.name;
    }
    
    // Public setter method
    public void setName(String name) {
        this.name = name;
    }
}`,
    },
    {
      title: 'Access Modifiers',
      icon: <FiLock className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Access modifiers</span> control the visibility and accessibility of class members.

Types:
→ <span class="text-cyan-300">private:</span> Accessible only within the same class
→ <span class="text-cyan-300">default (package):</span> Accessible within the same package
→ <span class="text-cyan-300">protected:</span> Accessible within package and subclasses
→ <span class="text-cyan-300">public:</span> Accessible from anywhere

<span class="text-amber-300">Best Practice:</span> Make instance variables <span class="text-cyan-300">private</span> and provide public getters/setters.`,
      code: `public class AccessModifiers {
    private int privateVar;      // Only accessible in this class
    int defaultVar;             // Accessible in same package
    protected int protectedVar; // Accessible in package and subclasses
    public int publicVar;       // Accessible everywhere
    
    // Private variable with public accessor
    private String name;
    
    public String getName() {
        return this.name;  // Can access private variable within class
    }
}`,
    },
    {
      title: 'Getter and Setter Methods',
      icon: <FiKey className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Getter</span> and <span class="text-blue-400 font-semibold">setter</span> methods provide controlled access to private variables.

Getter Methods:
→ Return the value of <span class="text-cyan-300">private variable</span>
→ <span class="text-cyan-300">Naming:</span> <span class="text-blue-400">getVariableName()</span>
→ <span class="text-amber-300">Example:</span> <span class="text-cyan-300">public String getName() { return this.name; }</span>

Setter Methods:
→ Set the value of <span class="text-cyan-300">private variable</span>
→ <span class="text-cyan-300">Naming:</span> <span class="text-blue-400">setVariableName()</span>
→ <span class="text-amber-300">Can include validation logic</span>
→ <span class="text-amber-300">Example:</span> <span class="text-cyan-300">public void setName(String n) { this.name = n; }</span>`,
      code: `public class GetterSetter {
    private String name;
    private int age;
    
    // Getter methods
    public String getName() {
        return this.name;
    }
    
    public int getAge() {
        return this.age;
    }
    
    // Setter methods
    public void setName(String name) {
        this.name = name;
    }
    
    public void setAge(int age) {
        if (age > 0 && age <= 120) {
            this.age = age;
        } else {
            System.out.println("Invalid age!");
        }
    }
}`,
    },
    {
      title: 'Data Validation in Setters',
      icon: <FiEye className="w-6 h-6" />,
      content: `Setter methods can include <span class="text-blue-400 font-semibold">validation</span> to ensure data integrity.

Validation Examples:
→ Check if value is within <span class="text-cyan-300">valid range</span>
→ Ensure <span class="text-cyan-300">non-null</span> values
→ Validate <span class="text-cyan-300">format</span> (email, phone number)
→ Prevent <span class="text-cyan-300">invalid state</span> changes

Benefits:
→ <span class="text-amber-300">Prevents invalid data</span> from being stored
→ <span class="text-amber-300">Maintains object integrity</span>
→ <span class="text-amber-300">Provides clear error messages</span>`,
      code: `public class DataValidation {
    private double gpa;
    private String email;
    
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA! Must be between 0.0 and 4.0");
        }
    }
    
    public void setEmail(String email) {
        if (email != null && email.contains("@")) {
            this.email = email;
        } else {
            System.out.println("Invalid email format!");
        }
    }
}`,
    },
  ] as ExplanationSection[],
  exampleCode: `public class Student {
    // Private instance variables (data hiding)
    private String name;
    private int age;
    private double gpa;
    
    // Constructor
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    // Getter methods
    public String getName() {
        return this.name;
    }
    
    public int getAge() {
        return this.age;
    }
    
    public double getGpa() {
        return this.gpa;
    }
    
    // Setter methods with validation
    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }
    
    public void setAge(int age) {
        if (age > 0 && age <= 120) {
            this.age = age;
        } else {
            System.out.println("Invalid age!");
        }
    }
    
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA!");
        }
    }
    
    // Method to display student information
    public void display() {
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
        System.out.println("GPA: " + this.gpa);
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        Student student = new Student("John", 20, 3.5);
        
        // Accessing private data through public methods
        System.out.println("Name: " + student.getName());
        System.out.println("Age: " + student.getAge());
        
        // Modifying data through setter methods
        student.setAge(21);
        student.setGpa(3.7);
        
        student.display();
        
        // This would cause error - cannot access private variable directly
        // student.name = "Jane"; // Compilation error
    }
}`,
  practiceQuestions: [
    {
      question: 'Draw a Class Diagram and Develop a Java Program to Create a Class Car with the Private Attributes Regno, OwnerName, Model(Year of Manufacturing), FuelUsed, EngineNumber. Class should have Methods to accept the data and print the data.',
      solution: 'Create a Car class with private attributes: Regno (String), OwnerName (String), Model (int), FuelUsed (String), EngineNumber (String). Implement acceptData() method using Scanner to read input, and printData() method to display all information.',
      solutionCode: `import java.util.Scanner;

class Car {
    private String Regno;
    private String OwnerName;
    private int Model;
    private String FuelUsed;
    private String EngineNumber;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter Registration Number: ");
        this.Regno = sc.nextLine();
        
        System.out.print("Enter Owner Name: ");
        this.OwnerName = sc.nextLine();
        
        System.out.print("Enter Model (Year): ");
        this.Model = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Fuel Used: ");
        this.FuelUsed = sc.nextLine();
        
        System.out.print("Enter Engine Number: ");
        this.EngineNumber = sc.nextLine();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Car Details ===");
        System.out.println("Registration Number: " + this.Regno);
        System.out.println("Owner Name: " + this.OwnerName);
        System.out.println("Model (Year): " + this.Model);
        System.out.println("Fuel Used: " + this.FuelUsed);
        System.out.println("Engine Number: " + this.EngineNumber);
    }
}

public class CarDemo {
    public static void main(String[] args) {
        Car car = new Car();
        car.acceptData();
        car.printData();
    }
}`,
    },
    {
      question: 'Draw a Class Diagram and Develop a Java Program to Create a Class Country with the Private Attributes CName, CapitalCity, Area, Population, Currency. Class should have Methods to accept the data and print the data.',
      solution: 'Create a Country class with private attributes: CName (String), CapitalCity (String), Area (double), Population (long), Currency (String). Implement acceptData() and printData() methods.',
      solutionCode: `import java.util.Scanner;

class Country {
    private String CName;
    private String CapitalCity;
    private double Area;
    private long Population;
    private String Currency;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter Country Name: ");
        this.CName = sc.nextLine();
        
        System.out.print("Enter Capital City: ");
        this.CapitalCity = sc.nextLine();
        
        System.out.print("Enter Area (sq km): ");
        this.Area = sc.nextDouble();
        
        System.out.print("Enter Population: ");
        this.Population = sc.nextLong();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Currency: ");
        this.Currency = sc.nextLine();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Country Details ===");
        System.out.println("Country Name: " + this.CName);
        System.out.println("Capital City: " + this.CapitalCity);
        System.out.println("Area: " + this.Area + " sq km");
        System.out.println("Population: " + this.Population);
        System.out.println("Currency: " + this.Currency);
    }
}

public class CountryDemo {
    public static void main(String[] args) {
        Country country = new Country();
        country.acceptData();
        country.printData();
    }
}`,
    },
    {
      question: 'Draw a Class Diagram and Develop a Java Program to Create a Class Player with the Private Attributes PName, MatchesPlayed, Balls_Faced, Runs_Scored, Strike_Rate. Class should have Methods to accept the data, Calculate the Strike_Rate and print the data.',
      solution: 'Create a Player class with private attributes. Strike_Rate is calculated as (Runs_Scored / Balls_Faced) * 100. Create acceptData() to read input, calculateStrikeRate() to compute strike rate, and printData() to display all information.',
      solutionCode: `import java.util.Scanner;

class Player {
    private String PName;
    private int MatchesPlayed;
    private int Balls_Faced;
    private int Runs_Scored;
    private double Strike_Rate;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter Player Name: ");
        this.PName = sc.nextLine();
        
        System.out.print("Enter Matches Played: ");
        this.MatchesPlayed = sc.nextInt();
        
        System.out.print("Enter Balls Faced: ");
        this.Balls_Faced = sc.nextInt();
        
        System.out.print("Enter Runs Scored: ");
        this.Runs_Scored = sc.nextInt();
    }
    
    // Method to calculate strike rate
    public void calculateStrikeRate() {
        if (this.Balls_Faced > 0) {
            this.Strike_Rate = (this.Runs_Scored * 100.0) / this.Balls_Faced;
        } else {
            this.Strike_Rate = 0.0;
        }
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Player Details ===");
        System.out.println("Player Name: " + this.PName);
        System.out.println("Matches Played: " + this.MatchesPlayed);
        System.out.println("Balls Faced: " + this.Balls_Faced);
        System.out.println("Runs Scored: " + this.Runs_Scored);
        System.out.println("Strike Rate: " + String.format("%.2f", this.Strike_Rate));
    }
}

public class PlayerDemo {
    public static void main(String[] args) {
        Player player = new Player();
        player.acceptData();
        player.calculateStrikeRate();
        player.printData();
    }
}`,
    },
    {
      question: 'Draw a Class Diagram and Develop a Java Program to Create a Class Movie with the Private Attributes MName, Hero, Heroien, YOR(Year of Release), Director, Producer, MType (Action, Comedy, Horror etc.). Class should have Methods to accept the data and print the data.',
      solution: 'Create a Movie class with private attributes: MName (String), Hero (String), Heroien (String), YOR (int), Director (String), Producer (String), MType (String). Implement acceptData() and printData() methods.',
      solutionCode: `import java.util.Scanner;

class Movie {
    private String MName;
    private String Hero;
    private String Heroien;
    private int YOR;
    private String Director;
    private String Producer;
    private String MType;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter Movie Name: ");
        this.MName = sc.nextLine();
        
        System.out.print("Enter Hero Name: ");
        this.Hero = sc.nextLine();
        
        System.out.print("Enter Heroine Name: ");
        this.Heroien = sc.nextLine();
        
        System.out.print("Enter Year of Release: ");
        this.YOR = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Director Name: ");
        this.Director = sc.nextLine();
        
        System.out.print("Enter Producer Name: ");
        this.Producer = sc.nextLine();
        
        System.out.print("Enter Movie Type (Action/Comedy/Horror/etc): ");
        this.MType = sc.nextLine();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Movie Details ===");
        System.out.println("Movie Name: " + this.MName);
        System.out.println("Hero: " + this.Hero);
        System.out.println("Heroine: " + this.Heroien);
        System.out.println("Year of Release: " + this.YOR);
        System.out.println("Director: " + this.Director);
        System.out.println("Producer: " + this.Producer);
        System.out.println("Movie Type: " + this.MType);
    }
}

public class MovieDemo {
    public static void main(String[] args) {
        Movie movie = new Movie();
        movie.acceptData();
        movie.printData();
    }
}`,
    },
    {
      question: 'Draw a Class Diagram and Develop a Java Program to Create a Class Doctor with the Private Attributes Id, Name, Specialisation, ConsultationFee. Class should have Methods to accept the data and print the data.',
      solution: 'Create a Doctor class with private attributes: Id (int or String), Name (String), Specialisation (String), ConsultationFee (double). Implement acceptData() and printData() methods.',
      solutionCode: `import java.util.Scanner;

class Doctor {
    private int Id;
    private String Name;
    private String Specialisation;
    private double ConsultationFee;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter Doctor ID: ");
        this.Id = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Doctor Name: ");
        this.Name = sc.nextLine();
        
        System.out.print("Enter Specialisation: ");
        this.Specialisation = sc.nextLine();
        
        System.out.print("Enter Consultation Fee: ");
        this.ConsultationFee = sc.nextDouble();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Doctor Details ===");
        System.out.println("Doctor ID: " + this.Id);
        System.out.println("Name: " + this.Name);
        System.out.println("Specialisation: " + this.Specialisation);
        System.out.println("Consultation Fee: ₹" + this.ConsultationFee);
    }
}

public class DoctorDemo {
    public static void main(String[] args) {
        Doctor doctor = new Doctor();
        doctor.acceptData();
        doctor.printData();
    }
}`,
    },
    {
      question: 'Draw a Class Diagram and Develop a Java Program to Create a Class Item that stores the following Details Id, Name, Price, Availability. Class should have Methods to accept the data and print the data.',
      solution: 'Create an Item class with private attributes: Id (int or String), Name (String), Price (double), Availability (String or boolean). Implement acceptData() and printData() methods.',
      solutionCode: `import java.util.Scanner;

class Item {
    private int Id;
    private String Name;
    private double Price;
    private String Availability;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter Item ID: ");
        this.Id = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Item Name: ");
        this.Name = sc.nextLine();
        
        System.out.print("Enter Price: ");
        this.Price = sc.nextDouble();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Availability (In Stock/Out of Stock): ");
        this.Availability = sc.nextLine();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Item Details ===");
        System.out.println("Item ID: " + this.Id);
        System.out.println("Item Name: " + this.Name);
        System.out.println("Price: ₹" + this.Price);
        System.out.println("Availability: " + this.Availability);
    }
}

public class ItemDemo {
    public static void main(String[] args) {
        Item item = new Item();
        item.acceptData();
        item.printData();
    }
}`,
    },
    {
      question: 'Draw a Class Diagram and Develop a Java Program to Create a Class Bill with the private Attributes Bill_Num, Customer_Name, Bill_Amount, DiscountPercent, DiscountAmount, GST%, GSTAmount, NetBill. Create Methods to accept the Bill_Num, Customer_Name, Bill_Amount, DiscountPercent, GST%, Create another Method to calculate DiscountAmount, GSTAmount and NetBill to Pay and Create a Method to Display all the Details. Create another class Bill_Demo To Test the Bill Class for Minimum 2 Bills.',
      solution: 'Create a Bill class with private attributes. Implement acceptData() to read input, calculateBill() to compute DiscountAmount = (Bill_Amount * DiscountPercent) / 100, GSTAmount = ((Bill_Amount - DiscountAmount) * GST) / 100, and NetBill = Bill_Amount - DiscountAmount + GSTAmount. Create displayData() to show all details. Test with Bill_Demo class creating at least 2 bill objects.',
      solutionCode: `import java.util.Scanner;

class Bill {
    private int Bill_Num;
    private String Customer_Name;
    private double Bill_Amount;
    private double DiscountPercent;
    private double DiscountAmount;
    private double GST;
    private double GSTAmount;
    private double NetBill;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter Bill Number: ");
        this.Bill_Num = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Customer Name: ");
        this.Customer_Name = sc.nextLine();
        
        System.out.print("Enter Bill Amount: ");
        this.Bill_Amount = sc.nextDouble();
        
        System.out.print("Enter Discount Percent: ");
        this.DiscountPercent = sc.nextDouble();
        
        System.out.print("Enter GST %: ");
        this.GST = sc.nextDouble();
    }
    
    // Method to calculate discount, GST and net bill
    public void calculateBill() {
        this.DiscountAmount = (this.Bill_Amount * this.DiscountPercent) / 100.0;
        double amountAfterDiscount = this.Bill_Amount - this.DiscountAmount;
        this.GSTAmount = (amountAfterDiscount * this.GST) / 100.0;
        this.NetBill = amountAfterDiscount + this.GSTAmount;
    }
    
    // Method to display all details
    public void displayData() {
        System.out.println("\\n=== Bill Details ===");
        System.out.println("Bill Number: " + this.Bill_Num);
        System.out.println("Customer Name: " + this.Customer_Name);
        System.out.println("Bill Amount: ₹" + String.format("%.2f", this.Bill_Amount));
        System.out.println("Discount Percent: " + this.DiscountPercent + "%");
        System.out.println("Discount Amount: ₹" + String.format("%.2f", this.DiscountAmount));
        System.out.println("GST %: " + this.GST + "%");
        System.out.println("GST Amount: ₹" + String.format("%.2f", this.GSTAmount));
        System.out.println("Net Bill to Pay: ₹" + String.format("%.2f", this.NetBill));
    }
}

public class Bill_Demo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // First Bill
        System.out.println("\\n=== Enter Details for Bill 1 ===");
        Bill bill1 = new Bill();
        bill1.acceptData();
        bill1.calculateBill();
        bill1.displayData();
        
        // Second Bill
        System.out.println("\\n=== Enter Details for Bill 2 ===");
        Bill bill2 = new Bill();
        bill2.acceptData();
        bill2.calculateBill();
        bill2.displayData();
        
        sc.close();
    }
}`,
    },
    {
      question: 'Draw a Class Diagram and Develop a Java Program to Create a Class EmpSalary with the private Attributes EmpId, Name, Basic, Da, HRA, Gross. Create Methods to accept the Details Employee Id, Name and Basic then Create another Method to Calculate DA which is 30% of Basic, HRA 20% of Basic then Gross (Basic+ Da + HRA) and Print all the details to the User using another Method.',
      solution: 'Create an EmpSalary class with private attributes. Implement acceptData() to read EmpId, Name, and Basic. Create calculateSalary() to compute DA = 30% of Basic, HRA = 20% of Basic, and Gross = Basic + DA + HRA. Create printData() to display all details.',
      solutionCode: `import java.util.Scanner;

class EmpSalary {
    private int EmpId;
    private String Name;
    private double Basic;
    private double Da;
    private double HRA;
    private double Gross;
    
    // Method to accept employee details
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter Employee ID: ");
        this.EmpId = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Employee Name: ");
        this.Name = sc.nextLine();
        
        System.out.print("Enter Basic Salary: ");
        this.Basic = sc.nextDouble();
    }
    
    // Method to calculate DA, HRA and Gross
    public void calculateSalary() {
        this.Da = (this.Basic * 30) / 100.0;  // DA is 30% of Basic
        this.HRA = (this.Basic * 20) / 100.0;  // HRA is 20% of Basic
        this.Gross = this.Basic + this.Da + this.HRA;    // Gross = Basic + DA + HRA
    }
    
    // Method to print all details
    public void printData() {
        System.out.println("\\n=== Employee Salary Details ===");
        System.out.println("Employee ID: " + this.EmpId);
        System.out.println("Employee Name: " + this.Name);
        System.out.println("Basic Salary: ₹" + String.format("%.2f", this.Basic));
        System.out.println("DA (30% of Basic): ₹" + String.format("%.2f", this.Da));
        System.out.println("HRA (20% of Basic): ₹" + String.format("%.2f", this.HRA));
        System.out.println("Gross Salary: ₹" + String.format("%.2f", this.Gross));
    }
}

public class EmpSalaryDemo {
    public static void main(String[] args) {
        EmpSalary emp = new EmpSalary();
        emp.acceptData();
        emp.calculateSalary();
        emp.printData();
    }
}`,
    },
    {
      question: 'Write a Java class Student with private variables and getter/setter methods.',
      solution: 'Create a Student class with private fields (name, marks), public getter methods to read values, and public setter methods to modify values. Include validation in setters if needed.',
      solutionCode: `class Student {
    private String name;
    private int marks;
    
    // Getter methods
    public String getName() {
        return this.name;
    }
    
    public int getMarks() {
        return this.marks;
    }
    
    // Setter methods
    public void setName(String n) {
        this.name = n;
    }
    
    public void setMarks(int m) {
        this.marks = m;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.setName("Ravi");
        s.setMarks(90);
        
        System.out.println(s.getName() + " scored " + s.getMarks());
    }
}`,
    },
    {
      question: 'Draw a class diagram and develop a Java program to create a class Employee with the attributes Id, name, designation, Salary. Class should facilitate accept the data and print data to the user using method. Create another class Example2 to test the Employee class.',
      solution: 'Create an Employee class with private attributes: Id (int), name (String), designation (String), Salary (double). Implement acceptData() method using Scanner to read input, and printData() method to display all information. Create Example2 class to test the Employee class.',
      solutionCode: `import java.util.Scanner;

class Employee {
    private int Id;
    private String name;
    private String designation;
    private double Salary;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Employee ID: ");
        this.Id = sc.nextInt();
        sc.nextLine(); // consume newline
        System.out.print("Enter Employee Name: ");
        this.name = sc.nextLine();
        System.out.print("Enter Designation: ");
        this.designation = sc.nextLine();
        System.out.print("Enter Salary: ");
        this.Salary = sc.nextDouble();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Employee Details ===");
        System.out.println("Employee ID: " + this.Id);
        System.out.println("Employee Name: " + this.name);
        System.out.println("Designation: " + this.designation);
        System.out.println("Salary: ₹" + this.Salary);
    }
}

public class Example2 {
    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.acceptData();
        emp.printData();
    }
}`,
    },
    {
      question: 'Create a class Book that stores with attributes bookID, name, author name, publisher name, MRP. Class should facilitate methods to accept the data and to print the data. Create another class Example to test the Book class.',
      solution: 'Create a Book class with private attributes: bookID (int or String), name (String), author name (String), publisher name (String), MRP (double). Implement acceptData() and printData() methods. Create Example class to test the Book class.',
      solutionCode: `import java.util.Scanner;

class Book {
    private int bookID;
    private String name;
    private String authorName;
    private String publisherName;
    private double MRP;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Book ID: ");
        this.bookID = sc.nextInt();
        sc.nextLine(); // consume newline
        System.out.print("Enter Book Name: ");
        this.name = sc.nextLine();
        System.out.print("Enter Author Name: ");
        this.authorName = sc.nextLine();
        System.out.print("Enter Publisher Name: ");
        this.publisherName = sc.nextLine();
        System.out.print("Enter MRP: ");
        this.MRP = sc.nextDouble();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Book Details ===");
        System.out.println("Book ID: " + this.bookID);
        System.out.println("Book Name: " + this.name);
        System.out.println("Author Name: " + this.authorName);
        System.out.println("Publisher Name: " + this.publisherName);
        System.out.println("MRP: ₹" + this.MRP);
    }
}

public class Example {
    public static void main(String[] args) {
        Book book = new Book();
        book.acceptData();
        book.printData();
    }
}`,
    },
    {
      question: 'Create a class Rectangle with attributes name, length, breadth, area, perimeter. Class should facilitate the method, accept the data and display data, calculate, print data. Create another class Example4 to test the Rectangle class.',
      solution: 'Create a Rectangle class with private attributes: name (String), length (double), breadth (double), area (double), perimeter (double). Implement acceptData() to read input, calculate() to compute area and perimeter, and printData() to display all information. Create Example4 class to test.',
      solutionCode: `import java.util.Scanner;

class Rectangle {
    private String name;
    private double length;
    private double breadth;
    private double area;
    private double perimeter;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Rectangle Name: ");
        this.name = sc.nextLine();
        System.out.print("Enter Length: ");
        this.length = sc.nextDouble();
        System.out.print("Enter Breadth: ");
        this.breadth = sc.nextDouble();
    }
    
    // Method to calculate area and perimeter
    public void calculate() {
        this.area = this.length * this.breadth;
        this.perimeter = 2 * (this.length + this.breadth);
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Rectangle Details ===");
        System.out.println("Rectangle Name: " + this.name);
        System.out.println("Length: " + this.length);
        System.out.println("Breadth: " + this.breadth);
        System.out.println("Area: " + this.area);
        System.out.println("Perimeter: " + this.perimeter);
    }
}

public class Example4 {
    public static void main(String[] args) {
        Rectangle rect = new Rectangle();
        rect.acceptData();
        rect.calculate();
        rect.printData();
    }
}`,
    },
    {
      question: 'Draw a class diagram and develop a Java program to create a class Customer for electricity department with attributes custId, name, previous reading, current reading, no of units & bill to pay. Class should facilitate the methods for accepting the data calculating the bill and printing the bill to user. Use the following condition to calculate the bill: for units upto 100 ₹ 1 per unit, for units upto 200 ₹ 2 per unit, for units upto 300 ₹ 3 per unit, for units upto 400 ₹ 4 per unit, for units upto 500 ₹ 5 per unit, for units above 500 ₹ 6 per unit. Create another class Example5 to test the functionality of Customer class.',
      solution: 'Create a Customer class with private attributes: custId (int), name (String), previousReading (double), currentReading (double), units (double), billToPay (double). Implement acceptData() to read input, calculateBill() to compute bill based on units using if-else conditions, and printBill() to display all details. Create Example5 class to test.',
      solutionCode: `import java.util.Scanner;

class Customer {
    private int custId;
    private String name;
    private double previousReading;
    private double currentReading;
    private double units;
    private double billToPay;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Customer ID: ");
        this.custId = sc.nextInt();
        sc.nextLine(); // consume newline
        System.out.print("Enter Customer Name: ");
        this.name = sc.nextLine();
        System.out.print("Enter Previous Reading: ");
        this.previousReading = sc.nextDouble();
        System.out.print("Enter Current Reading: ");
        this.currentReading = sc.nextDouble();
    }
    
    // Method to calculate bill
    public void calculateBill() {
        this.units = this.currentReading - this.previousReading;
        if (this.units <= 100) {
            this.billToPay = this.units * 1;
        } else if (this.units <= 200) {
            this.billToPay = 100 * 1 + (this.units - 100) * 2;
        } else if (this.units <= 300) {
            this.billToPay = 100 * 1 + 100 * 2 + (this.units - 200) * 3;
        } else if (this.units <= 400) {
            this.billToPay = 100 * 1 + 100 * 2 + 100 * 3 + (this.units - 300) * 4;
        } else if (this.units <= 500) {
            this.billToPay = 100 * 1 + 100 * 2 + 100 * 3 + 100 * 4 + (this.units - 400) * 5;
        } else {
            this.billToPay = 100 * 1 + 100 * 2 + 100 * 3 + 100 * 4 + 100 * 5 + (this.units - 500) * 6;
        }
    }
    
    // Method to print bill
    public void printBill() {
        System.out.println("\\n=== Electricity Bill ===");
        System.out.println("Customer ID: " + this.custId);
        System.out.println("Customer Name: " + this.name);
        System.out.println("Previous Reading: " + this.previousReading);
        System.out.println("Current Reading: " + this.currentReading);
        System.out.println("Units Consumed: " + this.units);
        System.out.println("Bill to Pay: ₹" + this.billToPay);
    }
}

public class Example5 {
    public static void main(String[] args) {
        Customer customer = new Customer();
        customer.acceptData();
        customer.calculateBill();
        customer.printBill();
    }
}`,
    },
    {
      question: 'Draw a class diagram and develop a Java program to create a class Student Result with the private attributes rollno, name, marks in 5 subjects m1, m2, m3, m4, m5, total and result. Class should facilitate the methods to accept the data and calculate total result, print the details to the user. Use the following condition to calculate the result: In every subject student scored ≥ 35 result is \'pass\' otherwise result is \'fail\'.',
      solution: 'Create a StudentResult class with private attributes: rollno (int), name (String), m1, m2, m3, m4, m5 (int), total (int), result (String). Implement acceptData() to read input, calculateTotal() to sum all marks, calculateResult() to check if all subjects >= 35, and printData() to display all details.',
      solutionCode: `import java.util.Scanner;

class StudentResult {
    private int rollno;
    private String name;
    private int m1;
    private int m2;
    private int m3;
    private int m4;
    private int m5;
    private int total;
    private String result;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Roll Number: ");
        this.rollno = sc.nextInt();
        sc.nextLine(); // consume newline
        System.out.print("Enter Student Name: ");
        this.name = sc.nextLine();
        System.out.print("Enter Marks in Subject 1: ");
        this.m1 = sc.nextInt();
        System.out.print("Enter Marks in Subject 2: ");
        this.m2 = sc.nextInt();
        System.out.print("Enter Marks in Subject 3: ");
        this.m3 = sc.nextInt();
        System.out.print("Enter Marks in Subject 4: ");
        this.m4 = sc.nextInt();
        System.out.print("Enter Marks in Subject 5: ");
        this.m5 = sc.nextInt();
    }
    
    // Method to calculate total
    public void calculateTotal() {
        this.total = this.m1 + this.m2 + this.m3 + this.m4 + this.m5;
    }
    
    // Method to calculate result
    public void calculateResult() {
        if (this.m1 >= 35 && this.m2 >= 35 && this.m3 >= 35 && this.m4 >= 35 && this.m5 >= 35) {
            this.result = "Pass";
        } else {
            this.result = "Fail";
        }
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Student Result ===");
        System.out.println("Roll Number: " + this.rollno);
        System.out.println("Student Name: " + this.name);
        System.out.println("Marks in Subject 1: " + this.m1);
        System.out.println("Marks in Subject 2: " + this.m2);
        System.out.println("Marks in Subject 3: " + this.m3);
        System.out.println("Marks in Subject 4: " + this.m4);
        System.out.println("Marks in Subject 5: " + this.m5);
        System.out.println("Total Marks: " + this.total);
        System.out.println("Result: " + this.result);
    }
}

public class StudentResultDemo {
    public static void main(String[] args) {
        StudentResult student = new StudentResult();
        student.acceptData();
        student.calculateTotal();
        student.calculateResult();
        student.printData();
    }
}`,
    },
    {
      question: 'Draw a class diagram & develop a Java program to create a class Fan with the private attributes manufacturer, no. of wings, colour, MRP, remote supported. Class should facilitate to accept the data & print the data. If fan supports remote add 10% to the MRP before printing.',
      solution: 'Create a Fan class with private attributes: manufacturer (String), noOfWings (int), colour (String), MRP (double), remoteSupported (boolean). Implement acceptData() to read input, and printData() to display all information. If remoteSupported is true, add 10% to MRP before printing.',
      solutionCode: `import java.util.Scanner;

class Fan {
    private String manufacturer;
    private int noOfWings;
    private String colour;
    private double MRP;
    private boolean remoteSupported;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Manufacturer: ");
        this.manufacturer = sc.nextLine();
        System.out.print("Enter Number of Wings: ");
        this.noOfWings = sc.nextInt();
        sc.nextLine(); // consume newline
        System.out.print("Enter Colour: ");
        this.colour = sc.nextLine();
        System.out.print("Enter MRP: ");
        this.MRP = sc.nextDouble();
        System.out.print("Remote Supported (true/false): ");
        this.remoteSupported = sc.nextBoolean();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Fan Details ===");
        System.out.println("Manufacturer: " + this.manufacturer);
        System.out.println("Number of Wings: " + this.noOfWings);
        System.out.println("Colour: " + this.colour);
        
        double finalMRP = this.MRP;
        if (this.remoteSupported) {
            finalMRP = this.MRP + (this.MRP * 0.10); // Add 10% if remote supported
        }
        
        System.out.println("MRP: ₹" + this.MRP);
        if (this.remoteSupported) {
            System.out.println("Final MRP (with 10% remote charge): ₹" + finalMRP);
        } else {
            System.out.println("Final MRP: ₹" + finalMRP);
        }
        System.out.println("Remote Supported: " + this.remoteSupported);
    }
}

public class FanDemo {
    public static void main(String[] args) {
        Fan fan = new Fan();
        fan.acceptData();
        fan.printData();
    }
}`,
    },
    {
      question: 'Draw a class diagram & develop a Java program to create a class Cuboid with the private attributes length, breadth, height, Volume, T.S [Total Surface Area]. Class should facilitate the methods calculate, accept data, & display the data to the user. Create another class Example to test the functionality of Cuboid class.',
      solution: 'Create a Cuboid class with private attributes: length (double), breadth (double), height (double), Volume (double), TSA (double). Implement acceptData() to read input, calculate() to compute Volume = length * breadth * height and TSA = 2 * (length*breadth + breadth*height + height*length), and printData() to display all information.',
      solutionCode: `import java.util.Scanner;

class Cuboid {
    private double length;
    private double breadth;
    private double height;
    private double Volume;
    private double TSA;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Length: ");
        this.length = sc.nextDouble();
        System.out.print("Enter Breadth: ");
        this.breadth = sc.nextDouble();
        System.out.print("Enter Height: ");
        this.height = sc.nextDouble();
    }
    
    // Method to calculate volume and TSA
    public void calculate() {
        this.Volume = this.length * this.breadth * this.height;
        this.TSA = 2 * (this.length * this.breadth + this.breadth * this.height + this.height * this.length);
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Cuboid Details ===");
        System.out.println("Length: " + this.length);
        System.out.println("Breadth: " + this.breadth);
        System.out.println("Height: " + this.height);
        System.out.println("Volume: " + this.Volume);
        System.out.println("Total Surface Area (T.S.A): " + this.TSA);
    }
}

public class Example {
    public static void main(String[] args) {
        Cuboid cuboid = new Cuboid();
        cuboid.acceptData();
        cuboid.calculate();
        cuboid.printData();
    }
}`,
    },
    {
      question: 'Draw a class diagram & develop a Java program to create a class Cone with private attributes radius, height, & slant height, V [Volume], T.S.A [Total Surface Area], L.S.A [Lateral Surface Area]. Class should facilitate the methods to accept the data and print to the user. Test the class in another class Example.',
      solution: 'Create a Cone class with private attributes: radius (double), height (double), slantHeight (double), Volume (double), TSA (double), LSA (double). Implement acceptData() to read input, calculate() to compute Volume = (1/3) * π * r² * h, LSA = π * r * l, TSA = π * r * (r + l), and printData() to display all information.',
      solutionCode: `import java.util.Scanner;

class Cone {
    private double radius;
    private double height;
    private double slantHeight;
    private double Volume;
    private double TSA;
    private double LSA;
    
    // Method to accept data
    public void acceptData() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Radius: ");
        this.radius = sc.nextDouble();
        System.out.print("Enter Height: ");
        this.height = sc.nextDouble();
        System.out.print("Enter Slant Height: ");
        this.slantHeight = sc.nextDouble();
    }
    
    // Method to calculate volume, LSA and TSA
    public void calculate() {
        double pi = 3.14159;
        this.Volume = (1.0 / 3.0) * pi * this.radius * this.radius * this.height;
        this.LSA = pi * this.radius * this.slantHeight;
        this.TSA = pi * this.radius * (this.radius + this.slantHeight);
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Cone Details ===");
        System.out.println("Radius: " + this.radius);
        System.out.println("Height: " + this.height);
        System.out.println("Slant Height: " + this.slantHeight);
        System.out.println("Volume (V): " + String.format("%.2f", this.Volume));
        System.out.println("Lateral Surface Area (L.S.A): " + String.format("%.2f", this.LSA));
        System.out.println("Total Surface Area (T.S.A): " + String.format("%.2f", this.TSA));
    }
}

public class Example {
    public static void main(String[] args) {
        Cone cone = new Cone();
        cone.acceptData();
        cone.calculate();
        cone.printData();
    }
}`,
    },
  ] as PracticeQuestion[],
}

export default function EncapsulationPage() {
  return <TopicPage content={content} />
}
