'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DryRunVisualizer, { DryRunStep } from '@/components/DryRunVisualizer'
import CodeBlock from '@/components/CodeBlock'

const examples = [
  {
    title: 'Simple Loop',
    code: `public class SimpleLoop {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
    steps: [
      {
        line: 3,
        vars: { i: 1 },
        output: '',
        description: 'Initializing loop: i = 1, condition (1 <= 5 is true)',
      },
      {
        line: 4,
        vars: { i: 1 },
        output: '1 ',
        description: 'First iteration: printing i = 1',
      },
      {
        line: 3,
        vars: { i: 2 },
        output: '1 ',
        description: 'Updating i to 2, condition (2 <= 5 is true)',
      },
      {
        line: 4,
        vars: { i: 2 },
        output: '1 2 ',
        description: 'Second iteration: printing i = 2',
      },
      {
        line: 3,
        vars: { i: 3 },
        output: '1 2 ',
        description: 'Updating i to 3, condition (3 <= 5 is true)',
      },
      {
        line: 4,
        vars: { i: 3 },
        output: '1 2 3 ',
        description: 'Third iteration: printing i = 3',
      },
      {
        line: 3,
        vars: { i: 4 },
        output: '1 2 3 ',
        description: 'Updating i to 4, condition (4 <= 5 is true)',
      },
      {
        line: 4,
        vars: { i: 4 },
        output: '1 2 3 4 ',
        description: 'Fourth iteration: printing i = 4',
      },
      {
        line: 3,
        vars: { i: 5 },
        output: '1 2 3 4 ',
        description: 'Updating i to 5, condition (5 <= 5 is true)',
      },
      {
        line: 4,
        vars: { i: 5 },
        output: '1 2 3 4 5 ',
        description: 'Fifth iteration: printing i = 5',
      },
      {
        line: 3,
        vars: { i: 6 },
        output: '1 2 3 4 5 ',
        description: 'Updating i to 6, condition (6 <= 5 is false) - exiting loop',
      },
      {
        line: 5,
        vars: {},
        output: '1 2 3 4 5 \\n',
        description: 'Printing newline after loop completes',
      },
    ] as DryRunStep[],
  },
  {
    title: 'Array Traversal',
    code: `public class ArrayTraversal {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}`,
    steps: [
      {
        line: 3,
        vars: {},
        output: '',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20 },
          { index: 2, value: 30 },
          { index: 3, value: 40 },
          { index: 4, value: 50 },
        ],
        description: 'Initializing array with values',
      },
      {
        line: 5,
        vars: { i: 0 },
        output: '',
        arrayState: [
          { index: 0, value: 10, highlighted: true },
          { index: 1, value: 20 },
          { index: 2, value: 30 },
          { index: 3, value: 40 },
          { index: 4, value: 50 },
        ],
        description: 'Loop: i = 0, condition (0 < 5 is true), accessing arr[0]',
      },
      {
        line: 6,
        vars: { i: 0 },
        output: '10 ',
        arrayState: [
          { index: 0, value: 10, highlighted: true },
          { index: 1, value: 20 },
          { index: 2, value: 30 },
          { index: 3, value: 40 },
          { index: 4, value: 50 },
        ],
        description: 'Printing arr[0] = 10',
      },
      {
        line: 5,
        vars: { i: 1 },
        output: '10 ',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20, highlighted: true },
          { index: 2, value: 30 },
          { index: 3, value: 40 },
          { index: 4, value: 50 },
        ],
        description: 'Loop: i = 1, condition (1 < 5 is true), accessing arr[1]',
      },
      {
        line: 6,
        vars: { i: 1 },
        output: '10 20 ',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20, highlighted: true },
          { index: 2, value: 30 },
          { index: 3, value: 40 },
          { index: 4, value: 50 },
        ],
        description: 'Printing arr[1] = 20',
      },
      {
        line: 5,
        vars: { i: 2 },
        output: '10 20 ',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20 },
          { index: 2, value: 30, highlighted: true },
          { index: 3, value: 40 },
          { index: 4, value: 50 },
        ],
        description: 'Loop: i = 2, condition (2 < 5 is true), accessing arr[2]',
      },
      {
        line: 6,
        vars: { i: 2 },
        output: '10 20 30 ',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20 },
          { index: 2, value: 30, highlighted: true },
          { index: 3, value: 40 },
          { index: 4, value: 50 },
        ],
        description: 'Printing arr[2] = 30',
      },
      {
        line: 5,
        vars: { i: 3 },
        output: '10 20 30 ',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20 },
          { index: 2, value: 30 },
          { index: 3, value: 40, highlighted: true },
          { index: 4, value: 50 },
        ],
        description: 'Loop: i = 3, condition (3 < 5 is true), accessing arr[3]',
      },
      {
        line: 6,
        vars: { i: 3 },
        output: '10 20 30 40 ',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20 },
          { index: 2, value: 30 },
          { index: 3, value: 40, highlighted: true },
          { index: 4, value: 50 },
        ],
        description: 'Printing arr[3] = 40',
      },
      {
        line: 5,
        vars: { i: 4 },
        output: '10 20 30 40 ',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20 },
          { index: 2, value: 30 },
          { index: 3, value: 40 },
          { index: 4, value: 50, highlighted: true },
        ],
        description: 'Loop: i = 4, condition (4 < 5 is true), accessing arr[4]',
      },
      {
        line: 6,
        vars: { i: 4 },
        output: '10 20 30 40 50 ',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20 },
          { index: 2, value: 30 },
          { index: 3, value: 40 },
          { index: 4, value: 50, highlighted: true },
        ],
        description: 'Printing arr[4] = 50',
      },
      {
        line: 5,
        vars: { i: 5 },
        output: '10 20 30 40 50 ',
        arrayState: [
          { index: 0, value: 10 },
          { index: 1, value: 20 },
          { index: 2, value: 30 },
          { index: 3, value: 40 },
          { index: 4, value: 50 },
        ],
        description: 'Loop: i = 5, condition (5 < 5 is false) - exiting loop',
      },
    ] as DryRunStep[],
  },
  {
    title: 'Conditional Statement',
    code: `public class Conditional {
    public static void main(String[] args) {
        int num = 15;
        
        if (num > 10) {
            System.out.println("Number is greater than 10");
        } else {
            System.out.println("Number is less than or equal to 10");
        }
    }
}`,
    steps: [
      {
        line: 3,
        vars: { num: 15 },
        output: '',
        description: 'Initializing num variable',
      },
      {
        line: 5,
        vars: { num: 15 },
        output: '',
        conditionResult: true,
        description: 'Checking condition (15 > 10 is true)',
      },
      {
        line: 6,
        vars: { num: 15 },
        output: 'Number is greater than 10\\n',
        description: 'Executing if block: printing message',
      },
    ] as DryRunStep[],
  },
]

export default function VisualizerPage() {
  const [selectedExample, setSelectedExample] = useState(0)

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Dry Run Visualizer
          </h1>
          <p className="text-xl text-gray-300">
            Step through Java code execution and see how variables change in real-time
          </p>
        </motion.div>

        {/* Example Selector */}
        <div className="glass-card mb-8">
          <h2 className="text-2xl font-bold mb-4">Select Example</h2>
          <div className="flex gap-4 flex-wrap">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  selectedExample === index
                    ? 'bg-blue-600 text-white'
                    : 'glass hover:bg-blue-500/20 text-gray-300'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>

        {/* Visualizer */}
        <DryRunVisualizer
          code={examples[selectedExample].code}
          steps={examples[selectedExample].steps}
          title={examples[selectedExample].title}
        />

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card mt-8"
        >
          <h3 className="text-xl font-bold mb-4">How to Use</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Click <strong>Play</strong> to automatically step through the code</li>
            <li>• Use <strong>Next</strong> and <strong>Previous</strong> to navigate manually</li>
            <li>• Adjust the <strong>Speed</strong> slider to control playback speed</li>
            <li>• Watch how variables change and arrays are traversed</li>
            <li>• The highlighted line shows the current execution point</li>
          </ul>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}

