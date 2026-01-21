import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { config } from "../utils/config.js";
import { AuthRequest } from "../controllers/auth.controller.js";
import { ErrorMessages, responseWrapper } from "../utils/api-response.js";

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const token = req?.cookies?.token;

    if (!token)
        return res
            .status(401)
            .json(responseWrapper.error(ErrorMessages.NOT_AUTHENTICATED));

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as {
            userId: number;
        };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("token error:", error);
        return res
            .status(401)
            .json(responseWrapper.error(ErrorMessages.INVALID_TOKEN));
    }
};
