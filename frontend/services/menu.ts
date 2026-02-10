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
			`/restaurants/${restaurantId}/menu/reorder`,
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

export const getMenuData = async (slug: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/menu/${slug}`,
		);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return await res.json();
	} catch (error) {
		console.error("Fetch error:", error);
		return { data: null, error: String(error) };
	}
};
