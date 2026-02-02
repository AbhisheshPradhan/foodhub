"use client";

import { useState, useCallback, useEffect } from "react";
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
import { AddCategoryModal } from "./AddCategoryModal";
import { EditableMenuItem, MenuCategory, MenuItem } from "@/types";
import { MenuItemFormModal } from "./add-menu-item/MenuItemFormModal";

export function MenuDnD() {
	const { isLoading, selectedRestaurant, setDesignerActiveCategoryId } =
		useRestaurants();

	const [categories, setCategories] = useState<MenuCategory[]>([]);

	useEffect(() => {
		if (!isLoading && selectedRestaurant?.categories) {
			setCategories(selectedRestaurant.categories);
		}
	}, [isLoading, selectedRestaurant?.categories]);

	const [openCategories, setOpenCategories] = useState<Set<number>>(
		new Set(),
	);

	const [activeId, setActiveId] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [hasOrderChanges, setHasOrderChanges] = useState(false);
	const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
	const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
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

	const handleSaveOrder = useCallback(async () => {
		setIsSaving(true);

		try {
			// TODO: call API to persist the new display order
			console.log("Saving order…", categories);

			setTimeout(() => {
				setHasOrderChanges(false);
				setIsSaving(false);
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	}, [categories]);

	const allCollapsed = openCategories.size === 0;

	const handleToggleAll = useCallback(() => {
		if (allCollapsed) {
			setOpenCategories(new Set(categories.map((c) => c.id)));
		} else {
			setOpenCategories(new Set());
		}
	}, [allCollapsed, categories]);

	const handleAddCategory = useCallback(
		(name: string, description: string) => {
			console.log("Creating category:", { name, description });
			const newCategory: MenuCategory = {
				id: Date.now(),
				name,
				description,
				displayOrder: categories.length,
				menuItems: [],
			};
			setCategories((prev) => [...prev, newCategory]);
		},
		[categories.length],
	);

	const handleAddMenuItem = useCallback((item: EditableMenuItem) => {
		console.log("handleAddMenuItem item", item);
		setCategories((prev) =>
			prev.map((cat) => {
				if (cat.id !== item.categoryId) return cat;

				return {
					...cat,
					menuItems: [...cat.menuItems, item],
				};
			}),
		);
	}, []);

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

			setCategories((prev) => {
				const activeNumericId = Number(
					activeIdStr.replace("item-", ""),
				);
				const sourceCat = prev.find((c) => c.id === activeCategory.id)!;
				const destCat = prev.find((c) => c.id === overCategory.id)!;

				const item = sourceCat.menuItems.find(
					(i) => i.id === activeNumericId,
				);
				if (!item) return prev;

				const newSourceItems = sourceCat.menuItems.filter(
					(i) => i.id !== activeNumericId,
				);

				let destIndex = destCat.menuItems.length;
				if (overIdStr.startsWith("item-")) {
					const overNumericId = Number(
						overIdStr.replace("item-", ""),
					);
					const idx = destCat.menuItems.findIndex(
						(i) => i.id === overNumericId,
					);
					if (idx !== -1) destIndex = idx;
				}

				const newDestItems = [...destCat.menuItems];
				newDestItems.splice(destIndex, 0, item);

				return prev.map((cat) => {
					if (cat.id === activeCategory.id)
						return { ...cat, menuItems: newSourceItems };
					if (cat.id === overCategory.id)
						return { ...cat, menuItems: newDestItems };
					return cat;
				});
			});
		},
		[findCategoryByItemId, findCategory],
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
				setCategories((prev) => {
					const oldIndex = prev.findIndex(
						(c) => `category-${c.id}` === activeIdStr,
					);
					const newIndex = prev.findIndex(
						(c) => `category-${c.id}` === overIdStr,
					);
					if (oldIndex === -1 || newIndex === -1) return prev;
					return arrayMove(prev, oldIndex, newIndex);
				});
				return;
			}

			if (
				activeIdStr.startsWith("item-") &&
				overIdStr.startsWith("item-")
			) {
				const activeCat = findCategoryByItemId(activeIdStr);
				const overCat = findCategoryByItemId(overIdStr);

				if (activeCat && overCat && activeCat.id === overCat.id) {
					setCategories((prev) =>
						prev.map((cat) => {
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
						}),
					);
				}
			}
		},
		[findCategoryByItemId],
	);

	if (isLoading) {
		return (
			<p className="py-8 text-center text-sm text-gray-500">Loading...</p>
		);
	}

	if (!selectedRestaurant) {
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
				onAddCategory={() => setIsAddCategoryOpen(true)}
				onAddMenuItem={() => setIsAddMenuItemOpen(true)}
				onToggleAll={handleToggleAll}
				allCollapsed={allCollapsed}
				isSaving={isSaving}
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
								key={category.id}
								category={category}
								isOpen={openCategories.has(category.id)}
								onToggle={() => toggleCategory(category.id)}
							/>
						))}
					</div>
				</SortableContext>

				<DragOverlay>{dragOverlayContent}</DragOverlay>
			</DndContext>

			<AddCategoryModal
				// category={null}
				isOpen={isAddCategoryOpen}
				onClose={() => setIsAddCategoryOpen(false)}
				onSave={handleAddCategory}
			/>

			<MenuItemFormModal
				// item={null}
				isOpen={isAddMenuItemOpen}
				onClose={() => setIsAddMenuItemOpen(false)}
				onSave={handleAddMenuItem}
				categories={categories}
			/>
		</div>
	);
}
