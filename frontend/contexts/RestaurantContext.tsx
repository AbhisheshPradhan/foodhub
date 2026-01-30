"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

import { getUserRestaurants } from "@/services/restaurants";
import { useAuth } from "./AuthContext";
import { Restaurant } from "@/types";

interface RestaurantContextType {
	isLoading: boolean;
	restaurants: Restaurant[];
	refreshRestaurants: () => Promise<void>;
	selectedRestaurant: Restaurant | null;
	setSelectedRestaurant: (restaurant: Restaurant) => void;
	designerActiveCategoryId: number | null;
	setDesignerActiveCategoryId: (categoryId: number) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
	undefined,
);

export function RestaurantProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const { user, isLoading: authLoading } = useAuth();
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [selectedRestaurant, setSelectedRestaurantState] =
		useState<Restaurant | null>(null);

	const [designerActiveCategoryId, setDesignerActiveCategoryIdState] =
		useState<number | null>(null);

	const refreshRestaurants = async () => {
		if (!user) {
			setRestaurants([]);
			setSelectedRestaurantState(null);
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		try {
			const res = await getUserRestaurants();
			const fetchedRestaurants: Restaurant[] = res.data ?? [];
			setRestaurants(fetchedRestaurants);

			const storedId = localStorage.getItem("selectedRestaurantId");
			let initialSelected: Restaurant | null = null;

			if (storedId) {
				initialSelected =
					fetchedRestaurants.find((r) => r.id === Number(storedId)) ??
					null;
			}

			if (!initialSelected && fetchedRestaurants.length > 0) {
				initialSelected = fetchedRestaurants[0];
			}

			setSelectedRestaurantState(initialSelected!);
			if (initialSelected) {
				localStorage.setItem(
					"selectedRestaurantId",
					initialSelected.id.toString(),
				);
			}
		} catch (err) {
			console.error("Failed to fetch restaurants:", err);
			setRestaurants([]);
			setSelectedRestaurantState(null);
		} finally {
			setIsLoading(false);
		}
	};

	// Change selected restaurant
	const setSelectedRestaurant = (restaurant: Restaurant) => {
		setSelectedRestaurantState(restaurant);
		localStorage.setItem("selectedRestaurantId", restaurant.id.toString());
	};

	const setDesignerActiveCategoryId = (categoryId: number) => {
		setDesignerActiveCategoryIdState(categoryId);
	};

	useEffect(() => {
		if (!authLoading) {
			refreshRestaurants();
		}
	}, [user, authLoading]);

	return (
		<RestaurantContext.Provider
			value={{
				restaurants,
				selectedRestaurant,
				isLoading,
				refreshRestaurants,
				setSelectedRestaurant,
				designerActiveCategoryId,
				setDesignerActiveCategoryId,
			}}
		>
			{children}
		</RestaurantContext.Provider>
	);
}

export function useRestaurants() {
	const context = useContext(RestaurantContext);
	if (!context) {
		throw new Error(
			"useRestaurants must be used within a RestaurantProvider",
		);
	}
	return context;
}
