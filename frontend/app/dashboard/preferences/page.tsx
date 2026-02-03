import { AppHeader } from "@/components/layouts/AppHeader";
import { PreferencesForm } from "@/components/menu/preferences-form/PreferencesForm";

export default function PreferencesPage() {
	return (
		<>
			<AppHeader
				heading="Preferences"
				description=""
			/>

			<PreferencesForm />
		</>
	);
}
