import { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import { ApiResponse } from "@shared/types/api-response.js";
import { Restaurant } from "@shared/types/restaurants.js";

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const allUsers = await prisma.user.findMany();

		const response: ApiResponse<typeof allUsers> = {
			success: true,
			data: allUsers,
		};

		res.json(response);
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "adminController:getAllUsers - Failed to fetch users",
		});
	}
};

const getAllRestaurants = async (req: Request, res: Response) => {
	try {
		const restaurants: Restaurant[] = await prisma.restaurant.findMany({
			orderBy: { name: "asc" },
		});

		const response: ApiResponse<typeof restaurants> = {
			success: true,
			data: restaurants,
		};

		res.json(response);
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "adminController:getAllRestaurants - Failed to fetch restaurants",
		});
	}
};

export const adminController = { getAllUsers, getAllRestaurants };
