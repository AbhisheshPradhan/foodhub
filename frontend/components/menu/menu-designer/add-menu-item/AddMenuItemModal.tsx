"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { ItemSearchStep } from "./ItemSearchStep";
import { ItemFormStep } from "./ItemFormStep";
import type { NepaliMenuItemTemplate } from "./nepaliMenuItems";

import type { EditableMenuItem, MenuCategory } from "@/types";

const BLANK_ITEM: EditableMenuItem = {
	name: "",
	description: "",
	price: "",
	imageUrl: null,
	isVegetarian: false,
	isVegan: false,
	isGlutenFree: false,
	isSpicy: false,
	spiceLevel: 0,
	calories: 0,
	preparationTime: 0,
	servings: null,
	allergens: [],
	modifiers: [],
};

function templateToEditable(
	template: NepaliMenuItemTemplate,
): EditableMenuItem {
	return {
		...BLANK_ITEM,
		name: template.name,
		description: template.description,
		price: template.price,
		imageUrl: template.imageUrl,
		allergens: template.allergens.map((a, i) => ({
			id: Date.now() + i,
			...a,
		})),
	};
}

export const AddMenuItemModal = ({
	isOpen,
	onClose,
	onSave,
	categories,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSave: (items: EditableMenuItem[], categoryIds: number[]) => void;
	categories: MenuCategory[];
}) => {
	const [step, setStep] = useState<1 | 2>(1);
	const [editedItems, setEditedItems] = useState<EditableMenuItem[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [categoryIds, setCategoryIds] = useState<(number | null)[]>([]);

	if (!isOpen) return null;

	const handleClose = () => {
		setStep(1);
		setEditedItems([]);
		setCurrentIndex(0);
		setCategoryIds([]);
		onClose();
	};

	const handleSelectItems = (templates: NepaliMenuItemTemplate[]) => {
		setEditedItems(templates.map(templateToEditable));
		setCategoryIds(new Array(templates.length).fill(null));
		setCurrentIndex(0);
		setStep(2);
	};

	const handleAddCustom = () => {
		setEditedItems([{ ...BLANK_ITEM }]);
		setCategoryIds([null]);
		setCurrentIndex(0);
		setStep(2);
	};

	const handleItemChange = (index: number, updated: EditableMenuItem) => {
		setEditedItems((prev) =>
			prev.map((item, i) => (i === index ? updated : item)),
		);
	};

	const handleCategoryChange = (index: number, categoryId: number) => {
		setCategoryIds((prev) => {
			const next = [...prev];
			next[index] = categoryId;
			if (index === 0) {
				return next.map((id, i) =>
					i === 0 || id === null ? categoryId : id,
				);
			}
			return next;
		});
	};

	const handleBack = () => {
		setStep(1);
	};

	const handleSave = () => {
		if (categoryIds.some((id) => id === null)) return;
		onSave(editedItems, categoryIds as number[]);
		handleClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="flex w-150 max-w-3xl flex-col rounded-xl bg-white shadow-xl  h-[50vh]">
				{step === 1 && (
					<div className="flex items-center px-6 pt-6 pb-4 justify-between">
						<h2 className="text-lg font-semibold text-gray-900">
							Add Menu Items
						</h2>
						<button
							onClick={handleClose}
							className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
						>
							<X size={18} />
						</button>
					</div>
				)}

				<div className="flex-1 overflow-hidden flex flex-col h-full">
					{step === 1 ? (
						<ItemSearchStep
							onSelectItems={handleSelectItems}
							onAddCustom={handleAddCustom}
							onClose={handleClose}
						/>
					) : (
						<ItemFormStep
							items={editedItems}
							onItemChange={handleItemChange}
							currentIndex={currentIndex}
							onIndexChange={setCurrentIndex}
							onSave={handleSave}
							onBack={handleBack}
							onClose={handleClose}
							categories={categories}
							categoryIds={categoryIds}
							onCategoryChange={handleCategoryChange}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
