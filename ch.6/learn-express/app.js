const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const fs = require('fs');
const multer = require("multer");

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(
    morgan('dev'),
    express.json(),
    express.urlencoded({extended:false}),
    cookieParser(process.env.COOKIE_SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: 'session-cookie',
    }),
);

try{
    fs.readdirSync('uploads');
} catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
    fs.mkdirSync('uploads')
}//uploads 폴더가 있는지 업로드 전 확인

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5*1024*1024},
});

app.use((req, res, next)=>{
    console.log("모든 명령에 대해 실행됩니다.");
    next();
})//모든 명령에 대해 선행적으로 실행(위치 때문에), 다음 미들웨어로 넘기기

app.get("/", (req, res, next)=>{
    console.log("GET / 요청에서만 실행됩니다.");
    next();
}, (req, res)=>{
    throw new Error("에러는 에러 처리 미들웨어로 갑니다.");
});//최상위 루트에 GET명령이 오면 console 출력, 다음 미들웨어로 전달
//다음 미들웨어에서 에러 Throw

app.use('/upload', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart.html'));
})

app.post('/upload', upload.single('image'),(req, res)=>{
    console.log(req.file, req.body);
    res.send("OK");
})

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(err.message);
    console.log(req.session);
    console.log(req.body)
})//에러가 있으면 출력하고 500번으로 응답 및 에러 메시지 res로 전달

app.listen(app.get("port"), ()=>{
    console.log(`${app.get("port")}번 포트에서 대기 중`);
});//현재 사용중인 포트 출력