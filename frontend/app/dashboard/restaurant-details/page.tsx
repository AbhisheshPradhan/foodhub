import { AppHeader } from "@/components/layouts/AppHeader";
import { RestaurantDetailsForm } from "@/components/menu/restaurant-details-form/RestaurantDetailsForm";

export default function RestaurantDetailsPage() {
	return (
		<>
			<AppHeader
				heading="Restaurant Details"
				description=""
			/>
			<RestaurantDetailsForm />
		</>
	);
}
