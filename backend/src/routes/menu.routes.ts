import { Router } from "express";

import { menuController } from "../controllers/menu.controller.js";

const router = Router();

router.get("/:slug", menuController.getMenuDetailsBySlug);

export default router;
