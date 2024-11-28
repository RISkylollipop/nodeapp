`use strict;`
const db = require(`../database`)
const bcrypt = require(`bcryptjs`)


exports.register = (req, res)=>{
    const {patient_id, firstname, lastname, phone, email, address, gender, date_of_birth, password, passwordconfirm, status} = req.body;
// console.log(req.body);
  
    db.query(`select email from patients where email = ?`, [email], async (err, result)=>{
        if(err){
            console.log(err);
            
        }else if(result.length > 0){
            return res.render(`register`, {
                error: `Email Already Exist`
            })
        }else if(password !== passwordconfirm){
            return res.render(`register`, {
                error: `Password Do Not Match`
            })
        }
        else if(!password || password.length < 8 ){
            return res.render(`register`, {
                error: `Password weak or are empty`
            })
        }else if(!email){
            return res.render(`register`, {
                error: `Email field is empty`
            })
        }else if(!date_of_birth){
            return res.render(`register`, {
                error: `Date_of_Birth field is empty`
            })
        }
        const hashedpassword = await bcrypt.hash(password, 8)
        db.query(`insert into patients set ?`, {firstname:firstname, lastname:lastname, email:email, phone:phone, address:address,gender:gender,date_of_birth:date_of_birth, password:hashedpassword, status:status},(err, result)=>{
            if(err){
                console.log(err);
                
            }else{
                res.render(`register`, {
                    message: `Registration Completed ✅`
                })
            }
        })
    })
    // res.send(`from submitted`)
}


exports.doctorregister = (req, res)=>{
    // Details coming from Request body

    // {{!-- firstname, lastname, specialty, date_of_birth, email, phone, gender, password, date_joined, address, status --}}
    // console.log(req.body);

    const {firstname, lastname, email, phone, date_of_birth, address, password, gender, passwordconfirm, date_joined, status, specialty,} = req.body;

    if (!email || !phone || !firstname){
        return res.render(`registerdoctor`, {
            error: `Email, Phone Number Field must not be Empty`
        })
    }
    else{
        db.query(`select email from doctors where email = ?`, [email], async(err, result)=>{
            if (err){
                console.log(err);
                
            }else if(result[0]){
                return res.status(404).render(`registerdoctor`, {
                    error: `Email Already Exist`
                })
            }else if(password !== passwordconfirm){
                return res.status(404).render(`registerdoctor`, {
                    error: `Password do not match`
                })
            }                                                     
            const hashedpass = await bcrypt.hash(password, 8);
            db.query(`insert into doctors set ?`, {firstname:firstname, lastname:lastname, email:email, address:address, date_of_birth:date_of_birth,gender:gender, phone:phone, password:hashedpass,date_joined:date_joined, status:status, specialty:specialty}, 
                (err, result)=>{
                if(err){
                    console.log(err);
                    
                }else{
                    res.render(`registerdoctor`, {message: `Dear ${lastname}, 
                        Details Registered Successfully, 
                        Meet Your Head of Admin for Your Appointments`})
                }
            })
        })
    }


    // res.send(`form submitted`)
    
}


exports.adduser = (req, res)=>{
    // console.log(req.body);

    // firstname:  lastname:  email:  gender: status: passwordpasswordconfirm

    const {firstname, lastname, email, gender, status, password, passwordconfirm} = req.body

    if(!email || !password){
      return  res.render(`adduser`,{error: `Some Fields Are Missing`})
    }else if(password !== passwordconfirm){
        return res.render(`adduser`, {error: `Password Do Not Match`})
    }else{
        db.query(`select email from admins where email = ?`, [email], async (err, result)=>{
            if(err){console.log(err);
            }else if(result.length > 0){
                return res.render(`adduser`, {error: `Email Already Exist`})
            }else{
                const hashnewpass = await bcrypt.hash(password, 12);
                db.query(`insert into admins set ?`, {firstname:firstname, lastname:lastname, email:email, gender:gender, status:status, password:hashnewpass}, (err, result)=>{
                    if(err){console.log(err);
                    }else{
                        res.render(`adduser`, {message: `User ${firstname}, ${lastname} Registered Successfully`})
                    }
                })
            }
        })
    }
    
}
























// Design by Kelani Yunus Oluwadamilare
// email yunuskelani2@gmail.com//
//  phone: +2348140470626