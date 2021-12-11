const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const signalPatterns = input.split('\n').map(x => x.split(' | ').map(y => y.split(' ')))

let count1s = 0;
let count4s = 0;
let count7s = 0;
let conut8s = 0;

signalPatterns.forEach(patternsArr => {
    const [_, output] = patternsArr
    output.forEach(signal => {
        if (signal.length === 2) {
            count1s++
        } else if (signal.length === 3) {
            count7s++
        } else if (signal.length === 4) {
            count4s++
        } else if (signal.length === 7) {
            conut8s++
        }
    })
})

const answer1 = count1s + count4s + count7s + conut8s;
console.log(answer1)