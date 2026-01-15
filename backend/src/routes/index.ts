import { Router } from "express";

import restaurantRoutes from "./restaurant.routes.js";
import categoryRoutes from "./category.routes.js";
import { userController } from "../controllers/user.controller.js";

const router = Router();

router.use("/r", restaurantRoutes);
router.use("/c", categoryRoutes);
// router.use("/r/:restaurantId/items", menuItemRoutes);
router.get("/u", userController.getAllUsers);

export default router;
