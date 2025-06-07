import pool from "../config/db.js";
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const JWT_SECRET = process.env.JWT_SECRET;
// let verificationCodes = {};


async function sendcode(mail) {
  const code = Math.floor(100000 + Math.random() * 900000);

  const token = jwt.sign(
    { email: mail, code },
    JWT_SECRET,
    { expiresIn: '3m' }
  );
  // verificationCodes[mail] = {
  //   code,
  //   expires: Date.now() + 5 * 60 * 1000,
  // };
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: mail,
    subject: 'Your verification code',
    html: `<h3>Hello Dear user,</h3></br> <p>Your verification code: <strong>${code}</strong></p>`
  });
  return token
}

export const login = async (email) => {
  const token = await sendcode(email);
  const result = await pool.query("select userpass AS password from users where email = $1", [email]);
  return { token, user: result.rows[0] }
}


