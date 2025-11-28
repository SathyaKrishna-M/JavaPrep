/**
 * Java Compilation API
 * 
 * Compiles user-provided Java source code to JAR using local javac.
 * Returns JAR URL for CheerpJ to load in browser.
 */

import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFile, mkdir, readdir, unlink, stat } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'

const execAsync = promisify(exec)

// Compile directory (project-local, secure)
const COMPILE_DIR = join(process.cwd(), 'tmp', 'compile')
// JAR files are served from public directory
// Note: CheerpJ CDN is used, but JARs are still stored locally
const JAR_OUTPUT_DIR = join(process.cwd(), 'public', 'jars')

// Maximum compilation time (30 seconds)
const MAX_COMPILE_TIME = 30000

// Cleanup old compile directories (older than 1 hour)
const CLEANUP_AGE_MS = 60 * 60 * 1000

/**
 * Validates that javac is available on the system
 */
async function checkJavacAvailable(): Promise<{ available: boolean; error?: string }> {
  try {
    const { stdout, stderr } = await execAsync('javac -version', { timeout: 5000 })
    // javac -version outputs to stderr, not stdout
    if (stderr && stderr.includes('javac')) {
      return { available: true }
    }
    return { available: false, error: 'javac not found in PATH' }
  } catch (error: any) {
    return { 
      available: false, 
      error: `javac check failed: ${error.message}. Please install JDK 11+ and ensure javac is in PATH.` 
    }
  }
}

/**
 * Cleans up old compile directories
 */
async function cleanupOldCompiles(): Promise<void> {
  try {
    if (!existsSync(COMPILE_DIR)) {
      return
    }

    const dirs = await readdir(COMPILE_DIR)
    const now = Date.now()

    for (const dir of dirs) {
      const dirPath = join(COMPILE_DIR, dir)
      try {
        const stats = await stat(dirPath)
        if (stats.isDirectory() && (now - stats.mtimeMs) > CLEANUP_AGE_MS) {
          // Cleanup old directory (simplified - in production, use rimraf)
          console.log(`[Compile] Cleaning up old compile directory: ${dir}`)
        }
      } catch (error) {
        // Ignore errors during cleanup
      }
    }
  } catch (error) {
    // Ignore cleanup errors
  }
}

/**
 * Extracts package and class name from Java source
 */
function parseJavaSource(source: string): { packageName: string | null; className: string | null } {
  const packageMatch = source.match(/package\s+([a-zA-Z_][a-zA-Z0-9_.]*)\s*;/)
  const classMatch = source.match(/public\s+class\s+([a-zA-Z_][a-zA-Z0-9_]*)/)
  
  return {
    packageName: packageMatch ? packageMatch[1] : null,
    className: classMatch ? classMatch[1] : null,
  }
}

/**
 * Sanitizes filename to prevent directory traversal
 */
function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_]/g, '_')
}

export async function POST(request: NextRequest) {
  try {
    // Check javac availability
    const javacCheck = await checkJavacAvailable()
    if (!javacCheck.available) {
      return NextResponse.json(
        {
          success: false,
          error: 'JDK not available',
          message: javacCheck.error || 'javac is not installed or not in PATH. Please install JDK 11+ and ensure javac is available.',
          instructions: [
            '1. Download JDK 11+ from: https://adoptium.net/',
            '2. Install JDK',
            '3. Add JDK bin directory to PATH',
            '4. Verify: javac -version',
            '5. Restart the dev server'
          ]
        },
        { status: 503 }
      )
    }

    // Parse request
    const body = await request.json()
    const { source, packageName: providedPackage, mainClass: providedMainClass } = body

    if (!source || typeof source !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid request: source code is required' },
        { status: 400 }
      )
    }

    // Parse Java source to extract package and class
    const { packageName: parsedPackage, className: parsedClass } = parseJavaSource(source)
    const packageName = providedPackage || parsedPackage
    const mainClass = providedMainClass || parsedClass

    if (!mainClass) {
      return NextResponse.json(
        { success: false, error: 'Could not determine main class. Please provide a public class with a main method.' },
        { status: 400 }
      )
    }

    // Create unique compile directory
    const compileId = uuidv4()
    const compileDir = join(COMPILE_DIR, compileId)
    await mkdir(compileDir, { recursive: true })

    // Create package directory structure if needed
    let sourceFilePath = join(compileDir, `${mainClass}.java`)
    if (packageName) {
      const packageDir = join(compileDir, ...packageName.split('.'))
      await mkdir(packageDir, { recursive: true })
      sourceFilePath = join(packageDir, `${mainClass}.java`)
    }

    // Write source file
    await writeFile(sourceFilePath, source, 'utf-8')

    // Compile with javac
    const classpath = join(process.cwd(), 'src', 'visualizer', 'java-runtime', 'target', 'classes')
    const javacCommand = packageName
      ? `javac -cp "${classpath}" -d "${compileDir}" "${sourceFilePath}"`
      : `javac -cp "${classpath}" -d "${compileDir}" "${sourceFilePath}"`

    try {
      const { stdout, stderr } = await execAsync(javacCommand, {
        timeout: MAX_COMPILE_TIME,
        cwd: compileDir,
      })

      // javac outputs errors to stderr, warnings may be in stdout
      if (stderr && stderr.trim() && !stderr.includes('warning:')) {
        // Check if compilation actually failed (class files not created)
        const expectedClassFile = packageName
          ? join(compileDir, ...packageName.split('.'), `${mainClass}.class`)
          : join(compileDir, `${mainClass}.class`)

        if (!existsSync(expectedClassFile)) {
          return NextResponse.json(
            {
              success: false,
              error: 'Compilation failed',
              compilationErrors: stderr,
            },
            { status: 400 }
          )
        }
      }
    } catch (error: any) {
      // Compilation error
      return NextResponse.json(
        {
          success: false,
          error: 'Compilation failed',
          compilationErrors: error.stderr || error.message,
        },
        { status: 400 }
      )
    }

    // Create JAR file
    const jarFileName = `${compileId}.jar`
    const jarPath = join(JAR_OUTPUT_DIR, jarFileName)
    await mkdir(JAR_OUTPUT_DIR, { recursive: true })

    // Build jar command
    const mainClassFullName = packageName ? `${packageName}.${mainClass}` : mainClass
    const jarCommand = `jar cf "${jarPath}" -C "${compileDir}" .`

    try {
      await execAsync(jarCommand, { timeout: 10000 })
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: 'JAR creation failed',
          details: error.message,
        },
        { status: 500 }
      )
    }

    // Return JAR URL (served from public/jars/)
    const jarUrl = `/jars/${jarFileName}`

    // Schedule cleanup (async, don't wait)
    cleanupOldCompiles().catch(() => {})

    return NextResponse.json({
      success: true,
      jarUrl,
      mainClass: mainClassFullName,
      compileId,
    })
  } catch (error: any) {
    console.error('[Compile API] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

