import * as userService from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};


export const login = async (req, res, next) => {
  try {
    const { user_number, user_password } = req.body;
    const user = await userService.login(user_number);
    if (!user) {
      handleResponse(res, 404, "user not found")
    }
    if (user.password != user_password) {
      handleResponse(res, 401, "Invalid password")
    }
    handleResponse(res, 200, "successfull")
  } catch (error) {
    next(error)
  }
}