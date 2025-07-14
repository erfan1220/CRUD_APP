import express from "express";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });


import * as adminController from "../controller/admin.controller.js"
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";


const router = express.Router();

router.get("/products", adminAuthMiddleware, adminController.getAllproducts);
router.delete('/products/:id', adminAuthMiddleware, adminController.deleteProduct);
router.post("/products", upload.single("mainImage"), adminAuthMiddleware, adminController.addProduct)

export default router;
