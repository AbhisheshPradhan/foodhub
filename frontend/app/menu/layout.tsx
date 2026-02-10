export default function MenuLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex items-center justify-center min-h-screen h-180">
			<div className="relative flex h-full w-full max-w-3xl flex-col overflow-hidden md:p-8 bg-white">
				{children}
			</div>
		</div>
	);
}
