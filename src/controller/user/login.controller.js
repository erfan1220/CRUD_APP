import * as userService from "../../services/user/auth.service.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const login = async (req, res, next) => {
  try {
    const { user_email } = req.body;
    const Result = await userService.login(user_email);
    if (!Result.user) {
      return handleResponse(res, 200, "-1", Result.token);
    } else {
      return handleResponse(res, 200, "1", Result.token);
      // console.log(Result.token);
    }
  } catch (error) {
    next(error)
  }
}
