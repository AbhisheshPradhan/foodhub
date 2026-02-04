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

export const checkSlugAvailability = async (
	slug: string,
	excludeId?: number,
): Promise<{ available: boolean; error?: string }> => {
	try {
		const params = excludeId ? { excludeId } : {};
		const response = await api.get(`/restaurants/check-slug/${slug}`, {
			params,
		});
		return { available: true };
	} catch (error: any) {
		if (error.response?.status === 400) {
			return {
				available: false,
				error: error.response.data.error || "Menu Url not available",
			};
		}
		throw error;
	}
};
