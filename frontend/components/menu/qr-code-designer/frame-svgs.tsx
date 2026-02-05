import type { QrFrameType } from "@/types";

const FrameNone = () => (
	<svg
		viewBox="0 0 80 96"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="w-full h-full"
	>
		<circle
			cx="40"
			cy="42"
			r="28"
			stroke="currentColor"
			strokeWidth="2"
			opacity="0.4"
		/>
		<line
			x1="20"
			y1="62"
			x2="60"
			y2="22"
			stroke="currentColor"
			strokeWidth="2"
			opacity="0.4"
		/>
		<text
			x="40"
			y="86"
			textAnchor="middle"
			fontSize="7"
			fontWeight="500"
			fill="currentColor"
			opacity="0.5"
		>
			None
		</text>
	</svg>
);

export const FRAME_SVG_MAP: Record<QrFrameType, React.FC> = {
	none: FrameNone,
};
