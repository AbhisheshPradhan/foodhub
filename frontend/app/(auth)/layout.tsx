export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex items-center justify-center min-h-screen">
			<div className="z-10 w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
				{children}
			</div>
		</div>
	);
}
