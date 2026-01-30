import { Router } from "express";

import restaurantRoutes from "./restaurant.routes.js";
import categoryRoutes from "./category.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.use("/restaurants", restaurantRoutes);
router.use("/c", categoryRoutes);
router.use("/users", userRoutes);

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
