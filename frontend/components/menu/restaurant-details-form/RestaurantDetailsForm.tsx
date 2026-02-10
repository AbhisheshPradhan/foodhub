"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { updateRestaurant } from "@/services/restaurants";
import { restaurantsQueryKey } from "@/hooks/useRestaurantsQuery";
import { Restaurant } from "@/types";

import { useRestaurants } from "@/contexts/RestaurantContext";
import { Label } from "@/components/form/Label";
import { TextInput } from "@/components/form/input/TextInput";
import { Button } from "@/components/ui/Button";
import { SocialsInput } from "@/components/form/input/SocialsInput";
import { PlaceAutocomplete } from "@/components/form/input/PlaceAutocomplete";

interface RestaurantDetailsFormData {
	name: string;
	email: string;
	address: string;
	phone: string;
	website: string;
	facebook: string;
	instagram: string;
	tiktok: string;
}

export const RestaurantDetailsForm = () => {
	const {
		isLoading,
		draftRestaurant,
		updateDraftRestaurantDetails,
		resetDraftRestaurantState,
	} = useRestaurants();
	const queryClient = useQueryClient();

	const [isSaving, setIsSaving] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RestaurantDetailsFormData>({
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			address: "",
			phone: "",
			website: "",
			facebook: "",
			instagram: "",
			tiktok: "",
		},
	});

	useEffect(() => {
		if (draftRestaurant) {
			reset({
				name: draftRestaurant.name || "",
				email: draftRestaurant.email || "",
				address: draftRestaurant.address || "",
				phone: draftRestaurant.phone || "",
				website: draftRestaurant.website || "",
				facebook: draftRestaurant.facebook || "",
				instagram: draftRestaurant.instagram || "",
				tiktok: draftRestaurant.tiktok || "",
			});
		}
	}, [draftRestaurant, reset]);

	useEffect(() => {
		resetDraftRestaurantState();
	}, [resetDraftRestaurantState]);

	const onSubmit = async (data: RestaurantDetailsFormData) => {
		if (!draftRestaurant) return;

		setIsSaving(true);

		try {
			const payload = {
				id: draftRestaurant.id,
				...data,
			};

			const updatedRestaurant = await updateRestaurant(payload);

			// Update the cache with the response
			queryClient.setQueryData(
				restaurantsQueryKey,
				(old: Restaurant[] | undefined) =>
					old?.map((r) =>
						r.id === updatedRestaurant.id ? updatedRestaurant : r,
					) ?? [],
			);
		} catch (err) {
			console.error("error saving restaurant details", err);
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading || !draftRestaurant) {
		return null;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
				<div className="space-y-6 border-t border-gray-100 p-5 sm:p-5 dark:border-gray-800">
					<div className="w-full">
						<h4 className="text-base font-medium text-gray-800 dark:border-gray-800 dark:text-white/90">
							General Info
						</h4>
					</div>

					<div className="">
						<Label htmlFor="name">
							Restaurant Name{" "}
							<span className="text-error-500">*</span>
						</Label>
						<div className="flex-1 max-w-2/3">
							<Controller
								name="name"
								control={control}
								rules={{
									required: "Restaurant name is required",
								}}
								render={({ field }) => (
									<TextInput
										id="name"
										placeholder="Enter your Restaurant's name"
										value={field.value}
										onChange={(e) => {
											field.onChange(e.target.value);
											updateDraftRestaurantDetails(
												"name",
												e.target.value,
											);
										}}
										error={!!errors.name}
										hint={errors.name?.message}
									/>
								)}
							/>
						</div>
					</div>
					<div className="flex ">
						<div className="flex-1 max-w-2/3">
							<Label htmlFor="website">Website</Label>
							<Controller
								name="website"
								control={control}
								render={({ field }) => (
									<TextInput
										id="website"
										placeholder="www.example.com"
										value={field.value}
										onChange={(e) => {
											field.onChange(e.target.value);
											updateDraftRestaurantDetails(
												"website",
												e.target.value,
											);
										}}
									/>
								)}
							/>
						</div>
					</div>

					<div className="flex justify-between items-center gap-4">
						<div className="flex-1">
							<Label htmlFor="email">Email</Label>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextInput
										id="email"
										placeholder="info@gmail.com"
										value={field.value}
										onChange={(e) => {
											field.onChange(e.target.value);
											updateDraftRestaurantDetails(
												"email",
												e.target.value,
											);
										}}
									/>
								)}
							/>
						</div>
						<div className="shrink-0">
							<Label htmlFor="phone">Phone</Label>

							<Controller
								name="phone"
								control={control}
								render={({ field }) => (
									<TextInput
										id="phone"
										placeholder="+61"
										value={field.value}
										onChange={(e) => {
											field.onChange(e.target.value);
											updateDraftRestaurantDetails(
												"phone",
												e.target.value,
											);
										}}
									/>
								)}
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="address">Address</Label>
						<Controller
							name="address"
							control={control}
							render={({ field }) => (
								<PlaceAutocomplete
									placeholder="Search restaurant location"
									defaultValue={field.value}
									onChange={(address) => {
										field.onChange(address);
										updateDraftRestaurantDetails(
											"address",
											address,
										);
									}}
								/>
							)}
						/>
					</div>
					<div className="w-full">
						<h4 className="border-t border-gray-200 pt-4 text-base font-medium text-gray-800 dark:border-gray-800 dark:text-white/90">
							Socials
						</h4>
					</div>
					<div className="flex justify-between items-center gap-4">
						<div className="flex-1">
							<Label htmlFor="facebook">Facebook</Label>
							<Controller
								name="facebook"
								control={control}
								render={({ field }) => (
									<SocialsInput
										id="facebook"
										value={field.value}
										onChange={(e) => {
											field.onChange(e.target.value);
											updateDraftRestaurantDetails(
												"facebook",
												e.target.value,
											);
										}}
									/>
								)}
							/>
						</div>

						<div className="flex-1">
							<Label htmlFor="instagram">Instagram</Label>
							<Controller
								name="instagram"
								control={control}
								render={({ field }) => (
									<SocialsInput
										id="instagram"
										value={field.value}
										onChange={(e) => {
											field.onChange(e.target.value);
											updateDraftRestaurantDetails(
												"instagram",
												e.target.value,
											);
										}}
									/>
								)}
							/>
						</div>
					</div>
					<div className="flex justify-between items-center gap-4">
						<div className="flex-1">
							<Label htmlFor="tiktok">TikTok</Label>
							<Controller
								name="tiktok"
								control={control}
								render={({ field }) => (
									<SocialsInput
										id="tiktok"
										value={field.value}
										onChange={(e) => {
											field.onChange(e.target.value);
											updateDraftRestaurantDetails(
												"tiktok",
												e.target.value,
											);
										}}
									/>
								)}
							/>
						</div>
						<div className="flex-1"></div>
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
