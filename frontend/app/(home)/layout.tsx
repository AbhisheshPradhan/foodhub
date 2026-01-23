import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
	title: "Auth0 Next.js App",
	description: "Next.js app with Auth0 authentication",
};

export default async function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<header className="sticky top-0 flex w-full px-8 bg-white border-gray-200 z-99999 lg:border-b">
				<div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 sm:gap-4 lg:border-b-0 lg:px-0 lg:py-4">
					<Link href="/">imagess</Link>
					<div>
						{/* {user ? (
							<div className="logged-in-section">
								<LinkButton href="/designer">
									Designer
								</LinkButton>
							</div>
						) : (
							<>
								<LoginButton />
							</>
						)} */}
					</div>
				</div>
			</header>
			{children}
		</>
	);
}
