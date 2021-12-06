const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const laternFish = input.split(',').map(x => parseInt(x));

const getFishCountAfterDays = (fish, days) => {
    let currentFish = [...fish]
    
    for(let i = 0; i < days; i++) {
        let newFishCount = 0
        currentFish.forEach((f, i) => {
            if(f === 0) {
                currentFish[i] = 6
                newFishCount++
            } else {
                currentFish[i] = f-1
            }
        })

        currentFish = [...currentFish, ...new Array(newFishCount).fill(8)]
    }

    return currentFish.length
}

console.log('Answer 1:', getFishCountAfterDays(laternFish, 80))

