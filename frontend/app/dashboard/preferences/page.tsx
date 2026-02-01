import { AppHeader } from "@/components/layouts/AppHeader";

export default function PreferencesPage() {
	return (
		<>
			<AppHeader
				heading="Preferences"
				description=""
			/>
			<p className="text-sm text-gray-500">
				Preferences — currency, wifi, welcome message, additional
				information, menu languages,
			</p>
		</>
	);
}
