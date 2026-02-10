import { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "./auth.controller.js";
import { ErrorMessages, responseWrapper } from "../utils/api-response.js";

interface MenuItemOrder {
	id: number;
	displayOrder: number;
}

interface CategoryOrder {
	id: number;
	displayOrder: number;
	menuItems: MenuItemOrder[];
}

const updateMenuOrder = async (req: AuthRequest, res: Response) => {
	const { categories } = req.body as { categories: CategoryOrder[] };
	const restaurantId = Number(req.params.restaurantId);

	if (!categories || !Array.isArray(categories)) {
		return res
			.status(400)
			.json(responseWrapper.error(ErrorMessages.INVALID_PAYLOAD));
	}
	const cognitoSub = req.user?.sub;

	if (!cognitoSub) {
		return res
			.status(401)
			.json(responseWrapper.error(ErrorMessages.UNAUTHORIZED));
	}
	try {
		const userRestaurant = await prisma.user.findUnique({
			where: { cognitoSub },
			include: {
				userRestaurants: {
					where: {
						restaurantId,
					},
				},
			},
		});

		if (!userRestaurant) {
			return res
				.status(403)
				.json(responseWrapper.error(ErrorMessages.FORBIDDEN));
		}

		// if (!["editor", "admin", "owner"].includes(userRestaurant.role)) {
		// 	return res
		// 		.status(403)
		// 		.json(responseWrapper.error(ErrorMessages.FORBIDDEN));
		// }

		await prisma.$transaction(async (tx) => {
			for (const category of categories) {
				await tx.category.updateMany({
					where: {
						id: category.id,
						restaurantId,
					},
					data: {
						displayOrder: category.displayOrder,
					},
				});

				for (const item of category.menuItems) {
					await tx.menuItem.updateMany({
						where: {
							id: item.id,
							categoryId: category.id,
						},
						data: {
							displayOrder: item.displayOrder,
						},
					});
				}
			}
		});

		return res.status(200).json(responseWrapper.success(categories));
	} catch (error) {
		console.error(error);
		return res.status(500).json(responseWrapper.error());
	}
};

const getMenuDetailsBySlug = async (req: Request, res: Response) => {
	try {
		const { slug } = req.params;

		console.log("getMenuDetailsBySlug slug:::", slug);
		if (!slug || typeof slug !== "string") {
			return res
				.status(400)
				.json(responseWrapper.error(ErrorMessages.INVALID_REQUEST));
		}

		// Find the user along with their restaurants, categories, and menu items
		const restaurantDetails = await prisma.restaurant.findUnique({
			where: { menuUrl: slug },
			include: {
				categories: {
					where: { isActive: true },
					orderBy: { displayOrder: "asc" },
					include: {
						menuItems: {
							where: { isAvailable: true },
							orderBy: { displayOrder: "asc" },
							include: {
								allergens: {
									include: {
										allergen: true,
									},
								},
							},
						},
					},
				},
			},
		});

		return res.status(200).json(responseWrapper.success(restaurantDetails));
	} catch (error) {
		console.error("getDetails error:", error);
		return res.status(500).json(responseWrapper.error());
	}
};

export const menuController = {
	updateMenuOrder,
	getMenuDetailsBySlug,
};
