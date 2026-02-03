"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { useRestaurants } from "@/contexts/RestaurantContext";
import { Restaurant } from "@/types";
import { Label } from "@/components/form/Label";
import { TextInput } from "@/components/form/input/TextInput";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/form/input/PhoneInput";
import { SocialsInput } from "@/components/form/input/SocialsInput";
import { PlaceAutocomplete } from "@/components/form/input/PlaceAutocomplete";

export const RestaurantDetailsForm = () => {
	const {
		isLoading,
		draftRestaurant,
		updateDraftRestaurantDetails,
		updateSelectedRestaurantDetails,
		resetDraftRestaurantState,
	} = useRestaurants();

	const [isSaving, setIsSaving] = useState<boolean>(false);

	const [nameError, setNameError] = useState(false);
	const [nameHint, setNameHint] = useState("");

	useEffect(() => {
		return () => resetDraftRestaurantState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!draftRestaurant?.name) {
			setNameError(true);
			setNameHint("Restaurant name is required.");
			return;
		} else {
			setNameError(false);
			setNameHint("");
		}

		setIsSaving(true);

		try {
			setTimeout(() => {
				updateSelectedRestaurantDetails(draftRestaurant);
				setIsSaving(false);
			}, 2000);
		} catch (err) {
			console.error("error saving restaurant details", err);
		}

		console.log("handleSave restaurantDetails", draftRestaurant);
	};

	if (isLoading || !draftRestaurant) {
		return null;
	}

	return (
		<>
			<form onSubmit={handleSave}>
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
							<TextInput
								id="name"
								placeholder="Enter your Restaurant's name"
								value={draftRestaurant?.name}
								onChange={(e) =>
									updateDraftRestaurantDetails(
										"name",
										e.target.value,
									)
								}
								error={nameError}
								hint={nameHint}
							/>
						</div>
						{/* TODO */}
						{/* <div className="flex justify-between items-center">
							<Label htmlFor="menu-url">
								Menu Url{" "}
								<span className="text-error-500">*</span>{" "}
							</Label>
							<div className="flex-1 max-w-2/3">
								<TextInput
									id="menu-url"
									type="text"
								/>
							</div>
						</div> */}
						<div>
							<Label htmlFor="address">
								Address{" "}
								<span className="text-error-500">*</span>
							</Label>
							<PlaceAutocomplete
								placeholder="Search restaurant location"
								defaultValue={draftRestaurant?.address}
								onChange={(address) =>
									updateDraftRestaurantDetails(
										"address",
										address,
									)
								}
							/>
						</div>

						<div className="flex justify-between items-center gap-4">
							<div className="shrink-0">
								<Label htmlFor="phone">Phone</Label>
								<PhoneInput
									id="phone"
									value={draftRestaurant?.phone || ""}
									onChange={(phoneNumber) =>
										updateDraftRestaurantDetails(
											"phone",
											phoneNumber,
										)
									}
									selectPosition={"end"}
								/>
							</div>
							<div className="flex-1">
								<Label htmlFor="website">Website</Label>

								<TextInput
									id="website"
									placeholder="www.example.com"
									value={draftRestaurant?.website}
									onChange={(e) =>
										updateDraftRestaurantDetails(
											"website",
											e.target.value,
										)
									}
								/>
							</div>
						</div>
						<div className="w-full">
							<h4 className="border-t border-gray-200 pt-4 text-base font-medium text-gray-800 dark:border-gray-800 dark:text-white/90">
								Socials
							</h4>
						</div>
						<div className="flex justify-between items-center gap-4">
							<div className="flex-1">
								<Label htmlFor="facebook">Facebook</Label>
								<SocialsInput
									id="facebook"
									value={draftRestaurant?.facebook || ""}
									onChange={(e) =>
										updateDraftRestaurantDetails(
											"facebook",
											e.target.value,
										)
									}
								/>
							</div>

							<div className="flex-1">
								<Label htmlFor="instagram">Instagram</Label>
								<SocialsInput
									id="instagram"
									value={draftRestaurant?.instagram || ""}
									onChange={(e) =>
										updateDraftRestaurantDetails(
											"instagram",
											e.target.value,
										)
									}
								/>
							</div>
						</div>
						<div className="flex justify-between items-center gap-4">
							<div className="flex-1">
								<Label htmlFor="tiktok">TikTok</Label>
								<SocialsInput
									id="tiktok"
									value={draftRestaurant?.facebook || ""}
									onChange={(e) =>
										updateDraftRestaurantDetails(
											"tiktok",
											e.target.value,
										)
									}
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
		</>
	);
};
