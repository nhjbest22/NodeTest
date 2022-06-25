const http = require("http");
const fs = require("fs").promises;
const { stringify } = require("querystring");

const users = {}; //데이터 저장용

http.createServer(async (req, res)=>{
    try{
        console.log(req.method, req.url);
        if(req.method === "GET"){
            if(req.url === "/"){
                console.log("/로 진입")
                const data = await fs.readFile("./restFront.html");
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            }else if(req.url === "/about"){
                const data = await fs.readFile("./about.html");
                res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"});
                return res.end(data);
            }
            else if(req.url === "/users"){
                res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                console.log(`저장되어 있는 user들 : ${JSON.stringify(users)}`);
                return res.end(JSON.stringify(users));
            }
            try{
                const data = await fs.readFile(`.${req.url}`);
                console.log(`url 요청 : ${req.url}`)
                // if((req.url).endsWith("js")){
                //     res.writeHead(200, {"Content-Type": "text/javascript; charset=utf-8"});
                // }
                // else if (req.url.endsWith("css")){
                //     res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
                // }
                res.write(data);
                return res.end();
            }
            catch(err){
                console.log("해당하는 url이 존재하지 않습니다.");
                console.error(err);
            }
        }
        else if(req.method === "POST"){
            if(req.url==="/user"){
                let body = '';
                req.on('data', (data)=>{
                    body += data;
                });
                console.log(`Body 본문 : ${body}`)
                return req.on('end', ()=>{
                    console.log("POST 본문(Body):", body); //body = {name : 입력값}
                    const {name} = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name; // users = {"~~~~ 무작위 숫자" : "내가 넣은 값"}
                    res.writeHead(201);
                    res.end("등록 성공");
                })
            }
        }
        else if(req.method === "PUT"){
            if(req.url.startsWith('/user/')){
                const key = req.url.split("/")[2]; // split으로 나눠지는 값 : "", "user", "찾는 값" <= 찾는 값이 split[2]
                console.log(`나눠지는 key value : ${req.url.split("/")}`)
                let body = "";
                req.on('data', (data)=>{
                    body += data;
                });
                return req.on('end', ()=>{
                    console.log("PUT 본문(Body):", body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users));
                });
            }
        }
        else if (req.method === "DELETE"){
            if(req.url.startsWith("/user/")){
                const key = req.url.split("/")[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        }
        res.writeHead(404);
        res.end("NOT FOUND");
    }
    catch(err){
        console.error(err);
        res.writeHead(500);
        res.end(err);
    }
})
    .listen(port = 8082, ()=>{
        console.log(`${port}번 포트에서 서버 대기 중입니다.`);
    });