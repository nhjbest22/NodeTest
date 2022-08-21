const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
    .get(async (req,res, next)=>{
        try{
            const users = await User.findAll();
            res.json(users);
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next)=>{
        try{
            const user = await User.create({
                name: req.body.name,
                age: req.body.age,
                married : req.body.married,
            })
            console.log(user);
            res.status(201).json(user);
        }catch(err){
            console.error(err);
            next(err);
        }
    })

router.get('/:id/comments', async(req, res, next)=>{
    try{
        const comments = await Comment.findAll({
            include:{
                model: User,
                where: {id : req.params.id}
            },
        })
        console.log('특수한 케이스 주의 요망!');
        console.log(comments);
        res.json(comments);
    }catch(err){
        console.error(err);
        next(err);
    }
})
//살짝 맛이 간 코드?

module.exports = router;