"use client";

import { useState } from "react";
import {
	Save,
	RotateCcw,
	ChevronsDownUp,
	ChevronsUpDown,
	Plus,
	ChevronDown,
	FolderPlus,
	UtensilsCrossed,
	Check,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { DropdownItem } from "@/components/ui/DropdownItem";

interface MenuDesignerToolbarProps {
	onSaveOrder: () => void;
	onResetOrder: () => void;
	onAddCategory: () => void;
	onAddMenuItem: () => void;
	onToggleAll: () => void;
	allCollapsed: boolean;
	isSaving: boolean;
	saveSuccess: boolean;
	hasOrderChanges: boolean;
}

export const MenuDesignerToolbar: React.FC<MenuDesignerToolbarProps> = ({
	onSaveOrder,
	onResetOrder,
	onAddCategory,
	onAddMenuItem,
	onToggleAll,
	allCollapsed,
	isSaving,
	saveSuccess,
	hasOrderChanges,
}) => {
	const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);

	return (
		<div className="flex items-center gap-2">
			<div className="relative">
				<Button
					size="xs"
					variant="primary"
					startIcon={<Plus size={16} />}
					endIcon={<ChevronDown size={14} />}
					onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
					className="dropdown-toggle"
				>
					Add
				</Button>
				<Dropdown
					isOpen={isAddDropdownOpen}
					onClose={() => setIsAddDropdownOpen(false)}
					className="left-0 right-auto min-w-[160px]"
				>
					<div className="py-1">
						<DropdownItem
							onClick={() => {
								onAddCategory();
								setIsAddDropdownOpen(false);
							}}
						>
							<span className="flex items-center gap-2">
								<FolderPlus size={16} />
								Category
							</span>
						</DropdownItem>
						<DropdownItem
							onClick={() => {
								onAddMenuItem();
								setIsAddDropdownOpen(false);
							}}
						>
							<span className="flex items-center gap-2">
								<UtensilsCrossed size={16} />
								Menu Item
							</span>
						</DropdownItem>
					</div>
				</Dropdown>
			</div>

			<button
				type="button"
				className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
				onClick={onToggleAll}
			>
				{allCollapsed ? (
					<>
						<ChevronsUpDown size={16} />
						Expand All
					</>
				) : (
					<>
						<ChevronsDownUp size={16} />
						Collapse All
					</>
				)}
			</button>

			{(isSaving || hasOrderChanges || saveSuccess) && (
				<div className="ml-auto flex items-center gap-2">
					<Button
						size="xs"
						variant="outline"
						startIcon={<RotateCcw size={16} />}
						onClick={onResetOrder}
						disabled={isSaving}
					>
						Reset Order
					</Button>
					<Button
						size="xs"
						variant="primary"
						className={
							saveSuccess
								? "bg-green-500 hover:bg-green-500"
								: ""
						}
						startIcon={
							saveSuccess ? <Check size={16} /> : <Save size={16} />
						}
						onClick={onSaveOrder}
						disabled={isSaving || saveSuccess}
					>
						{isSaving ? "Saving..." : saveSuccess ? "Saved" : "Save Order"}
					</Button>
				</div>
			)}
		</div>
	);
};
