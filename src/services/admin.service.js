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

export async function addProduct(body) {
  const { 'Name Product': name,
    Price,
    Discount,
    Stock,
    Brand,
    Seller,
    'Short Description': shortDescription,
    Description,
    'Expert Review': expertReview,
    specification } = body;

  const id = await pool.query("INSERT INTO phones (brand_id,name) VALUES ($1,$2) returning phone_id", [Brand, name]);
  await pool.query("INSERT INTO phone_sellers (phone_id, seller_id, price , quantity_in_stock) VALUES ($1, $2, $3, $4)", [id, Seller, Price, Stock])
  for (const spec of specification) {
    await pool.query(
      'INSERT INTO specifications (phone_id, subcategory_id, value) VALUES ($1, $2, $3)',
      [phoneId, spec.subCategory, spec.value]
    );
  }

}