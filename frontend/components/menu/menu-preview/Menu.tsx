"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronUp, Search, X } from "lucide-react";

import { CategorySection } from "./CategorySection";
import { MenuItemDetail } from "./MenuItemDetail";
import { MenuCategory, MenuItem, Restaurant } from "@/types";

interface MenuProps {
	menuDetails: Restaurant;
}

export const Menu: React.FC<MenuProps> = ({ menuDetails }) => {
	const catNavRef = useRef<HTMLDivElement>(null);
	const menuScrollRef = useRef<HTMLDivElement>(null);
	const [showBackToTop, setShowBackToTop] = useState(false);
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
		null,
	);
	const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);

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

	const filteredCategories: MenuCategory[] | undefined = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) {
			return menuDetails.categories || [];
		}
		const menuCategories = menuDetails.categories || [];
		return menuCategories
			.map((cat: MenuCategory) => ({
				...cat,
				menuItems: (cat.menuItems as MenuItem[]).filter((item) =>
					item.name.toLowerCase().includes(query),
				),
			}))
			.filter((cat) => cat.menuItems.length > 0);
	}, [searchQuery, menuDetails]);

	if (!menuDetails) {
		return null;
	}

	const effectiveCategoryId =
		activeCategoryId ?? filteredCategories?.[0]?.id ?? null;
	return (
		<>
			<div className="shrink-0 border-b border-gray-200 px-4 pb-3 pt-2">
				{isSearching ? (
					<div className="flex items-center gap-2">
						<input
							ref={searchInputRef}
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
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
							{menuDetails.name}
						</h1>
						<button
							onClick={() => {
								setIsSearching(true);
								setTimeout(
									() => searchInputRef.current?.focus(),
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
					{filteredCategories &&
						filteredCategories.map((cat, index) => (
							<span
								key={`category-name-${index}-${cat.id}`}
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
					{filteredCategories &&
						filteredCategories.map((cat, index) => (
							<div
								key={`category-section-${index}-${cat.id}`}
								data-category-id={cat.id}
							>
								<CategorySection
									category={cat}
									onItemClick={handleItemClick}
								/>
							</div>
						))}
				</div>

				<div className="border-t border-gray-200 px-4 py-4">
					<p className="text-[12px] font-semibold text-gray-900">
						{menuDetails.name}
					</p>
					{menuDetails.address && (
						<p className="mt-1 text-[11px] leading-tight text-gray-500">
							{menuDetails.address}
						</p>
					)}
					<div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
						{menuDetails.phone && (
							<div className="text-[10px] text-gray-400">
								{menuDetails.phone}
							</div>
						)}
						{menuDetails.email && (
							<div className="text-[10px] text-gray-400">
								<Link href={`mailto:${menuDetails.email}`}>
									{menuDetails.email}
								</Link>
							</div>
						)}
						{menuDetails.website && (
							<div className="text-[10px] text-gray-400">
								{menuDetails.website}
							</div>
						)}
					</div>
					{(menuDetails.instagram ||
						menuDetails.facebook ||
						menuDetails.tiktok) && (
						<div className="mt-2 flex flex-wrap gap-3">
							{menuDetails.instagram && (
								<span className="text-[10px] text-gray-400">
									@{menuDetails.instagram}
								</span>
							)}
							{menuDetails.facebook && (
								<span className="text-[10px] text-gray-400">
									@{menuDetails.facebook}
								</span>
							)}
							{menuDetails.tiktok && (
								<span className="text-[10px] text-gray-400">
									@{menuDetails.tiktok}
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
		</>
	);
};
