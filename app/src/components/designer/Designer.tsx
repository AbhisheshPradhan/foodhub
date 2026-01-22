"use client";

import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	closestCenter,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface EditableTextProps {
	value: string;
	onSave: (value: string) => void;
	className?: string;
	inputClassName?: string;
	as?: "h1" | "h2" | "p" | "span" | "a";
	placeholder?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
	value,
	onSave,
	className = "",
	inputClassName = "",
	as: Tag = "span",
	placeholder = "Enter text...",
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedValue, setEditedValue] = useState(value);

	const handleSave = () => {
		onSave(editedValue);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditedValue(value);
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSave();
		} else if (e.key === "Escape") {
			handleCancel();
		}
	};

	return (
		<div className="relative inline-block group">
			{isEditing ? (
				<input
					type="text"
					value={editedValue}
					onChange={(e) => setEditedValue(e.target.value)}
					onKeyDown={handleKeyDown}
					onBlur={handleSave}
					className={`bg-transparent border-b-2 border-brand-500 focus:outline-none ${inputClassName}`}
					placeholder={placeholder}
					autoFocus
				/>
			) : (
				<>
					<Tag
						className={`cursor-pointer border-b-2 border-transparent ${className}`}
						onClick={() => setIsEditing(true)}
					>
						{value || placeholder}
					</Tag>
					<span className="absolute p-1 text-gray-400 transition-opacity -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
						<Pencil size={14} />
					</span>
				</>
			)}
		</div>
	);
};

interface SortableMenuItemCardProps {
	itemData: MenuItemWithDetails;
	categoryId: number;
}

const SortableMenuItemCard: React.FC<SortableMenuItemCardProps> = ({
	itemData,
	categoryId,
}) => {
	const { item, allergens, modifiers } = itemData;
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: `item-${item.id}`,
		data: { type: "item", item: itemData, categoryId },
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="p-4 transition-shadow bg-white border border-gray-200 cursor-grab rounded-xl shadow-theme-xs hover:shadow-theme-sm active:cursor-grabbing select-none"
		>
			<div className="flex items-start justify-between mb-2">
				<h3 className="font-medium text-gray-800">{item.name}</h3>
				<span className="font-semibold text-brand-500">
					${item.price.toFixed(2)}
				</span>
			</div>

			<div className="flex flex-wrap gap-1.5 mb-2">
				{item.isVegetarian && (
					<span className="text-xs px-1.5 py-0.5 rounded bg-success-100 text-success-700">
						V
					</span>
				)}
				{item.isVegan && (
					<span className="text-xs px-1.5 py-0.5 rounded bg-success-100 text-success-700">
						VG
					</span>
				)}
				{item.isGlutenFree && (
					<span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">
						GF
					</span>
				)}
				{item.isSpicy && (
					<span className="text-xs">{"🌶️".repeat(item.spiceLevel)}</span>
				)}
			</div>

			<p className="mb-3 text-sm text-gray-600">{item.description}</p>

			<div className="flex items-center gap-3 text-xs text-gray-400">
				{item.calories > 0 && <span>{item.calories} cal</span>}
				{allergens.length > 0 && (
					<div className="flex gap-1">
						{allergens.map((allergen) => (
							<span key={allergen.id} title={allergen.name}>
								{allergen.icon}
							</span>
						))}
					</div>
				)}
			</div>

			{modifiers.length > 0 && (
				<div className="pt-3 mt-3 border-t border-gray-100">
					<p className="mb-1 text-xs font-medium text-gray-500">Add-ons</p>
					{modifiers.map((modifier) => (
						<div
							key={modifier.id}
							className="flex justify-between text-sm text-gray-500"
						>
							<span>{modifier.name}</span>
							{modifier.priceAdjustment > 0 && (
								<span>+${modifier.priceAdjustment.toFixed(2)}</span>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

interface AddItemCardProps {
	onClick: () => void;
}

const AddItemCard: React.FC<AddItemCardProps> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="flex items-center justify-center w-full p-8 text-gray-400 transition-colors border-2 border-gray-200 border-dashed rounded-xl hover:border-brand-500 hover:text-brand-500"
		>
			<Plus size={24} className="mr-2" />
			<span className="font-medium">Add Menu Item</span>
		</button>
	);
};

interface ConfirmModalProps {
	isOpen: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	title,
	message,
	onConfirm,
	onCancel,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="w-full max-w-sm p-6 mx-4 bg-white rounded-xl shadow-theme-lg">
				<div className="flex items-start justify-between mb-4">
					<h3 className="font-semibold text-gray-900">{title}</h3>
					<button
						onClick={onCancel}
						className="p-1 text-gray-400 transition-colors hover:text-gray-600"
					>
						<X size={20} />
					</button>
				</div>
				<p className="mb-6 text-gray-600">{message}</p>
				<div className="flex gap-3 justify-end">
					<button
						onClick={onCancel}
						className="px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 text-white transition-colors rounded-lg bg-error-500 hover:bg-error-600"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

interface Restaurant {
	id: number;
	name: string;
	address: string;
	phone: string;
	email: string;
	website: string;
}

interface Allergen {
	id: number;
	name: string;
	icon: string;
}

interface Modifier {
	id: number;
	name: string;
	description: string;
	priceAdjustment: number;
	modifierType: string;
}

interface MenuItem {
	id: number;
	name: string;
	description: string;
	price: number;
	isVegetarian: boolean;
	isVegan: boolean;
	isGlutenFree: boolean;
	isSpicy: boolean;
	spiceLevel: number;
	calories: number;
}

interface MenuItemWithDetails {
	item: MenuItem;
	allergens: Allergen[];
	modifiers: Modifier[];
}

interface Category {
	id: number;
	name: string;
	description: string;
}

interface CategoryWithItems {
	category: Category;
	items: MenuItemWithDetails[];
}

interface MenuData {
	restaurant: Restaurant;
	categories: CategoryWithItems[];
}

export const Designer: React.FC = () => {
	const [menu, setMenu] = useState<MenuData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeItem, setActiveItem] = useState<MenuItemWithDetails | null>(null);
	const [deleteConfirm, setDeleteConfirm] = useState<{
		categoryId: number;
		categoryName: string;
	} | null>(null);

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		}),
	);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		fetch("http://localhost:4000/api/r/1/menu")
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to load menu (${res.status})`);
				}
				return res.json();
			})
			.then((res) => {
				setMenu(res.data);
			})
			.catch((err) => {
				setError(err.message || "Failed to load menu");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-gray-500">Loading menu...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-error-500">{error}</p>
			</div>
		);
	}

	if (!menu?.restaurant || !menu?.categories) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-gray-500">No menu data available</p>
			</div>
		);
	}

	const { restaurant, categories } = menu;

	const updateRestaurant = (field: keyof Restaurant, value: string) => {
		setMenu({
			...menu,
			restaurant: { ...restaurant, [field]: value },
		});
	};

	const updateCategory = (
		categoryId: number,
		field: keyof Category,
		value: string,
	) => {
		setMenu({
			...menu,
			categories: categories.map((cat) =>
				cat.category.id === categoryId
					? { ...cat, category: { ...cat.category, [field]: value } }
					: cat,
			),
		});
	};

	const deleteCategory = (categoryId: number, categoryName: string) => {
		setDeleteConfirm({ categoryId, categoryName });
	};

	const confirmDelete = () => {
		if (!deleteConfirm) return;
		setMenu({
			...menu,
			categories: categories.filter(
				(cat) => cat.category.id !== deleteConfirm.categoryId,
			),
		});
		setDeleteConfirm(null);
	};

	const addMenuItem = (categoryId: number) => {
		const newItem: MenuItemWithDetails = {
			item: {
				id: Date.now(),
				name: "New Item",
				description: "Item description",
				price: 0,
				isVegetarian: false,
				isVegan: false,
				isGlutenFree: false,
				isSpicy: false,
				spiceLevel: 0,
				calories: 0,
			},
			allergens: [],
			modifiers: [],
		};

		setMenu({
			...menu,
			categories: categories.map((cat) =>
				cat.category.id === categoryId
					? { ...cat, items: [...cat.items, newItem] }
					: cat,
			),
		});
	};

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		if (active.data.current?.type === "item") {
			setActiveItem(active.data.current.item);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveItem(null);

		if (!over) return;

		const activeData = active.data.current;
		const overData = over.data.current;

		if (!activeData) return;

		const activeItemData = activeData.item as MenuItemWithDetails;
		const sourceCategoryId = activeData.categoryId as number;

		let targetCategoryId: number;

		if (overData?.type === "item") {
			targetCategoryId = overData.categoryId as number;
		} else if (overData?.type === "category") {
			targetCategoryId = overData.categoryId as number;
		} else {
			return;
		}

		if (sourceCategoryId === targetCategoryId) {
			// Reorder within same category
			const categoryIndex = categories.findIndex(
				(cat) => cat.category.id === sourceCategoryId,
			);
			const category = categories[categoryIndex];
			const oldIndex = category.items.findIndex(
				(i) => i.item.id === activeItemData.item.id,
			);

			let newIndex: number;
			if (overData?.type === "item") {
				const overItem = overData.item as MenuItemWithDetails;
				newIndex = category.items.findIndex((i) => i.item.id === overItem.item.id);
			} else {
				newIndex = category.items.length - 1;
			}

			if (oldIndex !== newIndex) {
				const newItems = [...category.items];
				const [removed] = newItems.splice(oldIndex, 1);
				newItems.splice(newIndex, 0, removed);

				const newCategories = [...categories];
				newCategories[categoryIndex] = { ...category, items: newItems };

				setMenu({ ...menu, categories: newCategories });
			}
		} else {
			// Move to different category
			const sourceCatIndex = categories.findIndex(
				(cat) => cat.category.id === sourceCategoryId,
			);
			const targetCatIndex = categories.findIndex(
				(cat) => cat.category.id === targetCategoryId,
			);

			const newSourceItems = categories[sourceCatIndex].items.filter(
				(i) => i.item.id !== activeItemData.item.id,
			);

			let targetInsertIndex: number;
			if (overData?.type === "item") {
				const overItem = overData.item as MenuItemWithDetails;
				targetInsertIndex = categories[targetCatIndex].items.findIndex(
					(i) => i.item.id === overItem.item.id,
				);
			} else {
				targetInsertIndex = categories[targetCatIndex].items.length;
			}

			const newTargetItems = [...categories[targetCatIndex].items];
			newTargetItems.splice(targetInsertIndex, 0, activeItemData);

			const newCategories = [...categories];
			newCategories[sourceCatIndex] = {
				...categories[sourceCatIndex],
				items: newSourceItems,
			};
			newCategories[targetCatIndex] = {
				...categories[targetCatIndex],
				items: newTargetItems,
			};

			setMenu({ ...menu, categories: newCategories });
		}
	};

	return (
		<div className="max-w-3xl px-4 py-8 mx-auto">
			{/* Restaurant Header */}
			<header className="pb-6 mb-10 text-center border-b border-gray-200">
				<div className="flex justify-center mb-2">
					<EditableText
						value={restaurant.name}
						onSave={(value) => updateRestaurant("name", value)}
						className="font-semibold text-gray-900 text-title-md"
						inputClassName="font-semibold text-center text-gray-900 text-title-md"
						placeholder="Restaurant Name"
					/>
				</div>
				<div className="flex justify-center">
					<EditableText
						value={restaurant.address}
						onSave={(value) => updateRestaurant("address", value)}
						className="text-gray-600"
						inputClassName="text-center text-gray-600"
						placeholder="Address"
					/>
				</div>
				<div className="flex justify-center">
					<EditableText
						value={restaurant.phone}
						onSave={(value) => updateRestaurant("phone", value)}
						className="text-gray-600"
						inputClassName="text-center text-gray-600"
						placeholder="Phone"
					/>
				</div>
			</header>

			{/* Menu Categories */}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<main className="space-y-10">
					{categories.map(({ category, items }) => (
						<section key={category.id}>
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<EditableText
										value={category.name}
										onSave={(value) =>
											updateCategory(category.id, "name", value)
										}
										className="font-semibold text-gray-800 text-title-sm"
										inputClassName="font-semibold text-gray-800 text-title-sm"
										placeholder="Category Name"
									/>
									<div className="mt-1">
										<EditableText
											value={category.description}
											onSave={(value) =>
												updateCategory(
													category.id,
													"description",
													value,
												)
											}
											className="text-sm text-gray-500"
											inputClassName="text-sm text-gray-500"
											placeholder="Category description..."
										/>
									</div>
								</div>
								<button
									onClick={() => deleteCategory(category.id, category.name)}
									className="p-2 text-gray-400 transition-colors hover:text-error-500"
									title="Delete category"
								>
									<Trash2 size={18} />
								</button>
							</div>

							<SortableContext
								items={items.map((i) => `item-${i.item.id}`)}
								strategy={verticalListSortingStrategy}
							>
								<div
									className="grid gap-4 sm:grid-cols-2"
									data-category-id={category.id}
								>
									{items.map((itemData) => (
										<SortableMenuItemCard
											key={itemData.item.id}
											itemData={itemData}
											categoryId={category.id}
										/>
									))}
									<AddItemCard onClick={() => addMenuItem(category.id)} />
								</div>
							</SortableContext>
						</section>
					))}
				</main>

				<DragOverlay>
					{activeItem ? (
						<div className="p-4 bg-white border border-gray-200 rounded-xl shadow-theme-lg opacity-90">
							<div className="flex items-start justify-between mb-2">
								<h3 className="font-medium text-gray-800">
									{activeItem.item.name}
								</h3>
								<span className="font-semibold text-brand-500">
									${activeItem.item.price.toFixed(2)}
								</span>
							</div>
							<p className="text-sm text-gray-600">
								{activeItem.item.description}
							</p>
						</div>
					) : null}
				</DragOverlay>
			</DndContext>

			{/* Restaurant Footer */}
			<footer className="pt-6 mt-10 space-y-2 text-center border-t border-gray-200">
				<div className="flex justify-center">
					<EditableText
						value={restaurant.email}
						onSave={(value) => updateRestaurant("email", value)}
						className="text-brand-500"
						inputClassName="text-center text-brand-500"
						placeholder="email@example.com"
					/>
				</div>
				<div className="flex justify-center">
					<EditableText
						value={restaurant.website}
						onSave={(value) => updateRestaurant("website", value)}
						className="text-brand-500"
						inputClassName="text-center text-brand-500"
						placeholder="www.example.com"
					/>
				</div>
			</footer>

			<ConfirmModal
				isOpen={deleteConfirm !== null}
				title="Delete Category"
				message={`Delete "${deleteConfirm?.categoryName}" and all its menu items?`}
				onConfirm={confirmDelete}
				onCancel={() => setDeleteConfirm(null)}
			/>
		</div>
	);
};
