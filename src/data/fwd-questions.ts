export interface FWDQuestion {
  id: string;
  co: 'CO1' | 'CO2' | 'CO3' | 'CO4' | 'CO5';
  question: string;
  answer: string;
  detailedExplanation?: string;
  type: 'short-answer' | 'code-snippet';
  visualType?: 'box-model' | 'specificity' | 'positioning' | 'event-loop' | 'flex-align';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
}

export const fwdQuestions: FWDQuestion[] = [
  // 1. Typography CSS properties
  {
    id: 'q1',
    co: 'CO1',
    question: 'Write few typography CSS properties.',
    answer: 'Some commonly used typography CSS properties are:\n• font-family\n• font-size\n• font-weight\n• font-style\n• text-align\n• line-height\n• letter-spacing\n• text-transform',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['css', 'typography']
  },
  // 2. Ways to apply color
  {
    id: 'q2',
    co: 'CO1',
    question: 'Write few ways to apply color to text in a web page.',
    answer: 'You can apply color to text using:\n• Named colors → color: red;\n• Hex codes → color: #ff0000;\n• RGB values → color: rgb(255,0,0);\n• RGBA values → color: rgba(255,0,0,0.7);\n• HSL values → color: hsl(0,100%,50%);',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['css', 'colors']
  },
  // 3. Ways to apply CSS
  {
    id: 'q3',
    co: 'CO1',
    question: 'List out the ways of applying CSS to an HTML page.',
    answer: 'There are three ways:\n1. Inline CSS\n2. Internal CSS (using <style> tag)\n3. External CSS (using .css file linked with <link> tag)',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['css', 'basics']
  },
  // 4. Linking External CSS
  {
    id: 'q4',
    co: 'CO1',
    question: 'How will you link external CSS to an HTML page? Write that particular tag.',
    answer: '<link rel="stylesheet" href="style.css">',
    type: 'code-snippet',
    difficulty: 'Easy',
    tags: ['css', 'basics']
  },
  // 5. CSS Selectors
  {
    id: 'q5',
    co: 'CO1',
    question: 'Explain about different selectors in CSS.',
    answer: '1. Tag Selector: p { color: blue; }\n2. Class Selector: .box { padding: 10px; }\n3. ID Selector: #header { background: black; }\n4. Universal Selector: * { margin: 0; }\n5. Group Selector: h1, h2 { font-family: Arial; }\n6. Descendant Selector: div p { color: green; }\n7. Attribute Selector: input[type="text"] { border: 1px solid black; }',
    type: 'short-answer',
    difficulty: 'Medium',
    tags: ['css', 'selectors']
  },
  // 6. Ways to apply CSS (Detailed)
  {
    id: 'q6',
    co: 'CO1',
    question: 'What are the ways to apply CSS to an HTML page? Explain it.',
    answer: '1. Inline CSS: Inside HTML tags (style="..."). Formatting just one element.\n2. Internal CSS: Inside <style> tag in <head>. Single page styling.\n3. External CSS: Separate .css file linked via <link>. Best for large sites.',
    type: 'short-answer',
    difficulty: 'Medium',
    tags: ['css', 'integration']
  },
  // 7. Typography priority
  {
    id: 'q7',
    co: 'CO1',
    question: 'Write typography tag with internal, external and inline CSS and explain what will get higher priority and why?',
    answer: `<!DOCTYPE html>
<html>
<head>
<style>
p { font-size: 20px; color: blue; }
</style>
<link rel="stylesheet" href="style.css">
</head>
<body>
<p style="color: red;">Typography Example</p>
</body>
</html>

/* style.css */
p { color: green; }

/* 
Priority Order (Highest → Lowest)
1. Inline CSS (Highest priority because it is closest to the element)
2. Internal CSS
3. External CSS
4. Browser default styles 
*/`,
    type: 'code-snippet',
    difficulty: 'Medium',
    tags: ['css', 'priority', 'cascade']
  },
  // 8. Selectors Example
  {
    id: 'q8',
    co: 'CO1',
    question: 'Apply different CSS selectors (class, id, tag, nested, universal) in style.css for a sample HTML page you design.',
    answer: `<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h1 id="title">Welcome</h1>
<div class="container">
<p>This is a paragraph inside container.</p>
</div>
<p class="info">This is another paragraph.</p>
</body>
</html>

/* style.css */
/* Universal selector */
* { margin: 0; padding: 0; }
/* Tag selector */
p { font-size: 18px; }
/* ID selector */
#title { color: blue; text-align: center; }
/* Class selector */
.info { color: green; }
/* Nested selector */
.container p { color: purple; }`,
    type: 'code-snippet',
    difficulty: 'Medium',
    tags: ['css', 'selectors']
  },
  // 9. Box Model
  {
    id: 'q9',
    co: 'CO1',
    question: 'What is box model in CSS?',
    answer: 'The Box Model wraps every HTML element. Layers:\n1. Content: Text/Image\n2. Padding: Space around content (inside border)\n3. Border: Line around padding\n4. Margin: Space outside border',
    visualType: 'box-model',
    type: 'short-answer',
    difficulty: 'Medium',
    tags: ['css', 'box-model']
  },
  // 10. Need of Border
  {
    id: 'q10',
    co: 'CO1',
    question: 'Explain the need of border in designing phase.',
    answer: '• Visually separates elements.\n• Identifies sections/boxes.\n• Creates focus areas (forms, buttons).\n• Helps debug spacing.\n• Enhances aesthetic appearance.',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['css', 'design']
  },
  // 11. Absolute vs Relative units
  {
    id: 'q11',
    co: 'CO1',
    question: 'Write any 2 absolute and any 2 relative measures for CSS properties.',
    answer: 'Absolute: px (pixels), cm (centimeters)\nRelative: em (relative to parent font), rem (relative to root font)',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['css', 'units']
  },
  // 12. Margin vs Padding
  {
    id: 'q12',
    co: 'CO1',
    question: 'Explain about margin and padding in CSS.',
    answer: 'Margin: Space OUTSIDE the border. Creates distance between elements. Does not show background.\nPadding: Space INSIDE the border. Increases clickable area. Shows background.',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['css', 'spacing']
  },
  // 13. HTML Document Structure
  {
    id: 'q13',
    co: 'CO1',
    question: 'Write the HTML document structure.',
    answer: `<!DOCTYPE html>
<html>
<head>
<title>Document Title</title>
</head>
<body>
<!-- Page Content -->
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Easy',
    tags: ['html', 'structure']
  },
  // 14. HTTPS vs HTTP
  {
    id: 'q14',
    co: 'CO1',
    question: 'What is the purpose of HTTPS? How does it differ from HTTP?',
    answer: 'HTTPS (Secure) uses encryption (SSL/TLS) to protect data. HTTP is not secure. HTTPS uses port 443, HTTP uses port 80.',
    type: 'short-answer',
    difficulty: 'Medium',
    tags: ['web', 'protocols']
  },
  // 15. Web Protocols
  {
    id: 'q15',
    co: 'CO1',
    question: 'What are web protocols? Name any two and explain briefly.',
    answer: '1. HTTP/HTTPS: Transferring webpages.\n2. FTP: File Transfer Protocol (upload/download).',
    type: 'short-answer',
    difficulty: 'Medium',
    tags: ['web', 'protocols']
  },
  // 16. Client-Server Architecture
  {
    id: 'q16',
    co: 'CO1',
    question: 'Explain the client–server architecture used in the web.',
    answer: '1. User enters URL.\n2. Browser (Client) sends Request.\n3. Server processes request.\n4. Server sends Response (HTML/CSS/JS).\n5. Browser displays page.',
    type: 'short-answer',
    difficulty: 'Medium',
    tags: ['web', 'architecture']
  },
  // 17. Personal Portfolio
  {
    id: 'q17',
    co: 'CO1',
    question: 'Design an HTML page for your personal portfolio and apply CSS.',
    answer: `<!DOCTYPE html>
<html>
<head>
<style>
*{ box-sizing: border-box; }
body{
font-family:"Segoe UI", Arial, sans-serif;
color:hsl(210,20%,20%);
background:hsl(210,40%,97%);
line-height:1.6;
margin:20px;
}
h1{
font-size:2rem;
font-weight:700;
color:rgb(10,90,160);
border-bottom:3px solid rgba(10,90,160,0.5);
padding-bottom:5px;
}
.section{
margin-bottom:15px;
padding:15px;
border:2px solid hsl(210,20%,80%);
background:white;
border-radius:8px;
}
ul{ padding-left:20px; }
table{
width:100%;
border-collapse:collapse;
}
th,td{
border:1px solid rgb(180,180,180);
padding:10px;
}
th{
background:hsl(210,30%,90%);
}
</style>
</head>
<body>
<h1>My Portfolio</h1>
<div class="section">
<h2>About Me</h2>
<p>Hello! I am a web developer passionate about UI design and coding.</p>
</div>
<div class="section">
<h2>Skills</h2>
<ul>
<li>HTML, CSS, JavaScript</li>
<li>Spring Boot C MySQL</li>
<li>AWS Cloud</li>
</ul>
</div>
<div class="section">
<h2>Projects</h2>
<table>
<tr><th>Project</th><th>Year</th></tr>
<tr><td>Portfolio Website</td><td>2024</td></tr>
<tr><td>Student Portal</td><td>2023</td></tr>
</table>
</div>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Hard',
    tags: ['html', 'css', 'design']
  },
  // 18. Student List for Events
  {
    id: 'q18',
    co: 'CO1',
    question: 'Design an HTML page for listing students for the events and apply CSS.',
    answer: `<!DOCTYPE html>
<html>
<head>
<style>
*{ box-sizing: border-box; }
body{
font-family:"Calibri",sans-serif;
background:hsl(100,40%,96%);
margin:20px;
color:hsl(120,20%,20%);
line-height:1.5;
}
h1{
color:rgb(0,120,60);
font-size:2rem;
border-bottom:3px solid rgba(0,120,60,0.5);
padding-bottom:5px;
}
table{
width:100%;
border-collapse:collapse;
margin-top:15px;
}
th, td{
border:1px solid rgb(160,160,160);
padding:10px;
}
th{
background:hsl(120,20%,90%);
}
a{
color:rgb(0,100,200);
}
a:hover{
color:hsl(240,80%,40%);
text-decoration:underline;
}
img{
width:60px;
height:60px;
border-radius:6px;
}
</style>
</head>
<body>
<h1>Event Students</h1>
<table>
<tr><th>Photo</th><th>Name</th><th>Event</th><th>Profile</th></tr>
<tr><td><img src="https://via.placeholder.com/60"></td><td>Arjun</td><td>Quiz</td><td><a href="#">View</a></td></tr>
<tr><td><img src="https://via.placeholder.com/60"></td><td>Meera</td><td>Design</td><td><a href="#">View</a></td></tr>
</table>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Hard',
    tags: ['html', 'css', 'tables']
  },
  // 19. Employee Info
  {
    id: 'q19',
    co: 'CO1',
    question: 'Design an HTML page for display the employee information with their salary.',
    answer: `<!DOCTYPE html>
<html>
<head>
<style>
/* Simulating External CSS: style.css */
*{ box-sizing:border-box; }
body{
font-family:Arial,sans-serif;
background:hsl(200,40%,95%);
margin:20px;
color:hsl(200,20%,20%);
line-height:1.6;
}
h1{
font-size:2rem;
color:rgb(0,80,140);
border-bottom:3px solid rgba(0,80,140,0.4);
padding-bottom:5px;
}
.emp-card{
display:flex;
gap:20px;
background:white;
padding:20px;
border-radius:8px;
border:2px solid hsl(200,30%,80%);
}
img{
border-radius:8px;
}
</style>
<!-- <link rel="stylesheet" href="style.css"> -->
</head>
<body>
<h1>Employee Details</h1>
<div class="emp-card">
<img src="https://via.placeholder.com/100">
<p><b>Name:</b> Rahul<br><b>Role:</b> Manager<br><b>Salary:</b> ₹75,000</p>
</div>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Medium',
    tags: ['html', 'css', 'layout']
  },
  // 20. Course Info
  {
    id: 'q20',
    co: 'CO1',
    question: 'Design an HTML page to show a list of course information.',
    answer: `<!DOCTYPE html>
<html>
<head>
<style>
*{ box-sizing:border-box; }
body{
font-family:"Verdana",sans-serif;
color:hsl(10,20%,20%);
background:hsl(10,80%,96%);
margin:20px;
line-height:1.6;
}
h1{
color:rgb(200,50,50);
font-size:2rem;
border-bottom:3px solid rgba(200,50,50,0.4);
padding-bottom:5px;
}
.course-box{
border:2px solid hsl(10,30%,80%);
padding:15px;
margin-bottom:15px;
background:white;
border-radius:8px;
}
span{
color:hsl(10,40%,40%);
font-weight:600;
}
ul{ padding-left:20px; }
table{
width:100%;
border-collapse:collapse;
}
th,td{
border:1px solid rgb(180,180,180);
padding:10px;
}
</style>
</head>
<body>
<h1>Courses</h1>
<div class="course-box">
<p><span>Course:</span> Web Development</p>
<ul>
<li>HTML</li>
<li>CSS</li>
<li>JS</li>
</ul>
<table>
<tr><th>Module</th><th>Hours</th></tr>
<tr><td>Frontend Basics</td><td>40</td></tr>
<tr><td>Backend Basics</td><td>50</td></tr>
</table>
</div>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Medium',
    tags: ['html', 'css', 'layout']
  },
  // 21. College Website Homepage
  {
    id: 'q21',
    co: 'CO1',
    question: 'Create a homepage for a college website with headings, navigation links, and styled content.',
    answer: `<!DOCTYPE html>
<html>
<head>
<style>
/* college.css CONTENT */
*{ box-sizing:border-box; }
body{
font-family:Arial,sans-serif;
background:hsl(230,40%,96%);
margin:20px;
color:hsl(230,20%,20%);
}
header{
border-bottom:3px solid rgba(0,0,0,0.2);
padding-bottom:10px;
}
nav a{
margin-right:20px;
color:rgb(50,80,200);
text-decoration:none;
}
nav a:hover{
color:hsl(240,70%,40%);
}
</style>
</head>
<body>
<header>
<h1>ABC College</h1>
<nav>
<a href="#">Home</a>
<a href="#">Departments</a>
<a href="#">Admissions</a>
<a href="#">Contact</a>
</nav>
</header>
<section class="info">
<h2>Welcome</h2>
<p>Leading institution with quality education for students.</p>
</section>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Hard',
    tags: ['html', 'css', 'layout']
  },
  // 22. Article Layout
  {
    id: 'q22',
    co: 'CO1',
    question: 'Build an article layout using headings, subheadings, paragraphs.',
    answer: `<!DOCTYPE html>
<html>
<head>
<style>
*{ box-sizing:border-box; }
body{
font-family:"Georgia",serif;
background:hsl(50,40%,95%);
margin:30px;
color:hsl(50,20%,20%);
line-height:1.8;
}
.container{
padding:25px;
border:2px solid rgba(0,0,0,0.2);
border-radius:10px;
background:white;
}
h1{
font-size:2.4rem;
color:rgb(150,100,0);
letter-spacing:1px;
margin-bottom:15px;
}
h2{
font-size:1.8rem;
color:hsl(50,30%,30%);
margin-top:20px;
margin-bottom:10px;
}
p{
margin-bottom:15px;
text-align:justify;
}
</style>
</head>
<body>
<div class="container">
<h1>Impact of Technology</h1>
<h2>Introduction</h2>
<p>Technology affects all aspects of life, improving communication, healthcare, and education globally.</p>
<h2>Applications</h2>
<p>Automation, AI, and cloud computing are transforming industries and daily life.</p>
</div>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Medium',
    tags: ['html', 'typography']
  },
  // 23. Nested Content Student Profile
  {
    id: 'q23',
    co: 'CO1',
    question: 'Build an HTML page that uses nested content to display student info.',
    answer: `<!DOCTYPE html>
<html>
<head>
<style>
*{ box-sizing:border-box; }
body{
font-family:"Arial",sans-serif;
background:hsl(200,40%,96%);
margin:20px;
color:hsl(200,20%,20%);
}
.container{
border:2px solid rgba(0,0,0,0.2);
padding:20px;
border-radius:8px;
background:white;
}
ul{
padding-left:25px;
margin-top:10px;
}
li{
margin-bottom:8px;
}
a{
color:rgb(0,80,200);
text-decoration:none;
}
a:hover{
color:hsl(210,80%,40%);
text-decoration:underline;
}
</style>
</head>
<body>
<div class="container">
<h2>Student Profile</h2>
<ul>
<li>Name: Naveen</li>
<li>Department: CSE</li>
<li>Email: <a href="#">naveen@example.com</a></li>
<li>Interests:
<ul>
<li>AI</li>
<li>Web Development</li>
</ul>
</li>
</ul>
</div>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Medium',
    tags: ['html', 'lists']
  },
  // 24. Product Description
  {
    id: 'q24',
    co: 'CO1',
    question: 'Build a basic webpage that displays a product description.',
    answer: `<!DOCTYPE html>
<html>
<head>
<style>
*{ box-sizing:border-box; }
body{
font-family:"Segoe UI",sans-serif;
background:hsl(340,40%,96%);
margin:20px;
color:hsl(340,20%,20%);
line-height:1.6;
}
h1{
font-size:2rem;
font-weight:700;
color:rgb(180,0,90);
margin-bottom:10px;
}
p{
margin-bottom:15px;
}
a{
color:hsl(340,80%,40%);
text-decoration:none;
}
a:hover{
color:rgb(220,0,120);
text-decoration:underline;
}
</style>
</head>
<body>
<h1>Smartwatch X</h1>
<p>Advanced smartwatch with heart-rate monitoring, GPS, and water resistance.</p>
<p><strong>Price:</strong> ₹4999</p>
<p>More details: <a href="#">Click Here</a></p>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Easy',
    tags: ['html', 'css']
  },
  // 25. Textarea
  {
    id: 'q25',
    co: 'CO2', // Forms
    question: 'What is the use of the <textarea> tag?',
    answer: 'It is used to accept multi-line text input from the user.',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['html', 'forms']
  },
  // 26. Media Tags
  {
    id: 'q26',
    co: 'CO2', // Media
    question: 'Mention any two media tags in HTML.',
    answer: '<audio> and <video>',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['html', 'media']
  },
  // 27. Alt Attribute
  {
    id: 'q27',
    co: 'CO1',
    question: 'What is the purpose of the alt attribute?',
    answer: 'It provides alternative text for images, useful for accessibility and screen readers.',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['html', 'accessibility']
  },
  // 28. Hover Selector
  {
    id: 'q28',
    co: 'CO2', // Advanced CSS
    question: 'What does the CSS :hover selector do?',
    answer: 'It applies styles when the user places the mouse pointer over an element.',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['css', 'pseudo-classes']
  },
  // 29. Form Elements
  {
    id: 'q29',
    co: 'CO2', // Forms
    question: 'Explain different form elements used in HTML.',
    answer: '<input> (single-line), <textarea> (multi-line), <select>/<option> (dropdown), <button> (submit/reset).',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['html', 'forms']
  },
  // 30. Input Types
  {
    id: 'q30',
    co: 'CO2', // Forms
    question: 'Describe any four HTML input types.',
    answer: '1. text: Plain text\n2. email: Validates email\n3. number: Numeric values\n4. password: Hides input',
    type: 'short-answer',
    difficulty: 'Easy',
    tags: ['html', 'forms']
  },
  // 31. Aadhaar Validation
  {
    id: 'q31',
    co: 'CO2', // Forms/Validation
    question: 'Write HTML code to validate a 12-digit Aadhaar number.',
    answer: `<!DOCTYPE html>
<html>
<head><title>Aadhaar Validation</title></head>
<body>
<h2>Aadhaar Number Validation</h2>
<form>
<label>Aadhaar Number:</label><br>
<input type="text" placeholder="Enter 12-digit Aadhaar" pattern="[0-9]{12}" required>
<br><br>
<button type="submit">Verify</button>
</form>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Medium',
    tags: ['html', 'validation']
  },
  // 32. Mobile Validation
  {
    id: 'q32',
    co: 'CO2',
    question: 'Write the pattern for Indian mobile number validation.',
    answer: `<!DOCTYPE html>
<html>
<head><title>Mobile Number Validation</title></head>
<body>
<h2>Mobile Number Validation</h2>
<form>
<label>Mobile Number:</label><br>
<input type="text" placeholder="Enter mobile number" pattern="[0-9]{10}" required>
<br><br>
<button>Submit</button>
</form>
</body>
</html>`,
    type: 'code-snippet',
    difficulty: 'Medium',
    tags: ['html', 'validation']
  }
];
