const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if(cluster.isPrimary){
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    //cpu 개수만큼 워커를 생산
    for(let i=0;i<numCPUs;i++){
        cluster.fork();
    }
    //워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
    })
}else{
    http.createServer((req,res)=>{
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        res.write("<h1>Hello Node!</h1>");
        res.end("<p>Hello Cluster!</p>");
        setTimeout(()=>{
            process.exit();
        },1000);
    })
        .listen(8080)
        console.log(`${process.pid}번 워커 실행`);
}