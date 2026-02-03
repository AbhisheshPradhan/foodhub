"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import { MenuPreview } from "../menu/menu-preview/MenuPreview";
import { QrCodePreview } from "../menu/qr-code-preview/QrCodePreviewForm";

export const DashboardPreviewSection = () => {
	const segment = useSelectedLayoutSegment();
	const isQrPage = segment === "qr";

	return (
		<aside className="shrink-0 border-l border-gray-200 p-6 content-center">
			{isQrPage ? <QrCodePreview /> : <MenuPreview />}
		</aside>
	);
};
