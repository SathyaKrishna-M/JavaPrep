'use client'

import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react'
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType,
  ConnectionMode,
  NodeTypes,
  Position,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { motion } from 'framer-motion'
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiRefreshCw } from 'react-icons/fi'
import dagre from 'dagre'

export interface FlowStep {
  id: string
  label: string
  type: 'start' | 'process' | 'decision' | 'io' | 'end'
}

export interface FlowEdge {
  id: string
  source: string
  target: string
  label?: string // "Yes", "No", "Loop", etc.
}

interface AnimatedFlowchartProps {
  nodes?: FlowStep[]
  edges?: FlowEdge[]
  steps?: FlowStep[] // Legacy support
  autoPlay?: boolean
  onStepChange?: (stepIndex: number) => void
}

// Node dimensions
const NODE_WIDTH = 180
const NODE_HEIGHT = 60
const DECISION_WIDTH = 140
const DECISION_HEIGHT = 140
const START_END_WIDTH = 120
const START_END_HEIGHT = 60

// Custom node component with proper shapes
const CustomNode = ({ data, selected }: any) => {
  const nodeType = data.type
  const isActive = data.isActive

  // Start/End nodes - Ovals/Circles
  if (nodeType === 'start' || nodeType === 'end') {
    return (
      <div
        className={`flex items-center justify-center text-center transition-all duration-300 rounded-full ${
          isActive
            ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-cyan-300 text-white shadow-[0_0_20px_rgba(23,230,255,0.6)]'
            : 'bg-gray-800/80 border border-cyan-500/30 text-gray-200'
        }`}
        style={{
          width: START_END_WIDTH,
          height: START_END_HEIGHT,
        }}
        tabIndex={0}
        role="button"
        aria-label={`${nodeType} node: ${data.label}`}
      >
        <div className="px-4 text-xs font-medium leading-tight">{data.label}</div>
      </div>
    )
  }

  // Decision nodes - Diamonds
  if (nodeType === 'decision') {
    return (
      <div
        className={`relative transition-all duration-300 ${
          isActive
            ? 'shadow-[0_0_20px_rgba(23,230,255,0.6)]'
            : ''
        }`}
        style={{
          width: DECISION_WIDTH,
          height: DECISION_HEIGHT,
        }}
        tabIndex={0}
        role="button"
        aria-label={`decision node: ${data.label}`}
      >
        {/* Diamond shape */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-cyan-300'
              : 'bg-gray-800/80 border border-cyan-500/30'
          }`}
          style={{
            transform: 'rotate(45deg)',
            borderRadius: '8px',
          }}
        />
        {/* Label container (unrotated) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: 'rotate(-45deg)' }}
        >
          <div
            className={`text-xs font-medium text-center px-3 leading-tight ${
              isActive ? 'text-white' : 'text-gray-200'
            }`}
          >
            {data.label}
          </div>
        </div>
      </div>
    )
  }

  // I/O nodes - Parallelogram (treated as process for now, can be skewed)
  if (nodeType === 'io') {
    return (
      <div
        className={`flex items-center justify-center text-center transition-all duration-300 rounded-lg ${
          isActive
            ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-cyan-300 text-white shadow-[0_0_20px_rgba(23,230,255,0.6)]'
            : 'bg-gray-800/80 border border-cyan-500/30 text-gray-200'
        }`}
        style={{
          width: NODE_WIDTH,
          minHeight: NODE_HEIGHT,
          padding: '12px',
        }}
        tabIndex={0}
        role="button"
        aria-label={`I/O node: ${data.label}`}
      >
        <div className="text-xs font-medium leading-tight px-2">{data.label}</div>
      </div>
    )
  }

  // Process nodes - Rounded rectangles
  return (
    <div
      className={`flex items-center justify-center text-center transition-all duration-300 rounded-xl ${
        isActive
          ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-cyan-300 text-white shadow-[0_0_20px_rgba(23,230,255,0.6)]'
          : 'bg-gray-800/80 border border-cyan-500/30 text-gray-200'
      }`}
      style={{
        width: NODE_WIDTH,
        minHeight: NODE_HEIGHT,
        padding: '12px',
      }}
      tabIndex={0}
      role="button"
      aria-label={`process node: ${data.label}`}
    >
      <div className="text-xs font-medium leading-tight px-2 break-words">{data.label}</div>
    </div>
  )
}

// Layout function using Dagre
const getLayoutedElements = (nodes: Partial<Node>[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({
    rankdir: 'TB', // Top to bottom
    nodesep: 100, // Horizontal separation between nodes
    ranksep: 140, // Vertical separation between ranks
    edgesep: 20,
  })

  nodes.forEach((node) => {
    // Set node dimensions based on type
    let width = NODE_WIDTH
    let height = NODE_HEIGHT
    if (node.data?.type === 'start' || node.data?.type === 'end') {
      width = START_END_WIDTH
      height = START_END_HEIGHT
    } else if (node.data?.type === 'decision') {
      width = DECISION_WIDTH
      height = DECISION_HEIGHT
    }
    dagreGraph.setNode(node.id!, { width, height })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes: Node[] = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id!)
    return {
      ...node,
      id: node.id!,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
    } as Node
  })

  return { nodes: layoutedNodes, edges }
}

// Inner component that uses ReactFlow hooks
const FlowchartInner = ({
  nodes: propNodes,
  edges: propEdges,
  steps,
  autoPlay,
  onStepChange,
}: AnimatedFlowchartProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const { fitView } = useReactFlow()
  const layoutedRef = useRef(false)
  const activeEdgeIdRef = useRef<string | null>(null)

  // Determine which data structure to use - wrap in useMemo to prevent re-renders
  const flowNodes = useMemo(() => propNodes || steps || [], [propNodes, steps])
  const flowEdges = useMemo(() => propEdges || [], [propEdges])

  // Generate node IDs for legacy steps format
  const nodeMap = useMemo(() => {
    const map = new Map<string, number>()
    flowNodes.forEach((node, index) => {
      map.set(node.id, index)
    })
    return map
  }, [flowNodes])

  // Generate initial nodes
  const initialNodes = useMemo(() => {
    return flowNodes.map((step, index) => ({
      id: step.id,
      data: {
        label: step.label,
        type: step.type,
        isActive: index === activeIndex,
      },
      type: 'custom',
    }))
  }, [flowNodes, activeIndex])

  // Generate initial edges from propEdges or create from steps
  const initialEdges = useMemo(() => {
    if (flowEdges.length > 0) {
      // Use provided edges
      return flowEdges.map((edge, index) => {
        const sourceIndex = nodeMap.get(edge.source) ?? -1
        const targetIndex = nodeMap.get(edge.target) ?? -1
        // Check if this is a loop edge (target comes before source in sequence)
        const isLoopEdge = targetIndex < sourceIndex
        const isActive =
          sourceIndex === activeIndex - 1 ||
          sourceIndex === activeIndex ||
          (sourceIndex <= activeIndex && targetIndex >= activeIndex) ||
          (isLoopEdge && sourceIndex === activeIndex)

        const reactFlowEdge: Edge = {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: 'smoothstep',
          animated: isActive,
          label: edge.label,
          labelStyle: {
            fill: isActive ? '#17e6ff' : '#9ca3af',
            fontSize: 12,
            fontWeight: 600,
          },
          labelBgStyle: {
            fill: '#1a1a1a',
            fillOpacity: 0.85,
            stroke: isActive ? '#17e6ff' : 'transparent',
            strokeWidth: 1,
            padding: '2px 4px',
            borderRadius: '4px',
          },
          labelBgPadding: [4, 4],
          style: {
            stroke: isActive ? '#17e6ff' : 'rgba(100, 150, 200, 0.5)',
            strokeWidth: isActive ? 2.5 : 2,
            transition: 'all 0.4s ease',
            filter: isActive ? 'drop-shadow(0 0 8px rgba(23, 230, 255, 0.6))' : 'none',
            strokeDasharray: isLoopEdge ? '8 4' : undefined, // Dashed for loop edges
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isActive ? '#17e6ff' : 'rgba(100, 150, 200, 0.5)',
            width: 24,
            height: 24,
          },
        }
        return reactFlowEdge
      })
    } else {
      // Legacy: create edges from consecutive steps
      const edgesArray: Edge[] = []
      for (let i = 0; i < flowNodes.length - 1; i++) {
        const sourceStep = flowNodes[i]
        const targetStep = flowNodes[i + 1]
        const isActive = i === activeIndex - 1 || i === activeIndex

        const edge: Edge = {
          id: `e-${sourceStep.id}-${targetStep.id}`,
          source: sourceStep.id,
          target: targetStep.id,
          type: 'smoothstep',
          animated: isActive,
          style: {
            stroke: isActive ? '#17e6ff' : 'rgba(100, 150, 200, 0.5)',
            strokeWidth: isActive ? 2.5 : 2,
            transition: 'all 0.4s ease',
            filter: isActive ? 'drop-shadow(0 0 8px rgba(23, 230, 255, 0.6))' : 'none',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isActive ? '#17e6ff' : 'rgba(100, 150, 200, 0.5)',
            width: 24,
            height: 24,
          },
        }
        edgesArray.push(edge)
      }
      return edgesArray
    }
  }, [flowEdges, flowNodes, activeIndex, nodeMap])

  // Apply layout when nodes/edges change
  useEffect(() => {
    if (initialNodes.length === 0) return

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    )

    setNodes(layoutedNodes)
    setEdges(layoutedEdges)
    layoutedRef.current = true
  }, [initialNodes, initialEdges])

  // Fit view after layout
  useEffect(() => {
    if (layoutedRef.current && nodes.length > 0) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          fitView({ padding: 0.12, maxZoom: 1, duration: 400 })
        }, 150)
      })
    }
  }, [nodes.length, fitView])

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || flowNodes.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((i) => {
        const nextIndex = (i + 1) % flowNodes.length
        onStepChange?.(nextIndex)
        return nextIndex
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [isPlaying, flowNodes.length, onStepChange])

  // Update node active state
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        const stepIndex = flowNodes.findIndex((s) => s.id === node.id)
        return {
          ...node,
          data: {
            ...node.data,
            isActive: stepIndex === activeIndex,
          },
        }
      })
    )
  }, [activeIndex, flowNodes])

  // Update edge active state
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const sourceIndex = nodeMap.get(edge.source) ?? -1
        const targetIndex = nodeMap.get(edge.target) ?? -1
        const isLoopEdge = targetIndex < sourceIndex
        const isActive =
          sourceIndex === activeIndex - 1 ||
          sourceIndex === activeIndex ||
          (sourceIndex <= activeIndex && targetIndex >= activeIndex) ||
          (isLoopEdge && sourceIndex === activeIndex)

        const currentMarkerEnd = edge.markerEnd && typeof edge.markerEnd === 'object' 
          ? edge.markerEnd 
          : undefined

        return {
          ...edge,
          animated: isActive,
          style: {
            ...(edge.style || {}),
            stroke: isActive ? '#17e6ff' : 'rgba(100, 150, 200, 0.5)',
            strokeWidth: isActive ? 2.5 : 2,
            filter: isActive ? 'drop-shadow(0 0 8px rgba(23, 230, 255, 0.6))' : 'none',
            strokeDasharray: isLoopEdge ? '8 4' : (edge.style?.strokeDasharray as string | undefined), // Preserve dashed for loops
          },
          markerEnd: {
            ...(currentMarkerEnd || {}),
            type: (currentMarkerEnd?.type as MarkerType) || MarkerType.ArrowClosed,
            color: isActive ? '#17e6ff' : 'rgba(100, 150, 200, 0.5)',
            width: currentMarkerEnd?.width || 24,
            height: currentMarkerEnd?.height || 24,
          },
          labelStyle: {
            ...(edge.labelStyle || {}),
            fill: isActive ? '#17e6ff' : '#9ca3af',
            fontSize: (edge.labelStyle as any)?.fontSize || 12,
            fontWeight: (edge.labelStyle as any)?.fontWeight || 600,
          },
          labelBgStyle: {
            ...(edge.labelBgStyle || {}),
            fill: (edge.labelBgStyle as any)?.fill || '#1a1a1a',
            fillOpacity: (edge.labelBgStyle as any)?.fillOpacity || 0.85,
            stroke: isActive ? '#17e6ff' : 'transparent',
            strokeWidth: (edge.labelBgStyle as any)?.strokeWidth || 1,
          },
        }
      })
    )
  }, [activeIndex, nodeMap])

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  )

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => {
      const newIndex = Math.max(0, i - 1)
      onStepChange?.(newIndex)
      return newIndex
    })
    setIsPlaying(false)
  }, [onStepChange])

  const handleNext = useCallback(() => {
    setActiveIndex((i) => {
      const newIndex = Math.min(flowNodes.length - 1, i + 1)
      onStepChange?.(newIndex)
      return newIndex
    })
    setIsPlaying(false)
  }, [flowNodes.length, onStepChange])

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.15, maxZoom: 1, duration: 400 })
  }, [fitView])

  if (flowNodes.length === 0) {
    return null
  }

  return (
    <div className="w-full glass-card p-4 rounded-xl border border-white/10">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
          <FiPlay className="w-5 h-5" />
          Flowchart Visualization
        </h3>
        <div className="text-sm text-gray-400">
          Step {activeIndex + 1} of {flowNodes.length}
        </div>
      </div>

      <div className="w-full h-[600px] rounded-lg overflow-visible border border-gray-700/50 relative" style={{ backgroundColor: '#1a1a1a' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15, maxZoom: 1 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          connectionMode={ConnectionMode.Loose}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <Background
            color="#2a2a2a"
            gap={24}
            size={1}
            variant={BackgroundVariant.Dots}
            style={{ backgroundColor: '#1a1a1a' }}
          />
          <Controls
            showInteractive={true}
            position="top-left"
          />
          <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
            <button
              onClick={handleFitView}
              className="px-3 py-1.5 bg-gray-800/90 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-gray-700/90 transition-colors text-xs font-medium flex items-center gap-2"
              title="Fit to view"
            >
              <FiRefreshCw className="w-3 h-3" />
              Layout
            </button>
          </div>
          <MiniMap
            nodeColor={(node) => {
              const stepIndex = flowNodes.findIndex((s) => s.id === node.id)
              return stepIndex === activeIndex ? '#17e6ff' : '#4a5568'
            }}
            maskColor="rgba(0, 0, 0, 0.7)"
            style={{
              backgroundColor: 'rgba(26, 26, 26, 0.9)',
              border: '1px solid rgba(23, 230, 255, 0.2)',
              borderRadius: '6px',
              bottom: '24px',
              right: '24px',
            }}
            pannable
            zoomable
            position="bottom-right"
          />
        </ReactFlow>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="px-4 py-2 glass-card rounded-lg hover:bg-cyan-500/20 transition-colors flex items-center gap-2 text-white border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous step"
        >
          <FiSkipBack className="w-4 h-4" />
          Prev
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayPause}
          className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 font-semibold border focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
            isPlaying
              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30'
              : 'bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-700'
          }`}
          aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
        >
          {isPlaying ? (
            <>
              <FiPause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <FiPlay className="w-4 h-4" />
              Play
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={activeIndex === flowNodes.length - 1}
          className="px-4 py-2 glass-card rounded-lg hover:bg-cyan-500/20 transition-colors flex items-center gap-2 text-white border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next step"
        >
          Next
          <FiSkipForward className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Step indicator dots */}
      <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
        {flowNodes.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setActiveIndex(index)
              setIsPlaying(false)
              onStepChange?.(index)
            }}
            className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              index === activeIndex
                ? 'bg-cyan-400 w-8 shadow-[0_0_8px_rgba(23,230,255,0.6)]'
                : 'bg-gray-600 w-2 hover:bg-gray-500'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Main component with ReactFlowProvider
export default function AnimatedFlowchart(props: AnimatedFlowchartProps) {
  return (
    <ReactFlowProvider>
      <FlowchartInner {...props} />
    </ReactFlowProvider>
  )
}
