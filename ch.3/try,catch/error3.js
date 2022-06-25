const fs = require("fs").promises;

setInterval(()=>{
    //fs.unlink("./abcdeg.js");
    try{
        fs.unlink("./abcdeg.js");
    }catch(err){
        console.log(err);
    }
},1000);