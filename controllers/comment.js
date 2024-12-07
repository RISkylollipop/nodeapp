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
    console.log(req.body);

    // fullname: email phone: message
const {fullname, email, message, phone} = req.body

    db.query(`insert into messages set ?`, {fullname:fullname, email:email, phone:phone, message:message}, (err, result)=>{
        if(err){console.log(err);
        }else{
            res.status(200).render(`contact`, {message: `Your Message Has Been Received And We will get back to You Soon`})
        }
    })    


    
}