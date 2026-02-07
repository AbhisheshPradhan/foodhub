"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronUp, Search, X, Share2, QrCode } from "lucide-react";

import { useRestaurants } from "@/contexts/RestaurantContext";
import { CategorySection } from "./CategorySection";
import { MenuItemDetail } from "./MenuItemDetail";
import { MenuCategory, MenuItem } from "@/types";

export const MenuPreview: React.FC = () => {
	const { draftRestaurant, designerActiveCategoryId } = useRestaurants();

	const catNavRef = useRef<HTMLDivElement>(null);
	const menuScrollRef = useRef<HTMLDivElement>(null);
	const [showBackToTop, setShowBackToTop] = useState(false);
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
		designerActiveCategoryId,
	);
	const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [copied, setCopied] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const isDragging = useRef(false);
	const catDidDrag = useRef(false);
	const startX = useRef(0);
	const scrollLeft = useRef(0);

	const isProgrammaticScroll = useRef(false);
	const scrollEndTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

	const menuDragging = useRef(false);
	const menuStartY = useRef(0);
	const menuScrollTopStart = useRef(0);
	const menuDidDrag = useRef(false);

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		isDragging.current = true;
		catDidDrag.current = false;
		startX.current = e.pageX;
		scrollLeft.current = catNavRef.current?.scrollLeft ?? 0;
		catNavRef.current?.style.setProperty("cursor", "grabbing");
	}, []);

	const handleMouseMove = useCallback((e: React.MouseEvent) => {
		if (!isDragging.current || !catNavRef.current) return;
		const walk = e.pageX - startX.current;
		if (Math.abs(walk) > 3) {
			catDidDrag.current = true;
			e.preventDefault();
		}
		catNavRef.current.scrollLeft = scrollLeft.current - walk;
	}, []);

	const handleMouseUp = useCallback(() => {
		isDragging.current = false;
		catNavRef.current?.style.setProperty("cursor", "grab");
	}, []);

	const handleMenuScroll = useCallback(() => {
		if (isProgrammaticScroll.current) {
			clearTimeout(scrollEndTimer.current);
			scrollEndTimer.current = setTimeout(() => {
				isProgrammaticScroll.current = false;
			}, 150);
			return;
		}

		const el = menuScrollRef.current;
		if (!el) return;
		setShowBackToTop(el.scrollTop > 200);

		const sections = el.querySelectorAll<HTMLElement>("[data-category-id]");
		let activeId: number | null = null;
		for (const section of sections) {
			if (section.offsetTop <= el.scrollTop + 10) {
				activeId = Number(section.dataset.categoryId);
			}
		}

		if (activeId !== null) {
			setActiveCategoryId(activeId);

			const pill = catNavRef.current?.querySelector<HTMLElement>(
				`[data-pill-id="${activeId}"]`,
			);
			if (pill && catNavRef.current) {
				catNavRef.current.scrollTo({
					left: pill.offsetLeft - 16,
					behavior: "smooth",
				});
			}
		}
	}, []);

	const scrollToCategory = useCallback((categoryId: number) => {
		if (catDidDrag.current) return;
		const el = menuScrollRef.current;
		if (!el) return;
		const section = el.querySelector<HTMLElement>(
			`[data-category-id="${categoryId}"]`,
		);
		if (section) {
			isProgrammaticScroll.current = true;
			setActiveCategoryId(categoryId);
			el.scrollTo({ top: section.offsetTop, behavior: "smooth" });
		}
	}, []);

	const scrollToTop = useCallback(() => {
		menuScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const handleShareUrl = useCallback(() => {
		const menuUrl = `https://foodhub.com/menu/${draftRestaurant?.menuUrl || ""}`;
		navigator.clipboard.writeText(menuUrl).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, [draftRestaurant?.menuUrl]);

	const handleMenuMouseDown = useCallback((e: React.MouseEvent) => {
		isProgrammaticScroll.current = false;
		menuDragging.current = true;
		menuDidDrag.current = false;
		menuStartY.current = e.pageY;
		menuScrollTopStart.current = menuScrollRef.current?.scrollTop ?? 0;
	}, []);

	const handleMenuWheel = useCallback(() => {
		isProgrammaticScroll.current = false;
	}, []);

	const handleMenuMouseMove = useCallback((e: React.MouseEvent) => {
		if (!menuDragging.current || !menuScrollRef.current) return;
		const walk = e.pageY - menuStartY.current;
		if (Math.abs(walk) > 3) {
			menuDidDrag.current = true;
			e.preventDefault();
		}
		menuScrollRef.current.scrollTop = menuScrollTopStart.current - walk;
	}, []);

	const handleMenuMouseUp = useCallback(() => {
		menuDragging.current = false;
	}, []);

	const handleItemClick = useCallback((item: MenuItem) => {
		if (menuDidDrag.current) return;
		setSelectedItem(item);
	}, []);

	const filteredCategories: MenuCategory[] = useMemo(() => {
		if (!draftRestaurant) return [];
		const query = searchQuery.trim().toLowerCase();
		if (!query) return draftRestaurant.categories;
		return draftRestaurant.categories
			.map((cat) => ({
				...cat,
				menuItems: (cat.menuItems as MenuItem[]).filter((item) =>
					item.name.toLowerCase().includes(query),
				),
			}))
			.filter((cat) => cat.menuItems.length > 0);
	}, [searchQuery, draftRestaurant]);

	// console.log("MenuPreview draftRestaurant", draftRestaurant);
	if (!draftRestaurant) {
		return null;
	}

	const effectiveCategoryId =
		activeCategoryId ?? filteredCategories?.[0]?.id ?? null;
	return (
		<div className="inline-flex flex-col items-center text-start">
			<div className="mb-4 flex w-full items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-700">Preview</h2>
				<div className="flex gap-2">
					<button
						onClick={handleShareUrl}
						className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
						title="Copy menu URL"
					>
						<Share2 size={14} />
						{copied ? "Copied!" : "Share"}
					</button>
					<button
						onClick={() => router.push("/dashboard/qr")}
						className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
						title="View QR Code"
					>
						<QrCode size={14} />
						QR Code
					</button>
				</div>
			</div>
			<div className="relative h-180 w-85 rounded-[50px] border-[6px] border-gray-900 bg-gray-900 shadow-xl">
				<div className="absolute -left-2 top-25 h-7.5 w-0.75 rounded-l-sm bg-gray-900" />
				<div className="absolute -left-2 top-37 h-12.5 w-0.75 rounded-l-sm bg-gray-900" />
				<div className="absolute -left-2 top-52.5 h-12.5 w-0.75 rounded-l-sm bg-gray-900" />
				<div className="absolute -right-2 top-40 h-17.5 w-0.75 rounded-r-sm bg-gray-900" />

				<div className="relative flex h-full w-full flex-col overflow-hidden rounded-[44px] bg-white">
					<div className="flex shrink-0 items-center justify-between px-6 pb-1 pt-3">
						<span className="text-[12px] font-semibold text-gray-900">
							9:41
						</span>
						<div className="absolute left-1/2 top-3 h-6.25 w-25 -translate-x-1/2 rounded-full bg-gray-900" />
						<div className="flex items-center gap-1">
							<svg
								width="16"
								height="12"
								viewBox="0 0 16 12"
								fill="none"
								className="text-gray-900"
							>
								<rect
									x="0"
									y="4"
									width="3"
									height="8"
									rx="0.5"
									fill="currentColor"
									opacity="0.3"
								/>
								<rect
									x="4.5"
									y="3"
									width="3"
									height="9"
									rx="0.5"
									fill="currentColor"
									opacity="0.5"
								/>
								<rect
									x="9"
									y="1"
									width="3"
									height="11"
									rx="0.5"
									fill="currentColor"
									opacity="0.7"
								/>
								<rect
									x="13.5"
									y="0"
									width="3"
									height="12"
									rx="0.5"
									fill="currentColor"
								/>
							</svg>
							<svg
								width="15"
								height="11"
								viewBox="0 0 15 11"
								fill="none"
								className="text-gray-900"
							>
								<path
									d="M7.5 3.5C9.1 3.5 10.5 4.1 11.6 5.1L13 3.7C11.5 2.2 9.6 1.3 7.5 1.3S3.5 2.2 2 3.7L3.4 5.1C4.5 4.1 5.9 3.5 7.5 3.5Z"
									fill="currentColor"
								/>
								<path
									d="M7.5 6.5C8.6 6.5 9.5 6.9 10.2 7.6L7.5 10.3L4.8 7.6C5.5 6.9 6.4 6.5 7.5 6.5Z"
									fill="currentColor"
								/>
							</svg>
							<svg
								width="25"
								height="12"
								viewBox="0 0 25 12"
								fill="none"
								className="text-gray-900"
							>
								<rect
									x="0"
									y="1"
									width="21"
									height="10"
									rx="2"
									stroke="currentColor"
									strokeWidth="1"
								/>
								<rect
									x="22"
									y="4"
									width="2"
									height="4"
									rx="0.5"
									fill="currentColor"
									opacity="0.4"
								/>
								<rect
									x="1.5"
									y="2.5"
									width="18"
									height="7"
									rx="1"
									fill="currentColor"
								/>
							</svg>
						</div>
					</div>

					<div className="shrink-0 border-b border-gray-200 px-4 pb-3 pt-2">
						{isSearching ? (
							<div className="flex items-center gap-2">
								<input
									ref={searchInputRef}
									type="text"
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									placeholder="Search menu items..."
									className="min-w-0 flex-1 text-[16px] font-medium text-gray-900 placeholder-gray-400 outline-none"
									autoFocus
								/>
								<button
									onClick={() => {
										setIsSearching(false);
										setSearchQuery("");
									}}
									className="shrink-0 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
								>
									<X size={18} />
								</button>
							</div>
						) : (
							<div className="flex items-center justify-between">
								<h1 className="text-[18px] font-bold leading-tight text-gray-900">
									{draftRestaurant.name}
								</h1>
								<button
									onClick={() => {
										setIsSearching(true);
										setTimeout(
											() =>
												searchInputRef.current?.focus(),
											0,
										);
									}}
									className="shrink-0 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
								>
									<Search size={18} />
								</button>
							</div>
						)}
					</div>

					<div className="shrink-0 border-b border-gray-100">
						<div
							ref={catNavRef}
							className="flex cursor-grab select-none gap-1 overflow-x-auto px-4 py-2"
							style={{ scrollbarWidth: "none" }}
							onMouseDown={handleMouseDown}
							onMouseMove={handleMouseMove}
							onMouseUp={handleMouseUp}
							onMouseLeave={handleMouseUp}
						>
							{filteredCategories.map((cat) => (
								<span
									key={cat.id}
									data-pill-id={cat.id}
									onClick={() => scrollToCategory(cat.id)}
									className={`shrink-0 cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
										effectiveCategoryId === cat.id
											? "bg-gray-900 text-white"
											: "bg-gray-100 text-gray-700"
									}`}
								>
									{cat.name}
								</span>
							))}
						</div>
					</div>

					<div
						ref={menuScrollRef}
						className="relative flex-1 cursor-grab select-none overflow-y-auto active:cursor-grabbing"
						style={{ scrollbarWidth: "none" }}
						onScroll={handleMenuScroll}
						onWheel={handleMenuWheel}
						onMouseDown={handleMenuMouseDown}
						onMouseMove={handleMenuMouseMove}
						onMouseUp={handleMenuMouseUp}
						onMouseLeave={handleMenuMouseUp}
					>
						<div className="py-2">
							{filteredCategories
								.sort((a, b) => a.displayOrder - b.displayOrder)
								.map((category) => (
									<div
										key={category.id}
										data-category-id={category.id}
									>
										<CategorySection
											category={category}
											onItemClick={handleItemClick}
										/>
									</div>
								))}
						</div>

						<div className="border-t border-gray-200 px-4 py-4">
							<p className="text-[12px] font-semibold text-gray-900">
								{draftRestaurant.name}
							</p>
							{draftRestaurant.address && (
								<p className="mt-1 text-[11px] leading-tight text-gray-500">
									{draftRestaurant.address}
								</p>
							)}
							<div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
								{draftRestaurant.phone && (
									<div className="text-[10px] text-gray-400">
										{draftRestaurant.phone}
									</div>
								)}
								{draftRestaurant.email && (
									<div className="text-[10px] text-gray-400">
										<Link
											href={`mailto:${draftRestaurant.email}`}
										>
											{draftRestaurant.email}
										</Link>
									</div>
								)}
								{draftRestaurant.website && (
									<div className="text-[10px] text-gray-400">
										{draftRestaurant.website}
									</div>
								)}
							</div>
							{(draftRestaurant.instagram ||
								draftRestaurant.facebook ||
								draftRestaurant.tiktok) && (
								<div className="mt-2 flex flex-wrap gap-3">
									{draftRestaurant.instagram && (
										<span className="text-[10px] text-gray-400">
											@{draftRestaurant.instagram}
										</span>
									)}
									{draftRestaurant.facebook && (
										<span className="text-[10px] text-gray-400">
											@{draftRestaurant.facebook}
										</span>
									)}
									{draftRestaurant.tiktok && (
										<span className="text-[10px] text-gray-400">
											@{draftRestaurant.tiktok}
										</span>
									)}
								</div>
							)}
						</div>

						{showBackToTop && (
							<button
								onClick={scrollToTop}
								className="sticky bottom-3 left-full z-20 mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg transition-opacity hover:bg-brand-600"
							>
								<ChevronUp size={16} />
							</button>
						)}
					</div>

					<div className="flex shrink-0 justify-center pb-2 pt-1">
						<div className="h-1 w-30 rounded-full bg-gray-900" />
					</div>

					{selectedItem && (
						<MenuItemDetail
							item={selectedItem}
							onClose={() => setSelectedItem(null)}
						/>
					)}

					{/* Slide-up animation */}
					<style>{`
						@keyframes menuSheetUp {
							from { transform: translateY(100%); }
							to { transform: translateY(0); }
						}
					`}</style>
				</div>
			</div>
		</div>
	);
};
