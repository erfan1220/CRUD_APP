import express from "express";

import { getAllproducts } from "../controller/Products.controller.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";
import { deleteProduct } from "../controller/Products.controller.js";

const router = express.Router();

router.get("/products", adminAuthMiddleware, getAllproducts);
router.delete('/products/:id', deleteProduct);

export default router;
