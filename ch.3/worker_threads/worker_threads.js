const {Worker, isMainThread, parentPort,} = require("worker_threads");

//부모 스레드일 때
if(isMainThread){
    const worker = new Worker(__filename); //워커 스레드 생성
    worker.on('message', message =>console.log("from worker", message)); //message 오는지 이벤트 리스너 생성
    worker.on("exit", ()=>console.log("worker exit")); //스레드 종료시 이벤트 실행
    worker.postMessage('ping'); //워커 스레드에 문자열 전달
}else {// 워커일 때
    parentPort.on("message", (value)=>{
        console.log("from parent", value);
        parentPort.postMessage('pong'); //부모 스레드에 문자열 전달
        parentPort.close(); //워커 스레드 종료
    })
}