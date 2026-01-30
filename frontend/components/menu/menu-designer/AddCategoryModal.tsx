"use client";

import { useRef, useState } from "react";

import { X } from "lucide-react";

export const AddCategoryModal = ({
	isOpen,
	onClose,
	onSave,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSave: (name: string, description: string) => void;
}) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const backdropRef = useRef<HTMLDivElement>(null);

	if (!isOpen) return null;

	const handleClose = () => {
		setName("");
		setDescription("");
		onClose();
	};

	const handleSave = () => {
		if (!name.trim()) return;
		onSave(name.trim(), description.trim());
		setName("");
		setDescription("");
		onClose();
	};

	return (
		<div
			ref={backdropRef}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
			onClick={(e) => {
				if (e.target === backdropRef.current) handleClose();
			}}
		>
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-900">
						Add Category
					</h2>
					<button
						onClick={handleClose}
						className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
					>
						<X size={18} />
					</button>
				</div>

				<div className="flex flex-col gap-4">
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Category Name
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="e.g. Appetizers"
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
							autoFocus
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Optional description for this category"
							rows={3}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
						/>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-3">
					<button
						onClick={handleClose}
						className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						disabled={!name.trim()}
						className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};
