import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

interface IUser {
    id: number;
    email: string;
}

interface IBody {
    firstName: string,
    lastName: string,
    password: string
}

const sendVerificationEmail = async (user: IUser, body: IBody): Promise<void> => {
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
            subject: 'You Have Been Added To EntApex',
            html: `<html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>Welcome ${body.firstName}</title>
            </head>
            <body>
              <header>
                <h1>Hello ${body.firstName} ${body.lastName}!</h1>
              </header>
              <main>
                <p>You have been added to EntApex. Here are your login details:</p>
                <table>
                  <tr>
                    <th>Username:</th>
                    <td>${user.email}</td>
                  </tr>
                  <tr>
                    <th>Password:</th>
                    <td>${body.password}</td>
                  </tr>
                </table>
                <p>To complete your registration, please click the following link:</p>
                <p><a href="${url}">Verify my email address</a></p>
                <p>If you did not sign up for our service, you can safely ignore this email.</p>
              </main>
              <footer>
                <p>&copy; 2023 EntApex. All rights reserved.</p>
              </footer>
            </body>
          </html>`,
        }
        await transporter.sendMail(mailOptions)
    } catch (err: any) {
        throw new Error(err);
    }
}

export default sendVerificationEmail