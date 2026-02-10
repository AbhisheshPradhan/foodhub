"use client";

import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";

import {
	useRestaurantsQuery,
	useSelectedRestaurantQuery,
} from "@/hooks/useRestaurantsQuery";
import { useAuth } from "./AuthContext";
import { MenuCategory, Restaurant } from "@/types";

interface RestaurantContextType {
	isLoading: boolean;
	restaurants: Restaurant[];
	refetchRestaurants: () => void;
	selectedRestaurant: Restaurant | null;
	setSelectedRestaurant: (restaurant: Restaurant) => void;
	designerActiveCategoryId: number | null;
	setDesignerActiveCategoryId: (categoryId: number) => void;
	draftRestaurant: Restaurant | null;
	updateDraftRestaurantDetails: (attr: string, value: string) => void;
	updateDraftCategories: (categories: MenuCategory[]) => void;
	resetDraftRestaurantState: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
	undefined,
);

export function RestaurantProvider({ children }: { children: ReactNode }) {
	const { user, isLoading: authLoading } = useAuth();

	const {
		data: restaurants = [],
		isLoading: listLoading,
		refetch,
	} = useRestaurantsQuery();

	const [selectedRestaurantId, setSelectedRestaurantId] = useState<
		number | null
	>(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("selectedRestaurantId");
			return stored ? Number(stored) : null;
		}
		return null;
	});

	const restaurantIdToFetch =
		selectedRestaurantId ??
		(restaurants.length > 0 ? restaurants[0].id : null);

	const {
		data: selectedRestaurant = null,
		isLoading: restaurantLoading,
		refetch: refetchSelectedRestaurant,
	} = useSelectedRestaurantQuery(restaurantIdToFetch);

	const [designerActiveCategoryId, setDesignerActiveCategoryIdState] =
		useState<number | null>(null);

	const [draftRestaurantId, setDraftRestaurantId] = useState<number | null>(
		null,
	);
	const [draftRestaurant, setDraftRestaurant] = useState<Restaurant | null>(
		null,
	);
	const draftRestaurantRef = useRef<Restaurant | null>(null);
	useEffect(() => {
		draftRestaurantRef.current = draftRestaurant;
	}, [draftRestaurant]);

	useEffect(() => {
		if (selectedRestaurant && selectedRestaurant.id !== draftRestaurantId) {
			setDraftRestaurantId(selectedRestaurant.id);
			setDraftRestaurant(selectedRestaurant);

			if (selectedRestaurant.id !== selectedRestaurantId) {
				setSelectedRestaurantId(selectedRestaurant.id);
				localStorage.setItem(
					"selectedRestaurantId",
					selectedRestaurant.id.toString(),
				);
			}
		}
	}, [
		selectedRestaurant,
		draftRestaurantId,
		selectedRestaurantId,
		setDraftRestaurantId,
	]);

	const isLoading = authLoading || listLoading || restaurantLoading;

	const setSelectedRestaurant = useCallback((restaurant: Restaurant) => {
		setSelectedRestaurantId(restaurant.id);
		setDraftRestaurantId(restaurant.id);
		setDraftRestaurant(restaurant);
		localStorage.setItem("selectedRestaurantId", restaurant.id.toString());
	}, []);

	const setDesignerActiveCategoryId = useCallback((categoryId: number) => {
		setDesignerActiveCategoryIdState(categoryId);
	}, []);

	const updateDraftRestaurantDetails = useCallback(
		(attr: string, value: string) => {
			setDraftRestaurant((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					[attr]: value,
				};
			});
		},
		[],
	);

	const updateDraftCategories = useCallback((categories: MenuCategory[]) => {
		setDraftRestaurant((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				categories,
			};
		});
	}, []);

	const resetDraftRestaurantState = useCallback(() => {
		if (selectedRestaurant) {
			setDraftRestaurant(selectedRestaurant);
		}
	}, [selectedRestaurant]);

	const refetchRestaurants = useCallback(() => {
		if (user) {
			refetch();
			refetchSelectedRestaurant();
		}
	}, [user, refetch, refetchSelectedRestaurant]);

	const value = useMemo(
		() => ({
			isLoading,
			restaurants,
			refetchRestaurants,
			selectedRestaurant,
			setSelectedRestaurant,
			designerActiveCategoryId,
			setDesignerActiveCategoryId,
			draftRestaurant,
			updateDraftRestaurantDetails,
			updateDraftCategories,
			resetDraftRestaurantState,
		}),
		[
			isLoading,
			restaurants,
			refetchRestaurants,
			selectedRestaurant,
			setSelectedRestaurant,
			designerActiveCategoryId,
			setDesignerActiveCategoryId,
			draftRestaurant,
			updateDraftRestaurantDetails,
			updateDraftCategories,
			resetDraftRestaurantState,
		],
	);

	return (
		<RestaurantContext.Provider value={value}>
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
