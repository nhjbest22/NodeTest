const fs = require("fs").promises;
const constants = require("fs").constants;

fs.access("./folder", constants.R_OK | constants.W_OK | constants.F_OK)
    .then(()=>{
        return fs.readdir("./folder");
    })
    .catch((err)=>{
        throw(err);
    })
    .then((dir)=>{
        console.log("파일 내용 확인", dir);
        return fs.unlink("./folder/newfile.js");
    })
    .then(()=>{
        console.log("파일 삭제 성공");
        return fs.rmdir("./folder");
    })
    .then(()=>{
        console.log("폴더 삭제 성공");
    })
    .catch((err)=>{
        console.log(err);
    })