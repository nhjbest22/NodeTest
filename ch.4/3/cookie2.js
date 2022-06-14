const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const qs = require("querystring");

const parseCookies =(cookie="")=>
    cookie
        .split(";")
        .map(v=>v.split('='))
        .reduce((acc,[k,v])=>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        },{});
    //화살표 함수에서 식이 1개일 경우 중괄호 생략가능
    //단 그 식이 자동으로 return 됨.
    //{}으로 묶으면 항상 return 되지는 않음.

http.createServer(async (req,res)=>{
    console.log(parseCookies(req.headers.cookie));
    const cookies = parseCookies(req.headers.cookie);
    if(req.url.startsWith("/login")){
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes()+5);
        res.writeHead(302, {Location: '/','Set-Cookie':`name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,})
        res.end();
    }
    else if(cookies.name){
        res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }
    else{
        try{
            const data = await fs.readFile("./cookie2.html");
            res.writeHead(200,{"Content-Type": "text/html; cahrset=utf-8"});
            res.end(data); 
        }
        catch(err){
            res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
            res.end(err.message);
        }
    }
})
    .listen(port = 8085,()=>{
        console.log(`서버가 ${port}번 포트에 연결되었습니다.`);
    })
