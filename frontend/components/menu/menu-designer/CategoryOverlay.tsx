"use client";

import { ChevronDown, GripVertical } from "lucide-react";

import { MenuCategory } from "@/types";

export const CategoryOverlay = ({ category }: { category: MenuCategory }) => {
	const overlayStyle = {
		transform: "translate3d(5px, 5px, 0) scale(1.025)",
		boxShadow:
			"0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 6px 0 rgba(34, 33, 81, 0.3)",
		cursor: "grabbing",
	};

	return (
		<div
			style={overlayStyle}
			className="rounded-xl border border-gray-200 bg-white relative flex items-center gap-2 px-3 py-3"
		>
			<button className="shrink-0 touch-none text-gray-400 hover:text-gray-600 cursor-grabbing">
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
