import { Category } from "./category";

export interface MenuItem {
	id: number;
	categoryId: number;
	name: string;
	description: string | null;
	price: number; // Decimal converted to number
	imageUrl: string | null;
	isAvailable: boolean;
	isVegetarian: boolean;
	isVegan: boolean;
	isGlutenFree: boolean;
	isSpicy: boolean;
	spiceLevel: number; // 0-5 scale
	calories: number | null;
	preparationTime: number | null; // in minutes
	servings: string | null;
	displayOrder: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface Allergen {
	id: number;
	name: string;
	description: string | null;
	icon: string | null;
	createdAt: Date;
}

export interface MenuItemAllergen {
	itemId: number;
	allergenId: number;
}

export enum ModifierType {
	SIZE = "size",
	ADDON = "addon",
	SUBSTITUTION = "substitution",
	PREPARATION = "preparation",
}

export interface Modifier {
	id: number;
	itemId: number;
	name: string;
	description: string | null;
	priceAdjustment: number;
	isAvailable: boolean;
	modifierType: ModifierType;
	displayOrder: number;
	createdAt: Date;
}

export interface MenuItemWithDetails extends MenuItem {
	category: Category;
	allergens: Allergen[];
	modifiers: Modifier[];
}
