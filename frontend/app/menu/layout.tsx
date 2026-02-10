export default function MenuLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex items-center justify-center min-h-screen h-180 md:p-8 bg-white">
			<div className="relative flex h-full w-full max-w-3xl flex-col overflow-hidden ">
				{children}
			</div>
		</div>
	);
}
