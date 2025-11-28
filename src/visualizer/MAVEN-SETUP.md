# Maven & JDK Setup Guide

## Prerequisites

### JDK 11+ (Required for CheerpJ Pipeline)

The Java Visualizer requires JDK 11+ for compiling user code. The `javac` compiler must be available in your PATH.

**Install JDK:**
1. Download from: https://adoptium.net/
2. Install JDK
3. Add JDK `bin` directory to PATH
4. Verify: `javac -version`

**Note**: If JDK is not installed, the visualizer will show a clear error message with installation instructions.

### Maven (Required for TeaVM WASM Runtime)

Maven (`mvn`) is required to build the TeaVM WASM runtime (fallback option). If you're using CheerpJ, Maven is optional.

## Solution: Install Maven

### Windows Installation

#### Option 1: Using Chocolatey (Recommended)

If you have Chocolatey installed:
```powershell
choco install maven
```

#### Option 2: Manual Installation

1. **Download Maven**:
   - Go to: https://maven.apache.org/download.cgi
   - Download: `apache-maven-3.9.x-bin.zip` (latest version)

2. **Extract**:
   - Extract to: `C:\Program Files\Apache\maven` (or your preferred location)

3. **Add to PATH**:
   - Open "Environment Variables" (Win + R → `sysdm.cpl` → Advanced → Environment Variables)
   - Edit "Path" in System variables
   - Add: `C:\Program Files\Apache\maven\bin`
   - Click OK

4. **Verify Installation**:
   ```powershell
   mvn -version
   ```
   Should show Maven version and Java version.

#### Option 3: Using Scoop

If you have Scoop installed:
```powershell
scoop install maven
```

### Verify Java is Installed

Maven requires Java JDK 11+:
```powershell
java -version
```

If Java is not installed:
- Download: https://adoptium.net/ (OpenJDK)
- Install JDK 11 or later
- Add to PATH if needed

## After Installing Maven

1. **Close and reopen PowerShell** (to refresh PATH)

2. **Verify Maven works**:
   ```powershell
   mvn -version
   ```

3. **Build WASM Runtime**:
   ```powershell
   cd src/visualizer/java-runtime
   mvn clean compile
   ```

4. **Verify Output**:
   ```powershell
   ls build-output/
   # Should see: runtime.wasm, runtime.js
   
   ls ../../../../public/wasm/
   # Should see: runtime.wasm, runtime.js
   ```

5. **Refresh Browser**:
   - The visualizer should now load WASM successfully

## Troubleshooting

### "mvn: command not found"

**Cause**: Maven not in PATH or not installed

**Solution**:
- Verify Maven is installed: Check `C:\Program Files\Apache\maven\bin\mvn.cmd` exists
- Restart PowerShell/Terminal after adding to PATH
- Try full path: `C:\Program Files\Apache\maven\bin\mvn.cmd -version`

### "JAVA_HOME not set"

**Cause**: Maven can't find Java

**Solution**:
- Set JAVA_HOME environment variable:
  - Variable: `JAVA_HOME`
  - Value: `C:\Program Files\Java\jdk-11` (or your JDK path)
- Restart PowerShell

### Build Fails

**Common Issues**:
- **Java version too old**: Need JDK 11+
- **Maven version too old**: Need 3.6+
- **Network issues**: Maven downloads dependencies on first run

**Solution**:
```powershell
# Check versions
java -version
mvn -version

# Clean and retry
cd src/visualizer/java-runtime
mvn clean
mvn compile
```

## Quick Test

After setup, test Maven:
```powershell
mvn -version
```

Expected output:
```
Apache Maven 3.9.x
Maven home: C:\Program Files\Apache\maven
Java version: 11.x.x
```

## Alternative: Use Docker

If you prefer not to install Maven locally:

```powershell
# Using Docker (if installed)
docker run -it --rm -v ${PWD}:/workspace -w /workspace/src/visualizer/java-runtime maven:3.9 mvn clean compile
```

Then copy files manually:
```powershell
Copy-Item src/visualizer/java-runtime/build-output/*.wasm public/wasm/
Copy-Item src/visualizer/java-runtime/build-output/*.js public/wasm/
```

