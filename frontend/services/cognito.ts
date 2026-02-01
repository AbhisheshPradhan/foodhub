import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails,
	CognitoUserAttribute,
	CognitoUserSession,
} from "amazon-cognito-identity-js";

const poolData = {
	UserPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID!,
	ClientId: process.env.NEXT_PUBLIC_AWS_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

export function getCognitoUser() {
	return new Promise((resolve, reject) => {
		const cognitoUser = userPool.getCurrentUser();
		if (!cognitoUser) {
			document.cookie = "accessToken=; path=/; max-age=0";
			document.cookie = "idToken=; path=/; max-age=0";
			reject(new Error("No user found"));
			return;
		}

		cognitoUser.getSession((error, session: CognitoUserSession) => {
			if (error) {
				reject(error);
				return;
			}

			const accessToken = session.getAccessToken().getJwtToken();
			const idToken = session.getIdToken().getJwtToken();
			document.cookie = `accessToken=${encodeURIComponent(accessToken)}; path=/; max-age=${60 * 60 * 24}`;
			document.cookie = `idToken=${encodeURIComponent(idToken)}; path=/; max-age=${60 * 60 * 24}`;

			// If session is valid, just return tokens
			cognitoUser.getUserAttributes((err, attributes) => {
				if (err) {
					reject(err);
				}

				const user: Record<string, string> = {};
				attributes?.forEach((attr) => {
					user[attr.Name] = attr.Value;
				});
				resolve(user);
			});
			return;
		});
	});
}

export function signIn(email: string, password: string) {
	const authenticationDetails = new AuthenticationDetails({
		Username: email,
		Password: password,
	});
	const cognitoUser = new CognitoUser({
		Username: email,
		Pool: userPool,
	});

	return new Promise((resolve, reject) => {
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: (result) => {
				const accessToken = result.getAccessToken().getJwtToken();
				const idToken = result.getIdToken().getJwtToken();
				document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
				document.cookie = `idToken=${idToken}; path=/; max-age=${60 * 60 * 24 * 7}`;

				cognitoUser.getUserAttributes((err, attributes) => {
					if (err) {
						reject(err);
					}

					const user: Record<string, string> = {};
					attributes?.forEach((attr) => {
						user[attr.Name] = attr.Value;
					});
					resolve(user);
				});
			},
			onFailure: (err) => {
				reject(err);
			},
		});
	});
}

export function signUp(name: string, email: string, password: string) {
	const attributeList = [
		new CognitoUserAttribute({
			Name: "email",
			Value: email,
		}),
		new CognitoUserAttribute({
			Name: "name",
			Value: name,
		}),
	];
	return new Promise((resolve, reject) => {
		userPool.signUp(email, password, attributeList, [], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(result?.user);
		});
	});
}

export function confirmSignUp(email: string, code: string) {
	const cognitoUser = new CognitoUser({
		Username: email,
		Pool: userPool,
	});
	return new Promise((resolve, reject) => {
		cognitoUser.confirmRegistration(code, true, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result);
		});
	});
}

export function resendConfirmationCode(email: string) {
	const cognitoUser = new CognitoUser({
		Username: email,
		Pool: userPool,
	});
	return new Promise((resolve, reject) => {
		cognitoUser.resendConfirmationCode((err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result);
		});
	});
}

export function signOut() {
	const cognitoUser = userPool.getCurrentUser();

	return new Promise((resolve, reject) => {
		try {
			cognitoUser?.signOut();
			document.cookie = "accessToken=; path=/; max-age=0";
			document.cookie = "idToken=; path=/; max-age=0";
			resolve(true);
		} catch (error) {
			reject(error);
		}
	});
}

export function forgotPassword(email: string): Promise<void> {
	const user = new CognitoUser({
		Username: email,
		Pool: userPool,
	});

	return new Promise((resolve, reject) => {
		user.forgotPassword({
			onSuccess: (result) => resolve(result),
			onFailure: (err) => reject(err),
		});
	});
}

export function confirmNewPassword(
	email: string,
	code: string,
	newPassword: string,
): Promise<string> {
	const user = new CognitoUser({
		Username: email,
		Pool: userPool,
	});

	return new Promise((resolve, reject) => {
		user.confirmPassword(code, newPassword, {
			onSuccess: (result) => resolve(result),
			onFailure: (err) => reject(err),
		});
	});
}
