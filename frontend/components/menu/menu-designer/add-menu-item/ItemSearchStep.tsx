"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Check, X } from "lucide-react";

import {
	NEPALI_MENU_ITEMS,
	type NepaliMenuItemTemplate,
} from "./nepaliMenuItems";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/form/Label";

export const ItemSearchStep = ({
	onSelectItems,
	onAddCustom,
	onClose,
}: {
	onSelectItems: (items: NepaliMenuItemTemplate[]) => void;
	onAddCustom: () => void;
	onClose: () => void;
}) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
		new Set(),
	);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const filteredItems = useMemo(() => {
		const query = searchQuery.toLowerCase();
		return NEPALI_MENU_ITEMS.map((item, index) => ({
			item,
			index,
		})).filter(
			({ item }) =>
				item.name.toLowerCase().includes(query) ||
				item.description.toLowerCase().includes(query),
		);
	}, [searchQuery]);

	const toggleItem = (index: number) => {
		setSelectedIndices((prev) => {
			const next = new Set(prev);
			if (next.has(index)) {
				next.delete(index);
			} else {
				next.add(index);
			}
			return next;
		});
	};

	const handleNext = () => {
		const selected = Array.from(selectedIndices).map(
			(i) => NEPALI_MENU_ITEMS[i],
		);
		onSelectItems(selected);
	};

	return (
		<div className="flex flex-col h-full justify-between">
			<div className="px-6 pb-4 flex flex-col gap-3">
				<Button
					type="button"
					onClick={onAddCustom}
					className="w-50 text-center"
				>
					<Plus size={16} />
					Add Custom Item
				</Button>

				<div className="text-center">OR</div>

				<div>
					<Label>Bulk Add and Edit menu items</Label>
				</div>
				<div className="relative">
					<Search
						size={16}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
					/>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
							setIsDropdownOpen(true);
						}}
						onFocus={() => {
							setIsDropdownOpen(true);
						}}
						onBlur={() => {
							setTimeout(() => setIsDropdownOpen(false), 150);
						}}
						placeholder="Search popular Nepali menu items"
						className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
					/>

					{isDropdownOpen && (
						<div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-50 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
							{filteredItems.length === 0 ? (
								<div className="px-3 py-2 text-sm text-gray-400">
									No items found
								</div>
							) : (
								filteredItems.map(({ item, index }) => {
									const isSelected =
										selectedIndices.has(index);
									return (
										<button
											key={index}
											type="button"
											onMouseDown={(e) => {
												e.preventDefault();
												toggleItem(index);
											}}
											className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
												isSelected ? "bg-brand-50" : ""
											}`}
										>
											<span
												className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
													isSelected
														? "border-brand-500 bg-brand-500"
														: "border-gray-300"
												}`}
											>
												{isSelected && (
													<Check
														size={10}
														className="text-white"
													/>
												)}
											</span>
											<span className="text-gray-900">
												{item.name}
											</span>
										</button>
									);
								})
							)}
						</div>
					)}
				</div>

				<div className="flex-1 overflow-y-auto">
					{selectedIndices.size > 0 && (
						<div>
							<p className="mb-1.5 text-xs font-medium text-gray-500">
								Selected ({selectedIndices.size})
							</p>
							<div className="flex flex-wrap gap-1.5">
								{Array.from(selectedIndices).map((idx) => (
									<span
										key={idx}
										className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-medium text-brand-700"
									>
										{NEPALI_MENU_ITEMS[idx].name}
										<button
											type="button"
											onClick={() => toggleItem(idx)}
											className="rounded-full hover:bg-brand-200"
										>
											<X size={12} />
										</button>
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="shrink-0 flex items-center justify-between border-t border-gray-100 px-6 py-4">
				<button
					type="button"
					onClick={onClose}
					className="text-sm font-medium text-gray-500 hover:text-gray-700"
				>
					Close
				</button>
				<button
					type="button"
					onClick={handleNext}
					disabled={selectedIndices.size === 0}
					className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{selectedIndices.size > 0
						? `Next (${selectedIndices.size} selected)`
						: "Next"}
				</button>
			</div>
		</div>
	);
};
