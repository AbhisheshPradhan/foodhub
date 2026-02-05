import type { QrFrameType } from "@/types";

export interface PreviewFrameProps {
	frameColor: string;
	frameBackgroundColor: string;
	frameTextColor: string;
	frameText: string;
	qrDataUrl: string;
	width: number;
	height: number;
	restaurantName?: string;
	menuUrl?: string;
	websiteUrl?: string;
	instagramUrl?: string;
	facebookUrl?: string;
	tiktokUrl?: string;
}

const PreviewFrameNone = ({
	frameBackgroundColor,
	qrDataUrl,
	width,
	height,
}: PreviewFrameProps) => (
	<svg
		viewBox="0 0 400 400"
		width={width}
		height={height}
	>
		<rect
			width="400"
			height="400"
			fill={frameBackgroundColor}
			rx="4"
		/>
		<image
			href={qrDataUrl}
			x="20"
			y="20"
			width="360"
			height="360"
		/>
	</svg>
);

export const PREVIEW_FRAME_MAP: Record<
	QrFrameType,
	React.FC<PreviewFrameProps>
> = {
	none: PreviewFrameNone,
};
