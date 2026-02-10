"use client";

import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "@/types";
import { getRestaurant, getRestaurantsList } from "@/services/restaurants";

export const restaurantsQueryKey = ["restaurants"] as const;
export const restaurantQueryKey = (id: number) => ["restaurant", id] as const;

export function useRestaurantsQuery() {
	return useQuery({
		queryKey: restaurantsQueryKey,
		queryFn: async (): Promise<Restaurant[]> => {
			const res = await getRestaurantsList();
			return res?.data ?? [];
		},
	});
}

export function useSelectedRestaurantQuery(restaurantId: number | null) {
	return useQuery({
		queryKey: restaurantQueryKey(restaurantId!),
		queryFn: async (): Promise<Restaurant> => {
			const res = await getRestaurant(restaurantId!);
			return res?.data;
		},
		enabled: !!restaurantId,
	});
}
