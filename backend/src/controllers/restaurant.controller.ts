import { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import { ErrorMessages, responseWrapper } from "../utils/api-response.js";

import { verifyToken } from "../lib/aws.js";
import { AuthRequest } from "./auth.controller.js";

export const createRestaurant = async (req: Request, res: Response) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res
				.status(401)
				.json(responseWrapper.error(ErrorMessages.UNAUTHORIZED));
		}

		const decoded = await verifyToken(accessToken, "access");
		const cognitoSub = decoded.sub;

		const user = await prisma.user.findUnique({
			where: { cognitoSub },
			select: { id: true },
		});

		if (!user) {
			return res
				.status(404)
				.json(responseWrapper.error(ErrorMessages.USER_NOT_FOUND));
		}

		const {
			name,
			address,
			phone,
			email,
			website,
			facebook,
			instagram,
			tiktok,
		} = req.body;

		const restaurant = await prisma.restaurant.create({
			data: {
				name: name ?? "My Restaurant",
				address,
				phone,
				email,
				website,
				facebook,
				instagram,
				tiktok,
				userRestaurants: {
					create: {
						userId: user.id,
						role: "owner",
					},
				},
			},
		});

		return res.status(201).json(responseWrapper.success(restaurant));
	} catch (error) {
		console.error("createRestaurant error:", error);
		return res
			.status(500)
			.json(responseWrapper.error(ErrorMessages.DEFAULT));
	}
};

// export const getRestaurantById = async (req: Request, res: Response) => {
// 	try {
// 		const id = parseInt(req.params.id as string);

// 		const restaurant = await prisma.restaurant.findUnique({
// 			where: { id },
// 			include: {
// 				categories: {
// 					where: { isActive: true },
// 					orderBy: { displayOrder: "asc" },
// 				},
// 			},
// 		});

// 		if (!restaurant) {
// 			return res.status(404).json({
// 				success: false,
// 				error: "Restaurant not found",
// 			});
// 		}

// 		const response: ApiResponse<typeof restaurant> = {
// 			success: true,
// 			data: restaurant,
// 		};

// 		res.json(response);
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			error: "Failed to fetch restaurant",
// 		});
// 	}
// };

// export const getMenu = async (req: Request, res: Response) => {
// 	try {
// 		const id = parseInt(req.params.id as string);

// 		const restaurant: RestaurantWithCategories =
// 			await prisma.restaurant.findUnique({
// 				where: { id },
// 				include: {
// 					categories: {
// 						where: { isActive: true },
// 						include: {
// 							menuItems: {
// 								where: { isAvailable: true },
// 								include: {
// 									allergens: {
// 										include: {
// 											allergen: true,
// 										},
// 									},
// 									modifiers: {
// 										where: { isAvailable: true },
// 										orderBy: { displayOrder: "asc" },
// 									},
// 								},
// 								orderBy: { displayOrder: "asc" },
// 							},
// 						},
// 						orderBy: { displayOrder: "asc" },
// 					},
// 				},
// 			});

// 		if (!restaurant) {
// 			return res.status(404).json({
// 				success: false,
// 				error: "Restaurant not found",
// 			});
// 		}

// 		// Transform to CompleteMenu structure
// 		const completeMenu: CompleteMenu = {
// 			restaurant: {
// 				id: restaurant.id,
// 				name: restaurant.name,
// 				address: restaurant.address,
// 				phone: restaurant.phone,
// 				email: restaurant.email,
// 				website: restaurant.website,
// 				createdAt: restaurant.createdAt,
// 				updatedAt: restaurant.updatedAt,
// 			},
// 			categories: restaurant.categories.map((category) => ({
// 				category: {
// 					id: category.id,
// 					restaurantId: category.restaurantId,
// 					name: category.name,
// 					description: category.description,
// 					displayOrder: category.displayOrder,
// 					isActive: category.isActive,
// 					createdAt: category.createdAt,
// 				},
// 				items: category.menuItems.map((item) => ({
// 					item: {
// 						id: item.id,
// 						categoryId: item.categoryId,
// 						name: item.name,
// 						description: item.description,
// 						price: item.price.toNumber(), // Convert Decimal to number
// 						imageUrl: item.imageUrl,
// 						isAvailable: item.isAvailable,
// 						isVegetarian: item.isVegetarian,
// 						isVegan: item.isVegan,
// 						isGlutenFree: item.isGlutenFree,
// 						isSpicy: item.isSpicy,
// 						spiceLevel: item.spiceLevel,
// 						calories: item.calories,
// 						preparationTime: item.preparationTime,
// 						servings: item.servings,
// 						displayOrder: item.displayOrder,
// 						createdAt: item.createdAt,
// 						updatedAt: item.updatedAt,
// 					},
// 					allergens: item.allergens.map((a) => ({
// 						id: a.allergen.id,
// 						name: a.allergen.name,
// 						description: a.allergen.description,
// 						icon: a.allergen.icon,
// 						createdAt: a.allergen.createdAt,
// 					})),
// 					modifiers: item.modifiers.map((m) => ({
// 						id: m.id,
// 						itemId: m.itemId,
// 						name: m.name,
// 						description: m.description,
// 						priceAdjustment: m.priceAdjustment.toNumber(),
// 						isAvailable: m.isAvailable,
// 						modifierType: m.modifierType as any,
// 						displayOrder: m.displayOrder,
// 						createdAt: m.createdAt,
// 					})),
// 				})),
// 			})),
// 		};

// 		const response: ApiResponse<CompleteMenu> = {
// 			success: true,
// 			data: completeMenu,
// 		};

// 		res.json(response);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({
// 			success: false,
// 			error: "Failed to fetch menu",
// 		});
// 	}
// };

// export const getUserRestaurants = async (req: Request, res: Response) => {
// 	try {
// 		const cognitoSub = req.cognitoSub;

// 		if (!cognitoSub) {
// 			return res.status(401).json({ message: "Unauthorized" });
// 		}

// 		// Find the user along with their restaurants
// 		const user = await prisma.user.findUnique({
// 			where: { cognitoSub },
// 			include: {
// 				userRestaurants: {
// 					include: { restaurant: true },
// 				},
// 			},
// 		});

// 		if (!user) {
// 			return res.status(404).json({ message: "User not found" });
// 		}

// 		// Extract restaurants and role
// 		const restaurants = user.userRestaurants.map((ur) => ({
// 			id: ur.restaurant.id,
// 			name: ur.restaurant.name,
// 			address: ur.restaurant.address,
// 			role: ur.role,
// 			phone: ur.restaurant.phone,
// 			email: ur.restaurant.email,
// 			website: ur.restaurant.website,
// 			facebook: ur.restaurant.facebook,
// 			instagram: ur.restaurant.instagram,
// 			tiktok: ur.restaurant.tiktok,
// 		}));

// 		return res.status(200).json(responseWrapper.success(restaurants));
// 	} catch (error) {
// 		console.error("getUserRestaurants error:", error);
// 		return res.status(500).json({ message: "Internal server error" });
// 	}
// };

export const getUserRestaurants = async (req: AuthRequest, res: Response) => {
	try {
		console.log("getUserRestaurants req.user?", req.user);
		const cognitoSub = req.user?.sub;

		if (!cognitoSub) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		// Find the user along with their restaurants, categories, and menu items
		const user = await prisma.user.findUnique({
			where: { cognitoSub },
			include: {
				userRestaurants: {
					include: {
						restaurant: {
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
						},
					},
				},
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Transform the data into a cleaner structure
		const restaurants = user.userRestaurants.map((ur) => ({
			id: ur.restaurant.id,
			name: ur.restaurant.name,
			address: ur.restaurant.address,
			phone: ur.restaurant.phone,
			email: ur.restaurant.email,
			website: ur.restaurant.website,
			facebook: ur.restaurant.facebook,
			instagram: ur.restaurant.instagram,
			tiktok: ur.restaurant.tiktok,
			role: ur.role,
			categories: ur.restaurant.categories.map((category) => ({
				id: category.id,
				name: category.name,
				description: category.description,
				displayOrder: category.displayOrder,
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
		}));

		return res.status(200).json(responseWrapper.success(restaurants));
	} catch (error) {
		console.error("getUserRestaurants error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const restaurantController = {
	createRestaurant,
	// getRestaurantById,
	// getMenu,
	getUserRestaurants,
};
