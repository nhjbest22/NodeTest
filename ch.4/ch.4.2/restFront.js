async function getUser(){
    try{
        console.log(`getUser 함수 실행`)
        const res = await axios.get("/users")
        const users = res.data;
        const list = document.getElementById("list");
        list.innerHTML = "";
        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key){ // Object.key(users) => users 객체에서 key값을 뽑아낸 배열 생성, map 함수로 key값 배열 속 각각의 key에 대해 함수 실행
            const userDiv = document.createElement("div")
            const span = document.createElement("span");
            span.textContent = users[key];
            const edit = document.createElement("button");
            edit.textContent = "수정";
            edit.addEventListener("click",async ()=>{
                const name = prompt("바꿀 이름을 입력하세요.");
                if(!name){
                    return alert("이름을 반드시 입력하세요 합니다.");
                }
                try{
                    await axios.put("/user/" + key, {name});
                    getUser();
                }
                catch(err){
                    console.error(err);
                }
            });
            const remove = document.createElement("button");
            remove.textContent = "삭제";
            remove.addEventListener("click",async ()=>{
                try{
                    await axios.delete("/user/" + key);
                    getUser();
                }
                catch(err){
                    console.error(err);
                }
            });
            userDiv.appendChild(span);//value값(내가 입력한 이름) 첨가
            userDiv.appendChild(edit);//수정 버튼 추가
            userDiv.appendChild(remove);//삭제 버튼 추가
            list.appendChild(userDiv);//유저 객체를 html에 있는 list 에 추가
            console.log(`res.data : ${res.data}`);
        });
    }
    catch(err){
        console.error(err);
    }
}

window.onload = getUser; // 화면 로딩 시 getuser 함수 실행
document.getElementById("form").addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = e.target.username.value;
    if(!name){
        return alert("이름을 입력하세요");
    }
    console.log(`form 에서 받아오는 name value : ${name}`)
    try{
        await axios.post("/user" , {name});
        getUser();
    }
    catch(err){
        console.error(err);
    }
    e.target.username.value = "";
})