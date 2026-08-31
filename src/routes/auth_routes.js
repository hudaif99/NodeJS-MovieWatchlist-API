import express from "express";
import { register, login, logout } from "../controllers/auth_controller.js";  
import { validateRequest } from "../middleware/validate_request.js";
import { loginSchema, registerSchema } from "../validators/auth_validator.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);

router.post("/login",validateRequest(loginSchema), login)

router.post("/logout", logout)

export default router