import { Metadata } from "next";
import { RestaurantSetupForm } from "@/components/restaurant-setup/RestaurantSetupForm";

export const metadata: Metadata = {
	title: "Restaurant Setup | Foodhub",
	description: "Setting Up your Foodhub. Create Digital Menus for free.",
};

export default function InitialSetupPage() {
	return (
		<>
			<RestaurantSetupForm />
		</>
	);
}
