"use client";

import { useEffect, useState } from "react";

import { useRestaurants } from "@/contexts/RestaurantContext";
import { Restaurant } from "@/types";
import { Label } from "@/components/form/Label";
import { TextInput } from "@/components/form/input/TextInput";
import { Button } from "@/components/ui/Button";

export const RestaurantDetailsForm = () => {
	const { isLoading, selectedRestaurant } = useRestaurants();

	const [initialRestaurantDetails, setInitialRestaurantDetails] =
		useState<Restaurant | null>(null);

	const [restaurantDetails, setRestaurantDetails] =
		useState<Restaurant | null>(null);

	const [nameError, setNameError] = useState(false);
	const [nameHint, setNameHint] = useState("");

	useEffect(() => {
		if (!isLoading && selectedRestaurant) {
			setRestaurantDetails(selectedRestaurant);
			setInitialRestaurantDetails(selectedRestaurant);
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

	const handleSave = () => {
		if (!restaurantDetails.name) {
			setNameError(true);
			setNameHint("Restaurant name is required.");
			return;
		} else {
			setNameError(false);
			setNameHint("");
		}
	};

	if (!selectedRestaurant) {
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
						<div className="flex justify-between items-center">
							<Label htmlFor="name">
								Restaurant Name{" "}
								<span className="text-error-500">*</span>{" "}
							</Label>
							<div className="flex-1 max-w-2/3">
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
						</div>
						<div className="flex justify-between items-center">
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
						</div>
						<div className="flex justify-between items-center">
							<Label htmlFor="address">Address</Label>
							<div className="flex-1 max-w-2/3">
								<TextInput id="address" />
							</div>
						</div>
						<div className="flex justify-between items-center">
							<Label htmlFor="phone">Phone</Label>
							<div className="flex-1 max-w-2/3">
								<TextInput id="phone" />
							</div>
						</div>
						<div className="flex justify-between items-center">
							<Label htmlFor="phone">Currency</Label>
							<div className="flex-1 max-w-2/3">
								<TextInput id="phone" />
							</div>
						</div>
						<div className="flex justify-between items-center">
							<Label htmlFor="website">Website</Label>

							<div className="flex-1 max-w-2/3">
								<TextInput id="website" />
							</div>
						</div>

						<div className="w-full">
							<h4 className="border-t border-gray-200 pt-4 text-base font-medium text-gray-800 dark:border-gray-800 dark:text-white/90">
								Socials
							</h4>
						</div>

						<div className="flex justify-between items-center">
							<Label htmlFor="facebook">Facebook</Label>
							<div className="flex-1 max-w-2/3">
								<TextInput id="facebook" />
							</div>
						</div>
						<div className="flex justify-between items-center">
							<Label htmlFor="instagram">Instagram</Label>
							<div className="flex-1 max-w-2/3">
								<TextInput id="instagram" />
							</div>
						</div>
						<div className="flex justify-between items-center">
							<Label htmlFor="tiktok">TikTok</Label>
							<div className="flex-1 max-w-2/3">
								<TextInput id="tiktok" />
							</div>
						</div>

						<div className="w-full px-2.5">
							<div className="mt-1 flex items-center gap-3">
								<Button
									type="submit"
									variant="primary"
								>
									Save Changes
								</Button>

								<Button variant="outline">Reset</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};
