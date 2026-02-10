"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/contexts/ToastContext";
import { useRestaurants } from "@/contexts/RestaurantContext";
import { Label } from "@/components/form/Label";
import { ImageUpload } from "@/components/form/input/ImageUpload";
import { ColorPicker } from "@/components/form/input/ColorPicker";
import { Button } from "@/components/ui/Button";
import { updateRestaurant } from "@/services/restaurants";
import {
	restaurantQueryKey,
	restaurantsQueryKey,
} from "@/hooks/useRestaurantsQuery";
import { Restaurant } from "@/types";

interface BrandingFormData {
	brandColor: string;
}

export const BrandingForm = () => {
	const {
		isLoading,
		draftRestaurant,
		updateDraftRestaurantDetails,
		resetDraftRestaurantState,
	} = useRestaurants();
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const [isSaving, setIsSaving] = useState(false);

	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [logoPreview, setLogoPreview] = useState<string | null>(null);

	const [coverFile, setCoverFile] = useState<File | null>(null);
	const [coverPreview, setCoverPreview] = useState<string | null>(null);

	const { control, handleSubmit, reset } = useForm<BrandingFormData>({
		mode: "onChange",
		defaultValues: {
			brandColor: "#1f1f1f",
		},
	});

	useEffect(() => {
		if (draftRestaurant) {
			reset({
				brandColor: draftRestaurant.brandColor || "#1f1f1f",
			});
			setLogoPreview(draftRestaurant.logoUrl || null);
			setCoverPreview(draftRestaurant.coverPhotoUrl || null);
		}
	}, [draftRestaurant, reset]);

	useEffect(() => {
		resetDraftRestaurantState();
	}, [resetDraftRestaurantState]);

	const handleLogoSelect = (file: File) => {
		setLogoFile(file);
		setLogoPreview(URL.createObjectURL(file));
	};

	const handleLogoRemove = () => {
		setLogoFile(null);
		setLogoPreview(null);
		updateDraftRestaurantDetails("logoUrl", "");
	};

	const handleCoverSelect = (file: File) => {
		setCoverFile(file);
		setCoverPreview(URL.createObjectURL(file));
	};

	const handleCoverRemove = () => {
		setCoverFile(null);
		setCoverPreview(null);
		updateDraftRestaurantDetails("coverPhotoUrl", "");
	};

	const onSubmit = async (data: BrandingFormData) => {
		if (!draftRestaurant) return;
		setIsSaving(true);
		try {
			const payload = {
				id: draftRestaurant.id,
				...data,
			};

			console.log("payload", payload);

			const updatedRestaurant = await updateRestaurant(
				draftRestaurant.id,
				payload,
			);

			if (updatedRestaurant.success) {
				queryClient.setQueryData(
					restaurantsQueryKey,
					(old: Restaurant[] | undefined) =>
						old?.map((r) =>
							r.id === updatedRestaurant.data.id
								? updatedRestaurant.data
								: r,
						) ?? [],
				);

				queryClient.setQueryData(
					restaurantQueryKey(draftRestaurant.id),
					(old: Restaurant | undefined) =>
						old
							? { ...old, ...updatedRestaurant.data }
							: updatedRestaurant.data,
				);
				addToast(
					"Restaurant details updated",
					"success",
					"save-restaurant",
				);
			}
		} catch (err) {
			console.error("error saving branding", err);
			addToast("Something went wrong", "error");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
						<Controller
							name="brandColor"
							control={control}
							render={({ field }) => (
								<ColorPicker
									id="brandColor"
									value={field.value}
									onChange={(color) => {
										field.onChange(color);
										updateDraftRestaurantDetails(
											"brandColor",
											color,
										);
									}}
								/>
							)}
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
