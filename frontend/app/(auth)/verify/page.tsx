import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign Up | Foodhub",
	description: "Sign Up to Foodhub for free.",
};

export default function LoginPage() {
	return (
		<>
			<VerifyEmailForm />
		</>
	);
}
