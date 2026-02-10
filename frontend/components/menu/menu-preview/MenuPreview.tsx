"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Share2, QrCode } from "lucide-react";

import { useRestaurants } from "@/contexts/RestaurantContext";

import { Menu } from "./Menu";

export const MenuPreview: React.FC = () => {
	const { draftRestaurant, designerActiveCategoryId } = useRestaurants();

	const [copied, setCopied] = useState(false);
	const router = useRouter();

	const handleShareUrl = useCallback(() => {
		const menuUrl = `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/menu/${draftRestaurant?.menuUrl || ""}`;
		navigator.clipboard.writeText(menuUrl).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, [draftRestaurant?.menuUrl]);

	if (!draftRestaurant) {
		return null;
	}

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

					<Menu menuDetails={draftRestaurant} />
					<div className="flex shrink-0 justify-center pb-2 pt-1">
						<div className="h-1 w-30 rounded-full bg-gray-900" />
					</div>
				</div>
			</div>
		</div>
	);
};
