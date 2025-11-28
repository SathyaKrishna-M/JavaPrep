public class TracePrinter {
  
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
  }