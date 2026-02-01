import { Response, NextFunction } from "express";

import { AuthRequest } from "../controllers/auth.controller.js";
import { ErrorMessages, responseWrapper } from "../utils/api-response.js";
import { verifyToken } from "../lib/aws.js";
export const authenticate = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const accessToken = req.cookies?.accessToken
		? decodeURIComponent(req.cookies.accessToken)
		: null;

	const idToken = req.cookies?.idToken
		? decodeURIComponent(req.cookies.idToken)
		: null;

	if (!accessToken) {
		return res
			.status(401)
			.json(responseWrapper.error(ErrorMessages.NOT_AUTHENTICATED));
	}

	try {
		const accessPayload = await verifyToken(accessToken, "access");
		req.user = {
			sub: accessPayload.sub,
		};

		if (idToken) {
			try {
				const idPayload = await verifyToken(idToken, "id");
				req.user.email = idPayload.email;
				req.user.name = idPayload.name;
			} catch (err) {
				console.warn("ID token verification failed:", err.message);
			}
		} else {
			console.warn("No ID token provided in cookies");
		}

		next();
	} catch (error) {
		// console.error("Access token error:", error);
		return res
			.status(401)
			.json(responseWrapper.error(ErrorMessages.INVALID_TOKEN));
	}
};
