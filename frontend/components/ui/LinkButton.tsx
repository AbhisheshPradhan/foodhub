import type { ReactNode } from "react";
import Link from "next/link";

interface LinkButtonProps {
	href: string;
	children: ReactNode;
	size?: "sm" | "md";
	variant?: "primary" | "outline";
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	className?: string;
	type?: "button" | "submit";
}

export const LinkButton: React.FC<LinkButtonProps> = ({
	href,
	children,
	size = "md",
	variant = "primary",
	startIcon,
	endIcon,
	className = "",
	type = "button",
}) => {
	const sizeClasses = {
		sm: "px-4 py-3 text-sm",
		md: "px-5 py-3.5 text-sm",
	};

	const variantClasses = {
		primary:
			"bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
		outline:
			"bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
	};

	return (
		<Link
			className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
				sizeClasses[size]
			} ${variantClasses[variant]}`}
			href={href}
			type={type}
		>
			{startIcon && (
				<span className="flex items-center">{startIcon}</span>
			)}
			{children}
			{endIcon && <span className="flex items-center">{endIcon}</span>}
		</Link>
	);
};
