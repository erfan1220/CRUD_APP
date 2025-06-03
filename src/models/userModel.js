import pool from "../config/db.js";


export const login = async (email) => {
  const result = await pool.query("select userpass AS password from users where email = $1", [email]);
  return result.rows[0];
}


