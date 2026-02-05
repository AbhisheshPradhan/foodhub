"use client";

import { useState, useEffect } from "react";
import { Save, ChevronDown } from "lucide-react";

import { useRestaurants } from "@/contexts/RestaurantContext";
import { useQrCodeConfig } from "@/contexts/QrCodeConfigContext";
import { Button } from "@/components/ui/Button";
import { QrFrameSection } from "./QrFrameSection";
import { QrPatternSection } from "./QrPatternSection";
import { QrCornersSection } from "./QrCornersSection";
import { QrLogoSection } from "./QrLogoSection";

export const QrCodeEditor = () => {
	const { isLoading, selectedRestaurant } = useRestaurants();
	const { config, updateConfig, setConfig, resetConfig, logoFile, setLogoFile } =
		useQrCodeConfig();
	const [isSaving, setIsSaving] = useState(false);
	const [openSection, setOpenSection] = useState<string | null>("frame");

	useEffect(() => {
		if (selectedRestaurant?.qrCodeConfig) {
			setConfig(selectedRestaurant.qrCodeConfig);
		}
	}, [selectedRestaurant?.qrCodeConfig, setConfig]);

	useEffect(() => {
		return () => resetConfig();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleSection = (key: string) => {
		setOpenSection((prev) => (prev === key ? null : key));
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSaving(true);
		setTimeout(() => {
			console.log("handleSave qrConfig", { config, logoFile });
			setIsSaving(false);
		}, 2000);
	};

	if (isLoading || !selectedRestaurant) {
		return null;
	}

	return (
		<form onSubmit={handleSave}>
			<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
				{[
					{
						key: "frame",
						title: "QR Code Frame",
						content: (
							<QrFrameSection
								config={config}
								onChange={updateConfig}
							/>
						),
					},
					{
						key: "pattern",
						title: "QR Code Pattern",
						content: (
							<QrPatternSection
								config={config}
								onChange={updateConfig}
							/>
						),
					},
					{
						key: "corners",
						title: "QR Code Corners",
						content: (
							<QrCornersSection
								config={config}
								onChange={updateConfig}
							/>
						),
					},
					{
						key: "logo",
						title: "Logo",
						content: (
							<QrLogoSection
								config={config}
								onChange={updateConfig}
								logoFile={logoFile}
								onLogoFileChange={setLogoFile}
								restaurantLogoUrl={
									selectedRestaurant?.logoUrl || null
								}
							/>
						),
					},
				].map((section) => (
					<div
						key={section.key}
						className="border-b border-gray-100 dark:border-gray-800"
					>
						<button
							type="button"
							onClick={() => toggleSection(section.key)}
							className="flex w-full items-center justify-between px-5 py-4"
						>
							<h4 className="text-base font-medium text-gray-800 dark:text-white/90">
								{section.title}
							</h4>
							<ChevronDown
								size={18}
								className={`text-gray-500 transition-transform duration-200 ${
									openSection === section.key
										? "rotate-180"
										: ""
								}`}
							/>
						</button>
						{openSection === section.key && (
							<div className="space-y-6 px-5 pb-5">
								{section.content}
							</div>
						)}
					</div>
				))}

				<div className="px-5 py-4">
					<div className="flex items-center gap-4 justify-end">
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
		</form>
	);
};
