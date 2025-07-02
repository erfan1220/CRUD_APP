import express from "express";

import { getAllproducts } from "../controller/getProducts.controller.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.get("/products", adminAuthMiddleware, getAllproducts);

export default router;
