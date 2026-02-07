import { Router } from "express";

import { restaurantController } from "../controllers/restaurant.controller.js";
import { updateMenuOrder } from "../controllers/menu.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", restaurantController.createRestaurant);
router.get("/", authenticate, restaurantController.getUserRestaurants);
router.get("/check-slug/:slug", restaurantController.checkSlug);

router.patch("/:restaurantId/menu/order", authenticate, updateMenuOrder);

export default router;
