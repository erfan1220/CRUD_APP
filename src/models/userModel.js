import pool from "../config/db.js";


export const login = async (phonenumber) => {
  const result = await pool.query("select userpass AS password from users where phonenumber = $1", [phonenumber]);
  return result.rows[0];
}


