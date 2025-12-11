'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiMap, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Domain System Modeling',
  explanationSections: [
    {
      title: 'System Modeling',
      icon: <FiMap className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Domain Modeling</span> represents real-world entities and relationships.

Process:
→ <span class="text-cyan-300">Identify entities:</span> Find main objects
→ <span class="text-cyan-300">Define relationships:</span> How entities relate
→ <span class="text-cyan-300">Create classes:</span> Map entities to classes
→ <span class="text-cyan-300">Add attributes:</span> Properties of entities
→ <span class="text-cyan-300">Add methods:</span> Behaviors of entities

Example Domain: Library System
→ <span class="text-amber-300">Entities:</span> Book, Member, Loan
→ <span class="text-amber-300">Relationships:</span> Member borrows Book`,
      code: `// Library System Domain Model
class Book {
    private String isbn;
    private String title;
    private String author;
    
    public Book(String isbn, String title, String author) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
    }
    
    public String getTitle() { return title; }
}

class Member {
    private String memberId;
    private String name;
    
    public Member(String id, String name) {
        this.memberId = id;
        this.name = name;
    }
}

class Loan {
    private Book book;
    private Member member;
    private String loanDate;
    
    public Loan(Book book, Member member, String date) {
        this.book = book;
        this.member = member;
        this.loanDate = date;
    }
}

public class DomainModeling {
    public static void main(String[] args) {
        Book book = new Book("123", "Java Guide", "Author");
        Member member = new Member("M1", "Alice");
        Loan loan = new Loan(book, member, "2024-01-01");
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Model a Student Management System with Student, Course, and Enrollment entities.',
      solution: 'Create classes for each entity with appropriate attributes and relationships.',
      solutionCode: `class Student {
    private String studentId;
    private String name;
    
    public Student(String id, String name) {
        this.studentId = id;
        this.name = name;
    }
}

class Course {
    private String courseId;
    private String courseName;
    
    public Course(String id, String name) {
        this.courseId = id;
        this.courseName = name;
    }
}

class Enrollment {
    private Student student;
    private Course course;
    
    public Enrollment(Student s, Course c) {
        this.student = s;
        this.course = c;
    }
}

public class StudentSystem {
    public static void main(String[] args) {
        Student s = new Student("S1", "Alice");
        Course c = new Course("C1", "Java");
        Enrollment e = new Enrollment(s, c);
    }
}`,
    },
  ],
}

export default function DomainSystemModelingPage() {
  return <TopicPage content={content} />
}

