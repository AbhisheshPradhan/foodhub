import { SignInForm } from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign In | Foodhub",
	description: "Sign in to Foodhub. Create Digital Menus for free.",
};

export default function LoginPage() {
	return (
		<>
			<SignInForm />
		</>
	);
}
