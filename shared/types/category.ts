import type { MenuItem } from "./menu-item";
import type { Restaurant } from "./restaurants";

export interface Category {
	id: number;
	restaurantId: number;
	name: string;
	description: string | null;
	isActive: boolean;
	createdAt: Date;
}

export interface CategoryWithItems extends Category {
	restaurant: Restaurant;
	menuItems: MenuItem[];
}
