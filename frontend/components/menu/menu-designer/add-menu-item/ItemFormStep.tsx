"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { MenuItemForm, type MenuItemFormTab } from "./MenuItemForm";
import { Button } from "@/components/ui/Button";
import type { MenuItem, MenuCategory } from "@/types";

type EditableMenuItem = Omit<MenuItem, "id">;

const TABS: { key: MenuItemFormTab; label: string }[] = [
	{ key: "general", label: "General" },
	{ key: "modifiers", label: "Modifiers" },
	{ key: "dietary", label: "Dietary Info" },
];

export const ItemFormStep = ({
	items,
	onItemChange,
	currentIndex,
	onIndexChange,
	onSave,
	onBack,
	onClose,
	categories,
	categoryIds,
	onCategoryChange,
}: {
	items: EditableMenuItem[];
	onItemChange: (index: number, updated: EditableMenuItem) => void;
	currentIndex: number;
	onIndexChange: (index: number) => void;
	onSave: () => void;
	onBack: () => void;
	onClose: () => void;
	categories: MenuCategory[];
	categoryIds: (number | null)[];
	onCategoryChange: (index: number, categoryId: number) => void;
}) => {
	const [activeTab, setActiveTab] = useState<MenuItemFormTab>("general");
	const [errors, setErrors] = useState<{
		name?: boolean;
		price?: boolean;
		category?: boolean;
	}>({});
	const isMultiple = items.length > 1;
	const isLastItem = currentIndex === items.length - 1;
	const canSave =
		categoryIds.every((id) => id !== null) &&
		items.every((item) => item.name.trim() && item.price.trim());

	const saveLabel =
		items.length === 1 ? "Add Item" : `Add ${items.length} Items`;

	const currentItem = items[currentIndex];
	const currentCategoryId = categoryIds[currentIndex] ?? null;

	const validateCurrentItem = (): boolean => {
		const newErrors: typeof errors = {};
		if (!currentItem.name.trim()) newErrors.name = true;
		if (!currentItem.price.trim()) newErrors.price = true;
		if (currentCategoryId === null) newErrors.category = true;
		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) {
			setActiveTab("general");
			return false;
		}
		return true;
	};

	const handleNext = () => {
		if (!validateCurrentItem()) return;
		setErrors({});
		onIndexChange(currentIndex + 1);
	};

	const handlePrevious = () => {
		setErrors({});
		onIndexChange(currentIndex - 1);
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center gap-3 px-6 pt-6 pb-3">
				<h2 className="flex-1 text-lg font-semibold text-gray-900">
					{isMultiple
						? `Edit Item ${currentIndex + 1} of ${items.length}`
						: "Edit Item"}
				</h2>
				<button
					onClick={onClose}
					className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
				>
					<X size={18} />
				</button>
			</div>

			<div className="flex gap-2 px-6 pb-3">
				{TABS.map((tab) => (
					<Button
						key={tab.key}
						type="button"
						onClick={() => setActiveTab(tab.key)}
						variant={`${activeTab === tab.key ? "primary" : "outline"}`}
						size="xs"
					>
						{tab.label}
					</Button>
				))}
			</div>

			<div className="flex-1 overflow-y-auto px-6">
				<MenuItemForm
					item={currentItem}
					onChange={(updated) => onItemChange(currentIndex, updated)}
					activeTab={activeTab}
					categories={categories ?? []}
					targetCategoryId={currentCategoryId}
					onTargetCategoryChange={(catId) =>
						onCategoryChange(currentIndex, catId)
					}
					errors={errors}
				/>
			</div>

			<div className="shrink-0 border-t border-gray-100 px-6 py-4">
				<div className="flex items-center justify-between">
					<button
						type="button"
						onClick={onClose}
						className="text-sm font-medium text-gray-500 hover:text-gray-700"
					>
						Close
					</button>

					<div className="flex items-center gap-2">
						{isMultiple && currentIndex > 0 && (
							<button
								type="button"
								onClick={handlePrevious}
								className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
							>
								Previous Item
							</button>
						)}

						{isMultiple && !isLastItem ? (
							<button
								type="button"
								onClick={handleNext}
								className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
							>
								Next Item
							</button>
						) : (
							<button
								type="button"
								onClick={onSave}
								disabled={!canSave}
								className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{saveLabel}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
