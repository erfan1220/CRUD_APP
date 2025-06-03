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


export const login = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { user_email } = req.body;
    const user = await userService.login(user_email);

    if (!user) {
      handleResponse(res, 404, "user not found")
    } else {
      const code = Math.floor(100000 + Math.random() * 900000);
      verificationCodes[user_email] = {
        code,
        expires: Date.now() + 5 * 60 * 1000,
      };
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: user_email,
        subject: 'Your verification code',
        html: `<h3>Hello Dear user,</h3></br> <p>Your verification code: <strong>${code}</strong></p>`
      });
      handleResponse(res, 200, "Code successfully sent")
    }
    // if (user.password != user_password) {
    //   handleResponse(res, 401, "Invalid password")
    // }
  } catch (error) {
    next(error)
  }
}