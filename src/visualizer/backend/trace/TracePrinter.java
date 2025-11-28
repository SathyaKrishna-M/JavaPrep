/**
 * TracePrinter - Lightweight execution tracer for Java visualizer
 * 
 * Outputs execution events to stderr in a simple format:
 * STEP <line>
 * VAR <name> <value>
 * OUT <string>
 * CALL <methodName>
 * RET <methodName> <value>
 * END
 */
public class TracePrinter {
    private static boolean enabled = true;
    
    public static void step(int line) {
        if (enabled) {
            System.err.println("STEP " + line);
        }
    }
    
    public static void var(String name, Object value) {
        if (enabled) {
            String valueStr = value == null ? "null" : String.valueOf(value);
            System.err.println("VAR " + name + " " + valueStr);
        }
    }
    
    public static void out(String text) {
        if (enabled) {
            System.err.println("OUT " + text);
        }
    }
    
    public static void call(String methodName) {
        if (enabled) {
            System.err.println("CALL " + methodName);
        }
    }
    
    public static void ret(String methodName, Object value) {
        if (enabled) {
            String valueStr = value == null ? "null" : String.valueOf(value);
            System.err.println("RET " + methodName + " " + valueStr);
        }
    }
    
    public static void end() {
        if (enabled) {
            System.err.println("END");
        }
    }
    
    public static void exception(String type, String message, int line) {
        if (enabled) {
            System.err.println("EXCEPTION " + type + " " + message + " " + line);
        }
    }
}

