"use client";

import { useCallback, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { X } from "lucide-react";

interface ImageCropModalProps {
	imageSrc: string;
	aspect: number;
	onCropDone: (file: File) => void;
	onClose: () => void;
}

function getCroppedImage(imageSrc: string, crop: Area): Promise<File> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.crossOrigin = "anonymous";
		image.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = crop.width;
			canvas.height = crop.height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(new Error("Failed to get canvas context"));
				return;
			}
			ctx.drawImage(
				image,
				crop.x,
				crop.y,
				crop.width,
				crop.height,
				0,
				0,
				crop.width,
				crop.height,
			);
			canvas.toBlob((blob) => {
				if (!blob) {
					reject(new Error("Failed to create blob"));
					return;
				}
				resolve(new File([blob], "cropped.png", { type: "image/png" }));
			}, "image/png");
		};
		image.onerror = () => reject(new Error("Failed to load image"));
		image.src = imageSrc;
	});
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
	imageSrc,
	aspect,
	onCropDone,
	onClose,
}) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const croppedAreaRef = useRef<Area | null>(null);
	const backdropRef = useRef<HTMLDivElement>(null);

	const onCropComplete = useCallback(
		(_croppedArea: Area, croppedAreaPixels: Area) => {
			croppedAreaRef.current = croppedAreaPixels;
		},
		[],
	);

	const handleApply = async () => {
		if (!croppedAreaRef.current) return;
		const file = await getCroppedImage(imageSrc, croppedAreaRef.current);
		onCropDone(file);
	};

	return (
		<div
			ref={backdropRef}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
			onClick={(e) => {
				if (e.target === backdropRef.current) onClose();
			}}
		>
			<div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-semibold text-gray-900">
						Crop Image
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
					>
						<X size={20} />
					</button>
				</div>

				<div className="relative h-72 w-full rounded-lg bg-gray-100">
					<Cropper
						image={imageSrc}
						crop={crop}
						zoom={zoom}
						aspect={aspect}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={onCropComplete}
					/>
				</div>

				<div className="mt-4 flex items-center justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-100"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleApply}
						className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
};
