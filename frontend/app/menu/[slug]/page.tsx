import { Menu } from "@/components/menu/menu-preview/Menu";
import { getMenuData } from "@/services/menu";
import { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const menuRes = await getMenuData(slug);
	const restaurant = menuRes.data;

	if (!restaurant) {
		return {
			title: "Menu | Foodhub",
			description: "View our menu",
		};
	}

	return {
		title: `${restaurant.name} | Menu`,
		description:
			restaurant.tagline || `View the menu for ${restaurant.name}`,
		openGraph: {
			title: `${restaurant.name} | Menu`,
			description:
				restaurant.tagline || `View the menu for ${restaurant.name}`,
			images:
				restaurant.coverPhotoUrl || restaurant.logoUrl
					? [restaurant.coverPhotoUrl || restaurant.logoUrl]
					: [],
		},
	};
}

export default async function MenuPage({ params }: Props) {
	const { slug } = await params;
	const menuRes = await getMenuData(slug);

	return <Menu menuDetails={menuRes.data} />;
}
