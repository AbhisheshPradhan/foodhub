import type { Metadata } from "next";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
	title: "Auth0 Next.js App",
	description: "Next.js app with Auth0 authentication",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Auth0Provider>{children}</Auth0Provider>;
}
