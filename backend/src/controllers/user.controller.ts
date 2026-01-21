import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const userController = {
    getAllUsers: async (req: Request, res: Response) => {
        const users = await prisma.user.findMany();
        res.json({ success: true, data: users });
    },
};
