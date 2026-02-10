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

		if (!slug || typeof slug !== "string") {
			return res
				.status(400)
				.json(responseWrapper.error(ErrorMessages.INVALID_REQUEST));
		}

		const restaurant = await prisma.restaurant.findUnique({
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

		if (!restaurant) {
			return res.status(404).json({ message: "Restaurant not found" });
		}

		const restaurantDetails = {
			id: restaurant.id,
			name: restaurant.name,
			menuUrl: restaurant.menuUrl,
			address: restaurant.address,
			phone: restaurant.phone,
			email: restaurant.email,
			website: restaurant.website,
			facebook: restaurant.facebook,
			instagram: restaurant.instagram,
			tiktok: restaurant.tiktok,
			categories: restaurant.categories.map((category) => ({
				id: category.id,
				name: category.name,
				description: category.description,
				menuItems: category.menuItems.map((item) => ({
					id: item.id,
					categoryId: category.id,
					name: item.name,
					description: item.description,
					price: item.price,
					imageUrl: item.imageUrl,
					isVegetarian: item.isVegetarian,
					isVegan: item.isVegan,
					isGlutenFree: item.isGlutenFree,
					isSpicy: item.isSpicy,
					spiceLevel: item.spiceLevel,
					calories: item.calories,
					preparationTime: item.preparationTime,
					servings: item.servings,
					allergens: item.allergens.map((a) => ({
						id: a.allergen.id,
						name: a.allergen.name,
						description: a.allergen.description,
						icon: a.allergen.icon,
					})),
					modifiers: item.modifiers ? item.modifiers : [],
				})),
			})),
		};

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
