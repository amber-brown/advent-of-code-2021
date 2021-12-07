const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const crabPositions = input.split(',').map(x => parseInt(x));

const highestCrabPosition = Math.max(...crabPositions)
const totalMovesToPosition = new Array(highestCrabPosition).fill(0);

for (let i = 0; i < highestCrabPosition; i++) {
    crabPositions.forEach(cPos => {
        totalMovesToPosition[i] += Math.abs(i - cPos)
    })
}

const answer1 = Math.min(...totalMovesToPosition)
console.log('Answer 1:', answer1)

