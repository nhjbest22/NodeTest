const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');
const {User} = require('./models');
const { Op, where } = require('sequelize');

const app = express();
app.set('port', process.env.PORT || 3100);
app.set('view engine', 'html');
nunjucks.configure('views',{
    express:app,
    watch:true,
});

sequelize.sync({force:false,})
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    })
User.findAll({
    attributes: ['name', 'married', 'age'],
    order: [['age', 'ASC']],
})
    .then((result)=>{
        for (let data of result){
            console.log(data.dataValues);
        }
    })
    .catch((err)=>{
        console.error(err);
    })

User.destroy({
    where: {id:10},
})
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    console.log(error.message);
    next(error);
})

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')}번 포트에 연결되었습니다.`);
})

