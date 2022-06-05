(async () => {
    try {
    const result = await axios.get("https://www.zerocho.com/api/get");
    console.log(result);
    console.log(result.data);
    } catch (error) {
    console.error(error);
    }
})();
(async () => {
    try {
    const result = await axios.post(
        "https://www.zerocho.com/api/pos/json",
        {
        name: "zerocho",
        birth: 1994
        }
    );
    console.log(result);
    console.log(result.data);
    } catch (error) {
    console.error(error);
    }
})();