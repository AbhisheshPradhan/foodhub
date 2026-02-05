import type { CurrencyCode } from "@/components/form/input/CurrencySelect";

export interface Allergen {
	id: number;
	name: string;
	description: string;
	icon: string;
}

export type ModifierType = "size" | "addon" | "substitution" | "preparation";

export interface Modifier {
	name: string;
	priceAdjustment: number;
	modifierType: ModifierType;
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

export type QrFrameType = "none";

export type QrPatternStyle =
	| "square"
	| "dots"
	| "rounded"
	| "classy"
	| "classy-rounded"
	| "extra-rounded";

export type QrCornerFrameStyle = "square" | "dot" | "extra-rounded";

export type QrCornerDotType = "square" | "dot" | "none";

export interface QrCodeConfig {
	frameType: QrFrameType;
	frameText: string;
	frameColor: string;
	frameBackgroundColor: string;
	frameTextColor: string;
	patternStyle: QrPatternStyle;
	dotColor: string;
	patternBackgroundColor: string;
	cornerFrameStyle: QrCornerFrameStyle;
	cornerDotType: QrCornerDotType;
	cornerFrameColor: string;
	cornerDotColor: string;
	useRestaurantLogo: boolean;
	logoUrl: string | null;
}

export interface Restaurant {
	id: number;
	name: string;
	menuUrl: string;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
	facebook?: string;
	instagram?: string;
	tiktok?: string;
	currency?: CurrencyCode;
	wifiName?: string;
	wifiPassword?: string;
	tagline?: string;
	announcement?: string;
	bannerMessage?: string;
	logoUrl?: string;
	coverPhotoUrl?: string;
	brandColor?: string;
	categories?: MenuCategory[];
	qrCodeConfig?: QrCodeConfig;
}
