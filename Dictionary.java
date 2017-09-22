import java.io.*;
import java.lang.Character.*;
import java.util.Scanner;

public class Dictionary {

    public static final int ARRAY_SIZE = 1000000;
    public static final int NUM_ITERATIONS = 10000;
    public static final int N = 64; // every Nth word gets inserted into the index
    public int[] index = new int[ARRAY_SIZE]; // [0 18 1 389 2 401 3 512 4 601 ....]
    public String[] keyframe = new String[ARRAY_SIZE];
    public String suffix_str = "";
    public int keyframe_size = 0;
    public long suffix_str_length;

    public Dictionary(String dictionary_file_name) { 

        System.out.println("building dictionary...");

        try {

            BufferedReader in = new BufferedReader(new FileReader(dictionary_file_name)); 
            int count = 0; 
            int num_iterations = 0;
            int index_pointer = 0;
            int keyframe_pointer = 0;
            int suffix_pointer = 0; // points into suffix_str
            boolean needToAddFirstWord = true;
            String prev = "";

            while (true) {

                String str = in.readLine();
                
                if (str == null) {
                    break;    
                }
                
                int c1=0; 
                int c2=0;
                int c3=0;
                boolean writing = false;
                for (int i=0; i<str.length(); i++) {
                    //System.out.println("prev = " + prev + ", str = " + str);
                    if (i >= prev.length() || prev.charAt(i) != str.charAt(i)) {
                        if (!writing) {
                            writing = true;
                            suffix_str += (char) (i + '0');        
                            c3++;
                        } 
                    } else {
                        c1++;
                    }
                    if (writing) {
                        suffix_str += str.charAt(i);
                        c3++;
                    }
                }    
                
                /*
                System.out.println("count = " + count);
                System.out.println("str = " + str);
                System.out.println("suffix_pointer = " + suffix_pointer);
                System.out.println("suffix_str = " + suffix_str);
                System.out.println("suffix_str.charAt(suffix_pointer) = " + suffix_str.charAt(suffix_pointer));
                System.out.println("prev = " + prev);
                System.out.println();
                */

                prev = str;
                count++;
                num_iterations++;

                if (count == N || needToAddFirstWord) {

                    if (needToAddFirstWord) needToAddFirstWord = false;

                    /*
                    System.out.println("|||||||||||||||||||||||");
                    System.out.println("UPDATING_INDEX_AND_KEYFRAME");
                    */

                    keyframe[keyframe_pointer] = str;

                    index[index_pointer] = keyframe_pointer;
                    index_pointer++;
                    index[index_pointer] = suffix_pointer;

                    // for debugging purposes
                    
                    
                    /*
                    System.out.println("UPDATED_INDEX_AND_KEYFRAME");
                    System.out.println("SUFFIX_STR_LENGTH = " + suffix_str.length());
                    System.out.println("SUFFIX_STR = " + suffix_str);
                    System.out.println("suffix.str.charAt(suffix_pointer) = " 
                            + suffix_str.charAt(suffix_pointer));
                    System.out.println("SUFFIX_POINTER = " + suffix_pointer);
                    System.out.println("UPDATING_KEYFRAME_POINTER...");
                    System.out.println("PRINTING_INDEX...");
                    for (int j=0; j<=index_pointer; j++) {
                        System.out.print(index[j] + " ");        
                    }
                    
                    System.out.println();
                    System.out.println("PRINTING_KEYFRAME...");
                    for (int j=0; j<=keyframe_pointer; j++) {
                        System.out.print(keyframe[j] + " ");    
                    }
                    System.out.println();
                    
                    System.out.println("|||||||||||||||||||||||");
                    System.out.println();
                    

                    */
                    System.out.print(keyframe[keyframe_pointer] + " ");

                    keyframe_size++;
                    keyframe_pointer++;
                    index_pointer++;
                    count = 0;

                }

                suffix_pointer += c3;

            }

            suffix_str_length = suffix_str.length();

            in.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println();
    }

    public void writeToFile(String name) {
        try {

            BufferedWriter out = new BufferedWriter(new FileWriter(name + ".dict"));    
            for (int i=0; i<keyframe_size; i++) {
                out.write(index[2*i] + " " + index[2*i+1] + " ");
            }
            out.newLine();
            for (int i=0; i<keyframe_size; i++) {
                out.write(keyframe[i] + " ");
            }
            out.newLine();
            out.write(suffix_str);
            out.newLine();
            out.write(keyframe_size + " ");
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Dictionary(String dictionary_file_name, boolean b) {
        try {
            BufferedReader in = new BufferedReader(new FileReader(dictionary_file_name + ".dict"));

            String[] index_str_arr = in.readLine().split(" ");
            for (int i=0; i<index_str_arr.length; i++) {
                index[i] = Integer.parseInt(index_str_arr[i]);
            }

            keyframe = in.readLine().split(" ");
            suffix_str = in.readLine();
            keyframe_size = Integer.parseInt(in.readLine().trim());
            suffix_str_length = suffix_str.length();

            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean equals(Dictionary d1) {
        System.out.println("CHECKING_DICTIONARY_EQUIVALENCE...");
        if (keyframe_size != d1.keyframe_size) {
            System.out.println("KEYFRAME_SIZES_UNEQUAL,RETURNING_FALSE...");
            System.out.println("this.keyframe_size = " + keyframe_size);
            System.out.println("d1.keyframe_size = " + d1.keyframe_size);
            return false;
        }
        for (int i=0; i<keyframe_size; i++) {
            if (index[2*i] != d1.index[2*i]) {
                System.out.println("index[2*" + i + "] != d1.index[2*" + i + "]");
                System.out.println("index[2*" + i + "] = " + index[2*i]);
                System.out.println("d1.index[2*" + i + "] = " + d1.index[2*i]);
                examine_arr(rectify(index), 2*i, 10);
                examine_arr(rectify(d1.index), 2*i, 10);
                return false;
            }
            if (index[2*i+1] != d1.index[2*i+1]) {
                System.out.println("index[2*" + i + "+1] != d1.index[2*" + i + "+1]");
                System.out.println("index[2*" + i + "+1] = " + index[2*i+1]);
                System.out.println("d1.index[2*" + i + "+1] = " + d1.index[2*i+1]);
                examine_arr(rectify(index), 2*i+1, 10);
                examine_arr(rectify(d1.index), 2*i+1, 10);
                return false;
            }
            if (!keyframe[i].equals(d1.keyframe[i])) {
                System.out.println("keyframe[" + i + "] != d1.keyframe[" + i + "]");
                System.out.println("keyframe[" + i + "] =" + keyframe[i]);
                System.out.println("d1.keyframe[" + i + "] =" + d1.keyframe[i]);
                examine_arr(keyframe, i, 10);
                examine_arr(d1.keyframe, i, 10);
                return false;
            }
        }
        if (!suffix_str.equals(d1.suffix_str)) {
            System.out.println("SUFFIX_STRINGS_UNEQUAL,RETURNING_FALSE...");
            return false;
        }
        System.out.println("DICTIONARIES_EQUIVALENT,RETURNING_TRUE...");
        return true;
    }

    public static Integer[] rectify(int[] in) {
        Integer[] ret = new Integer[in.length];
        for (int i=0; i<in.length; i++) {
            ret[i] = new Integer(in[i]);
        }
        return ret;
    }

    public boolean includes(String word, boolean verbose) {
       if (verbose) System.out.println("Starting search for word: " + word);
       return includes(word, 0, keyframe_size-1, verbose); 
    }

    public boolean includes(String word, int left, int right, boolean verbose) {
        int mp = (left + right)/2;
        String current_word = keyframe[index[2*mp]];

        if (current_word.compareTo(word) == 0) return true;

        if (left == right || left == right-1) {

            if (verbose) System.out.println("first stage of binary search is concluding...");

            int x = mp;

            String next_word = keyframe[index[2*(mp+1)]];
            
            if (verbose) {
                System.out.println("left = " + left + ", right = " + right);
                System.out.println("current_word = " + current_word);
                System.out.println("next_word = " + next_word);
                System.out.println("selecting keyframe chunk to scan through...");
            }
            

            if (left == right-1 && word.compareTo(next_word) >= 0) {
                if (word.compareTo(next_word) == 0) return true;
                current_word = next_word;
                x++;
            }

            int suffix_pointer = index[2*x+1]; 
            
            if (verbose) {  
                System.out.println("selected keyframe chunk to scan through, starting at the current word listed below");
                System.out.println("current_word = " + current_word);
                System.out.println("suffix_pointer = " + suffix_pointer);
                System.out.println("suffix_str.charAt(suffix_pointer) = " 
                        + suffix_str.charAt(suffix_pointer));
                examine_suffix_str(suffix_pointer, 20);
                System.out.println("current_word.length() = " + current_word.length());
                System.out.println("suffix_str_length = " + suffix_str_length);
            }

            
            // at this point, we know that current_word != word
            suffix_pointer++;
            while (Character.isAlphabetic(suffix_str.charAt(suffix_pointer))) suffix_pointer++;
            

            String prev_word = current_word;
            String tmp = "";

            int i=1;
            while (i < N && suffix_pointer < suffix_str_length) {
                
                char length_char = suffix_str.charAt(suffix_pointer);
                int length = (int) (length_char - '0');
                tmp += prev_word.substring(0, length); //first part of the reconstruction
                suffix_pointer++;

                while (suffix_pointer < suffix_str_length && Character.isAlphabetic(suffix_str.charAt(suffix_pointer))) {
                    tmp += suffix_str.charAt(suffix_pointer);
                    suffix_pointer++;
                } 

                if (verbose) {
                    System.out.println("tmp = " + tmp);
                    System.out.println("suffix_pointer = " + suffix_pointer);
                    System.out.println("prev_word = " + prev_word);
                }

                if (word.compareTo(tmp) == 0) return true;

                prev_word = tmp; 
                tmp = "";

                i++;

            }
            System.out.println("Binary search concluding...");
            return false;
        }
        if (current_word.compareTo(word) > 0) {
            return includes(word, left, mp-1, verbose);
        } else { // current_word.compareTo(word) < 0 
            return includes(word, mp, right, verbose);
        }
    }

    public static boolean binSearch(String[] arr, String str) {
        return binSearch(arr, str, 0, arr.length-1);
    }

    public static boolean binSearch(String[] arr, String str, int left, int right) {
        int mp = (left + right) / 2;
        if (arr[mp].compareTo(str) == 0) {
            return true;
        }
        if (left >= right) {
            return false;
        }
        if (arr[mp].compareTo(str) > 0) {
            return binSearch(arr, str, left, mp-1);
        } else { // arr[mp].compareTo(str) < 0
            return binSearch(arr, str, mp+1, right);
        }
    }

    public void examine_suffix_str(int index, int width) {
        int start = index - width >= 0 ? index - width : 0;
        int end = index + width < suffix_str.length() ? index + width : suffix_str.length()-1;
        System.out.println(suffix_str.substring(start, end+1));
    }

    public void examine_arr(Object[] arr, int index, int width) {
        int start = index - width >= 0 ? index - width : 0;
        int end = index + width < arr.length ? index + width : arr.length - 1;
        for (int i=start; i<=end; i++) {
            if (i==index) {
                System.out.print("|" + arr[i] + "| ");
            } else {
                System.out.print(arr[i] + " ");
            }
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Dictionary dict = new Dictionary("dictionary.txt");
        System.out.println("Dictionary dict has been created.");
        System.out.println("dict.suffix_str_length = " + dict.suffix_str_length);
        dict.writeToFile("d1");
        Dictionary d1 = new Dictionary("d1", true);
        System.out.println("Dictionary d1 has been loaded from a file.");
        System.out.println("d1.suffix_str_length = " + d1.suffix_str_length);
        System.out.println("Checking now if dict.equals(d1)");
        System.out.println(dict.equals(d1));
        System.out.println("Checking now if dict and d1 include every word in the input dictionary.");

        boolean dictPassedAllTests = true;
        boolean d1PassedAllTests = true;
                
        try {
            BufferedReader in1 = new BufferedReader(new FileReader("dictionary.txt"));
            while (true) {
                String str = in1.readLine();
                if (str == null) break;

                if (!dict.includes(str, false)) {
                    dictPassedAllTests = false;
                    System.out.println("dict failed word: " + str);
                    System.out.println();
                }

                if (!d1.includes(str, false)) {
                    d1PassedAllTests = false;
                    System.out.println("d1 failed word: " + str);
                    System.out.println();
                }
                //System.out.println("--------------");
            }

            if (dictPassedAllTests) {
                System.out.println("dict contains every word in the input dictionary.");
            }
            if (d1PassedAllTests) {
                System.out.println("d1 contains every word in the input dictionary.");
            }

            in1.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("beginning interactive testing. type 'dict_name' ',' 'word' to see if the dictionary"
                + "with name 'dict_name' includes 'word'.");

        Scanner in2 = new Scanner(System.in);

        while (true) {
            String line = in2.next().trim().toUpperCase();

            System.out.println("input line is below:");
            System.out.println(line);

            String[] arr = line.split(",");
            String dict_name = arr[0];
            String word = arr[1];

            System.out.println("dict_name = " + dict_name);
            System.out.println("word = " + word);
            System.out.println("word.length() = " + word.length());
        
            boolean b = dict_name.equals("dict") ? dict.includes(word, true) : d1.includes(word, true);

            System.out.println(dict_name + ".includes(" + word + ") = " + b);
            System.out.println("waiting for user input...");
        }
        
        //String[] arr = {"abc", "abd", "cde", "cfe", "ggg", "hhh", "khi", "lmn", "zzz"};
        //System.out.println(binSearch(arr, "head") + ", should be false");
        //System.out.println(binSearch(arr, "cfe") + ", should be true");
        //System.out.println(binSearch(arr, "abd") + ", should be true");
        //System.out.println(binSearch(arr, "zzz") + ", should be true");
        //System.out.println(binSearch(arr, "abc") + ", should be true");
        //System.out.println(binSearch(arr, "lmn") + ", should be true");
        //System.out.println(binSearch(arr, "ggh") + ", should be false");
        //System.out.println(binSearch(arr, "cfe0") + ", should be false");

        /*
        for (int i=0; i<=15; i++) {
            System.out.println((char) (i + '0'));
        }
        */
        
        /*
        System.out.println((char) ((int)'9' + 1));
        System.out.println((char) ((int)'9' + 2));
        System.out.println((char) ((int)'9' + 3));
        System.out.println((char) ((int)'9' + 4));
        System.out.println((char) ((int)'9' + 5));
        System.out.println((char) ((int)'9' + 6));
        */

        /*
        System.out.println((int) ('0' - '0'));
        System.out.println((int) ('1' - '0'));
        System.out.println((int) ('2' - '0'));
        System.out.println((int) ('3' - '0'));
        System.out.println((int) ('4' - '0'));
        System.out.println((int) ('5' - '0'));
        System.out.println((int) ('6' - '0'));
        System.out.println((int) ('7' - '0'));
        System.out.println((int) ('8' - '0'));
        System.out.println((int) ('9' - '0'));
        System.out.println((int) (':' - '0')); 
        System.out.println((int) (';' - '0')); 
        System.out.println((int) ('<' - '0')); 
        System.out.println((int) ('=' - '0')); 
        System.out.println((int) ('>' - '0')); 
        System.out.println((int) ('?' - '0')); 
        */

        /*
        for (int i=0; i<=15; i++) {
            System.out.println(Character.isAlphabetic((char) (i + '0')));
        }
        */
        
    }
}
