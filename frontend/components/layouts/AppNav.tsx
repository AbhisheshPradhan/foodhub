import Link from "next/link";
import { Zap } from "lucide-react";

import { UserMenu } from "../auth/UserMenu";
import { RestaurantsDropdown } from "../restaurants-dropdown/RestaurantsDropdown";
import { Button } from "../ui/Button";

export const AppNav = () => {
	return (
		<header className="sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b h-20">
			<div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:py-4">
				<Link href="/">
					<h1 className="text-2xl tracking-tight lg:text-3xl text-pretty">
						Foodhub
					</h1>
				</Link>
				<div className="items-center w-full gap-8 flex justify-end lg:px-0">
					<Button
						startIcon={<Zap size={16} />}
						variant="primary"
						size="sm"
						className="px-7"
					>
						Quick Edit
					</Button>
					<RestaurantsDropdown />
					<UserMenu />
				</div>
			</div>
		</header>
	);
};
