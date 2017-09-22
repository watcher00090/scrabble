import java.io.*;
import java.lang.Character.*;
import java.util.Scanner;

public class Test {

    public static void main(String[] args) {
        try {
            BufferedWriter out = new BufferedWriter(new FileWriter("test.txt"));    
            out.write("Line A\n");
            out.write("Line B\n");
            out.write("Line C\n");
            out.close();
            BufferedReader in = new BufferedReader(new FileReader("test.txt"));
            String s = in.readLine();
            System.out.println("The first line of test.txt has size: " + s.length());
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
