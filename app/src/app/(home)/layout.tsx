import type { Metadata } from "next";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { auth0 } from "@/lib/auth0";
import "./../globals.css";

import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { LinkButton } from "@/components/ui/LinkButton";

export const metadata: Metadata = {
	title: "Auth0 Next.js App",
	description: "Next.js app with Auth0 authentication",
};

export default async function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth0.getSession();
	const user = session?.user;

	return (
		<>
			<header className="sticky top-0 flex w-full px-8 bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
				<div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:border-b-0 lg:px-0 lg:py-4">
					<Link href="/">imagess</Link>
					<div>
						{user ? (
							<div className="logged-in-section">
								<LinkButton href="/designer">
									Designer
								</LinkButton>
							</div>
						) : (
							<>
								<LoginButton />
							</>
						)}
					</div>
				</div>
			</header>
			{children}
		</>
	);
}
