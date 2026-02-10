import { api } from "@/api/client";
import { Restaurant } from "@/types";

export type CreateRestaurantDto = Omit<
	Restaurant,
	"id" | "createdAt" | "updatedAt"
>;

export type UpdateRestaurantDto = Partial<
	Omit<Restaurant, "id" | "createdAt" | "updatedAt">
>;

export async function createRestaurant(restaurantDetails: CreateRestaurantDto) {
	try {
		const response = await api.post("/restaurants", restaurantDetails);
		return response.data;
	} catch (error) {
		console.error("error creating restaurant", error);
		throw new Error("Error creating restaurant");
	}
}

export async function updateRestaurant(
	restaurantId: number,
	restaurantDetails: UpdateRestaurantDto,
) {
	try {
		const response = await api.patch(
			`/restaurants/${restaurantId}`,
			restaurantDetails,
		);
		return response.data;
	} catch (error) {
		console.error("error updating restaurant", error);
		throw new Error("Error updating restaurant");
	}
}

export async function getRestaurantsList() {
	try {
		const response = await api.get("/restaurants");
		return response.data;
	} catch (error) {
		console.error("error getting restaurants list", error);
	}
}

export async function getRestaurant(restaurantId: number) {
	try {
		const response = await api.get(`/restaurants/${restaurantId}`);
		return response.data;
	} catch (error) {
		console.error("error getting restaurant", error);
		throw new Error("Error getting restaurant");
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
