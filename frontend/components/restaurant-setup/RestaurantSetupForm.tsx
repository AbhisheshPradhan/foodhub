"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SetupDetails } from "./steps/SetupDetails";
import { SetupContacts } from "./steps/SetupContacts";
import { SetupSocials } from "./steps/SetupSocials";
import { updateRestaurant } from "@/services/restaurants";

export const RestaurantSetupForm: React.FC = () => {
	const router = useRouter();
	const [step, setStep] = useState(1);

	const [restaurantDetails, setRestaurantDetails] = useState({
		name: "Restaurant Name",
		address: "123 George Street, Sydney, NSW 2000",
		phone: "451123123",
		email: "info@gmail.com",
		website: "www.example.com",
		facebook: "facebook-id",
		instagram: "instagram-id",
		tiktok: "tiktok-id",
	});
	const [nameError, setNameError] = useState(false);
	const [nameHint, setNameHint] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleStepChange = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!restaurantDetails.name) {
			setNameError(true);
			setNameHint("Restaurant name is required.");
			return;
		} else {
			setNameError(false);
			setNameHint("");
		}

		setIsLoading(true);
		setError("");
		setStep((prev) => prev + 1);

		if (step == 3) {
			try {
				await updateRestaurant(restaurantDetails);
				console.log("create restaurant");
				setError("");
				router.replace("/dashboard");
			} catch (error) {
				console.error(error);
				setError("Failed to update Restaurant. Please try again.");
			}
		}

		setIsLoading(false);
	};

	const handleRestaurantDetailChange = (attr: string, value: string) => {
		setRestaurantDetails((prev) => {
			return {
				...prev,
				[attr]: value,
			};
		});
	};

	return (
		<div className="flex flex-col flex-1">
			<div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
				<div>
					{step == 1 && (
						<SetupDetails
							name={restaurantDetails.name}
							nameError={nameError}
							nameHint={nameHint}
							handleRestaurantDetailChange={
								handleRestaurantDetailChange
							}
							isLoading={isLoading}
							handleStepChange={handleStepChange}
							error={error}
						/>
					)}
					{step == 2 && (
						<SetupContacts
							restaurantDetails={restaurantDetails}
							handleRestaurantDetailChange={
								handleRestaurantDetailChange
							}
							handleStepChange={handleStepChange}
							error={error}
						/>
					)}
					{step == 3 && (
						<SetupSocials
							restaurantDetails={restaurantDetails}
							handleRestaurantDetailChange={
								handleRestaurantDetailChange
							}
							handleStepChange={handleStepChange}
							error={error}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
