import { Router } from "express";

import { categoryController } from "../controllers/category.controller.js";

const router = Router();

router.get("/", categoryController.listCategories);
// router.post("/", categoryController.getRestaurantById);
// router.get("/:id", categoryController.getRestaurantById);
// router.post("/:id", categoryController.getRestaurantById);
// router.delete("/:id", categoryController.getRestaurantById);

export default router;
