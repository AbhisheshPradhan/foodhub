export interface NepaliMenuItemTemplate {
	name: string;
	description: string;
	price: string;
	imageUrl: string | null;
	allergens: { name: string; description: string; icon: string }[];
}

export const COMMON_ALLERGENS = [
	{
		name: "Dairy",
		description: "Contains milk, cheese, or dairy products",
		icon: "🥛",
	},
	{ name: "Eggs", description: "Contains eggs or egg products", icon: "🥚" },
	{ name: "Fish", description: "Contains fish or fish products", icon: "🐟" },
	{
		name: "Shellfish",
		description: "Contains shellfish like shrimp, crab, lobster",
		icon: "🦐",
	},
	{
		name: "Tree Nuts",
		description: "Contains almonds, walnuts, cashews, etc.",
		icon: "🌰",
	},
	{
		name: "Peanuts",
		description: "Contains peanuts or peanut products",
		icon: "🥜",
	},
	{ name: "Wheat", description: "Contains wheat or gluten", icon: "🌾" },
	{ name: "Soy", description: "Contains soy or soy products", icon: "🫘" },
	{ name: "Sesame", description: "Contains sesame seeds or oil", icon: "🫘" },
	{
		name: "Mustard",
		description: "Contains mustard or mustard seeds",
		icon: "🌶️",
	},
];

export const NEPALI_MENU_ITEMS: NepaliMenuItemTemplate[] = [
	{
		name: "Chicken Momo (Steamed)",
		description:
			"Steamed dumplings filled with seasoned minced chicken, served with tomato-sesame chutney",
		price: "12",
		imageUrl: null,
		allergens: [
			{
				name: "Wheat",
				description: "Contains wheat or gluten",
				icon: "🌾",
			},
			{
				name: "Sesame",
				description: "Contains sesame seeds or oil",
				icon: "🫘",
			},
		],
	},
	{
		name: "Chicken Momo (Chilli)",
		description:
			"Steamed then fried momos tossed with onion, capsicum and spicy sauce",
		price: "16",
		imageUrl: null,
		allergens: [
			{
				name: "Wheat",
				description: "Contains wheat or gluten",
				icon: "🌾",
			},
		],
	},
	{
		name: "Chicken Momo (Jhol)",
		description: "Steamed momos served in spicy Nepali jhol sauce",
		price: "14",
		imageUrl: null,
		allergens: [
			{
				name: "Wheat",
				description: "Contains dumpling wrapper",
				icon: "🌾",
			},
			{
				name: "Sesame",
				description: "Jhol may contain sesame",
				icon: "🫘",
			},
		],
	},
	{
		name: "Veg Momo (Steamed)",
		description:
			"Steamed dumplings filled with mixed vegetables and Nepali spices, served with chutney",
		price: "14",
		imageUrl: null,
		allergens: [
			{
				name: "Wheat",
				description: "Contains wheat or gluten",
				icon: "🌾",
			},
			{
				name: "Sesame",
				description: "Contains sesame seeds or oil",
				icon: "🫘",
			},
		],
	},
	{
		name: "Veg Momo (Fried, 10 pcs)",
		description: "Deep fried vegetable dumplings",
		price: "14",
		imageUrl: null,
		allergens: [
			{
				name: "Wheat",
				description: "Contains dumpling wrapper",
				icon: "🌾",
			},
		],
	},
	{
		name: "Buff Momo (Steamed)",
		description:
			"Steamed buffalo meat dumplings with aromatic spices, served with spicy tomato achar",
		price: "13",
		imageUrl: null,
		allergens: [
			{
				name: "Wheat",
				description: "Contains wheat or gluten",
				icon: "🌾",
			},
			{
				name: "Sesame",
				description: "Contains sesame seeds or oil",
				icon: "🫘",
			},
		],
	},
	{
		name: "Chow Mein",
		description:
			"Stir-fried noodles with vegetables and choice of chicken or buff, seasoned with soy and spices",
		price: "10",
		imageUrl: null,
		allergens: [
			{
				name: "Wheat",
				description: "Contains wheat or gluten",
				icon: "🌾",
			},
			{
				name: "Soy",
				description: "Contains soy or soy products",
				icon: "🫘",
			},
			{
				name: "Eggs",
				description: "Contains eggs or egg products",
				icon: "🥚",
			},
		],
	},
	{
		name: "Dal Bhat",
		description:
			"Traditional lentil soup served with steamed rice, seasonal vegetable curry, and pickles",
		price: "12",
		imageUrl: null,
		allergens: [],
	},
	{
		name: "Thakali Set",
		description:
			"Complete Thakali meal with rice, dal, meat curry, vegetables, achar, and papad",
		price: "14",
		imageUrl: null,
		allergens: [
			{
				name: "Wheat",
				description: "Contains wheat or gluten",
				icon: "🌾",
			},
			{
				name: "Dairy",
				description: "Contains milk, cheese, or dairy products",
				icon: "🥛",
			},
		],
	},
	{
		name: "Sel Roti",
		description:
			"Traditional ring-shaped sweet rice bread, crispy on the outside and soft inside",
		price: "4",
		imageUrl: null,
		allergens: [
			{
				name: "Dairy",
				description: "Contains milk, cheese, or dairy products",
				icon: "🥛",
			},
		],
	},
	{
		name: "Chatamari",
		description:
			"Newari rice crepe topped with minced meat, egg, and vegetables — the Nepali pizza",
		price: "9",
		imageUrl: null,
		allergens: [
			{
				name: "Eggs",
				description: "Contains eggs or egg products",
				icon: "🥚",
			},
		],
	},
	{
		name: "Sekuwa (Chicken)",
		description:
			"Smoky grilled chicken marinated in Nepali spices, served with beaten rice and salad",
		price: "13",
		imageUrl: null,
		allergens: [
			{
				name: "Mustard",
				description: "Contains mustard or mustard seeds",
				icon: "🌶️",
			},
		],
	},
	{
		name: "Sekuwa (Mutton)",
		description:
			"Tender grilled mutton pieces marinated in traditional spice paste, served with chiura",
		price: "15",
		imageUrl: null,
		allergens: [
			{
				name: "Mustard",
				description: "Contains mustard or mustard seeds",
				icon: "🌶️",
			},
		],
	},
	{
		name: "Aloo Tama",
		description:
			"Hearty curry of potatoes and fermented bamboo shoots in a tangy, spiced gravy",
		price: "8",
		imageUrl: null,
		allergens: [],
	},
	{
		name: "Gundruk ko Jhol",
		description:
			"Traditional fermented leafy greens soup, a staple Nepali comfort dish",
		price: "7.49",
		imageUrl: null,
		allergens: [],
	},
	{
		name: "Yomari",
		description:
			"Sweet steamed rice flour dumplings filled with chaku (molasses) and sesame, a Newari delicacy",
		price: "6",
		imageUrl: null,
		allergens: [
			{
				name: "Sesame",
				description: "Contains sesame seeds or oil",
				icon: "🫘",
			},
		],
	},
	{
		name: "Kwati",
		description:
			"Nutritious mixed sprouted bean soup with nine varieties of beans and warming spices",
		price: "8.49",
		imageUrl: null,
		allergens: [],
	},
	{
		name: "Choila (Chicken)",
		description:
			"Spicy grilled chicken tossed in Newari spices with mustard oil, served with chiura",
		price: "11",
		imageUrl: null,
		allergens: [
			{
				name: "Mustard",
				description: "Contains mustard or mustard seeds",
				icon: "🌶️",
			},
		],
	},
	{
		name: "Samay Baji",
		description:
			"Traditional Newari feast platter with chiura, choila, aloo achar, egg, and black soybeans",
		price: "13.49",
		imageUrl: null,
		allergens: [
			{
				name: "Eggs",
				description: "Contains eggs or egg products",
				icon: "🥚",
			},
			{
				name: "Soy",
				description: "Contains soy or soy products",
				icon: "🫘",
			},
			{
				name: "Mustard",
				description: "Contains mustard or mustard seeds",
				icon: "🌶️",
			},
		],
	},
	{
		name: "Bara (Wo)",
		description:
			"Savory lentil pancake made from black lentil batter, crispy and protein-rich",
		price: "5",
		imageUrl: null,
		allergens: [],
	},
	{
		name: "Juju Dhau",
		description:
			"Famous Bhaktapur king yogurt, a rich and creamy sweetened yogurt served in a clay pot",
		price: "4.49",
		imageUrl: null,
		allergens: [
			{
				name: "Dairy",
				description: "Contains milk, cheese, or dairy products",
				icon: "🥛",
			},
		],
	},
];
