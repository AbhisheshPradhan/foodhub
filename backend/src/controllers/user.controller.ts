import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ErrorMessages, responseWrapper } from "../utils/api-response.js";
import { LoginResponseDto, SignUpResponseDto } from "@shared/types/user.js";
import { AuthRequest } from "./auth.controller.js";

export const getAllUsers = async (req: Request, res: Response) => {
	const users = await prisma.user.findMany();
	res.json({ success: true, data: users });
};

export const getOrCreateUser = async (req: AuthRequest, res: Response) => {
	try {
		const cognitoSub = req.user?.sub;
		if (!cognitoSub) {
			return res
				.status(401)
				.json(responseWrapper.error(ErrorMessages.NOT_AUTHENTICATED));
		}

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

		const { email, name } = req.user;

		if (!email) {
			return res
				.status(400)
				.json(responseWrapper.error("Email is required"));
		}

		user = await prisma.user.create({
			data: {
				name: name || email.split("@")[0],
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
