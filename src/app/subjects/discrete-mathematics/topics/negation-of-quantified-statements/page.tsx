'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiAlertTriangle, FiRepeat } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'Negation of Quantified Statements',
    explanationSections: [
        {
            title: '❗ De Morgan\'s Laws for Quantifiers',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <span className="text-cyan-400 font-semibold text-lg">Negating Quantifiers</span> involves switching the quantifier and negating the predicate.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-amber-300 font-semibold mb-2">Rules:</p>
                        <div className="space-y-4">
                            <div>
                                <MathRenderer display math="\neg \forall x P(x) \equiv \exists x \neg P(x)" />
                                <p className="text-gray-300 ml-4">"Not all x have property P" is equivalent to "There exists an x that does not have property P".</p>
                            </div>
                            <div>
                                <MathRenderer display math="\neg \exists x P(x) \equiv \forall x \neg P(x)" />
                                <p className="text-gray-300 ml-4">"There does not exist an x with property P" is equivalent to "For all x, x does not have property P".</p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            formula: '\\neg \\forall x P(x) \\equiv \\exists x \\neg P(x)',
        },
        {
            title: '🌀 Negating Nested Quantifiers',
            icon: <FiRepeat className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">When negating nested quantifiers, move the negation from left to right, flipping each quantifier as you pass it.</p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <p className="text-lime-300 font-semibold mb-2">Example:</p>
                        <div className="space-y-2">
                            <MathRenderer display math="\neg \forall x \exists y P(x, y)" />
                            <MathRenderer display math="\equiv \exists x \neg \exists y P(x, y)" />
                            <MathRenderer display math="\equiv \exists x \forall y \neg P(x, y)" />
                        </div>
                    </div>
                </div>
            ),
            formula: '\\neg \\forall x \\exists y P(x, y) \\equiv \\exists x \\forall y \\neg P(x, y)',
        },
    ],
    practiceQuestions: [
        {
            question: (
                <span>
                    Negate the statement: "Every student in this class has taken a course in Java."
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">Let <MathRenderer math="S(x)" /> be "x is a student in this class" and <MathRenderer math="J(x)" /> be "x has taken a course in Java".</p>
                    <p className="text-gray-300">Original: <MathRenderer math="\forall x (S(x) \rightarrow J(x))" /></p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-cyan-300 font-semibold">Negation:</p>
                        <p className="text-gray-300"><MathRenderer math="\neg \forall x (S(x) \rightarrow J(x))" /></p>
                        <p className="text-gray-300"><MathRenderer math="\equiv \exists x \neg (S(x) \rightarrow J(x))" /></p>
                        <p className="text-gray-300"><MathRenderer math="\equiv \exists x (S(x) \land \neg J(x))" /></p>
                    </div>
                    <p className="text-green-400 font-semibold">English: "There is a student in this class who has NOT taken a course in Java."</p>
                </div>
            ),
        },
        {
            question: (
                <span>
                    Negate: "There is a politician who is honest."
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">Original: <MathRenderer math="\exists x (P(x) \land H(x))" /></p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-cyan-300 font-semibold">Negation:</p>
                        <p className="text-gray-300"><MathRenderer math="\neg \exists x (P(x) \land H(x))" /></p>
                        <p className="text-gray-300"><MathRenderer math="\equiv \forall x \neg (P(x) \land H(x))" /></p>
                        <p className="text-gray-300"><MathRenderer math="\equiv \forall x (\neg P(x) \lor \neg H(x))" /></p>
                    </div>
                    <p className="text-green-400 font-semibold">English: "For every person, they are either not a politician or not honest" (or "No politician is honest").</p>
                </div>
            ),
        },
    ],
    exampleProblems: [
        {
            problem: (
                <span>
                    Negate the definition of limit: <MathRenderer math="\forall \epsilon > 0 \exists \delta > 0 \forall x (0 < |x-a| < \delta \rightarrow |f(x)-L| < \epsilon)" />
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <MathRenderer display math="\exists \epsilon > 0 \forall \delta > 0 \exists x (0 < |x-a| < \delta \land |f(x)-L| \ge \epsilon)" />
                </div>
            ),
            steps: [
                {
                    step: 'Negate first quantifier',
                    explanation: (
                        <span>
                            <MathRenderer math="\neg \forall \epsilon > 0 ..." /> becomes <MathRenderer math="\exists \epsilon > 0 \neg ..." />
                        </span>
                    ),
                },
                {
                    step: 'Negate second quantifier',
                    explanation: (
                        <span>
                            <MathRenderer math="\exists \epsilon > 0 \neg \exists \delta > 0 ..." /> becomes <MathRenderer math="\exists \epsilon > 0 \forall \delta > 0 \neg ..." />
                        </span>
                    ),
                },
                {
                    step: 'Negate third quantifier',
                    explanation: (
                        <span>
                            <MathRenderer math="\exists \epsilon > 0 \forall \delta > 0 \neg \forall x ..." /> becomes <MathRenderer math="\exists \epsilon > 0 \forall \delta > 0 \exists x \neg ..." />
                        </span>
                    ),
                },
                {
                    step: 'Negate implication',
                    explanation: (
                        <span>
                            <MathRenderer math="\neg (P \rightarrow Q) \equiv P \land \neg Q" />.<br />
                            So, <MathRenderer math="\neg (0 < |x-a| < \delta \rightarrow |f(x)-L| < \epsilon)" /><br />
                            becomes <MathRenderer math="(0 < |x-a| < \delta \land |f(x)-L| \ge \epsilon)" />.
                        </span>
                    ),
                },
            ],
            formula: '\\exists \\epsilon > 0 \\forall \\delta > 0 \\exists x (0 < |x-a| < \\delta \\land |f(x)-L| \\ge \\epsilon)',
        },
    ],
}

export default function NegationOfQuantifiedStatementsPage() {
    return <DMTopicPage content={content} />
}
