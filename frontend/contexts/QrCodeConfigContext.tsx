"use client";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
} from "react";
import type { QrCodeConfig } from "@/types";

const DEFAULT_QR_CONFIG: QrCodeConfig = {
	frameType: "none",
	frameText: "MENU",
	frameColor: "#000000",
	frameBackgroundColor: "#ffffff",
	frameTextColor: "#000000",
	patternStyle: "square",
	dotColor: "#000000",
	patternBackgroundColor: "#ffffff",
	cornerFrameStyle: "square",
	cornerDotType: "square",
	cornerFrameColor: "#000000",
	cornerDotColor: "#000000",
	useRestaurantLogo: false,
	logoUrl: null,
};

interface QrCodeConfigContextType {
	config: QrCodeConfig;
	updateConfig: <K extends keyof QrCodeConfig>(
		key: K,
		value: QrCodeConfig[K],
	) => void;
	setConfig: (config: QrCodeConfig) => void;
	resetConfig: () => void;
	logoFile: File | null;
	setLogoFile: (file: File | null) => void;
}

const QrCodeConfigContext = createContext<QrCodeConfigContextType | undefined>(
	undefined,
);

export function QrCodeConfigProvider({
	children,
	initialConfig,
}: {
	children: ReactNode;
	initialConfig?: QrCodeConfig;
}) {
	const [config, setConfigState] = useState<QrCodeConfig>(
		initialConfig ?? DEFAULT_QR_CONFIG,
	);
	const [logoFile, setLogoFile] = useState<File | null>(null);

	const updateConfig = useCallback(
		<K extends keyof QrCodeConfig>(key: K, value: QrCodeConfig[K]) => {
			setConfigState((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const setConfig = useCallback((newConfig: QrCodeConfig) => {
		setConfigState(newConfig);
	}, []);

	const resetConfig = useCallback(() => {
		setConfigState(initialConfig ?? DEFAULT_QR_CONFIG);
		setLogoFile(null);
	}, [initialConfig]);

	return (
		<QrCodeConfigContext.Provider
			value={{
				config,
				updateConfig,
				setConfig,
				resetConfig,
				logoFile,
				setLogoFile,
			}}
		>
			{children}
		</QrCodeConfigContext.Provider>
	);
}

export function useQrCodeConfig() {
	const context = useContext(QrCodeConfigContext);
	if (!context) {
		throw new Error(
			"useQrCodeConfig must be used within a QrCodeConfigProvider",
		);
	}
	return context;
}
