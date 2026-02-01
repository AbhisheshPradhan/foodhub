"use client";

import { Save, ChevronsDownUp, ChevronsUpDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";

interface MenuDesignerToolbarProps {
	onSave: () => void;
	onAddCategory: () => void;
	onAddMenuItem: () => void;
	onToggleAll: () => void;
	allCollapsed: boolean;
	isSaving?: boolean;
	hasChanges?: boolean;
}

export const MenuDesignerToolbar: React.FC<MenuDesignerToolbarProps> = ({
	onSave,
	onAddCategory,
	onAddMenuItem,
	onToggleAll,
	allCollapsed,
	isSaving = false,
	hasChanges = false,
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

			<Button
				size="xs"
				variant="primary"
				startIcon={<Save size={16} />}
				onClick={onSave}
				disabled={isSaving || !hasChanges}
			>
				{isSaving ? "Saving..." : "Save Changes"}
			</Button>

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
