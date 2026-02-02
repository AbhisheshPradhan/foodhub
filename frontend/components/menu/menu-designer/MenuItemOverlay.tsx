"use client";

import { GripVertical } from "lucide-react";

import { MenuItem } from "@/types";

export const MenuItemOverlay = ({ item }: { item: MenuItem }) => {
	const overlayStyle = {
		transform: "translate3d(5px, 5px, 0) scale(1.025)",
		boxShadow:
			"0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 6px 0 rgba(34, 33, 81, 0.3)",
		cursor: "grabbing",
	};

	return (
		<div
			style={overlayStyle}
			className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5"
		>
			<span className="shrink-0 text-gray-400 cursor-grabbing">
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
				{item.description && (
					<p className="mt-0.5 truncate text-xs text-gray-500">
						{item.description}
					</p>
				)}
			</div>
		</div>
	);
};
