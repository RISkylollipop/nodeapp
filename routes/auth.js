const express = require(`express`)
// const router = express.Router()
const { sendappointmentconfirmation } = require('../services/emailServices')
const register = require(`../controllers/register`)
const login = require(`../controllers/login`)
const doctorlogin = require(`../controllers/doctorlogin`)
const bookappointment = require(`../controllers/bookappoint`)
const viewdoctor = require(`../controllers/viewdoctor`)
const router = require("./pages");
const deleted = require(`../controllers/delete`)
const comment = require(`../controllers/comment`)
const { isAuthenticated } = require(`../middlewares/auth`)
const { isAuthenticateddoctororadminoradmin } = require(`../middlewares/authdoctor`)


router.post(`/signup`, register.register)
router.post(`/signin`, login.login)


router.post(`/bookappointment`, isAuthenticated, bookappointment.book)

router.get(`/admin/viewdoctor`, isAuthenticated, viewdoctor.doctor)
router.get(`/patient/viewdoctor`, isAuthenticated, viewdoctor.doctor)
router.post(`/patient/viewdoctor`, isAuthenticated, viewdoctor.find)
// // // // // // //
router.get(`/admin/viewpatient`,  viewdoctor.viewpatient)
router.get(`/doctor/viewpatient`,  viewdoctor.viewpatient)

router.post(`/admin/viewpatient`,  viewdoctor.findpatient)

router.get(`/editpatient/:id`, viewdoctor.editpatient)

router.post(`/editpatient/:id`,  viewdoctor.update)

router.get(`/delete/:id`,  deleted.deleted)

router.get(`/doctor/viewappointment`,  bookappointment.viewappointment)
router.get(`/admin/viewappointment`,  bookappointment.viewappointment)


router.post('/viewappointment/find',  bookappointment.findappointment)

router.get(`/cancel/:id`, bookappointment.updateappointment)

// router.get(`/editappointment/:id`, bookappointment.editappointment)

router.post(`/editappointment/:id`, bookappointment.postponeappointment)

router.get(`/dashboard/edit-profile/:id`, isAuthenticated, login.viewprofile)
router.post(`/dashboard/edit-profile/:id`, isAuthenticated, login.updateprofile)

router.get(`/doctor/dashboard/edit-profile/:id`,  login.doctorviewprofile)
router.post(`/doctor/dashboard/edit-profile/:id`, login.doctorupdateprofile)

router.get(`/doctor/schedules` , bookappointment.viewschedules)
router.get(`/admin/schedules` , bookappointment.viewschedules)
router.post(`/doctor/schedules`, bookappointment.createschedule)
router.post(`/schedules/find`, bookappointment.findschedule)


router.post(`/doctorregister`, register.doctorregister)
router.post(`/admin/character`, register.character)
router.post(`/login`, doctorlogin.doctorlogin)
router.post(`/adduser`, register.adduser)
router.post(`/userlogin`, login.userlogin)

router.post(`/quickmessage`, comment.comment)
router.post(`/patient/quickmessage`, comment.commentpatient)
router.post(`/doctor/quickmessage`, comment.commentdoctor)
router.post(`/admin/quickmessage`, comment.commentadmin)
router.post(`/appointment`, comment.Homeappointment)

router.post(`/message`, comment.message)

module.exports = router















