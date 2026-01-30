"use client";

import { useRestaurants } from "@/contexts/RestaurantContext";

export function RestaurantSelector() {
	const { selectedRestaurant } = useRestaurants();

	return (
		<div className="flex flex-col">
			<div className="font-bold">{selectedRestaurant?.name}</div>
			<div className="font-light text-theme-xs">
				{selectedRestaurant?.address}
			</div>
		</div>
	);
}
