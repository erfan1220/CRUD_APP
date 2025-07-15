import { Query } from "pg";
import pool from "../../config/db.js";

export async function getBrands() {
    const result = await pool.query('select * from brands order by brands_id');
    return result.rows;
}

export async function getSellers(id) {
    let result;
    if (id === "-1") {
        result = await pool.query('select * from sellers order by seller_id');
    } else {
        result = await pool.query('select s.seller_id , s."name" from phone_sellers ps left join sellers s on(s.seller_id = ps.seller_id ) where ps.phone_id = $1', [id]);
    }
    // const result = await  pool.query(Query)
    return result.rows;
}

export async function getCategories() {
    const result = await pool.query('select * from categories order by id');
    return result.rows;
}

export async function getSubcategories() {
    const result = await pool.query('select * from subcategories order by id');
    return result.rows;
}