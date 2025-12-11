'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { FiPackage, FiLock, FiAlertTriangle, FiRefreshCcw } from 'react-icons/fi'

const content = {
    title: 'Serialization',
    explanationSections: [
        {
            title: 'Introduction: Freeze Drying Objects',
            icon: <FiPackage className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Serialization</span> is the process of converting an Object into a Byte Stream.
                        Think of it as <span className="text-cyan-400 font-bold">Freeze Drying Food</span>.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">The Object (Fresh Apple):</span> Lives in memory (RAM). It spoils if the power goes out (Program ends).
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Serialization (Freeze Drying):</span> Converts the Apple into Powder (Byte Stream). You can now save it to a file or send it over a network.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Deserialization (Rehydration):</span> Add water to the powder to get the Apple back!
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Key Concepts',
            icon: <FiLock className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-green-400 font-mono mb-2">implements Serializable</h5>
                            <p className="text-xs text-gray-400 mb-2">A <b>Marker Interface</b>. It has NO methods. It serves as a &quot;permission stamp&quot; telling Java &quot;This object is safe to freeze-dry&quot;.</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-red-400 font-mono mb-2">transient</h5>
                            <p className="text-xs text-gray-400 mb-2">Keyword to skip fields. Use for passwords or temporary variables. Upon deserialization, they get default values (null/0/false).</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800 col-span-2">
                            <h5 className="text-purple-400 font-mono mb-2">serialVersionUID</h5>
                            <p className="text-xs text-gray-400 mb-2">A unique ID for version control. If you serialize a class, then change the class code, then try to deserialize, Java yells <code>InvalidClassException</code> unless the ID matches.</p>
                        </div>
                    </div>
                </div>
            ),
            code: `import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L; // Best Practice
    String name;
    transient String password; // Will NOT be saved

    User(String n, String p) { name = n; password = p; }
}

public class Main {
    public static void main(String[] args) throws Exception {
        User u = new User("Alice", "secret123");
        
        // Serialize
        ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("user.ser"));
        out.writeObject(u);
        out.close();
        System.out.println("User saved.");
        
        // Deserialize
        ObjectInputStream in = new ObjectInputStream(new FileInputStream("user.ser"));
        User loadedUser = (User) in.readObject();
        
        System.out.println("Loaded Name: " + loadedUser.name); 
        System.out.println("Loaded Password: " + loadedUser.password); 
    }
}
// Output:
// User saved.
// Loaded Name: Alice
// Loaded Password: null`
        },
        {
            title: 'Common Pitfalls',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: '<p className="text-gray-300"><b>NotSerializableException:</b> Happens if you try to serialize an object that doesn&apos;t implement Serializable. ALSO happens if a Serializable object contains a field (like another object) that is NOT Serializable.</p>',
            code: `class Engine { } // Not Serializable!
class Car implements Serializable {
    Engine engine = new Engine(); // This causes crash!
}

// Fix: Make Engine implement Serializable OR mark it transient.
// class Car implements Serializable {
//    transient Engine engine; 
// }`
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Saving Game State',
            solution: 'Save player progress to a file.',
            steps: [
                {
                    step: '1. Create Player Class',
                    explanation: 'Implement `Serializable`. Store level and score.'
                },
                {
                    step: '2. Save (Serialize)',
                    explanation: 'Write object to `savegame.dat`.'
                },
                {
                    step: '3. Load (Deserialize)',
                    explanation: 'Read object when game starts.'
                }
            ],
            code: `import java.io.*;

class Player implements Serializable {
    private static final long serialVersionUID = 100L;
    int level = 1;
    int score = 0;
    
    @Override
    public String toString() { return "Lvl " + level + " | Score " + score; }
}

public class GameSave {
    public static void main(String[] args) throws Exception {
        Player p = new Player();
        p.level = 5;
        p.score = 5000;
        
        // Save
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("save.dat"));
        oos.writeObject(p);
        oos.close();
        
        // Load
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("save.dat"));
        Player loaded = (Player) ois.readObject();
        
        System.out.println("Restored: " + loaded);
    }
}
// Output:
// Restored: Lvl 5 | Score 5000`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'What happens if a parent class is NOT Serializable but child class IS?',
            solution: 'You can still serialize the Child. However, fields inherited from the Parent will NOT be serialized (ignored). When you deserialize, the Parent\'s no-argument constructor is called to initialize those fields to their default values.',
            solutionCode: `class Parent { int x = 10; } // Not Serializable
class Child extends Parent implements Serializable { int y = 20; }
// x will effectively be reset during deserialize logic.`
        },
        {
            question: 'Does Static data get serialized?',
            solution: 'No! Static variables belong to the Class, not the Object. Serialization saves the state of an Object instance. Current value of static variable is ignored.',
            solutionCode: `static int count = 5; // Not saved in object stream`
        }
    ] as PracticeQuestion[]
}

export default function SerializationPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
