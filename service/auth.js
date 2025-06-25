// const sessionIdToUserMap = new Map(); for the state this is use when we devlop the statefull authentication  
const jwt = require("jsonwebtoken");
const secret="Utkarsh@123";//you have make your own key 

function setUser(user){
    // sessionIdToUserMap.set(id,user)

    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
        //password:user.password,
    },secret);//token assignment for the user 
}

//function getUser(id){
function getUser(token){
    // return sessionIdToUserMap.get(id);
    if(!token) return null;
    try{
        const payload=jwt.verify(token,secret)
        return payload;
    }
    catch(err){
        console.error("jwt error:",err.message);
        return null;
    }
}

module.exports={
    setUser,
    getUser,
};