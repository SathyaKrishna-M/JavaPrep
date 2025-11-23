# TeaVM Build Configuration

## Overview

This directory contains the Java runtime that will be compiled to WebAssembly (WASM) using TeaVM. The compiled WASM module enables running Java code in the browser for step-by-step execution visualization.

## Project Structure

```
java-runtime/
├── pom.xml                    # Maven build configuration
├── sources/                   # Java source files
│   └── com/babuhub/visualizer/
│       └── VisualizerRuntime.java
├── build-output/              # TeaVM compilation output (generated)
│   ├── runtime.wasm          # WebAssembly binary
│   ├── runtime.js            # JavaScript loader
│   └── runtime.d.ts          # TypeScript definitions (optional)
└── build-config.md           # This file
```

## Prerequisites

- **Java JDK 11+** (required for TeaVM)
- **Maven 3.6+** (build tool)
- **Node.js** (for Next.js integration)

## Build Commands

### Initial Setup

1. **Navigate to the runtime directory:**
   ```bash
   cd src/visualizer/java-runtime
   ```

2. **Build the WASM module:**
   ```bash
   mvn clean compile
   ```

### Build Output

After successful compilation, TeaVM generates:

- **`build-output/runtime.wasm`** - WebAssembly binary containing the compiled Java runtime
- **`build-output/runtime.js`** - JavaScript loader that initializes the WASM module
- **`build-output/runtime.d.ts`** - TypeScript definitions (if generated)

The Maven build also automatically copies these files to:
- **`public/wasm/`** - For Next.js to serve as static assets

## TeaVM Configuration

### Key Settings in `pom.xml`

```xml
<configuration>
    <mainClass>com.babuhub.visualizer.VisualizerRuntime</mainClass>
    <targetDirectory>${project.basedir}/build-output</targetDirectory>
    <targetType>WEBASSEMBLY</targetType>
    <minifying>false</minifying>
    <sourceMapsGenerated>true</sourceMapsGenerated>
    <debugInformationGenerated>true</debugInformationGenerated>
    <optimizationLevel>NONE</optimizationLevel>
</configuration>
```

### Explanation

- **`mainClass`**: Entry point class (VisualizerRuntime)
- **`targetType: WEBASSEMBLY`**: Compiles to WASM instead of JavaScript
- **`minifying: false`**: Keeps code readable for debugging
- **`sourceMapsGenerated: true`**: Enables source maps for debugging
- **`optimizationLevel: NONE`**: No optimization for easier debugging (change to `SIMPLE` or `FULL` for production)

## How TeaVM Works

### Compilation Process

1. **Java Source → Bytecode**: Maven compiles Java source to bytecode
2. **Bytecode → WASM**: TeaVM analyzes bytecode and generates WebAssembly
3. **JS Bindings**: TeaVM generates JavaScript wrapper for WASM module
4. **Export/Import**: Methods annotated with `@Export` become callable from JS; `@Import` allows Java to call JS functions

### JS ↔ Java Communication

#### Java → JavaScript (Exports)

Methods annotated with `@Export` in Java become callable from TypeScript:

```java
@Export(name = "ping")
public static String ping() {
    return "Java Runtime is ready!";
}
```

Can be called from TypeScript:
```typescript
const result = wasmModule.ping() // "Java Runtime is ready!"
```

#### JavaScript → Java (Imports)

Methods annotated with `@Import` in Java call JavaScript functions:

```java
@Import(module = "runtime", name = "registerSnapshotCallback")
public static native void registerSnapshotCallback(Object callback);
```

JavaScript must provide:
```javascript
const runtimeModule = {
  registerSnapshotCallback: (callback) => { ... }
}
```

## Integration with Next.js

### File Locations

- **Source**: `src/visualizer/java-runtime/sources/`
- **Build Output**: `src/visualizer/java-runtime/build-output/`
- **Public Assets**: `public/wasm/` (copied automatically by Maven)

### Loading in TypeScript

The WASM module is loaded via `src/visualizer/utils/wasm-loader.ts`:

```typescript
import { loadWASMRuntime } from '@/visualizer/utils/wasm-loader'

const runtime = await loadWASMRuntime()
await runtime.initializeRuntime()
const result = runtime.ping() // Test connection
```

## Development Workflow

### 1. Modify Java Code

Edit `sources/com/babuhub/visualizer/VisualizerRuntime.java`

### 2. Rebuild WASM

```bash
cd src/visualizer/java-runtime
mvn clean compile
```

### 3. Test in Browser

The Next.js dev server will automatically pick up changes in `public/wasm/`

### 4. Debug

- Use browser DevTools → Sources → `runtime.wasm` for WASM debugging
- Check console for Java `System.out.println` output (if enabled)
- Use source maps for line number mapping

## Troubleshooting

### Build Fails

- **Check Java version**: `java -version` should show JDK 11+
- **Check Maven version**: `mvn -version` should show 3.6+
- **Clean build**: `mvn clean` then `mvn compile`

### WASM Not Loading

- **Check file paths**: Ensure `runtime.wasm` and `runtime.js` exist in `public/wasm/`
- **Check browser console**: Look for WASM loading errors
- **CORS issues**: Ensure Next.js serves files from `/wasm/` correctly

### Methods Not Found

- **Verify @Export annotations**: All exported methods must have `@Export(name = "...")`
- **Check method signatures**: TypeScript types must match Java method signatures
- **Rebuild**: Sometimes TeaVM cache needs clearing: `mvn clean compile`

## Next Steps (Milestones B-C)

### Milestone B: Instrumentation
- Implement code instrumentation in `JavaInstrumenter.ts`
- Inject tracking hooks into Java code
- Connect hooks to `VisualizerRuntime` methods

### Milestone C: Execution
- Implement step-by-step execution in `JavaRunner.ts`
- Generate snapshots during execution
- Connect snapshots to UI components

## Resources

- [TeaVM Documentation](http://teavm.org/)
- [TeaVM GitHub](https://github.com/konsoletyper/teavm)
- [WebAssembly Documentation](https://webassembly.org/)
- [Maven Documentation](https://maven.apache.org/)
