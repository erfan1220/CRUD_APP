import * as userService from "../models/userModel.js";

import { Resend } from 'resend';

const resend = new Resend('re_Xkpj4iiM_GdeTy9p6XqwEpXKtGmLYme5Z');
let verificationCodes = {};


const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

async function sendcode(mail){
  const code = Math.floor(100000 + Math.random() * 900000);
  verificationCodes[mail] = {
    code,
    expires: Date.now() + 5 * 60 * 1000,
  };
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: mail,
    subject: 'Your verification code',
    html: `<h3>Hello Dear user,</h3></br> <p>Your verification code: <strong>${code}</strong></p>`
  });
}

export const login = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { user_email } = req.body;
    const user = await userService.login(user_email);
    if (!user) {
      sendcode(user_email);
      handleResponse(res, 200, "-1")
    } else {
      sendcode(user_email);
      handleResponse(res, 200, "1")
    }
    // if (user.password != user_password) {
    //   handleResponse(res, 401, "Invalid password")
    // }
  } catch (error) {
    next(error)
  }
}