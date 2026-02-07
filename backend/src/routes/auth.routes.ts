import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, authController.getOrCreateUser);
router.get("/me", authenticate, authController.me);
router.post("/login", authController.login);
router.post("/signup", authController.signUp);
router.post("/logout", authController.logout);

export default router;
