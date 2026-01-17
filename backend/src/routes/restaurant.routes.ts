import { Router } from "express";

import { restaurantController } from "../controllers/restaurant.controller.js";

const router = Router();

// router.get("/", restaurantController.listRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/:id/menu", restaurantController.getMenu);

export default router;
