const {URL} = require("url");

const myURL = new URL("https://www.gilbut.co.kr/book/view?bookcode=BN002827&keyword=%EB%85%B8%EB%93%9C&collection=GB_BOOK");
console.log("searchParams:",myURL.searchParams);
console.log("searchParams.getAll():",myURL.searchParams.getAll("collection"));
console.log("searchParams.get():",myURL.searchParams.get("keyword"));
console.log("searchParams.has():",myURL.searchParams.has("book")); // discriminate whether object has corresponding key or not

console.log("searchParam.keys():",myURL.searchParams.keys());
console.log("searchParams.values():",myURL.searchParams.values());

myURL.searchParams.append("filter", "es3");

myURL.searchParams.append("filter", "es5");
console.log(myURL.searchParams.getAll("filter"));

myURL.searchParams.set("filter","es6");
console.log(myURL.searchParams.getAll("filter"));

myURL.searchParams.delete("filter");
console.log(myURL.searchParams.getAll("filter"));

console.log("searchParams.toString():",myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();

console.log(myURL) // after change search object in myURL
