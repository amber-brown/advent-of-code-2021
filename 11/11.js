const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const octopusGroup = input.split('\n').map(x => x.split('').map(y => parseInt(y)))

let totalFlashes = 0;
let flashingGroup = octopusGroup;

const STEPS = 100;

const addSteps = group => {
    group.forEach((row, x) => {
        row.forEach((_, y) => {
            group[x][y]++
        })
    })

    return group;
}

const setFlash = (x, y) => {
    flashingGroup[x][y] = 0;
    totalFlashes++

    const adjacentCoords = [
        [x+1, y],
        [x-1, y],
        [x, y+1],
        [x, y-1],
        [x+1, y+1],
        [x+1, y-1],
        [x-1, y+1],
        [x-1, y-1]
    ]

    adjacentCoords.forEach(coord => {
        const [a, b] = coord

        const rowsCount = flashingGroup.length
        const rowLength = flashingGroup[0].length
        
        // if the coord doesn't exist return
        if(a < 0 || b < 0 || a > rowsCount - 1 || b > rowLength - 1) {
            return;
        }

        const octopus = flashingGroup[a][b]

        if(octopus === 0 || octopus === 10) {
            return
        } else if (octopus === 9) {
            setFlash(a, b)
        } else {
            flashingGroup[a][b]++
        }
    })
}

for (let i = 0; i < STEPS; i++) {
    flashingGroup = addSteps(flashingGroup)

    flashingGroup.forEach((row, rowIndex) => {
        row.forEach((octopus, octopusIndex) => {
            if(octopus === 10) {
                setFlash(rowIndex, octopusIndex)
            }
        })
    })
}

console.log('Answer 1: ', totalFlashes) // 1683

/* ---------------------- */

let flashingGroup2 = octopusGroup
let count = 0

const allOctopusFlashed = group => {
    const flattened = group.flat()
    return flattened.every(val => val === 0)
}

const setFlash2 = (x, y) => {
    flashingGroup2[x][y] = 0;

    const adjacentCoords = [
        [x+1, y],
        [x-1, y],
        [x, y+1],
        [x, y-1],
        [x+1, y+1],
        [x+1, y-1],
        [x-1, y+1],
        [x-1, y-1]
    ]

    adjacentCoords.forEach(coord => {
        const [a, b] = coord

        const rowsCount = flashingGroup2.length
        const rowLength = flashingGroup2[0].length
        
        // if the coord doesn't exist return
        if(a < 0 || b < 0 || a > rowsCount - 1 || b > rowLength - 1) {
            return;
        }

        const octopus = flashingGroup2[a][b]

        if(octopus === 0 || octopus === 10) {
            return
        } else if (octopus === 9) {
            setFlash2(a, b)
        } else {
            flashingGroup2[a][b]++
        }
    })
}

while(!allOctopusFlashed(flashingGroup2)) {
    flashingGroup2 = addSteps(flashingGroup2)

    flashingGroup2.forEach((row, rowIndex) => {
        row.forEach((octopus, octopusIndex) => {
            if(octopus === 10) {
                setFlash2(rowIndex, octopusIndex)
            }
        })
    })

    count++
}

console.log('Answer 2: ', count) // 688