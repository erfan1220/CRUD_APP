import pool from "../config/db.js";


export async function getProducts() {
  const result = await pool.query("select phone_id , name from phones");
  return result.rows;
  // console.log(Query);
  //   console.log(Query.rows[0]);
}

export async function deleteProductById(id) {
  try {

    const result = await pool.query("delete from phones where phone_id = $1", [id]);
    return result.rowCount;

  } catch (error) {
    console.error(error);
    return false;
  }
}