const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const laternFish = input.split(',').map(x => parseInt(x));

const getFishCountAfterDays = (initialFish, days) => {
    let daysUntilReproductionFishCount = new Array(9).fill(0);
    initialFish.forEach((time) => daysUntilReproductionFishCount[time]++);

    for(let i = 0; i < days; i++) {
        // remove all fish that reproduce from day 1 
        //(moves all other items into the new day position in the array)
        const fishThatReproducedCount = daysUntilReproductionFishCount.shift()

        //add babies to end of array
        daysUntilReproductionFishCount.push(fishThatReproducedCount)

        //fish that reproduced then reset back to day 6
        daysUntilReproductionFishCount[6] += fishThatReproducedCount;
    }

    return daysUntilReproductionFishCount.reduce((acc, val) => acc + val, 0);
}

console.log('Answer 1:', getFishCountAfterDays(laternFish, 80)) //365131

console.log('Answer 2', getFishCountAfterDays(laternFish, 256)) // 1650309278600


