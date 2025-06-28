import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export async function verifyCodeJWT(token, inputCode) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.code !== inputCode) {
      console.log('test');
      return false;
    } else {
      const email = decoded.email;
      const result = await pool.query("select * from users where email = $1", [
        email,
      ]);
      const user = result.rows[0];
      const payload = { id: user.user_id, email: user.email, role: user.role, name: user.username };
      const loginToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      return loginToken;
    }
  } catch (err) {
    return false;
  }
}
