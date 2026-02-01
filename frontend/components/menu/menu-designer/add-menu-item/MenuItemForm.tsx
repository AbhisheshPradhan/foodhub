"use client";

import { Plus, Trash2 } from "lucide-react";

import { Checkbox } from "@/components/form/input/Checkbox";
import { COMMON_ALLERGENS } from "./nepaliMenuItems";

import type { MenuItem, Allergen, Modifier, MenuCategory } from "@/types";

type EditableMenuItem = Omit<MenuItem, "id">;

export type MenuItemFormTab = "general" | "modifiers" | "dietary";

export const MenuItemForm = ({
	item,
	onChange,
	activeTab = "general",
	categories,
	targetCategoryId,
	onTargetCategoryChange,
	errors = {},
}: {
	item: EditableMenuItem;
	onChange: (updated: EditableMenuItem) => void;
	activeTab?: MenuItemFormTab;
	categories: MenuCategory[];
	targetCategoryId: number | null;
	onTargetCategoryChange: (categoryId: number) => void;
	errors?: { name?: boolean; price?: boolean; category?: boolean };
}) => {
	const updateField = <K extends keyof EditableMenuItem>(
		field: K,
		value: EditableMenuItem[K],
	) => {
		onChange({ ...item, [field]: value });
	};

	const toggleAllergen = (allergen: {
		name: string;
		description: string;
		icon: string;
	}) => {
		const exists = item.allergens.some((a) => a.name === allergen.name);
		if (exists) {
			updateField(
				"allergens",
				item.allergens.filter((a) => a.name !== allergen.name),
			);
		} else {
			const newAllergen: Allergen = {
				id: Date.now(),
				...allergen,
			};
			updateField("allergens", [...item.allergens, newAllergen]);
		}
	};

	const addModifier = () => {
		const newModifier: Modifier = {
			id: Date.now(),
			name: "",
			description: "",
			priceAdjustment: "0.00",
			modifierType: "addon",
			displayOrder: item.modifiers.length,
		};
		updateField("modifiers", [...item.modifiers, newModifier]);
	};

	const updateModifier = (
		index: number,
		field: keyof Modifier,
		value: string | number,
	) => {
		const updated = item.modifiers.map((m, i) =>
			i === index ? { ...m, [field]: value } : m,
		);
		updateField("modifiers", updated);
	};

	const removeModifier = (index: number) => {
		updateField(
			"modifiers",
			item.modifiers.filter((_, i) => i !== index),
		);
	};

	if (activeTab === "general") {
		return (
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-2 gap-3">
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Name <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							value={item.name}
							onChange={(e) =>
								updateField("name", e.target.value)
							}
							placeholder="e.g. Chicken Momo"
							className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
								errors.name
									? "border-red-400 focus:border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:border-brand-500 focus:ring-brand-500"
							}`}
						/>
						{errors.name && (
							<p className="mt-1 text-xs text-red-500">
								Name is required
							</p>
						)}
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Price <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
								$
							</span>
							<input
								type="number"
								value={item.price}
								onChange={(e) =>
									updateField("price", e.target.value)
								}
								placeholder="0.00"
								step="0.01"
								min="0"
								className={`w-full rounded-lg border pl-7 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
									errors.price
										? "border-red-400 focus:border-red-500 focus:ring-red-500"
										: "border-gray-300 focus:border-brand-500 focus:ring-brand-500"
								}`}
							/>
						</div>
						{errors.price && (
							<p className="mt-1 text-xs text-red-500">
								Price is required
							</p>
						)}
					</div>
				</div>
				<div className="pb-3">
					<label className="mb-1 block text-sm font-medium text-gray-700">
						Add to Category <span className="text-red-500">*</span>
					</label>
					{categories.length === 0 ? (
						<p className="text-sm text-amber-600">
							No categories found. Create a category first.
						</p>
					) : (
						<select
							value={targetCategoryId ?? ""}
							onChange={(e) =>
								onTargetCategoryChange(Number(e.target.value))
							}
							className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 ${
								errors.category
									? "border-red-400 focus:border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:border-brand-500 focus:ring-brand-500"
							}`}
						>
							<option
								value=""
								disabled
							>
								Select a category
							</option>
							{categories.map((cat) => (
								<option
									key={cat.id}
									value={cat.id}
								>
									{cat.name}
								</option>
							))}
						</select>
					)}
					{errors.category && (
						<p className="mt-1 text-xs text-red-500">
							Category is required
						</p>
					)}
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-gray-700">
						Description
					</label>
					<textarea
						value={item.description}
						onChange={(e) =>
							updateField("description", e.target.value)
						}
						placeholder="Describe this menu item"
						rows={2}
						className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
					/>
				</div>
			</div>
		);
	}

	if (activeTab === "modifiers") {
		return (
			<div className="flex flex-col">
				<div className="flex items-center justify-between mb-3">
					<label className="text-sm font-medium text-gray-700">
						Modifiers
					</label>
					<button
						type="button"
						onClick={addModifier}
						className="flex items-center gap-1 text-xs font-medium text-brand-500 hover:text-brand-600"
					>
						<Plus size={14} />
						Add Modifier
					</button>
				</div>
				{item.modifiers.length === 0 && (
					<p className="text-xs text-gray-400">
						No modifiers added yet
					</p>
				)}
				<div className="flex flex-col gap-2">
					{item.modifiers.map((modifier, index) => (
						<div
							key={modifier.id || index}
							className="flex items-center gap-2 rounded-lg border border-gray-200 p-2"
						>
							<input
								type="text"
								value={modifier.name}
								onChange={(e) =>
									updateModifier(
										index,
										"name",
										e.target.value,
									)
								}
								placeholder="Name"
								className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
							/>
							<div className="relative">
								<span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
									$
								</span>
								<input
									type="number"
									value={modifier.priceAdjustment}
									onChange={(e) =>
										updateModifier(
											index,
											"priceAdjustment",
											e.target.value,
										)
									}
									placeholder="0.00"
									step="0.01"
									className="w-20 rounded border border-gray-200 pl-5 pr-2 py-1 text-xs text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
								/>
							</div>
							<select
								value={modifier.modifierType}
								onChange={(e) =>
									updateModifier(
										index,
										"modifierType",
										e.target.value,
									)
								}
								className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
							>
								<option value="addon">Addon</option>
								<option value="size">Size</option>
								<option value="preparation">Preparation</option>
							</select>
							<button
								type="button"
								onClick={() => removeModifier(index)}
								className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
							>
								<Trash2 size={14} />
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<div>
				<label className="mb-2 block text-sm font-medium text-gray-700">
					Dietary Information
				</label>
				<div className="flex flex-wrap gap-x-6 gap-y-2">
					<Checkbox
						label="Vegetarian"
						checked={item.isVegetarian}
						onChange={(checked) =>
							updateField("isVegetarian", checked)
						}
					/>
					<Checkbox
						label="Vegan"
						checked={item.isVegan}
						onChange={(checked) => updateField("isVegan", checked)}
					/>
					<Checkbox
						label="Gluten Free"
						checked={item.isGlutenFree}
						onChange={(checked) =>
							updateField("isGlutenFree", checked)
						}
					/>
					<Checkbox
						label="Spicy"
						checked={item.isSpicy}
						onChange={(checked) => {
							updateField("isSpicy", checked);
						}}
					/>
				</div>

				{item.isSpicy && (
					<div className="mt-3 flex items-center gap-2">
						<span className="text-sm text-gray-600">
							Spice Level:
						</span>
						{[1, 2, 3].map((level) => (
							<button
								key={level}
								type="button"
								onClick={() => updateField("spiceLevel", level)}
								className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
									item.spiceLevel === level
										? "bg-brand-500 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{level}
							</button>
						))}
					</div>
				)}
			</div>

			<div className="border-t border-gray-100 pt-4">
				<label className="mb-2 block text-sm font-medium text-gray-700">
					Details
				</label>
				<div className="grid grid-cols-3 gap-3">
					<div>
						<label className="mb-1 block text-xs text-gray-500">
							Calories
						</label>
						<input
							type="number"
							value={item.calories || ""}
							onChange={(e) =>
								updateField(
									"calories",
									Number(e.target.value) || 0,
								)
							}
							placeholder="0"
							min="0"
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-gray-500">
							Prep Time (min)
						</label>
						<input
							type="number"
							value={item.preparationTime || ""}
							onChange={(e) =>
								updateField(
									"preparationTime",
									Number(e.target.value) || 0,
								)
							}
							placeholder="0"
							min="0"
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-gray-500">
							Servings
						</label>
						<input
							type="number"
							value={item.servings ?? ""}
							onChange={(e) =>
								updateField(
									"servings",
									e.target.value
										? Number(e.target.value)
										: null,
								)
							}
							placeholder="—"
							min="1"
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
						/>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-100 pt-4">
				<label className="mb-2 block text-sm font-medium text-gray-700">
					Allergens
				</label>
				<div className="flex flex-wrap gap-2">
					{COMMON_ALLERGENS.map((allergen) => {
						const isActive = item.allergens.some(
							(a) => a.name === allergen.name,
						);
						return (
							<button
								key={allergen.name}
								type="button"
								onClick={() => toggleAllergen(allergen)}
								className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
									isActive
										? "bg-brand-500 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{allergen.name}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
