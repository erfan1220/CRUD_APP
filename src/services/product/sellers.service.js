import pool from "../../config/db.js";

export async function getSellers() {
    const result = await pool.query('select * from sellers order by seller_id');
    return result.rows;
}

