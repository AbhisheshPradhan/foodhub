import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";

import { prisma } from "../lib/prisma.js";
import { config } from "../utils/config.js";
import { ErrorMessages, responseWrapper } from "../utils/api-response.js";
import {
    CreateUserDto,
    LoginResponseDto,
    SignUpResponseDto,
} from "@shared/types/user.js";

export interface AuthRequest extends Request {
    userId?: number;
}

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
});

const login = async (req: Request, res: Response) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json(responseWrapper.error(error.details[0].message));
        }

        const { email, password } = value;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return res
                .status(400)
                .json(responseWrapper.error(ErrorMessages.INVALID_LOGIN));
        }

        const isValidPassword = await bcrypt.compare(
            password,
            existingUser.password,
        );
        if (!isValidPassword) {
            return res
                .status(400)
                .json(responseWrapper.error(ErrorMessages.INVALID_LOGIN));
        }

        setJwtToken(res, existingUser.id);

        let resObj: LoginResponseDto = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            restaurantId: existingUser.restaurantId,
        };

        res.status(200).json(responseWrapper.success(resObj));
    } catch (error) {
        console.error("login error:", error);
        res.status(500).json(responseWrapper.error());
    }
};

const setJwtToken = (res: Response, userId: number) => {
    const token = jwt.sign(
        {
            userId,
        },
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiresIn,
        },
    );
    res.cookie("token", token, {
        httpOnly: true,
        secure: config.environment === "production",
        sameSite: "strict",
    });
};

const signUpSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    confirmEmail: Joi.ref("email"),
    password: Joi.string().min(8).max(16).required(),
});

const signUp = async (req: Request, res: Response) => {
    try {
        const { error, value } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                error: error.details[0].message,
            });
        }

        const { name, email, password } = value;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res
                .status(409)
                .json(responseWrapper.error(ErrorMessages.USER_EXISTS));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await prisma.$transaction(async (tx) => {
            const restaurant = await tx.restaurant.create({
                data: {
                    name: "My Restaurant",
                },
            });
            const newUser: CreateUserDto = {
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

        setJwtToken(res, result.user.id);

        const resObj: SignUpResponseDto = {
            user: {
                id: result.user.id,
                name: result.user.name,
                role: result.user.role,
                email: result.user.email,
            },
            restaurant: result.restaurant,
        };

        return res.status(201).json(responseWrapper.success(resObj));
    } catch (error) {
        console.error("signUp error:", error);
        res.status(500).json(responseWrapper.error());
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: config.environment === "production",
        });
        return res
            .status(200)
            .json(responseWrapper.successNoData("Logged out"));
    } catch (error) {
        console.error("logout error:", error);
        res.status(500).json(responseWrapper.error());
    }
};

const me = async (req: AuthRequest, res: Response) => {
    try {
        let userId = req.userId;
        if (!userId) {
            return res
                .status(401)
                .json(responseWrapper.error(ErrorMessages.NOT_AUTHENTICATED));
        }
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        return res.status(200).json(responseWrapper.success(existingUser));
    } catch (error) {
        console.error("logout error:", error);
        res.status(500).json(responseWrapper.error());
    }
};

export const authController = { login, signUp, logout, me };
