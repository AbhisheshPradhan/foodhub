"use client";

import { Label } from "@/components/form/Label";
import { ColorPicker } from "@/components/form/input/ColorPicker";
import { QrCodeConfig, QrCornerFrameStyle, QrCornerDotType } from "@/types";

const CORNER_FRAME_OPTIONS: { value: QrCornerFrameStyle; label: string }[] = [
	{ value: "square", label: "Square" },
	{ value: "dot", label: "Dot" },
	{ value: "extra-rounded", label: "Extra Rounded" },
];

const CORNER_DOT_OPTIONS: { value: QrCornerDotType; label: string }[] = [
	{ value: "square", label: "Square" },
	{ value: "dot", label: "Dot" },
	{ value: "none", label: "None" },
];

interface QrCornersSectionProps {
	config: QrCodeConfig;
	onChange: <K extends keyof QrCodeConfig>(
		key: K,
		value: QrCodeConfig[K],
	) => void;
}

export const QrCornersSection: React.FC<QrCornersSectionProps> = ({
	config,
	onChange,
}) => {
	return (
		<>
			<div className="flex items-center gap-8">
				<div className="flex-1">
					<Label htmlFor="cornerFrameStyle">Corner Frame Style</Label>
					<select
						id="cornerFrameStyle"
						value={config.cornerFrameStyle}
						onChange={(e) =>
							onChange(
								"cornerFrameStyle",
								e.target.value as QrCornerFrameStyle,
							)
						}
						className="border rounded-lg border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 cursor-pointer"
					>
						{CORNER_FRAME_OPTIONS.map((opt) => (
							<option
								key={opt.value}
								value={opt.value}
								className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
							>
								{opt.label}
							</option>
						))}
					</select>
				</div>

				<div className="flex-1">
					<Label htmlFor="cornerDotType">Corner Dot Type</Label>
					<select
						id="cornerDotType"
						value={config.cornerDotType}
						onChange={(e) =>
							onChange(
								"cornerDotType",
								e.target.value as QrCornerDotType,
							)
						}
						className="border rounded-lg border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 cursor-pointer"
					>
						{CORNER_DOT_OPTIONS.map((opt) => (
							<option
								key={opt.value}
								value={opt.value}
								className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
							>
								{opt.label}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="flex items-center gap-8">
				<div className="flex-1">
					<Label htmlFor="cornerFrameColor">
						Corner Frame Colour
					</Label>
					<ColorPicker
						id="cornerFrameColor"
						value={config.cornerFrameColor}
						onChange={(color) =>
							onChange("cornerFrameColor", color)
						}
					/>
				</div>

				<div className="flex-1">
					<Label htmlFor="cornerDotColor">Corner Dot Colour</Label>
					<ColorPicker
						id="cornerDotColor"
						value={config.cornerDotColor}
						onChange={(color) => onChange("cornerDotColor", color)}
					/>
				</div>
			</div>
		</>
	);
};
