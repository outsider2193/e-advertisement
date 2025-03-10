const mailer = require("nodemailer");
require("dotenv").config();


const sendingMail = async(to,subject,text) =>{
     
    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"yogeshkarthik1524@gmail.com",
            pass:"xats arzt onpj rbgz"
        }
    });

    const mailOptions = {
        from: 'yogeshkarthik1524@gmail.com',
        to: to,
        subject: subject,
        text: text
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
}

module.exports = {
    sendingMail
};