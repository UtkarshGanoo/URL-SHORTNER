const {v4: uuidv4}=require("uuid")
const User =require("../model/user");
const  {setUser}=require("../service/auth")

//for the signup
async function handleUserSignup(req,res){
    const {name ,email,password }=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}
// for the login
async function handleUserLogin(req,res){
    const {email,password }=req.body;
    const user =await User.findOne({
        email,
        password,
    });
    if(!user) return res.render("login",{
        error:"Invalid Username Email and password"
    });
    // this 4 line to generate the cookie when user is login
    //const sessionId=uuidv4();//for the sattefull here we create the session id but in statelless authentication we dont need to create this id 
    // setUser(sessionId,user);
    const token = setUser(user);
    res.cookie("token",token);
    return res.redirect("/");
}

module.exports={
    handleUserSignup,
    handleUserLogin
}