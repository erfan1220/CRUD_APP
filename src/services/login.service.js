import pool from "../config/db.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sltanyh468@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
});

const JWT_SECRET = process.env.JWT_SECRET;


async function sendcode(mail) {
  console.log(`mail is ${mail}`);
  const code = Math.floor(100000 + Math.random() * 900000);

  const token = jwt.sign(
    { email: mail, code },
    JWT_SECRET,
    { expiresIn: '3m' }
  );
  await transporter.sendMail({
    from: 'sltanyh468@gmail.com',
    to: mail,
    subject: 'Your Verification Code',
    html: `<h3>Hello Dear user,</h3></br> <p>Your verification code: <strong>${code}</strong></p>`,
  });
  return token;
}

export const login = async (email) => {
  const token = await sendcode(email);
  const result = await pool.query("select userpass AS password from users where email = $1", [email]);
  return { token, user: result.rows[0] }
}



