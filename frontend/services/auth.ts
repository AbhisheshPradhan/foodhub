import { api } from "@/api/client";

export async function getOrCreateUser() {
	try {
		const response = await api.post("/users");
		return response.data;
	} catch (error) {
		console.error("error creating user", error);
		throw new Error("Error creating user");
	}
}
