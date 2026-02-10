import { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import { ErrorMessages, responseWrapper } from "../utils/api-response.js";

import { verifyToken } from "../lib/aws.js";
import { AuthRequest } from "./auth.controller.js";
import {
	generateSlug,
	generateUniqueSlug,
	validateSlugFormat,
} from "../utils/slug.js";

const createRestaurant = async (req: AuthRequest, res: Response) => {
	try {
		const cognitoSub = req.user?.sub;

		if (!cognitoSub) {
			return res
				.status(401)
				.json(responseWrapper.error(ErrorMessages.UNAUTHORIZED));
		}

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
			menuUrl,
			address,
			phone,
			email,
			website,
			facebook,
			instagram,
			tiktok,
		} = req.body;

		if (!name) {
			return res
				.status(400)
				.json(responseWrapper.error("Restaurant name is required"));
		}

		let finalMenuUrl: string;

		if (menuUrl) {
			if (!validateSlugFormat(menuUrl)) {
				return res
					.status(400)
					.json(
						responseWrapper.error(
							"URL can only contain lowercase letters, numbers, and hyphens",
						),
					);
			}

			const exists = await prisma.restaurant.findFirst({
				where: { menuUrl },
			});

			if (exists) {
				return res
					.status(400)
					.json(
						responseWrapper.error(
							`Already taken. Try ${menuUrl}-2`,
						),
					);
			}

			finalMenuUrl = menuUrl;
		} else {
			const baseSlug = generateSlug(name);
			finalMenuUrl = await generateUniqueSlug(prisma, baseSlug);
		}

		const restaurant = await prisma.restaurant.create({
			data: {
				name,
				menuUrl: finalMenuUrl,
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
		return res.status(500).json(responseWrapper.error());
	}
};

const getRestaurantsList = async (req: AuthRequest, res: Response) => {
	try {
		const cognitoSub = req.user?.sub;

		if (!cognitoSub) {
			return res
				.status(401)
				.json(responseWrapper.error(ErrorMessages.UNAUTHORIZED));
		}

		const userRestaurants = await prisma.userRestaurant.findMany({
			where: {
				user: { cognitoSub },
			},
			include: {
				restaurant: {
					select: {
						id: true,
						name: true,
						address: true,
						menuUrl: true,
					},
				},
			},
			orderBy: {
				restaurant: {
					name: "asc",
				},
			},
		});

		const restaurants = userRestaurants.map((ur) => ({
			id: ur.restaurant.id,
			name: ur.restaurant.name,
			address: ur.restaurant.address,
			menuUrl: ur.restaurant.menuUrl,
			role: ur.role,
		}));

		return res.status(200).json(responseWrapper.success(restaurants));
	} catch (error) {
		console.error("getUserRestaurants error:", error);
		return res.status(500).json(responseWrapper.error());
	}
};

const updateRestaurant = async (req: AuthRequest, res: Response) => {
	try {
		const cognitoSub = req.user?.sub;
		const restaurantId = Number(req.params.restaurantId);

		if (!cognitoSub) {
			return res
				.status(401)
				.json(responseWrapper.error(ErrorMessages.UNAUTHORIZED));
		}

		if (isNaN(restaurantId)) {
			return res
				.status(400)
				.json(responseWrapper.error("Invalid restaurant ID"));
		}

		const userRestaurant = await prisma.userRestaurant.findFirst({
			where: {
				restaurantId,
				user: { cognitoSub },
			},
		});

		if (!userRestaurant) {
			return res
				.status(404)
				.json(responseWrapper.error("Restaurant not found"));
		}

		// Define allowed fields that can be updated
		const allowedFields = [
			"name",
			"menuUrl",
			"address",
			"phone",
			"email",
			"website",
			"facebook",
			"instagram",
			"tiktok",
		] as const;

		const updateData: Record<string, unknown> = {};

		for (const field of allowedFields) {
			if (req.body[field] !== undefined) {
				updateData[field] = req.body[field];
			}
		}

		// If no valid fields to update
		if (Object.keys(updateData).length === 0) {
			return res
				.status(400)
				.json(responseWrapper.error("No valid fields to update"));
		}

		// Special validation for menuUrl if it's being updated
		if (updateData.menuUrl !== undefined) {
			const menuUrl = updateData.menuUrl as string;

			if (!validateSlugFormat(menuUrl)) {
				return res
					.status(400)
					.json(
						responseWrapper.error(
							"URL can only contain lowercase letters, numbers, and hyphens",
						),
					);
			}

			const exists = await prisma.restaurant.findFirst({
				where: {
					menuUrl,
					id: { not: restaurantId },
				},
			});

			if (exists) {
				return res
					.status(400)
					.json(
						responseWrapper.error(
							`Already taken. Try ${menuUrl}-2`,
						),
					);
			}
		}

		const restaurant = await prisma.restaurant.update({
			where: { id: restaurantId },
			data: updateData,
		});

		return res.status(200).json(responseWrapper.success(restaurant));
	} catch (error) {
		console.error("updateRestaurant error:", error);
		return res.status(500).json(responseWrapper.error());
	}
};

const getRestaurant = async (req: AuthRequest, res: Response) => {
	try {
		const cognitoSub = req.user?.sub;
		const restaurantId = Number(req.params.restaurantId);

		if (!cognitoSub) {
			return res
				.status(401)
				.json(responseWrapper.error(ErrorMessages.UNAUTHORIZED));
		}

		if (isNaN(restaurantId)) {
			return res
				.status(400)
				.json(responseWrapper.error("Invalid restaurant ID"));
		}

		const userRestaurant = await prisma.userRestaurant.findFirst({
			where: {
				restaurantId,
				user: { cognitoSub },
			},
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
		});

		if (!userRestaurant) {
			return res
				.status(404)
				.json(responseWrapper.error("Restaurant not found"));
		}

		const restaurant = {
			id: userRestaurant.restaurant.id,
			name: userRestaurant.restaurant.name,
			menuUrl: userRestaurant.restaurant.menuUrl,
			address: userRestaurant.restaurant.address,
			phone: userRestaurant.restaurant.phone,
			email: userRestaurant.restaurant.email,
			website: userRestaurant.restaurant.website,
			facebook: userRestaurant.restaurant.facebook,
			instagram: userRestaurant.restaurant.instagram,
			tiktok: userRestaurant.restaurant.tiktok,
			role: userRestaurant.role,
			categories: userRestaurant.restaurant.categories.map(
				(category) => ({
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
				}),
			),
		};

		return res.status(200).json(responseWrapper.success(restaurant));
	} catch (error) {
		console.error("getRestaurant error:", error);
		return res.status(500).json(responseWrapper.error());
	}
};

const checkSlug = async (req: Request, res: Response) => {
	try {
		const { slug } = req.params;
		const { excludeId } = req.query;

		if (!validateSlugFormat(slug)) {
			return res
				.status(400)
				.json(
					responseWrapper.error(
						"Slug can only contain lowercase letters, numbers, and hyphens",
					),
				);
		}

		const exists = await prisma.restaurant.findFirst({
			where: {
				menuUrl: slug,
				...(excludeId && {
					id: { not: parseInt(excludeId as string) },
				}),
			},
		});

		if (exists) {
			return res
				.status(400)
				.json(responseWrapper.error(`Already taken. Try ${slug}-2`));
		}
		return res
			.status(200)
			.json(responseWrapper.success({ available: true }));
	} catch (error) {
		console.error("checkSlug error:", error);
		return res.status(500).json(responseWrapper.error());
	}
};

export const restaurantController = {
	createRestaurant,
	getRestaurant,
	updateRestaurant,
	getRestaurantsList,
	checkSlug,
};
