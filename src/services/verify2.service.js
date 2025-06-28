import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export async function verifyPassword(token, pass) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.mail;
    const user = await pool.query("select * from users where email = $1", [
        email,
      ]);
    if (user.password !== pass) {
      return false;
    } else {
      const user = await pool.query("select * from users where email = $1", [
        email,
      ]);
      const payload = {id: user.user_id, email: user.email, role: user.role};
      const loginToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
      return loginToken;
    }
  } catch (err) {
    return false;
  }
}