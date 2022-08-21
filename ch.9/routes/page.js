const express = require('express');
const { Post, User, Hashtag } = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router = express.Router();

router.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.followerCount = res.user ? res.user.Follwers.length : 0; 
    res.locals.followingCount = res.user ? res.user.Followings.length : 0;
    res.locals.followerIdList = res.user ? res.user.Follwers.map(f=>f.id) : [];
    next();
});

router.get('/profile', isLoggedIn, (req, res, next)=>{
    res.render('profile', {title: '내 정보 - NodeBird'});
});

router.get('/join', isNotLoggedIn, (req, res, next)=>{
    res.render('join', {title: '회원가입 - NodeBird'});
});

router.get('/', async (req, res, next)=>{
    try{
        const posts = await Post.findAll({
            include:{
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/hashtag', async (req,res,next)=>{
    const query = req.query.hashtag;
    if(!query)
        res.redirect('/');
    try{
        const hashtag = await Hashtag.findOne({where: {title: query}});
        let posts = [];
        if(hashtag){
            posts = await hashtag.getPosts({
                include: [{ model: User}]
            });
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts
        });
    } catch (err){
        console.error(err);
        return next(err);
    }
})
module.exports = router;