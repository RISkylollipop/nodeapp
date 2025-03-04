const db = require('../database')
const { sendappointmentconfirmation } = require('../services/emailServices');
const { doctor } = require('./viewdoctor');

exports.book = (req, res) => {
    // console.log(req.body);

    // firstname: ,
    // lastname: 
    // email:
    // phone: 
    // appointment_date: 
    // appointment_time: 

    const { firstname, lastname, email, phone, appointment_date, appointment_time, status, appointment_note, appointment_type } = req.body;
    // console.log(req.body);
    doctor_id = parseInt(req.body.doctorlist)
    // console.log(doctor_id);


    if (!email || !firstname) {
        return res.render(`bookappointment`, { error: `Please fill all Required Field` })
    }
    db.query(`select * from patients where email = ?`, [email], (err, result) => {
        if (err) { console.log(err); }
        else if (!result[0]) {
            res.redirect(`/bookappointment`)
        }
        else if (result[0]) {

            var patientid = result[0].patient_id
            //    console.log(patientid);

        }
        db.query(`insert into appointment set ?`, {
            firstname: firstname,
            appointment_date: appointment_date, email: email, appointment_type: appointment_type,
            appointment_time: appointment_time, patient_id: patientid, doctor_id: doctor_id,
            status: status, appointment_note: appointment_note
        }, async (err, result) => {
            if (err) console.log(err);
            else {

                db.query(`select * from doctors where doctor_id = ?`, [doctor_id], async (err, result) => {
                    if(err){console.log(err);
                    }
                    else if(result[0]){
                        const doctor = {
                            'doctor_email' : result[0].email,
                             'doctor_specialty': result[0].specialty,
                             'doctor_firstname': result[0].firstname,
                            'doctor_lastname': result[0].lastname,
                             'doctor_phone':result[0].phone,
                             'doctor_address' : result[0].address,
                            
                        }
                       
                     
                        // console.log(doctor);
                        // console.log({result: result[0]});
                        // console.log(doctor.doctor_email);
                        // console.log(doctor.doctor_specialty, doctor.doctor_phone, 
                        //     doctor.doctor_firstname, doctor.doctor_lastname);

                            const appointment_details = {
                                firstname, lastname, email, phone, 
                                appointment_date, appointment_time, status, 
                                appointment_note, appointment_type, doctor_id
                            }
                            await sendappointmentconfirmation(email, appointment_details, doctor)
                            res.render(`bookappointment`, { message: `Appointment Booked Successfully for Patient ${firstname}, ${lastname}` })

                    }
                })

                



                
              
            }
        })
    })

}

exports.viewappointment = (req, res) => {
    const viewappointments = `select appointment_id,  
appointment_date,
appointment.firstname, 
appointment.email, 
appointment.doctor_id,
doctors.email as doctoremail,
doctors.specialty,
appointment.status
from 
appointment join doctors
on appointment.doctor_id = doctors.doctor_id;`


    db.query(viewappointments, (err, rows) => {
        try {
            res.render(`appointments`, {

                rows: rows

            })
        } catch (err) {
            console.log(err);
        }
    })
}

exports.findappointment = (req, res) => {
    // console.log(req.body);
    let find = req.body.find




    const findappointments = `select 
 appointment_id,
 appointment_date, 
appointment.firstname, 
appointment.email, 
appointment.doctor_id,
 doctors.email as doctoremail,
doctors.specialty,
 appointment.status 
from 
appointment join doctors
on appointment.doctor_id = doctors.doctor_id 
where appointment.firstname like ? or appointment.email like ? or doctors.email like ? or doctors.specialty like ? or appointment.status like ?`

    db.query(findappointments, ['%' + find + '%', '%' + find + '%', '%' + find + '%', '%' + find + '%', '%' + find + '%'],
        (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.render(`appointments`, { rows })
            }
        })
}

exports.find = (req, res) => {
    const search = req.body.search
    db.query(`select * from doctors where firstname like ? OR lastname LIKE ? OR email Like ? OR specialty like ?`, ["%" + search + '%', '%' + search + '%', '%' + search + '%', '%' + search + `%`], (err, rows) => {
        if (!err) {
            res.render(`viewdoctors`, { rows })

        } else {
            console.log(err);

        }
    })

}

exports.updateappointment = (req, res) => {
    // console.log(req.body);
    db.query(`update appointment set status = 'Cancelled' where appointment_id = ?`, [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const viewappointments = `select appointment_id,  
appointment_date,
appointment.firstname, 
appointment.email, 
appointment.doctor_id,
doctors.email as doctoremail,
doctors.specialty,
appointment.status
from 
appointment join doctors
on appointment.doctor_id = doctors.doctor_id;`
            db.query(viewappointments, (err, rows) => {

                if (err) {
                    console.log(err);
                } else {
                    res.render(`appointments`, {

                        rows: rows,
                        message: `Appointment Cancelled Successfully`
                    })

                }
            })
        }
    })

}

// exports.editappointment = (req, res) => {
//     const viewappointments = `select appointment_id,  
//     appointment_date,
//     appointment.firstname, 
//     appointment.email, 
//     appointment.doctor_id,
//     doctors.email as doctoremail,
//     doctors.specialty,
//     appointment.status
//     from 
//     appointment join doctors
//     on appointment.doctor_id = doctors.doctor_id where appointment_id = ?;`
//     db.query(viewappointments, [req.params.id], (err, rows) => {
//         if (err) {
//             console.log(err);
//         } else {


//             res.render(`editappointment`, { rows })
//         }
//     })
// }

exports.postponeappointment = (req, res) => {
    console.log(req.body);
    // declaring of req body coming from the form


    const { appointment_date, appointment_time } = req.body

    // declaring todays date to avoid reschedule of appointment_date to past date
    const today = Date.now()
    // console.log(appointment_date);
    let dateconvert = new Date(appointment_date)
    const datecompare = dateconvert.getTime();


    // console.log(today);
    // console.log(datecompare);
    // comparing of the today's date and postponement date


    if (datecompare < today) {
        const viewappointments = `select appointment_id,  
        appointment_date,
        appointment.firstname, 
        appointment.email, 
        appointment.doctor_id,
        doctors.email as doctoremail,
        doctors.specialty,
        appointment.status
        from 
        appointment join doctors
        on appointment.doctor_id = doctors.doctor_id;`


        db.query(viewappointments, (err, rows) => {
            try {
                res.render(`appointments`, {
                    rows: rows,
                    error: 'Please Select future Date'

                })
            } catch (err) {
                console.log(err);
            }
        })

    } else {
        // res.send(form submitted)

        // Sending of two db request at a time

        const updateappointment = ` update appointment set appointment_date = ?, appointment_time = ? where appointment_id = ?;
        update appointment set status = 'rescheduled' where appointment_id = ?`

        db.query(updateappointment, [appointment_date, appointment_time, req.params.id, req.params.id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const viewappointments = ` select appointment_id,  
    appointment_date,
    appointment.firstname, 
    appointment.email, 
    appointment.doctor_id,
    doctors.email as doctoremail,
    doctors.specialty,
    appointment.status
    from 
    appointment join doctors
    on appointment.doctor_id = doctors.doctor_id;`
                db.query(viewappointments, (err, rows) => {

                    try {
                        res.render(`appointments`, {
                            rows: rows,
                            message: 'Appointment Postponed Successfully'
                        })
                    } catch (err) {
                        console.log(err);
                        res.redirect(`/viewappointment`)

                    }
                })
            }
        })
    }

}



exports.viewschedules = (req, res) => {

    const viewschedule = `select * from doctor_schedules;`
    db.query(viewschedule, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).render(`schedules`, { rows })
        }
    })
}

exports.createschedule = (req, res) => {
    // console.log(req.body);

    const { appointment_type, email, status, note, appointment_time, appointment_date } = req.body

    const today = Date.now()

    let dateconvert = new Date(appointment_date)
    let datecompare = dateconvert.getTime()

    if (datecompare < today) {
        const viewschedule = `select * from doctor_schedules;`
        db.query(viewschedule, (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).render(`schedules`, { rows: rows, error: `Please Select a Future Date` })
            }
        })
    } else {
        db.query(`select * from doctors where email = ?`, [email], (err, result) => {
            if (err) {
                console.log(err);
            } else if (!result[0]) {
                const viewschedule = `select * from doctor_schedules;`
                db.query(viewschedule, (err, rows) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).render(`schedules`, { rows: rows, error: `No Doctor with this Email Address` })
                    }
                })
            } else {
                const doctor_id = result[0].doctor_id
                // doctor_id, email, schedule_date, schedule_time, status, note, appointment_type from database
                const insertquery = `insert into doctor_schedules set ?`
                db.query(insertquery, { appointment_type: appointment_type, email: email, status: status, note: note, schedule_date: appointment_date, doctor_id: doctor_id }, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const viewschedule = `select * from doctor_schedules;`
                        db.query(viewschedule, (err, rows) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.status(200).render(`schedules`, { rows: rows, message: `Schedule Booked` })
                            }
                        })
                    }
                })
            }
        })
    }
}

exports.findschedule = (req, res) => {
    // console.log(req.body);
    const findschedule = req.body.findschedule

    db.query(`select * from doctor_schedules where email like ? or note like ? or appointment_type like ?`, 
        ['%' + findschedule + '%', '%' + findschedule + '%', '%' + findschedule + '%'], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).render(`schedules`, { rows })
        }
    })

}


























































// Design by Kelani Yunus Oluwadamilare
// email yunuskelani2@gmail.com//
// phone: +2348140470626