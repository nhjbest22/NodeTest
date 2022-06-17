const min = 2;
const max = 10000000;
const prime = [];

function generatePrimes(start, range){
    prime.push(2,3);
    for(let i = 4; i< range; i++){
        let isPrime = true;
        for(let j = start; isPrime && j <= Math.sqrt(i); j++){
            if(i%j === 0) isPrime = false; 
        }
        if(isPrime) prime.push(i);
    }
}

console.time("prime");
generatePrimes(min, max);
console.timeEnd("prime");
console.log(prime.length);