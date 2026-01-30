export const SpiceIndicator = ({ level }: { level: number }) => {
	return (
		<span
			className="flex items-center gap-0.5"
			title={`Spice level: ${level}/3`}
		>
			{Array.from({ length: 3 }).map((_, i) => (
				<span
					key={i}
					className={`text-[10px] ${i < level ? "opacity-100" : "opacity-20"}`}
				>
					🌶️
				</span>
			))}
		</span>
	);
};
