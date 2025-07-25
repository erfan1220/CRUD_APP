import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

import * as adminController from "../controller/admin.controller.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.get("/products", adminAuthMiddleware, adminController.getAllproducts);
router.get("/products/details", adminController.details);
router.delete(
  "/products/:id",
  adminAuthMiddleware,
  adminController.deleteProduct
);
router.post(
  "/products",
  adminAuthMiddleware,
  upload.single("mainImage"),
  adminController.addProduct
);
router.put(
  "/products",
  adminAuthMiddleware,
  upload.single("image"),
  adminController.updateProduct
);

export default router;
