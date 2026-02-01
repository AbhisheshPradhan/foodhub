interface AppHeaderProps {
	heading: string;
	description: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
	heading,
	description,
}) => {
	return (
		<div className="relative after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
			<div className="mx-auto max-w-6xl pb-6">
				<h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
				<p className="mt-1 truncate text-sm text-gray-500">
					{description}
				</p>
			</div>
		</div>
	);
};
