public class Main { public static void main(String[] args) { int x = 0;
 TracePrinter.var("x", x);
 TracePrinter.var("x", x); for(int i=0;
 TracePrinter.var("i", i);
TracePrinter.var("i", i);i<5;i++){ x = x + i;
 TracePrinter.var("x", x); TracePrinter.out(String.valueOf(x));
System.out.println(x); } TracePrinter.end();
} }