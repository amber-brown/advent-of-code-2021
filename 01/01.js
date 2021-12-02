const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const inputArray = input.split('\n').map(i => parseInt(i))

const answer1 = inputArray.reduce((acc, curr, index) => {
    return curr > inputArray[index - 1] ? acc + 1 : acc
}, 0)

console.log(answer1)

const answer2 = inputArray.reduce((acc, curr, index, arr) => {  
    if (index - 3 > arr.length) {
        return acc;
    }
    return curr < arr[index + 3] ? acc + 1 : acc
}, 0)

console.log(answer2)




