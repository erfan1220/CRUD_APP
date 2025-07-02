import { getProducts } from "../services/getProducts.service.js";

export const getAllproducts = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    const products = await getProducts();
    // console.log(products);
    res.status(200).json(products);
    
  } catch (error) {
    next(error);
  }
};
