"use client";

import { ChevronDown, GripVertical } from "lucide-react";

import { MenuCategory } from "@/types";

export const CategoryOverlay = ({ category }: { category: MenuCategory }) => {
	return (
		<div className="rounded-xl border border-gray-200 bg-white shadow-lg relative flex items-center gap-2 px-3 py-3">
			<button className="shrink-0 cursor-grab touch-none text-gray-400 hover:text-gray-600">
				<GripVertical size={18} />
			</button>
			<button className="flex min-w-0 flex-1 items-center justify-between">
				<div className="min-w-0 text-left">
					<h3 className="truncate text-sm font-semibold text-gray-900">
						{category.name}
					</h3>
					{category.description && (
						<p className="truncate text-xs text-gray-500">
							{category.description}
						</p>
					)}
				</div>
				<div className="flex shrink-0 items-center gap-2">
					<span className="text-xs text-gray-400">
						{category.menuItems.length} items
					</span>
					<ChevronDown
						size={16}
						className={`text-gray-400 transition-transform`}
					/>
				</div>
			</button>
		</div>
	);
};
