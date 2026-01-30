import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AppNav } from "@/components/layouts/AppNav";
import { AuthProvider } from "@/contexts/AuthContext";
import { RestaurantProvider } from "@/contexts/RestaurantContext";

export const metadata: Metadata = {
	title: "Dashboard | Foodhub",
	description:
		"Create beautiful digital menus for your restaurant in minutes. No design skills required.",
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const accesToken = cookieStore.get("accessToken");

	if (!accesToken) {
		redirect("/login");
	}

	return (
		<>
			<AuthProvider>
				<RestaurantProvider>
					<AppNav />
					{children}
				</RestaurantProvider>
			</AuthProvider>
		</>
	);
}
