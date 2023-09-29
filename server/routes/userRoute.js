import express from "express";
import { register, login } from "./../controllers/userController.js";

const router = express.Router();

router.post("/api/users/register", register);
router.post("/api/users/login", login);

export default router