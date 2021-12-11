const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const chunks = input.split('\n').map(x => x.split(''))

const CHUNK_PAIRS = [['[', ']'],['(', ')'],['{', '}'], ['<', '>']];

const ILLEGAL_POINTS = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

const isOpeningChar = c => {
    const openingChars = CHUNK_PAIRS.map(x => x[0])
    return !!openingChars.find(x => x === c)
}

let syntaxErrorScore = 0;

const nonCorruptLines = chunks.reduce((acc, line) => {
    let chunk = []
    let isCorruptLine = false

    for(let i=0; i< line.length; i++) {
        const char = line[i]

        if(isOpeningChar(char)) {
            chunk.push(char)
        } else {
            const charPair = CHUNK_PAIRS.find(x => x[1] === char);
            const isIllegalChar = charPair[0] !== chunk[chunk.length -1]
            
            // corrupt char found, add points, leave loop
            if(isIllegalChar) {
                syntaxErrorScore += ILLEGAL_POINTS[char]
                isCorruptLine = true
                break;
            }

            // otherwise remove pairing char from the current chunk
            chunk.pop()
        }
    }

    return isCorruptLine ? acc : [...acc, line]
}, [])

console.log('Answer 1: ', syntaxErrorScore)
