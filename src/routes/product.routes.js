import express from "express";


import * as productController from "../controller/product/product.controller.js"


const router = express.Router();

router.get('/brands', productController.Brands);
router.get('/sellers', productController.Sellers);
router.get('/categories', productController.Categories);
router.get('/subcategories', productController.Subcategories);

export default router;