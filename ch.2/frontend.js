(async ()=>{
    try{
        const result = await axios.get("https://www.zerocho.com/api/get");
        console.log(result);
        console.log(result.data);
    }
    catch(error){
        console.error(error)
    }
})();

// (async()=>{
//     try{
//         const formData = new FormData();
//         formData.append("name", "zerocho");;
//         formData.append("birth", "1994");

//         const result = await axios.post("https://www.zerocho.com/api/post", formData);
//         console.log(result);
//         console.log(result.data);    
//     }
//     catch(error){
//         console.error(error);
//     }
// })