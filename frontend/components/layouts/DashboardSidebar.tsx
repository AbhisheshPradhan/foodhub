"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	BookOpen,
	Store,
	SlidersHorizontal,
	Palette,
	type LucideIcon,
	QrCodeIcon,
} from "lucide-react";

export type DashboardPanelHref =
	| "designer"
	| "restaurant-details"
	| "preferences"
	| "branding"
	| "qr";

const sidebarItems: {
	label: string;
	href: DashboardPanelHref;
	icon: LucideIcon;
}[] = [
	{ label: "Menu Designer", href: "designer", icon: BookOpen },
	{ label: "Restaurant Details", href: "restaurant-details", icon: Store },
	{ label: "Preferences", href: "preferences", icon: SlidersHorizontal },
	{ label: "Branding", href: "branding", icon: Palette },
	{ label: "QR Code Editor", href: "qr", icon: QrCodeIcon },
];

export const DashboardSidebar = () => {
	const pathname = usePathname();

	return (
		<aside className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-800">
			<nav className="space-y-1 p-4">
				{sidebarItems.map((item) => {
					const isActive = pathname === `/dashboard/${item.href}`;
					return (
						<Link
							key={item.href}
							href={`/dashboard/${item.href}`}
							className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
								isActive
									? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
									: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
							}`}
						>
							<item.icon className="h-5 w-5" />
							{item.label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
};
