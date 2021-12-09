const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const heatMap = input.split('\n').map(x => x.split('').map(y => parseInt(y)))

const lowPointValues = []

heatMap.forEach((row, rowIndex) => {
    row.forEach((value, valueIndex) => {
        const isFirstInRow = valueIndex === 0
        const isLastInRow = valueIndex === heatMap[rowIndex].length - 1

        const isFirstRow = rowIndex === 0
        const isLastRow = rowIndex === heatMap.length - 1

        const isLessThanLeftPoint = !isFirstInRow ? value < row[valueIndex-1] : true
        const isLessThanRightPoint = !isLastInRow ? value < row[valueIndex+1] : true

        const isLessThanTopPoint = !isFirstRow ? value < heatMap[rowIndex-1][valueIndex] : true
        const isLessThanBottomPoint = !isLastRow ? value < heatMap[rowIndex+1][valueIndex] : true
        
        if(isLessThanLeftPoint && isLessThanRightPoint && isLessThanTopPoint && isLessThanBottomPoint) {
            console.log('here')
            lowPointValues.push(value+1)
        }
    })
})

const answer1 = lowPointValues.reduce((acc, curr) => acc + curr, 0)
console.log(answer1)