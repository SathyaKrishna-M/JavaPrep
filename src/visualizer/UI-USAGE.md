# Java Visualizer UI Usage Guide

## Overview

The Java Visualizer provides an elegant, interactive interface for step-by-step execution visualization. This guide covers all UI features, interactions, and keyboard shortcuts.

## Layout

### Desktop Layout
- **Left Panel**: Code Editor (Monaco Editor) - Resizable
- **Right Panel**: Visualization panels (Timeline, Variables, Output, Call Stack, Heap, etc.)
- **Resizable Split**: Drag the divider between editor and visualizer to adjust widths

### Mobile/Tablet Layout
- **Vertical Stacking**: Editor and visualizer stack vertically
- **Collapsible Panels**: Tap headers to expand/collapse sections
- **Responsive Grid**: Panels adapt to screen size

## Code Editor

### Features
- **Line Highlighting**: Current execution line glows with blue gradient and left border
- **Smooth Scrolling**: Automatically scrolls to highlighted line
- **Syntax Highlighting**: Full Java syntax support
- **Dimmed Lines**: Non-executing lines slightly dimmed for clarity

### Interactions
- **Click to Edit**: Type or paste Java code
- **Auto-scroll**: Editor automatically scrolls to current execution line
- **Line Numbers**: Clickable line numbers for navigation

## Execution Timeline

### Controls
- **Play/Pause**: Start or pause automatic execution
- **Previous/Next**: Step backward or forward one step
- **Reset**: Jump to first step
- **Play from Here**: Start playing from current step
- **Speed Presets**: 0.25x, 0.5x, 1x, 2x speed options

### Progress Bar
- **Visual Progress**: Gradient bar shows execution progress
- **Draggable Slider**: Click or drag to jump to any step
- **Step Counter**: Shows current step and total steps
- **Percentage**: Displays completion percentage

### Keyboard Shortcuts
- **← (Left Arrow)**: Previous step
- **→ (Right Arrow)**: Next step
- **Space**: Play/Pause
- **Home**: Jump to first step
- **End**: Jump to last step

## Variables Panel

### Features
- **Grouped by Scope**: Variables organized by local, parameters, static, fields
- **Change Highlighting**: 
  - 🟢 Green: Newly added variables
  - 🟡 Yellow: Changed variables
  - ⚪ Default: Unchanged variables
- **Search**: Filter variables by name, type, or value
- **Collapsible Groups**: Click group headers to expand/collapse
- **Smooth Animations**: Value changes animate smoothly

### Interactions
- **Hover**: Highlights variable and related objects in heap
- **Click**: Navigate to variable's first change (future feature)
- **Search**: Real-time filtering as you type

## Output Panel

### Features
- **Terminal-style Display**: Console-like output with green text
- **Auto-scroll**: Automatically scrolls to latest output
- **Copy Button**: Copy all output to clipboard
- **Formatted Output**: Properly formatted with newlines and tabs

### Empty State
- Shows helpful message when no output yet
- Explains that output appears when program prints

## Call Stack Panel

### Features
- **Recursion Highlighting**: Recursive frames highlighted in purple/pink gradient
- **Return Values**: Shows return values inline with frames
- **This Reference**: Displays `this` object ID for instance methods
- **Depth Indentation**: Visual indentation shows call depth
- **Frame Numbers**: Shows frame position in stack

### Interactions
- **Hover Frame**: Highlights corresponding code lines (future feature)
- **Recursive Indicator**: Recursive frames show 🔄 icon

## Heap Panel

### Features
- **Searchable**: Search objects by ID, type, or field names
- **Type Filtering**: Filter by object type
- **Field Preview**: Shows first 3 fields with values
- **Creation Time**: Shows step when object was created
- **References**: Shows number of object references

### Interactions
- **Click Object**: Opens Object Inspector modal
- **Hover**: Highlights object and related variables
- **Selection**: Selected object highlighted with amber gradient

## Object Inspector

### Features
- **Full Field View**: All object fields displayed
- **Reference Links**: Clickable links to referenced objects
- **Array Info**: Special display for arrays (length, component type)
- **Creation Info**: Link to step where object was created
- **Navigation**: Navigate between related objects

### Interactions
- **Click Reference**: Navigate to referenced object
- **Click Creation Step**: Jump to step where object was created
- **Close**: Click outside or X button to close

## Collection Inspector

### Features
- **Type-specific Views**: 
  - Maps: Key-value pairs
  - Lists/Sets: Element list
- **Pagination**: Navigate through large collections
- **Load More**: Load additional items on demand
- **Size Display**: Shows total size and preview count

### Interactions
- **Pagination**: Previous/Next buttons
- **Load More**: Button to load more items
- **Element Hover**: Highlights individual elements

## Exception Banner

### Features
- **Animated Entry**: Slides down with spring animation
- **Exception Type**: Large, bold exception class name
- **Message**: Clear error message
- **Stack Trace**: Full call stack at throw site
- **Navigation Links**: 
  - Jump to throw line
  - Jump to throw step

### Interactions
- **Jump to Line**: Click to scroll editor to exception line
- **Jump to Step**: Click to navigate to throw step
- **Dismiss**: Close button (if dismissible)

## Static Init Panel

### Features
- **Timeline View**: Shows initialization sequence
- **Status Indicators**: 
  - 🔄 Spinning: In progress
  - ✅ Checkmark: Completed
- **Step Tracking**: Shows step when initialization occurred

### Empty State
- Shows message when no static initializers

## Interaction Enhancements

### Variable → Object Linking
- **Hover Variable**: Highlights related objects in heap panel
- **Click Variable**: Navigate to object (if variable references object)

### Object → Variable Linking
- **Hover Object**: Highlights variables that reference the object
- **Reference Count**: Shows how many variables reference the object

### Call Stack → Code Linking
- **Hover Frame**: Highlights corresponding code lines (future)
- **Frame Depth**: Visual indentation shows call depth

### Play from Here
- **Timeline Click**: Click any step in timeline
- **Play Button**: "Play from here" button appears
- **Auto-play**: Starts playing from selected step

## Empty States

All panels have polished empty states with:
- **Icon**: Relevant icon in circular background
- **Message**: Clear explanation
- **Help Text**: Additional context

## Error States

### Instrumentation Errors
- **Red Banner**: Gradient red/orange background
- **Error Icon**: Alert triangle icon
- **Clear Message**: Detailed error description

### Runtime Errors
- **Exception Banner**: Full exception details
- **Stack Trace**: Complete call stack
- **Navigation**: Links to error location

### Unsupported Features
- **Warning**: Yellow/orange banner
- **Feature List**: Lists unsupported features
- **Suggestion**: Guidance on alternatives

## Responsive Design

### Mobile (< 768px)
- **Vertical Stack**: Editor and visualizer stack
- **Collapsible**: Panels can be collapsed
- **Touch-friendly**: Larger touch targets
- **Simplified Controls**: Streamlined button layout

### Tablet (768px - 1024px)
- **Two-column**: Editor and visualizer side-by-side
- **Adaptive Grid**: Panels adjust to available space
- **Full Features**: All features available

### Desktop (> 1024px)
- **Resizable Split**: Drag to adjust panel widths
- **Full Layout**: All panels visible
- **Keyboard Shortcuts**: Full keyboard support

## Theming

### Design System
- **Consistent Radius**: `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for containers
- **Glassmorphism**: `bg-white/5 backdrop-blur-xl` for panels
- **Gradient Accents**: Blue → Cyan gradients for primary actions
- **Color Palette**:
  - Blue: Variables, primary actions
  - Green: Output, success
  - Purple: Call stack, recursion
  - Amber: Heap objects
  - Red: Exceptions, errors
  - Indigo: Static initialization

### Spacing
- **Consistent System**: 4px, 6px, 8px, 12px, 16px, 24px
- **Panel Padding**: 24px (p-6)
- **Card Padding**: 16px (p-4)
- **Gap Between Elements**: 12px-24px

## Animations

### Micro Animations
- **Fade-in**: All panels fade in on load
- **Slide**: Timeline transitions slide smoothly
- **Scale**: Buttons scale on hover/tap
- **Glow**: Executing line pulses gently
- **Bounce**: Exception banner bounces in

### Transitions
- **Duration**: 200-300ms for most transitions
- **Easing**: `ease-out` for natural feel
- **Spring**: Exception banner uses spring animation

## Performance

### Optimizations
- **Lazy Loading**: Large collections load on demand
- **Virtual Scrolling**: Long lists use virtual scrolling (future)
- **Debounced Search**: Search queries debounced
- **Memoized Calculations**: Expensive calculations memoized

## Accessibility

### Keyboard Navigation
- **Tab Order**: Logical tab sequence
- **Focus Indicators**: Clear focus rings
- **ARIA Labels**: Screen reader support
- **Keyboard Shortcuts**: Documented shortcuts

### Screen Readers
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Roles**: Appropriate roles for components
- **Alt Text**: Icons have descriptive text

## Tips & Tricks

1. **Quick Navigation**: Use arrow keys to step through execution
2. **Speed Control**: Adjust speed presets for different code complexity
3. **Object Inspection**: Click heap objects to see full details
4. **Variable Search**: Quickly find variables in large programs
5. **Exception Debugging**: Use exception banner to jump to error location
6. **Recursion Visualization**: Watch call stack expand during recursion
7. **Collection Exploration**: Use pagination to explore large collections

## Future Enhancements

- Breakpoint support
- Watch expressions
- Variable history timeline
- Code diff view
- Performance profiling
- Export snapshots as JSON

