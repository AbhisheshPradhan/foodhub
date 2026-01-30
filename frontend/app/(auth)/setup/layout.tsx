import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Setup | Foodhub",
	description:
		"Create beautiful digital menus for your restaurant in minutes. No design skills required.",
};

export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken");

	if (!accessToken) {
		redirect("/login");
	}

	return <>{children}</>;
}
