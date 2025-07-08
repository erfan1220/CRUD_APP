import express from "express";

import { getAllproducts } from "../controller/admin.controller.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";
import { deleteProduct } from "../controller/admin.controller.js";

const router = express.Router();

router.get("/products", adminAuthMiddleware, getAllproducts);
router.delete('/products/:id', adminAuthMiddleware, deleteProduct);

export default router;
