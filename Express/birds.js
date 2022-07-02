const express = require("express");
const router = express.Router();

router.use((req, res, next)=>{
    console.log("Time: ", Date.now());
    next();
})

router.get("/", (req, res, next)=>{
    res.send("Birds home page");
    //res.send("No more res");
    next();
}, (req, res, next)=>{
    //res.end("Welcome to birds site!");
    console.log("next come");
    next();
});

router.get("/", (req, res)=>{
    //res.send("Welcome to birds site!");
    console.log("next come2");
})

router.get("/about", (req, res)=>{
    res.send("About birds");
})

module.exports = router;