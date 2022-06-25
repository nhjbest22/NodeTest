const spawn = require("child_process").spawn;
//spawn 은 새로운 프로세스를 띄워서 명령을 실행
//option으로 {shell : true}를 주면 쉘을 실행시켜서 명령 수행
const process = spawn('python', ['test.py']);

process.stdout.on("data", (data)=>{
    console.log(data.toString());
})

process.stderr.on("error", (error)=>{
    console.error(error.toString());
})