import { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import { ApiResponse } from "../utils/api-response.js";
import {
	Restaurant,
	RestaurantWithCategories,
} from "@shared/types/restaurants.js";
import { CompleteMenu } from "@shared/types/restaurants.js";

// todo: support query param filters later

export const restaurantController = {
	getRestaurantById: async (req: Request, res: Response) => {
		try {
			const id = parseInt(req.params.id as string);

			const restaurant = await prisma.restaurant.findUnique({
				where: { id },
				include: {
					categories: {
						where: { isActive: true },
						orderBy: { displayOrder: "asc" },
					},
				},
			});

			if (!restaurant) {
				return res.status(404).json({
					success: false,
					error: "Restaurant not found",
				});
			}

			const response: ApiResponse<typeof restaurant> = {
				success: true,
				data: restaurant,
			};

			res.json(response);
		} catch (error) {
			res.status(500).json({
				success: false,
				error: "Failed to fetch restaurant",
			});
		}
	},
	getMenu: async (req: Request, res: Response) => {
		try {
			const id = parseInt(req.params.id as string);

			const restaurant: RestaurantWithCategories =
				await prisma.restaurant.findUnique({
					where: { id },
					include: {
						categories: {
							where: { isActive: true },
							include: {
								menuItems: {
									where: { isAvailable: true },
									include: {
										allergens: {
											include: {
												allergen: true,
											},
										},
										modifiers: {
											where: { isAvailable: true },
											orderBy: { displayOrder: "asc" },
										},
									},
									orderBy: { displayOrder: "asc" },
								},
							},
							orderBy: { displayOrder: "asc" },
						},
					},
				});

			if (!restaurant) {
				return res.status(404).json({
					success: false,
					error: "Restaurant not found",
				});
			}

			// Transform to CompleteMenu structure
			const completeMenu: CompleteMenu = {
				restaurant: {
					id: restaurant.id,
					name: restaurant.name,
					address: restaurant.address,
					phone: restaurant.phone,
					email: restaurant.email,
					website: restaurant.website,
					createdAt: restaurant.createdAt,
					updatedAt: restaurant.updatedAt,
				},
				categories: restaurant.categories.map((category) => ({
					category: {
						id: category.id,
						restaurantId: category.restaurantId,
						name: category.name,
						description: category.description,
						displayOrder: category.displayOrder,
						isActive: category.isActive,
						createdAt: category.createdAt,
					},
					items: category.menuItems.map((item) => ({
						item: {
							id: item.id,
							categoryId: item.categoryId,
							name: item.name,
							description: item.description,
							price: item.price.toNumber(), // Convert Decimal to number
							imageUrl: item.imageUrl,
							isAvailable: item.isAvailable,
							isVegetarian: item.isVegetarian,
							isVegan: item.isVegan,
							isGlutenFree: item.isGlutenFree,
							isSpicy: item.isSpicy,
							spiceLevel: item.spiceLevel,
							calories: item.calories,
							preparationTime: item.preparationTime,
							servings: item.servings,
							displayOrder: item.displayOrder,
							createdAt: item.createdAt,
							updatedAt: item.updatedAt,
						},
						allergens: item.allergens.map((a) => ({
							id: a.allergen.id,
							name: a.allergen.name,
							description: a.allergen.description,
							icon: a.allergen.icon,
							createdAt: a.allergen.createdAt,
						})),
						modifiers: item.modifiers.map((m) => ({
							id: m.id,
							itemId: m.itemId,
							name: m.name,
							description: m.description,
							priceAdjustment: m.priceAdjustment.toNumber(),
							isAvailable: m.isAvailable,
							modifierType: m.modifierType as any,
							displayOrder: m.displayOrder,
							createdAt: m.createdAt,
						})),
					})),
				})),
			};

			const response: ApiResponse<CompleteMenu> = {
				success: true,
				data: completeMenu,
			};

			res.json(response);
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				error: "Failed to fetch menu",
			});
		}
	},
};
