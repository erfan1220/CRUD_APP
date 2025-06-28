import { Register } from "../services/register.service.js";


const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phonenumber } = req.body;
    const token = await Register(name, email, password, phonenumber);
    if (!name || !email || !password || !phonenumber) {
        handleResponse(res, 400, "All fields are required");
    } else if (!token) {
      handleResponse(res, 409, "Email or phonenumber already registered");
    } else {
      handleResponse(res, 201, "User registered successfully", token);
    }
  } catch (error) {
    next(error);
  }
};
