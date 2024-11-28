const mysql = require(`mysql2`);
require(`dotenv`).config();


const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
    multipleStatements: true
})

db.getConnection((err, result)=>{
    if(!err){
        console.log(`Database Started`);
        
    }else(
        console.log(err)
        
    )
})
// const doctor = (`create table doctor (
//     firstname varchar(50),
//     lastname varchar(50),
//     email varchar(150),
//     gender varchar(20),
//     phone varchar(50),
//     address varchar(50),
//     date_of_birth date,
//     password varchar(200)
//     );`)

// db.query(doctor,(err, result)=>{
//     if (err){
//         console.log(err, `Unable to create Table`);
        
//     }else{
//         console.log(`table Created Successfully ${result}`);
        
//     }

// })







// db.query(`select * from doctors`, (err, row)=>{
//     if(err)console.log(err);
//     else{
//         console.log({row});
//     }
// } )
module.exports = db