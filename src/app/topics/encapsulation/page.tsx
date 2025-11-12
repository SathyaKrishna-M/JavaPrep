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
        return name;
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
        return name;  // Can access private variable within class
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
→ <span class="text-amber-300">Example:</span> <span class="text-cyan-300">public String getName() { return name; }</span>

Setter Methods:
→ Set the value of <span class="text-cyan-300">private variable</span>
→ <span class="text-cyan-300">Naming:</span> <span class="text-blue-400">setVariableName()</span>
→ <span class="text-amber-300">Can include validation logic</span>
→ <span class="text-amber-300">Example:</span> <span class="text-cyan-300">public void setName(String n) { name = n; }</span>`,
      code: `public class GetterSetter {
    private String name;
    private int age;
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
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
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public double getGpa() {
        return gpa;
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
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
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
        Regno = sc.nextLine();
        
        System.out.print("Enter Owner Name: ");
        OwnerName = sc.nextLine();
        
        System.out.print("Enter Model (Year): ");
        Model = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Fuel Used: ");
        FuelUsed = sc.nextLine();
        
        System.out.print("Enter Engine Number: ");
        EngineNumber = sc.nextLine();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Car Details ===");
        System.out.println("Registration Number: " + Regno);
        System.out.println("Owner Name: " + OwnerName);
        System.out.println("Model (Year): " + Model);
        System.out.println("Fuel Used: " + FuelUsed);
        System.out.println("Engine Number: " + EngineNumber);
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
        CName = sc.nextLine();
        
        System.out.print("Enter Capital City: ");
        CapitalCity = sc.nextLine();
        
        System.out.print("Enter Area (sq km): ");
        Area = sc.nextDouble();
        
        System.out.print("Enter Population: ");
        Population = sc.nextLong();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Currency: ");
        Currency = sc.nextLine();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Country Details ===");
        System.out.println("Country Name: " + CName);
        System.out.println("Capital City: " + CapitalCity);
        System.out.println("Area: " + Area + " sq km");
        System.out.println("Population: " + Population);
        System.out.println("Currency: " + Currency);
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
        PName = sc.nextLine();
        
        System.out.print("Enter Matches Played: ");
        MatchesPlayed = sc.nextInt();
        
        System.out.print("Enter Balls Faced: ");
        Balls_Faced = sc.nextInt();
        
        System.out.print("Enter Runs Scored: ");
        Runs_Scored = sc.nextInt();
    }
    
    // Method to calculate strike rate
    public void calculateStrikeRate() {
        if (Balls_Faced > 0) {
            Strike_Rate = (Runs_Scored * 100.0) / Balls_Faced;
        } else {
            Strike_Rate = 0.0;
        }
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Player Details ===");
        System.out.println("Player Name: " + PName);
        System.out.println("Matches Played: " + MatchesPlayed);
        System.out.println("Balls Faced: " + Balls_Faced);
        System.out.println("Runs Scored: " + Runs_Scored);
        System.out.println("Strike Rate: " + String.format("%.2f", Strike_Rate));
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
        MName = sc.nextLine();
        
        System.out.print("Enter Hero Name: ");
        Hero = sc.nextLine();
        
        System.out.print("Enter Heroine Name: ");
        Heroien = sc.nextLine();
        
        System.out.print("Enter Year of Release: ");
        YOR = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Director Name: ");
        Director = sc.nextLine();
        
        System.out.print("Enter Producer Name: ");
        Producer = sc.nextLine();
        
        System.out.print("Enter Movie Type (Action/Comedy/Horror/etc): ");
        MType = sc.nextLine();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Movie Details ===");
        System.out.println("Movie Name: " + MName);
        System.out.println("Hero: " + Hero);
        System.out.println("Heroine: " + Heroien);
        System.out.println("Year of Release: " + YOR);
        System.out.println("Director: " + Director);
        System.out.println("Producer: " + Producer);
        System.out.println("Movie Type: " + MType);
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
        Id = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Doctor Name: ");
        Name = sc.nextLine();
        
        System.out.print("Enter Specialisation: ");
        Specialisation = sc.nextLine();
        
        System.out.print("Enter Consultation Fee: ");
        ConsultationFee = sc.nextDouble();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Doctor Details ===");
        System.out.println("Doctor ID: " + Id);
        System.out.println("Name: " + Name);
        System.out.println("Specialisation: " + Specialisation);
        System.out.println("Consultation Fee: ₹" + ConsultationFee);
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
        Id = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Item Name: ");
        Name = sc.nextLine();
        
        System.out.print("Enter Price: ");
        Price = sc.nextDouble();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Availability (In Stock/Out of Stock): ");
        Availability = sc.nextLine();
    }
    
    // Method to print data
    public void printData() {
        System.out.println("\\n=== Item Details ===");
        System.out.println("Item ID: " + Id);
        System.out.println("Item Name: " + Name);
        System.out.println("Price: ₹" + Price);
        System.out.println("Availability: " + Availability);
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
        Bill_Num = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Customer Name: ");
        Customer_Name = sc.nextLine();
        
        System.out.print("Enter Bill Amount: ");
        Bill_Amount = sc.nextDouble();
        
        System.out.print("Enter Discount Percent: ");
        DiscountPercent = sc.nextDouble();
        
        System.out.print("Enter GST %: ");
        GST = sc.nextDouble();
    }
    
    // Method to calculate discount, GST and net bill
    public void calculateBill() {
        DiscountAmount = (Bill_Amount * DiscountPercent) / 100.0;
        double amountAfterDiscount = Bill_Amount - DiscountAmount;
        GSTAmount = (amountAfterDiscount * GST) / 100.0;
        NetBill = amountAfterDiscount + GSTAmount;
    }
    
    // Method to display all details
    public void displayData() {
        System.out.println("\\n=== Bill Details ===");
        System.out.println("Bill Number: " + Bill_Num);
        System.out.println("Customer Name: " + Customer_Name);
        System.out.println("Bill Amount: ₹" + String.format("%.2f", Bill_Amount));
        System.out.println("Discount Percent: " + DiscountPercent + "%");
        System.out.println("Discount Amount: ₹" + String.format("%.2f", DiscountAmount));
        System.out.println("GST %: " + GST + "%");
        System.out.println("GST Amount: ₹" + String.format("%.2f", GSTAmount));
        System.out.println("Net Bill to Pay: ₹" + String.format("%.2f", NetBill));
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
        EmpId = sc.nextInt();
        sc.nextLine(); // consume newline
        
        System.out.print("Enter Employee Name: ");
        Name = sc.nextLine();
        
        System.out.print("Enter Basic Salary: ");
        Basic = sc.nextDouble();
    }
    
    // Method to calculate DA, HRA and Gross
    public void calculateSalary() {
        Da = (Basic * 30) / 100.0;  // DA is 30% of Basic
        HRA = (Basic * 20) / 100.0;  // HRA is 20% of Basic
        Gross = Basic + Da + HRA;    // Gross = Basic + DA + HRA
    }
    
    // Method to print all details
    public void printData() {
        System.out.println("\\n=== Employee Salary Details ===");
        System.out.println("Employee ID: " + EmpId);
        System.out.println("Employee Name: " + Name);
        System.out.println("Basic Salary: ₹" + String.format("%.2f", Basic));
        System.out.println("DA (30% of Basic): ₹" + String.format("%.2f", Da));
        System.out.println("HRA (20% of Basic): ₹" + String.format("%.2f", HRA));
        System.out.println("Gross Salary: ₹" + String.format("%.2f", Gross));
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
        return name;
    }
    
    public int getMarks() {
        return marks;
    }
    
    // Setter methods
    public void setName(String n) {
        name = n;
    }
    
    public void setMarks(int m) {
        marks = m;
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
  ] as PracticeQuestion[],
}

export default function EncapsulationPage() {
  return <TopicPage content={content} />
}
