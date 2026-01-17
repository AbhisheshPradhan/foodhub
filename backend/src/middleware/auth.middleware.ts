import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config.js";

interface AuthRequest extends Request {
	userId?: string;
}

export const authenticate = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;

	if (!token) return res.status(401).json({ message: "Not authenticated" });

	try {
		const decoded = jwt.verify(token, config.jwt.secret) as {
			id: string;
		};
		req.userId = decoded.id;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid token" });
	}
};
