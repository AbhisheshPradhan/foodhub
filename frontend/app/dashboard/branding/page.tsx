import { AppHeader } from "@/components/layouts/AppHeader";
import { BrandingForm } from "@/components/menu/branding-form/BrandingForm";

export default function BrandingPage() {
	return (
		<>
			<AppHeader
				heading="Branding"
				description=""
			/>

			<BrandingForm />
		</>
	);
}
