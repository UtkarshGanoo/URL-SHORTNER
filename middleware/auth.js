const {getUser}=require("../service/auth");

//this function is for the authentication 
function checkforAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;
    req.user=null;

    if(!tokenCookie) return next(); 

    const token=tokenCookie; 
    const user=getUser(token);
    req.user=user;
    return next();
}

// this function is use for authentication where we specify for the role to restrict 
function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    };
}


/* this two function doing same task authentication this is not valid when we use authorization above the functions can both are plays differnt role 
like authorization and authentication 
async function restrictToLoggedinUserOnly(req,res,next){
    const userUid=req.cookies?.uid;

    if(!userUid)return res.redirect("/login");
    const user=getUser(userUid);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}
async function checkAuth(req,res,next){
    const userUid=req.cookies?.uid;
    const user=getUser(userUid);
    req.user = user;
    next();
}
*/




module.exports={
   // restrictToLoggedinUserOnly,checkAuth,
    checkforAuthentication, restrictTo,

}