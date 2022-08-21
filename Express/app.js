const express = require("express");
const app = express();

const birds = require("./birds");

app.use("/birds", birds);


app.get('/', (req, res, next)=>{
    res.send('Good');
})
app.route("/book")
    .get((req, res)=>{
        res.send("Get a random book");
    })
    .post((res, req)=>{
        res.send("Add a book");
    })
    .put((res, req)=>{
        res.send("Update the book");
    });

app.listen(8080, ()=>{
    console.log("port open")
});