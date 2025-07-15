import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pool from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export async function getProducts() {
  const result = await pool.query("select phone_id , name from phones");
  return result.rows;
}

export async function productDetails(phoneId, sellerId) {
  const Query = "select ps.price, ps.stock, array_agg(distinct jsonb_build_object"
    + "('category_id',c.id, 'category_name',c.name, 'subcategory_name',s2.name, 'subcategory_id',s2.id, 'value',s.value)) as specifications,"
    + "array_agg(distinct jsonb_build_object('partname',ie.partname,'value',ie.value)) as explanation "
    + "from phones p left join "
    + "phone_sellers ps on(p.phone_id  = ps.phone_id ) left join introduction_expertreview ie on(ie.phone_id = p.phone_id) "
    + "left join specifications s on(s.phone_id = p.phone_id ) left join subcategories s2 on(s2.id = s.subcategory_id) "
    + "left join categories c on (c.id = s2.category_id ) where p.phone_id = $1 and ps.seller_id = $2 GROUP BY ps.price, ps.stock"
  const result = await pool.query(Query, [phoneId, sellerId])
  return result.rows;
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