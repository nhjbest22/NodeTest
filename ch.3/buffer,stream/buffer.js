const buffer = Buffer.from("저를 버퍼로 바꿔보세요");
console.log("from():", buffer);
console.log("length():",buffer.length);
console.log("toString():", buffer.toString());

const array = [Buffer.from("뛰엄 "), Buffer.from("뛰엄 "), Buffer.from("뛰어쓰기")];
const buffer2 = array.concat();
console.log("concat():",buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log("alloc():", buffer3);
