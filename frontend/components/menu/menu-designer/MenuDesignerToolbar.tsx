"use client";

import { Save, RotateCcw, ChevronsDownUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/Button";

interface MenuDesignerToolbarProps {
	onSaveOrder: () => void;
	onResetOrder: () => void;
	onToggleAll: () => void;
	allCollapsed: boolean;
	isSaving?: boolean;
	hasOrderChanges?: boolean;
}

export const MenuDesignerToolbar: React.FC<MenuDesignerToolbarProps> = ({
	onSaveOrder,
	onResetOrder,
	onToggleAll,
	allCollapsed,
	isSaving = false,
	hasOrderChanges = false,
}) => {
	return (
		<div className="flex items-center gap-3">
			<Button
				size="xs"
				variant="primary"
				startIcon={<Save size={16} />}
				onClick={onSaveOrder}
				disabled={isSaving || !hasOrderChanges}
			>
				{isSaving ? "Saving..." : "Save Order"}
			</Button>

			<Button
				size="xs"
				variant="outline"
				startIcon={<RotateCcw size={16} />}
				onClick={onResetOrder}
				disabled={isSaving || !hasOrderChanges}
			>
				Reset Order
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
