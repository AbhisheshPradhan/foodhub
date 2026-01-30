import { api } from "@/api/client";

export async function updateRestaurant(restaurantDetails) {
	try {
		const response = await api.post("/restaurants", restaurantDetails);
		console.log("updateRestaurant response", response);
		return response.data;
	} catch (error) {
		console.error("error creating restaurant", error);
		throw new Error("Error creating restaurant");
	}
}

export async function getUserRestaurants() {
	try {
		const response = await api.get("/restaurants");
		return response.data;
	} catch (error) {
		console.error("error creating restaurant", error);
	}
}
