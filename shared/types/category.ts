import { MenuItem } from "./menu-item";
import { Restaurant } from "./restaurants";

export interface Category {
	id: number;
	restaurantId: number;
	name: string;
	description: string | null;
	displayOrder: number;
	isActive: boolean;
	createdAt: Date;
}

export interface CategoryWithItems extends Category {
	restaurant: Restaurant;
	menuItems: MenuItem[];
}
