import { AppHeader } from "@/components/layouts/AppHeader";
import { MenuDnD } from "@/components/menu/menu-designer/MenuDnD";

export default function MenuDesignerPage() {
	return (
		<>
			<AppHeader
				heading="Menu Designer"
				description="Click to edit and drag to re-order categories and menu items"
			/>
			<MenuDnD />
		</>
	);
}
