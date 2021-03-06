const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const qs = require("querystring");
const { parse } = require("path");
const { rmSync } = require("fs");

const parseCookies = (cookie="")=>
    cookie
        .split(';')
        .map(v=>v.split('='))
        .reduce((acc,[k,v])=>{
            acc[k.trim()]=decodeURIComponent(v);
            return acc;
        },{});

const session = {};

http.createServer(async(req,res)=>{
    const cookies = parseCookies(req.headers.cookie);
    console.log(`cookie 값: ${cookies}}`)
    if(req.url.startsWith("/login")){
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes()+5);
        const UniqueInt = Date.now();
        session[UniqueInt] = {
            name,
            expires,
        };
        res.writeHead(302, {Location:'/', 'Set-Cookie':`session=${UniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,});
        res.end();
    }
    //세션 쿠키가 존재하고, 만료시간이 지나지 않았다면
    else if(cookies.session && session[cookies.session].expires > new Date()){
        res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name} 님 안녕하세요`);
    }else{
        try{
            const data = await fs.readFile("./cookie2.html");
            console.log("fs 진입");
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end(data);
        }
        catch(err){
            res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
            console.error(err.message);
        }
    }
})
    .listen(port = 8085, ()=>{
        console.log(`서버가 ${port}번 포트에 연결 중입니다.`)
    })