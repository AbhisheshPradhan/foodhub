import { Router } from "express";

import { restaurantController } from "../controllers/restaurant.controller.js";
import { menuController } from "../controllers/menu.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, restaurantController.createRestaurant);
router.get("/", authenticate, restaurantController.getUserRestaurants);
router.get("/check-slug/:slug", authenticate, restaurantController.checkSlug);
router.patch(
	"/:restaurantId/menu/reorder",
	authenticate,
	menuController.updateMenuOrder,
);

export default router;
