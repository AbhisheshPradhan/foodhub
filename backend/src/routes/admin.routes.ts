import { Router } from "express";

import { adminController } from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", adminController.getAllUsers);
router.get("/restaurants", adminController.getAllRestaurants);

export default router;
