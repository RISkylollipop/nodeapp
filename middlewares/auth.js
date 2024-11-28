const jwt = require(`jsonwebtoken`)
const cookieParser = require(`cookie-parser`)


exports.isAuthenticated = (req, res, next)=>{
const token = req.cookies.userRegister;
if(!token){
    return res.render(`login`, 
        {error: `Please Login Before you can access the page`})
}
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.patients = decoded;
    // console.log(decoded);
    
    next();
} catch (error) {
    console.log(error);
    return res.redirect(`/signin`)
}

}