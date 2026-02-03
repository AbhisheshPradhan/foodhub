"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import { useRestaurants } from "@/contexts/RestaurantContext";
import { Restaurant } from "@/types";
import { Label } from "@/components/form/Label";
import { ImageUpload } from "@/components/form/input/ImageUpload";
import { ColorPicker } from "@/components/form/input/ColorPicker";
import { Button } from "@/components/ui/Button";

export const BrandingForm = () => {
	const { isLoading, selectedRestaurant } = useRestaurants();
	const [isSaving, setIsSaving] = useState(false);
	const [restaurantDetails, setRestaurantDetails] =
		useState<Restaurant | null>(() => selectedRestaurant);

	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [logoPreview, setLogoPreview] = useState<string | null>(
		() => selectedRestaurant?.logoUrl || null,
	);

	const [coverFile, setCoverFile] = useState<File | null>(null);
	const [coverPreview, setCoverPreview] = useState<string | null>(
		() => selectedRestaurant?.coverPhotoUrl || null,
	);

	const handleLogoSelect = (file: File) => {
		setLogoFile(file);
		setLogoPreview(URL.createObjectURL(file));

		console.log("handleLogoSelect", URL.createObjectURL(file));
	};

	const handleLogoRemove = () => {
		setLogoFile(null);
		setLogoPreview(null);
		setRestaurantDetails((prev) => {
			if (!prev) return prev;
			return { ...prev, logoUrl: "" };
		});
	};

	const handleCoverSelect = (file: File) => {
		setCoverFile(file);
		setCoverPreview(URL.createObjectURL(file));
	};

	const handleCoverRemove = () => {
		setCoverFile(null);
		setCoverPreview(null);
		setRestaurantDetails((prev) => {
			if (!prev) return prev;
			return { ...prev, coverPhotoUrl: "" };
		});
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSaving(true);
		setTimeout(() => {
			console.log("handleSave branding", {
				restaurantDetails,
				logoFile,
				coverFile,
			});
			setIsSaving(false);
		}, 2000);
	};

	if (isLoading || !selectedRestaurant) {
		return null;
	}

	return (
		<form onSubmit={handleSave}>
			<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
				<div className="space-y-6 border-t border-gray-100 p-5 sm:p-5 dark:border-gray-800">
					<div>
						<Label>Logo</Label>
						<ImageUpload
							id="logo"
							previewUrl={logoPreview}
							onFileSelect={handleLogoSelect}
							onRemove={handleLogoRemove}
						/>
					</div>

					<div>
						<Label>Cover Photo</Label>
						<ImageUpload
							id="coverPhoto"
							previewUrl={coverPreview}
							onFileSelect={handleCoverSelect}
							onRemove={handleCoverRemove}
							type="cover"
						/>
					</div>

					<div className="relative">
						<Label htmlFor="brandColor">Brand Colour</Label>
						<ColorPicker
							id="brandColor"
							value={restaurantDetails?.brandColor || "#1f1f1f"}
							onChange={(color) =>
								setRestaurantDetails((prev) => {
									console.log(
										"setRestaurantDetails color",
										color,
									);
									if (!prev) return prev;
									return { ...prev, brandColor: color };
								})
							}
						/>
					</div>

					<div className="w-full">
						<div className="mt-1 flex items-center gap-4 justify-end">
							<Button
								type="submit"
								variant="primary"
								disabled={isSaving}
								startIcon={<Save size={16} />}
								size="sm"
							>
								{isSaving ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};
