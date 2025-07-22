import * as adminService from "../services/admin.service.js";

export const getAllproducts = async (req, res, next) => {
  try {
    const products = await adminService.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const details = async (req, res, next) => {
  try {
    const phoneId = parseInt(req.query.phoneId);
    const sellerId = parseInt(req.query.sellerId);

    if (!phoneId || !sellerId) {
      return res.status(400).json({ message: "Missing phoneId or sellerId" });
    }

    const result = await adminService.productDetails(phoneId, sellerId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteProductById(id);
    if (result === 1) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const {
      "Name Product": name,
      Price,
      Discount,
      Stock,
      Brand,
      Seller,
      "Short Description": shortDesc,
      Description,
      "Expert Review": expertReview,
      specification,
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
      image: image,
    };

    const result = (await adminService.addProduct(body))
      ? res.status(201).json({ message: "Product added successfully" })
      : res.status(500).json({ message: "Failed to add product" });
    return result;
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const {
      product_id,
      seller_id,
      price,
      stock,
      shortDescription,
      description,
      expertReview,
      specification,
    } = req.body;

    const changes = {};

    if (price !== undefined) changes.price = price;
    if (stock !== undefined) changes.stock = stock;
    if (shortDescription) changes.shortDescription = shortDescription;
    if (description) changes.description = description;
    if (expertReview) changes.expertReview = expertReview;

    if (specification) {
      try {
        changes.specifications = JSON.parse(specification);
      } catch {
        return res.status(400).json({ error: "Invalid specifications JSON" });
      }
    }

    if (req.file) {
      changes.image_url = req.file.filename;
    }

    // console.log(changes);

    const result = await adminService.update(product_id, seller_id, changes);

    if (result) {
      return res.status(200).json({ message: "Product updated successfully" });
    } else {
      return res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    next(error);
    console.error("Update error:", err);
  }
};
