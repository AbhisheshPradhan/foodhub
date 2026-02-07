"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserRestaurants } from "@/services/restaurants";
import { Restaurant } from "@/types";

export const restaurantsQueryKey = ["restaurants"] as const;

export function useRestaurantsQuery() {
	return useQuery({
		queryKey: restaurantsQueryKey,
		queryFn: async (): Promise<Restaurant[]> => {
			const res = await getUserRestaurants();
			return res?.data ?? [];
		},
	});
}
