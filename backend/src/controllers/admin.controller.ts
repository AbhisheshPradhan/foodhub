import { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import { ApiResponse, responseWrapper } from "../utils/api-response.js";
import { Restaurant } from "@shared/types/restaurants.js";

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const allUsers = await prisma.user.findMany();

		res.status(200).json(responseWrapper.success(allUsers));
	} catch (error) {
		res.status(500).json(responseWrapper.error("Failed to fetch users"));
	}
};

const getAllRestaurants = async (req: Request, res: Response) => {
	try {
		const restaurants: Restaurant[] = await prisma.restaurant.findMany({
			orderBy: { name: "asc" },
		});

		res.status(200).json(responseWrapper.success(restaurants));
	} catch (error) {
		res.status(500).json(
			responseWrapper.error("Failed to fetch restaurants")
		);
	}
};

export const adminController = { getAllUsers, getAllRestaurants };
