import { Menu } from "@/components/menu/menu-preview/Menu";
import { getMenuData } from "@/services/menu";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Menu | Foodhub",
	description: "menu view",
};

export default async function MenuPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const menuRes = await getMenuData(slug);

	return <Menu menuDetails={menuRes.data} />;
}
