const http = require("http");

http.createServer((req, res)=>{
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {"Set-Cookie": "mycookie=test"});
    res.end("Hello Cookie");
})
    .listen(port =8082,()=>{
        console.log(`서버가 ${port}번 포트에 연결되어 있습니다.`);
    })