import type { QrFrameType } from "@/types";

/**
 * Miniature QR code pattern used inside each frame preview.
 * Placed at (x, y) with the given size.
 */
const MiniQr = ({
	x,
	y,
	size,
}: {
	x: number;
	y: number;
	size: number;
}) => {
	const cell = size / 7;
	return (
		<g>
			{/* Top-left finder */}
			<rect x={x} y={y} width={cell * 3} height={cell * 3} rx={1} fill="currentColor" />
			<rect x={x + cell * 0.6} y={y + cell * 0.6} width={cell * 1.8} height={cell * 1.8} rx={0.5} fill="white" />
			<rect x={x + cell} y={y + cell} width={cell} height={cell} rx={0.3} fill="currentColor" />
			{/* Top-right finder */}
			<rect x={x + cell * 4} y={y} width={cell * 3} height={cell * 3} rx={1} fill="currentColor" />
			<rect x={x + cell * 4.6} y={y + cell * 0.6} width={cell * 1.8} height={cell * 1.8} rx={0.5} fill="white" />
			<rect x={x + cell * 5} y={y + cell} width={cell} height={cell} rx={0.3} fill="currentColor" />
			{/* Bottom-left finder */}
			<rect x={x} y={y + cell * 4} width={cell * 3} height={cell * 3} rx={1} fill="currentColor" />
			<rect x={x + cell * 0.6} y={y + cell * 4.6} width={cell * 1.8} height={cell * 1.8} rx={0.5} fill="white" />
			<rect x={x + cell} y={y + cell * 5} width={cell} height={cell} rx={0.3} fill="currentColor" />
			{/* Data dots */}
			{[
				[4, 4],
				[5, 4],
				[4, 5],
				[6, 5],
				[5, 6],
				[6, 6],
				[3, 3],
				[3, 5],
				[5, 3],
			].map(([cx, cy]) => (
				<rect
					key={`${cx}-${cy}`}
					x={x + (cx ?? 0) * cell}
					y={y + (cy ?? 0) * cell}
					width={cell * 0.85}
					height={cell * 0.85}
					rx={0.3}
					fill="currentColor"
				/>
			))}
		</g>
	);
};

const FrameBottomText = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<MiniQr x={12} y={8} size={56} />
		<text x="40" y="82" textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameBottomBanner = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect x="4" y="4" width="72" height="72" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<MiniQr x={14} y={10} size={52} />
		<rect x="4" y="76" width="72" height="16" rx="2" fill="currentColor" />
		<text x="40" y="87" textAnchor="middle" fontSize="7" fontWeight="600" fill="white">
			Scan me!
		</text>
	</svg>
);

const FrameRounded = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect x="4" y="4" width="72" height="86" rx="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<MiniQr x={14} y={10} size={52} />
		<text x="40" y="82" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameSquare = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect x="4" y="4" width="72" height="86" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<MiniQr x={14} y={10} size={52} />
		<text x="40" y="82" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameFullBorder = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect x="2" y="2" width="76" height="92" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<rect x="6" y="6" width="68" height="84" rx="1" stroke="currentColor" strokeWidth="0.8" fill="none" />
		<MiniQr x={14} y={12} size={52} />
		<text x="40" y="82" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameTopHeader = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect x="4" y="4" width="72" height="16" rx="2" fill="currentColor" />
		<text x="40" y="15" textAnchor="middle" fontSize="7" fontWeight="600" fill="white">
			Scan me!
		</text>
		<rect x="4" y="20" width="72" height="72" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<MiniQr x={14} y={26} size={52} />
	</svg>
);

const FrameTicket = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<path
			d="M8 4h64a4 4 0 0 1 4 4v28a6 6 0 0 0 0 12v28a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V48a6 6 0 0 0 0-12V8a4 4 0 0 1 4-4z"
			stroke="currentColor"
			strokeWidth="1.5"
			fill="none"
		/>
		<line x1="12" y1="68" x2="68" y2="68" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
		<MiniQr x={14} y={10} size={52} />
		<text x="40" y="82" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameTilted = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<g transform="rotate(-5, 40, 48)">
			<rect x="6" y="6" width="68" height="82" rx="3" stroke="currentColor" strokeWidth="1.5" fill="white" />
			<MiniQr x={16} y={12} size={48} />
			<text x="40" y="80" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor">
				Scan me!
			</text>
		</g>
	</svg>
);

const FrameBalloon = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect x="4" y="4" width="72" height="72" rx="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<polygon points="30,76 40,92 50,76" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
		<MiniQr x={14} y={10} size={52} />
		<text x="40" y="66" textAnchor="middle" fontSize="6" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameClipboard = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect x="8" y="12" width="64" height="80" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<rect x="26" y="6" width="28" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" fill="white" />
		<circle cx="40" cy="12" r="2.5" fill="currentColor" />
		<MiniQr x={16} y={26} size={48} />
		<text x="40" y="84" textAnchor="middle" fontSize="6" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameShoppingBag = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<path
			d="M10 28h60l-4 64H14L10 28z"
			stroke="currentColor"
			strokeWidth="1.5"
			fill="none"
			strokeLinejoin="round"
		/>
		<path
			d="M28 28V18a12 12 0 0 1 24 0v10"
			stroke="currentColor"
			strokeWidth="1.5"
			fill="none"
		/>
		<MiniQr x={18} y={34} size={44} />
		<text x="40" y="82" textAnchor="middle" fontSize="6" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameGift = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect x="6" y="20" width="68" height="72" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<rect x="6" y="20" width="68" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<line x1="40" y1="20" x2="40" y2="92" stroke="currentColor" strokeWidth="1.5" />
		<path d="M40 20c-4-12-18-12-18-4s14 4 18 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<path d="M40 20c4-12 18-12 18-4s-14 4-18 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<MiniQr x={16} y={38} size={18} />
		<MiniQr x={46} y={38} size={18} />
		<text x="40" y="84" textAnchor="middle" fontSize="6" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameStar = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<polygon
			points="40,2 49,30 78,30 54,48 63,78 40,60 17,78 26,48 2,30 31,30"
			stroke="currentColor"
			strokeWidth="1.5"
			fill="none"
			strokeLinejoin="round"
		/>
		<MiniQr x={22} y={28} size={36} />
		<text x="40" y="90" textAnchor="middle" fontSize="6" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameEnvelope = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect x="4" y="20" width="72" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
		<polyline points="4,20 40,52 76,20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
		<MiniQr x={20} y={36} size={40} />
		<text x="40" y="90" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameCoffeeCup = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		{/* Lid */}
		<path d="M16 16h48l-2 8H18l-2-8z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
		<rect x="28" y="10" width="24" height="6" rx="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
		{/* Cup body */}
		<path d="M18 24h44l-6 66H24l-6-66z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
		{/* Sleeve */}
		<path d="M20 40h40" stroke="currentColor" strokeWidth="0.8" />
		<path d="M22 56h36" stroke="currentColor" strokeWidth="0.8" />
		<MiniQr x={22} y={42} size={36} />
		<text x="40" y="82" textAnchor="middle" fontSize="6" fontWeight="600" fill="currentColor">
			Scan me!
		</text>
	</svg>
);

const FrameNone = () => (
	<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<circle cx="40" cy="42" r="28" stroke="currentColor" strokeWidth="2" opacity="0.4" />
		<line x1="20" y1="62" x2="60" y2="22" stroke="currentColor" strokeWidth="2" opacity="0.4" />
		<text x="40" y="86" textAnchor="middle" fontSize="7" fontWeight="500" fill="currentColor" opacity="0.5">
			None
		</text>
	</svg>
);

export const FRAME_SVG_MAP: Record<QrFrameType, React.FC> = {
	"bottom-text": FrameBottomText,
	"bottom-banner": FrameBottomBanner,
	rounded: FrameRounded,
	square: FrameSquare,
	"full-border": FrameFullBorder,
	"top-header": FrameTopHeader,
	ticket: FrameTicket,
	tilted: FrameTilted,
	balloon: FrameBalloon,
	clipboard: FrameClipboard,
	"shopping-bag": FrameShoppingBag,
	gift: FrameGift,
	star: FrameStar,
	envelope: FrameEnvelope,
	"coffee-cup": FrameCoffeeCup,
	none: FrameNone,
};
