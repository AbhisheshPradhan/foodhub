"use client";

import { SpiceIndicator } from "./SpiceIndicator";
import { DietaryBadges } from "./DietaryBadges";
import { MenuItem } from "@/types";

export const MenuItemCard = ({
	item,
	onTap,
}: {
	item: MenuItem;
	onTap: () => void;
}) => {
	return (
		<div
			className="cursor-pointer border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 active:bg-gray-50"
			onClick={onTap}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-1.5">
						<h4 className="truncate text-[13px] font-semibold text-gray-900">
							{item.name}
						</h4>
						{item.isSpicy && (
							<SpiceIndicator level={item.spiceLevel} />
						)}
					</div>
					<p className="mt-0.5 line-clamp-2 text-[11px] leading-tight text-gray-500">
						{item.description}
					</p>
					<div className="mt-1.5 flex flex-wrap items-center gap-1.5">
						<DietaryBadges item={item} />
						{item.allergens.length > 0 && (
							<span
								className="flex gap-0.5"
								title={item.allergens
									.map((a) => a.name)
									.join(", ")}
							>
								{item.allergens.map((a) => (
									<span
										key={a.id}
										className="text-[10px]"
									>
										{a.icon}
									</span>
								))}
							</span>
						)}
						<span className="text-[10px] text-gray-400">
							{item.calories} cal
						</span>
					</div>
					{item.modifiers.length > 0 && (
						<div className="mt-1.5 flex flex-wrap gap-1">
							{item.modifiers.map((mod) => (
								<span
									key={mod.id}
									className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-600"
								>
									{mod.name}
									{parseFloat(mod.priceAdjustment) > 0 && (
										<span className="ml-0.5 text-gray-400">
											+${mod.priceAdjustment}
										</span>
									)}
								</span>
							))}
						</div>
					)}
				</div>
				<span className="shrink-0 text-[13px] font-bold text-gray-900">
					${item.price}
				</span>
			</div>
		</div>
	);
};
