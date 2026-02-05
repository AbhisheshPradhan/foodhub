"use client";

import { Label } from "@/components/form/Label";
import { TextInput } from "@/components/form/input/TextInput";
import { ColorPicker } from "@/components/form/input/ColorPicker";
import { QrCodeConfig, QrFrameType } from "@/types";
import { FRAME_SVG_MAP } from "./frame-svgs";

const FRAME_TYPE_OPTIONS: { value: QrFrameType; label: string }[] = [
	{ value: "none", label: "None" },
];

interface QrFrameSectionProps {
	config: QrCodeConfig;
	onChange: <K extends keyof QrCodeConfig>(
		key: K,
		value: QrCodeConfig[K],
	) => void;
}

export const QrFrameSection: React.FC<QrFrameSectionProps> = ({
	config,
	onChange,
}) => {
	return (
		<>
			<div>
				<Label htmlFor="frameType">Frame Type</Label>
				<div className="mt-2 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
					{FRAME_TYPE_OPTIONS.map((opt) => {
						const SvgComponent = FRAME_SVG_MAP[opt.value];
						const isSelected = config.frameType === opt.value;
						return (
							<button
								key={opt.value}
								type="button"
								onClick={() => onChange("frameType", opt.value)}
								className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-colors cursor-pointer ${
									isSelected
										? "bg-brand-50 ring-2 ring-brand-500 text-brand-700"
										: "ring-1 ring-gray-200 text-gray-600 hover:ring-gray-300 hover:bg-gray-50"
								}`}
							>
								<div className="w-full aspect-5/6">
									<SvgComponent />
								</div>
								<span className="text-[10px] font-medium leading-tight text-center">
									{opt.label}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{config.frameType !== "none" && (
				<>
					<div className="flex items-center gap-8">
						<div className="flex-1">
							<Label htmlFor="frameText">Frame Text</Label>
							<TextInput
								id="frameText"
								placeholder="e.g. SCAN ME"
								value={config.frameText}
								onChange={(e) =>
									onChange("frameText", e.target.value)
								}
							/>
						</div>

						<div className="flex-1">
							<Label htmlFor="frameColor">Frame Colour</Label>
							<ColorPicker
								id="frameColor"
								value={config.frameColor}
								onChange={(color) =>
									onChange("frameColor", color)
								}
							/>
						</div>
					</div>

					<div className="flex items-center gap-8">
						<div className="flex-1">
							<Label htmlFor="frameBackgroundColor">
								Background Colour
							</Label>
							<ColorPicker
								id="frameBackgroundColor"
								value={config.frameBackgroundColor}
								onChange={(color) =>
									onChange("frameBackgroundColor", color)
								}
							/>
						</div>

						<div className="flex-1">
							<Label htmlFor="frameTextColor">Text Colour</Label>
							<ColorPicker
								id="frameTextColor"
								value={config.frameTextColor}
								onChange={(color) =>
									onChange("frameTextColor", color)
								}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};
