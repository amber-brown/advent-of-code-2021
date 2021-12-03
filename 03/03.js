const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const inputArray = input.split('\n')

const countOnes = inputArray.reduce((acc, curr) => {
    const numberArr =  curr.split('').map(x => parseInt(x))
    const newCount = [...acc]
    numberArr.forEach((x, i) => {
        newCount[i] = newCount[i] + x
    })

    return newCount
}, new Array(12).fill(0))

const gammaRateArray = countOnes.reduce((acc, curr, index, arr) => {
    if (curr > inputArray.length / 2) {
        acc[index] = 1
    }
    return acc 
}, new Array(12).fill(0))

const gammaRate = gammaRateArray.join('')

const epsilonRateArray = gammaRateArray.map(x => x ? 0 : 1);
const epsilonRate =  epsilonRateArray.join('')

const answer1 = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)

console.log(answer1)

const getRating = ratingType => {
    let array = inputArray.map(x => x.split(''))

    for (let i=0; i < 12; i++ ) {
        const numberOfOnesInPosition = array.reduce((acc, curr) => {
            return acc + parseInt(curr[i]) 
        }, 0);

        let numberToFilter;

        if(ratingType === 'CO2Scrubber') {
            numberToFilter = numberOfOnesInPosition * 2 >= array.length ? 1 : 0;
        } else {
            numberToFilter = numberOfOnesInPosition * 2 >= array.length ? 0 : 1;
        }

        array = array.filter(x => {
            return parseInt(x[i]) === numberToFilter
        }); 

        if(array.length <= 1) {
            break;
        }
    }

    return array[0].join('')
}

const answer2 = parseInt(getRating('CO2Scrubber'), 2) * parseInt(getRating('oxygenGenerator'), 2)

console.log(answer2)



