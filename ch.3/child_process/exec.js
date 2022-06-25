const exec = require("child_process").exec;
//exec의 경우 쉘을 실행시켜서 명령 수행
const process = exec("pwd");

process.stdout.on("data", data => {
    console.log(data.toString())}
)

process.stderr.on("error", (error)=>{
    console.error(error.toString());
})