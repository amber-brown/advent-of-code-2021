const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const bingoInputAndBoards = input.split('\n\n');

const bingoInput = bingoInputAndBoards[0].split(',').map(x => parseInt(x));
bingoInputAndBoards.shift()
const bingoBoards = bingoInputAndBoards.map(x => x.split('\n').map(x => x.split(' ').filter(x => x !== '').map(x => parseInt(x))));

let bingoBoardsInPlay = bingoBoards
let lastNumberCall
let winningBoard

// SAMPLE BOARD:
// [
//     [ 2, 'x', 96, 60, 81 ],
//     [ 51, 1, 34, 48, 'x' ],
//     [ 78, 'x', 74, 65, 42 ],
//     [ 'x', 'x', 57, 19, 72 ],
//     [ 'x', 88, 53, 68, 76 ]
// ]

const boardIsWinner = board => {
    const [colMarkCount, rowMarkCount] = board.reduce((acc, row, rowIndex) => {
        const [cCount, rCount] = acc
        row.map((number, numberIndex) => {
            if (number === 'x') {
                cCount[numberIndex]++
                rCount[rowIndex]++
            }
        })
        return acc
    }, [new Array(5).fill(0), new Array(5).fill(0)])

    if(colMarkCount.find(x => x === 5) || rowMarkCount.find(x => x === 5)) {
        return true
    }
    return false
}

const sumOfNumbersOnBoard = board => {
    return board.flat().reduce((acc, curr) => {
        return curr === 'x' ? acc : curr + acc
    }, 0)
}

for (i=0; i < bingoBoardsInPlay.length; i++) {
    const numberCall = bingoInput[i]

    //loop over the boards until there is a winner,
    //mark all of the numbers that match as 'x'
    for (j=0; j < bingoBoardsInPlay.length; j++) {
        bingoBoardsInPlay[j] = bingoBoardsInPlay[j].map(row => row.map(n => {
            return n === numberCall ? 'x' : n
        }))
        
        if(boardIsWinner(bingoBoardsInPlay[j])) {
            lastNumberCall = numberCall
            winningBoard = bingoBoardsInPlay[j]
            break;
        }
    }
    if(winningBoard) {
        break;
    }
}

const answer1 = sumOfNumbersOnBoard(winningBoard) * lastNumberCall
console.log(answer1)

let bingoBoardsInPlay2 = bingoBoards
let lastNumberCall2;
let lastWinningBoard;

for (i=0; i < bingoInput.length; i++) {
    const numberCall = bingoInput[i]

    for (j=0; j < bingoBoardsInPlay2.length; j++) {
        bingoBoardsInPlay2[j] = bingoBoardsInPlay2[j].map(row => row.map(n => {
            return n === numberCall ? 'x' : n
        })) 
    }

    if(bingoBoardsInPlay2.length === 1 && boardIsWinner(bingoBoardsInPlay2[0])) {
        lastWinningBoard = bingoBoardsInPlay2[0]
        lastNumberCall2 = numberCall
        break;
    }

    bingoBoardsInPlay2 = bingoBoardsInPlay2.filter(b => !boardIsWinner(b))
}

const answer2 = sumOfNumbersOnBoard(lastWinningBoard) * lastNumberCall2
console.log(answer2)