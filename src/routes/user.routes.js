import express from "express";
import { login } from "../controller/login.controller.js";
import { verify } from "../controller/verify.controller.js";
import { verify2 } from "../controller/verify2.controller.js";
import { register } from "../controller/register.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/verify", verify);
router.post("verify2", verify2);
router.post("/register", register);

export default router;
