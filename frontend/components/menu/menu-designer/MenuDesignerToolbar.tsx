"use client";

import { Save, ChevronsDownUp, ChevronsUpDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";

interface MenuDesignerToolbarProps {
	onSaveOrder: () => void;
	onAddCategory: () => void;
	onAddMenuItem: () => void;
	onToggleAll: () => void;
	allCollapsed: boolean;
	isSaving: boolean;
	hasOrderChanges: boolean;
}

export const MenuDesignerToolbar: React.FC<MenuDesignerToolbarProps> = ({
	onSaveOrder,
	onAddCategory,
	onAddMenuItem,
	onToggleAll,
	allCollapsed,
	isSaving,
	hasOrderChanges,
}) => {
	return (
		<div className="flex items-center gap-2">
			<Button
				size="xs"
				variant="primary"
				startIcon={<Plus size={16} />}
				onClick={onAddCategory}
			>
				Add Category
			</Button>

			<Button
				size="xs"
				variant="primary"
				startIcon={<Plus size={16} />}
				onClick={onAddMenuItem}
			>
				Add Item
			</Button>

			{(isSaving || hasOrderChanges) && (
				<Button
					size="xs"
					variant="primary"
					startIcon={<Save size={16} />}
					onClick={onSaveOrder}
					disabled={isSaving}
				>
					{isSaving ? "Saving..." : "Save Order"}
				</Button>
			)}

			<button
				type="button"
				className="ml-auto inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
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
		</div>
	);
};
