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
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const abcRouter = require('./routes/abc');
app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, views))
app.set('view engine', 'pug');

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
    fs.readdirSync('uploads');//실행 폴더에서 uploads 폴더 찾아봄
} catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
    fs.mkdirSync('uploads')
}//uploads 폴더가 있는지 업로드 전 확인, 폴더가 존재하지 않으면 폴더 생성

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/'); //파일 어디에 업로드 할 건지 세팅
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);// ext = 확장자
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 원래 이름 + 현재 시각 + 확장자 => 새로운 이름
        },//파일 이름 세팅
    }),
    limits: {fileSize: 5*1024*1024}, //파일 업로드 크기 제한
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use(abcRouter);

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
//다음 미들웨어로 에러 Throw

app.get('/upload', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart.html'));
})

app.post('/upload', upload.fields([{name: 'image1'}, {name: 'image2'}]),
    (req, res)=>{
        console.log(req.files, req.body);
        res.send("OK");
    },
);

app.use((req, res)=>{
    res.status(404).send("Not Found! " + req.path);
    throw new Error(`Not Found Route: ${req.headers}`);
})

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(err.message);
    console.log(req.session);
    console.log(req.body);
})//에러가 있으면 출력하고 500번으로 응답 및 에러 메시지 res로 전달

app.listen(app.get("port"), ()=>{
    console.log(`${app.get("port")}번 포트에서 대기 중`);
});//현재 사용중인 포트 출력