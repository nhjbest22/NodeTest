process.on("uncaughtException", (err)=>{
    console.error(err);
});

setInterval(()=>{
    throw new Error("서버를 고장내주마!");
},1000);

setTimeout(()=>{
    console.log("실행됩니다.");
},2000);