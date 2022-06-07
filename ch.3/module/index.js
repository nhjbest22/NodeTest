const checkNumber = require("./func");
const { even, odd } = require("./var");

function checkStringOddOrEven(str){
    if(str.lengnth%2==0){
        return even;
    }
    return odd;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));