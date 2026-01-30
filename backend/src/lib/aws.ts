import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const region = "us-east-1";
const userPoolId = "us-east-1_i3y8m3oEA";
const clientId = process.env.COGNITO_CLIENT_ID;

const client = jwksClient({
	jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
	cache: true,
	rateLimit: true,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
	client.getSigningKey(header.kid!, (err, key) => {
		if (err) return callback(err, undefined);
		callback(null, key.getPublicKey());
	});
}

export function verifyToken(
	token: string,
	expectedTokenUse: "access" | "id" = "access",
): Promise<JwtPayload> {
	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			getKey,
			{
				algorithms: ["RS256"],
				issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
			},
			(err, decoded) => {
				if (err) return reject(err);

				const payload = decoded as JwtPayload;

				if (payload.token_use !== expectedTokenUse)
					return reject(
						new Error(`Expected a ${expectedTokenUse} token`),
					);

				if (
					expectedTokenUse === "access" &&
					clientId &&
					payload.client_id !== clientId
				) {
					return reject(new Error("Token client_id does not match"));
				}

				resolve(payload);
			},
		);
	});
}
