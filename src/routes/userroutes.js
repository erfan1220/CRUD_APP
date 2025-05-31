import express from "express";
import { getAllUsers } from "../controller/userController.js";

const router = express.Router();

// just example
router.get("/user", getAllUsers);
// router.get("/user/:id", getUserById);
// router.post("/user", createUser);
// router.delete("/user/:id", deleteUser);

export default router;
