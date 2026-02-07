import { Router } from "express";

import restaurantRoutes from "./restaurant.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/restaurants", restaurantRoutes);
router.use("/auth", authRoutes);

export default router;
