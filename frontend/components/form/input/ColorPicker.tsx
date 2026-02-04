"use client";

import { useRef, useEffect } from "react";

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
	const colorInputRef = useRef<HTMLInputElement>(null);
	const textInputRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (buttonRef.current) {
			buttonRef.current.style.backgroundColor = value;
		}
		if (
			textInputRef.current &&
			textInputRef.current !== document.activeElement
		) {
			textInputRef.current.value = value;
		}
	}, [value]);

	const handleColorInput = (color: string) => {
		if (buttonRef.current) {
			buttonRef.current.style.backgroundColor = color;
		}
		if (textInputRef.current) {
			textInputRef.current.value = color;
		}
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		debounceRef.current = setTimeout(() => onChange(color), 150);
	};

	const handleColorCommit = (color: string) => {
		if (buttonRef.current) {
			buttonRef.current.style.backgroundColor = color;
		}
		if (textInputRef.current) {
			textInputRef.current.value = color;
		}
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		onChange(color);
	};

	return (
		<div className="flex items-center gap-3">
			<div className="relative shrink-0">
				<button
					ref={buttonRef}
					type="button"
					onClick={() => colorInputRef.current?.click()}
					className="h-10 w-10 rounded-lg border border-gray-200 shadow-theme-xs"
					style={{ backgroundColor: value }}
				/>
				<input
					ref={colorInputRef}
					type="color"
					defaultValue={value}
					onInput={(e) =>
						handleColorInput((e.target as HTMLInputElement).value)
					}
					onChange={(e) => handleColorCommit(e.target.value)}
					className="absolute top-0 left-0 h-10 w-10 cursor-pointer opacity-0"
				/>
			</div>

			<input
				ref={textInputRef}
				id={id}
				type="text"
				defaultValue={value}
				onChange={(e) => handleColorCommit(e.target.value)}
				className="h-10 w-28 rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 uppercase focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90"
			/>
		</div>
	);
};
