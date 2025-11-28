# CheerpJ Setup Guide

This guide explains how to set up CheerpJ runtime for the Java Visualizer.

## What is CheerpJ?

CheerpJ is a Java-to-JavaScript compiler that allows running Java bytecode in the browser. Unlike TeaVM (which compiles Java to WASM statically), CheerpJ can dynamically load and execute compiled Java classes at runtime.

## Prerequisites

1. **JDK 11+** installed and `javac` available in PATH
   - Download from: https://adoptium.net/
   - Verify: `javac -version`

2. **CheerpJ CDN Runtime**
   - No download required! The visualizer uses the official CheerpJ CDN
   - CDN URL: `https://cheerpj.com/latest`
   - The loader script is automatically injected via `app/layout.tsx`

## Installation Steps

### 1. Verify JDK Installation

1. Ensure JDK 11+ is installed
2. Verify: `javac -version`
3. Add JDK `bin` directory to PATH if needed

### 2. No CheerpJ Files Required

The visualizer uses the official CheerpJ CDN, so no local files are needed. The loader script is automatically loaded from:
- `https://cheerpj.com/latest/loader.js`

### 3. Verify Installation

1. Start the dev server: `npm run dev`
2. Open the visualizer page: `http://localhost:3000/visualizer`
3. Check browser console for: `[CheerpJ] Runtime initialized`
4. Verify `window.CheerpJ` or `window.cj3` exists in the console

## How It Works

1. **User pastes Java code** → Frontend sends to `/api/compile`
2. **Server compiles** → Uses `javac` to compile source to `.class` files
3. **Server creates JAR** → Bundles classes into a JAR file
4. **Frontend loads JAR** → CheerpJ loads the JAR in the browser
5. **Java executes** → Instrumented code runs and calls `VisualizerBridge` methods
6. **Events flow** → Java → JavaScript bridge → Visualizer UI

## Architecture

### Compilation Pipeline

```
User Code → Instrumenter → Instrumented Code → javac → .class files → jar → JAR file
```

### Execution Pipeline

```
JAR file → CheerpJ Runtime → Load JAR → Execute main() → VisualizerBridge → JavaScript callbacks → UI
```

### Java → JavaScript Bridge

The `VisualizerBridge.java` class provides static methods that instrumented code calls. These methods use CheerpJ's native JS interop to call JavaScript functions exposed on `window.__visualizerBridge`.

## Troubleshooting

### "CheerpJ loader script not found"

- Ensure the script tag is present in `app/layout.tsx`:
  ```tsx
  <script async src="https://cheerpj.com/latest/loader.js"></script>
  ```
- Check Network tab in DevTools to verify the script loads successfully
- Verify `window.cheerpjInit` exists after script loads

### "javac not found"

- Install JDK 11+ from https://adoptium.net/
- Add JDK `bin` directory to PATH
- Restart the dev server
- Verify: `javac -version`

### "Compilation failed"

- Check the compilation errors in the UI
- Ensure your Java code is valid
- Check that the main class is public and has a `main(String[] args)` method

### "JAR load failed"

- Check browser console for CheerpJ errors
- Verify JAR file was created successfully
- Check Network tab to ensure JAR is being loaded

## Licensing

**Important**: CheerpJ has licensing terms. Please review:
- https://leaningtech.com/cheerpj/licensing/
- Ensure your usage complies with the license terms
- Non-commercial use may have different restrictions

## Alternative: TeaVM (Fallback)

If CheerpJ is not available, the visualizer falls back to the TeaVM/WASM pipeline. However, TeaVM cannot execute dynamically compiled user code - it only works with pre-compiled static examples.

## Development Notes

- Compile directories are stored in `tmp/compile/` (gitignored)
- JAR files are stored in `public/jars/` (gitignored)
- Old compile directories are cleaned up automatically (after 1 hour)
- JAR files are not automatically cleaned up (manual cleanup may be needed)
- CheerpJ runtime is loaded from CDN: `https://cheerpj.com/latest`
- Initialization uses: `await cheerpjInit({ canvas: null })`
- JAR loading uses: `cheerpjLoadJar(jarUrl)`

