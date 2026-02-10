"use client";

import { useState } from "react";
import { useRestaurants } from "@/contexts/RestaurantContext";
import { Dropdown } from "@/components/ui/Dropdown";
import { Restaurant } from "@/types";

export const RestaurantsDropdown: React.FC = () => {
	const {
		isLoading,
		restaurants,
		selectedRestaurant,
		setSelectedRestaurant,
	} = useRestaurants();
	const [isOpen, setIsOpen] = useState(false);

	if (isLoading) {
		return (
			<div className="bg-gray-200 size-10 animate-pulse dark:bg-gray-700 w-60" />
		);
	}

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = () => {
		setIsOpen(false);
	};

	const handleSelectRestaurant = (restaurant: Restaurant) => {
		setSelectedRestaurant(restaurant);
		closeDropdown();
	};

	return (
		<div className="relative hidden md:block">
			<button
				onClick={toggleDropdown}
				className="flex items-center gap-2 w-60 text-left dropdown-toggle"
			>
				<div className="flex flex-col flex-1 min-w-0">
					<div className="font-bold truncate">
						{selectedRestaurant?.name}
					</div>
					<div className="font-light text-theme-xs truncate">
						{selectedRestaurant?.address}
					</div>
				</div>
				<svg
					className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			<Dropdown
				isOpen={isOpen}
				onClose={closeDropdown}
				className="left-0 right-auto w-60 p-2"
			>
				<ul className="flex flex-col gap-1">
					{restaurants.map((restaurant) => (
						<li key={restaurant.id}>
							<button
								onClick={() =>
									handleSelectRestaurant(restaurant)
								}
								className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 ${
									selectedRestaurant?.id === restaurant.id
										? "bg-gray-100 dark:bg-white/5"
										: ""
								}`}
							>
								<div className="font-medium text-gray-700 dark:text-gray-300 truncate">
									{restaurant.name}
								</div>
								<div className="font-light text-theme-xs text-gray-500 dark:text-gray-400 truncate">
									{restaurant.address}
								</div>
							</button>
						</li>
					))}
				</ul>
			</Dropdown>
		</div>
	);
};
