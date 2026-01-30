import { Router } from "express";

import { restaurantController } from "../controllers/restaurant.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// router.get("/", restaurantController.listRestaurants);
// router.get("/:id", restaurantController.getRestaurantById);
// router.get("/:id/menu", restaurantController.getMenu);
router.post("/", restaurantController.createRestaurant);
router.get("/", authenticate, restaurantController.getUserRestaurants);

export default router;
