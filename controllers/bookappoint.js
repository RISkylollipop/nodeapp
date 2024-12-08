const { emit } = require("nodemon");
const db = require(`../database`);

exports.book = (req, res) => {
    // console.log(req.body);

    // firstname: ,
    // lastname: 
    // email:
    // phone: 
    // appointment_date: 
    // appointment_time: 

    const { firstname, lastname, email, phone, appointment_date, appointment_time, status } = req.body;
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
        db.query(`insert into appointment set ?`, { firstname: firstname, appointment_date: appointment_date, email: email, appointment_time: appointment_time, patient_id: patientid, doctor_id: doctor_id, status:status }, (err, result) => {
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
on appointment.doctor_id = doctors.doctor_id 
where appointment.firstname like ? or appointment.email like ? or doctors.email like ? or doctors.specialty like ? or appointment.status like ?`

    db.query(findappointments, ['%' + find + '%', '%' + find + '%', '%' + find + '%', '%' + find + '%', '%' + find + '%'], (err, rows) => {
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
                        message: `Appointment Cancelled Successfully`
                    })
                } catch (error) {
                    console.log(error);
                    res.redirect(`/viewappointment`)

                }
            })
        }
    })

}

exports.editappointment = (req, res) => {
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
    db.query(viewappointments, [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {


            res.render(`editappointment`, { rows })
        }
    })
}

exports.postponeappointment = (req, res) => {
    const { appointment_date, appointment_time } = req.body;

    // Get today's date and time for comparison
    const today = new Date(); // Get current date and time
    const dateconvert = new Date(appointment_date);
    
    // Compare dates (ignore time part, but ensure appointment date is not in the past)
    if (dateconvert.getTime() < today.getTime()) {
        const viewappointments = `
            SELECT appointment_id, appointment_date, appointment.firstname, 
                   appointment.email, appointment.doctor_id, 
                   doctors.email AS doctoremail, doctors.specialty, appointment.status
            FROM appointment
            JOIN doctors ON appointment.doctor_id = doctors.doctor_id;
        `;
        
        // Return an error message if the appointment date is in the past
        db.query(viewappointments, (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Internal server error");
            }

            res.render('appointments', {
                rows: rows,
                error: 'Please select a future date'
            });
        });

    } else {
        // Both updates should be done as part of a transaction
        const updateappointment = `
            UPDATE appointment 
            SET appointment_date = ?, appointment_time = ? 
            WHERE appointment_id = ?;
            UPDATE appointment 
            SET status = 'rescheduled' 
            WHERE appointment_id = ?;
        `;

        db.beginTransaction((err) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Transaction start failed");
            }

            // Execute the update queries within the transaction
            db.query(updateappointment, [appointment_date, appointment_time, req.params.id, req.params.id], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.log(err);
                        res.status(500).send("Error during appointment update");
                    });
                }

                // Query to get the updated list of appointments
                const viewappointments = `
                    SELECT appointment_id, appointment_date, appointment.firstname, 
                           appointment.email, appointment.doctor_id, 
                           doctors.email AS doctoremail, doctors.specialty, appointment.status
                    FROM appointment
                    JOIN doctors ON appointment.doctor_id = doctors.doctor_id;
                `;
                
                // If the transaction was successful, commit it and render appointments
                db.query(viewappointments, (err, rows) => {
                    if (err) {
                        return db.rollback(() => {
                            console.log(err);
                            res.status(500).send("Error fetching appointments");
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.log(err);
                                res.status(500).send("Transaction commit failed");
                            });
                        }

                        res.render('appointments', {
                            rows: rows,
                            message: 'Appointment postponed successfully'
                        });
                    });
                });
            });
        });
    }
};



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

    db.query(`select * from doctor_schedules where email like ? or note like ? or appointment_type like ?`, ['%' + findschedule + '%', '%' + findschedule + '%','%' + findschedule + '%'], (err, rows) => {
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