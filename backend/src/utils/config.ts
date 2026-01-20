import jwt from "jsonwebtoken";

export const config = {
	environment: process.env.NODE_ENV || "development",
	port: parseInt(process.env.PORT || "4000", 10),
	database: {
		url: process.env.DATABASE_URL || "",
	},
	jwt: {
		secret: process.env.JWT_SECRET || "your-secret-key",
		expiresIn: (process.env.JWT_EXPIRES_IN ||
			"7d") as jwt.SignOptions["expiresIn"], // 7 days
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	},
	cors: {
		origin: process.env.CORS_ORIGIN || "*",
	},
	logging: {
		level: process.env.LOG_LEVEL || "info",
	},
};
