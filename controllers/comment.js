const db = require(`../database`)



exports.comment = (req, res)=>{
 // console.log(req.body); email comment

const {comment, email}= req.body
db.query(`insert into comments set ?`, {email:email, comment:comment}, (err, result)=>{
    if(err){console.log(err);
    }else{
        res.status(200).redirect(`/`)
    }
})    
}


exports.commentpatient = (req, res)=>{
 // console.log(req.body); email comment

const {comment, email}= req.body
db.query(`insert into comments set ?`, {email:email, comment:comment}, (err, result)=>{
    if(err){console.log(err);
    }else{
        res.status(200).redirect(`/patient`)
    }
})    
}


exports.commentdoctor = (req, res)=>{
    // console.log(req.body); email comment

const {comment, email}= req.body
db.query(`insert into comments set ?`, {email:email, comment:comment}, (err, result)=>{
    if(err){console.log(err);
    }else{
        res.status(200).redirect(`/doctor`)
    }
})    
}

exports.commentadmin = (req, res)=>{
    // console.log(req.body); email comment

const {comment, email}= req.body
db.query(`insert into comments set ?`, {email:email, comment:comment}, (err, result)=>{
    if(err){console.log(err);
    }else{
        res.status(200).redirect(`/admin`)
    }
})    
}

exports.message = (req, res)=>{
    // console.log(req.body);

    // fullname: email phone: message
const {fullname, email, message, phone} = req.body

    db.query(`insert into messages set ?`, {fullname:fullname, email:email, phone:phone, message:message}, (err, result)=>{
        if(err){console.log(err);
        }else{
            res.status(200).render(`contact`, {message: `Your Message Has Been Received And We will get back to You Soon`})
        }
    })    


    
}


exports.Homeappointment = (req, res)=>{
    // console.log(req.body);

    // fullname: email: phone: emergency: date: time: 
    
    const {fullname, email, phone, emergency, date, time , emergency_message } = req.body

    let convertdate = new Date(date)
    const today = Date.now()
    let comparedate = convertdate.getTime()
    // console.log(comparedate);
    // console.log(today);
    

    if(comparedate < today){
        return res.render(`home`, {error: `Please input a correct Future Date`})
    }else{
        db.query(`insert into homeappointment set ?`, {fullname:fullname, email:email, phone:phone, emergency_type:emergency, date:date, time:time, emergency_message:emergency_message}, (err, result)=>{
            if(err){console.log(err);
            }else{
                res.render(`home`, {message: `Emergency Appointment Booked Successfully`})
                
            }
        })
    }
    
    
}



