"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import { MenuPreview } from "../menu/menu-preview/MenuPreview";

export const DashboardPreviewSection = () => {
	const segment = useSelectedLayoutSegment();
	const isQrPage = segment === "qr";

	return (
		<aside className="shrink-0 border-l border-gray-200 p-6 content-center">
			{isQrPage ? "QR Code" : <MenuPreview />}
		</aside>
	);
};
