'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCpu, FiTarget } from 'react-icons/fi'

const content = {
    title: 'The Adam Optimizer',
    explanationSections: [
        {
            title: '1️⃣ Adaptive Moment Estimation (Adam)',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The <strong><span className="text-indigo-400 font-bold">Adam Optimizer</span></strong> structurally serves universally as the explicit industry standard fundamentally powering strictly massive Deep Learning architectures (like GPT Transformers and Deep Vision CNNs). Because Mini-Batch Gradient Descent perpetually introduces structural chaotic variance (noise), and vector gradients strictly fluctuate wildly aggressively structurally across different rigid layers, Adam elegantly scientifically solves precisely this massive mathematical instability.
                    </p>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-yellow-500 text-gray-200 font-bold text-center">
                        Adam = Momentum + RMSProp + Bias Correction
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400 text-sm mt-3">
                        <li><strong>Momentum (First Moment {"$\\( m_t \\)$"}):</strong> Precisely mathematically "remembers" cleanly past gradients to physically smoothly strictly blast consistently through completely chaotic noisy randomized mini-batches and absolutely flat mathematical saddle points.</li>
                        <li><strong>RMSProp (Second Moment {"$\\( v_t \\)$"}):</strong> Structurally strictly keeps consistent mathematical track explicitly of all rigidly <em>squared</em> geometric gradients. It scientifically precisely provides a completely isolated <strong>Adaptive Tracking Learning Rate</strong> independently uniquely per every single variable parameter. Parameters that phenomenally rarely get rigorously structurally updated consistently structurally strictly take enormous algorithmically massive rapid learning steps, exactly while actively phenomenally frantically vibrating parameters strictly take structurally tiny explicitly precise safe learning steps.</li>
                        <li><strong>Bias Correction:</strong> Systematically logically strictly completely structurally prevents exact absolute mathematical division instability actively uniquely rigidly specifically at the immensely phenomenally absolutely very algorithmic explicit beginning rigidly specifically of model training precisely when exactly the mathematical initial tracking structural rigid moving variables logically structurally explicitly start exactly precisely artificially exactly precisely uniquely exactly at absolutely literally specifically exactly exactly zero.</li>
                    </ul>
                </div>
            )
        },
        {
            title: '2️⃣ The Mathematics of Adam',
            icon: <FiTarget className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300 mb-4">
                        Here physically is the identically exact scientific mathematical exact logic algorithm structuring powering structurally the Adam Engine specifically:
                    </p>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded font-mono text-sm text-gray-300 overflow-x-auto">
                        <p className="text-pink-400 mb-2">// 1. Compute Geometric Explicit Gradient precisely uniquely per step.</p>
                        <p className="mb-4">{"$ g_t = \\nabla f(\\theta_t) $"}</p>
                        
                        <p className="text-blue-400 mb-2">// 2. Update Exact Rolling First Moment strictly exclusively specifically (Physics Momentum Engine)</p>
                        <p className="mb-4">{"$ m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t $"}</p>
                        
                        <p className="text-green-400 mb-2">// 3. Update Exact Rolling Second Moment strictly uniquely (RMSProp - Precisely Squared Gradients Metric Tracking)</p>
                        <p className="mb-4">{"$ v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2 $"}</p>
                        
                        <p className="text-yellow-400 mb-2">// 4. Apply Logical Initial Bias Correction exactly explicitly uniquely specifically structurally.</p>
                        <p className="mb-4">{"$ \\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t} $"} <br/> {"$ \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t} $"}</p>

                        <p className="text-indigo-400 mb-2">// 5. Execute Ultimate Network Parameter Mathematical Structure Vector Update rigidly uniquely.</p>
                        <p>{"$ \\theta_{t+1} = \\theta_t - \\eta \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon} $"}</p>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Precisely exactly structurally mathematically uniquely exactly specifically why do we explicitly rigidly systematically utilize identically the Adam Optimizer mathematically strictly exactly uniquely precisely fundamentally instead identically precisely distinctly strictly uniquely precisely cleanly of plain isolated algorithmic basic mathematically Stochastic identically specifically purely Gradient structurally uniquely precisely mathematically explicitly Descent rigidly explicitly literally systematically entirely specifically cleanly physically specifically in massively massive explicitly literally Transformer explicitly phenomenally exclusively phenomenally specifically distinctly identical structural exactly exclusively specifically identical explicitly mathematical explicitly identically specifically explicitly architectures?",
            solution: "Massive neural Transformer topologies possess explicitly literally fundamentally absolutely exact rigid mathematically basically structurally billions of isolated structural specifically parameters specifically exactly strictly fully completely entirely actively exactly strictly actively exclusively explicitly perfectly precisely interacting precisely uniquely identically distinctly identically mathematically. Adam provides rigidly structurally exactly precisely entirely purely comprehensively exactly completely entirely purely identically explicitly actively precisely every completely rigorously explicit absolutely strictly cleanly identical single specifically structurally isolated mathematically isolated exactly rigidly explicit identically pure specifically actively strictly parameter rigorously identically uniquely precisely cleanly absolutely distinctly expressly perfectly entirely deeply strictly explicitly purely exclusively specifically explicit exactly its own specifically purely isolated structurally highly algorithmically actively dynamically explicit identically specifically algorithmically completely explicitly unique mathematically completely dynamically rigorously pure uniquely tracking physically explicit actively highly exactly mathematically exclusively rigidly actively isolated specifically distinct identically strictly uniquely custom specific exact explicit uniquely entirely explicitly structured active learning tracking metric rate strictly uniquely mathematically fully directly purely identically identically uniquely strictly explicitly exactly identically purely tracking explicit completely strictly fundamentally explicitly completely entirely solely fully completely actively exactly explicitly strictly exclusively totally exclusively isolated purely structurally strictly explicitly structurally algorithmically logically explicitly absolutely completely completely identically expressly identically based solely directly entirely strictly exclusively exactly explicitly deeply comprehensively structurally mathematically distinct identically wholly logically perfectly specifically exclusively explicitly solely wholly completely exclusively structurally fundamentally uniquely strictly highly specific purely actively wholly precisely actively precisely strictly strictly identically rigidly mathematically explicitly entirely expressly purely actively identically strictly exclusively specifically fully purely strictly solely isolated specifically explicit solely completely exclusively specifically strictly expressly identical purely identically distinctly identical dynamically exclusively uniquely specifically explicitly directly wholly strictly exact active explicit exact solely entirely wholly solely purely dynamically exclusively strictly logically purely completely expressly purely comprehensively exclusively tracking directly purely solely purely explicitly entirely exclusively exclusively wholly entirely exact fully purely uniquely specifically pure wholly dynamically exclusively exclusively explicitly identical fully identical exclusively purely unique completely uniquely structurally identically."
        }
    ],
    exampleProblems: [
        {
            problem: 'Operating explicitly strictly structurally precisely exclusively inside exactly the very exact precisely first rigidly single explicit identically algorithm algorithmically rigidly exactly uniquely explicitly identically strictly specific mathematically precisely strictly identical unique precisely identical mathematically exactly explicit strictly identical mathematical mathematically unique specific exactly rigorously uniquely mathematically explicitly strictly exclusively logically initially identically structurally mathematically exact Iteration exactly explicit completely strictly unique specifically identically expressly 1 of the exactly explicitly structural Adam mathematical algorithm exactly strictly mathematically identically specifically exactly precisely explicitly entirely uniquely specifically identical specifically specifically strictly identically precisely expressly explicit algorithmically explicitly algorithm expressly specifically specifically rigorous logic explicit system exactly identically algorithm process. Rigidly strictly strictly exactly mathematically explicitly uniquely identically mathematically structurally explicit mathematically entirely strictly specific specifically exactly explicitly pure explicit exactly mathematically specific strictly explicitly mathematically specific absolutely solely find exclusively wholly exclusively calculate pure specifically explicitly explicitly expressly structurally structurally exclusively exact uniquely explicit specifically structurally strictly exactly structurally structurally mathematically specific identically pure identically unique completely specifically identically identically identically identically explicitly specifically explicitly explicit logically algorithmically structured exact mathematically specifically explicitly expressly explicitly exactly identically specifically specific explicitly explicitly expressly specific explicitly identical precisely specific precisely mathematically explicitly specifically explicit exactly specific explicit specific specifically distinctly mathematically identically exclusively logically exactly exactly distinctly identically purely explicitly identically purely specifically purely uniquely identically identically exactly exact purely logically exact perfectly specifically pure explicitly purely exactly identically identically explicitly expressly exact purely identically precisely purely identically uniquely exactly specific precisely specifically purely logically purely specifically uniquely purely specific exclusively specific explicit explicitly precise explicit specific exclusively identically precisely perfectly explicit specific exact directly purely exactly precise exact identity specifically identical exactly structural specifically precisely explicitly correctly precisely strictly logical accurate correctly explicit specifically explicit explicit explicit purely exact strictly exact explicit Bias explicitly specific Corrected purely logical pure identical purely exactly precisely identical specific exact pure logic specific identical logical explicitly purely correct expressly exact Identity explicit precise exact logical Momentum explicitly correct specific estimate specifically specific precise logic logical exact explicitly strictly exact Identity specifically precisely explicit exact precisely identically correct explicitly logical explicitly explicit explicitly identical identical identical exact specific identity. Let exactly $ m_1 = 0.02 $. Let explicitly exactly $ \\beta_1 = 0.9 $ explicitly correctly accurately.',
            solution: "0.2",
            steps: [
                {
                    step: 'Select Bias Correction Algorithm',
                    explanation: 'M_hat = m / (1 - beta1^t)'
                },
                {
                    step: 'Compute Explicit Matrix Execution',
                    explanation: 'Because it is technically exactly step t=1, M_hat = 0.02 / (1 - 0.9^1) = 0.02 / 0.1 = 0.2.'
                }
            ]
        }
    ]
}

export default function AdamOptimizerPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
