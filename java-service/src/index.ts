
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { join } from 'path';
import { existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { readFile } from 'fs/promises';
import { JavaCompiler } from './backend/compiler/JavaCompiler';
import { Injector } from './backend/trace/Injector';
import { JavaSandbox } from './backend/sandbox/JavaSandbox';
import { TraceParser } from './backend/trace/TraceParser';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const execAsync = promisify(exec);

// Health check
app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'java-execution-service' });
});

// Compile endpoint
app.post('/compile', async (req: Request, res: Response) => {
    try {
        const { source, packageName: providedPackage, mainClass: providedMainClass } = req.body;

        if (!source || typeof source !== 'string') {
            return res.status(400).json({ success: false, error: 'Invalid request: source code is required' });
        }

        // Parse Java source to extract package and class
        const packageMatch = source.match(/package\s+([a-zA-Z_][a-zA-Z0-9_.]*)\s*;/);
        const classMatch = source.match(/public\s+class\s+([a-zA-Z_][a-zA-Z0-9_]*)/);

        const parsedPackage = packageMatch ? packageMatch[1] : null;
        const parsedClass = classMatch ? classMatch[1] : null;

        const packageName = providedPackage || parsedPackage;
        const mainClass = providedMainClass || parsedClass;

        if (!mainClass) {
            return res.status(400).json({
                success: false,
                error: 'Could not determine main class. Please provide a public class with a main method.'
            });
        }

        // Use JavaCompiler to compile
        // Note: JavaCompiler.compile expects sourceCode and tracePrinterCode
        // But for raw compilation we just want to compile the user's code.
        // We can reuse JavaCompiler but we might need to adapt it or just use raw javac here 
        // to match the original route logic which created a JAR.

        // Original route logic:
        // 1. Create unique dir
        // 2. Write source
        // 3. Compile
        // 4. Create JAR
        // 5. Return JAR URL (but here we should return JAR content or path)

        // Let's implement the specific JAR compilation logic here as it differs from the trace compilation

        const { v4: uuidv4 } = require('uuid');
        const { mkdir, writeFile, rm } = require('fs/promises');

        const compileId = uuidv4();
        const tmpDir = process.platform === 'win32' ? join(process.cwd(), 'tmp') : '/tmp';
        const compileDir = join(tmpDir, 'compile', compileId);

        await mkdir(compileDir, { recursive: true });

        // Create package directory structure if needed
        let sourceFilePath = join(compileDir, `${mainClass}.java`);
        if (packageName) {
            const packageDir = join(compileDir, ...packageName.split('.'));
            await mkdir(packageDir, { recursive: true });
            sourceFilePath = join(packageDir, `${mainClass}.java`);
        }

        await writeFile(sourceFilePath, source, 'utf-8');

        // Compile
        const javacCommand = `javac -d "${compileDir}" "${sourceFilePath}"`;

        try {
            await execAsync(javacCommand, { cwd: compileDir });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                error: 'Compilation failed',
                compilationErrors: error.stderr || error.message,
            });
        }

        // Create JAR
        const jarPath = join(compileDir, `${compileId}.jar`);
        const jarCommand = `jar cf "${jarPath}" -C "${compileDir}" .`;

        await execAsync(jarCommand);

        // Read JAR file
        const jarBuffer = await readFile(jarPath);
        const jarBase64 = jarBuffer.toString('base64');

        // Cleanup
        // rm(compileDir, { recursive: true, force: true }).catch(() => {});

        return res.json({
            success: true,
            jarBase64,
            mainClass: packageName ? `${packageName}.${mainClass}` : mainClass,
            compileId,
        });

    } catch (error: any) {
        console.error('Compile error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message,
        });
    }
});

// Run endpoint
app.post('/run', async (req: Request, res: Response) => {
    try {
        const { code } = req.body;

        if (!code || typeof code !== 'string') {
            return res.status(400).json({ success: false, error: 'Invalid request: code is required' });
        }

        // Ensure code has a Main class declaration
        let processedCode = code.trim();
        const classMatch = processedCode.match(/public\s+class\s+(\w+)/);
        const className = classMatch ? classMatch[1] : null;

        if (!className || className !== 'Main') {
            if (className) {
                processedCode = processedCode.replace(/public\s+class\s+\w+/, 'public class Main');
            } else {
                processedCode = `public class Main {
    ${processedCode}
}`;
            }
        }

        // Step 1: Instrument code
        const instrumented = Injector.instrument(processedCode);

        if (instrumented.errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Instrumentation failed',
                errors: instrumented.errors,
            });
        }

        // Step 2: Compile
        const compileResult = await JavaCompiler.compile(
            instrumented.instrumentedCode,
            instrumented.tracePrinterCode
        );

        if (!compileResult.success) {
            return res.status(400).json({
                success: false,
                error: 'Compilation failed',
                errors: compileResult.errors,
                warnings: compileResult.warnings,
                instrumentedCodePreview: instrumented.instrumentedCode.substring(0, 2000),
            });
        }

        // Step 3: Execute in sandbox
        const execResult = await JavaSandbox.execute(compileResult.classpath);

        if (!execResult.success && !execResult.timedOut) {
            return res.status(500).json({
                success: false,
                error: 'Execution failed',
                errors: [execResult.error || `Exit code: ${execResult.exitCode}`],
                stdout: execResult.stdout,
                stderr: execResult.stderr,
            });
        }

        // Step 4: Parse trace
        const parsed = TraceParser.parse(execResult.stderr, execResult.stdout);

        // Step 5: Return snapshots
        return res.json({
            success: true,
            snapshots: parsed.snapshots,
            output: parsed.output,
            errors: parsed.errors,
            warnings: [...instrumented.warnings, ...compileResult.warnings],
            timedOut: execResult.timedOut,
        });

    } catch (error: any) {
        console.error('Run error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Java execution service listening on port ${port}`);
});
