import pool from "../../config/db.js";

export async function getBrands() {
    const result = await pool.query('select * from brands order by brands_id');
    return result.rows;
}

export async function getSellers() {
    const result = await pool.query('select * from sellers order by seller_id');
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