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

const totalFuelConsumptionForEachPosition = new Array(highestCrabPosition).fill(0);

for (let i = 0; i < highestCrabPosition; i++) {
    crabPositions.forEach(cPos => {
        const steps = Math.abs(i - cPos)
        // +1 +2 +3 for the amount of steps...
        for(let j = 1; j <= steps; j++) {
            totalFuelConsumptionForEachPosition[i] += j
        }
    })
}

const answer2 = Math.min(...totalFuelConsumptionForEachPosition)
console.log('Answer 2:', answer2)
