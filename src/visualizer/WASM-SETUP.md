# WASM Runtime Setup Guide

## Overview

The Java Visualizer uses TeaVM to compile Java code to WebAssembly (WASM) for browser-based execution. **The simulation runtime has been completely removed** - only real WASM execution is supported.

## Prerequisites

- **Java JDK 11+** (required for TeaVM)
- **Maven 3.6+** (build tool)
- **Node.js** (for Next.js)

## Building the WASM Runtime

### Step 1: Navigate to Runtime Directory

```bash
cd src/visualizer/java-runtime
```

### Step 2: Build WASM Module

```bash
mvn clean compile
```

This will:
1. Compile Java source code
2. Generate `runtime.wasm` and `runtime.js` in `build-output/`
3. Automatically copy files to `public/wasm/` for Next.js

### Step 3: Verify Build Output

Check that these files exist:
- `src/visualizer/java-runtime/build-output/runtime.wasm`
- `src/visualizer/java-runtime/build-output/runtime.js`
- `public/wasm/runtime.wasm`
- `public/wasm/runtime.js`

## Troubleshooting

### Missing WASM Files

**Error**: "TeaVM runtime files not found"

**Solution**:
1. Ensure you've run `mvn clean compile` in `src/visualizer/java-runtime`
2. Check that files exist in `public/wasm/`
3. If files are missing, manually copy from `build-output/` to `public/wasm/`:
   ```bash
   cp src/visualizer/java-runtime/build-output/*.wasm public/wasm/
   cp src/visualizer/java-runtime/build-output/*.js public/wasm/
   ```

### WASM Failed to Load

**Error**: "WASM runtime loading failed"

**Check**:
1. Open browser DevTools → Network tab
2. Look for requests to `/wasm/runtime.wasm` and `/wasm/runtime.js`
3. Verify they return 200 OK (not 404)
4. Check browser console for detailed error messages

**Common Issues**:
- **CORS errors**: Ensure Next.js dev server is running
- **File not found**: Rebuild and verify files are in `public/wasm/`
- **Import errors**: Check that `runtime.js` exports the runtime module correctly

### Build Errors

**Maven build fails**:
- Check Java version: `java -version` (must be 11+)
- Check Maven version: `mvn -version` (must be 3.6+)
- Clean and rebuild: `mvn clean compile`

**TeaVM compilation errors**:
- Check Java source code for syntax errors
- Verify `@Export` and `@Import` annotations are correct
- Check TeaVM version compatibility

## Development Workflow

1. **Modify Java code** in `src/visualizer/java-runtime/sources/`
2. **Rebuild**: `cd src/visualizer/java-runtime && mvn clean compile`
3. **Refresh browser** - Next.js will serve updated WASM files
4. **Test visualization** - Run a simple Java program

## Verification

### Check WASM is Loaded

Open browser console and run:
```javascript
window.__visualizer_runtime
```

Should return the runtime object (not `undefined`).

### Test Ping

```javascript
window.__visualizer_runtime.ping()
```

Should return `"pong"` or a string containing "ready".

### Check Network Tab

In DevTools → Network:
- Look for `/wasm/runtime.wasm` - should be ~XXX KB
- Look for `/wasm/runtime.js` - should load successfully
- Both should have status 200

## Architecture

### File Flow

```
Java Source (VisualizerRuntime.java)
    ↓
Maven + TeaVM Compilation
    ↓
build-output/runtime.wasm + runtime.js
    ↓
Maven Copy Plugin
    ↓
public/wasm/runtime.wasm + runtime.js
    ↓
Next.js Static Serving
    ↓
Browser WASM Loader (wasm-loader.ts)
    ↓
JavaRunner Execution
```

### No Simulation

The visualizer **does not** fall back to simulation. If WASM fails to load:
- User sees clear error message
- "Visualize" button is disabled
- Instructions shown to build WASM runtime

## Next Steps

Once WASM is built and loaded:
1. Visualizer will use real Java execution
2. Loops will execute correctly (multiple iterations)
3. Output will accumulate properly
4. All snapshots will be generated

## Support

If issues persist:
1. Check browser console for detailed errors
2. Verify WASM files exist and are accessible
3. Rebuild with `mvn clean compile`
4. Check TeaVM documentation for advanced issues

