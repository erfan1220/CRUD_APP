import { verifyCodeJWT } from "../../services/user/verification.service.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const verify = async (req, res, next) => {
  try {
    const { token, code } = req.body;
    const inputcode = Number(code);
    const isValid = await verifyCodeJWT(token, inputcode);

    if (!isValid) {
      return handleResponse(res, 400, "Invalid or expired code.");
    } else {
      return handleResponse(res, 200, "Code verified!", isValid);
    }
  } catch (error) {
    next(error);
  }
};
