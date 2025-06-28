import { verifyCodeJWT } from "../services/verify.service.js";

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
      handleResponse(res, 400, "Invalid or expired code.");
    } else {
      handleResponse(res, 200, "Code verified!", isValid);
    }
  } catch (error) {
    next(error);
  }
};
