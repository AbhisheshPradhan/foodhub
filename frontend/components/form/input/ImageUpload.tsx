"use client";

import { useRef, useState } from "react";
import { Crop, ImagePlus, Trash2 } from "lucide-react";

import { ImageCropModal } from "./ImageCropModal";

interface ImageUploadProps {
	id: string;
	label?: string;
	previewUrl?: string | null;
	onFileSelect: (file: File) => void;
	onRemove: () => void;
	type?: "logo" | "cover";
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
	id,
	previewUrl,
	onFileSelect,
	onRemove,
	type,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [showCropModal, setShowCropModal] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onFileSelect(file);
		}
		e.target.value = "";
	};

	const handleClick = () => {
		inputRef.current?.click();
	};

	return (
		<div>
			<input
				ref={inputRef}
				id={id}
				type="file"
				accept="image/*"
				onChange={handleChange}
				className="hidden"
			/>

			{previewUrl ? (
				<div className="relative inline-block">
					<img
						src={previewUrl}
						alt="Preview"
						className={`h-32 ${type === "cover" ? "w-82" : "h-32 w-32"} rounded-lg border-2 border-gray-200 object-contain`}
					/>
					<div className="absolute -right-2 -top-2 flex gap-1">
						<button
							type="button"
							onClick={() => setShowCropModal(true)}
							className="rounded-full bg-white p-1 shadow-md ring-1 ring-gray-200 transition-colors hover:bg-blue-50"
						>
							<Crop
								size={14}
								className="text-blue-500"
							/>
						</button>
						<button
							type="button"
							onClick={onRemove}
							className="rounded-full bg-white p-1 shadow-md ring-1 ring-gray-200 transition-colors hover:bg-red-50"
						>
							<Trash2
								size={14}
								className="text-red-500"
							/>
						</button>
					</div>

					{showCropModal && previewUrl && (
						<ImageCropModal
							imageSrc={previewUrl}
							aspect={type === "cover" ? 2.5625 : 1}
							onCropDone={(file) => {
								onFileSelect(file);
								setShowCropModal(false);
							}}
							onClose={() => setShowCropModal(false)}
						/>
					)}
				</div>
			) : (
				<button
					type="button"
					onClick={handleClick}
					className={`flex h-32 ${type === "cover" ? "w-82" : "h-32 w-32"} flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 transition-colors hover:border-brand-400 hover:text-brand-500`}
				>
					<ImagePlus size={24} />
					<span className="text-xs font-medium">Upload</span>
				</button>
			)}
		</div>
	);
};
