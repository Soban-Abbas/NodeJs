
const nodemailer = require("nodemailer");

// Create a transporter using SMTP
exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,                     // <-- Correct port for STARTTLS
    secure: true,  // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.emailuser,
        pass: process.env.emailpassword,
    },
});

