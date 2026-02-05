"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Download, Loader2 } from "lucide-react";

import { useQrCodeConfig } from "@/contexts/QrCodeConfigContext";
import { useRestaurants } from "@/contexts/RestaurantContext";
import { useQrCodeGenerator } from "@/hooks/useQrCodeGenerator";
import { Button } from "@/components/ui/Button";
import { QrCodePageCanvas } from "./QrCodePageCanvas";
import { downloadAsPdf, downloadAsSvg, downloadAsPng } from "./download-utils";

type ExportFormat = "pdf" | "svg" | "png";
type GridCount = 1 | 4 | 9 | 16;

export const QrCodePreview = () => {
	const { config, resetConfig } = useQrCodeConfig();
	const { selectedRestaurant } = useRestaurants();

	useEffect(() => {
		return () => resetConfig();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [format, setFormat] = useState<ExportFormat>("pdf");
	const [gridCount, setGridCount] = useState<GridCount>(1);
	const [isDownloading, setIsDownloading] = useState(false);
	const svgRef = useRef<SVGSVGElement>(null);

	const menuUrl = selectedRestaurant
		? `https://foodhub.com/menu/${selectedRestaurant.menuUrl}`
		: "https://foodhub.com";

	const { qrDataUrl } = useQrCodeGenerator({
		config,
		data: menuUrl,
		size: 300,
	});

	const handleDownload = useCallback(async () => {
		if (!svgRef.current) return;
		setIsDownloading(true);
		try {
			switch (format) {
				case "pdf":
					await downloadAsPdf(svgRef.current);
					break;
				case "svg":
					downloadAsSvg(svgRef.current);
					break;
				case "png":
					await downloadAsPng(svgRef.current);
					break;
			}
		} finally {
			setIsDownloading(false);
		}
	}, [format]);

	if (!qrDataUrl) {
		return (
			<div className="flex items-center justify-center h-64 text-gray-400">
				<Loader2
					size={20}
					className="animate-spin mr-2"
				/>
				Generating QR code...
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center gap-4 w-full">
			{/* A4 Paper Preview */}
			<QrCodePageCanvas
				ref={svgRef}
				config={config}
				qrDataUrl={qrDataUrl}
				gridCount={gridCount}
				restaurantInfo={{
					restaurantName: selectedRestaurant?.name,
					menuUrl,
					websiteUrl: selectedRestaurant?.website,
					instagramUrl: selectedRestaurant?.instagram,
					facebookUrl: selectedRestaurant?.facebook,
					tiktokUrl: selectedRestaurant?.tiktok,
				}}
			/>

			{/* Download button */}
			<Button
				variant="primary"
				size="sm"
				startIcon={
					isDownloading ? (
						<Loader2
							size={16}
							className="animate-spin"
						/>
					) : (
						<Download size={16} />
					)
				}
				onClick={handleDownload}
				disabled={isDownloading}
				className="w-full"
			>
				{isDownloading ? "Exporting..." : "Download"}
			</Button>

			{/* Format and grid selectors */}
			<div className="flex items-center gap-3 w-full">
				<div className="flex-1">
					<label className="block text-xs font-medium text-gray-500 mb-1">
						Format
					</label>
					<select
						value={format}
						onChange={(e) =>
							setFormat(e.target.value as ExportFormat)
						}
						className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
					>
						<option value="pdf">PDF</option>
						<option value="svg">SVG</option>
						<option value="png">PNG</option>
					</select>
				</div>

				<div className="flex-1">
					<label className="block text-xs font-medium text-gray-500 mb-1">
						Per Page
					</label>
					<select
						value={gridCount}
						onChange={(e) =>
							setGridCount(Number(e.target.value) as GridCount)
						}
						className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
					>
						<option value={1}>1</option>
						<option value={4}>4 (2x2)</option>
						<option value={9}>9 (3x3)</option>
						<option value={16}>16 (4x4)</option>
					</select>
				</div>
			</div>
		</div>
	);
};
