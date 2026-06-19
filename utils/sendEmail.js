const nodeMailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.Email_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${email}`);
    } catch (err) {
         console.error(`Failed to send email to ${email}: ${error.message}`);
    }
}

module.exports = sendEmail;