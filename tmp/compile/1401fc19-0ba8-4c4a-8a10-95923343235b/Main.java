public class Main {
    public static void main(String[] args) {
  try {
  
        TracePrinter.step(5);
        int x = 0;
        TracePrinter.var("x", x);
        for (int i = 0; i < 5; i++) {
            TracePrinter.var("i", i);
            TracePrinter.step(7);
            x = x + i;
            TracePrinter.var("x", x);
            TracePrinter.step(8);
            TracePrinter.out(String.valueOf(x));
            System.out.println(x);
        }
    
  } catch (Exception e) {
      TracePrinter.step(12);
      TracePrinter.exception(e.getClass().getSimpleName(), e.getMessage(), 0);
      TracePrinter.step(13);
      throw e;
  }
  TracePrinter.step(15);
  TracePrinter.end();
  }
}