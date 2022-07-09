const express = require("express");
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Hello User');
})

router.get('/:id', (req, res)=>{
    res.send(`Hello! ${req.params.id}`);
    console.log(req.params, req.query);
})

module.exports = router;