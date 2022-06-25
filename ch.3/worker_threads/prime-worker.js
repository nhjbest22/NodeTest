const {Worker, workerData, isMainThread, parentPort} = require("worker_threads");

const min = 1;
let primes = [];

function generatePrimes(start, range){
    for(let i = start; i< range; i++){
        if(i===1) continue;
        if(i===2||i===3){primes.push(i); continue;}
        let isPrime = true;
        for(let j = 2; isPrime && j <= Math.sqrt(i); j++){
            if(i%j === 0) isPrime = false; 
        }
        if(isPrime) primes.push(i);
    }
}

if(isMainThread){
    const max = 10000000;
    const threadCount = 8;
    const threads = new Set();
    const range = Math.ceil((max-min)/8);
    // for(let i = 0; i < 8;i++){
    //     console.log(range*(i+1));
    // }
    let start = min;
    console.time("prime");
    for(let i=0;i<threadCount;i++){
        threads.add(new Worker(__filename,{workerData:{start, range : range*(i+1)}}));
        start += range;
    }
    for (let worker of threads){
        worker.on("error", (err)=>{
            console.error(err);
        })
        worker.on("exit", ()=>{
            threads.delete(worker);
            if(threads.size===0){
                console.timeEnd("prime");
                console.log(primes.length);
            }
        })
        worker.on("message", (msg)=>{
            primes = primes.concat(msg);
        })
    }
}else{ //메인 스레드가 아닐 때 
    generatePrimes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
}
