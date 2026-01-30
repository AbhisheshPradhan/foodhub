"use client";

import { useState } from "react";
import { useRestaurants } from "@/contexts/RestaurantContext";
import {
	DashboardSidebar,
	type DashboardPanel,
} from "@/components/layouts/DashboardSidebar";
import { MenuDnD } from "@/components/menu/menu-designer/MenuDnD";
import { MenuPreview } from "@/components/menu/menu-preview/MenuPreview";
import { AppHeader } from "@/components/layouts/AppHeader";

export default function DashboardPage() {
	const { isLoading } = useRestaurants();
	const [activePanel, setActivePanel] =
		useState<DashboardPanel>("menu-designer");

	if (isLoading) return null;

	return (
		<div className="flex max-w-7xl h-[calc(100vh-85px)] mx-auto">
			<DashboardSidebar
				activePanel={activePanel}
				onSelect={setActivePanel}
			/>
			<main className="min-w-0 flex-1 overflow-y-hidden p-6 max-w-3xl">
				{activePanel === "menu-designer" && (
					<>
						<AppHeader
							heading="Menu Designer"
							description="Click to edit and drag to re-order categories and menu items"
						/>
						<MenuDnD />
					</>
				)}
				{activePanel === "restaurant-details" && (
					<>
						<AppHeader
							heading="Restaurant Details"
							description=""
						/>
						<p className="text-sm text-gray-500">
							Restaurant Details — coming soon
						</p>
					</>
				)}
				{activePanel === "preferences" && (
					<>
						<AppHeader
							heading="Preferences"
							description=""
						/>
						<p className="text-sm text-gray-500">
							Preferences — coming soon
						</p>
					</>
				)}
				{activePanel === "branding" && (
					<>
						<AppHeader
							heading="Branding"
							description=""
						/>
						<p className="text-sm text-gray-500">
							Branding — coming soon
						</p>
					</>
				)}
				{activePanel === "qr-code-editor" && (
					<>
						<AppHeader
							heading="QR Code Editor"
							description=""
						/>
						<p className="text-sm text-gray-500">
							QR Code Editor — coming soon
						</p>
					</>
				)}
			</main>
			{activePanel !== "qr-code-editor" ? (
				<aside className="shrink-0 border-l border-gray-200 p-6 content-center">
					<MenuPreview />
				</aside>
			) : (
				<aside className="shrink-0 border-l border-gray-200 p-6">
					QR Code
				</aside>
			)}
		</div>
	);
}
