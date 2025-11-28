public class Main {
    TracePrinter.step(2);
    public static void main(String[] args) {
TracePrinter.step(3);
try {

        TracePrinter.step(5);
        int x = 0;
 TracePrinter.var("x", x);

        TracePrinter.var("x", x);
        TracePrinter.step(6);
        for (int i = 0;
 TracePrinter.var("i", i);
TracePrinter.var("i", i); i < 5; i++) {
            TracePrinter.step(7);
            x = x + i;

            TracePrinter.var("x", x);
            TracePrinter.step(8);
            TracePrinter.out(String.valueOf(x));
System.out.println(x);
        }
    
TracePrinter.step(11);
} catch (Exception e) {
    TracePrinter.step(12);
    TracePrinter.exception(e.getClass().getSimpleName(), e.getMessage(), 0);
    TracePrinter.step(13);
    throw e;
}
TracePrinter.end();
}
}