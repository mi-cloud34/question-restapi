const nodemailer=require("nodemailer");

const sendEmail=async(mailOptions)=>{
    let transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMPTP_USER,
            pass:process.env.SMTP_PASS
        },
        secure: process.env.SMTP_SECURE
    });

    return transporter;
    // let info=await tranporter.sendMail(mailOptions);
    // console.log(`Message sent:${info.messageId}`);
}
module.exports=sendEmail;