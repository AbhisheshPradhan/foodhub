"use client";

import { Trash } from "lucide-react";

interface DeleteButtonProps {
	size?: "xs" | "sm" | "md";
	onClick?: (e: React.MouseEvent) => void;
	disabled?: boolean;
	className?: string;
	type?: "button";
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
	size = "md",
	onClick,
	className = "",
	disabled = false,
	type = "button",
}) => {
	const sizeClasses = {
		xs: "px-3 py-2 text-sm",
		sm: "px-4 py-3 text-sm",
		md: "px-5 py-3.5 text-sm",
	};

	return (
		<button
			className={`inline-flex items-center justify-center gap-2 rounded-lg transition bg-white text-red-600 ring-1 hover:text-white  hover:bg-red-600 border border-red-600 ${className} ${
				sizeClasses[size]
			} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
			onClick={onClick}
			disabled={disabled}
			type={type}
		>
			<Trash size={18} />
		</button>
	);
};
