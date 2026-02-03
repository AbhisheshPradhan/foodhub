"use client";

import { useRef } from "react";

interface ColorPickerProps {
	id: string;
	value: string;
	onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
	id,
	value,
	onChange,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="flex items-center gap-3">
			<div className="relative shrink-0">
				<button
					type="button"
					onClick={() => inputRef.current?.click()}
					className="h-10 w-10 rounded-lg border border-gray-200 shadow-theme-xs"
					style={{ backgroundColor: value }}
				/>
				<input
					ref={inputRef}
					type="color"
					value={value}
					onInput={(e) =>
						onChange((e.target as HTMLInputElement).value)
					}
					onChange={(e) => onChange(e.target.value)}
					className="absolute top-0 left-0 h-10 w-10 cursor-pointer opacity-0"
				/>
			</div>

			<input
				id={id}
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="h-10 w-28 rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 uppercase focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90"
			/>
		</div>
	);
};
