import { MenuItem } from "@/types";

export const DietaryBadges = ({ item }: { item: MenuItem }) => {
	const badges: { label: string; color: string }[] = [];
	if (item.isVegan)
		badges.push({ label: "VG", color: "bg-green-100 text-green-700" });
	else if (item.isVegetarian)
		badges.push({ label: "V", color: "bg-emerald-100 text-emerald-700" });
	if (item.isGlutenFree)
		badges.push({ label: "GF", color: "bg-amber-100 text-amber-700" });

	if (badges.length === 0) return null;

	return (
		<span className="flex gap-1">
			{badges.map((b) => (
				<span
					key={b.label}
					className={`rounded px-1 py-0.5 text-[9px] font-semibold leading-none ${b.color}`}
				>
					{b.label}
				</span>
			))}
		</span>
	);
};
