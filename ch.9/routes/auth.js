const express= require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next)=>{
    const {email, nick, password} = req.body;
    try{
        const exUser = await User.findOne({where: {email}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash
        });
        return res.redirect('/');
    }catch (err){
        console.error(err);
        return next(err)
    }
});

router.post('/login', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError)=>{ //passport.SerailizeUser 호출, user 객체를 던져줌
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn,(req, res, next)=>{
    req.logout((err)=>{
        if(err){
            console.error(err);
            next(err);
        }
        req.session.destroy();
        res.redirect('/');  
    });
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res, next)=>{
    res.redirect('/');
})

module.exports = router;