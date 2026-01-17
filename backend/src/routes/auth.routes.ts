import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// router.post("/login", authController.login);
router.post("/signup", authController.signUp);
// router.post("/logout", authController.logout);
// router.post("/me", authenticate, authController.me);

export default router;
