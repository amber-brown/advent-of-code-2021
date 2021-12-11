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

const CHAR_POINTS = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
}

const totalScoresOfLines = nonCorruptLines.reduce((acc, line) => {
    const chunk = []

    line.forEach(char => {
        if(isOpeningChar(char)) {
            chunk.push(char)
        } else {            
            chunk.pop()
        }
    })

    // reached incomplete point, find score
    const score = chunk.reverse().reduce((acc, curr) => {
        return acc * 5 + CHAR_POINTS[curr]
    }, 0)
    
    return [...acc, score]
}, [])


const middleValue = Math.floor(totalScoresOfLines.length / 2);
totalScoresOfLines.sort((a, b) => a-b)

const answer2 = totalScoresOfLines[middleValue]

console.log('Answer 2: ', answer2)