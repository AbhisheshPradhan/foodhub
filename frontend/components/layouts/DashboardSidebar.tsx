"use client";

import {
	BookOpen,
	Store,
	SlidersHorizontal,
	Palette,
	type LucideIcon,
	QrCodeIcon,
} from "lucide-react";

export type DashboardPanel =
	| "menu-designer"
	| "restaurant-details"
	| "preferences"
	| "branding"
	| "qr-code-editor";

const sidebarItems: {
	label: string;
	panel: DashboardPanel;
	icon: LucideIcon;
}[] = [
	{ label: "Menu Designer", panel: "menu-designer", icon: BookOpen },
	{ label: "Restaurant Details", panel: "restaurant-details", icon: Store },
	{ label: "Preferences", panel: "preferences", icon: SlidersHorizontal },
	{ label: "Branding", panel: "branding", icon: Palette },
	{ label: "QR Code Editor", panel: "qr-code-editor", icon: QrCodeIcon },
];

export const DashboardSidebar = ({
	activePanel,
	onSelect,
}: {
	activePanel: DashboardPanel;
	onSelect: (panel: DashboardPanel) => void;
}) => {
	return (
		<aside className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-800">
			<nav className="space-y-1 p-4">
				{sidebarItems.map((item) => {
					const isActive = activePanel === item.panel;
					return (
						<button
							key={item.panel}
							onClick={() => onSelect(item.panel)}
							className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
								isActive
									? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
									: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
							}`}
						>
							<item.icon className="h-5 w-5" />
							{item.label}
						</button>
					);
				})}
			</nav>
		</aside>
	);
};
