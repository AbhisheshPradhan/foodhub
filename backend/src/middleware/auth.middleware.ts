import { Response, NextFunction } from "express";

import { AuthRequest } from "../controllers/auth.controller.js";
import { ErrorMessages, responseWrapper } from "../utils/api-response.js";
import { verifyToken } from "../lib/aws.js";

export const authenticate = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const accessToken = req.cookies?.accessToken;
	const idToken = req.cookies?.idToken;

	if (!accessToken) {
		return res
			.status(401)
			.json(responseWrapper.error(ErrorMessages.NOT_AUTHENTICATED));
	}

	try {
		const decodedAccessToken = await verifyToken(accessToken, "access");
		req.cognitoSub = decodedAccessToken.sub;

		if (idToken) {
			const decodedIdToken = await verifyToken(idToken, "id");
			req.email = decodedIdToken.email;
			req.name = decodedIdToken.name;
		}

		next();
	} catch (error) {
		console.error("token error:", error);
		return res
			.status(401)
			.json(responseWrapper.error(ErrorMessages.INVALID_TOKEN));
	}
};
