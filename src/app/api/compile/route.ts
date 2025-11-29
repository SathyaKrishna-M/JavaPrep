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
    const javaServiceUrl = process.env.JAVA_SERVICE_URL;

    if (!javaServiceUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Configuration Error',
          message: 'JAVA_SERVICE_URL environment variable is not set. Please deploy the java-service and configure this variable.'
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    try {
      const response = await fetch(`${javaServiceUrl}/compile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
      }

      // If successful, the service returns jarBase64
      // We need to save it to the public directory so the frontend can load it
      // Or we can return it directly if the frontend supports it.
      // The current frontend expects a jarUrl.

      if (data.success && data.jarBase64) {
        const jarBuffer = Buffer.from(data.jarBase64, 'base64');
        const jarFileName = `${data.compileId}.jar`;
        const jarPath = join(process.cwd(), 'public', 'jars', jarFileName);

        // Ensure directory exists
        const { mkdir, writeFile } = require('fs/promises');
        await mkdir(join(process.cwd(), 'public', 'jars'), { recursive: true });
        await writeFile(jarPath, jarBuffer);

        return NextResponse.json({
          success: true,
          jarUrl: `/jars/${jarFileName}`,
          mainClass: data.mainClass,
          compileId: data.compileId,
        });
      }

      return NextResponse.json(data);

    } catch (fetchError: any) {
      return NextResponse.json(
        {
          success: false,
          error: 'Service Unavailable',
          message: `Failed to connect to Java execution service: ${fetchError.message}`
        },
        { status: 503 }
      );
    }

  } catch (error: any) {
    console.error('[Compile API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

