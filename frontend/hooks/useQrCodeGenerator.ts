"use client";

import { useEffect, useRef, useState } from "react";
import type { QrCodeConfig } from "@/types";

interface UseQrCodeGeneratorOptions {
	config: QrCodeConfig;
	data: string;
	size?: number;
}

export function useQrCodeGenerator({
	config,
	data,
	size = 300,
}: UseQrCodeGeneratorOptions) {
	const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
	const qrRef = useRef<InstanceType<
		typeof import("qr-code-styling").default
	> | null>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(async () => {
			const QRCodeStyling = (await import("qr-code-styling")).default;

			const qrCode = new QRCodeStyling({
				width: size,
				height: size,
				type: "svg",
				data,
				dotsOptions: {
					color: config.dotColor,
					type: config.patternStyle,
				},
				backgroundOptions: {
					color: config.patternBackgroundColor,
				},
				cornersSquareOptions: {
					color: config.cornerFrameColor,
					type: config.cornerFrameStyle,
				},
				cornersDotOptions: {
					color: config.cornerDotColor,
					type:
						config.cornerDotType === "none"
							? undefined
							: config.cornerDotType,
				},
				image: config.logoUrl ?? undefined,
				imageOptions: {
					crossOrigin: "anonymous",
					margin: 5,
					imageSize: 0.4,
				},
			});

			qrRef.current = qrCode;

			const rawData = await qrCode.getRawData("svg");
			if (rawData) {
				const blob = rawData as Blob;
				const reader = new FileReader();
				reader.onloadend = () => setQrDataUrl(reader.result as string);
				reader.readAsDataURL(blob);
			}
		}, 150);

		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
		};
	}, [config, data, size]);

	useEffect(() => {
		return () => {
			qrRef.current = null;
		};
	}, []);

	return { qrDataUrl };
}
