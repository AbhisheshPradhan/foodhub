import { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import { ApiResponse } from "../utils/api-response.js";

export const categoryController = {
	listCategories: async (req: Request, res: Response) => {
		try {
			// const restaurantId = parseInt(req.params.id as string);

			const { id } = req.params;

			const categories = await prisma.category.findMany({
				// where: { restaurantId },
				orderBy: { name: "asc" },
			});

			const response: ApiResponse<typeof categories> = {
				success: true,
				data: categories,
			};

			res.json(response);
		} catch (error) {
			res.status(500).json({
				success: false,
				error: "Failed to fetch categories",
			});
		}
	},
};
