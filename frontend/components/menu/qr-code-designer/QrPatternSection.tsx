"use client";

import { Label } from "@/components/form/Label";
import { ColorPicker } from "@/components/form/input/ColorPicker";
import { QrCodeConfig, QrPatternStyle } from "@/types";

const PATTERN_STYLE_OPTIONS: { value: QrPatternStyle; label: string }[] = [
	{ value: "square", label: "Square" },
	{ value: "dots", label: "Dots" },
	{ value: "rounded", label: "Rounded" },
	{ value: "classy", label: "Classy" },
	{ value: "classy-rounded", label: "Classy Rounded" },
	{ value: "extra-rounded", label: "Extra Rounded" },
];

interface QrPatternSectionProps {
	config: QrCodeConfig;
	onChange: <K extends keyof QrCodeConfig>(
		key: K,
		value: QrCodeConfig[K],
	) => void;
}

export const QrPatternSection: React.FC<QrPatternSectionProps> = ({
	config,
	onChange,
}) => {
	return (
		<>
			<div>
				<Label htmlFor="patternStyle">Pattern Style</Label>
				<select
					id="patternStyle"
					value={config.patternStyle}
					onChange={(e) =>
						onChange(
							"patternStyle",
							e.target.value as QrPatternStyle,
						)
					}
					className="border rounded-lg border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 cursor-pointer"
				>
					{PATTERN_STYLE_OPTIONS.map((opt) => (
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
			<div className="flex items-center gap-8">
				<div className="flex-1">
					<Label htmlFor="dotColor">Dot Colour</Label>
					<ColorPicker
						id="dotColor"
						value={config.dotColor}
						onChange={(color) => onChange("dotColor", color)}
					/>
				</div>

				<div className="flex-1">
					<Label htmlFor="patternBackgroundColor">
						Background Colour
					</Label>
					<ColorPicker
						id="patternBackgroundColor"
						value={config.patternBackgroundColor}
						onChange={(color) =>
							onChange("patternBackgroundColor", color)
						}
					/>
				</div>
			</div>
		</>
	);
};
