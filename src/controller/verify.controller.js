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
        const isValid = verifyCodeJWT(token, code);

        if (isValid) {
            handleResponse(res, 200, "Code verified!")
        } else {
            handleResponse(res, 400, "Invalid or expired code.")
        }
    } catch (error) {
        next(error)
    }
}