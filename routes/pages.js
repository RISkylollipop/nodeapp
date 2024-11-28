const express = require(`express`)
const router = express.Router();
const cookieParser = require(`cookie-parser`)
const {isAuthenticated} = require(`../middlewares/auth`);
const { isAuthenticateddoctororadmin } = require("../middlewares/authdoctor");


router.get(``, (req, res)=>{
    res.render(`index`)
})
router.get(`/`, (req, res)=>{
    res.render(`index`)
})

router.get(`/home`, (req, res)=>{
    res.render(`index`)
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

router.get(`/doctor/dashboard`, isAuthenticateddoctororadmin, (req, res)=>{
    res.render(`doctordashboard`, {doctor: req.doctors})
})


// ADMINS

router.get(`/registeradmin`, (req, res)=>{
    res.render(`adduser`)
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








router.get(`/logout`, (req, res)=>{
    res.clearCookie(`userRegister`)
    res.redirect(`/signin`)
})
router.get(`/doctorlogout`, (req, res)=>{
    res.clearCookie(`userRegister`)
    res.redirect(`/doctor/login`)
})

router.get(`/adminlogout`, (req, res)=>{
    res.clearCookie(`userRegister`)
    res.redirect(`/admin/login`)
})




// ROUTES BEEN ON P

router.get(`/viewpatient`,  isAuthenticateddoctororadmin)
router.post(`/viewpatient`,  isAuthenticateddoctororadmin)
router.get(`/editpatient/:id`, isAuthenticateddoctororadmin)
router.post(`/editpatient/:id`,  isAuthenticated)
router.get(`/delete/:id`, isAuthenticateddoctororadmin)
router.get(`/viewappointment`,  isAuthenticateddoctororadmin)
router.post('/viewappointment',  isAuthenticateddoctororadmin)
router.get(`/editappointment/:id`,isAuthenticateddoctororadmin)
router.get(`/doctor/cancel/:id`, isAuthenticateddoctororadmin)
router.get(`/doctor/editappointment/:id`, isAuthenticateddoctororadmin)
router.post(`/doctor/editappointment/:id`, isAuthenticateddoctororadmin)

router.get(`/dashboard/edit-profile/:id`, isAuthenticated)
router.post(`/dashboard/edit-profile/:id`, isAuthenticated)







module.exports = router





