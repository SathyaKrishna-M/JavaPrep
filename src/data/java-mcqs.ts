import { Question } from '@/components/QuizComponent'

export const javaMcqs: { [key: string]: Question[] } = {
    co1: [
        {
            id: 1,
            question: 'Who developed Java?',
            options: ['James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup', 'Guido van Rossum'],
            correctIndex: 0,
            explanation: 'Java was developed by James Gosling at Sun Microsystems in 1995.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 2,
            question: 'Which of the following is NOT a feature of Java?',
            options: ['Object-Oriented', 'Portable', 'Platform Dependent', 'Robust'],
            correctIndex: 2,
            explanation: 'Java is Platform Independent because of the Bytecode and JVM mechanics ("Write Once, Run Anywhere").',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 3,
            question: 'What is the extension of a compiled Java byte code file?',
            options: ['.java', '.class', '.jvm', '.txt'],
            correctIndex: 1,
            explanation: 'The Java compiler (javac) converts .java source files into .class files (bytecode).',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 4,
            question: 'Which component is responsible for running the Java program?',
            options: ['JDK', 'JRE', 'JVM', 'JIT'],
            correctIndex: 2,
            explanation: 'JVM (Java Virtual Machine) is the engine that actually runs the bytecode.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 5,
            question: 'What is the size of int data type in Java?',
            options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on OS'],
            correctIndex: 1,
            explanation: 'In Java, int is always 4 bytes (32 bits), regardless of the underlying operating system.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 6,
            question: 'Which of these is not a primitive data type in Java?',
            options: ['int', 'float', 'boolean', 'String'],
            correctIndex: 3,
            explanation: 'String is a Class (Reference Type) in Java, not a primitive data type.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 7,
            question: 'What is the default value of a boolean variable in Java?',
            options: ['true', 'false', '0', 'null'],
            correctIndex: 1,
            explanation: 'The default value for a boolean instance variable is false.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 8,
            question: 'Which operator is used to create an object in Java?',
            options: ['class', 'new', 'allocate', 'create'],
            correctIndex: 1,
            explanation: 'The "new" keywords is used to instantiate a class (create an object).',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 9,
            question: 'Which statement is used to exit a loop immediately?',
            options: ['continue', 'return', 'break', 'exit'],
            correctIndex: 2,
            explanation: '"break" statement terminates the loop immediately and control moves to the next statement after the loop.',
            relatedTopic: '/subjects/java/topics/loops'
        },
        {
            id: 10,
            question: 'What is the output of: 10 % 3?',
            options: ['3', '1', '10', '0'],
            correctIndex: 1,
            explanation: 'Module operator (%) returns the remainder. 10 divided by 3 is 3 with a remainder of 1.',
            relatedTopic: '/subjects/java/topics/operators'
        },
        {
            id: 11,
            question: 'Which of the following is a valid variable declaration?',
            options: ['int 1value = 10;', 'int value#1 = 10;', 'int _value = 10;', 'int class = 10;'],
            correctIndex: 2,
            explanation: 'Variables cannot start with a digit, cannot contain special chars (except _ and $), and "class" is a keyword. "_value" is valid.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 12,
            question: 'Which keyword is used to define a constant variable in Java?',
            options: ['const', 'final', 'static', 'immutable'],
            correctIndex: 1,
            explanation: 'The "final" keyword makes a variable constant; its value cannot be changed once assigned.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 13,
            question: 'What is the result of 5 >> 1?',
            options: ['10', '2', '5', '3'],
            correctIndex: 1,
            explanation: 'Right shift (>>) essentially divides by 2. 5 (0101) becomes 2 (0010).',
            relatedTopic: '/subjects/java/topics/operators'
        },
        {
            id: 14,
            question: 'Which mechanism tracks the active objects and reclaims memory?',
            options: ['Stack Management', 'Garbage Collection', 'Heap Allocation', 'Pointer Arithmetic'],
            correctIndex: 1,
            explanation: 'Java has automatic Garbage Collection (GC) which deallocates memory of unused objects.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 15,
            question: 'What does public static void main(String args[]) mean?',
            options: ['Entry point of program', 'Exit point of program', 'Constructor', 'Garbage Collector'],
            correctIndex: 0,
            explanation: 'The main method is the entry point from where the JVM begins the execution of a Java program.',
            relatedTopic: '/subjects/java/topics/problem-solving-methodology'
        },
        {
            id: 16,
            question: 'Which loop is guaranteed to execute at least once?',
            options: ['for loop', 'while loop', 'do-while loop', 'none'],
            correctIndex: 2,
            explanation: 'The do-while loop is an exit-controlled loop, so the body executes once before the condition is checked.',
            relatedTopic: '/subjects/java/topics/loops'
        },
        {
            id: 17,
            question: 'Which of these is a valid comment in Java?',
            options: ['/* comment */', '// comment', '/** documentation */', 'All of the above'],
            correctIndex: 3,
            explanation: 'Java supports single-line (//), multi-line (/* */), and documentation (/** */) comments.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 18,
            question: 'What is the range of byte data type?',
            options: ['-128 to 127', '-32768 to 32767', '-2147483648 to 2147483647', '0 to 255'],
            correctIndex: 0,
            explanation: 'A byte is 8 bits signed. Range is -2^7 to 2^7 - 1, which is -128 to 127.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 19,
            question: 'Which selection statement allows testing a variable against a list of values?',
            options: ['if-else', 'switch', 'for', 'while'],
            correctIndex: 1,
            explanation: 'The "switch" statement allows a variable to be tested for equality against a list of values (cases).',
            relatedTopic: '/subjects/java/topics/conditionals'
        },
        {
            id: 20,
            question: 'What happens if you try to use a variable without initializing it inside a method?',
            options: ['It takes default value', 'Compiler Error', 'Runtime Error', 'Garbage Value'],
            correctIndex: 1,
            explanation: 'Local variables in Java are NOT initialized by default. Using them without initialization causes a compile-time error.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 21,
            question: 'What is the default value of char variable?',
            options: ["'\\u0000'", '0', 'null', 'not defined'],
            correctIndex: 0,
            explanation: "The default value of a char is the null character '\\u0000' (numeric value 0).",
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 22,
            question: 'In which memory are Objects stored in Java?',
            options: ['Stack', 'Heap', 'Register', 'ROM'],
            correctIndex: 1,
            explanation: 'Objects in Java are always stored in the Heap memory. References to them may be in the Stack.',
            relatedTopic: '/subjects/java/topics/arrays-memory-model'
        },
        {
            id: 23,
            question: 'Which command compiles a Java program?',
            options: ['java', 'javac', 'javadoc', 'jar'],
            correctIndex: 1,
            explanation: '"javac" is the Java Compiler command.',
            relatedTopic: '/subjects/java/topics/intro'
        },
        {
            id: 24,
            question: 'Identify the correct ternary operator syntax.',
            options: ['condition ? true : false', 'condition : true ? false', 'condition ? true ? false', 'condition : true : false'],
            correctIndex: 0,
            explanation: 'The ternary operator format is: condition ? value_if_true : value_if_false',
            relatedTopic: '/subjects/java/topics/operators'
        },
        {
            id: 25,
            question: 'Which of the following creates a widening conversion?',
            options: ['int to byte', 'double to float', 'int to long', 'short to char'],
            correctIndex: 2,
            explanation: 'Converting a smaller type (int, 4 bytes) to a larger type (long, 8 bytes) is widening and is done automatically.',
            relatedTopic: '/subjects/java/topics/type-casting'
        },
        {
            id: 26,
            question: 'Which operator has the highest precedence?',
            options: ['*', '+', '()', '='],
            correctIndex: 2,
            explanation: 'Parentheses "()" have the highest precedence in Java expressions.',
            relatedTopic: '/subjects/java/topics/operators'
        },
        {
            id: 27,
            question: 'What is the output of: 3 + 4 + "7"?',
            options: ['347', '77', '14', 'Error'],
            correctIndex: 1,
            explanation: 'Left-to-right: 3+4=7. Then 7+"7" = "77".',
            relatedTopic: '/subjects/java/topics/operators'
        },
        {
            id: 28,
            question: 'Which Scanner method reads a single word?',
            options: ['next()', 'nextLine()', 'read()', 'nextString()'],
            correctIndex: 0,
            explanation: 'next() reads input until the first whitespace (single word). nextLine() reads the whole line.',
            relatedTopic: '/subjects/java/topics/input-output'
        },
        {
            id: 29,
            question: 'How many times will: for(int i=0; i<5; i++) execute?',
            options: ['4', '5', '6', 'Infinite'],
            correctIndex: 1,
            explanation: 'It executes for i = 0, 1, 2, 3, 4. Total 5 times.',
            relatedTopic: '/subjects/java/topics/loops'
        },
        {
            id: 30,
            question: 'Which statement skips the current iteration of a loop?',
            options: ['break', 'continue', 'skip', 'next'],
            correctIndex: 1,
            explanation: '"continue" skips the rest of the current loop iteration and jumps to the next iteration.',
            relatedTopic: '/subjects/java/topics/loops'
        },
        {
            id: 26,
            question: 'What will be the output of following code?',
            codeSnippet: 'int x = 5;\nSystem.out.println(x++ + ++x);',
            options: ['11', '12', '10', 'Compilation Error'],
            correctIndex: 1,
            explanation: 'x++ uses 5 (then x becomes 6). ++x increments 6 to 7 and uses 7. 5 + 7 = 12.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 27,
            question: 'Identify the error in this code:',
            codeSnippet: 'byte b = 50;\nb = b * 2;',
            options: ['No error', 'Type mismatch: cannot convert from int to byte', 'Variable b not initialized', 'Syntax error'],
            correctIndex: 1,
            explanation: 'In Java, arithmetic on bytes promotes them to int. The result of b * 2 is an int, which cannot be assigned to byte without casting.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        },
        {
            id: 28,
            question: 'What is the output?',
            codeSnippet: 'String s = "Java";\ns.concat(" SE 8");\nSystem.out.println(s);',
            options: ['Java SE 8', 'Java', 'SE 8', 'Null'],
            correctIndex: 1,
            explanation: 'String objects are immutable. The concat method returns a new String, but the original reference "s" is unchanged.',
            relatedTopic: '/subjects/java/topics/variables-data-types'
        }
    ],
    co2: [
        {
            id: 201,
            question: 'Which is the correct way to declare an array in Java?',
            options: ['int arr[];', 'int[] arr;', 'Both A and B', 'array int arr;'],
            correctIndex: 2,
            explanation: 'Both "int arr[]" and "int[] arr" are valid syntax in Java, though "int[] arr" is preferred.',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 202,
            question: 'What is the default value of elements in an int array?',
            options: ['0', 'null', '-1', 'Garbage value'],
            correctIndex: 0,
            explanation: 'Elements of an int array are initialized to 0 by default.',
            relatedTopic: '/subjects/java/topics/arrays-memory-model'
        },
        {
            id: 203,
            question: 'How do you find the number of elements in an array named "arr"?',
            options: ['arr.length()', 'arr.size()', 'arr.length', 'arr.count'],
            correctIndex: 2,
            explanation: 'Arrays have a built-in property "length" (not a method) to get the size.',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 204,
            question: 'What is the index of the first element in a Java array?',
            options: ['1', '0', '-1', 'Undefined'],
            correctIndex: 1,
            explanation: 'Java arrays are 0-indexed, meaning the first element is at index 0.',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 205,
            question: 'Which exception is thrown when accessing an invalid array index?',
            options: ['ArraySizeOutOfBoundsException', 'ArrayIndexOutOfBoundsException', 'NullPointerException', 'InvalidIndexException'],
            correctIndex: 1,
            explanation: 'Accessing an index outside the valid range (0 to length-1) throws ArrayIndexOutOfBoundsException.',
            relatedTopic: '/subjects/java/topics/arrays-memory-model'
        },
        {
            id: 206,
            question: 'Can we change the size of an array after creation?',
            options: ['Yes', 'No', 'Only if it is static', 'Only using resize()'],
            correctIndex: 1,
            explanation: 'No, arrays in Java are fixed-size data structures. Once created, their size cannot be changed.',
            relatedTopic: '/subjects/java/topics/arrays-memory-model'
        },
        {
            id: 207,
            question: 'How to initialize an array of 5 integers?',
            options: ['int[] a = new int[5];', 'int[] a = {1,2,3,4,5};', 'Both A and B', 'int a = new int(5);'],
            correctIndex: 2,
            explanation: 'Both creating with "new int[5]" (default values) and array initializer "{...}" are valid.',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 208,
            question: 'What is the output of: int[] a = {10, 20}; System.out.println(a[2]);?',
            options: ['0', '20', 'null', 'Runtime Exception'],
            correctIndex: 3,
            explanation: 'The valid indices are 0 and 1. Accessing index 2 throws ArrayIndexOutOfBoundsException.',
            relatedTopic: '/subjects/java/topics/arrays-memory-model'
        },
        {
            id: 209,
            question: 'Which loop is known as the "for-each" loop for iterating arrays?',
            options: ['Enhanced for loop', 'Simple for loop', 'do-while loop', 'while loop'],
            correctIndex: 0,
            explanation: 'The Enhanced for loop (for(Type var : array)) is designed for iterating through collections and arrays.',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 210,
            question: 'In a 2D array "int[][] arr = new int[3][4]", what does arr.length refer to?',
            options: ['Total elements (12)', 'Number of columns (4)', 'Number of rows (3)', 'Size of integer'],
            correctIndex: 2,
            explanation: 'In a 2D array (array of arrays), length refers to the number of rows (arrays held by the main array).',
            relatedTopic: '/subjects/java/topics/arrays2d'
        },
        {
            id: 211,
            question: 'Is "int[] a = new int[-5];" valid?',
            options: ['Yes', 'No, Compile Error', 'No, Runtime Exception', 'Creates empty array'],
            correctIndex: 2,
            explanation: 'It compiles, but throws "NegativeArraySizeException" at runtime.',
            relatedTopic: '/subjects/java/topics/arrays-memory-model'
        },
        {
            id: 212,
            question: 'Which class contains utility methods like sort() and binarySearch() for arrays?',
            options: ['java.util.Array', 'java.util.Arrays', 'java.lang.System', 'java.io.File'],
            correctIndex: 1,
            explanation: 'The "java.util.Arrays" class provides static methods to manipulate arrays.',
            relatedTopic: '/subjects/java/topics/searching-algorithms'
        },
        {
            id: 213,
            question: 'What are jagged arrays?',
            options: ['Arrays with negative size', 'Arrays with different numbers of columns in each row', '3D Arrays', 'Read-only arrays'],
            correctIndex: 1,
            explanation: 'A jagged array is a multidimensional array where member arrays are of different sizes.',
            relatedTopic: '/subjects/java/topics/arrays2d'
        },
        {
            id: 214,
            question: 'What is stored in the array variable (e.g., int[] arr)?',
            options: ['The values of elements', 'The reference (address) to the array object', 'The size of array', 'The first element'],
            correctIndex: 1,
            explanation: 'Array variables are reference variables; they hold the address of the array object in the Heap.',
            relatedTopic: '/subjects/java/topics/arrays-memory-model'
        },
        {
            id: 215,
            question: 'Can you store different types of elements in a single int array?',
            options: ['Yes', 'No', 'Yes, if casted', 'Yes, using Object'],
            correctIndex: 1,
            explanation: 'Arrays are homogeneous; an int array can ONLY store integers (or types promotable to int).',
            relatedTopic: '/subjects/java/topics/arrays-memory-model'
        },
        {
            id: 216,
            question: 'What is the result of System.out.println(new int[]{1, 2});?',
            options: ['1 2', '[1, 2]', 'Hashcode string', 'Compilation Error'],
            correctIndex: 2,
            explanation: 'Arrays do not override toString(). Printing the object directly prints [I@hashcode.',
            relatedTopic: '/subjects/java/topics/arrays-memory-model'
        },
        {
            id: 217,
            question: 'How do you copy one array to another?',
            options: ['System.arraycopy()', 'Arrays.copyOf()', 'clone() method', 'All of the above'],
            correctIndex: 3,
            explanation: 'All listed methods can be used to copy arrays.',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 218,
            question: 'Which memory formatting is used for 2D arrays in Java?',
            options: ['Row-major order', 'Column-major order', 'Array of Arrays', 'Contiguous block'],
            correctIndex: 2,
            explanation: 'Java creates arrays of arrays. It does not strictly enforce a contiguous memory block like C/C++ row-major order.',
            relatedTopic: '/subjects/java/topics/arrays2d'
        },
        {
            id: 219,
            question: 'What is an anonymous array?',
            options: ['Array without a name', 'Array with no size', 'Array with null values', 'Hidden array'],
            correctIndex: 0,
            explanation: 'An array created instantly without assigning it to a variable, e.g., new int[]{1,2,3}.',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 220,
            question: 'Command line arguments are passed to main() as an array of?',
            options: ['int', 'Object', 'String', 'char'],
            correctIndex: 2,
            explanation: 'The main method signature is "main(String[] args)", receiving arguments as Strings.',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 221,
            question: 'What is the Time Complexity of Binary Search?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
            correctIndex: 1,
            explanation: 'Binary Search halves the search space in every step, resulting in O(log n) complexity.',
            relatedTopic: '/subjects/java/topics/searching-algorithms'
        },
        {
            id: 222,
            question: 'Binary Search requires the array to be?',
            options: ['Sorted', 'Unsorted', 'Only Integers', 'Very large'],
            correctIndex: 0,
            explanation: 'Binary Search only works on sorted arrays correctly.',
            relatedTopic: '/subjects/java/topics/searching-algorithms'
        },
        {
            id: 223,
            question: 'Which sorting algorithm is the simplest but least efficient O(n^2)?',
            options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Heap Sort'],
            correctIndex: 2,
            explanation: 'Bubble Sort is conceptually simple but performs poorly on large datasets with O(n^2) complexity.',
            relatedTopic: '/subjects/java/topics/sorting-algorithms'
        },
        {
            id: 224,
            question: 'What is the sum of an array prefix from index 0 to k called?',
            options: ['Suffix Sum', 'Prefix Sum', 'Total Sum', 'Running Total'],
            correctIndex: 1,
            explanation: 'A Prefix Sum array stores the sum of elements from the start up to the current index.',
            relatedTopic: '/subjects/java/topics/prefix-sum-sliding-window'
        },
        {
            id: 225,
            question: 'Which technique is optimal for "Maximum Sum Subarray of size K"?',
            options: ['Brute Force', 'Sliding Window', 'Recursion', 'Hashing'],
            correctIndex: 1,
            explanation: 'Sliding Window technique reduces the complexity from O(n*k) to O(n) for fixed-size window problems.',
            relatedTopic: '/subjects/java/topics/prefix-sum-sliding-window'
        },
        {
            id: 226,
            question: 'Two Pointer technique works best on?',
            options: ['Sorted Arrays', 'Linked Lists', 'Trees', 'Graphs'],
            correctIndex: 0,
            explanation: 'Two Pointer technique is highly effective on sorted arrays (e.g., finding pairs with target sum).',
            relatedTopic: '/subjects/java/topics/two-pointer-technique'
        },
        {
            id: 227,
            question: 'To rotate a matrix 90 degrees, we commonly first...?',
            options: ['Reverse rows', 'Transpose it', 'Sort it', 'Flatten it'],
            correctIndex: 1,
            explanation: 'Transposing the matrix (swapping rows/cols) is the first step in 90-degree rotation.',
            relatedTopic: '/subjects/java/topics/matrix-algorithms'
        },
        {
            id: 228,
            question: 'The transpose of a matrix is obtained by swapping?',
            options: ['First and last row', 'Rows and Columns', 'Diagonals', 'None'],
            correctIndex: 1,
            explanation: 'Transpose means switching rows with columns (element [i][j] becomes [j][i]).',
            relatedTopic: '/subjects/java/topics/matrix-algorithms'
        },
        {
            id: 229,
            question: 'Which method returns a string representation of array contents?',
            options: ['arr.toString()', 'Arrays.toString(arr)', 'String.valueOf(arr)', 'arr.print()'],
            correctIndex: 1,
            explanation: 'Arrays.toString(arr) returns a readable string like "[1, 2, 3]".',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 230,
            question: 'What is the maximum index of an array of size N?',
            options: ['N', 'N+1', 'N-1', '0'],
            correctIndex: 2,
            explanation: 'Since indexing starts at 0, the last index is always Size - 1.',
            relatedTopic: '/subjects/java/topics/arrays1d'
        },
        {
            id: 226,
            question: 'What is the output?',
            codeSnippet: 'int[] arr = {1, 2, 3, 4, 5};\nSystem.out.println(arr[5]);',
            options: ['5', '0', 'Garbage Value', 'ArrayIndexOutOfBoundsException'],
            correctIndex: 3,
            explanation: 'Array indices are 0-based. The valid indices are 0 to 4. Accessing index 5 causes an ArrayIndexOutOfBoundsException.',
            relatedTopic: '/subjects/java/topics/arrays'
        },
        {
            id: 227,
            question: 'Output of this code?',
            codeSnippet: 'int[][] arr = {{1, 2}, {3, 4}};\nSystem.out.println(arr[0][1] + arr[1][0]);',
            options: ['4', '5', '6', '3'],
            correctIndex: 1,
            explanation: 'arr[0][1] is 2. arr[1][0] is 3. 2 + 3 = 5.',
            relatedTopic: '/subjects/java/topics/arrays'
        },
        {
            id: 228,
            question: 'Will this compile?',
            codeSnippet: 'int[] x = new int[3];\nSystem.out.println(x.length());',
            options: ['Yes, prints 3', 'No, length is a field not a method', 'No, arrays don\'t have length', 'Yes, prints 0'],
            correctIndex: 1,
            explanation: 'In Java arrays, "length" is a final variable (field), not a method. Usage should be x.length, not x.length().',
            relatedTopic: '/subjects/java/topics/arrays'
        }
    ],
    co3: [
        {
            id: 301,
            question: 'Which class is immutable in Java?',
            options: ['String', 'StringBuffer', 'StringBuilder', 'All of them'],
            correctIndex: 0,
            explanation: 'String objects are immutable; once created, their values cannot be changed.',
            relatedTopic: '/subjects/java/topics/strings-immutability'
        },
        {
            id: 302,
            question: 'Where are String literals stored?',
            options: ['Stack', 'String Constant Pool', 'Register', 'Random Heap area'],
            correctIndex: 1,
            explanation: 'String literals are stored in a special area of the Heap called the String Constant Pool to save memory.',
            relatedTopic: '/subjects/java/topics/strings-immutability'
        },
        {
            id: 303,
            question: 'What does "str1 == str2" check for Strings?',
            options: ['Content equality', 'Reference (Address) equality', 'Length equality', 'Type equality'],
            correctIndex: 1,
            explanation: ' The "==" operator checks if both references point to the exact same object in memory.',
            relatedTopic: '/subjects/java/topics/strings-immutability'
        },
        {
            id: 304,
            question: 'Which method should be used to check if two Strings have the same content?',
            options: ['==', 'equals()', 'sameAs()', 'compare()'],
            correctIndex: 1,
            explanation: 'The equals() method checks the actual content matching of the strings.',
            relatedTopic: '/subjects/java/topics/strings-immutability'
        },
        {
            id: 305,
            question: 'How many objects are created? String s = new String("Hello");',
            options: ['0', '1', '2', '3'],
            correctIndex: 2,
            explanation: 'Two objects: 1 in the Heap (due to "new") and 1 in the String Pool (literal "Hello").',
            relatedTopic: '/subjects/java/topics/strings-immutability'
        },
        {
            id: 306,
            question: 'Which class is mutable and NOT thread-safe?',
            options: ['String', 'StringBuffer', 'StringBuilder', 'Char[]'],
            correctIndex: 2,
            explanation: 'StringBuilder is mutable but not synchronized (not thread-safe), making it faster than StringBuffer.',
            relatedTopic: '/subjects/java/topics/stringbuilder-stringbuffer'
        },
        {
            id: 307,
            question: 'Output of: System.out.println("Java" + 10 + 20);',
            options: ['Java30', 'Java1020', 'Error', '30Java'],
            correctIndex: 1,
            explanation: 'String concatenation happens left-to-right. "Java"+10 becomes "Java10", then "Java10"+20 becomes "Java1020".',
            relatedTopic: '/subjects/java/topics/strings-immutability'
        },
        {
            id: 308,
            question: 'Which method removes leading and trailing whitespace?',
            options: ['strip()', 'trim()', 'removeSpace()', 'clean()'],
            correctIndex: 1,
            explanation: 'The trim() method removes whitespace from both ends of a string. (Java 11 also introduced strip()).',
            relatedTopic: '/subjects/java/topics/string-problems'
        },
        {
            id: 309,
            question: 'A method calling itself is known as?',
            options: ['Looping', 'Recursion', 'Overloading', 'Callback'],
            correctIndex: 1,
            explanation: 'Recursion is the process where a method calls itself to solve a smaller instance of the problem.',
            relatedTopic: '/subjects/java/topics/recursion-basics'
        },
        {
            id: 310,
            question: 'What is the mandatory condition to stop recursion?',
            options: ['Break statment', 'Base case', 'Return null', 'None'],
            correctIndex: 1,
            explanation: 'A Base Case is required to stop the recursive calls, otherwise a StackOverflowError occurs.',
            relatedTopic: '/subjects/java/topics/recursion-basics'
        },
        {
            id: 311,
            question: 'Which error occurs if recursion never terminates?',
            options: ['OutOfMemoryError', 'StackOverflowError', 'InfiniteLoopException', 'RecursionError'],
            correctIndex: 1,
            explanation: 'Each reursion adds a frame to the Stack. Infinite recursion fills the stack, causing StackOverflowError.',
            relatedTopic: '/subjects/java/topics/recursion-basics'
        },
        {
            id: 312,
            question: '5 & 3 equals? (Hint: 101 & 011)',
            options: ['0', '1', '7', '5'],
            correctIndex: 1,
            explanation: 'Bitwise AND: 1&0=0, 0&1=0, 1&1=1. 101 & 011 -> 001 (Decimal 1).',
            relatedTopic: '/subjects/java/topics/bitwise-operators'
        },
        {
            id: 313,
            question: 'Which operator flips all the bits of a number?',
            options: ['^', '!', '~', '-'],
            correctIndex: 2,
            explanation: 'The Bitwise Complement operator (~) inverts all bits (0 to 1, 1 to 0).',
            relatedTopic: '/subjects/java/topics/bitwise-operators'
        },
        {
            id: 314,
            question: 'Result of 4 << 1?',
            options: ['2', '8', '4', '1'],
            correctIndex: 1,
            explanation: 'Left shift multiplies by 2. 4 * 2^1 = 8. (100 became 1000).',
            relatedTopic: '/subjects/java/topics/bitwise-operators'
        },
        {
            id: 315,
            question: 'Which bitwise operator corresponds to XOR?',
            options: ['&', '|', '^', '~'],
            correctIndex: 2,
            explanation: 'The carrot symbol (^) is the XOR operator.',
            relatedTopic: '/subjects/java/topics/bitwise-operators'
        },
        {
            id: 316,
            question: 'How to get a character at specific index in String?',
            options: ['s[i]', 's.get(i)', 's.charAt(i)', 's.char(i)'],
            correctIndex: 2,
            explanation: 'The charAt(int index) method returns the char value at the specified index.',
            relatedTopic: '/subjects/java/topics/string-problems'
        },
        {
            id: 317,
            question: 'String constant pool is part of which memory?',
            options: ['Stack', 'Heap', 'Native Stack', 'PermGen/Metaspace'],
            correctIndex: 1,
            explanation: 'Since Java 7, the String Pool is stored in the Heap memory.',
            relatedTopic: '/subjects/java/topics/strings-immutability'
        },
        {
            id: 318,
            question: 'Is String a wrapper class?',
            options: ['Yes', 'No', 'Partially', 'Depends on usage'],
            correctIndex: 1,
            explanation: 'No, String is a standard class. Wrapper classes are Integer, Float, Boolean, etc.',
            relatedTopic: '/subjects/java/topics/strings-immutability'
        },
        {
            id: 319,
            question: 'x ^ x equals?',
            options: ['x', '1', '0', '-1'],
            correctIndex: 2,
            explanation: 'XORing a number with itself always results in 0 (bits are identical, so 1^1=0, 0^0=0).',
            relatedTopic: '/subjects/java/topics/bit-manipulation-tricks'
        },
        {
            id: 320,
            question: 'Which method converts other types to String?',
            options: ['String.parse()', 'String.valueOf()', 'ToString()', 'convert()'],
            correctIndex: 1,
            explanation: 'String.valueOf() is a static utility method to convert primitives and objects to String.',
            relatedTopic: '/subjects/java/topics/strings-immutability'
        },
        {
            id: 321,
            question: 'Which bitwise operator sets a specific bit to 0?',
            options: ['&', '| with 1', '& with 0', '^'],
            correctIndex: 2,
            explanation: 'ANDing with 0 forces the bit to become 0 while keeping others unchanged (if ANDed with 1).',
            relatedTopic: '/subjects/java/topics/bit-manipulation-tricks'
        },
        {
            id: 322,
            question: 'What is the base case for Factorial(n)?',
            options: ['n == 100', 'n == 0', 'n == -1', 'n == 2'],
            correctIndex: 1,
            explanation: 'Factorial of 0 is 1. This is the standard base case usually used.',
            relatedTopic: '/subjects/java/topics/recursive-problems'
        },
        {
            id: 323,
            question: 'Tail recursion is memory efficient because?',
            options: ['It uses no stack', 'Compiler can optimize stack reuse', 'It is faster', 'It uses heap'],
            correctIndex: 1,
            explanation: 'In tail recursion, the recursive call is the last action, allowing compilers to reuse the stack frame (Tail Call Optimization).',
            relatedTopic: '/subjects/java/topics/recursion-basics'
        },
        {
            id: 324,
            question: 'Which regex matches any digit?',
            options: ['\\d', '\\D', '\\w', '[a-z]'],
            correctIndex: 0,
            explanation: '\\d is the predefined character class for digits [0-9].',
            relatedTopic: '/subjects/java/topics/regex-pattern-matching'
        },
        {
            id: 325,
            question: 'Does StringBuffer method append() create a new object?',
            options: ['Yes', 'No', 'Sometimes', 'Only if empty'],
            correctIndex: 1,
            explanation: 'No, StringBuffer is mutable. append() modifies the existing object and returns a reference to it.',
            relatedTopic: '/subjects/java/topics/stringbuilder-stringbuffer'
        },
        {
            id: 326,
            question: 'What does "compareTo()" return if strings are equal?',
            options: ['true', '1', '0', '-1'],
            correctIndex: 2,
            explanation: 'compareTo() returns 0 if both strings are lexicographically equal.',
            relatedTopic: '/subjects/java/topics/string-problems'
        },
        {
            id: 327,
            question: 'Which bitwise shift preserves the sign bit?',
            options: ['<<', '>>', '>>>', 'None'],
            correctIndex: 1,
            explanation: 'The signed right shift (>>) preserves the sign bit (fills with 0 for positive, 1 for negative).',
            relatedTopic: '/subjects/java/topics/bitwise-operators'
        },
        {
            id: 328,
            question: 'Checking if a number is even efficiently?',
            options: ['n % 2 == 0', '(n & 1) == 0', 'n / 2', 'n << 1'],
            correctIndex: 1,
            explanation: '(n & 1) checks the least significant bit. If it is 0, the number is even. This is faster than modulo.',
            relatedTopic: '/subjects/java/topics/bit-manipulation-tricks'
        },
        {
            id: 329,
            question: 'Pattern matching "a*b" means?',
            options: ['a followed by b', 'zero or more a, then b', 'a, any char, b', 'start with a, end with b'],
            correctIndex: 1,
            explanation: '* quantifier means "zero or more occurrences" of the preceding element.',
            relatedTopic: '/subjects/java/topics/regex-pattern-matching'
        },
        {
            id: 330,
            question: 'Tower of Hanoi is a classic example of?',
            options: ['Iteration', 'Recursion', 'Greedy Algo', 'Dynamic Programming'],
            correctIndex: 1,
            explanation: 'Tower of Hanoi is typically solved using a simple recursive algorithm.',
            relatedTopic: '/subjects/java/topics/recursive-problems'
        },
        {
            id: 331,
            question: 'Predict the output:',
            codeSnippet: 'String s1 = "Hello";\nString s2 = new String("Hello");\nSystem.out.println(s1 == s2);',
            options: ['true', 'false', 'Compilation Error', 'Runtime Error'],
            correctIndex: 1,
            explanation: '"==" compares references. s1 is in String Pool, s2 is in Heap. They are different objects.',
            relatedTopic: '/subjects/java/topics/strings'
        },
        {
            id: 332,
            question: 'What does this recursive method return for func(3)?',
            codeSnippet: 'int func(int n) {\n  if (n == 0) return 1;\n  return n * func(n - 1);\n}',
            options: ['6', '3', '0', '1'],
            correctIndex: 0,
            explanation: 'This calculates factorial. 3 * func(2) -> 3 * 2 * func(1) -> 3 * 2 * 1 * func(0) -> 3 * 2 * 1 * 1 = 6.',
            relatedTopic: '/subjects/java/topics/recursion'
        },
        {
            id: 333,
            question: 'Output?',
            codeSnippet: 'System.out.println(10 & 12);',
            options: ['12', '10', '8', '14'],
            correctIndex: 2,
            explanation: '10 is 1010. 12 is 1100. 1010 & 1100 = 1000 (which is 8).',
            relatedTopic: '/subjects/java/topics/bitwise-operators'
        }
    ],
    co4: [
        {
            id: 401,
            question: 'What is a Class in Java?',
            options: ['A primitive data type', 'A blueprint for objects', 'A variable', 'A database table'],
            correctIndex: 1,
            explanation: 'A Class is a blueprint or template from which objects are created. It defines state and behavior.',
            relatedTopic: '/subjects/java/topics/classes-objects'
        },
        {
            id: 402,
            question: 'Which keyword refers to the current object instance?',
            options: ['super', 'this', 'current', 'object'],
            correctIndex: 1,
            explanation: 'The "this" keyword is a reference variable that refers to the current object.',
            relatedTopic: '/subjects/java/topics/constructors-this'
        },
        {
            id: 403,
            question: 'What is the return type of a Constructor?',
            options: ['void', 'int', 'String', 'No return type'],
            correctIndex: 3,
            explanation: 'Constructors do not have a return type, not even void. They return the instance implicitly.',
            relatedTopic: '/subjects/java/topics/constructors-this'
        },
        {
            id: 404,
            question: 'Which access modifier makes a member visible only within its own class?',
            options: ['public', 'protected', 'private', 'default'],
            correctIndex: 2,
            explanation: 'Private members are accessible only within the class they are declared.',
            relatedTopic: '/subjects/java/topics/encapsulation'
        },
        {
            id: 405,
            question: 'Can a class be static in Java?',
            options: ['Yes', 'No', 'Yes, but only nested classes', 'Yes, only abstract classes'],
            correctIndex: 2,
            explanation: 'Top-level classes cannot be static. Only nested (inner) classes can be declared static.',
            relatedTopic: '/subjects/java/topics/static-members'
        },
        {
            id: 406,
            question: 'What is Method Overloading?',
            options: ['Same method name, different class', 'Same method name, different parameters', 'Different method name, same args', 'None'],
            correctIndex: 1,
            explanation: 'Method Overloading occurs when a class has multiple methods with the same name but different parameter lists.',
            relatedTopic: '/subjects/java/topics/methods'
        },
        {
            id: 407,
            question: 'Which concept wraps data and methods into a single unit?',
            options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
            correctIndex: 2,
            explanation: 'Encapsulation is the wrapping of data (variables) and code (methods) together as a single unit.',
            relatedTopic: '/subjects/java/topics/encapsulation'
        },
        {
            id: 408,
            question: 'How to access a static method?',
            options: ['By creating an object', 'By ClassName.methodName()', 'By method name only', 'Cannot be accessed'],
            correctIndex: 1,
            explanation: 'Static methods belong to the class and are typically accessed using the Class Name.',
            relatedTopic: '/subjects/java/topics/static-members'
        },
        {
            id: 409,
            question: 'What happens if you do not define a constructor?',
            options: ['Compile Error', 'Runtime Error', 'JVM provides a default constructor', 'Object cannot be created'],
            correctIndex: 2,
            explanation: 'If no constructor is defined, the Java compiler inserts a default no-argument constructor.',
            relatedTopic: '/subjects/java/topics/constructors-this'
        },
        {
            id: 410,
            question: 'Which keyword is used to access hidden instance variables (shadowed by parameters)?',
            options: ['super', 'this', 'that', 'self'],
            correctIndex: 1,
            explanation: 'The "this" keyword resolves the ambiguity between instance variables and parameters with the same name.',
            relatedTopic: '/subjects/java/topics/constructors-this'
        },
        {
            id: 411,
            question: 'Can constructors be private?',
            options: ['Yes', 'No', 'Only in abstract class', 'Only in Interface'],
            correctIndex: 0,
            explanation: 'Yes, constructors can be private (e.g., in Singleton pattern) to prevent instantiation from outside.',
            relatedTopic: '/subjects/java/topics/constructors-this'
        },
        {
            id: 412,
            question: 'What is the purpose of Getters and Setters?',
            options: ['To make code faster', 'To achieve Encapsulation', 'To reduce memory', 'None'],
            correctIndex: 1,
            explanation: 'Getters and Setters allow controlled access to private variables, enforcing encapsulation.',
            relatedTopic: '/subjects/java/topics/encapsulation'
        },
        {
            id: 413,
            question: 'Can we overload the main method?',
            options: ['Yes', 'No', 'Yes, but JVM calls specific signature', 'Runtime Error'],
            correctIndex: 2,
            explanation: 'Yes, we can overload main(), but JVM only calls public static void main(String[] args).',
            relatedTopic: '/subjects/java/topics/methods'
        },
        {
            id: 414,
            question: 'A static block is executed when?',
            options: ['When object is created', 'Before main method (Class loading)', 'After main method', 'Manually called'],
            correctIndex: 1,
            explanation: 'Static blocks are executed once when the class is loaded into memory, typically before main().',
            relatedTopic: '/subjects/java/topics/static-members'
        },
        {
            id: 415,
            question: 'Which variable creates a single copy shared by all objects?',
            options: ['instace variable', 'local variable', 'static variable', 'const variable'],
            correctIndex: 2,
            explanation: 'Static variables are class-level variables; only one copy exists and is shared by all instances.',
            relatedTopic: '/subjects/java/topics/static-members'
        },
        {
            id: 416,
            question: 'Constructor overloading is a type of?',
            options: ['Run-time polymorphism', 'Compile-time polymorphism', 'Inheritance', 'Encapsulation'],
            correctIndex: 1,
            explanation: 'Constructor overloading (like method overloading) is resolved at compile time.',
            relatedTopic: '/subjects/java/topics/constructors-this'
        },
        {
            id: 417,
            question: 'Does Java support destructors?',
            options: ['Yes', 'No', 'Yes, ~ClassName()', 'Yes, delete()'],
            correctIndex: 1,
            explanation: 'Java does not have destructors. Memory management is handled by the Garbage Collector.',
            relatedTopic: '/subjects/java/topics/classes-objects'
        },
        {
            id: 418,
            question: 'Which access modifier has "package-private" access?',
            options: ['public', 'private', 'protected', 'default (no modifier)'],
            correctIndex: 3,
            explanation: 'If no modifier is specified (default), the member is accessible only within the same package.',
            relatedTopic: '/subjects/java/topics/encapsulation'
        },
        {
            id: 419,
            question: 'What is an "instance" of a class?',
            options: ['A method', 'A variable', 'An Object', 'A constructor'],
            correctIndex: 2,
            explanation: 'An object created from a class is called an instance of that class.',
            relatedTopic: '/subjects/java/topics/classes-objects'
        },
        {
            id: 420,
            question: 'Can a static method access non-static variables?',
            options: ['Yes', 'No', 'Yes, using super', 'Yes, if private'],
            correctIndex: 1,
            explanation: 'No, static methods cannot directly access non-static (instance) members because they don\'t belong to a specific object.',
            relatedTopic: '/subjects/java/topics/static-members'
        },
        {
            id: 421,
            question: 'Can a constructor be static?',
            options: ['Yes', 'No', 'Only in Singelton', 'Depends on JDK'],
            correctIndex: 1,
            explanation: 'Constructors cannot be static because they are invoked for a specific object creation, whereas static belongs to the class.',
            relatedTopic: '/subjects/java/topics/constructors-this'
        },
        {
            id: 422,
            question: 'What is "Data Hiding"?',
            options: ['Encrypting data', 'Using private variables', 'Deleting data', 'Using fast database'],
            correctIndex: 1,
            explanation: 'Data hiding is the practice of restricting access to internal object details, typically using private variables.',
            relatedTopic: '/subjects/java/topics/encapsulation'
        },
        {
            id: 423,
            question: 'Does every class have a constructor?',
            options: ['No', 'Yes', 'Only public classes', 'Only abstract classes'],
            correctIndex: 1,
            explanation: 'Yes. If you don\'t define one, the compiler injects a default no-arg constructor.',
            relatedTopic: '/subjects/java/topics/constructors-this'
        },
        {
            id: 424,
            question: 'Which variable is stored in Stack memory?',
            options: ['Instance variable', 'Static Variable', 'Local variable', 'Global variable'],
            correctIndex: 2,
            explanation: 'Local variables (primitive types, references) declared inside a method are stored in the Stack frame.',
            relatedTopic: '/subjects/java/topics/classes-objects'
        },
        {
            id: 425,
            question: 'What identifies a method signature?',
            options: ['Method Name + Return Type', 'Method Name + Parameters', 'Return Type + Parameters', 'Method Name only'],
            correctIndex: 1,
            explanation: 'A method signature consists of the method name and the parameter list (types and order).',
            relatedTopic: '/subjects/java/topics/methods'
        },
        {
            id: 426,
            question: 'What is Coupling?',
            options: ['Degree of dependency between classes', 'Functional strength of a class', 'Object creation', 'Data hiding'],
            correctIndex: 0,
            explanation: 'Coupling refers to how much one class knows about or relies on another class. Low coupling is desirable.',
            relatedTopic: '/subjects/java/topics/analyzing-class-design'
        },
        {
            id: 427,
            question: 'What is Cohesion?',
            options: ['Dependency between modules', 'Measure of how related responsibilities are', 'Connecting to DB', 'Linking libraries'],
            correctIndex: 1,
            explanation: 'Cohesion refers to how strongly the responsibilities of a single class are related. High cohesion is desirable.',
            relatedTopic: '/subjects/java/topics/analyzing-class-design'
        },
        {
            id: 428,
            question: 'Which principle states "A class should have only one reason to change"?',
            options: ['Open/Closed', 'Liskov Substitution', 'Single Responsibility (SRP)', 'Interface Segregation'],
            correctIndex: 2,
            explanation: 'Single Responsibility Principle (SRP) states that a class should handle only one specific functionality.',
            relatedTopic: '/subjects/java/topics/analyzing-class-design'
        },
        {
            id: 429,
            question: 'What is the default value of a boolean field?',
            options: ['true', 'false', 'null', '0'],
            correctIndex: 1,
            explanation: 'The default value for a boolean instance variable is false.',
            relatedTopic: '/subjects/java/topics/classes-objects'
        },
        {
            id: 430,
            question: 'Can "this" be used in a static method?',
            options: ['Yes', 'No', 'Sometimes', 'If class is abstract'],
            correctIndex: 1,
            explanation: 'No, "this" refers to the current instance, and static methods do not have an associated instance.',
            relatedTopic: '/subjects/java/topics/static-members'
        },
        {
            id: 431,
            question: 'Output of this code?',
            codeSnippet: 'class Test {\n  static int count = 0;\n  Test() { count++; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    new Test();\n    new Test();\n    System.out.println(Test.count);\n  }\n}',
            options: ['0', '1', '2', 'Compilation Error'],
            correctIndex: 2,
            explanation: 'Static variable count is shared. It increments twice (once per constructor call), so result is 2.',
            relatedTopic: '/subjects/java/topics/static-members'
        },
        {
            id: 432,
            question: 'What is printed?',
            codeSnippet: 'class A {\n  void foo() { System.out.print("A"); }\n}\nclass B extends A {\n  void foo() { System.out.print("B"); }\n}\nclass Main {\n  public static void main(String[] args) {\n    A a = new B();\n    a.foo();\n  }\n}',
            options: ['A', 'B', 'AB', 'Compilation Error'],
            correctIndex: 1,
            explanation: 'This is runtime polymorphism (method overriding). The object type is B, so B\'s foo() is called.',
            relatedTopic: '/subjects/java/topics/polymorphism'
        },
        {
            id: 433,
            question: 'Identify the issue:',
            codeSnippet: 'class A {\n  private int x;\n}\nclass B {\n  public static void main(String[] args) {\n    A a = new A();\n    System.out.println(a.x);\n  }\n}',
            options: ['No issue', 'x is private, cannot be accessed', 'A cannot be instantiated', 'Main method missing'],
            correctIndex: 1,
            explanation: 'Private members are accessible only within the same class.',
            relatedTopic: '/subjects/java/topics/access-modifiers'
        }
    ],
    co5: [
        {
            id: 501,
            question: 'Which keyword is used to inherit a class?',
            options: ['implement', 'extends', 'inherits', 'super'],
            correctIndex: 1,
            explanation: 'The "extends" keyword is used to create a subclass that inherits from a superclass.',
            relatedTopic: '/subjects/java/topics/inheritance'
        },
        {
            id: 502,
            question: 'What is the root class of all classes in Java?',
            options: ['java.lang.Main', 'java.util.Object', 'java.lang.Object', 'java.lang.Root'],
            correctIndex: 2,
            explanation: 'java.lang.Object is the ultimate superclass of all classes in Java.',
            relatedTopic: '/subjects/java/topics/inheritance'
        },
        {
            id: 503,
            question: 'Does Java support multiple inheritance with classes?',
            options: ['Yes', 'No', 'Only for Abstract classes', 'Depends on JVM'],
            correctIndex: 1,
            explanation: 'Java does not support multiple inheritance with classes to avoid the "Diamond Problem".',
            relatedTopic: '/subjects/java/topics/inheritance'
        },
        {
            id: 504,
            question: 'Which keyword is used to call the superclass constructor?',
            options: ['this()', 'super()', 'parent()', 'base()'],
            correctIndex: 1,
            explanation: 'The "super()" call invokes the constructor of the immediate parent class.',
            relatedTopic: '/subjects/java/topics/inheritance'
        },
        {
            id: 505,
            question: 'What is an Abstract Class?',
            options: ['Class with no methods', 'Class that cannot be instantiated', 'Class with only static methods', 'Final class'],
            correctIndex: 1,
            explanation: 'An abstract class cannot be instantiated directly and is meant to be subclassed.',
            relatedTopic: '/subjects/java/topics/abstract-classes'
        },
        {
            id: 506,
            question: 'Can an abstract class have a constructor?',
            options: ['Yes', 'No', 'Only if private', 'Only if static'],
            correctIndex: 0,
            explanation: 'Yes, abstract classes can have constructors, which are called when a subclass is instantiated.',
            relatedTopic: '/subjects/java/topics/abstract-classes'
        },
        {
            id: 507,
            question: 'Which keyword is used to implement an interface?',
            options: ['extends', 'implements', 'interface', 'using'],
            correctIndex: 1,
            explanation: 'The "implements" keyword is used by a class to implement an interface.',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 508,
            question: 'Can an interface have instance variables?',
            options: ['Yes', 'No', 'Only private', 'Only protected'],
            correctIndex: 1,
            explanation: 'No, variables in an interface are implicitly "public static final" (constants).',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 509,
            question: 'Method Overriding is an example of?',
            options: ['Compile-time polymorphism', 'Runtime polymorphism', 'Encapsulation', 'Data hiding'],
            correctIndex: 1,
            explanation: 'Method Overriding (Dynamic Method Dispatch) is resolved at runtime.',
            relatedTopic: '/subjects/java/topics/polymorphism'
        },
        {
            id: 510,
            question: 'Which interface allows marker capability (no methods)?',
            options: ['Functional Interface', 'Marker Interface', 'Abstract Interface', 'Empty Interface'],
            correctIndex: 1,
            explanation: 'A Marker Interface (e.g., Serializable, Cloneable) has no methods and denotes a property.',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 511,
            question: 'Can we override a static method?',
            options: ['Yes', 'No', 'Yes, but it is Method Hiding', 'Runtime Error'],
            correctIndex: 2,
            explanation: 'Static methods cannot be overridden. Redeclaring them in a subclass is called Method Hiding.',
            relatedTopic: '/subjects/java/topics/polymorphism'
        },
        {
            id: 512,
            question: 'Which keyword prevents a method from being overridden?',
            options: ['static', 'const', 'final', 'private'],
            correctIndex: 2,
            explanation: 'The "final" keyword prevents a method from being overridden in subclasses.',
            relatedTopic: '/subjects/java/topics/polymorphism'
        },
        {
            id: 513,
            question: 'Can a class implement multiple interfaces?',
            options: ['No', 'Yes', 'Only one', 'Only abstract classes'],
            correctIndex: 1,
            explanation: 'Yes, a Java class can implement multiple interfaces, allowing a form of multiple inheritance.',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 514,
            question: 'Which is a Functional Interface?',
            options: ['Interface with 1 static method', 'Interface with 1 abstract method', 'Interface with 0 methods', 'Interface with 2 methods'],
            correctIndex: 1,
            explanation: 'A Functional Interface has exactly one abstract method (can have multiple default/static methods).',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 515,
            question: 'Which keyword allows accessing Super Class members?',
            options: ['this', 'super', 'parent', 'extends'],
            correctIndex: 1,
            explanation: 'The "super" keyword refers to the direct parent class object/members.',
            relatedTopic: '/subjects/java/topics/inheritance'
        },
        {
            id: 516,
            question: 'Can an Abstract class be final?',
            options: ['Yes', 'No', 'Sometimes', 'Depends on methods'],
            correctIndex: 1,
            explanation: 'No. "final" prevents inheritance, while "abstract" requires inheritance. They are opposites.',
            relatedTopic: '/subjects/java/topics/abstract-classes'
        },
        {
            id: 517,
            question: 'What is Upcasting?',
            options: ['Parent ref referring to Child object', 'Child ref referring to Parent object', 'Casting int to double', 'None'],
            correctIndex: 0,
            explanation: 'Upcasting is assigning a Child object to a Parent reference (Parent p = new Child();).',
            relatedTopic: '/subjects/java/topics/polymorphism'
        },
        {
            id: 518,
            question: 'Can an Interface extend another Interface?',
            options: ['No', 'Yes', 'Only one', 'Only classes can extend'],
            correctIndex: 1,
            explanation: 'Yes, an interface can extend one or more other interfaces using the "extends" keyword.',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 519,
            question: 'Which is a Functional Interface?',
            options: ['Interface with 1 static method', 'Interface with 1 abstract method', 'Interface with 0 methods', 'Interface with 2 methods'],
            correctIndex: 1,
            explanation: 'A Functional Interface has exactly one abstract method (can have multiple default/static methods).',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 520,
            question: 'Default methods in Interfaces were introduced in?',
            options: ['Java 5', 'Java 7', 'Java 8', 'Java 11'],
            correctIndex: 2,
            explanation: 'Java 8 introduced "default" methods to allow adding new methods without breaking existing implementations.',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 521,
            question: 'Which polymorphism is achieved by Method Overloading?',
            options: ['Static / Compile-time', 'Dynamic / Runtime', 'Ad-hoc', 'Coercion'],
            correctIndex: 0,
            explanation: 'Method Overloading is resolved at compile time (Static Binding).',
            relatedTopic: '/subjects/java/topics/polymorphism'
        },
        {
            id: 522,
            question: 'Dynamic Binding uses?',
            options: ['Type of reference variable', 'Type of object', 'Compiler knowledge', 'Static analysis'],
            correctIndex: 1,
            explanation: 'Dynamic binding (overriding) uses the actual object type at runtime to determine which method to call.',
            relatedTopic: '/subjects/java/topics/polymorphism'
        },
        {
            id: 523,
            question: 'Can we define private methods in an Interface (Java 9+)?',
            options: ['Yes', 'No', 'Only protected', 'Only static'],
            correctIndex: 0,
            explanation: 'Yes, Java 9 introduced private methods in interfaces to share code between default methods.',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 524,
            question: 'The "instanceof" operator returns?',
            options: ['Object', 'boolean', 'int', 'String'],
            correctIndex: 1,
            explanation: 'The instanceof operator returns true or false depending on whether the object is an instance of the type.',
            relatedTopic: '/subjects/java/topics/polymorphism'
        },
        {
            id: 525,
            question: 'If a class contains an abstract method, the class must be?',
            options: ['final', 'static', 'abstract', 'public'],
            correctIndex: 2,
            explanation: 'If a class has at least one abstract method, the class itself must be declared abstract.',
            relatedTopic: '/subjects/java/topics/abstract-classes'
        },
        {
            id: 526,
            question: 'Can we declare a constructor in an Interface?',
            options: ['Yes', 'No', 'Only default constructor', 'Yes, but cannot call it'],
            correctIndex: 1,
            explanation: 'No, interfaces cannot have constructors because they cannot be instantiated.',
            relatedTopic: '/subjects/java/topics/interfaces'
        },
        {
            id: 527,
            question: 'What is the Diamond Problem?',
            options: ['Memory leak', 'Ambiguity in multiple inheritance', 'Infinite loop', 'Threading issue'],
            correctIndex: 1,
            explanation: 'The Diamond Problem refers to the ambiguity arises when a class inherits from two classes that have a common ancestor.',
            relatedTopic: '/subjects/java/topics/inheritance'
        },
        {
            id: 528,
            question: 'How to prevent a class from being inherited?',
            options: ['Make it private', 'Make it static', 'Make it final', 'Make it abstract'],
            correctIndex: 2,
            explanation: 'Declaring a class "final" prevents it from being subclassed.',
            relatedTopic: '/subjects/java/topics/inheritance'
        },
        {
            id: 529,
            question: 'Covariant return types allow overriding method to?',
            options: ['Change return type to subclass', 'Change return type to superclass', 'Change parameter types', 'Throw new exceptions'],
            correctIndex: 0,
            explanation: 'Covariant return types (Java 5+) allow an overriding method to return a subclass of the original return type.',
            relatedTopic: '/subjects/java/topics/polymorphism'
        },
        {
            id: 530,
            question: 'Which relationship is "IS-A"?',
            options: ['Association', 'Aggregation', 'Inheritance', 'Composition'],
            correctIndex: 2,
            explanation: 'Inheritance represents an "IS-A" relationship (e.g., Dog IS-A Animal).',
            relatedTopic: '/subjects/java/topics/inheritance'
        },
        {
            id: 531,
            question: 'What is the output?',
            codeSnippet: 'class Parent { void show() { System.out.print("Parent"); } }\nclass Child extends Parent { void show() { System.out.print("Child"); } }\npublic class Main {\n  public static void main(String[] args) {\n    Parent p = new Child();\n    p.show();\n  }\n}',
            options: ['Parent', 'Child', 'ParentChild', 'Compilation Error'],
            correctIndex: 1,
            explanation: 'Method Overriding: The actual object is of type Child, so Child\'s show() method is executed.',
            relatedTopic: '/subjects/java/topics/inheritance'
        },
        {
            id: 532,
            question: 'Will this compile?',
            codeSnippet: 'abstract class A { abstract void method(); }\nclass B extends A { }',
            options: ['Yes', 'No', 'Only if B is abstract', 'Runtime Error'],
            correctIndex: 1,
            explanation: 'No. Class B must either implement the abstract method "method()" or be declared abstract itself.',
            relatedTopic: '/subjects/java/topics/abstract-classes'
        },
        {
            id: 533,
            question: 'Output?',
            codeSnippet: 'interface I { default void print() { System.out.print("I"); } }\nclass C implements I {\n  public void print() { System.out.print("C"); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    I obj = new C();\n    obj.print();\n  }\n}',
            options: ['I', 'C', 'IC', 'Compilation Error'],
            correctIndex: 1,
            explanation: 'Class C overrides the default method of Interface I, so "C" is printed.',
            relatedTopic: '/subjects/java/topics/interfaces'
        }
    ],
    co6: [
        {
            id: 601,
            question: 'Which block is used to handle exceptions?',
            options: ['try', 'catch', 'throw', 'final'],
            correctIndex: 1,
            explanation: 'The "catch" block is used to catch and handle the exception thrown by the try block.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 602,
            question: 'Which block is always executed, exception or not?',
            options: ['try', 'catch', 'finally', 'throws'],
            correctIndex: 2,
            explanation: 'The "finally" block is always executed (unless JVM exits), typically used for cleanup.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 603,
            question: 'What is the base class for all exceptions?',
            options: ['java.lang.Exception', 'java.lang.Throwable', 'java.lang.Error', 'java.lang.RuntimeException'],
            correctIndex: 1,
            explanation: 'java.lang.Throwable is the root class for all Errors and Exceptions.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 604,
            question: 'Which keyword is used to throw an exception manually?',
            options: ['throws', 'throw', 'raise', 'exception'],
            correctIndex: 1,
            explanation: 'The "throw" keyword is used to explicitly throw an exception object.',
            relatedTopic: '/subjects/java/topics/custom-exceptions'
        },
        {
            id: 605,
            question: 'Checked exceptions are checked at?',
            options: ['Runtime', 'Compile time', 'Link time', 'Load time'],
            correctIndex: 1,
            explanation: 'Checked Check exceptions (e.g., IOException) are checked by the compiler at compile time.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 606,
            question: 'Which of the following is an Unchecked Exception?',
            options: ['IOException', 'SQLException', 'NullPointerException', 'ClassNotFoundException'],
            correctIndex: 2,
            explanation: 'NullPointerException (and all RuntimeExceptions) are unchecked.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 607,
            question: 'Keyword used in method signature to declare exceptions?',
            options: ['throw', 'throws', 'catching', 'handle'],
            correctIndex: 1,
            explanation: 'The "throws" keyword is used in the method signature to declare that the method might throw specific exceptions.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 608,
            question: 'What happens if we divide by zero in integers?',
            options: ['Infinity', 'NaN', 'ArithmeticException', 'Zero'],
            correctIndex: 2,
            explanation: 'In Java integer arithmetic, division by zero throws java.lang.ArithmeticException.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 609,
            question: 'Can we have multiple catch blocks for a single try?',
            options: ['Yes', 'No', 'Only 2', 'Only nested'],
            correctIndex: 0,
            explanation: 'Yes, multiple catch blocks can follow a single try block to handle different types of exceptions.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 610,
            question: 'Which Stream is used for reading characters?',
            options: ['InputStream', 'OutputStream', 'Reader', 'Writer'],
            correctIndex: 2,
            explanation: 'Readers (e.g., FileReader) are character-oriented streams. InputStreams are byte-oriented.',
            relatedTopic: '/subjects/java/topics/file-io-readers-writers'
        },
        {
            id: 611,
            question: 'What does Stream.close() do?',
            options: ['Clears memory', 'Deletes file', 'Releases system resources', 'Flushes buffer'],
            correctIndex: 2,
            explanation: 'Closing a stream is crucial to release system resources (like file handles) associated with it.',
            relatedTopic: '/subjects/java/topics/file-io-readers-writers'
        },
        {
            id: 612,
            question: 'Which class is used to write text to a file?',
            options: ['FileInputStream', 'FileReader', 'FileWriter', 'FileStream'],
            correctIndex: 2,
            explanation: 'FileWriter is a convenience class for writing character files.',
            relatedTopic: '/subjects/java/topics/file-io-readers-writers'
        },
        {
            id: 613,
            question: 'Class responsible for reading from console input?',
            options: ['System.out', 'System.in', 'System.err', 'Console.read'],
            correctIndex: 1,
            explanation: 'System.in is the standard input stream, typically connected to keyboard input.',
            relatedTopic: '/subjects/java/topics/file-io-basics'
        },
        {
            id: 614,
            question: 'Serialization is the process of?',
            options: ['Encrypting object', 'Converting object to byte stream', 'Compressing file', 'Sorting data'],
            correctIndex: 1,
            explanation: 'Serialization converts an object\'s state into a byte stream, which can be saved to a file or sent over network.',
            relatedTopic: '/subjects/java/topics/serialization'
        },
        {
            id: 615,
            question: 'Which interface marks a class as Serializable?',
            options: ['Serializable', 'Cloneable', 'Remote', 'Portable'],
            correctIndex: 0,
            explanation: 'The java.io.Serializable interface must be implemented to serialize an object.',
            relatedTopic: '/subjects/java/topics/serialization'
        },
        {
            id: 616,
            question: 'What is "transient" keyword used for?',
            options: ['Make variable constant', 'Prevent serialization of a field', 'Make method fast', 'Thread safety'],
            correctIndex: 1,
            explanation: 'Fields marked as "transient" are ignored during the serialization process.',
            relatedTopic: '/subjects/java/topics/serialization'
        },
        {
            id: 617,
            question: 'Which exception implies file not found?',
            options: ['IOException', 'FileNotFoundException', 'FileErrorException', 'NoSuchFileException'],
            correctIndex: 1,
            explanation: 'FileNotFoundException is thrown when an attempt to open the file denoted by a specified pathname fails.',
            relatedTopic: '/subjects/java/topics/file-io-basics'
        },
        {
            id: 618,
            question: 'BufferedInputStream improves performance by?',
            options: ['Compressing data', 'Using an internal buffer array', 'Parallel processing', 'Caching files'],
            correctIndex: 1,
            explanation: 'It reads chunks of bytes into an internal buffer, reducing the number of expensive system calls.',
            relatedTopic: '/subjects/java/topics/file-io-basics'
        },
        {
            id: 619,
            question: 'Can we re-throw an exception?',
            options: ['Yes', 'No', 'Only syntax error', 'Only runtime ones'],
            correctIndex: 0,
            explanation: 'Yes, an exception caught in a catch block can be re-thrown using the "throw" keyword.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 620,
            question: 'Difference between Error and Exception?',
            options: ['No difference', 'Errors are recoverable, Exceptions are fatal', 'Exceptions are recoverable, Errors are fatal', 'Errors are checked'],
            correctIndex: 2,
            explanation: 'Errors (e.g., OutOfMemory) indicate serious problems that arguably shouldn\'t be caught. Exceptions are conditions that might be caught.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 621,
            question: 'Which Try-with-resources feature handles?',
            options: ['Automatic closing of resources', 'Automatic logging', 'Faster execution', 'Better security'],
            correctIndex: 0,
            explanation: 'Try-with-resources (Java 7+) ensures that each resource (implementing AutoCloseable) is closed at the end of the statement.',
            relatedTopic: '/subjects/java/topics/file-io-readers-writers'
        },
        {
            id: 622,
            question: 'The File class in Java represents?',
            options: ['File content', 'File path/directory path', 'File stream', 'File database'],
            correctIndex: 1,
            explanation: 'An instance of File class represents an abstract pathname (path) to a file or directory, not the content itself.',
            relatedTopic: '/subjects/java/topics/file-io-basics'
        },
        {
            id: 623,
            question: 'Which method creates a directory?',
            options: ['create()', 'mkdir()', 'newDir()', 'make()'],
            correctIndex: 1,
            explanation: 'File.mkdir() or mkdirs() is used to create a directory.',
            relatedTopic: '/subjects/java/topics/file-io-basics'
        },
        {
            id: 624,
            question: 'What is the parent class of IOException?',
            options: ['RuntimeException', 'Exception', 'Error', 'Throwable'],
            correctIndex: 1,
            explanation: 'IOException extends java.lang.Exception.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 625,
            question: 'Can we catch \'Throwable\'?',
            options: ['Yes', 'No', 'Only Errors', 'Only Exceptions'],
            correctIndex: 0,
            explanation: 'Yes, since Throwable is the parent of Exception and Error, catching it catches everything (though usually not recommended).',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 626,
            question: 'Scanner class belongs to which package?',
            options: ['java.io', 'java.util', 'java.lang', 'java.net'],
            correctIndex: 1,
            explanation: 'Scanner is a utility class found in java.util package.',
            relatedTopic: '/subjects/java/topics/file-io-readers-writers'
        },
        {
            id: 627,
            question: 'Is "finally" block mandatory?',
            options: ['Yes', 'No', 'If catch is missing', 'If try is missing'],
            correctIndex: 1,
            explanation: 'No, "finally" is optional. A try block needs either a catch or a finally (or both).',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 628,
            question: 'Which exception occurs when parsing invalid integer string? "abc"',
            options: ['NumberFormatException', 'ClassCastException', 'InputMismatchException', 'ParseException'],
            correctIndex: 0,
            explanation: 'Integer.parseInt("abc") throws NumberFormatException.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 629,
            question: 'DataInputStream reads data as?',
            options: ['Characters', 'Primitive data types', 'Objects', 'Strings only'],
            correctIndex: 1,
            explanation: 'DataInputStream allows reading primitive Java data types from an underlying input stream in a machine-independent way.',
            relatedTopic: '/subjects/java/topics/file-io-basics'
        },
        {
            id: 630,
            question: 'What happens if a custom exception extends RuntimeException?',
            options: ['It becomes Checked', 'It becomes Unchecked', 'It becomes Error', 'Compilation Error'],
            correctIndex: 1,
            explanation: 'Extending RuntimeException makes the custom exception "unchecked" (compiler won\'t force handling).',
            relatedTopic: '/subjects/java/topics/custom-exceptions'
        },
        {
            id: 631,
            question: 'What is the output?',
            codeSnippet: 'try {\n  int x = 10/0;\n} catch(ArithmeticException e) {\n  System.out.print("Catch ");\n} finally {\n  System.out.print("Finally");\n}',
            options: ['Catch', 'Finally', 'Catch Finally', 'ArithmeticException'],
            correctIndex: 2,
            explanation: 'Division by zero triggers Catch block. Finally block executes afterwards. Output: "Catch Finally".',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 632,
            question: 'Predict the output:',
            codeSnippet: 'try {\n  throw new NullPointerException();\n}\ncatch(Exception e) {\n  System.out.print("E ");\n}\ncatch(NullPointerException e) {\n  System.out.print("NPE ");\n}',
            options: ['E', 'NPE', 'E NPE', 'Compilation Error'],
            correctIndex: 3,
            explanation: 'Compilation Error. Unreachable code. Child exception (NullPointerException) must be caught BEFORE Parent exception (Exception).',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        },
        {
            id: 633,
            question: 'Will this compile?',
            codeSnippet: 'void method() throws IOException {\n  // some code\n}',
            options: ['Yes', 'No, missing try-catch', 'No, throws not allowed here', 'Only if IOException is imported'],
            correctIndex: 0,
            explanation: 'Yes. The "throws" keyword declares that this method MIGHT throw an IOException, delegating responsibility to the caller.',
            relatedTopic: '/subjects/java/topics/exception-handling-basics'
        }
    ]
}
