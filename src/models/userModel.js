import pool from "../config/db.js";

export const getAllUsersService = async () => {
  const result = await pool.query("select * from users");
  //   console.log(result.rows);
  return result.rows;
};

// export const createUserService = async () => {};
