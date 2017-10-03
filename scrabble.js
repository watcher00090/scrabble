

(function() {
    window.onload = function() {

        var dict;
        $.ajax("http://students.washington.edu/jamesp52/scrabble/dictionary.txt").done(
            function(dictionary_file_text, textStatus, jqXHR) {
                debugger;
                dict = new Dictionary(dictionary_file_text);
                localStorage.dict = dict;
            });
        debugger;

        var board = new Array();
        board.size = 15;
        var shelf = new Array(7);
        var i, j;

        board.letter_dist = {
            'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12,
            'F': 2, 'G': 3, 'H': 2, 'I': 9, 'J': 1, 'K': 1, 'L': 4,
            'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6, 'S': 4,
            'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1,
            '*': 2
        };

        board.letter_point_values = {
            '*':0, 'L':1, 'S':1, 'U':1, 'N':1, 'R':1,
            'T':1, 'O':1, 'A':1, 'I':1, 'E':1, 'G':2,
            'D':2, 'B':3, 'C':3, 'M':3, 'P':3, 'F':4,
            'H':4, 'V':4, 'W':4, 'Y':4, 'K':5, 'J':8,
            'X':8, 'Q':10, 'Z':10
        };

        for (i = 0; i < board.size; i++) {
            board[i] = new Array();
            for (j = 0; j < board.size; j++) {
                board[i][j] = {data: "reg", dataActive: true, letter: null, hasLetter: false, assignedLetter: null};
            }
        }

        board[0][0].data = "tw";
        board[0][7].data = "tw";
        board[0][14].data = "tw";
        board[7][0].data = "tw";
        board[7][14].data = "tw";
        board[14][0].data = "tw";
        board[14][7].data = "tw";
        board[14][14].data = "tw";

        board[1][1].data = "dw";
        board[2][2].data = "dw";
        board[3][3].data = "dw";
        board[4][4].data = "dw";
        board[1][13].data = "dw";
        board[2][12].data = "dw";
        board[3][11].data = "dw";
        board[4][10].data = "dw";
        board[13][1].data = "dw";
        board[12][2].data = "dw";
        board[11][3].data = "dw";
        board[10][4].data = "dw";
        board[13][13].data = "dw";
        board[12][12].data = "dw";
        board[11][11].data = "dw";
        board[10][10].data = "dw";
        board[7][7].data = "dw";

        board[0][3].data = "dl";
        board[0][11].data = "dl";
        board[2][6].data = "dl";
        board[2][8].data = "dl";
        board[3][0].data = "dl";
        board[3][7].data = "dl";
        board[3][14].data = "dl";
        board[6][2].data = "dl";
        board[6][6].data = "dl";
        board[6][8].data = "dl";
        board[6][12].data = "dl";
        board[7][3].data = "dl";
        board[7][11].data = "dl"
        board[8][2].data = "dl";
        board[8][6].data = "dl";
        board[8][8].data = "dl";
        board[8][12].data = "dl";
        board[11][0].data = "dl";
        board[11][7].data = "dl";
        board[11][14].data = "dl";
        board[12][6].data = "dl";
        board[12][8].data = "dl";
        board[14][3].data = "dl";
        board[14][11].data = "dl";
        board[1][5].data = "tl";
        board[1][9].data = "tl";
        board[5][1].data = "tl";
        board[5][5].data = "tl";
        board[5][9].data = "tl";
        board[5][13].data = "tl";
        board[9][1].data = "tl";
        board[9][5].data = "tl";
        board[9][9].data = "tl";
        board[9][13].data = "tl";
        board[13][5].data = "tl";
        board[13][9].data = "tl";

        var table = $('#board');
        for (i = 0; i < board.size; i++) {
            var row = document.createElement("tr");
            $("#board").append(row);
            for (j = 0; j < board.size; j++) {
                var td = document.createElement("td");
                var textarea = document.createElement("textarea");
                textarea.classList.add(board[i][j].data);
                textarea.row = i;
                textarea.col = j;
                td.append(textarea);
                row.append(td);
            }
            table.append(row);
        }

        $("#optimizebutton").click(function () {
            var textareas = document.querySelectorAll('#board textarea');
            for (i = 0; i < textareas.length; i++) {
                var row = textareas[i].row;
                var col = textareas[i].col;
                board[row][col].letter = textareas[i].value.toUpperCase();
                if (textareas[i].value != "") {
                    board[row][col].hasLetter =  true;
                }
            }
            shelf = document.getElementById("shelf").value.toUpperCase();
            optimize(board, shelf, dict);
        });

        $("#testcheckbox").click(function () {
            var optimizeButton = document.getElementById("optimizebutton");
            var inputForm = document.getElementById("shelf");
            var testbutton = document.getElementById("testbutton");

            optimizeButton.disabled = !optimizeButton.disabled;
            inputForm.disabled = !inputForm.disabled;
            testbutton.disabled = !testbutton.disabled;

            var testController = document.getElementById("testcontroller");

            if (testController.classList.contains("hidden")) {
                testController.classList.remove("hidden");
            } else {
                testController.classList.add("hidden");
            }
        })

        $("#green").click(function () {
            var textareas = document.querySelectorAll("#board textarea");
            for (var i=0; i<textareas.length; i++) {
                if (textareas[i].value == "") {
                    textareas[i].isGreen = this.checked;
                    if (textareas[i].isGreen) {
                        textareas[i].classList.add("green");
                    } else {
                        textareas[i].classList.remove("green");
                    }
                }
            }
        });

        $("#testbutton").click(function () {
            var index = parseInt(document.getElementById("indexform").value);
            var isRow = document.getElementById("isrowcheckbox").checked;
            var textareas = document.querySelectorAll('#board textarea');

            for (i = 0; i < textareas.length; i++) {
                var row = textareas[i].row;
                var col = textareas[i].col;

                if (textareas[i].value != "") {

                    if (textareas[i].isGreen == true) {
                        board[row][col].assignedLetter =  textareas[i].value.toUpperCase();
                    } else {
                        board[row][col].hasLetter = true;
                        board[row][col].letter = textareas[i].value.toUpperCase();
                    }

                }
            }
            console.log(getScore(board, index, isRow, dict));
            reset(board);
        })


    }

    // Returns, in an array, all combinations of the multiset
    // represented by the string str.
    function combinations(str) {
        var fn = function (active, rest, a) {
            if (!active && !rest)
                return;
            if (!rest) {
                if (!a.includes(active)) {
                    a.push(active);
                }
            } else {
                fn(active + rest[0], rest.slice(1), a);
                fn(active, rest.slice(1), a);
            }
            return a;
        }
        return fn("", Array.from(str).sort().join(""), []);
    }

    function optimize(board, shelf, dict) {
        debugger;
        var comb = combinations(shelf);
        var scores = [];
        var oc = orderBySize(comb, shelf.length);
        var validAssignments = 0;
        for (var i = 0; i < board.size; i++) {
            validAssignments += optimizeHelper(board, i, oc, scores, dict, true);
            validAssignments += optimizeHelper(board, i, oc, scores, dict, false);
            if (validAssignments >= 100) {
                console.log("100_OR_MORE_VALID_ASSIGNMENTS_FOUND,RETURNING_NOW...");
                break;
            }
        }
        console.log(scores);
        var best = scores.sort(function (a1, a2) { return a1.score - a2.score}).pop(); // the best assignment.
        console.log(best);
        displayAssignmentObj(board, best);
    }

    function optimizeHelper(board, index, oc, scores, dict, isRow) {
        var potentialForms = getAllPotentialForms(board, index, isRow);
        var validAssignments = 0;
        for (var x = 0; x < potentialForms.length; x++) {
            var form = potentialForms[x];

            var s = size(form);
            for (var i = 0; i < oc[s - 1].length; i++) { // iterate through all combinations of letters of this size
                var combination = oc[s - 1][i];
                var assignments = getAllPotentialAssignments(board, index, isRow, form, combination);

                for (var y=0; y<assignments.length; y++) {
                    var assignment = assignments[y];
                    assign(board, index, isRow, form, assignment);
                   // debugger;
                    var score = getScore(board, index, isRow, dict);
               //     debugger;
                    if (score != -1) { // a valid assignment has been found
                       // debugger;
                        validAssignments++;
                        scores.push({index: index, isRow: isRow,
                            form: form, assignment: assignment, score: score});
                    }
                    if (validAssignments >= 100) {
                        return validAssignments;
                    }
                    reset(board);
                }
            }
        }

        return validAssignments;
    }

    // Resets the board after an assignment onto it has been tested for validity.
    function reset(board) {
        for (var i=0; i<board.size; i++) {
            for (var j=0; j<board.size; j++) {
                board[i][j].assignedLetter = null;
            }
        }
    }

    // Returns an array storing all possible forms of the given size for the
    // given board and index. A 'k-form' is an aggregate of k squares in the
    // given index that the user could potentially lay their tiles down upon,
    // per the scrabble rules. They are represented as an array (of size
    // 'board.size') of booleans.
    function getAllPotentialForms(board, index, isRow) {
        var forms = [];
        findForms(board, index, isRow, forms, makeTmpArray(board), 0);
        //debugger;
        //var tmp = [true, false, false, false, false, false, false, false, true, true, true, false, false, false, false, false];
        //var t = isValidForm(board, 0, true, tmp);
        //debugger;
        return forms;
    }

    // tmp stores the information about the current form.
    // tmp[i] == true iff the current form includes tmp[i].
    // (if tmp[i] == false, the current form does not include it,
    // possibly because there is already a letter there).
    function findForms(board, index, isRow, forms, tmp, d) {
        while (d < board.size && hasLetter(board, index, isRow, d)) {
            d++;
            //debugger;
        }

        if (d == board.size) {
            //debugger;
            if (isValidForm(board, index, isRow, tmp)) {
                //debugger;
                forms.push(copy(tmp));
                //console.log(tmp);
            }
        } else { // d < board.size && !hasLetter(board, index, isRow, d)
            //debugger;
            tmp[d] = true;
            findForms(board, index, isRow, forms, tmp, d + 1);
            tmp[d] = false;
            findForms(board, index, isRow, forms, tmp, d + 1);
        }
        //debugger;
    }

    // A form is "valid" iff from each of its squares one can
    // reach an already-placed letter merely by following
    // a contiguous sequence of squares in the form.
    function isValidForm(board, index, isRow, tmp) {
        if (size(tmp) == 0 || size(tmp) > 7) return false;
        var i = 0;
        while (i < board.size) {
            //debugger;
            if (tmp[i] && (((i == 0) || !tmp[i - 1] && !hasLetter(board, index, isRow, i-1)))) {
                //debugger;
                var c = 1;
                while (i + c < board.size && tmp[i+c]) {
                    c++;
                }
                //debugger;
                if (i+c >= board.size) {
                    //debugger;
                    return false;
                } else { // i+c < board.size && !tmp[i+c]
                    //debugger;
                    if (!hasLetter(board, index, isRow, i+c)) {
                        return false;
                    }
                    //debugger;
                    while (i < board.size && (hasLetter(board, index, isRow, i) || tmp[i])) i++;
                    //debugger;
                }
            } else {
                //debugger;
                i++;
            }
            //debugger;
        }
        return true;
    }

    // Each assignment is an array of letters into the form, where the letter
    // at position i is to be placed at the i+1 th square in the form.
    function getAllPotentialAssignments(board, index, isRow, form, combination) {
        var assignments = [];
        combination = combination.split('');
        //debugger;
        getAllPotentialAssignmentsHelper(board, form, combination,
            new Set(combination), assignments, [], 0);
        //debugger;
        return assignments;
    }

    // i represents the number of letters in the combination that have already
    // been assigned.
    function getAllPotentialAssignmentsHelper(board, form, combination,
                                           distinctLetters, assignments, tmp) {
       // debugger;
        if (combination.length == 0) { // all letters have been assigned
            //debugger;
            assignments.push(copy(tmp));
        } else {
            //debugger;
            for (var dl of distinctLetters.values()) {
                //debugger;
                if (combination.includes(dl)) {
                    // remove a single 'dl' letter
                    var index = combination.indexOf(dl);
                    combination.splice(index, 1);

                    tmp.push(dl);
                    getAllPotentialAssignmentsHelper(board, form, combination,
                        distinctLetters, assignments, tmp);
                    tmp.pop();

                    combination.push(dl);
                    //debugger;
                }
            }
        }
    }

    function assign(board, index, isRow, form, assignment) {
        var j=0; // pointer into the assignment
        for (var i=0; i<board.size; i++) {
            if (form[i]) {
                assignLetter(board, index, isRow, i, assignment[j]);
                j++;
            }
        }
    }

    // Returns the score of the assignment, -1 if the assignment is inconsistent.

    // Returns the score of the assignment, -1 if the assignment is inconsistent.
    function getScore(board, index, isRow, dict) {

        var debugString = "";

        var total = 0;
        var hot = false;
        var checkThisWord = false;

        var str = "";
        var score = 0;
        var WSMultipliers = [];

        // debugger;

        for (var i=0; i<board.size; i++) {

            // debugger;

            if (!hot) {
                if (hasAssignedLetter(board, index, isRow, i) || hasLetter(board, index, isRow, i)) {
                    hot = true;
                }
            }

            if (hot) {

                if (hasAssignedLetter(board, index, isRow, i) || hasLetter(board, index, isRow, i)) {

                    //  debugger;

                    str += getLetter(board, index, isRow, i);
                    WSMultipliers.push(getWSMultiplier(board, index, isRow, i));
                    score += getLSMultiplier(board, index, isRow, i)
                        * board.letter_point_values[getLetter(board, index, isRow, i)];

                    // debugger;

                    if (hasAssignedLetter(board, index, isRow, i)) {
                        if (!checkThisWord) checkThisWord = true;

                        var str2 = "";
                        var score2 = 0;
                        var WSMultipliers2 = [];

                        var start = index;
                        var end = index;

                        while (start-1 >= 0 && (hasLetter(board, i, !isRow, start-1)
                        || hasAssignedLetter(board, i, !isRow, start-1))) {
                            start--;
                        }

                        while (end+1 < board.size && (hasLetter(board, i, !isRow, end+1)
                        || hasAssignedLetter(board, i, !isRow, end+1))) {
                            end++;
                        }

                        for (var j = start; j <= end; j++) {
                            str2 += getLetter(board, i, !isRow, j);
                            WSMultipliers2.push(getWSMultiplier(board, i, !isRow, j));
                            score2 += getLSMultiplier(board, i, !isRow, j)
                                * board.letter_point_values[getLetter(board, i, !isRow, j)];
                        }

                        if (str2.length > 1) {
                            if (!dict.includes(str2)) return -1;
                            debugger;
                            score2 = applyWSMultipliers(score2, WSMultipliers2);
                            debugString += "Computed score " + score2 + " from " + str2 + "\n";
                            total += score2;
                        }

                    }

                } else { // no assigned letter nor tile placed
                    hot = false;

                    if (checkThisWord) {
                        if (!dict.includes(str)) return -1;
                        score = applyWSMultipliers(score, WSMultipliers);
                        debugString += "Computed score " + score + " from " + str + "\n";
                        total += score;
                    }

                    str = "";
                    score = 0;
                    clear(WSMultipliers);

                    checkThisWord = false;
                }

            }

        }

        if (hot && checkThisWord) { // letters are assigned until the end of the row/col
            if (!dict.includes(str)) return -1;
            score = applyWSMultipliers(score, WSMultipliers);
            debugString += "Computed score " + score + " from " + str + "\n";
            total += score;
        }

        console.log("FOUND_VALID_ASSIGNMENT,RETURNING_SCORE...");
        console.log("Printing debugging string...");
        console.log(debugString);
        displayAssigned(board);

        debugger;

        return total;
    }

    // Adds the assigned letters in red to the input board.
    function displayAssigned(board) {
        clearAssignedFromDisplay();

        var textareas = document.querySelectorAll('#board textarea');
        for (var i = 0; i < textareas.length; i++) {
            var row = textareas[i].row;
            var col = textareas[i].col;
            if (board[row][col].assignedLetter != null) {
                textareas[i].classList.add("green");
                textareas[i].innerHTML = board[row][col].assignedLetter;
            }
        }
    }

    function clearAssignedFromDisplay() {
        var textareas = document.querySelectorAll('#board textarea');
        for (var i = 0; i < textareas.length; i++) {
            if (textareas[i].classList.contains("green")) {
                textareas[i].classList.remove("green"); // clears the board of displays from prior assignments
                textareas[i].innerHTML = "";
            }
        }
    }

    function displayAssignmentObj(board, obj) {
        assign(board, obj.index, obj.isRow, obj.form, obj.assignment);
        displayAssigned(board);
        reset(board);
    }

    function applyWSMultipliers(score, WSMultipliers) {
        for (var i=0; i<WSMultipliers.length; i++) {
            score *= WSMultipliers[i];
        }
        return score;
    }

    // Returns the letter (or assigned letter) in the d-th position in the given index
    function getLetter(board, index, isRow, d) {
        if (isRow) {
            return hasAssignedLetter(board, index, isRow, d) ? board[index][d].assignedLetter : board[index][d].letter;
        } else {
            if (board[index] == null) debugger;
            return hasAssignedLetter(board, index, isRow, d) ? board[d][index].assignedLetter : board[d][index].letter;
        }
    }

    // Returns 1 iff the given square does not have a letter score multiplier.
    // Returns 2 iff the given square is a 'double letter score' square.
    // Returns 3 iff the given square is a 'triple letter score' square.
    function getLSMultiplier(board, index, isRow, d) {
        if (isRow) {
            if (!board[index][d].dataActive) return 1;
            else if (board[index][d].data == "tl") return 3;
            else if (board[index][d].data == "dl") return 2;
            else return 1;
        } else {
            //debugger;
            if (!board[d][index].dataActive) return 1;
            else if (board[d][index].data == "tl") return 3;
            else if (board[d][index].data == "dl") return 2;
            else return 1;
        }
    }

    // Returns 1 iff the given square does not have a word score multiplier.
    // Returns 2 iff the given square is a 'double word score' square.
    // Returns 3 iff the given square is a 'triple word score' square.
    function getWSMultiplier(board, index, isRow, d) {
        if (isRow) {
            if (!board[index][d].dataActive) return 1;
            else if (board[index][d].data == "tw") return 3;
            else if (board[index][d].data == "dw") return 2;
            else return 1;
        } else {
            //debugger;
            if (!board[d][index].dataActive) return 1;
            else if (board[d][index].data == "tw") return 3;
            else if (board[d][index].data == "dw") return 2;
            else return 1;
        }
    }

    // Sets the letter in the d-th position in the given index to 'newLetter'
    function updateLetter(board, index, isRow, d, newLetter) {
        if (isRow) {
            board[index][d].letter = newLetter;
        } else {
            board[d][index].letter = newLetter;
        }
    }

    // Assigns the letter in the d-th position in the given index to 'newLetter'
    function assignLetter(board, index, isRow, d, newLetter) {
        if (isRow) {
            board[index][d].assignedLetter = newLetter;
        } else {
            board[d][index].assignedLetter = newLetter;
        }
    }

    function hasAssignedLetter(board, index, isRow, d) {
        if (isRow) {
            return board[index][d].assignedLetter != null ? true : false;
        }
        else {
            return board[d][index].assignedLetter != null ? true : false;
        }
    }

    // IGNORES ANY LETTER 'ASSIGNED' TO THE GIVEN TILE
    function hasLetter(board, index, isRow, d) {
        if (isRow) {
            return board[index][d].hasLetter;
        } else {
            if (board[d] == null) debugger;
            return board[d][index].hasLetter;
        }
    }

    // Returns an array containing an array containing all elements in
    // arr of size 1 in the first index, an array containing all elements
    // in arr of size 2 in the second index, and so on.
    function orderBySize(arr, maxSize) {
        var res = [];
        for (var i = 0; i < maxSize; i++) {
            res.push(new Array());
        }
        for (var i = 0; i < arr.length; i++) {
            var len = arr[i].length;
            res[len - 1].push(arr[i]);
        }
        return res;
    }

    function size(tmp) {
        var size = 0;
        for (var i = 0; i < tmp.length; i++) {
            if (tmp[i]) size++;
        }
        return size;
    }

    function makeTmpArray(board) {
        var tmp = [];
        for (var i = 0; i < board.size; i++) tmp.push(false);
        return tmp;
    }

    function copy(tmp) {
        var ret = [];
        for (var i = 0; i < tmp.length; i++) ret.push(tmp[i]);
        return ret;
    }

    function clear(arr) {
        while (arr.length > 0) arr.pop();
    }

    // returns the front element of the stack s
    function peek(s) {
        var el = s.pop();
        s.push(el);
        return el;
    }

})();

/*
 function isValidForm(board, index, isRow, tmp) {
 var i = 0;
 while (i < board.size) {
 debugger;
 if (tmp[i] && (((i == 0) || !tmp[i - 1])) && !hasLetter(board, index, isRow, d)) {
 debugger;
 var c = 1;
 while (i + c < board.size && tmp[i+c]) {
 c++;
 }
 debugger;
 if (i+c >= board.size) {
 debugger;
 return false;
 } else { // i+c < board.size && !tmp[i+c]
 debugger;
 if (!hasLetter(board, index, isRow, i+c)) {
 return false;
 }
 debugger;
 while (i < board.size && (hasLetter(board, index, isRow, i) || tmp[i])) i++;
 debugger;
 }
 } else {
 debugger;
 i++;
 }
 debugger;
 }
 return true;
 }

 */

/*

 // Returns the score of the assignment, -1 if the assignment is inconsistent.
 function getScore(board, index, isRow, dict) {
 var total = 0;
 var hot = false;

 var str = "";
 var score = 0;
 var WSMultipliers = [];

 // debugger;

 for (var i=0; i<board.size; i++) {

 // debugger;



 if (hasAssignedLetter(board, index, isRow, i) || hasLetter(board, index, isRow, i)) {

 if (!hot) hot = true;

 //  debugger;

 str += getLetter(board, index, isRow, i);
 WSMultipliers.push(getWSMultiplier(board, index, isRow, i));
 score += getLSMultiplier(board, index, isRow, i)
 * board.letter_point_values[getLetter(board, index, isRow, i)];

 // debugger;

 if (hasAssignedLetter(board, index, isRow, i)) {
 var j = 1;
 var str2 = getLetter(board, index, isRow, i);
 var score2 = 0;
 var WSMultipliers2 = [];
 while (index - j >= 0 && (hasLetter(board, i, !isRow, index - j) || hasAssignedLetter(board, i, !isRow, index - j))) {
 str2 += getLetter(board, i, !isRow, index - j);
 WSMultipliers2.push(getWSMultiplier(board, i, !isRow, index - j));
 score2 += getLSMultiplier(board, i, !isRow, index - j)
 * board.letter_point_values[getLetter(board, i, !isRow, index - j)];
 j--;
 //        debugger;
 }
 if (str2.length > 1) {
 if (!dict.includes(str2)) return -1;
 score2 = applyWSMultipliers(score2, WSMultipliers2);
 total += score2;
 //       debugger;
 }

 j = 0;
 str2 = "";
 score2 = 0;
 clear(WSMultipliers2);

 //    debugger;

 while (index + j < board.size && (hasLetter(board, i, !isRow, index + j) || hasAssignedLetter(board, i, !isRow, index + j))) {
 //       debugger;
 str2 += getLetter(board, i, !isRow, index + j);
 WSMultipliers2.push(getWSMultiplier(board, i, !isRow, index + j));
 score2 += getLSMultiplier(board, i, !isRow, index + j)
 * board.letter_point_values[getLetter(board, i, !isRow, index + j)];
 ;
 j++;
 //       debugger;
 }
 if (str2.length > 1) {
 //         debugger;
 if (!dict.includes(str2)) return -1;
 score2 = applyWSMultipliers(score2, WSMultipliers2);
 total += score2;
 //           debugger;
 }
 }


 }

 if (i == board.size-1 || (!hasAssignedLetter(board, index, isRow, i) && !hasLetter(board, index, isRow, i))) {
 //      debugger;
 if (hot) {
 //    debugger;
 if (!dict.includes(str)) return -1;
 score = applyWSMultipliers(score, WSMultipliers);
 total += score;

 //          debugger;

 hot = false;
 str = "";
 score = 0;
 clear(WSMultipliers);
 }
 }
 }
 console.log("FOUND_VALID_ASSIGNMENT,RETURNING_SCORE...");
 debugger;
 return total;
 }
 */