const nodemailer = require('nodemailer');

const fs = require('fs');
// Adjust the path as needed
const bookingmailmsg = fs.readFileSync('./services/bookingmail.html', 'utf8');


// console.log(bookingmailmsg);
require(`dotenv`).config(); // To access the .env file


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        'user': process.env.GMAIL_USER, // generated ethereal user
        'pass': process.env.GMAIL_PASS // generated ethereal password
    }
});

const subject = `Email Confirmation - MEDIC'S HEALTH`;
const sender = process.env.GMAIL_USER;
let text = 'Thank you for registering with our Medics Health!';
// const bookingmailmsg = fs.readFile(`../bookinggmail.html`, 'utf8')

// Defining the email sending function

const sendConfirmationEmail = (email, tokens) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: subject,
        text: text,
        html: `<h3>Thank you for registering with MEDIC'S HEALTH!</h3>
            <p>Please confirm your email by clicking the link below:</p>
            <a href="http://localhost:23168/confirm-email/${tokens}">Confirm Email Address</a>
        `,
    };

    return transporter.sendMail(mailOptions); // Sends the email
};


const sendappointmentconfirmation = (email, appointment_detail, doctor) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: `Appointment Confirmation - MEDIC'S HEALTH`,
        text: ` APPOINTMENT BOOKED SUCCESSFULLY`,
        html: `<h3>Appointment Confirmation</h3>
            <p>Dear ${appointment_detail.firstname}, ${appointment_detail.lastname}</p>
            <p>Your appointment has been booked successfully. Please check the details below:</p>
            <ul>
                <li>Appointment ID: </li>
                <li>Appointment Type: ${appointment_detail.appointment_type} </li>
                <li>Appointment Time: ${appointment_detail.appointment_time} </li>
                <li>Appointment Date: ${appointment_detail.appointment_date} </li>
                <li>Doctor Full Name: ${doctor.doctor_firstname}, ${doctor.doctor_lastname}</li>
                <li>Doctor Email: ${ doctor.doctor_email}</li>
                <li>Doctor ID: ${appointment_detail.doctor_id}</li>
                <li>Status: ${appointment_detail.status}</li>
                <li>Note: ${appointment_detail.appointment_note}</li>
            </ul>
            <p>Thank you for choosing MEDIC'S HEALTH!</p><br>
            <p>Reach us on email <a href="mailto:medicshealthdirect@gmail.com"> @ medicshealthdirect@gmail.com</a> </p>
            `
    };
    return transporter.sendMail(mailOptions); //Send this appointment detail email
}


module.exports = { sendConfirmationEmail, sendappointmentconfirmation };