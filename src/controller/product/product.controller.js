import * as productService from "../../services/product/product.service.js";

export const Brands = async (req, res, next) => {
  try {
    const brands = await productService.getBrands();
    return res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

export const Sellers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sellers = await productService.getSellers(id);
    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

export const Categories = async (req, res, next) => {
  try {
    const categories = await productService.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const Subcategories = async (req, res, next) => {
  try {
    const subcategories = await productService.getSubcategories();
    return res.status(200).json(subcategories);
  } catch (error) {
    next(error);
  }
};
