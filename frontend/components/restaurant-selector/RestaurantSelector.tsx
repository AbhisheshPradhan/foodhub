"use client";

import { useRestaurants } from "@/contexts/RestaurantContext";

export function RestaurantSelector() {
	const { isLoading, selectedRestaurant } = useRestaurants();

	if (isLoading) {
		return (
			<div className="bg-gray-200 size-10 animate-pulse dark:bg-gray-700 w-60" />
		);
	}

	return (
		<div className="flex flex-col w-60">
			<div className="font-bold">{selectedRestaurant?.name}</div>
			<div className="font-light text-theme-xs">
				{selectedRestaurant?.address}
			</div>
		</div>
	);
}
