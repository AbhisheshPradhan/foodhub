import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AppNav } from "@/components/layouts/AppNav";
import { AuthProvider } from "@/contexts/AuthContext";
import { RestaurantProvider } from "@/contexts/RestaurantContext";
import { DashboardPreviewSection } from "@/components/layouts/DashboardPreviewSection";
import { DashboardSidebar } from "@/components/layouts/DashboardSidebar";
import { PathTracker } from "@/components/common/PathTracker";

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
					<div className="flex max-w-7xl h-[calc(100vh-85px)] mx-auto">
						<DashboardSidebar />
						<PathTracker href="/dashboard" />
						<main className="min-w-0 flex-1 overflow-y-hidden p-6 max-w-3xl">
							{children}
						</main>
						<DashboardPreviewSection />
					</div>
				</RestaurantProvider>
			</AuthProvider>
		</>
	);
}
