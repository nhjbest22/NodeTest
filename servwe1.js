const http = require('http');
http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>')
    res.end('<p>Hello Server!</p>');
})
    .listen(port = 8080, () => {
        console.log(`${port}번 포트에서 대기중`);
    })