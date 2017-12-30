var w0 = [3, 120, "a", "facebook", "its", "me!"];
var w1 = [90, 50, "hello", "world", "it", "is", "me", "not", "you"];
var w2 = [15, 20, "i", "have", "had", "a", "great", "day", "today"];

var w3 = [20, 6, "hacker", "cup"];
var w4 = [100, 20, "hacker", "cup", "2013"];
var w5 = [10, 20, "MUST", "BE", "ABLE", "TO", "HACK"];
var w6 = [55, 25, "Can", "you", "hack"];
var w7 = [100, 20, "Hack", "your", "way", "to", "the", "cup"];

var file = [w3, w4, w5, w6, w7];

/*
*  returns the needed number of lines if it fits in width with the given fontStize
*  else returns 0
*/
var getNbOfLines = function(w, width, fontStize) {
    var n = 1, currentLength = 0;
    
    for (var i = 0; i < w.length; i++) {
        if (w[i].length * fontStize > width) return 0;                              // word does't even fit alone
        if (i == 0 && (currentLength + fontStize * w[i].length <= width)) {         // no extra space for first word
            currentLength += fontStize * w[i].length;
        }
        else if (currentLength + fontStize * (w[i].length + 1) <= width) {          // if fits we put the word on the same line  
            currentLength += fontStize * (w[i].length + 1);
        }
        else {                                                                      // else we need a new line
            n++;
            currentLength = w[i].length * fontStize;
        }
    }
    return n;
};

/*
* returns the maximum font size that fits all words of the given line with the billboard dimensions
* at each step we check first the width, then the height
* we increment the font size until it doesn't fit
*/
var getFontSize = function(line) {
    var size = 0;
    var height = line[1];
    var width = line[0];
    var words = line.slice(2);
    
    var nb = -1, prev = 0; // prev is a trick to save the number of lines in case of getNbOfLines returning 0 (doesn't fit)
    while (nb != 0) {
        size++;
        nb = getNbOfLines(words, width, size);                                      // fits in width ?
        if (nb != 0) prev = nb;
        if (size * prev > height) return --size;                                    // fits in height ?
    }
    return --size;
};

var main = function(file) {
    for (var i = 0; i < file.length; i++) {
        var r = getFontSize(file[i]);
        console.log("case #", i+1, ", size max = ", r);
    }
};

main(file);