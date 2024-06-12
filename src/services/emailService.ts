import nodemailer from 'nodemailer'
import dotenv from "dotenv"

dotenv.config()

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'orderswiftng@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});


function sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
       from: process.env.GMAIL_APP_PASSWORD,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error not sent:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

const sendInvitationBusinessEmail = (email: string, password:string) => { 
    const subject = 'Welcome to Orderswift'
    const text = `Hi,\n\nWelcome to Orderswift. Your temporary password is ${password}. 
    Please login to the dashboard and ensure you change your password before anything else.
    \n\nWe are looking forward to serving you.\n\nThank you for using Orderswift.\n\nBest Regards`
    sendEmail(email, subject, text)
}

export default {
 sendInvitationBusinessEmail
}