import { api } from "@/api/client";
import { CategoryOrder } from "@/types";

export interface UpdateMenuOrderPayload {
	categories: CategoryOrder[];
}

export const updateMenuOrder = async (
	restaurantId: number,
	updateOrderPayload: UpdateMenuOrderPayload,
) => {
	try {
		const response = await api.patch(
			`/restaurants/${restaurantId}/menu/order`,
			updateOrderPayload,
		);
		return response.data;
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
