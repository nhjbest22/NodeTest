const { parse } = require("path");
const url = require("url");

const {URL} = url;
const myURL = new URL("https://www.gilbut.co.kr/book/view?bookcode=BN002827&keyword=%EB%85%B8%EB%93%9C&collection=GB_BOOK");
console.log("new URL():", myURL);
console.log("url.format():",url.format(myURL));
console.log("----------------------------------");

const parseUrl = url.parse("https://www.gilbut.co.kr/book/view?bookcode=BN002827&keyword=%EB%85%B8%EB%93%9C&collection=GB_BOOK");

console.log("url.parse():",parseUrl);
console.log("url.format():",url.format(parseUrl));