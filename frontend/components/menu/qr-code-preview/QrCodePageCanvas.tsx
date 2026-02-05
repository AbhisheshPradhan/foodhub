"use client";

import { forwardRef } from "react";
import type { QrCodeConfig } from "@/types";
import { PREVIEW_FRAME_MAP } from "./preview-frame-svgs";

interface RestaurantInfo {
	restaurantName?: string;
	menuUrl?: string;
	websiteUrl?: string;
	instagramUrl?: string;
	facebookUrl?: string;
	tiktokUrl?: string;
}

interface QrCodePageCanvasProps {
	config: QrCodeConfig;
	qrDataUrl: string;
	gridCount: 1 | 4 | 9 | 16;
	restaurantInfo?: RestaurantInfo;
}

export const QrCodePageCanvas = forwardRef<
	SVGSVGElement,
	QrCodePageCanvasProps
>(({ config, qrDataUrl, gridCount, restaurantInfo }, ref) => {
	const cols = Math.sqrt(gridCount);
	const rows = cols;

	// A4 proportions (210mm x 297mm) scaled 10x for precision
	const pageW = 2100;
	const pageH = 2970;
	const margin = 100;
	const cellW = (pageW - margin * 2) / cols;
	const cellH = (pageH - margin * 2) / rows;

	const padding = 50;
	const unitW = cellW - padding * 2;
	const unitH = cellH - padding * 2;

	const FrameComponent = PREVIEW_FRAME_MAP[config.frameType];

	return (
		<div className="w-full">
			<svg
				ref={ref}
				viewBox={`0 0 ${pageW} ${pageH}`}
				xmlns="http://www.w3.org/2000/svg"
				className="w-full rounded-lg border border-gray-200 bg-white shadow-theme-sm"
			>
				{/* White page background */}
				<rect
					width={pageW}
					height={pageH}
					fill="white"
				/>

				{/* Grid of QR codes */}
				{Array.from({ length: gridCount }).map((_, i) => {
					const col = i % cols;
					const row = Math.floor(i / cols);
					const x = margin + col * cellW + padding;
					const y = margin + row * cellH + padding;

					return (
						<g
							key={i}
							transform={`translate(${x}, ${y})`}
						>
							<FrameComponent
								frameColor={config.frameColor}
								frameBackgroundColor={
									config.frameBackgroundColor
								}
								frameTextColor={config.frameTextColor}
								frameText={config.frameText}
								qrDataUrl={qrDataUrl}
								width={unitW}
								height={unitH}
								{...restaurantInfo}
							/>
						</g>
					);
				})}
			</svg>
		</div>
	);
});

QrCodePageCanvas.displayName = "QrCodePageCanvas";
