# JavaPrepHub

A visually stunning, animated, and educational website where students can learn Java programming through interactive examples and dry run visualizations.

## Features

- 📚 **Read Java Concepts**: Comprehensive explanations of Java topics
- 💻 **Practice Examples**: Hands-on coding examples and exercises
- 👁️ **Visualize Dry Runs**: Step-by-step execution visualization with variable tracking
- 🎨 **Beautiful UI**: Glassmorphism design with smooth animations
- 🌓 **Light/Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Code Highlighting**: react-syntax-highlighter
- **Icons**: react-icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BabuHub
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
javaprephub/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── topics/
│   │   │   ├── input-output/
│   │   │   ├── operators/
│   │   │   ├── conditionals/
│   │   │   ├── loops/
│   │   │   ├── nested-loops/
│   │   │   ├── arrays1d/
│   │   │   ├── arrays2d/
│   │   │   ├── methods/
│   │   │   └── encapsulation/
│   │   ├── visualizer/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── TopicCard.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── DryRunVisualizer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopicPage.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ThemeProvider.tsx
│   └── data/
│       └── topics.ts
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Topics Covered

1. **Input/Output** - Reading and writing data
2. **Operators** - Arithmetic, logical, and relational operators
3. **Conditionals** - if, else, switch statements
4. **Loops** - for, while, do-while loops
5. **Nested Loops** - Loops within loops
6. **1D Arrays** - Single-dimensional arrays
7. **2D Arrays** - Two-dimensional arrays
8. **Methods** - Functions and methods in Java
9. **Encapsulation** - Data hiding and access modifiers

## Dry Run Visualizer

The dry run visualizer allows students to:
- Step through code execution line by line
- See variable values update in real-time
- Visualize array traversals with highlighted elements
- Understand condition evaluations
- Control playback speed
- Navigate manually through steps

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Build for Production

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Made with ❤️ by Students for Students

---

For questions or support, please open an issue on GitHub.

