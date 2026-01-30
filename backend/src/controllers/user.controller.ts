import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ErrorMessages, responseWrapper } from "../utils/api-response.js";
import { LoginResponseDto, SignUpResponseDto } from "@shared/types/user.js";

export const getAllUsers = async (req: Request, res: Response) => {
	const users = await prisma.user.findMany();
	res.json({ success: true, data: users });
};

export const getOrCreateUser = async (req: Request, res: Response) => {
	try {
		const cognitoSub = req.cognitoSub;

		if (!cognitoSub) {
			return res
				.status(500)
				.json(responseWrapper.error(ErrorMessages.DEFAULT));
		}

		// Check if user already exists
		let user = await prisma.user.findUnique({
			where: { cognitoSub },
		});

		if (user) {
			const resObj: LoginResponseDto = {
				id: user.id,
				name: user.name,
				email: user.email,
			};
			return res.status(200).json(responseWrapper.success(resObj));
		}

		// Create new user directly
		const { name, email } = req;
		user = await prisma.user.create({
			data: {
				name,
				email,
				cognitoSub,
				isActive: true,
			},
		});

		const resObj: LoginResponseDto = {
			id: user.id,
			name: user.name,
			email: user.email,
		};

		return res.status(201).json(responseWrapper.success(resObj));
	} catch (error) {
		console.error("getOrCreateUser error:", error);
		return res.status(500).json(responseWrapper.error());
	}
};

export const userController = {
	getAllUsers,
	getOrCreateUser,
};
