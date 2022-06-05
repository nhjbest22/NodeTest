const http = require('http');
const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello World</h1>');
    res.end('<p>Hello Server!</p>');
})

server.listen(port = 8080);
server.on('listening', ()=>{
    console.log(`서버가 ${port}번 포트에 연결중입니다.`);
})

server.on("error",(error)=>{
    console.error(error);
})