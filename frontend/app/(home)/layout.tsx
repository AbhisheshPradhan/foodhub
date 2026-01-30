import type { Metadata } from "next";

import Link from "next/link";
import { LinkButton } from "@/components/ui/LinkButton";

export const metadata: Metadata = {
	title: "Foodhub",
	description:
		"Create beautiful digital menus for your restaurant in minutes. No design skills required.",
};

export default async function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<header className="sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
				<div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:py-4">
					<Link href="/">
						<h1 className="text-3xl tracking-tight lg:text-4xl text-pretty">
							Foodhub
						</h1>
					</Link>
					<div className="items-center w-full gap-8 flex justify-end lg:px-0">
						<LinkButton href="/login">Login</LinkButton>
					</div>
				</div>
			</header>

			{children}
		</>
	);
}
