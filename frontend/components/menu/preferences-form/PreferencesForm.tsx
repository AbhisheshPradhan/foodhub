"use client";

import { useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { useRestaurants } from "@/contexts/RestaurantContext";
import { Label } from "@/components/form/Label";
import { TextInput } from "@/components/form/input/TextInput";
import { TextArea } from "@/components/form/input/TextArea";
import {
	CurrencySelect,
	type CurrencyCode,
} from "@/components/form/input/CurrencySelect";
import { Button } from "@/components/ui/Button";
import { checkSlugAvailability } from "@/services/restaurants";

interface PreferencesFormData {
	menuUrl: string;
	currency: CurrencyCode;
	wifiName: string;
	wifiPassword: string;
	tagline: string;
	announcement: string;
	bannerMessage: string;
}

export const PreferencesForm = () => {
	const {
		isLoading,
		draftRestaurant,
		updateDraftRestaurantDetails,
		resetDraftRestaurantState,
	} = useRestaurants();

	const [isSaving, setIsSaving] = useState(false);
	const [menuUrlHint, setMenuUrlHint] = useState("");
	const [isMenuUrlAvailable, setIsMenuUrlAvailable] = useState(false);
	const [isMenuUrlError, setIsMenuUrlError] = useState(false);
	const menuUrlTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PreferencesFormData>({
		mode: "onChange",
		defaultValues: {
			menuUrl: "",
			currency: "AUD",
			wifiName: "",
			wifiPassword: "",
			tagline: "",
			announcement: "",
			bannerMessage: "",
		},
	});

	useEffect(() => {
		if (draftRestaurant) {
			reset({
				menuUrl: draftRestaurant.menuUrl || "",
				currency: draftRestaurant.currency || "AUD",
				wifiName: draftRestaurant.wifiName || "",
				wifiPassword: draftRestaurant.wifiPassword || "",
				tagline: draftRestaurant.tagline || "",
				announcement: draftRestaurant.announcement || "",
				bannerMessage: draftRestaurant.bannerMessage || "",
			});
		}
	}, [draftRestaurant, reset]);

	useEffect(() => {
		resetDraftRestaurantState();
	}, [resetDraftRestaurantState]);

	const onSubmit = async (data: PreferencesFormData) => {
		if (data.menuUrl) {
			try {
				const result = await checkSlugAvailability(
					data.menuUrl,
					draftRestaurant?.id,
				);
				if (!result.available) {
					setIsMenuUrlError(true);
					setMenuUrlHint(
						result.error || "Menu Url is not available.",
					);
					return;
				}
			} catch (error) {
				setIsMenuUrlError(true);
				setMenuUrlHint("Error validating Menu Url.");
				return;
			}
		}

		setIsSaving(true);

		try {
			Object.entries(data).forEach(([key, value]) => {
				updateDraftRestaurantDetails(
					key as keyof PreferencesFormData,
					value,
				);
			});

			// TODO: Add actual save logic here
		} catch (err) {
			console.error("error saving preferences", err);
		}

		setIsSaving(false);
	};

	const handleMenuUrlChange = (
		value: string,
		fieldOnChange: (value: string) => void,
	) => {
		if (menuUrlTimeoutRef.current) {
			clearTimeout(menuUrlTimeoutRef.current);
		}

		fieldOnChange(value);
		setIsMenuUrlError(false);
		setMenuUrlHint("");
		setIsMenuUrlAvailable(false);
		updateDraftRestaurantDetails("menuUrl", value);

		if (!value) {
			return;
		}

		setMenuUrlHint("Checking...");
		menuUrlTimeoutRef.current = setTimeout(async () => {
			try {
				const result = await checkSlugAvailability(
					value,
					draftRestaurant?.id,
				);
				if (result.available) {
					setIsMenuUrlError(false);
					setIsMenuUrlAvailable(true);
					setMenuUrlHint("Available");
				} else {
					setIsMenuUrlError(true);
					setMenuUrlHint(result.error || "Not available");
				}
			} catch (error) {
				setIsMenuUrlError(false);
				setMenuUrlHint("");
			}
		}, 500);
	};

	if (isLoading || !draftRestaurant) {
		return null;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
				<div className="flex flex-col space-y-6 *:space-y-6 border-t border-gray-100 p-5 sm:p-5 dark:border-gray-800">
					<div className="flex-1 max-w-2/3">
						<Label htmlFor="menu-url">
							Menu Url <span className="text-error-500">*</span>
						</Label>
						<Controller
							name="menuUrl"
							control={control}
							rules={{
								required: "Menu Url is required",
							}}
							render={({ field }) => (
								<TextInput
									id="menuUrl"
									placeholder="e.g. my-restaurant"
									value={field.value}
									onChange={(e) =>
										handleMenuUrlChange(
											e.target.value,
											field.onChange,
										)
									}
									error={!!errors.menuUrl || isMenuUrlError}
									hint={
										errors.menuUrl?.message || menuUrlHint
									}
									success={isMenuUrlAvailable}
								/>
							)}
						/>
					</div>
					<div className="flex-1 max-w-2/3">
						<Label htmlFor="currency">Currency</Label>
						<Controller
							name="currency"
							control={control}
							render={({ field }) => (
								<CurrencySelect
									id="currency"
									selectedCurrency={field.value}
									onChange={(e) => {
										const value = e.target
											.value as CurrencyCode;
										field.onChange(value);
										updateDraftRestaurantDetails(
											"currency",
											value,
										);
									}}
								/>
							)}
						/>
					</div>

					<div className="flex-1">
						<Label htmlFor="wifiName">WiFi</Label>
						<div className="flex items-center gap-4">
							<div className="flex-1">
								<Controller
									name="wifiName"
									control={control}
									render={({ field }) => (
										<TextInput
											id="wifiName"
											placeholder="Network name"
											value={field.value}
											onChange={(e) => {
												field.onChange(e.target.value);
												updateDraftRestaurantDetails(
													"wifiName",
													e.target.value,
												);
											}}
										/>
									)}
								/>
							</div>
							<div className="flex-1">
								<Controller
									name="wifiPassword"
									control={control}
									render={({ field }) => (
										<TextInput
											id="wifiPassword"
											placeholder="Password"
											value={field.value}
											onChange={(e) => {
												field.onChange(e.target.value);
												updateDraftRestaurantDetails(
													"wifiPassword",
													e.target.value,
												);
											}}
										/>
									)}
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
						<Controller
							name="tagline"
							control={control}
							render={({ field }) => (
								<TextArea
									id="tagline"
									placeholder="e.g. Authentic Nepali Cuisine • Open till 10pm"
									value={field.value}
									onChange={(e) => {
										field.onChange(e.target.value);
										updateDraftRestaurantDetails(
											"tagline",
											e.target.value,
										);
									}}
									rows={2}
								/>
							)}
						/>
					</div>

					<div>
						<Label htmlFor="announcement">
							Announcement{" "}
							<span className="mb-1.5 text-xs text-gray-500">
								(Displayed when the menu loads)
							</span>
						</Label>
						<Controller
							name="announcement"
							control={control}
							render={({ field }) => (
								<TextArea
									id="announcement"
									placeholder="e.g. Welcome! Please order at the counter."
									value={field.value}
									onChange={(e) => {
										field.onChange(e.target.value);
										updateDraftRestaurantDetails(
											"announcement",
											e.target.value,
										);
									}}
									rows={2}
								/>
							)}
						/>
					</div>

					<div>
						<Label htmlFor="bannerMessage">
							Banner Message{" "}
							<span className="mb-1.5 text-xs text-gray-500">
								(Displayed at the top)
							</span>
						</Label>
						<Controller
							name="bannerMessage"
							control={control}
							render={({ field }) => (
								<TextArea
									id="bannerMessage"
									placeholder="e.g. Free soup with every momo platter today 🍲"
									value={field.value}
									onChange={(e) => {
										field.onChange(e.target.value);
										updateDraftRestaurantDetails(
											"bannerMessage",
											e.target.value,
										);
									}}
									rows={2}
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
