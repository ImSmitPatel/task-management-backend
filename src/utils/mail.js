import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


// sendMailOptions({
//     email: user.email,
//     subject: "Verification Email",
//     mailGenContent: emailVerificationMailGenContent(
//         username,
//         `verificationURL`
//     )
// })

const sendMail = async(options) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager',
            link: 'https://taskmanager.com/'
        }
    });

    const emailHtml = mailGenerator.generate(options.mailGenContent)
    
    const emailText = mailGenerator.generatePlaintext(options.mailGenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false,      // true for port 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASSWORD,
        },
    });

    const mail = {
        from: 'mail@taskmanager.com', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: emailText, // plain text body
        html: emailHtml, // html body
    }

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("email sending failed: ", error);
    }

}

const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to TaskManager! We're very excited to have you on board.",
            action: {
                instructions: "To get started with our App, please click here:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Verify your Email",
                    link: verificationUrl,
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        }
    }
}

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset your password.",
            action: {
                instructions: "To change password, please click here:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Reset your Password",
                    link: passwordResetUrl,
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        }
    }
}


export {sendMail, emailVerificationMailGenContent, forgotPasswordMailGenContent}
