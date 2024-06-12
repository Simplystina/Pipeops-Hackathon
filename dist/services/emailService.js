"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a transporter object
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'orderswiftng@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
    }
});
function sendEmail(to, subject, text) {
    const mailOptions = {
        from: process.env.GMAIL_APP_PASSWORD,
        to,
        subject,
        text
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error not sent:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });
}
const sendInvitationBusinessEmail = (email, password) => {
    const subject = 'Welcome to Orderswift';
    const text = `Hi,\n\nWelcome to Orderswift. Your temporary password is ${password}. 
    Please login to the dashboard and ensure you change your password before anything else.
    \n\nWe are looking forward to serving you.\n\nThank you for using Orderswift.\n\nBest Regards`;
    sendEmail(email, subject, text);
};
exports.default = {
    sendInvitationBusinessEmail
};
