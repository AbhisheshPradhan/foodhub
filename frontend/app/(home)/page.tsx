import Link from "next/link";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="px-4 py-20 text-center">
				<div className="max-w-3xl mx-auto">
					<h1 className="mb-4 font-bold text-gray-900 text-title-xl">
						FoodHub
					</h1>
					<p className="mb-8 text-xl text-gray-600">
						Create beautiful digital menus for your restaurant in
						minutes. No design skills required.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Link
							href="/designer"
							className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-brand-500 hover:bg-brand-600"
						>
							Try Menu Designer
						</Link>
						<Link
							href="#features"
							className="px-6 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
						>
							Learn More
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section
				id="features"
				className="px-4 py-16 bg-white"
			>
				<div className="max-w-4xl mx-auto">
					<h2 className="mb-12 font-semibold text-center text-gray-900 text-title-sm">
						Why FoodHub?
					</h2>
					<div className="grid gap-8 md:grid-cols-3">
						<div className="p-6 text-center">
							<div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-brand-100">
								<span className="text-2xl">+</span>
							</div>
							<h3 className="mb-2 font-medium text-gray-900">
								Easy to Use
							</h3>
							<p className="text-sm text-gray-600">
								Drag and drop interface to build your menu
								quickly
							</p>
						</div>
						<div className="p-6 text-center">
							<div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-success-100">
								<span className="text-2xl">~</span>
							</div>
							<h3 className="mb-2 font-medium text-gray-900">
								Mobile First
							</h3>
							<p className="text-sm text-gray-600">
								Menus look great on any device your customers
								use
							</p>
						</div>
						<div className="p-6 text-center">
							<div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-lg">
								<span className="text-2xl">*</span>
							</div>
							<h3 className="mb-2 font-medium text-gray-900">
								QR Ready
							</h3>
							<p className="text-sm text-gray-600">
								Generate QR codes for contactless menu access
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="px-4 py-8 text-sm text-center text-gray-500">
				<p>FoodHub - Digital Menu Platform</p>
			</footer>
		</main>
	);
}
