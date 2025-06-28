import { verifyPassword } from "../services/verify2.service.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const verify2 = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const isValid = verifyPassword(token, password);

    if (!isValid) {
      handleResponse(res, 400, "Invalid password.");
    } else {
      handleResponse(res, 200, "Password verified!", isValid.loginToken);
    }
  } catch (error) {
    next(error);
  }
};