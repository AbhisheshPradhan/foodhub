"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRestaurants } from "@/contexts/RestaurantContext";

export default function DashboardPage() {
	const router = useRouter();
	const { isLoading } = useRestaurants();

	useEffect(() => {
		const lastPage = localStorage.getItem("last-/dashboard-page");

		if (lastPage && lastPage !== "/dashboard") {
			router.replace(lastPage);
		} else {
			router.replace("/dashboard/designer");
		}
	}, [isLoading, router]);

	return <div className="p-6">Loading dashboard...</div>;
}
