const mailer = require("nodemailer");
require("dotenv").config();


const sendingMail = async (to, firstName) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.USER_MAIL,
        to: to,
        subject: "Welcome to AdVerse!",
        html: `<p>Hi ${firstName},</p>
         <p>Welcome to <strong>AdVerse</strong>! We're glad to have you with us.</p>
         <p>Get started by logging in and exploring ads.</p>
         <p>Cheers,<br />AdVerse Team</p>`
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log("Mail Sent:", mailresponse);
    return mailresponse;
}

module.exports = {
    sendingMail
};