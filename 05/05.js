const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const coords = input.split('\n').map(x => x.split(' -> ').map(y => y.split(',').map(z => parseInt(z))));

const horizontalAndVerticalLines = coords.filter(x => {
    return x[0][0] === x[1][0] || x[0][1] === x[1][1]
})

const getPointsOnHorizontalLine = coord => {
    const [[x1, y1], [x2, y2]] = coord 
    const greatest = Math.max(y1, y2) 
    let i = Math.min(y1, y2) + 1
    let newVals = []
    while (i < greatest) {
        newVals.push([x1, i])
        i++
    }
    return [...coord, ...newVals]
}

const getPointsOnVerticalLine = coord => {
    const [[x1, y1], [x2, y2]] = coord 
    const greatest = Math.max(x1, x2) 
    let i = Math.min(x1, x2) + 1
    let newVals = []
    while (i < greatest) {
        newVals.push([i, y1])
        i++
    }
    return [...coord, ...newVals]
}

const getPointsOnDiagonalLine = coord => {
    const [[x1, y1], [x2, y2]] = coord 
    let pointsCrossed = []

    const stepX = x1 < x2 ? 1 : -1;
    const stepY = y1 < y2 ? 1 : -1;
    for (let i = 0; i <= Math.abs(x1 - x2); i++) {
        const x = x1 + i * stepX;
        const y = y1 + i * stepY;
        pointsCrossed.push([x, y]);
    }
    return pointsCrossed
}

const countPointsWithIntersection = coords => {
    const counts = {};
    coords.forEach(x => { 
        counts[x] = (counts[x] || 0) + 1; 
    });

    return Object.values(counts).filter(x => x > 1).length
}

const coveredAreas = horizontalAndVerticalLines.map(coord => {
    const [[x1, y1], [x2, y2]] = coord
    if(x1 === x2) {
        return getPointsOnHorizontalLine(coord)
    } else {
        return getPointsOnVerticalLine(coord)
    }
}).flat();

console.log('Answer 1:', countPointsWithIntersection(coveredAreas))

const everyCoveredPoint = coords.map(coord => {
    const [[x1, y1], [x2, y2]] = coord
    if(x1 === x2) {
        return getPointsOnHorizontalLine(coord)
    } else if (y1 === y2) {
        return getPointsOnVerticalLine(coord)
    } else {
        return getPointsOnDiagonalLine(coord)
    }
}).flat()

console.log('Answer 2:', countPointsWithIntersection(everyCoveredPoint))