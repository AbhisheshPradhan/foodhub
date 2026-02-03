"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { useRestaurants } from "@/contexts/RestaurantContext";
import { Label } from "@/components/form/Label";
import { TextInput } from "@/components/form/input/TextInput";
import { TextArea } from "@/components/form/input/TextArea";
import { CurrencySelect } from "@/components/form/input/CurrencySelect";
import { Button } from "@/components/ui/Button";

export const PreferencesForm = () => {
	const {
		isLoading,
		draftRestaurant,
		updateDraftRestaurantDetails,
		resetDraftRestaurantState,
	} = useRestaurants();
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSaving(true);
		console.log("handleSave draftRestaurant", draftRestaurant);
	};

	useEffect(() => {
		return () => resetDraftRestaurantState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading || !draftRestaurant) {
		return null;
	}

	return (
		<form onSubmit={handleSave}>
			<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
				<div className="space-y-6 border-t border-gray-100 p-5 sm:p-5 dark:border-gray-800">
					<div className="flex items-start gap-6">
						<div>
							<Label htmlFor="currency">Currency</Label>
							<CurrencySelect
								id="currency"
								selectedCurrency={
									draftRestaurant?.currency || "AUD"
								}
								onChange={(e) =>
									updateDraftRestaurantDetails(
										"currency",
										e.target.value,
									)
								}
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="wifiName">WiFi</Label>
						<div className="flex items-center gap-4">
							<div className="flex-1">
								<TextInput
									id="wifiName"
									placeholder="Network name"
									value={draftRestaurant?.wifiName || ""}
									onChange={(e) =>
										updateDraftRestaurantDetails(
											"wifiName",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="flex-1">
								<TextInput
									id="wifiPassword"
									placeholder="Password"
									value={draftRestaurant?.wifiPassword || ""}
									onChange={(e) =>
										updateDraftRestaurantDetails(
											"wifiPassword",
											e.target.value,
										)
									}
								/>
							</div>
						</div>
					</div>

					<div className="w-full">
						<h4 className="border-t border-gray-200 pt-4 text-base font-medium text-gray-800 dark:border-gray-800 dark:text-white/90">
							Menu Messages
						</h4>
					</div>

					<div>
						<Label htmlFor="tagline">
							Tagline{" "}
							<span className="mb-1.5 text-xs text-gray-500">
								(Displayed at the top of the menu and below the
								restaurant name)
							</span>
						</Label>
						<TextArea
							id="tagline"
							placeholder="e.g. Authentic Nepali Cuisine • Open till 10pm"
							value={draftRestaurant?.tagline || ""}
							onChange={(e) =>
								updateDraftRestaurantDetails(
									"tagline",
									e.target.value,
								)
							}
							rows={2}
						/>
					</div>

					<div>
						<Label htmlFor="announcement">
							Announcement{" "}
							<span className="mb-1.5 text-xs text-gray-500">
								(Displayed when the menu loads)
							</span>
						</Label>
						<TextArea
							id="announcement"
							placeholder="e.g. Welcome! Please order at the counter."
							value={draftRestaurant?.announcement || ""}
							onChange={(e) =>
								updateDraftRestaurantDetails(
									"announcement",
									e.target.value,
								)
							}
							rows={2}
						/>
					</div>

					<div>
						<Label htmlFor="bannerMessage">
							Banner Message{" "}
							<span className="mb-1.5 text-xs text-gray-500">
								(Displayed at the top)
							</span>
						</Label>

						<TextArea
							id="bannerMessage"
							placeholder="e.g. Free soup with every momo platter today 🍲"
							value={draftRestaurant?.bannerMessage || ""}
							onChange={(e) =>
								updateDraftRestaurantDetails(
									"bannerMessage",
									e.target.value,
								)
							}
							rows={2}
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
