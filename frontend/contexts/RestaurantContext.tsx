"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
	useCallback,
	useRef,
} from "react";

import { getUserRestaurants } from "@/services/restaurants";
import { useAuth } from "./AuthContext";
import { Restaurant } from "@/types";

interface RestaurantContextType {
	isLoading: boolean;
	restaurants: Restaurant[];
	refreshRestaurants: () => Promise<void>;
	draftRestaurant: Restaurant | null;
	selectedRestaurant: Restaurant | null;
	setSelectedRestaurant: (restaurant: Restaurant) => void;
	designerActiveCategoryId: number | null;
	setDesignerActiveCategoryId: (categoryId: number) => void;
	updateDraftRestaurantDetails: (attr: string, value: string) => void;
	updateSelectedRestaurantDetails: (restaurantDetails: Restaurant) => void;
	resetDraftRestaurantState: () => void;
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
	const [draftRestaurant, setDraftRestaurantState] =
		useState<Restaurant | null>(null);
	const [designerActiveCategoryId, setDesignerActiveCategoryIdState] =
		useState<number | null>(null);

	const selectedRestaurantRef = useRef<Restaurant | null>(null);
	selectedRestaurantRef.current = selectedRestaurant;

	const updateSelectedRestaurantDetails = useCallback(
		(restaurantDetails: Restaurant) => {
			selectedRestaurantRef.current = restaurantDetails;
			setSelectedRestaurantState(restaurantDetails);
		},
		[],
	);

	const updateDraftRestaurantDetails = (attr: string, value: string) => {
		setDraftRestaurantState((prev) => {
			return {
				...prev,
				[attr]: value,
			};
		});
	};

	const resetDraftRestaurantState = useCallback(() => {
		setDraftRestaurantState(selectedRestaurantRef.current);
	}, []);

	// Change selected restaurant
	const setSelectedRestaurant = (restaurant: Restaurant) => {
		setSelectedRestaurantState(restaurant);
		setDraftRestaurantState(restaurant);
		localStorage.setItem("selectedRestaurantId", restaurant.id.toString());
	};

	const setDesignerActiveCategoryId = (categoryId: number) => {
		setDesignerActiveCategoryIdState(categoryId);
	};

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
			setDraftRestaurantState(initialSelected!);
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
			setDraftRestaurantState(null);
		} finally {
			setIsLoading(false);
		}
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
				draftRestaurant,
				selectedRestaurant,
				isLoading,
				refreshRestaurants,
				setSelectedRestaurant,
				designerActiveCategoryId,
				setDesignerActiveCategoryId,
				updateDraftRestaurantDetails,
				updateSelectedRestaurantDetails,
				resetDraftRestaurantState,
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
