const db = require(`../database`);

exports.book = (req, res) => {
    // console.log(req.body);

    // firstname: ,
    // lastname: 
    // email:
    // phone: 
    // appointment_date: 
    // appointment_time: 

    const { firstname, lastname, email, phone, appointment_date, appointment_time } = req.body;
    // console.log(req.body);
    doctor_id = parseInt(req.body.doctorlist)
    // console.log(doctor_id);


    if (!email || !firstname) {
        return res.render(`bookappointment`, { error: `Please fill all Required Field` })
    }
    db.query(`select * from patients where email = ?`, [email], (err, result) => {
        if (err) { console.log(err); }
        else if (!result[0]) {
            alert(`Please Use Your Register Email Address and Surname`)
            res.redirect(`/bookappointment`)
        }
        else if (result[0]) {

            var patientid = result[0].patient_id
            //    console.log(patientid);

        }
        db.query(`insert into appointment set ?`, { firstname: firstname, appointment_date: appointment_date, email: email, appointment_time: appointment_time, patient_id: patientid, doctor_id: doctor_id }, (err, result) => {
            if (err) console.log(err);
            else {
                res.render(`bookappointment`, { message: `Appointment Booked Successfully for Patient ${firstname}` })
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
    const find = req.body.find
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
on appointment.doctor_id = doctors.doctor_id where appointment.firstname like ? or appointment.email`

    db.query(findappointments, ['%' + find + '%', '%' + find + '%'], (err, rows) => {
        try {
            res.render(`appointments`, { rows })
        } catch (error) {
            console.log(error);
            res.redirect(`/viewappointment`)

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

                try {
                    res.render(`appointments`, { 
                        
                        rows: rows,
                    message: `Appointment Cancelled Successfully`})
                } catch (error) {
                    console.log(error);
                    res.redirect(`/viewappointment`)

                }
            })
        }
    })

}

exports.editappointment = (req, res)=>{
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
    on appointment.doctor_id = doctors.doctor_id where appointment_id = ?;`
    db.query(viewappointments,[req.params.id], (err, rows)=>{
        if(err){console.log(err);
        }else{
            
            
            res.render(`editappointment`, { rows })
        }
    })
}

exports.postponeappointment = (req, res) => {
    // console.log(req.body);
    // declaring of req body coming from the form


    const {appointment_date, appointment_time} = req.body

    // declaring todays date to avoid reschedule of appointment_date to past date
    const today = Date.now()
    // console.log(appointment_date);
    let dateconvert = new Date(appointment_date)
    const datecompare = dateconvert.getTime();


    // console.log(today);
    // console.log(datecompare);
    // comparing of the today's date and postponement date


    if(datecompare < today){
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
       
    }else{
        // res.send(`form submitted`)

        // Sending of two db request at a time

        const updateappointment = `update appointment set appointment_date = ?, appointment_time = ? where appointment_id = ?;
        update appointment set status = 'rescheduled' where appointment_id = ?`

        db.query(updateappointment, [appointment_date, appointment_time, req.params.id, req.params.id], (err, result) => {
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
    
                    try {
                        res.render(`appointments`, { 
                        rows: rows,
                        message: 'Appointment Postponed Successfully'})
                    } catch (error) {
                        console.log(error);
                        res.redirect(`/viewappointment`)
    
                    }
                })
            }
        })
    } 

}






























































// Design by Kelani Yunus Oluwadamilare
// email yunuskelani2@gmail.com//
// phone: +2348140470626