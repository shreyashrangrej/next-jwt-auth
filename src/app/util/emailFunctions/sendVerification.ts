import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

interface IUser {
    id: number;
    email: string;
}

const sendVerificationEmail = async (user: IUser): Promise<void> => {
    try {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d'
        })
        const url = `${process.env.APPLICATION_URL as string}/api/auth/verify/${token}`
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: user.email,
            subject: 'Welcome to KaraFi! Email Verification.',
            html: `<html>
                  <head>
                  <title>Verification Link</title>
                  </head>
                  <body>
                    <h1>Hello!</h1>
                    <p>Thank you for signing up for our service. To complete your registration, please click the following link:</p>
                    <p><a href="${url}">Verify my email address</a></p>
                    <p>If you did not sign up for our service, you can safely ignore this email.</p>
                  </body>
                  </html>`,
        }
        await transporter.sendMail(mailOptions)
    } catch (err: any) {
        throw new Error(err);
    }
}

export default sendVerificationEmail