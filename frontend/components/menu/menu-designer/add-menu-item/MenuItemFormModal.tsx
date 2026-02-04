"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

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
	const tabsRef = useRef<HTMLDivElement>(null);
	const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
	const [indicator, setIndicator] = useState({ left: 0, width: 0 });

	const updateIndicator = useCallback(() => {
		const container = tabsRef.current;
		const activeEl = tabRefs.current.get(activeTab);
		if (container && activeEl) {
			const containerRect = container.getBoundingClientRect();
			const tabRect = activeEl.getBoundingClientRect();
			setIndicator({
				left: tabRect.left - containerRect.left,
				width: tabRect.width,
			});
		}
	}, [activeTab]);

	useEffect(() => {
		updateIndicator();
	}, [updateIndicator]);

	if (!isOpen) return null;

	const handleClose = () => {
		setEditedItem({ ...BLANK_ITEM, allergens: [], modifiers: [] });
		setActiveTab("general");
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
			<div className="flex w-120 flex-col rounded-xl bg-white shadow-xl  h-[50vh]">
				<div className="flex-1 overflow-hidden flex flex-col h-full">
					<div className="flex flex-col h-full">
						<div className="flex items-center gap-3 px-5 pt-3 pb-3">
							<h2 className="flex-1 text-lg font-semibold text-gray-900">
								{editedItem.id ? "Edit" : "Add"} Item
							</h2>
							<button
								onClick={handleClose}
								className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 -mr-2"
							>
								<X size={24} />
							</button>
						</div>

						<div
							ref={tabsRef}
							className="relative flex border-b border-gray-200 mx-5"
						>
							{TABS.map((tab) => {
								return (
									<button
										key={tab.key}
										ref={(el) => {
											if (el)
												tabRefs.current.set(
													tab.key,
													el,
												);
										}}
										type="button"
										onClick={() => setActiveTab(tab.key)}
										className={`pb-2 text-sm font-medium mx-3 first:ml-0 last:mr-0 transition-colors ${
											activeTab === tab.key
												? "text-black"
												: "text-gray-500 hover:text-gray-700"
										}`}
									>
										{tab.label}
									</button>
								);
							})}
							<span
								className="absolute bottom-0 h-0.5 bg-black transition-all duration-200 ease-in-out"
								style={{
									left: indicator.left,
									width: indicator.width,
								}}
							/>
						</div>

						<div className="flex-1 overflow-y-auto px-5 py-4">
							<MenuItemForm
								item={editedItem}
								onChange={(updated) =>
									handleItemChange(updated)
								}
								activeTab={activeTab}
								categories={categories ?? []}
							/>
						</div>

						<div className="shrink-0 border-t border-gray-100 px-5 py-4">
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
										onClick={handleClose}
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
