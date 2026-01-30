"use client";

import { GripVertical } from "lucide-react";

import { MenuItem } from "@/types";

export const MenuItemOverlay = ({ item }: { item: MenuItem }) => {
	return (
		<div className="flex items-center gap-3 rounded-lg border border-brand-300 bg-white px-3 py-2.5 shadow-lg">
			<span className="shrink-0 text-gray-400">
				<GripVertical size={16} />
			</span>
			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-2">
					<span className="truncate text-sm font-medium text-gray-900">
						{item.name}
					</span>
					<span className="shrink-0 text-sm font-semibold text-gray-700">
						${item.price}
					</span>
				</div>
			</div>
		</div>
	);
};
