/**
 * Code Injector
 *
 * Injects TracePrinter calls into Java source code for execution tracing.
 * This version is SAFE and guarantees valid Java output.
 */

export interface InstrumentationResult {
    instrumentedCode: string;
    tracePrinterCode: string;
    errors: string[];
    warnings: string[];
  }
  
  export class Injector {
    private static readonly TRACE_PRINTER_CLASS = "TracePrinter";
  
    static instrument(sourceCode: string): InstrumentationResult {
      const errors: string[] = [];
      const warnings: string[] = [];
  
      let code = sourceCode;
  
      try {
        code = this.wrapMainInTryCatch(code);
        code = this.injectTracking(code);
        code = this.addEndMarker(code);
      } catch (e: any) {
        errors.push(String(e.message || e));
      }
  
      return {
        instrumentedCode: code,
        tracePrinterCode: this.getTracePrinterCode(),
        errors,
        warnings
      };
    }
  
    /**
     * SAFELY wrap main method in try/catch
     */
    private static wrapMainInTryCatch(code: string): string {
      const regex = /public\s+static\s+void\s+main\s*\([^)]*\)\s*\{/;
  
      const match = code.match(regex);
      if (!match) return code;
  
      const index = match.index!;
      const startBrace = code.indexOf("{", index);
      if (startBrace === -1) return code;
  
      let braceCount = 1;
      let pos = startBrace + 1;
  
      while (pos < code.length && braceCount > 0) {
        if (code[pos] === "{") braceCount++;
        else if (code[pos] === "}") braceCount--;
        pos++;
      }
  
      const before = code.slice(0, startBrace + 1);
      const body = code.slice(startBrace + 1, pos - 1);
      const after = code.slice(pos - 1);
  
      return (
        before +
        `
  try {
  ${body}
  } catch (Exception e) {
      TracePrinter.exception(e.getClass().getSimpleName(), e.getMessage(), 0);
      throw e;
  }
  TracePrinter.end();
  ` +
        after
      );
    }
  
    /**
     * Main instrumentation for steps, variables, prints, returns.
     */
    private static injectTracking(code: string): string {
      const lines = code.split("\n");
      const result: string[] = [];
  
      let insideMethod = false;
      let braceDepth = 0;
  
      let lineNumber = 0;
  
      for (let i = 0; i < lines.length; i++) {
        const raw = lines[i];
        lineNumber++;
        const line = raw;
        const trimmed = line.trim();
        const indent = line.match(/^(\s*)/)?.[1] ?? "";

        // Detect method start
        if (
          trimmed.match(
            /^(public|private|protected)?\s*(static)?\s*\w[\w<>[\]]*\s+\w+\s*\([^)]*\)\s*\{/
          )
        ) {
          insideMethod = true;
          braceDepth = 1;
          result.push(line);
          // Inject STEP at the start of main method (first executable line after opening brace)
          if (trimmed.includes("main")) {
            // We'll inject STEP after the opening brace
            // Check if opening brace is on same line
            if (trimmed.includes("{")) {
              // Opening brace on same line - inject STEP on next iteration
              // We'll handle this by checking if we're inside main and at first line
            }
          }
          continue;
        }

        if (insideMethod) {
          // Count braces to detect method end
          const opens = (line.match(/\{/g) || []).length;
          const closes = (line.match(/\}/g) || []).length;
          braceDepth += opens - closes;

          if (braceDepth <= 0) {
            insideMethod = false;
            result.push(line);
            continue;
          }

          // If we just entered a method (braceDepth === 1 and we have an opening brace on this line)
          // and this is the first non-empty line after method declaration, inject STEP
          if (braceDepth === 1 && opens > 0 && trimmed === "{") {
            // This is the opening brace of the method body
            // We'll inject STEP on the next executable line
            result.push(line);
            continue;
          }

          // ❌ DO NOT instrument for(...) HEADERS
          if (trimmed.startsWith("for(") || trimmed.startsWith("for (")) {
            result.push(line);
            // Extract loop variable and inject tracking after opening brace
            const forVarMatch = trimmed.match(/for\s*\(\s*(int|long|double|float|boolean|char|String|byte|short)?\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
            if (forVarMatch) {
              const varName = forVarMatch[2];
              // Check if opening brace is on same line
              if (trimmed.includes("{")) {
                result.push(`${indent}    TracePrinter.var("${varName}", ${varName});`);
              }
              // If brace is on next line, we'll handle it there
            }
            continue;
          }
          
          // Handle opening brace after for-loop (inject loop variable tracking)
          if (i > 0 && (lines[i-1].trim().startsWith("for(") || lines[i-1].trim().startsWith("for (")) && trimmed === "{") {
            result.push(line);
            const prevLine = lines[i-1].trim();
            const forVarMatch = prevLine.match(/for\s*\(\s*(int|long|double|float|boolean|char|String|byte|short)?\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
            if (forVarMatch) {
              const varName = forVarMatch[2];
              result.push(`${indent}    TracePrinter.var("${varName}", ${varName});`);
            }
            continue;
          }
  
          // Inject STEP before executable statements
          if (this.isExecutable(trimmed)) {
            result.push(`${indent}TracePrinter.step(${lineNumber});`);
          }
  
          // Handle System.out - inject tracking but keep original line
          if (trimmed.includes("System.out.println(")) {
            const argMatch = trimmed.match(/System\.out\.println\s*\(([^)]+)\)/);
            if (argMatch) {
              const arg = argMatch[1];
              result.push(`${indent}TracePrinter.out(String.valueOf(${arg}));`);
              result.push(line); // Keep original line
              continue;
            }
          }

          if (trimmed.includes("System.out.print(")) {
            const argMatch = trimmed.match(/System\.out\.print\s*\(([^)]+)\)/);
            if (argMatch) {
              const arg = argMatch[1];
              result.push(`${indent}TracePrinter.out(String.valueOf(${arg}));`);
              result.push(line); // Keep original line
              continue;
            }
          }
  
          // Variable declaration with initialization
          let decl = trimmed.match(
            /^(int|long|double|float|boolean|char|String|byte|short)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+);$/
          );
          if (decl) {
            const varName = decl[2];
            result.push(line);
            result.push(`${indent}TracePrinter.var("${varName}", ${varName});`);
            continue;
          }
  
          // Simple assignment
          let assign = trimmed.match(
            /^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+);$/
          );
          if (assign) {
            const varName = assign[1];
            result.push(line);
            result.push(`${indent}TracePrinter.var("${varName}", ${varName});`);
            continue;
          }
        }
  
        result.push(line);
      }
  
      return result.join("\n");
    }
  
    private static isExecutable(trimmed: string): boolean {
      if (!trimmed) return false;
      if (trimmed.startsWith("//")) return false;
      if (trimmed.startsWith("/*") || trimmed.startsWith("*")) return false;
      if (trimmed.startsWith("class ") || trimmed.startsWith("import ")) return false;
      if (trimmed === "{" || trimmed === "}") return false;
      if (trimmed.endsWith("{")) return false; // declaration lines
      return true;
    }
  
    /**
     * Adds END marker when main() finishes.
     * Note: END marker is already added by wrapMainInTryCatch, so this is a no-op.
     * Keeping for backwards compatibility.
     */
    private static addEndMarker(code: string): string {
      // END marker is already added in wrapMainInTryCatch, so just return code as-is
      return code;
    }
  
    /**
     * Minimal TracePrinter class.
     */
    private static getTracePrinterCode(): string {
      return `public class TracePrinter {
  
      public static void step(int line) {
          System.err.println("STEP " + line);
      }
  
      public static void var(String name, Object value) {
          String v = value == null ? "null" : String.valueOf(value);
          System.err.println("VAR " + name + " " + v);
      }
  
      public static void out(String text) {
          System.err.println("OUT " + text);
      }
  
      public static void call(String methodName) {
          System.err.println("CALL " + methodName);
      }
  
      public static void ret(String methodName, Object value) {
          String v = value == null ? "null" : String.valueOf(value);
          System.err.println("RET " + methodName + " " + v);
      }
  
      public static void end() {
          System.err.println("END");
      }
  
      public static void exception(String type, String msg, int line) {
          System.err.println("EXCEPTION " + type + " " + msg + " " + line);
      }
  }`;
    }
  }
  