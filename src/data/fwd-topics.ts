export interface Topic {
    id: string
    title: string
    description: string
    icon: string
    href: string
    co?: string
}

export const fwdTopics: Topic[] = [
    // CO1 — Internet Fundamentals, HTML & Introductory CSS
    {
        id: 'internet-web-concepts',
        title: '1. Internet & Web Concepts',
        description: 'Internet fundamentals, HTTP vs HTTPS, Client–Server Architecture',
        icon: '🌐',
        href: '/subjects/web-development/topics/CO1/internet-web-concepts',
        co: 'CO1',
    },
    {
        id: 'browser-basics',
        title: '2. Browser Basics',
        description: 'Rendering process, Developer tools',
        icon: '🖥️',
        href: '/subjects/web-development/topics/CO1/browser-basics',
        co: 'CO1',
    },
    {
        id: 'web-hosting-domains',
        title: '3. Web Hosting & Domains',
        description: 'Understanding web hosting, domain names, and DNS',
        icon: '☁️',
        href: '/subjects/web-development/topics/CO1/web-hosting-domains',
        co: 'CO1',
    },
    {
        id: 'html-document-structure',
        title: '4. HTML Document Structure',
        description: 'HTML5 structure: html, head, body tags',
        icon: '📄',
        href: '/subjects/web-development/topics/CO1/html-document-structure',
        co: 'CO1',
    },
    {
        id: 'html-content-tags',
        title: '5. HTML Content Tags',
        description: 'Headings, Paragraphs, Lists, Links, Images',
        icon: '📝',
        href: '/subjects/web-development/topics/CO1/html-content-tags',
        co: 'CO1',
    },
    {
        id: 'introductory-css',
        title: '6. Introductory CSS',
        description: 'Syntax, Selectors, Typography, Colors, Box Model',
        icon: '🎨',
        href: '/subjects/web-development/topics/CO1/introductory-css',
        co: 'CO1',
    },
    {
        id: 'practice-exercises',
        title: '7. Practice Exercises',
        description: 'Hands-on coding tasks and implementation practice',
        icon: '💻',
        href: '/subjects/web-development/topics/CO1/practice-exercises',
        co: 'CO1',
    },

    // CO2 — HTML Forms, Semantic Tags & Comprehensive CSS Layouts
    {
        id: 'html-forms-input',
        title: '1. HTML Forms & Input Handling',
        description: 'Form elements, input types, attributes, HTML5 validation',
        icon: '📋',
        href: '/subjects/web-development/topics/CO2/html-forms-input',
        co: 'CO2',
    },
    {
        id: 'semantic-structured-content',
        title: '2. Semantic & Structured Content',
        description: 'Semantic tags (header, nav...), tables, media tags, accessibility',
        icon: '🏗️',
        href: '/subjects/web-development/topics/CO2/semantic-structured-content',
        co: 'CO2',
    },
    {
        id: 'advanced-css',
        title: '3. Advanced CSS',
        description: 'Pseudo-classes, typography (line-height, font-weight)',
        icon: '✨',
        href: '/subjects/web-development/topics/CO2/advanced-css',
        co: 'CO2',
    },
    {
        id: 'layout-systems',
        title: '4. Layout Systems',
        description: 'Flexbox, CSS Grid, Block/Inline models',
        icon: '📐',
        href: '/subjects/web-development/topics/CO2/layout-systems',
        co: 'CO2',
    },
    {
        id: 'responsive-design',
        title: '5. Responsive Design',
        description: 'Media queries, breakpoints, mobile-first approach',
        icon: '📱',
        href: '/subjects/web-development/topics/CO2/responsive-design',
        co: 'CO2',
    },
    {
        id: 'transitions-animations',
        title: '6. Transitions & Animations',
        description: 'CSS transitions, keyframes, animations',
        icon: '🎬',
        href: '/subjects/web-development/topics/CO2/transitions-animations',
        co: 'CO2',
    },
    {
        id: 'modern-css',
        title: '7. Modern CSS',
        description: 'CSS variables (calc, var), SCSS basics, Bootstrap utilities',
        icon: '💅',
        href: '/subjects/web-development/topics/CO2/modern-css',
        co: 'CO2',
    },

    {
        id: 'practice-exercises-co2',
        title: '8. Practice Exercises (CO2)',
        description: 'Forms, Tables, and Layout challenges',
        icon: '🏋️',
        href: '/subjects/web-development/topics/CO2/practice-exercises',
        co: 'CO2',
    },

    // CO3 — JavaScript Programming Essentials
    {
        id: 'javascript-basics',
        title: '1. JavaScript Basics',
        description: 'Expressions, operators, conditions, loops',
        icon: '📜',
        href: '/subjects/web-development/topics/CO3/javascript-basics',
        co: 'CO3',
    },
    {
        id: 'functions',
        title: '2. Functions',
        description: 'Normal functions, arrow functions, callbacks',
        icon: '🔧',
        href: '/subjects/web-development/topics/CO3/functions',
        co: 'CO3',
    },
    {
        id: 'objects-arrays',
        title: '3. Objects & Arrays',
        description: 'Objects, properties, methods, inheritance, array methods',
        icon: '📦',
        href: '/subjects/web-development/topics/CO3/objects-arrays',
        co: 'CO3',
    },
    {
        id: 'number-literals',
        title: '4. Number Literals',
        description: 'Hexadecimal, scientific notation',
        icon: '🔢',
        href: '/subjects/web-development/topics/CO3/number-literals',
        co: 'CO3',
    },

    // CO4 — JavaScript Interactivity & DOM
    {
        id: 'dom-fundamentals',
        title: '1. DOM Fundamentals',
        description: 'DOM tree structure, selecting elements',
        icon: '🌳',
        href: '/subjects/web-development/topics/CO4/dom-fundamentals',
        co: 'CO4',
    },
    {
        id: 'event-handling',
        title: '2. Event Handling',
        description: 'Click, input, submit, change events',
        icon: '🖱️',
        href: '/subjects/web-development/topics/CO4/event-handling',
        co: 'CO4',
    },
    {
        id: 'dom-manipulation',
        title: '3. DOM Manipulation',
        description: 'innerHTML, textContent, style updates',
        icon: '✏️',
        href: '/subjects/web-development/topics/CO4/dom-manipulation',
        co: 'CO4',
    },
    {
        id: 'browser-storage',
        title: '4. Browser Storage',
        description: 'localStorage, sessionStorage API',
        icon: '💾',
        href: '/subjects/web-development/topics/CO4/browser-storage',
        co: 'CO4',
    },
    {
        id: 'async-javascript',
        title: '5. Asynchronous JavaScript',
        description: 'Fetch API, async/await, Promises',
        icon: '⏳',
        href: '/subjects/web-development/topics/CO4/async-javascript',
        co: 'CO4',
    },

    // CO5 — Advanced Web Development & Deployment
    {
        id: 'exception-handling',
        title: '1. Exception Handling',
        description: 'try/catch/throw usage in JS',
        icon: '⚠️',
        href: '/subjects/web-development/topics/CO5/exception-handling',
        co: 'CO5',
    },
    {
        id: 'es6-modules',
        title: '2. ES6 Modules',
        description: 'Import / Export syntax',
        icon: '🧩',
        href: '/subjects/web-development/topics/CO5/es6-modules',
        co: 'CO5',
    },
    {
        id: 'form-validation-js',
        title: '3. Form Validation with JavaScript',
        description: 'Custom validation logic',
        icon: '✅',
        href: '/subjects/web-development/topics/CO5/form-validation-js',
        co: 'CO5',
    },
    {
        id: 'api-integration',
        title: '4. API Integration',
        description: 'Integrating external APIs',
        icon: '🔌',
        href: '/subjects/web-development/topics/CO5/api-integration',
        co: 'CO5',
    },
    {
        id: 'performance-optimization',
        title: '5. Performance Optimization',
        description: 'Minification, compression, lazy loading',
        icon: '🚀',
        href: '/subjects/web-development/topics/CO5/performance-optimization',
        co: 'CO5',
    },
    {
        id: 'seo-fundamentals',
        title: '6. SEO Fundamentals',
        description: 'Meta tags, basic SEO strategies',
        icon: '🔍',
        href: '/subjects/web-development/topics/CO5/seo-fundamentals',
        co: 'CO5',
    },
    {
        id: 'web-security-deployment',
        title: '7. Web Security & Deployment',
        description: 'CORS, deployment basics',
        icon: '🔒',
        href: '/subjects/web-development/topics/CO5/web-security-deployment',
        co: 'CO5',
    },

    // Extras
    {
        id: 'question-bank',
        title: '🎓 Question Bank (Full)',
        description: 'Exam preparation, visuals, and deep-dive solutions',
        icon: '📚',
        href: '/subjects/web-development/extras/questions',
        co: 'EXTRAS',
    },
]
