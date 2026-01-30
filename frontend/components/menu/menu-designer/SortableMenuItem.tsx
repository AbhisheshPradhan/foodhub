"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, GripVertical, Pencil, Trash2 } from "lucide-react";

import { MenuItem } from "@/types";

export const SortableMenuItem = ({ item }: { item: MenuItem }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: `item-${item.id}` });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.4 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="group/item relative flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5"
		>
			<button
				className="shrink-0 cursor-grab touch-none text-gray-400 hover:text-gray-600"
				{...attributes}
				{...listeners}
			>
				<GripVertical size={16} />
			</button>
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

			<div className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-gray-200 bg-white px-1 py-0.5 shadow-sm opacity-0 transition-opacity group-hover/item:opacity-100">
				<button
					type="button"
					className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
					title="Edit"
				>
					<Pencil size={14} />
				</button>
				<button
					type="button"
					className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
					title="Duplicate"
				>
					<Copy size={14} />
				</button>
				<button
					type="button"
					className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
					title="Delete"
				>
					<Trash2 size={14} />
				</button>
			</div>
		</div>
	);
};
