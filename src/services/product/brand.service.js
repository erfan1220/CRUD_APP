import pool from "../../config/db.js";


export async function getBrands() {
    const result = await pool.query('select * from brands order by brands_id');
    return result.rows;
}