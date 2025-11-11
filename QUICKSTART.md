# Quick Start Guide

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── topics/            # Topic pages
│   │   ├── input-output/
│   │   ├── operators/
│   │   ├── conditionals/
│   │   ├── loops/
│   │   ├── nested-loops/
│   │   ├── arrays1d/
│   │   ├── arrays2d/
│   │   ├── methods/
│   │   └── encapsulation/
│   ├── visualizer/        # Dry run visualizer page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── TopicCard.tsx
│   ├── CodeBlock.tsx
│   ├── DryRunVisualizer.tsx
│   ├── Sidebar.tsx
│   ├── TopicPage.tsx
│   ├── ThemeToggle.tsx
│   └── ThemeProvider.tsx
└── data/                  # Data files
    └── topics.ts          # Topic definitions
```

## 🎨 Features

### ✅ Implemented

- ✅ Home page with hero section and animated topic cards
- ✅ 9 topic pages with explanations, examples, and practice exercises
- ✅ Dry run visualizer with step-by-step code execution
- ✅ Glassmorphism UI design
- ✅ Light/Dark mode toggle
- ✅ Responsive design
- ✅ Framer Motion animations
- ✅ Syntax highlighting for Java code
- ✅ Animated background particles

### 🔄 How It Works

1. **Navigation**: Use the navbar to navigate between pages
2. **Topics**: Browse topics from the home page or topics page
3. **Learning**: Each topic has three tabs:
   - **Explanation**: Conceptual overview
   - **Example**: Code examples with syntax highlighting
   - **Practice**: Practice exercises
4. **Dry Run**: Click "Show Dry Run Visualization" to see step-by-step execution
5. **Visualizer**: Dedicated page with multiple dry run examples

## 🛠️ Development

### Adding a New Topic

1. Add topic to `src/data/topics.ts`
2. Create new page in `src/app/topics/[topic-name]/page.tsx`
3. Use the `TopicPage` component with content object

### Customizing Dry Run Steps

Dry run steps are defined as an array of `DryRunStep` objects:

```typescript
{
  line: number,           // Line number in code
  vars: {},              // Variable states
  output: string,        // Console output
  description?: string,  // Step description
  arrayState?: [],       // Array visualization
  conditionResult?: boolean  // Condition evaluation
}
```

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Vercel auto-detects Next.js
4. Deploy!

### Manual Build

```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Build Errors

- Make sure all dependencies are installed: `npm install`
- Check TypeScript errors: `npm run lint`
- Clear Next.js cache: `rm -rf .next`

### Theme Issues

- Theme is stored in localStorage
- Default theme is dark
- Theme persists across page reloads

## 📝 Notes

- All pages are statically generated for optimal performance
- Dry run visualizations use mock data (can be extended to use a code parser)
- Code syntax highlighting uses Prism.js
- Animations use Framer Motion
- UI uses Tailwind CSS with custom glassmorphism styles

## 🎯 Next Steps

- Add more topics and examples
- Implement code parser for automatic dry run generation
- Add user authentication for saving progress
- Add quiz/test functionality
- Implement code editor with live execution

