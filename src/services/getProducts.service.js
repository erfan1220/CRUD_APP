import pool from "../config/db.js";


export async function getProducts() {
  const Query = await pool.query("select phone_id , name from phones");
  return Query.rows;
  // console.log(Query);
  //   console.log(Query.rows[0]);
}

export async function deleteProductById(id) {
  try {
    // if (result.rowCount === 1) {
    await pool.query("delete from images where phone_id = $1", [id]);
    await pool.query("delete from phone_sellers where phone_id = $1", [id]);
    await pool.query("delete from phone_memory where phone_id = $1", [id]);
    await pool.query("delete from introduction_expertreview where phone_id = $1", [id]);
    await pool.query("delete from reviews where phone_id = $1", [id]);
    await pool.query("delete from specifications where phone_id = $1", [id]);
    // }
    const result = await pool.query("delete from phones where phone_id = $1", [id]);
    return result.rowCount;

    // if (result.rowCount === 0) {
    //   return false;
    // }
    // return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}