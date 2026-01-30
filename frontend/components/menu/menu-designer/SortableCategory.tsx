"use client";

import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, Copy, GripVertical, Pencil, Trash2 } from "lucide-react";

import { MenuCategory } from "@/types";
import { SortableMenuItem } from "./SortableMenuItem";

export const SortableCategory = ({
	category,
	isOpen,
	onToggle,
}: {
	category: MenuCategory;
	isOpen: boolean;
	onToggle: () => void;
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: `category-${category.id}` });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.4 : 1,
	};

	const itemIds = category.menuItems.map((item) => `item-${item.id}`);

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="group/category rounded-xl border border-gray-200 bg-white"
		>
			<div className="relative flex items-center gap-2 px-3 py-3">
				<button
					className="shrink-0 cursor-grab touch-none text-gray-400 hover:text-gray-600"
					{...attributes}
					{...listeners}
				>
					<GripVertical size={18} />
				</button>
				<button
					onClick={onToggle}
					className="flex min-w-0 flex-1 items-center justify-between"
				>
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
							className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
						/>
					</div>
				</button>

				<div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-gray-200 bg-white px-1 py-0.5 shadow-sm opacity-0 transition-opacity group-hover/category:opacity-100">
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

			{isOpen && (
				<div className="border-t border-gray-200 px-3 pb-3 pt-2">
					<SortableContext
						items={itemIds}
						strategy={verticalListSortingStrategy}
					>
						<div className="flex flex-col gap-1.5">
							{category.menuItems.map((item) => (
								<SortableMenuItem
									key={item.id}
									item={item}
								/>
							))}
							{category.menuItems.length === 0 && (
								<p className="py-4 text-center text-xs text-gray-400">
									No items — drag items here
								</p>
							)}
						</div>
					</SortableContext>
				</div>
			)}
		</div>
	);
};
