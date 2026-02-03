"use client";

import { useState } from "react";

import { Label } from "@/components/form/Label";
import { ImageUpload } from "@/components/form/input/ImageUpload";
import { QrCodeConfig } from "@/types";

interface QrLogoSectionProps {
	config: QrCodeConfig;
	onChange: <K extends keyof QrCodeConfig>(
		key: K,
		value: QrCodeConfig[K],
	) => void;
	logoFile: File | null;
	onLogoFileChange: (file: File | null) => void;
	restaurantLogoUrl: string | null;
}

export const QrLogoSection: React.FC<QrLogoSectionProps> = ({
	config,
	onChange,
	logoFile,
	onLogoFileChange,
	restaurantLogoUrl,
}) => {
	const [logoPreview, setLogoPreview] = useState<string | null>(null);

	const handleLogoSelect = (file: File) => {
		onLogoFileChange(file);
		const previewUrl = URL.createObjectURL(file);
		setLogoPreview(previewUrl);
		onChange("logoUrl", previewUrl);
	};

	const handleLogoRemove = () => {
		onLogoFileChange(null);
		setLogoPreview(null);
		onChange("logoUrl", null);
	};

	const showToggle = !!restaurantLogoUrl;

	return (
		<>
			{showToggle && (
				<div>
					<Label>Logo Source</Label>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => {
								onChange("useRestaurantLogo", true);
								onChange(
									"logoUrl",
									restaurantLogoUrl,
								);
								onLogoFileChange(null);
								setLogoPreview(null);
							}}
							className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
								config.useRestaurantLogo
									? "bg-brand-50 text-brand-600 ring-2 ring-brand-500"
									: "text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
							}`}
						>
							Use Restaurant Logo
						</button>
						<button
							type="button"
							onClick={() => {
								onChange(
									"useRestaurantLogo",
									false,
								);
								onChange("logoUrl", null);
							}}
							className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
								!config.useRestaurantLogo
									? "bg-brand-50 text-brand-600 ring-2 ring-brand-500"
									: "text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
							}`}
						>
							Upload Custom Logo
						</button>
					</div>
				</div>
			)}

			{config.useRestaurantLogo && restaurantLogoUrl ? (
				<div>
					<img
						src={restaurantLogoUrl}
						alt="Restaurant logo"
						className="h-32 w-32 rounded-lg border-2 border-gray-200 object-contain"
					/>
				</div>
			) : (
				<div>
					<ImageUpload
						id="qrLogo"
						previewUrl={logoPreview || config.logoUrl}
						onFileSelect={handleLogoSelect}
						onRemove={handleLogoRemove}
					/>
				</div>
			)}
		</>
	);
};
