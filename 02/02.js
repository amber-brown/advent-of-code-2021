const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const inputArray = input.split('\n').map(x => {
    const [dir, amount] = x.split(' ')
    return [dir, parseInt(amount)]
})

const answer1 = inputArray.reduce((acc, curr) => {
    const [dir, amount] = curr;

    if(dir === 'up') {
        return [acc[0], acc[1] - amount]
    } else if (dir === 'down') {
        return [acc[0], acc[1] + amount]
    } else if (dir === 'forward') {
        return [acc[0] + amount, acc[1]]
    }
}, [0, 0])

console.log(answer1[0] * answer1[1])

let aim = 0;
const answer2 = inputArray.reduce((acc, curr) => {
   const [dir, amount] = curr;

    if(dir === 'up') {
        aim = aim - amount
        return acc
    } else if (dir === 'down') {
        aim = aim + amount
        return acc
    } else if (dir === 'forward') {
        return [acc[0] + amount, acc[1] + (amount * aim)]
    } 
}, [0, 0])

console.log(answer2[0] * answer2[1])