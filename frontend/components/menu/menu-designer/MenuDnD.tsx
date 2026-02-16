"use client";

import { useState, useCallback, useMemo } from "react";
import {
	DndContext,
	DragOverlay,
	closestCorners,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragStartEvent,
	type DragOverEvent,
	type DragEndEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";

import { useRestaurants } from "@/contexts/RestaurantContext";
import { MenuDesignerToolbar } from "./MenuDesignerToolbar";
import { MenuItemOverlay } from "./MenuItemOverlay";
import { CategoryOverlay } from "./CategoryOverlay";
import { SortableCategory } from "./SortableCategory";
import { AddOrEditCategoryModal } from "./AddOrEditCategoryModal";
import {
	CategoryOrder,
	EditableMenuItem,
	MenuCategory,
	MenuItem,
} from "@/types";
import { MenuItemFormModal } from "./add-menu-item/MenuItemFormModal";
import { updateMenuOrder } from "@/services/menu";

export function MenuDnD() {
	const {
		isLoading,
		draftRestaurant,
		selectedRestaurant,
		setDesignerActiveCategoryId,
		updateDraftCategories,
	} = useRestaurants();

	const categories = useMemo(
		() => draftRestaurant?.categories ?? [],
		[draftRestaurant?.categories],
	);

	const [openCategories, setOpenCategories] = useState<Set<number>>(
		new Set(),
	);

	const [activeId, setActiveId] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState(false);
	const [hasOrderChanges, setHasOrderChanges] = useState(false);
	const [isAddOrEditCategoryOpen, setIsAddOrEditCategoryOpen] =
		useState(false);
	const [isAddOrEditMenuItemOpen, setIsAddOrEditMenuItemOpen] =
		useState(false);

	const [editableCategory, setEditableCategory] =
		useState<MenuCategory | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const toggleCategory = useCallback(
		(catId: number) => {
			setDesignerActiveCategoryId(catId);
			setOpenCategories((prev) => {
				const next = new Set(prev);
				if (next.has(catId)) next.delete(catId);
				else next.add(catId);
				return next;
			});
		},
		[setDesignerActiveCategoryId],
	);

	const findCategoryByItemId = useCallback(
		(itemDndId: string): MenuCategory | undefined => {
			const numericId = Number(itemDndId.replace("item-", ""));
			return categories.find((cat) =>
				cat.menuItems.some((item) => item.id === numericId),
			);
		},
		[categories],
	);

	const findMenuItem = useCallback(
		(itemDndId: string): MenuItem | undefined => {
			const numericId = Number(itemDndId.replace("item-", ""));
			for (const cat of categories) {
				const found = cat.menuItems.find((i) => i.id === numericId);
				if (found) return found;
			}
			return undefined;
		},
		[categories],
	);

	const findCategory = useCallback(
		(catDndId: string): MenuCategory | undefined => {
			const numericId = Number(catDndId.replace("category-", ""));
			return categories.find((c) => c.id === numericId);
		},
		[categories],
	);

	const handleSaveOrder = async () => {
		setIsSaving(true);

		if (!draftRestaurant?.id) {
			return;
		}

		try {
			const categoryOrderPayload: CategoryOrder[] = categories.map(
				(cat, index) => {
					return {
						id: cat.id,
						displayOrder: index + 1,
						menuItems: cat.menuItems.map((item, index) => {
							return {
								id: item.id!,
								displayOrder: index + 1,
							};
						}),
					};
				},
			);
			await updateMenuOrder(draftRestaurant?.id, {
				categories: categoryOrderPayload,
			});
			setIsSaving(false);
			setHasOrderChanges(false);
			setSaveSuccess(true);
			setTimeout(() => setSaveSuccess(false), 2000);
		} catch (err) {
			console.error(err);
			setIsSaving(false);
		}
	};

	const handleResetOrder = useCallback(() => {
		if (selectedRestaurant?.categories) {
			updateDraftCategories(selectedRestaurant.categories);
			setHasOrderChanges(false);
		}
	}, [selectedRestaurant, updateDraftCategories]);

	const allCollapsed = openCategories.size === 0;

	const handleToggleAll = useCallback(() => {
		if (allCollapsed) {
			setOpenCategories(new Set(categories.map((c) => c.id)));
		} else {
			setOpenCategories(new Set());
		}
	}, [allCollapsed, categories]);

	const handleAddOrEditCategory = useCallback(
		(name: string, description: string, id?: number) => {
			if (id) {
				console.log("edit category");
				return;
			}

			console.log("create category");
			const newCategory: MenuCategory = {
				id: Date.now(),
				name,
				description,
				menuItems: [],
			};
			updateDraftCategories([...categories, newCategory]);
		},
		[categories, updateDraftCategories],
	);

	const onEditCategory = (category: MenuCategory) => {
		setEditableCategory(category);
		setIsAddOrEditCategoryOpen(true);
	};

	const onCloseCategoryModal = () => {
		setEditableCategory(null);
		setIsAddOrEditCategoryOpen(false);
	};

	const handleAddMenuItem = useCallback(
		async (item: EditableMenuItem) => {
			try {
				// TODO: Replace with actual API call
				const createdItem: MenuItem = await Promise.resolve({
					...item,
					id: item.id ?? Date.now(),
					categoryId: item.categoryId!,
				});

				const newCategories = categories.map((cat) => {
					if (cat.id !== createdItem.categoryId) return cat;
					return {
						...cat,
						menuItems: [...cat.menuItems, createdItem],
					};
				});
				updateDraftCategories(newCategories);
			} catch (error) {
				console.error("Failed to create menu item:", error);
			}
		},
		[categories, updateDraftCategories],
	);

	const handleDragStart = useCallback((event: DragStartEvent) => {
		setActiveId(String(event.active.id));
	}, []);

	const handleDragOver = useCallback(
		(event: DragOverEvent) => {
			const { active, over } = event;
			if (!over) return;

			const activeIdStr = String(active.id);
			const overIdStr = String(over.id);

			if (!activeIdStr.startsWith("item-")) return;

			const activeCategory = findCategoryByItemId(activeIdStr);
			if (!activeCategory) return;

			let overCategory: MenuCategory | undefined;

			if (overIdStr.startsWith("category-")) {
				overCategory = findCategory(overIdStr);
			} else if (overIdStr.startsWith("item-")) {
				overCategory = findCategoryByItemId(overIdStr);
			}

			if (!overCategory || activeCategory.id === overCategory.id) return;

			setOpenCategories((prev) => {
				if (prev.has(overCategory.id)) return prev;
				const next = new Set(prev);
				next.add(overCategory.id);
				return next;
			});

			const activeNumericId = Number(activeIdStr.replace("item-", ""));
			const sourceCat = categories.find(
				(c) => c.id === activeCategory.id,
			)!;
			const destCat = categories.find((c) => c.id === overCategory.id)!;

			const item = sourceCat.menuItems.find(
				(i) => i.id === activeNumericId,
			);
			if (!item) return;

			const newSourceItems = sourceCat.menuItems.filter(
				(i) => i.id !== activeNumericId,
			);

			let destIndex = destCat.menuItems.length;
			if (overIdStr.startsWith("item-")) {
				const overNumericId = Number(overIdStr.replace("item-", ""));
				const idx = destCat.menuItems.findIndex(
					(i) => i.id === overNumericId,
				);
				if (idx !== -1) destIndex = idx;
			}

			const newDestItems = [...destCat.menuItems];
			newDestItems.splice(destIndex, 0, item);

			const newCategories = categories.map((cat) => {
				if (cat.id === activeCategory.id)
					return { ...cat, menuItems: newSourceItems };
				if (cat.id === overCategory.id)
					return { ...cat, menuItems: newDestItems };
				return cat;
			});
			updateDraftCategories(newCategories);
		},
		[categories, findCategoryByItemId, findCategory, updateDraftCategories],
	);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			setActiveId(null);

			if (!over || active.id === over.id) return;

			setHasOrderChanges(true);
			const activeIdStr = String(active.id);
			const overIdStr = String(over.id);

			if (
				activeIdStr.startsWith("category-") &&
				overIdStr.startsWith("category-")
			) {
				const oldIndex = categories.findIndex(
					(c) => `category-${c.id}` === activeIdStr,
				);
				const newIndex = categories.findIndex(
					(c) => `category-${c.id}` === overIdStr,
				);
				if (oldIndex === -1 || newIndex === -1) return;
				const newCategories = arrayMove(categories, oldIndex, newIndex);
				updateDraftCategories(newCategories);
				return;
			}

			if (
				activeIdStr.startsWith("item-") &&
				overIdStr.startsWith("item-")
			) {
				const activeCat = findCategoryByItemId(activeIdStr);
				const overCat = findCategoryByItemId(overIdStr);

				if (activeCat && overCat && activeCat.id === overCat.id) {
					const newCategories = categories.map((cat) => {
						if (cat.id !== activeCat.id) return cat;
						const oldIndex = cat.menuItems.findIndex(
							(i) => `item-${i.id}` === activeIdStr,
						);
						const newIndex = cat.menuItems.findIndex(
							(i) => `item-${i.id}` === overIdStr,
						);
						if (oldIndex === -1 || newIndex === -1) return cat;
						return {
							...cat,
							menuItems: arrayMove(
								cat.menuItems,
								oldIndex,
								newIndex,
							),
						};
					});
					updateDraftCategories(newCategories);
				}
			}
		},
		[categories, findCategoryByItemId, updateDraftCategories],
	);

	if (isLoading) {
		return (
			<p className="py-8 text-center text-sm text-gray-500">Loading...</p>
		);
	}

	if (!draftRestaurant) {
		return (
			<p className="py-8 text-center text-sm text-gray-500">
				Select a restaurant to manage the menu.
			</p>
		);
	}

	const categoryIds = categories.map((c) => `category-${c.id}`);

	let dragOverlayContent: React.ReactNode = null;
	if (activeId) {
		if (activeId.startsWith("item-")) {
			const item = findMenuItem(activeId);
			if (item) dragOverlayContent = <MenuItemOverlay item={item} />;
		} else if (activeId.startsWith("category-")) {
			const cat = findCategory(activeId);
			if (cat) dragOverlayContent = <CategoryOverlay category={cat} />;
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<MenuDesignerToolbar
				onSaveOrder={handleSaveOrder}
				onResetOrder={handleResetOrder}
				onAddCategory={() => setIsAddOrEditCategoryOpen(true)}
				onAddMenuItem={() => setIsAddOrEditMenuItemOpen(true)}
				onToggleAll={handleToggleAll}
				allCollapsed={allCollapsed}
				isSaving={isSaving}
				saveSuccess={saveSuccess}
				hasOrderChanges={hasOrderChanges}
			/>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={categoryIds}
					strategy={verticalListSortingStrategy}
				>
					<div className="flex flex-col gap-3 overflow-y-scroll h-[calc(100vh-275px)]">
						{categories.map((category) => (
							<SortableCategory
								key={`sortable-category-${category.id}`}
								category={category}
								isOpen={openCategories.has(category.id)}
								onToggle={() => toggleCategory(category.id)}
								onEdit={(category: MenuCategory) =>
									onEditCategory(category)
								}
							/>
						))}
					</div>
				</SortableContext>

				<DragOverlay>{dragOverlayContent}</DragOverlay>
			</DndContext>

			<AddOrEditCategoryModal
				key={
					editableCategory?.id
						? `edit-category-${editableCategory?.id}`
						: "new-category"
				}
				category={editableCategory}
				isOpen={isAddOrEditCategoryOpen}
				onClose={onCloseCategoryModal}
				onSave={handleAddOrEditCategory}
			/>

			{/* <MenuItemFormModal
				key={
					editableCategory?.id
						? `edit-category-${editableCategory?.id}`
						: "new-category"
				}
				isOpen={isAddOrEditMenuItemOpen}
				onClose={() => setIsAddOrEditMenuItemOpen(false)}
				onSave={handleAddMenuItem}
				categories={categories}
			/> */}
		</div>
	);
}
