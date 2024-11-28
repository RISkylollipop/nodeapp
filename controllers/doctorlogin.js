const db = require(`../database`)
const jwt = require(`jsonwebtoken`)
const bcrypt = require(`bcryptjs`)


exports.doctorlogin = (req, res) => {

    const { email, password } = req.body;

    // console.log(req.body);

    if (!email || !password) {
        return res.render(`logindoctor`, {
            error: `Please input email or password`
        })
    } else {
        db.query(`select * from doctors where email = ?`, [email], async (err, result) => {
            if (err) {
                console.log(err);

            } else if (!result[0] || !await bcrypt.compare(password, result[0].password)) {
                return res.render(`logindoctor`, {
                    error: `Invalid Email or password`
                })
            }
            const token = jwt.sign({role: 'doctor', doctor_id: result[0].doctor_id, firstname: result[0].firstname, email: result[0].email },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES
                })
            const cookieoptions = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',

            }
            res.cookie(`userRegister`, token, cookieoptions)
            res.redirect(`/doctor/dashboard`)
        })
    }

}


















































































































// Design by Kelani Yunus Oluwadamilare
// email yunuskelani2@gmail.com//
// phone: +2348140470626 