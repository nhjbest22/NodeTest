const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () =>{
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.findOne({
            where:{id},
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers'
            },{
                model: User,
                as: 'Followings',
                attributes: ['id', 'nick']
            }]
        })
            .then(user=>done(null, user))// req.user에 저장
            .catch(err => done(err))
    });

    local();
    kakao();
};
// 전체적인 과정
// 1. 라우터를 통해 로그인 요청이 들어옴
// 2. 라우터에서 passport.authenticate 메서드 호출
// 3. 로그인 전략 수행
// 4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
// 5. req.login 메서드가 passport.serializeUser 호출
// 6. req.session에 사용자 아이디만 저장
// 7. 로그인 완료

// 로그인 이후의 과정
// 1. 요청이 들어옴
// 2. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가 passport.deserializeUser 메서드 호출
// 3. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
// 4. 조회된 사용자 정보를 req.user에 저장
// 5. 라우터에서 req.user 객체 사용 가능