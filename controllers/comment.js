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