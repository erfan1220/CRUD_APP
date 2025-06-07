import express from "express";
import { login } from "../controller/login.controller.js";
import { verify } from "../controller/verify.controller.js";

const router = express.Router();


router.post('/login', login);
router.post('/verify', verify);


export default router;
