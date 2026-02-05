"use client";

import { TextInput } from "@/components/form/input/TextInput";
import { Label } from "@/components/form/Label";
import { Button } from "@/components/ui/Button";

interface SetupContactsProps {
	restaurantDetails: any;
	handleStepChange: (e: React.FormEvent<HTMLFormElement>) => void;
	handleRestaurantDetailChange: (attr: string, value: string) => void;
	error: string;
}

export const SetupContacts: React.FC<SetupContactsProps> = ({
	restaurantDetails,
	handleStepChange,
	handleRestaurantDetailChange,
	error,
}) => {
	return (
		<>
			<div className="mb-5 sm:mb-8">
				<h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md dark:text-white/90">
					Contact info
				</h1>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{
						"Enter your Restaurant's contact info. You can fill this in later."
					}
				</p>
			</div>
			<div>
				<form onSubmit={handleStepChange}>
					<div className="space-y-6">
						<div>
							<Label htmlFor="address">Address</Label>
							<TextInput
								id="address"
								placeholder="Enter your Restaurant's address"
								value={restaurantDetails.address}
								onChange={(e) =>
									handleRestaurantDetailChange(
										"address",
										e.target.value,
									)
								}
							/>
						</div>
						<div>
							<Label htmlFor="phone">Phone Number</Label>
							<TextInput
								id="phone"
								placeholder="Enter your Restaurant's phone number"
								onChange={(e) =>
									handleRestaurantDetailChange(
										"phone",
										e.target.value,
									)
								}
								startIcon={<>+61</>}
							/>
						</div>
						<div>
							<Label htmlFor="email">Contact Email</Label>
							<TextInput
								id="email"
								placeholder="Enter your Restaurant's contact email"
								value={restaurantDetails.email}
								onChange={(e) =>
									handleRestaurantDetailChange(
										"email",
										e.target.value,
									)
								}
							/>
						</div>
						<div>
							<Label htmlFor="website">Website</Label>
							<TextInput
								id="website"
								placeholder="Enter your Restaurant's website url"
								value={restaurantDetails.website}
								onChange={(e) =>
									handleRestaurantDetailChange(
										"website",
										e.target.value,
									)
								}
							/>
						</div>
						{error && (
							<div className="p-3 text-sm text-center text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
								{error}
							</div>
						)}
						<div className="flex space-between gap-4">
							<Button
								className="w-full"
								size="sm"
								type="submit"
							>
								Continue
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
