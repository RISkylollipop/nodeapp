const jwt = require(`jsonwebtoken`)
const cookieParser = require(`cookie-parser`)



exports.isAuthenticateddoctororadmin = (req, res, next) => {
    const token = req.cookies.userRegister
    if (!token) {
        if (req.url.includes(`/doctor`)) {
            return res.render(`logindoctor`, { error: `Session Expires, Please Re-Login` })


        } else if (req.url.includes(`/admin`)) {
            return res.render(`userlogin`, { error: `Session Expires, Please Re-Login` })
        }
else{
    return res.redirect(`/`)
}
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);

        if (decoded.role === 'doctor') {
            req.doctors = decoded
            next()
        } else if (decoded.role === 'admin') {
            req.admins = decoded
            next()
        }

    } catch (error) {
        console.log(error);
        if (req.url.includes(`/doctor`)) {
            return res.redirect(`/doctor/login`)
        } else if (req.url.includes(`/admin`)) {
            return res.redirect(`/admin/login`)
        }else{
            return res.redirect(`/`)
        }
    }
}




































// Design by Kelani Yunus Oluwadamilare
// email yunuskelani2@gmail.com//
// phone: +2348140470626