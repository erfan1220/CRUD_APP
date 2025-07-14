import * as adminService from "../services/admin.service.js";

export const getAllproducts = async (req, res, next) => {
  try {
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
    const {
      'Name Product': name,
      Price,
      Discount,
      Stock,
      Brand,
      Seller,
      'Short Description': shortDesc,
      Description,
      'Expert Review': expertReview,
      specification
    } = req.body;

    const image = req.file.filename || null;

    let specs = JSON.parse(specification);

    const body = {
      name: name,
      price: Price,
      discount: parseInt(Discount),
      stock: parseInt(Stock),
      brandId: Brand,
      sellerId: Seller,
      shortDesc: shortDesc,
      description: Description,
      expertReview: expertReview,
      specifications: specs,
      image: image
    }

    const result = await adminService.addProduct(body) ? res.status(201).json({ message: 'Product added successfully' }) : res.status(500).json({ message: 'Failed to add product' })
    return result

  } catch (error) {
    next(error)
  }
}
