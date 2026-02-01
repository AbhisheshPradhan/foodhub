import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const clientId = process.env.COGNITO_CLIENT_ID;

const client = jwksClient({
	jwksUri: `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_i3y8m3oEA/.well-known/jwks.json`,
	cache: true,
	cacheMaxAge: 86400000, // 24 hours
	timeout: 30000, // 30 seconds
	rateLimit: true,
	jwksRequestsPerMinute: 10,
});

function getKey(header: jwt.JwtHeader): Promise<string> {
	return new Promise((resolve, reject) => {
		if (!header.kid) {
			return reject(new Error("No kid in token header"));
		}

		client.getSigningKey(header.kid, (err, key) => {
			if (err) {
				// console.error("getSigningKey error:", err);
				return reject(err);
			}
			if (!key) {
				return reject(new Error("No key returned"));
			}
			try {
				const signingKey = key.getPublicKey();
				resolve(signingKey);
			} catch (error) {
				reject(error);
			}
		});
	});
}

export async function verifyToken(
	token: string,
	expectedTokenUse: "access" | "id" = "access",
): Promise<JwtPayload> {
	const decoded = jwt.decode(token, { complete: true });

	if (!decoded || typeof decoded === "string") {
		throw new Error("Invalid token structure");
	}

	const payload = decoded.payload as JwtPayload;

	// Validate claims
	const now = Math.floor(Date.now() / 1000);

	if (payload.exp && payload.exp < now) {
		throw new Error("Token has expired");
	}

	if (payload.token_use !== expectedTokenUse) {
		throw new Error(`Expected a ${expectedTokenUse} token`);
	}

	if (
		payload.iss !==
		`https://cognito-idp.us-east-1.amazonaws.com/us-east-1_i3y8m3oEA`
	) {
		throw new Error("Invalid issuer");
	}

	if (
		expectedTokenUse === "access" &&
		clientId &&
		payload.client_id !== clientId
	) {
		throw new Error("Token client_id does not match");
	}

	// In development: skip signature verification entirely
	if (process.env.NODE_ENV !== "production") {
		console.log("🔧 Dev mode: skipping signature verification");
		return payload;
	}

	// Production only: verify signature
	try {
		const signingKey = await getKey(decoded.header);

		const verified = jwt.verify(token, signingKey, {
			algorithms: ["RS256"],
			issuer: `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_i3y8m3oEA`,
		}) as JwtPayload;

		console.log("✅ Token verified with signature");
		return verified;
	} catch (err) {
		console.error("❌ Signature verification failed:", err);
		throw new Error("Invalid token signature");
	}
}
