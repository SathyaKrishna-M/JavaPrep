# Java Visualizer Architecture

This directory contains the complete architecture for a browser-based Java execution visualizer using TeaVM (Java → WASM).

## 📁 Directory Structure

```
visualizer/
├── core/                    # Core execution engine
│   ├── instrumenter/        # Java code instrumentation
│   ├── runner/              # WASM execution runner
│   └── tracking/            # Snapshot tracking system
├── java-runtime/            # Java runtime for WASM compilation
│   ├── sources/             # Java source files
│   └── build-output/       # Compiled WASM output
├── ui/                      # UI components
│   ├── editor/              # Code editor components
│   ├── panels/              # Display panels (variables, output, stack, heap)
│   ├── timeline/            # Execution timeline controls
│   └── layout/              # Layout components
└── utils/                   # Utility functions
    ├── wasm-loader.ts       # WASM module loader
    └── pipeline.ts          # Main visualization pipeline
```

## 🔄 Execution Pipeline

```
User Code
    ↓
JavaInstrumenter.instrument()
    ↓
Instrumented Code
    ↓
JavaRunner.run()
    ↓
WASM Runtime Execution
    ↓
Snapshot Callbacks
    ↓
SnapshotManager.load()
    ↓
UI Rendering
```

## 🚧 Implementation Status

### ✅ Completed
- **Milestone A**: TeaVM WASM runtime setup
  - Maven build configuration
  - Java runtime class with @Export/@Import annotations
  - TypeScript WASM loader
  - Runtime test structure
  - Documentation

- **Milestone B**: Java source instrumentation
  - Full AST parsing pipeline
  - Source-level instrumentation with tracking hooks
  - System.out.println/print wrapping
  - Line mapping (original ↔ instrumented)
  - Unsupported feature detection
  - Static analysis (complexity, warnings)
  - Test fixtures
  - Error handling with helpful messages

### ⏳ TODO (Next Steps)
- [ ] **Milestone C**: Step-by-step execution
  - [ ] Implement WASM execution engine
  - [ ] Generate snapshots during execution
  - [ ] Connect snapshots to UI
  - [ ] Handle control flow (loops, conditionals)
  - [ ] Track variable state changes
  - [ ] Track heap objects
  - [ ] Track call stack

## 📝 Key Files

### Core Modules
- `core/instrumenter/JavaInstrumenter.ts` - Code instrumentation logic
- `core/runner/JavaRunner.ts` - WASM execution runner
- `core/tracking/Snapshot.ts` - Snapshot data structures and management

### Runtime
- `java-runtime/sources/VisualizerRuntime.java` - Java helper class for WASM

### Utilities
- `utils/wasm-loader.ts` - WASM module loading
- `utils/pipeline.ts` - Main visualization pipeline

### UI Components
- `ui/editor/CodeEditorPanel.tsx` - Code editor wrapper
- `ui/panels/*.tsx` - Display panels for variables, output, stack, heap
- `ui/timeline/ExecutionTimeline.tsx` - Timeline controls
- `ui/layout/VisualizerLayout.tsx` - Main layout component

## 🔧 Build Configuration

### TeaVM Setup (TODO)
1. Add TeaVM Maven/Gradle plugin
2. Configure build to compile `VisualizerRuntime.java` to WASM
3. Generate JS bindings
4. Output to `java-runtime/build-output/`

### Example Build Script (TODO)
```xml
<!-- Maven pom.xml -->
<plugin>
  <groupId>org.teavm</groupId>
  <artifactId>teavm-maven-plugin</artifactId>
  <executions>
    <execution>
      <goals>
        <goal>compile</goal>
      </goals>
    </execution>
  </executions>
</plugin>
```

## 📖 How Instrumentation Works

### Overview

The instrumentation engine transforms user Java code by:
1. **Parsing** the code into an Abstract Syntax Tree (AST)
2. **Walking** the AST to identify executable statements
3. **Injecting** tracking hooks before/after statements
4. **Wrapping** System.out calls to capture output
5. **Mapping** original line numbers to instrumented line numbers

### Hook Types

The instrumenter injects the following types of hooks:

1. **Step Tracking** (`trackStep`)
   - Injected before each executable statement
   - Records the current line number being executed

2. **Variable Tracking** (`trackVariable`)
   - Injected after variable declarations and assignments
   - Records variable name, value, and type

3. **Object Creation** (`trackObjectCreation`)
   - Injected after `new` statements
   - Records object ID, class name, and initial state

4. **Method Entry/Exit** (`trackMethodEntry`, `trackMethodExit`)
   - Injected at method boundaries
   - Tracks call stack

5. **Output Capture** (`captureOutput`)
   - Wraps System.out.println/print calls
   - Captures all program output

### Line Mapping

The instrumenter maintains a bidirectional mapping:

- **Original → Instrumented**: One original line may map to multiple instrumented lines (due to injected hooks)
- **Instrumented → Original**: Each instrumented line maps back to its original source line

This mapping is used by the UI to:
- Highlight the correct line in the code editor
- Show original line numbers in execution traces
- Map execution snapshots back to source code

### Unsupported Java Features

The following features are **not supported** and will trigger errors:

- ❌ `System.exit()` - Program termination
- ❌ Threading (`Thread.start()`, `Thread.sleep()`, etc.)
- ❌ Reflection APIs (`getClass()`, `Class.forName()`, etc.)
- ❌ File I/O (`FileReader`, `FileWriter`, etc.)
- ❌ Unsafe APIs (`sun.misc.Unsafe`)
- ❌ Native methods
- ❌ Runtime execution (`Runtime.getRuntime()`)

### Advanced Scenarios

#### Multi-Line Statements

The instrumenter correctly handles statements spanning multiple lines:

```java
int result = 
    10 + 
    20 + 
    30;
```

The entire statement is treated as a single unit, with hooks injected appropriately.

#### Nested Blocks

Nested blocks (loops, conditionals) are handled with proper scope tracking:

```java
for (int i = 0; i < 5; i++) {
    if (i % 2 == 0) {
        System.out.println(i);
    }
}
```

Hooks are injected at each nesting level, maintaining correct line mappings.

#### Try/Catch (Future)

Try/catch blocks will be supported in a future milestone with proper exception tracking.

## 🚀 Execution Pipeline (Milestone C)

### How JavaRunner Works

The `JavaRunner` executes instrumented Java code in the WASM runtime and collects execution snapshots:

1. **Initialization**: Loads WASM runtime and sets up callback bindings
2. **Code Acceptance**: Sends instrumented code to WASM runtime
3. **Execution**: Invokes `main()` method in WASM
4. **Event Collection**: Collects callbacks from Java → JS during execution
5. **Snapshot Generation**: Converts events into execution snapshots
6. **Line Mapping**: Maps instrumented line numbers back to original source lines

### Callback → Snapshot Mapping

As the WASM runtime executes instrumented code, it triggers callbacks:

| Callback | Event Type | Snapshot Update |
|----------|-----------|-----------------|
| `onStep(lineNumber)` | STEP | Creates new snapshot frame |
| `onVariable(name, value, type)` | VARIABLE | Updates local variables |
| `onOutput(text)` | OUTPUT | Appends to output buffer |
| `onMethodEnter(className, methodName, line)` | METHOD_ENTER | Pushes frame to call stack |
| `onMethodExit(className, methodName, line)` | METHOD_EXIT | Pops frame from call stack |
| `onObject(objectId, className)` | OBJECT | Adds object to heap |

### Example Event → Snapshot Transition

**Execution Flow:**
```
1. onStep(3) → New snapshot: { stepIndex: 0, lineNumber: 3, variables: [], ... }
2. onVariable("x", "5", "int") → Update snapshot: { variables: [{name: "x", value: 5, type: "int"}] }
3. onStep(4) → Finalize snapshot 0, create snapshot 1: { stepIndex: 1, lineNumber: 4, ... }
4. onOutput("5\n") → Update snapshot: { output: "5\n" }
```

### Limitations

- **WASM Runtime Required**: Must build TeaVM WASM runtime before use (see WASM-SETUP.md)
- **No Simulation**: Simulation runtime removed - only real WASM execution supported
- **Limited Type Support**: Basic types (int, String, boolean) supported
- **No Exception Handling**: Try/catch not yet implemented (Milestone D)
- **No Reflection**: Reflection APIs are not supported
- **No File I/O**: File operations are not supported
- **No Threading**: Multi-threaded code is not supported

### Debugging Notes

- **Check WASM Loading**: Verify `wasm-loader.ts` successfully loads the runtime
- **Check Callbacks**: Ensure callbacks are properly bound in `JavaRunner.initializeRuntime()`
- **Check Line Mapping**: Verify `lineMapping` correctly maps instrumented → original lines
- **Check Event Buffer**: Events are collected in chronological order
- **Check Snapshot Generation**: Each STEP event creates a new snapshot frame

## 🚀 Advanced Execution Features (Milestone D)

### New Events and Hooks

The visualizer now tracks advanced execution features:

| Event | Hook | Description |
|-------|------|-------------|
| `OBJECT_CREATED` | `trackObjectCreated()` | Object creation with field preview |
| `FIELD_WRITE` | `trackFieldWrite()` | Field assignment tracking |
| `ARRAY_CREATED` | `trackArrayCreate()` | Array creation with length |
| `COLLECTION_EVENT` | `trackCollectionEvent()` | Collection operations (add/remove/put/get) |
| `METHOD_RETURN` | `trackMethodReturn()` | Method return value tracking |
| `EXCEPTION` | `trackExceptionThrown()` | Exception thrown with stack trace |
| `TRY_ENTER` | `trackTryCatchEnter()` | Try block entry |
| `FINALLY_ENTER` | `trackFinallyEnter()` | Finally block entry |
| `STATIC_INIT` | `trackStaticInitStart/End()` | Static initializer execution |
| `THIS_REF` | `trackThisReference()` | This reference in methods |

### Heap Model

The heap tracks all objects created during execution:

- **Object IDs**: Deterministic IDs (`obj_<line>_<offset>`)
- **Field Tracking**: Initial fields and field writes
- **References**: Object references (for circular reference detection)
- **Creation Time**: Step index when object was created

### Collection Preview

Collections (ArrayList, HashMap, etc.) are tracked with:

- **Size**: Current collection size
- **Preview**: First N elements/keys (configurable, default 50)
- **Type**: Collection type (ArrayList, HashMap, etc.)
- **Pagination**: Load more items on demand

### Exception Handling

Exceptions are tracked with:

- **Type**: Exception class name
- **Message**: Exception message
- **Line**: Line where exception was thrown
- **Stack Trace**: Full call stack at throw site
- **Try/Catch/Finally**: Active block tracking

### Recursion Detection

Recursion is automatically detected by:

- **Frame Signatures**: Tracking method signatures in call stack
- **Repeating Frames**: Identifying repeated method calls
- **Depth Tracking**: Maximum recursion depth
- **Visual Highlighting**: Recursive frames highlighted in UI

### Return Value Tracking

Method return values are captured:

- **Method Name**: Which method returned
- **Return Value**: The actual return value
- **Type**: Return type (if available)
- **Display**: Shown inline with call stack frames

### Static Initialization

Static initializers are tracked:

- **Class Name**: Which class is being initialized
- **Status**: Started or completed
- **Step Index**: When initialization occurred
- **Timeline**: Shown before main() execution

### Configuration & Limits

Performance safeguards:

- **Max Heap Objects**: 5,000 (configurable)
- **Max Collection Preview**: 50 elements (configurable)
- **Snapshot Coalescing**: Merges multiple events on same line
- **Graceful Degradation**: Clear messages when limits hit

### UI Components

New panels for advanced features:

- **HeapPanel**: Searchable object list with type filtering
- **ObjectInspector**: Detailed object view with field exploration
- **CollectionInspector**: Specialized collection view with pagination
- **ExceptionBanner**: Exception display with stack trace
- **StaticInitPanel**: Static initialization timeline
- **CallStackPanel**: Enhanced with recursion highlighting and return values

### Example Flows

#### Throw-Catch-Finally Flow

```
1. try { ... } → EVENT_TRY_ENTER
2. throw exception → EVENT_EXCEPTION
3. catch (Exception e) → Exception caught, activeTryId cleared
4. finally { ... } → EVENT_FINALLY_ENTER
```

#### Object Creation + Field Write Flow

```
1. new MyClass() → EVENT_OBJECT_CREATED (with initial fields)
2. obj.field = value → EVENT_FIELD_WRITE
3. Heap updated with new field value
```

#### Recursion Flow

```
1. factorial(5) → Call stack: [main, factorial]
2. factorial(4) → Call stack: [main, factorial, factorial]
3. ... → Recursion detected when frame signature repeats
4. recursionInfo set with depth and repeating frames
```

## 🎨 UI/UX Features (Milestone E)

### Layout & Design
- **Resizable Split-Pane**: Drag divider to adjust editor/visualizer widths
- **Responsive Layout**: Adapts to mobile, tablet, and desktop
- **Glassmorphism**: Consistent glass-effect panels throughout
- **Consistent Theming**: Unified color palette and spacing system

### Code Editor
- **Glowing Line Highlight**: Current execution line with animated glow
- **Smooth Scrolling**: Auto-scrolls to highlighted line
- **Dimmed Lines**: Non-executing lines slightly dimmed
- **Jump to Line**: Clicking snapshots jumps editor to correct line

### Timeline
- **Keyboard Shortcuts**: 
  - `←` / `→`: Previous/Next step
  - `Space`: Play/Pause
  - `Home`/`End`: Jump to first/last step
- **Speed Presets**: 0.25x, 0.5x, 1x, 2x
- **Draggable Slider**: Click or drag to jump to any step
- **Play from Here**: Start playing from current step
- **Smooth Animations**: Eased transitions between steps

### Panel Enhancements

#### Variables Panel
- **Grouped by Scope**: Local, parameters, static, fields
- **Change Highlighting**: Green (new), Yellow (changed)
- **Search & Filter**: Real-time variable search
- **Collapsible Groups**: Expand/collapse variable groups
- **Smooth Value Animations**: Animated value changes

#### Call Stack Panel
- **Recursion Highlighting**: Purple/pink gradient for recursive frames
- **Return Values**: Inline return value display
- **This Reference**: Shows `this` object ID
- **Depth Indentation**: Visual call depth
- **Frame Numbers**: Stack position indicators

#### Heap Panel
- **Searchable**: Search by ID, type, or fields
- **Type Filtering**: Filter by object type
- **Field Preview**: First 3 fields shown
- **Object Selection**: Click to inspect
- **Hover Effects**: Highlights on hover

#### Collection Inspector
- **Pagination**: Navigate large collections
- **Type-specific Views**: Maps vs Lists/Sets
- **Load More**: Incremental loading
- **Element Chips**: Visual element previews

#### Exception Banner
- **Animated Entry**: Spring animation on appear
- **Stack Trace**: Full call stack display
- **Navigation Links**: Jump to throw line/step
- **Gradient Border**: Red/orange gradient styling

#### Static Init Panel
- **Timeline Dots**: Visual initialization sequence
- **Status Indicators**: Spinning/checkmark icons
- **Step Tracking**: Shows initialization steps

### Interactions
- **Variable → Object**: Hover variable highlights related objects
- **Object → Variable**: Hover object highlights referencing variables
- **Call Stack → Code**: Hover frame highlights code (future)
- **Play from Here**: Start execution from any step
- **Jump to Change**: Navigate to variable's first change (future)

### Empty & Error States
- **Polished Empty States**: All panels have helpful empty states
- **Error Banners**: Styled error messages with icons
- **Helpful Messages**: Clear guidance for users

### Responsive Design
- **Mobile**: Vertical stacking, collapsible panels
- **Tablet**: Two-column layout
- **Desktop**: Full resizable split-pane

### Micro Animations
- **Fade-in**: Panel entrance animations
- **Slide**: Timeline transitions
- **Scale**: Button hover effects
- **Glow**: Executing line pulse
- **Spring**: Exception banner bounce

## 🎯 Next Implementation Steps

1. **Performance Optimization**
   - Snapshot compression
   - Lazy loading of large heaps
   - Incremental collection preview loading
   - Virtual scrolling for long lists

2. **Enhanced Type Support**
   - Generic types
   - Enum types
   - Interface implementations

3. **Advanced Debugging**
   - Breakpoint support
   - Conditional breakpoints
   - Watch expressions
   - Variable history timeline

4. **UI Enhancements**
   - Code diff view
   - Performance profiling panel
   - Export/import snapshots
   - Custom themes

2. **UI Enhancement**
   - Connect real execution data to panels
   - Add smooth animations
   - Improve user experience
   - Add breakpoint support

