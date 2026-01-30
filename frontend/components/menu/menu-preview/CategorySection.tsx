"use client";

import { MenuItemCard } from "./MenuItemCard";
import { MenuCategory, MenuItem } from "@/types";

export const CategorySection = ({
	category,
	onItemClick,
}: {
	category: MenuCategory;
	onItemClick: (item: MenuItem) => void;
}) => {
	return (
		<div className="mb-4">
			<div className="sticky top-0 z-10 bg-white/95 px-4 py-2 backdrop-blur-sm">
				<h3 className="text-[18px] font-bold text-gray-900">
					{category.name}
				</h3>
				{category.description && (
					<p className="text-[11px] text-gray-500">
						{category.description}
					</p>
				)}
			</div>
			<div>
				{category.menuItems.map((item) => (
					<MenuItemCard
						key={item.id}
						item={item}
						onTap={() => onItemClick(item)}
					/>
				))}
			</div>
		</div>
	);
};
