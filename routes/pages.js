const express = require(`express`)
const db = require('../database')
const router = express.Router();
const cookieParser = require(`cookie-parser`)
const {isAuthenticated} = require(`../middlewares/auth`);
const { isAuthenticateddoctororadmin } = require("../middlewares/authdoctor");


router.get(``, (req, res)=>{
    res.render(`home`)
})
router.get(`/`, (req, res)=>{
    res.render(`home`)
})

router.get(`/home`, (req, res)=>{
    res.render(`home`)
})

// PATIENTS
router.get(`/patient`, (req, res)=>{
    res.render(`patient`)
})
router.get(`/signup`, (req, res)=>{
    res.render(`register`)
})

router.get(`/signin`, (req, res)=>{
    res.render(`login`)
})

router.get(`/dashboard/edit-profile`, isAuthenticated, (req, res)=>{
    res.render(`viewprofile`)
})

// DOCTORS

router.get(`/doctor`, (req, res)=>{
    res.render(`doctorpage`)
})

router.get(`/registerdoctor`, (req, res)=>{
    res.render(`registerdoctor`)
})

router.get(`/doctor/login`, (req, res)=>{
    res.render(`logindoctor`)
})



// router.get(`/doctor/dashboard`, isAuthenticateddoctororadmin, (req, res)=>{
//     res.render(`doctordashboard`, {doctor: req.doctors})
// })

router.get(`/doctor/dashboard`, isAuthenticateddoctororadmin, (req, res)=>{
    res.render(`docdashboard`, {doctor: req.doctors})
})

// ADMINS

router.get(`/admin`, (req, res)=>{
    res.status(200).render(`adminpage`)
})

// router.get(`/admin/register`, (req, res)=>{
//     res.render(`adduser`)
// })

router.get(`/home/home`, (req, res)=>{
    res.render(`home`)
})
router.get(`/admin/login`, (req,res)=>{
    res.render(`userlogin`)
})

router.get(`/admin/dashboard`, isAuthenticateddoctororadmin, (req, res)=>{
    res.render(`admin`, {admin: req.admins})
})







// router.get(`/dashboard`, isAuthenticated, (req, res)=>{
//     // console.log(req.patients);
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
//     res.set('Pragma', 'no-cache')
//     res.set('expires', '0')
//     res.sendFile(path.join(__dirname, 'public', 'dashboard.html'),{ patient: req.patients })
// })



// Contact

router.get('/contact', (req, res)=>{
    res.status(200).render(`contact`)
})

router.get('/terms', (req, res)=>{
    res.status(200).render(`terms`)
})
// router.get(`/doc/dashboard`, (req, res)=>{
//     res.render(`docdashboard`)
// })
router.get(`/services`, (req, res)=>{
    res.status(200).render(`ourservice`)
})


router.get(`/admin/character`, isAuthenticateddoctororadmin, (req, res)=>{
    db.query(`select * from characters where status = 'active'`, (err, rows)=>{
        if(err){console.log(err);
        }else{
            res.render(`character`, { rows })
        }
    })
   
})
router.get(`/logout`, (req, res)=>{
    res.clearCookie(`Register`)
    res.redirect(`/signin`)
})
router.get(`/doctorlogout`, (req, res)=>{
    res.clearCookie(`doctorRegister`)
    res.redirect(`/doctor/login`)
})

router.get(`/adminlogout`, (req, res)=>{
    res.clearCookie(`adminRegister`)
    res.redirect(`/admin/login`)
})

router.get(`/doctoradminlogout`, (req, res)=>{
    res.clearCookie(`doctorRegister`)
    res.clearCookie(`adminRegister`)
    
    res.redirect(`/`)
})



// ROUTES BEEN ON P

router.get(`/viewpatient`,  isAuthenticateddoctororadmin)
router.post(`/viewpatient`,  isAuthenticateddoctororadmin)
router.get(`/editpatient/:id`, isAuthenticateddoctororadmin)
router.post(`/editpatient/:id`,  isAuthenticated)
router.get(`/delete/:id`, isAuthenticateddoctororadmin)
router.get(`/admin/viewappointment`,  isAuthenticateddoctororadmin)
router.get(`/doctor/viewappointment`,  isAuthenticateddoctororadmin)
router.post('/viewappointment',  isAuthenticateddoctororadmin)
router.get(`/editappointment/:id`,isAuthenticateddoctororadmin)
router.get(`/doctor/cancel/:id`, isAuthenticateddoctororadmin)
router.get(`/doctor/editappointment/:id`, isAuthenticateddoctororadmin)
router.post(`/doctor/editappointment/:id`, isAuthenticateddoctororadmin)

router.get(`/dashboard/edit-profile/:id`, isAuthenticated)
router.post(`/dashboard/edit-profile/:id`, isAuthenticated)

router.get(`/doctor/schedules`, isAuthenticateddoctororadmin)
router.get(`/admin/schedules`, isAuthenticateddoctororadmin)
router.get(`/admin/character`, isAuthenticateddoctororadmin)
router.post(`/admin/character`, isAuthenticateddoctororadmin)

router.post(`/doctor/schedules`, isAuthenticateddoctororadmin )
router.post(`/schedules/find`,isAuthenticateddoctororadmin)






module.exports = router





