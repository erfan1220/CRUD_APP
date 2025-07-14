import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pool from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export async function getProducts() {
  const result = await pool.query("select phone_id , name from phones");
  // query = "select json_build_object( 'basicData', json_build_object('id',p.phone_id,'brand',brand_id,'name',name), 'seller') as result"
  return result.rows;
  // console.log(Query);
  //   console.log(Query.rows[0]);
}

export async function deleteProductById(id) {
  try {
    const imagePath = (await pool.query("select image_url from images where phone_id = $1", [id])).rows[0].image_url;

    if (imagePath) {
      const fullPath = path.join(__dirname, '../../uploads', imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error('Error deleting image:', fullPath, err.message);
        } else {
          console.log('Deleted image:', fullPath);
        }
      });
    }

    const result = await pool.query("delete from phones where phone_id = $1", [id]);
    return result.rowCount;

  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addProduct(body) {
  try {
    const {
      name,
      price,
      discount,
      stock,
      brandId,
      sellerId,
      shortDesc,
      description,
      expertReview,
      specifications,
      image
    } = body

    const labels = { 'introduction': description, 'expertReview': expertReview, 'shortDescription': shortDesc };

    //queries
    const result = await pool.query("INSERT INTO phones (brand_id,name) VALUES ($1,$2) returning phone_id", [brandId, name]);
    const id = result.rows[0].phone_id;
    await pool.query("INSERT INTO phone_sellers (phone_id, seller_id, price , stock) VALUES ($1, $2, $3, $4)", [id, sellerId, price, stock])
    for (const spec of specifications) {
      await pool.query(
        'INSERT INTO specifications (phone_id, subcategory_id, value) VALUES ($1, $2, $3)',
        [id, spec.subCategory, spec.value]
      );
    }
    for (let x in labels) {
      await pool.query(`INSERT INTO introduction_expertreview (phone_id, partname, value) values ($1, $2, $3)`, [id, x, labels[x]])
    }
    await pool.query('INSERT INTO images (phone_id, image_url) VALUES ($1,$2)', [id, image])

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }

}