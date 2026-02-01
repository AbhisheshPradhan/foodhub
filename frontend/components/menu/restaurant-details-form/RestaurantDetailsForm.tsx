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
	const { isLoading, selectedRestaurant } = useRestaurants();

	const [isSaving, setIsSaving] = useState<boolean>(false);

	const [restaurantDetails, setRestaurantDetails] =
		useState<Restaurant | null>(null);

	const [nameError, setNameError] = useState(false);
	const [nameHint, setNameHint] = useState("");

	useEffect(() => {
		if (!isLoading && selectedRestaurant) {
			setRestaurantDetails(selectedRestaurant);
		}
	}, [isLoading, selectedRestaurant]);

	const handleRestaurantDetailChange = (attr: string, value: string) => {
		setRestaurantDetails((prev) => {
			return {
				...prev,
				[attr]: value,
			};
		});
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!restaurantDetails.name) {
			setNameError(true);
			setNameHint("Restaurant name is required.");
			return;
		} else {
			setNameError(false);
			setNameHint("");
		}

		setIsSaving(true);

		console.log("handleSave restaurantDetails", restaurantDetails);
	};

	if (isLoading || !selectedRestaurant) {
		return null;
	}

	return (
		<>
			<form onSubmit={handleSave}>
				<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
					<div className="space-y-6 border-t border-gray-100 p-5 sm:p-6 dark:border-gray-800">
						<div className="w-full">
							<h4 className="border-b border-gray-200 pb-4 text-base font-medium text-gray-800 dark:border-gray-800 dark:text-white/90">
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
								value={restaurantDetails?.name}
								onChange={(e) =>
									handleRestaurantDetailChange(
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
								defaultValue={restaurantDetails?.address}
								onChange={(address) =>
									handleRestaurantDetailChange(
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
									value={restaurantDetails?.phone || ""}
									onChange={(phoneNumber) =>
										handleRestaurantDetailChange(
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
									value={restaurantDetails?.website}
									onChange={(e) =>
										handleRestaurantDetailChange(
											"website",
											e.target.value,
										)
									}
								/>
							</div>
						</div>
						{/* <div className="flex justify-between items-center">
							<Label htmlFor="currency">Currency</Label>
							<div className="flex-1 max-w-2/3">
								<CurrencySelect
									id={"currency"}
									selectedCurrency={
										restaurantDetails?.currency
									}
									onChange={(e) =>
										handleRestaurantDetailChange(
											"currency",
											e.target.value,
										)
									}
								/>
							</div>
						</div> */}
						<div className="flex justify-between items-center"></div>
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
									value={restaurantDetails?.facebook || ""}
									onChange={(e) =>
										handleRestaurantDetailChange(
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
									value={restaurantDetails?.instagram || ""}
									onChange={(e) =>
										handleRestaurantDetailChange(
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
									value={restaurantDetails?.facebook || ""}
									onChange={(e) =>
										handleRestaurantDetailChange(
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
