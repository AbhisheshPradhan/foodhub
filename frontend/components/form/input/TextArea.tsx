import type React from "react";
import type { FC } from "react";

interface TextAreaProps {
	id?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	rows?: number;
	disabled?: boolean;
	hint?: string;
}

export const TextArea: FC<TextAreaProps> = ({
	id,
	name,
	placeholder,
	value,
	onChange,
	className = "",
	rows = 3,
	disabled = false,
	hint,
}) => {
	let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

	if (disabled) {
		textareaClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
	} else {
		textareaClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`;
	}

	return (
		<div>
			<textarea
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				rows={rows}
				disabled={disabled}
				className={textareaClasses}
			/>
			{hint && (
				<p className="mt-1.5 text-xs text-gray-500">{hint}</p>
			)}
		</div>
	);
};
