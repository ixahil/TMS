import { configDotenv } from 'dotenv';
import nodemailer from 'nodemailer';

configDotenv();

export const mailSender = async (
  email: string,
  title: string,
  body: string,
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body,
    });

    console.log('📧 Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.log(error);
  }
};
