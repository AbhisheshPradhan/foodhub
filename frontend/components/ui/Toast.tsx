"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from "lucide-react";

export type ToastVariant = "success" | "info" | "warning" | "error";

interface ToastProps {
	id: string;
	message: string;
	variant?: ToastVariant;
	duration?: number;
	onClose: (id: string) => void;
}

const variantStyles: Record<
	ToastVariant,
	{
		bgColor: string;
		iconBg: string;
		iconColor: string;
		progressColor: string;
		Icon: typeof CheckCircle;
	}
> = {
	success: {
		bgColor: "bg-white",
		iconBg: "bg-green-50",
		iconColor: "text-green-500",
		progressColor: "bg-green-500",
		Icon: CheckCircle,
	},
	info: {
		bgColor: "bg-white",
		iconBg: "bg-blue-50",
		iconColor: "text-blue-500",
		progressColor: "bg-blue-500",
		Icon: Info,
	},
	warning: {
		bgColor: "bg-white",
		iconBg: "bg-orange-50",
		iconColor: "text-orange-500",
		progressColor: "bg-orange-500",
		Icon: AlertTriangle,
	},
	error: {
		bgColor: "bg-white",
		iconBg: "bg-red-50",
		iconColor: "text-red-500",
		progressColor: "bg-red-500",
		Icon: AlertCircle,
	},
};

export const Toast = ({
	id,
	message,
	variant = "info",
	duration = 2000,
	onClose,
}: ToastProps) => {
	const [progress, setProgress] = useState(100);
	const [isPaused, setIsPaused] = useState(false);

	const { bgColor, iconBg, iconColor, progressColor, Icon } =
		variantStyles[variant];

	useEffect(() => {
		if (isPaused) return;

		const interval = 50;
		const decrement = (interval / duration) * 100;

		const timer = setInterval(() => {
			setProgress((prev) => {
				const next = prev - decrement;
				if (next <= 0) {
					clearInterval(timer);
					return 0;
				}
				return next;
			});
		}, interval);

		return () => clearInterval(timer);
	}, [duration, isPaused]);

	useEffect(() => {
		if (progress <= 0) {
			onClose(id);
		}
	}, [progress, id, onClose]);

	return (
		<div
			className={`${bgColor} rounded-lg shadow-lg overflow-hidden min-w-[320px] max-w-md`}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			<div className="flex items-center gap-3 p-4">
				<div className={`${iconBg} p-2 rounded-lg`}>
					<Icon className={`${iconColor} w-5 h-5`} />
				</div>
				<p className="flex-1 text-gray-800 text-sm font-medium">
					{message}
				</p>
				<button
					onClick={() => onClose(id)}
					className="text-gray-400 hover:text-gray-600 transition-colors"
					aria-label="Close toast"
				>
					<X className="w-5 h-5" />
				</button>
			</div>
			<div className="h-1 w-full bg-gray-100">
				<div
					className={`h-full ${progressColor} transition-all duration-50 ease-linear`}
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
};
