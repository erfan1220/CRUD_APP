import jwt from 'jsonwebtoken';

export function verifyCodeJWT(token, inputCode) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.code == inputCode;
    } catch (err) {
        return false;
    }
}