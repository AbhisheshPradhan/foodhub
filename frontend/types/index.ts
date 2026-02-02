export interface Allergen {
	id: number;
	name: string;
	description: string;
	icon: string;
}

export interface Modifier {
	id: number;
	name: string;
	description: string;
	priceAdjustment: string;
	modifierType: string;
	displayOrder: number;
}

export interface MenuItem {
	id: number;
	categoryId: number;
	name: string;
	description: string;
	price: string;
	imageUrl: string | null;
	isVegetarian: boolean;
	isVegan: boolean;
	isGlutenFree: boolean;
	isSpicy: boolean;
	spiceLevel: number;
	calories: number;
	preparationTime: number;
	servings: number | null;
	allergens: Allergen[];
	modifiers: Modifier[];
}

export type EditableMenuItem = Omit<MenuItem, "id"> & {
	id?: number;
	categoryId?: number;
};

export interface MenuCategory {
	id: number;
	name: string;
	description: string;
	displayOrder: number;
	menuItems: EditableMenuItem[];
}

export type EditableCategory = {
	id?: number;
	name: string;
	description: string;
};

export interface Restaurant {
	id: number;
	name: string;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
	facebook?: string;
	instagram?: string;
	tiktok?: string;
	categories?: MenuCategory[];
}
