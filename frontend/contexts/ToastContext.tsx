"use client";

import {
	createContext,
	useState,
	useContext,
	useCallback,
	ReactNode,
} from "react";
import { Toast, ToastVariant } from "@/components/ui/Toast";

interface ToastData {
	id: string;
	message: string;
	variant: ToastVariant;
	key?: string;
	duration: number;
}

interface ToastContextType {
	toasts: ToastData[];
	addToast: (
		message: string,
		variant?: ToastVariant,
		key?: string | null | undefined,
		duration?: number,
	) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
	children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
	const [toasts, setToasts] = useState<ToastData[]>([]);

	const addToast = useCallback(
		(
			message: string,
			variant: ToastVariant = "info",
			key?: string | null,
			duration: number = 5000,
		) => {
			const id = key ?? crypto.randomUUID();
			const newToast: ToastData = {
				id,
				key: key ?? undefined,
				message,
				variant,
				duration,
			};

			setToasts((prev) => {
				if (key) {
					const filtered = prev.filter((toast) => toast.key !== key);
					return [...filtered, newToast];
				}
				return [...prev, newToast];
			});
		},
		[],
	);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			{children}
			<ToastContainer
				toasts={toasts}
				onClose={removeToast}
			/>
		</ToastContext.Provider>
	);
}

interface ToastContainerProps {
	toasts: ToastData[];
	onClose: (id: string) => void;
}

function ToastContainer({ toasts, onClose }: ToastContainerProps) {
	if (toasts.length === 0) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					id={toast.id}
					message={toast.message}
					variant={toast.variant}
					duration={toast.duration}
					onClose={onClose}
				/>
			))}
		</div>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}
