import express from "express";


import { getAllBrands } from "../controller/product/brand.controller.js";
import { getAllSellers } from "../controller/product/sellers.controller.js";


const router = express.Router();

router.get('/brands', getAllBrands);
router.get('/sellers', getAllSellers)

export default router;