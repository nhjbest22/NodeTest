var sayNode = function(){
    console.log("Node")
};
var es="ES";
var oldObject = {
    sayJS: function(){
        console.log(`JS`);
    },
    sayNode:sayNode,
    ES5:"fantasic"
}
// oldObject[es+6] = "Fantastic";
// oldObject.sayNode();
// oldObject.sayJS();
// console.log(oldObject.ES6);
// console.log(oldObject.ES5)



const NewObject = {
    sayNode,
    sayJS(){console.log("JS")},
    [es+6] : "Fantastic",
};

//NewObject.sayJS();
//NewObject.sayNode();

// console.log(NewObject.ES6);


function add1(x,y){
    return x+y;
}
const add2 = (x,y) =>{
    return x+y;
}
const add3 = (x,y) => (x+y);

const add4 = (x,y) => x+y;

function not1(x){
    return !x;
}

const not2 = x => !x;

// this binding diffence

var relationship1 = {
    name : "zero",
    logFrineds: function(){
        var that = this;
        that.friends.forEach(function (friend){
            console.log(that.name, friend)
            friends : ['nerd', 'hero', 'xero']
        })
    }
}

const relatiomship2 ={
    name : 'zero',
    friends : ['nero', 'hero', 'xero'],
    logFrineds(){
        this.friends.forEach(friend => {
            console.log(this.name, friend)
        })
    }
}

//relationship1.logFrineds();
//relatiomship2.logFrineds();

// structure destruct

//old 

var CandyMachine = {
    status : {
        name : "node",
        count : 5
    },
    getCandy : function(){
        this.status.count--;
        return this.status.count;
    }
};

// new

const {getCandy, status:{count}} = CandyMachine;
//getCandy();
//console.log(count);

const array = ['nodejs', {}, 10, true];
const [node,obj, , bool] = array;
//console.log(obj);

//class differnece

// var Human = function(type){
//     this.type = type
// }
// Human.isHuman = function(human){
//     return human instanceof Human;
// }
// Human.prototype.breathe = function(){
//     alert('h-a-a-a-m');
// }

// var Zero = function(type, firstName, lastName){
//     Human.apply(this, arguments);
//     this.firstName = firstName;
//     this.lastName = lastName;
// }

// Zero.prototype = Object.create(Human.prototype);
// Zero.prototype.constructor = Zero;
// Zero.prototype.sayName = function(){
//     alert(this.firstName + ' ' + this.lastName);
// }

// var oldZero = new Zero('human', 'Zero', 'Cho');
// console.log(Human.isHuman(oldZero));
//New Class 
class Human {
    constructor(type = 'human'){
        this.type = type;
    }
    static isHuman (human){
        return human instanceof Human
    }
    breathe(){
        alert('h-a-a-a-m');
    }
}

class Zero extends Human{
    constructor(type, firstName, lastName){
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayName(){
        super.breathe();
        alert(`${this.firstName} ${this.lastName}`);
    }
}

const newZero = new Zero('human', 'Zero', 'Cho');
//promise, Callbackfn ...
const condition = true;
const promise = new Promise((resolve, reject)=>{
    if(condition){
        resolve('성공')
    }
    else{
        reject('실패');
    }
});

// promise
//     .then((message)=>{
//         console.log(message);
//     })
//     .catch((error)=>{
//         console.error(error)
//     })
//     .finally(()=>{
//         console.log("무조건");
//     });

// double Promise ex)

// promise
//     .then((message)=>{
//         return new Promise((resolve, reject)=>{
//             resolve(message);
//         });
//     })
//     .then((message2)=>{
//         console.log(message2 + ' 1번쨰');
//         return new Promise((resolve, reject)=>{
//             resolve(message2);
//         })
//     })
//     .then((message3)=>{
//         console.log(message3 + ' 2번째');
//     })
//     .catch((err)=>{
//         console.error(err);
//     });

//Callback fn hell

// function findAndSaveUser(Users){
//     Users.findOne({},(err,user)=>{
//         if(err){
//             return console.error(err);
//         }
//         user.name = 'zero';
//         user.save((err)=>{
//             if(err) return console.error(err);
//             Users.findOne({gender:'m'},(err,user)=>{
//                 //blah blah
//             })
//         })
//     })
// }

// function findAndSaveUser2 (Users){
//     Users.findOne({})
//     .then((user)=>{
//         user.name= 'zero';
//         return user.save();
//     })
//     .then((user)=>{
//         return Users.findOne({gender:'m'});
//     })
//     .then((user)=>{
//         //생략
//     })
//     .catch((err)=>{
//         console.error(err);
//     })
// }

//double check of promise

// const promise1 = Promise.resolve("성공 1");
// const promise2 = Promise.resolve("성공 2");
// Promise.all([promise1, promise2])
//     .then((result)=>{
//         console.log(result);
//     })
//     .catch((err)=>{
//         console.error(err);
//     })

// async/await
//promise ver
function findAndSaveUser2 (Users){
    Users.findOne({})
    .then((user)=>{
        user.name= 'zero';
        return user.save();
    })
    .then((user)=>{
        return Users.findOne({gender:'m'});
    })
    .then((user)=>{
        //생략
    })
    .catch((err)=>{
        console.error(err);
    })
}
// async/await ver
// const findAndSaveUser2 = async (Users) =>{
//     try{
//         let user = await Users.findOne();
//         user.name = 'Zero';
//         user = await user.save();
//         user = await Users.findOne({gender: 'm'});
//     }
//     catch{
//         console.error(err);
//     }
//     //생략
// }

const promise1 = Promise.resolve("성공1");
const promise2 = Promise.resolve("성공2");

(async ()=>{
    for await (pros of [promise1,promise2]){
        console.log(pros);
    };
})();

async function findAndSaveUser(Users){
    //생략
}

findAndSaveUser().then(()=>{
    //생략
})
//or 

async function other(){
    const result = await findAndSaveUser();
}