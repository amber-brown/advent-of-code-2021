const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const coords = input.split('\n').map(x => x.split(' -> ').map(y => y.split(',').map(z => parseInt(z))));

const horizontalAndVerticalLines = coords.filter(x => {
    return x[0][0] === x[1][0] || x[0][1] === x[1][1]
})

const coveredAreas = horizontalAndVerticalLines.map(x => {
    if(x[0][0] === x[1][0]) {
        const greatest = Math.max(x[0][1], x[1][1]) 
        let i = Math.min(x[0][1], x[1][1]) + 1
        let newVals = []
        while (i < greatest) {
            newVals.push([x[0][0], i])
            i++
        }
        return [...x, ...newVals]
    } else {
        const greatest = Math.max(x[0][0], x[1][0]) 
        let i = Math.min(x[0][0], x[1][0]) + 1
        let newVals = []
        while (i < greatest) {
            newVals.push([i, x[0][1]])
            i++
        }
        return [...x, ...newVals]
    }
}).flat();

const counts = {};
coveredAreas.forEach(x => { 
    counts[x] = (counts[x] || 0) + 1; 
});

const answer1 = Object.values(counts).filter(x => x > 1).length
console.log(answer1)
