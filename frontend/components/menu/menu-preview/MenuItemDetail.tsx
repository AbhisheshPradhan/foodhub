"use client";

import { MenuItem } from "@/types";
import { SpiceIndicator } from "./SpiceIndicator";
import { DietaryBadges } from "./DietaryBadges";

export const MenuItemDetail = ({
	item,
	onClose,
}: {
	item: MenuItem;
	onClose: () => void;
}) => {
	return (
		<div
			className="absolute inset-0 z-30 flex flex-col justify-end"
			onClick={onClose}
		>
			<div className="absolute inset-0 bg-black/40" />

			<div
				className="relative max-h-[70%] overflow-y-auto rounded-t-2xl bg-white"
				style={{
					animation: "menuSheetUp 0.25s ease-out",
					scrollbarWidth: "none",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="sticky top-0 z-10 flex justify-center bg-white pb-1 pt-3">
					<div className="h-1 w-10 rounded-full bg-gray-300" />
				</div>

				<div className="px-4 pb-6">
					<div className="flex items-start justify-between gap-3">
						<h2 className="text-[16px] font-bold leading-tight text-gray-900">
							{item.name}
						</h2>
						<span className="shrink-0 text-[16px] font-bold text-gray-900">
							${item.price}
						</span>
					</div>

					<p className="mt-1.5 text-[12px] leading-relaxed text-gray-600">
						{item.description}
					</p>

					<div className="mt-3 flex flex-wrap items-center gap-2">
						{item.isSpicy && (
							<SpiceIndicator level={item.spiceLevel} />
						)}
						<DietaryBadges item={item} />
						<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
							{item.calories} cal
						</span>
						<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
							{item.preparationTime} min
						</span>
					</div>

					{item.allergens.length > 0 && (
						<div className="mt-4">
							<h4 className="text-[12px] font-semibold text-gray-900">
								Allergens
							</h4>
							<div className="mt-1.5 flex flex-wrap gap-1.5">
								{item.allergens.map((a, index) => (
									<span
										key={`item-${item.id}-allergens-${index}-${a.id}`}
										className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] text-red-700"
									>
										<span>{a.icon}</span>
										{a.name}
									</span>
								))}
							</div>
						</div>
					)}

					{item?.modifiers?.length > 0 && (
						<div className="mt-4">
							<h4 className="text-[12px] font-semibold text-gray-900">
								Options
							</h4>
							<div className="mt-1.5 flex flex-col gap-2">
								{item?.modifiers.map((mod, index) => (
									<div
										key={`item-${item.id}-modifiers-${index}-${mod.modifierType}`}
										className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2"
									>
										<div>
											<span className="text-[12px] font-medium text-gray-900">
												{mod.name}
											</span>
										</div>
										{parseFloat(mod.priceAdjustment) >
											0 && (
											<span className="shrink-0 text-[11px] font-semibold text-gray-700">
												+${mod.priceAdjustment}
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
