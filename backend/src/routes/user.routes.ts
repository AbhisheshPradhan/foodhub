import { Router } from "express";

import { userController } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, userController.getOrCreateUser);

export default router;
