"use client";

import { AtSignIcon } from "lucide-react";

import { TextInput } from "@/components/form/input/TextInput";
import { Label } from "@/components/form/Label";
import { Button } from "@/components/ui/Button";

interface SetupSocialsProps {
	restaurantDetails: any;
	handleStepChange: (e: React.FormEvent<HTMLFormElement>) => void;
	handleRestaurantDetailChange: (attr: string, value: string) => void;
	error: string;
}

export const SetupSocials: React.FC<SetupSocialsProps> = ({
	restaurantDetails,
	handleStepChange,
	handleRestaurantDetailChange,
	error,
}) => {
	return (
		<>
			<div className="mb-5 sm:mb-8">
				<h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md dark:text-white/90">
					Go Viral
				</h1>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{
						"Enter your Restaurant's socials. You can add socials later."
					}
				</p>
			</div>
			<div>
				<form onSubmit={handleStepChange}>
					<div className="space-y-6">
						<div>
							<Label htmlFor="facebook">Facebook</Label>
							<TextInput
								id="facebook"
								placeholder="facebook"
								value={restaurantDetails.facebook}
								onChange={(e) =>
									handleRestaurantDetailChange(
										"facebook",
										e.target.value,
									)
								}
								startIcon={<AtSignIcon className="size-4" />}
							/>
						</div>
						<div>
							<Label htmlFor="instagram">Instagram</Label>
							<TextInput
								id="instagram"
								placeholder="instagram"
								value={restaurantDetails.instagram}
								onChange={(e) =>
									handleRestaurantDetailChange(
										"instagram",
										e.target.value,
									)
								}
								startIcon={<AtSignIcon className="size-4" />}
							/>
						</div>
						<div>
							<Label htmlFor="tiktok">TikTok</Label>
							<TextInput
								id="tiktok"
								placeholder="tiktok"
								value={restaurantDetails.tiktok}
								onChange={(e) =>
									handleRestaurantDetailChange(
										"tiktok",
										e.target.value,
									)
								}
								startIcon={<AtSignIcon className="size-4" />}
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
								Finish
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
