# -*- coding: utf-8 -*-
"""
Created on Tue Dec 26 16:03:33 2017

@author: pljanczak
"""

#
# returns the needed number of lines if it fits in width with the given fontStize
# else returns 0
#
def getMaxFontSize(line):
    height, width = int(line[1]), int(line[0])  # extract height, width...
    sliceObj = slice(2, len(line))
    words = line[sliceObj]                      #... and the words."
    
    nb, prev, size = -1, 0, 0
    # prev is a trick to save the number of lines in case of getNbOfLines returning 0 (doesn't fit)
    
    while (nb != 0):
        size += 1
        nb = getNbOfLines(words, height, width, size)   # fits in width ?
        if (nb != 0): prev = nb
        if (size * prev > height): return size - 1      # fits in height ?
    return size - 1

#
# returns the maximum font size that fits all words of the given line with the billboard dimensions
# at each step we check first the width, then the height
# we increment the font size until it doesn't fit
#
def getNbOfLines(w, height, width, fontStize):
    n, currentLength = 1, 0
    
    for i in range (0, len(w)):
        if len(w[i]) * fontStize > width: return 0                      # word does't even fit alone
        
        if i == 0 and (currentLength + fontStize * len(w[i])) <= width: # no extra space for first word 
             currentLength += fontStize * len(w[i])
        
        elif currentLength + fontStize * (len(w[i]) + 1) <= width:      # if fits we put the word on the same line
            currentLength = currentLength + fontStize * (len(w[i]) + 1)
        else:                                                           # else we need a new line
            n += 1
            currentLength = len(w[i]) * fontStize
    return n

##############################################################################
#################################### MAIN ####################################
##############################################################################
i = 1
with open("tests.txt", "r") as fd:
    for line in fd:
        line = line.strip()
        data = line.split()
        if (len(data) == 1): continue
        sizeMax = getMaxFontSize(data)
        print("Case #", i, ": ", sizeMax)
        i += 1