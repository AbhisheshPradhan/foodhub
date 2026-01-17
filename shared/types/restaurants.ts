import { Category } from "./category";
import { Allergen, MenuItem, Modifier } from "./menu-item";

export interface Restaurant {
	id: number;
	name: string;
	address: string | null;
	phone: string | null;
	email: string | null;
	website: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface RestaurantWithCategories extends Restaurant {
	categories: Category[];
}

export interface CompleteMenu {
	restaurant: Restaurant;
	categories: Array<{
		category: Category;
		items?: Array<{
			item: MenuItem;
			allergens?: Allergen[];
			modifiers?: Modifier[];
		}>;
	}>;
}

export type CreateRestaurantDto = Omit<
	Restaurant,
	"id" | "createdAt" | "updatedAt"
>;

export type UpdateRestaurantDto = Partial<
	Omit<Restaurant, "id" | "createdAt" | "updatedAt">
>;
