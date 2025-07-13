import * as adminService from "../services/admin.service.js";

export const getAllproducts = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    // console.log(products);
    const products = await adminService.getProducts();
    return res.status(200).json(products);

  } catch (error) {
    next(error);
  }
};


export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteProductById(id);
    if (result === 1) {
      return res.status(200).json({ message: 'Product deleted successfully' })
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product' });
    next(error);
  }
}

export const addProduct = async (req, res, next) => {
  try {
    const result = adminService.addProduct(req.body);
  } catch (error) {
    next(error)
  }
}
