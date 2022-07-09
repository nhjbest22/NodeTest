//Using for Router features
const express = require("express");
const router = express.Router();

router.route('/abc')
    .get((req, res)=>{
        res.send("GET /abc");
    })
    .post((req, res)=>{
        res.send("POST /abc");
    })

module.exports = router;