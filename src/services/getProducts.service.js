import pool from "../config/db.js";

// console.log('test');
// getProducts();

export async function getProducts() {
  const Query = await pool.query("select name from phones");
  // console.log(Query);
  return Query.rows;
  //   console.log(Query.rows[0]);
}
