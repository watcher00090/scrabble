/**
 * Created by jamespedersen on 10/2/17.
 */

// ASCII character ranges for alphabetic characters (letters):
// 65 - 90 (inclusive), 97 - 122 (inclusive)
function isAlphabetic(c) {
    var code = c.charCodeAt(0);
    return (65 <= code && code <= 90) || (97 <= code && code <= 122);
}

function examine_arr(arr, index, width) {
    var start = index - width >= 0 ? index - width : 0;
    var end = index + width < arr.length ? index + width : arr.length - 1;
    for (var i=start; i<=end; i++) {
        if (i==index) {
            console.log("|" + arr[i] + "| ");
        } else {
            console.log(arr[i] + " ");
        }
    }
}

class Dictionary {
    constructor(dictionary_file_text) {

        let words = dictionary_file_text.split("\n");

        this.N = 64; // every Nth word gets inserted into the index

        this.index = []; // consists of keyframe_pointer suffix_pointer next_keyframe_pointer next_suffix_pointer .... in an arrangement like that
        this.keyframe = []; // array of Strings;

        this.suffix_str = "";
        this.keyframe_size = 0;
        this.suffix_str_length = -1;

        let count = 0;
        let num_iterations = 0;
        let index_pointer = 0;
        let keyframe_pointer = 0;
        let suffix_pointer = 0; // points into suffix_str
        let needToAddFirstWord = true;
        let prev = "";

        for (let q = 0; q < words.length; q++) {

//            debugger;

            let str = words[q];

            let c1 = 0;
            //let c2 = 0;
            let c3 = 0;
            let writing = false;
            for (let i = 0; i < str.length; i++) {
                //console.log("prev = " + prev + ", str = " + str);
                if (i >= prev.length || prev.charAt(i) != str.charAt(i)) {
                    if (!writing) {
                        writing = true;
                        // this character encodes how many characters str shares with prev.
                        // i = 0 -> ASCII(48) = 0
                        // i = 1 -> ASCII(49) = 1
                        // .....
                        // i = 9 -> ASCII(57) = 9
                        // i = 10 -> ASCII(58) = :
                        // i = 11 -> ASCII(60) = ;
                        // .....
                        this.suffix_str += String.fromCharCode(i + 48);
                        c3++;
                    }
                } else {
                    c1++;
                }

                if (writing) {
                    this.suffix_str += str.charAt(i);
                    c3++;
                }
            }

            /*
            console.log("count = " + count);
            console.log("str = " + str);
            console.log("suffix_pointer = " + suffix_pointer);
            console.log("suffix_str = " + suffix_str);
            console.log("suffix_str.charAt(suffix_pointer) = " + suffix_str.charAt(suffix_pointer));
            console.log("prev = " + prev);
            console.log();
            */

            prev = str;
            count++;
            num_iterations++;

            if (count == this.N || needToAddFirstWord) {

                if (needToAddFirstWord) needToAddFirstWord = false;

                /*
                 console.log("|||||||||||||||||||||||");
                 console.log("UPDATING_INDEX_AND_KEYFRAME");
                 */

                this.keyframe[keyframe_pointer] = str;

                this.index[index_pointer] = keyframe_pointer;
                index_pointer++;
                this.index[index_pointer] = suffix_pointer;
                // for debugging purposes

                /*
                 console.log("UPDATED_INDEX_AND_KEYFRAME");
                 console.log("SUFFIX_STR_length = " + suffix_str.length);
                 console.log("SUFFIX_STR = " + suffix_str);
                 console.log("suffix.str.charAt(suffix_pointer) = "
                 + suffix_str.charAt(suffix_pointer));
                 console.log("SUFFIX_POINTER = " + suffix_pointer);
                 console.log("UPDATING_KEYFRAME_POINTER...");
                 console.log("PRINTING_INDEX...");
                 for (int j=0; j<=index_pointer; j++) {
                 console.log(index[j] + " ");
                 }

                 console.log();
                 console.log("PRINTING_KEYFRAME...");
                 for (int j=0; j<=keyframe_pointer; j++) {
                 console.log(keyframe[j] + " ");
                 }
                 console.log();
                 console.log("|||||||||||||||||||||||");
                 console.log();
                 */

                console.log(this.keyframe[keyframe_pointer] + " ");

                this.keyframe_size++;
                keyframe_pointer++;
                index_pointer++;
                count = 0;

            }

            suffix_pointer += c3;

        }

        this.suffix_str_length = (this.suffix_str).length;

        // test code
        let passedAllTests = true;
        for (let q = 0; q < words.length; q++) {
            let word = words[q];
            if (!this.includes(word)) {
                passedAllTests = false;
                console.log("dictionary failed to include word:" + word);
            }
        }
        if (passedAllTests) console.log("dictionary object includes every word in the input file");

    }

    /*
    writeToFile(name) {
        for (let i=0; i<this.keyframe_size; i++) {
            out.write(this.index[2*i] + " " + this.index[2*i+1] + " ");
        }
        out.newLine();
        for (let i=0; i<keyframe_size; i++) {
            out.write(keyframe[i] + " ");
        }
        out.newLine();
        out.write(suffix_str);
        out.newLine();
        out.write(keyframe_size + " ");
        out.close();
    */

    /*
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
            suffix_str_length = suffix_str.length;

        in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    } */

    /*
    public boolean equals(Dictionary d1) {
        console.log("CHECKING_DICTIONARY_EQUIVALENCE...");
        if (keyframe_size != d1.keyframe_size) {
            console.log("KEYFRAME_SIZES_UNEQUAL,RETURNING_FALSE...");
            console.log("this.keyframe_size = " + keyframe_size);
            console.log("d1.keyframe_size = " + d1.keyframe_size);
            return false;
        }
        for (int i=0; i<keyframe_size; i++) {
            if (index[2*i] != d1.index[2*i]) {
                console.log("index[2*" + i + "] != d1.index[2*" + i + "]");
                console.log("index[2*" + i + "] = " + index[2*i]);
                console.log("d1.index[2*" + i + "] = " + d1.index[2*i]);
                examine_arr(rectify(index), 2*i, 10);
                examine_arr(rectify(d1.index), 2*i, 10);
                return false;
            }
            if (index[2*i+1] != d1.index[2*i+1]) {
                console.log("index[2*" + i + "+1] != d1.index[2*" + i + "+1]");
                console.log("index[2*" + i + "+1] = " + index[2*i+1]);
                console.log("d1.index[2*" + i + "+1] = " + d1.index[2*i+1]);
                examine_arr(rectify(index), 2*i+1, 10);
                examine_arr(rectify(d1.index), 2*i+1, 10);
                return false;
            }
            if (!keyframe[i].equals(d1.keyframe[i])) {
                console.log("keyframe[" + i + "] != d1.keyframe[" + i + "]");
                console.log("keyframe[" + i + "] =" + keyframe[i]);
                console.log("d1.keyframe[" + i + "] =" + d1.keyframe[i]);
                examine_arr(keyframe, i, 10);
                examine_arr(d1.keyframe, i, 10);
                return false;
            }
        }
        if (!suffix_str.equals(d1.suffix_str)) {
            console.log("SUFFIX_STRINGS_UNEQUAL,RETURNING_FALSE...");
            return false;
        }
        console.log("DICTIONARIES_EQUIVALENT,RETURNING_TRUE...");
        return true;
    } */

    /*
    public static Integer[] rectify(int[] in) {
        Integer[] ret = new Integer[in.length];
        for (int i=0; i<in.length; i++) {
            ret[i] = new Integer(in[i]);
        }
        return ret;
    } */

    examine_suffix_str(index, width) {
        var start = index - width >= 0 ? index - width : 0;
        var end = index + width < this.suffix_str.length ? index + width : this.suffix_str.length-1;
        console.log(this.suffix_str.substring(start, end+1));
    }

    includes(word, verbose) {
        if (verbose) console.log("Starting search for word: " + word);
        return this.includes2(word.toUpperCase(), 0, this.keyframe_size-1, verbose);
    }

    includes2(word, left, right, verbose) {
        let mp = Math.floor((left + right)/2);
        let current_word = this.keyframe[this.index[2*mp]];
        let suffix_str_length = this.suffix_str_length;

        if (current_word == word) return true;

        if (left == right || left == right-1) {

            if (verbose) console.log("first stage of binary search is concluding...");

            let x = mp;

            let next_word = this.keyframe[this.index[2*(mp+1)]];

            if (verbose) {
                console.log("left = " + left + ", right = " + right);
                console.log("current_word = " + current_word);
                console.log("next_word = " + next_word);
                console.log("selecting keyframe chunk to scan through...");
            }


            if (left == right-1 && word >= next_word) {
                if (word == next_word) return true;
                current_word = next_word;
                x++;
            }

            let suffix_pointer = this.index[2*x+1];

            if (verbose) {
                console.log("selected keyframe chunk to scan through, starting at the current word listed below");
                console.log("current_word = " + current_word);
                console.log("suffix_pointer = " + suffix_pointer);
                console.log("suffix_str.charAt(suffix_pointer) = "
                    + this.suffix_str.charAt(suffix_pointer));
                this.examine_suffix_str(suffix_pointer, 20);
                console.log("current_word.length = " + current_word.length);
                console.log("suffix_str_length = " + this.suffix_str_length);
            }


            // at this point, we know that current_word != word
            suffix_pointer++;
            while (isAlphabetic(this.suffix_str.charAt(suffix_pointer))) suffix_pointer++;


            let prev_word = current_word;
            let tmp = "";

            let i=1;
            while (i < this.N && suffix_pointer < this.suffix_str_length) {

                let length = this.suffix_str.charCodeAt(suffix_pointer) - 48;
                tmp += prev_word.substring(0, length); //first part of the reconstruction
                suffix_pointer++;

                while (suffix_pointer < suffix_str_length && isAlphabetic(this.suffix_str.charAt(suffix_pointer))) {
                    tmp += this.suffix_str.charAt(suffix_pointer);
                    suffix_pointer++;
                }

                if (verbose) {
                    console.log("tmp = " + tmp);
                    console.log("suffix_pointer = " + suffix_pointer);
                    console.log("prev_word = " + prev_word);
                }

                if (word == tmp) return true;

                prev_word = tmp;
                tmp = "";

                i++;

            }
            console.log("Binary search concluding...");
            return false;
        }
        if (current_word > word) {
            return this.includes2(word, left, mp-1, verbose);
        } else { // current_word < word
            return this.includes2(word, mp, right, verbose);
        }
    }

    /*
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
    } */

}