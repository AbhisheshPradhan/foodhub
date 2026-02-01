"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface PathTrackerProps {
	href: string;
}

export const PathTracker: React.FC<PathTrackerProps> = ({ href }) => {
	const pathname = usePathname();

	useEffect(() => {
		if (pathname.startsWith(href) && pathname !== href) {
			localStorage.setItem(`last-${href}-page`, pathname);
		}
	}, [pathname, href]);

	return null;
};
