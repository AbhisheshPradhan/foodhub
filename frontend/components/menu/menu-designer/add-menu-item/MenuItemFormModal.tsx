"use client";

import { useState } from "react";
import { DeleteIcon, Trash, Trash2, X } from "lucide-react";

import type { EditableMenuItem, MenuCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { MenuItemForm, MenuItemFormTab } from "./MenuItemForm";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { DeleteAlert } from "@/components/ui/DeleteAlert";

const BLANK_ITEM: EditableMenuItem = {
	id: undefined,
	categoryId: undefined,
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

const TABS: { key: MenuItemFormTab; label: string }[] = [
	{ key: "general", label: "General" },
	{ key: "modifiers", label: "Modifiers" },
	{ key: "dietary", label: "Dietary Info" },
];

export const MenuItemFormModal = ({
	item = BLANK_ITEM,
	isOpen,
	onClose,
	onSave,
	categories,
}: {
	item?: EditableMenuItem;
	isOpen: boolean;
	onClose: () => void;
	onSave: (item: EditableMenuItem) => void;
	categories: MenuCategory[];
}) => {
	const [activeTab, setActiveTab] = useState<MenuItemFormTab>("general");
	const [editedItem, setEditedItem] = useState<EditableMenuItem>(
		item ?? BLANK_ITEM,
	);
	const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	if (!isOpen) return null;

	const handleClose = () => {
		setEditedItem(BLANK_ITEM);
		onClose();
	};

	const handleItemChange = (updatedItem: EditableMenuItem) => {
		setEditedItem(updatedItem);
	};

	const handleSave = () => {
		onSave(editedItem);
		console.log("editedItem", editedItem);
		handleClose();
	};

	const handleDelete = () => {
		setIsDeleting(true);
		setTimeout(() => {
			setShowDeleteAlert(false);
			setIsDeleting(false);
			onClose();
		}, 1500);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="flex w-150 max-w-3xl flex-col rounded-xl bg-white shadow-xl  h-[50vh]">
				<div className="flex-1 overflow-hidden flex flex-col h-full">
					<div className="flex flex-col h-full">
						<div className="flex items-center gap-3 px-6 pt-6 pb-3">
							<h2 className="flex-1 text-lg font-semibold text-gray-900">
								{editedItem.id ? "Edit" : "Add"} Item
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
								item={editedItem}
								onChange={(updated) =>
									handleItemChange(updated)
								}
								activeTab={activeTab}
								categories={categories ?? []}
							/>
						</div>

						<div className="shrink-0 border-t border-gray-100 px-6 py-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									{editedItem.id && (
										<DeleteButton
											type="button"
											onClick={() =>
												setShowDeleteAlert(true)
											}
											size="xs"
										/>
									)}
								</div>
								<div className="flex items-center gap-4">
									<Button
										type="button"
										onClick={onClose}
										size="xs"
										variant="outline"
									>
										Close
									</Button>
									<Button
										onClick={handleSave}
										disabled={
											!editedItem.categoryId ||
											!editedItem.name ||
											!editedItem.price
										}
										size="xs"
									>
										Add Item
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{showDeleteAlert && (
					<DeleteAlert
						type="item"
						name={item?.name}
						isDeleting={isDeleting}
						onDelete={handleDelete}
						onClose={() => setShowDeleteAlert(false)}
					/>
				)}
			</div>
		</div>
	);
};
