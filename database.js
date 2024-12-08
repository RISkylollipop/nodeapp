// const { Pool } = require('pg'); // Correct import for PostgreSQL
// require('dotenv').config();

// // Create a connection pool
// const db = new Pool({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASS,
//     database: process.env.DATABASE,
//     port: process.env.PORT || 5432,
//     ssl: {
//         rejectUnauthorized: false, // For connecting to Render's PostgreSQL service
//     },
// });

// // Test the connection
// db.connect((err, client, release) => {
//     if (err) {
//         console.error("Error connecting to the database:", err.message);
//     } else {
//         console.log("Database connected successfully.");
//         release(); // Release the connection back to the pool
//     }
// });

// module.exports = db;


const fs = require('fs');
const mysql = require(`mysql2`)
require(`dotenv`).config();

const db = mysql.createPool ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
    port: process.env.PORT || 23168,
    multipleStatements: true,
    ssl: {
        ca: fs.readFileSync('./ca.pem')
    },

    
})

db.getConnection((err, result)=>{

    if(!err){
        console.log(`Database Started`);
        
    }else(
        console.log(err)
        
    )
})

const patienttable = `create table patients(
patient_id int primary key auto_increment,
firstname varchar (50),
lastname varchar(50),
phone varchar(50),
email varchar (150),
date_of_birth date,
gender varchar(30),
password varchar (250),
address varchar(200),
status varchar(30)
);`
db.query(patienttable,(err, result)=>{
    if(!err){
        console.log(`Patient Table Created`);
        
    }else{
        console.log(err);
        
    }
})

const doctortable = `create table doctors(
doctor_id int primary key auto_increment,
firstname varchar (50),
lastname varchar(50),
specialty varchar (150),
date_of_birth date,
email varchar (150),
phone varchar(50),
gender varchar(30),
password varchar (250),
date_joined date,
address varchar(200),
status varchar(30)
);`

db.query(doctortable,(err, result)=>{
    if(!err){
        console.log(`Doctor Table Created`);
        
    }else{
        console.log(err);
        
    }
})


const appointment = `create table appointment(
appointment_id int primary key auto_increment,
firstname varchar (50),
email varchar (200),
appointment_date date,
appointment_time time,
patient_id int,
doctor_id int,
status varchar (50),
foreign key(patient_id) references patients(patient_id),
foreign key(doctor_id) references doctors(doctor_id)
);`

db.query(appointment,(err, result)=>{
    if(!err){
        console.log(`Appointment Table Created`);
        
    }else{
        console.log(err);
        
    }
})


const admins = `create table admins(
admin_id int primary key auto_increment,
firstname varchar (100),
lastname varchar(100),
email varchar(100),
password varchar(200),
status varchar (50),
gender varchar(30)
);`
db.query(admins,(err, result)=>{
    if(!err){
        console.log(`Admins Table Created`);
        
    }else{
        console.log(err);
        
    }
})

const doctorschedule = `create table doctor_schedules(
schedule_id int primary key auto_increment,
doctor_id int,
email varchar(200),
status varchar(50),
note varchar(250),
appointment_type varchar(250),
schedule_date datetime
);

alter table doctor_schedules
auto_increment = 1001;
`




db.query(doctorschedule,(err, result)=>{
    if(!err){
        console.log(`schedule Table Created`);
        
    }else{
        console.log(err);
        
    }
})


const comments = `create table comments(
comment_id int primary key auto_increment,
comment varchar (250),
email varchar(100)

);
alter table comments
auto_increment = 1000;`


db.query(comments,(err, result)=>{
    if(!err){
        console.log(`Comment Table Created ALL QUERY SUCCESSFULLY END`);
        
    }else{
        console.log(err);
        
    }
})

// const message = `create table messages(
// message_id int primary key auto_increment,
// fullname varchar (250),
// email varchar(100),
// phone varchar(50),
// message varchar(255)

// );
// alter table messages
// auto_increment = 1000;`

// db.query(message,(err, result)=>{
//     if(!err){
//         console.log(`message Table Created`);
        
//     }else{
//         console.log(err);
        
//     }
// })


// db.query('SELECT 1 + 1 AS result', (err, results) => {
//     if (err) {
//         console.error('Error executing query:', err.message);
//     } else {
//         console.log('Query result:', results);
//     }
//     db.end(); // Close the connection after the test
// });

module.exports = db
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