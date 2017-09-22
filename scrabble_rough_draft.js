(function() {
    window.onload = function() {

        // load the dictionary

        // var dict = {};
        /*$.ajax("dictionary.txt").done(function(dictionary, textStatus, jqXHR) {
         console.log(textStatus);
         console.log(jqXHR);
         var words = dictionary.split("\n");
         console.log(words.length);
         }); */

        var dict = ['age', 'ask', 'baby',
            'base',
            'beside',
            'bright',
            'business',
            'buy',
            'case',
            'catch',
            'caught',
            'child',
            'choose',
            'circle',
            'clear',
            'color',
            'copy',
            'correct',
            'couldnt',
            'difference',
            'direction',
            'dried',
            'easily',
            'edge',
            'egg',
            'eight',
            'energy',
            'England',
            'especially',
            'Europe',
            'exactly',
            'except',
            'explain',
            'famous',
            'farm',
            'fell',
            'figure',
            'flat',
            'fly',
            'forest',
            'free',
            'French',
            'fun',
            'George',
            'government',
            'grass',
            'grew',
            'hair',
            'happy',
            'hes',
            'heat',
            'history',
            'human',
            'Ive',
            'inch',
            'information',
            'iron',
            'Jim',
            'Joe',
            'King',
            'larger',
            'late',
            'leg',
            'length',
            'listen',
            'lost',
            'lot',
            'lower',
            'machine',
            'mark',
            'maybe',
            'measureL',
            'meet',
            'middleL',
            'milk',
            'minute',
            'modern',
            'moment',
            'month',
            'mouth',
            'natural',
            'nearly',
            'necessary',
            'New York',
            'north',
            'object',
            'ocean',
            'oil',
            'pay',
            'per',
            'plan',
            'plane',
            'present',
            'product',
            'rather',
            'reach',
            'reason',
            'record',
            'running',
            'seems',
            'sent',
            'seven',
            'shape',
            'sides',
            'single',
            'skin',
            'sleep',
            'smaller',
            'soft',
            'soil',
            'south',
            'speak',
            'speed',
            'spring',
            'square',
            'star',
            'step',
            'store',
            'straight',
            'strange',
            'street',
            'subject',
            'suppose',
            'teacher',
            'thousand',
            'thus',
            'Tom',
            'travel',
            'trip',
            'trouble',
            'unit',
            'village',
            'wall',
            'war',
            'wasnt',
            'week',
            'whose',
            'window',
            'wish',
            'women',
            'wont',
            'wood',
            'wrote',
            'yellow',
            'youre',
            'yourself',
        ];

        var boardSize = 15;
        var board = new Array();
        var shelf = new Array(7);
        var i, j;
        var letter_dist = {
            'a': 9, 'b': 2, 'c': 2, 'd': 4, 'e': 12,
            'f': 2, 'g': 3, 'h': 2, 'i': 9, 'j': 1, 'k': 1, 'l': 4,
            'm': 2, 'n': 6, 'o': 8, 'p': 2, 'q': 1, 'r': 6, 's': 4,
            't': 6, 'u': 4, 'v': 2, 'w': 2, 'x': 1, 'y': 2, 'z': 1,
            'bk': 2
        };

        for (i = 0; i < boardSize; i++) {
            board[i] = new Array();
            for (j = 0; j < boardSize; j++) {
                board[i][j] = {data: "none", letter: null, hasLetter: false};
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
        for (i = 0; i < boardSize; i++) {
            var row = document.createElement("tr");
            $("#board").append(row);
            for (j = 0; j < boardSize; j++) {
                var td = document.createElement("td");
                var textarea = document.createElement("textarea");
                textarea.row = i;
                textarea.col = j;
                td.append(textarea);
                row.append(td);
            }
            table.append(row);
        }

        $("#optimizebutton").click(function () {
            var textareas = document.querySelectorAll("#board textarea");
            for (i = 0; i < textareas.length; i++) {
                var row = textareas[i].row;
                var col = textareas[i].col;
                board[row][col].letter = textareas[i].value;
                board[row][col].hasLetter = true;
            }
            shelf = document.getElementById("shelf").value;
            debugger;
            optimize();
        });
    };

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

    function optimize() {
        debugger;
        var comb = combinations(shelf);
        /*var scores = {}
         var oc = orderBySize(combinations, shelf.length);
         for (i = 0; i < boardSize; i++) {
         optimizeHelper(board, i, oc, scores, true);
         optimizeHelper(board, i, oc, scores, false);
         }
         console.log(scores.sort(function (a1, a2) {
         return a1.score - a2.score
         }).pop()); */
    }

    function optimizeHelper(board, index, oc, scores, isRow) {
        for (var size = 1; size <= oc.length; i++) {
            var potentialForms = getAllPotentialForms(board, index, isRow, size);
            for (var i = 0; i < oc[size - 1].length; i++) { // iterate through all combinations of this size
                var combination = oc[size - 1][i];
                for (var form in potentialForms) {
                    var assignments = getPotentialAssignments(board, index, isRow, combination, form);
                    for (var assignment in assignments) {
                        var tmpBoard = assign(board, index, isRow, form, assignment);
                        var data = isConsistent(tmpBoard);
                        if (data.isConsistent) {
                            scores[data.toString()].score = 15;
                        }
                    }
                }
            }
        }
    }

    // Returns an array storing all possible k-forms for the given board and
    // index. A 'k-form' is an aggregate of k squares in the given index that
    // the user could potentially lay their tiles down upon, per the
    // scrabble rules. They are represented as an array (of size 'boardSize')
    // of booleans.
    function getAllPotentialForms(board, index, isRow, k) {
        var forms = [];
        findForms(board, index, k, isRow, forms, makeTmpArray(), 0);
        return forms;
    }

    // tmp stores the information about the current form.
    // tmp[i] == true iff the current form includes tmp[i].
    // (if tmp[i] == false, the current form does not include it,
    // possibly because there is already a letter there).
    function findForms(board, index, isRow, k, forms, tmp, d) {
        if (size(tmp) == k && isValidForm(board, index, isRow, tmp)) {
            var tmpDeepCopy = jQuery.extend(true, {}, tmp);
            forms.push(tmpDeepCopy);
        }
        else {
            if (d < boardSize && !board[index][d].hasLetter) {
                tmp[d] = true;
                findForms(board, index, k, isRow, forms, tmp, d + 1);
                tmp[d] = false;
                findForms(board, index, k, isRow, forms, tmp, d + 1);
            }
        }
    }

    // A form is "valid" iff from each of its squares one can
    // reach an already-placed letter merely by following
    // a contiguous sequence of squares in the form.
    function isValidForm(board, index, isRow, tmp) {
        var i = 0;
        while (i < boardSize) {
            if (tmp[i] && (i == 0 || !tmp[i - 1])) {
                var c = 1;
                while (i + c < boardSize) {
                    if (tmp[i + c]) {
                        c++;
                    } else { // tmp[i+c] is false.
                        var noLetter = isRow ? !board[index][i + c].hasLetter : !board[i + c][index].hasLetter;
                        if (noLetter) return false;
                        else { // there is a letter!
                            i = i + c + 1;
                        }
                    }
                }
            }
        }
        return true;
    }

    // Each assignment is an array of letters into the form, where the letter
    // at position i is to be placed at the i+1 th square in the form.
    function getPotentialAssignments(board, index, isRow, combination, form) {
        var ret = [];
        combination = combination.toArray();
        getPotentialAssignmentsHelper(board, index, isRow, combination, new Set(combination),
            ret, form, []);
        return ret;
    }

    // i represents the number of letters in the combination that have already
    // been assigned.
    function getPotentialAssignmentsHelper(board, index, isRow, combination,
                                           distinctLetters, ret, form, assignment, i) {
        if (combination.length == 0) { // all letters have been assigned
            var deepCopy = jQuery.extend(true, {}, assignment);
            ret.push(deepCopy);
        } else {
            for (var dl in distinctLetters.values()) {
                if (combination.contains(dl)) {
                    combination.remove(dl);
                    assignment[i] = dl;
                    getPotentialAssignments(board, index, isRow, combination, form,
                        distinctLetters, ret, form, assignment, combination);
                    combination.push(dl);
                }
            }
        }
    }

    // Returns a object whose 'tmpBoard' field is a two-dimensional array
    // representing the board after the letters in the combination
    // have been put onto it (according to the given form and assignment),
    // and whose 'startingIndices' field represents ....
    function assign(board, index, isRow, form, assignment) {
        var tmpBoard = [];
        var startingIndices = []; // the ith element is the index where the i+1th chain of letters starts. Used later by isConsistent().
        for (i = 0; i < boardSize; i++) {
            tmpBoard[i] = [];
            for (j = 0; j < boardSize; j++) {
                tmpBoard[i][j] = board[i][j].letter;
            }
        }
        var i = j = 0;
        while (i < boardSize) { // j <= i, guaranteed
            if (form[i]) {
                if (isRow) {
                    board[index][i] = assignment[j];
                    if (i == 0 || !form[i - 1]) startingIndices.push(i);
                }
                else board[i][index] = assignment[j];
                j++;
            }
            i++;
        }
        return {tmpBoard: tmpBoard, startingIndices: startingIndices};
    }

    // for now, assumes isRow
    function isConsistent(board, index, isRow, form, assignment, tmpBoard, startingIndices) {
        var data = {score: 0, isConsistent: true};
        for (var i = 0; i < startingIndices.length; i++) {
            var primaryString = ""; // the potential word in the index direction.
            var j = startingIndices[i];
            while (j < boardSize && form[j]) {
                if (isRow) {
                    primaryString += board[index][j];
                    var secondaryString = tmpBoard[index][j]; // the potential word in the secondary (nonindex) direction wrt. j.
                    var s = 1, t = 1;
                    while (j + s < boardSize && board[index][j + s].hasLetter) {
                        secondaryString.append(board[index][j + s].letter);
                    }
                    while (j - t >= 0 && board[index][j + t].hasLetter) {
                        secondaryString = board[index][j - t].letter.concat(secondaryString);
                    }
                } else {
                    primaryString += board[j][index];
                    var secondaryString = tmpBoard[j][index]; // the potential word in the secondary (nonindex) direction wrt. j.
                    var s = 1, t = 1;
                    while (j + s < boardSize && board[j + s][index].hasLetter) {
                        secondaryString.append(board[j + s][index].letter);
                    }
                    while (j - t >= 0 && board[j + t][index].hasLetter) {
                        secondaryString = board[j - t][index].letter.concat(secondaryString);
                    }
                }
                if (dict.contains(secondaryString)) data.isConsistent = false;
            }
            if (dict.contains(primaryString)) data.isConsistent = false;
        }
        return data;
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

    function makeTmpArray() {
        var tmp = [];
        for (var i = 0; i < boardSize; i++) tmp.push(false);
        return tmp;
    }

    // returns the front element of the stack s
    function peek(s) {
        var el = s.pop();
        s.push(el);
        return el;
    }

})();
