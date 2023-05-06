const axios=require("axios")

const getDummyUserData=async ()=>{
    try{
        const data=await axios.get("https://jsonplaceholder.typicode.com/users")
        return data.data
    }catch(error){
        //handle error
    }
}
module.exports={getDummyUserData}