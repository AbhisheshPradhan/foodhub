import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";

import { prisma } from "../lib/prisma.js";
import { config } from "../../config.js";

export interface AuthRequest extends Request {
	userId: string;
}

const signUpSchema = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});

const signUp = async (req: Request, res: Response) => {
	try {
		const { error, value } = signUpSchema.validate(req.body);
		if (error) {
			return res.status(400).json({
				message: error.details[0].message,
			});
		}

		const { name, email, password } = value;

		const userExists = await prisma.user.findUnique({
			where: { email },
		});
		if (userExists) {
			return res.status(409).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await prisma.$transaction(async (tx) => {
			const restaurant = await tx.restaurant.create({
				data: {
					name: "My Restaurant",
				},
			});
			const newUser = {
				name,
				email,
				password: hashedPassword,
				role: "owner",
				isActive: true,
				restaurantId: restaurant.id,
			};
			const user = await tx.user.create({ data: newUser });
			return { restaurant, user };
		});

		const token = jwt.sign(
			{
				userId: result.user.id,
				restaurantId: result.user.restaurantId,
				role: result.user.role,
			},
			config.jwt.secret,
			{
				expiresIn: config.jwt.expiresIn,
			}
		);
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: config.jwt.maxAge, // 7 days
		});
		res.status(201).json({
			user: {
				id: result.user.id,
				name: result.user.name,
				role: result.user.role,
				email: result.user.email,
			},
			restaurant: result.restaurant,
		});
	} catch (error) {
		console.error("Signup error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// const login = async (req: Request, res: Response) => {
// 	const { email, password } = req.body;

// 	const user = await prisma.user.findUnique({ email });
// 	if (!user) {
// 		return res
// 			.status(404)
// 			.json({ message: "Invalid username or password" });
// 	}

// 	const isValid = await bcrypt.compare(password, user.password);
// 	if (!isValid) {
// 		return res
// 			.status(400)
// 			.json({ message: "Invalid username or password" });
// 	}
// 	const token = jwt.sign({ id: user.id }, config.jwt.secret, {
// 		expiresIn: "1d",
// 	});
// 	res.cookie("token", token, {
// 		httpOnly: true,
// 		secure: process.env.NODE_ENV === "production",
// 		sameSite: "strict",
// 	});
// 	res.status(200).json({
// 		_id: user.id,
// 		email,
// 		avatar: user.avatar,
// 	});
// };

// const logout = async (req: Request, res: Response) => {
// 	res.clearCookie("token", {
// 		httpOnly: true,
// 		sameSite: "strict",
// 		secure: process.env.NODE_ENV === "production",
// 	});

// 	res.status(200).json({ message: "Logged out" });
// };

// const me = async (req: AuthRequest, res: Response) => {
// 	let userId = req.userId;
// 	const user = await prisma.user.findFirst(userId).select("username avatar");
// 	res.json(user);
// };

export const authController = { signUp };
