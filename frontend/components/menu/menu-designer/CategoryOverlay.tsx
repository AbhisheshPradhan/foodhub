"use client";

import { GripVertical } from "lucide-react";

import { MenuCategory } from "@/types";

export const CategoryOverlay = ({ category }: { category: MenuCategory }) => {
	return (
		<div className="rounded-xl border border-brand-300 bg-gray-50 shadow-lg">
			<div className="flex items-center gap-2 px-3 py-3">
				<span className="shrink-0 text-gray-400">
					<GripVertical size={18} />
				</span>
				<div className="min-w-0 flex-1">
					<h3 className="truncate text-sm font-semibold text-gray-900">
						{category.name}
					</h3>
					<p className="text-xs text-gray-500">
						{category.menuItems.length} items
					</p>
				</div>
			</div>
		</div>
	);
};
