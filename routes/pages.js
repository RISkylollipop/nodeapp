const express = require(`express`)
const router = express.Router();
const { sendConfirmationEmail } = require('../services/emailServices')
const db = require('../database')
const jwt = require('jsonwebtoken')
const cookieParser = require(`cookie-parser`)
const { isAuthenticated } = require(`../middlewares/auth`);
const { isAuthenticateddoctororadmin}  = require("../middlewares/authdoctor");


router.use(cookieParser())


router.get(``, (req, res) => {
    res.render(`home`)
})
router.get(`/`, (req, res) => {
    res.render(`home`)
})

router.get(`/home`, (req, res) => {
    res.render(`home`)
})
router.get(`/confirm-email/:tokens`, (req, res) => {

    const { tokens } = req.params;

    try {
        const decoder = jwt.verify(tokens, process.env.JWT_SECRET);

        db.query(`update patients set verification = 'isVerified' where email = ?`, [decoder.email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error confirming email.');
            }

            if (result.affectedRows > 0) {
                res.send('Email confirmed successfully.' + `<a href="/signin">Login</a>`);
            } else {
                res.send('Email confirmation failed.' + `<a href="/signin">Login</a>`);
            }
        })
    } catch (error) {
        console.log('Error confirming email:', error);

        console.error('Error confirming email:', error);
        res.status(400).send('Invalid or expired token.');
    }
})

// PATIENTS
router.get(`/patient`, (req, res) => {
    res.render(`patient`)
})
router.get(`/signup`, (req, res) => {
    res.render(`register`)
})

router.get(`/signin`, (req, res) => {
    res.render(`login`)
})

router.get(`/dashboard/edit-profile`, isAuthenticated, (req, res) => {
    res.render(`viewprofile`)
})

// DOCTORS

router.get(`/doctor`, (req, res) => {
    res.render(`doctorpage`)
})

router.get(`/registerdoctor`, (req, res) => {
    res.render(`registerdoctor`)
})

router.get(`/doctor/login`, (req, res) => {
    res.render(`logindoctor`)
})



// router.get(`/doctor/dashboard`, isAuthenticateddoctororadmin, (req, res)=>{
//     res.render(`doctordashboard`, {doctor: req.doctors})
// })

router.get(`/doctor/dashboard`, isAuthenticateddoctororadmin, (req, res) => {
    const viewtabledash = `select  concat(firstname, '   ', email ) as nameemail,
     appointment_type from appointment order by appointment_id desc limit 3;`

    //  Query to log most recent appointment for the doctor

    db.query(viewtabledash, (err, dashrows) => {
        if (err) {
            console.log(err);
        } else {
            const countappointment = `select count(patient_id) as appointment_count from appointment;`

            db.query(countappointment, (err, appointmentcounts) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render(`docdashboard`,
                        {
                            doctor: req.doctors,
                            dashrows: dashrows,
                            appointmentcounts: appointmentcounts


                        })
                }
            })

        }
    })

})


router.get(`/editappointment/:id`, (req, res)=>{
    db.query(`select appointment_id,  appointment_date,   appointment.firstname,    appointment.email,  
        appointment.doctor_id,    doctors.email as doctoremail,  doctors.specialty,  appointment.status   from 
         appointment  appointment join doctors
    on appointment.doctor_id = doctors.doctor_id where appointment_id = ? `, [req.params.id], (err, rows)=>{
    if(!err){

        const doctor = req.doctors
        
    res.status(200).render(`editappointment`, {
        
        doctor: doctor,
        rows:rows,



    })

    }else{
        console.log();
        
    }
})
})

// ADMINS

router.get(`/admin`, (req, res) => {
    res.status(200).render(`adminpage`)
})

// router.get(`/admin/register`, (req, res)=>{
//     res.render(`adduser`)
// })

router.get(`/home/home`, (req, res) => {
    res.render(`home`)
})
router.get(`/admin/login`, (req, res) => {
    res.render(`userlogin`)
})

router.get(`/admin/dashboard`, isAuthenticateddoctororadmin, (req, res) => {
    res.render(`admin`, { admin: req.admins })
})







// router.get(`/dashboard`, isAuthenticated, (req, res)=>{
//     // console.log(req.patients);
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
//     res.set('Pragma', 'no-cache')
//     res.set('expires', '0')
//     res.sendFile(path.join(__dirname, 'public', 'dashboard.html'),{ patient: req.patients })
// })



// Contact

router.get('/contact', (req, res) => {
    res.status(200).render(`contact`)
})

router.get('/terms', (req, res) => {
    res.status(200).render(`terms`)
})
// router.get(`/doc/dashboard`, (req, res)=>{
//     res.render(`docdashboard`)
// })
router.get(`/services`, (req, res) => {
    res.status(200).render(`ourservice`)
})


router.get(`/admin/character`, isAuthenticateddoctororadmin, (req, res) => {
    db.query(`select * from characters where status = 'active'`, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render(`character`, { rows })
        }
    })

})
router.get(`/logout`, (req, res) => {
    res.clearCookie(`patientRegister`)
    res.redirect(`/signin`)
})
router.get(`/doctorlogout`, (req, res) => {
    res.clearCookie(`doctorRegister`)
    res.redirect(`/doctor/login`)
})

router.get(`/adminlogout`, (req, res) => {
    res.clearCookie(`adminRegister`)
    res.redirect(`/admin/login`)
})

router.get(`/doctoradminlogout`, (req, res) => {
    res.clearCookie(`doctorRegister`)
    res.clearCookie(`adminRegister`)

    res.redirect(`/`)
})



// ROUTES BEEN ON P

router.get(`/viewpatient`, isAuthenticateddoctororadmin)
router.post(`/viewpatient`, isAuthenticateddoctororadmin)
router.get(`/editpatient/:id`, isAuthenticateddoctororadmin)
router.post(`/editpatient/:id`, isAuthenticated)
router.get(`/delete/:id`, isAuthenticateddoctororadmin)
router.get(`/admin/viewappointment`, isAuthenticateddoctororadmin)
router.get(`/doctor/viewappointment`, isAuthenticateddoctororadmin)
router.post('/viewappointment', isAuthenticateddoctororadmin)
// router.get(`/editappointment/:id`, isAuthenticateddoctororadmin)
router.get(`/doctor/cancel/:id`, isAuthenticateddoctororadmin)
router.get(`/doctor/editappointment/:id`, isAuthenticateddoctororadmin)
router.post(`/doctor/editappointment/:id`, isAuthenticateddoctororadmin)

router.get(`/dashboard/edit-profile/:id`, isAuthenticated)
router.post(`/dashboard/edit-profile/:id`, isAuthenticated)

router.get(`/doctor/schedules`, isAuthenticateddoctororadmin)
router.get(`/admin/schedules`, isAuthenticateddoctororadmin)
router.get(`/admin/character`, isAuthenticateddoctororadmin)
router.post(`/admin/character`, isAuthenticateddoctororadmin)

router.post(`/doctor/schedules`, isAuthenticateddoctororadmin)
router.post(`/schedules/find`, isAuthenticateddoctororadmin)






module.exports = router





