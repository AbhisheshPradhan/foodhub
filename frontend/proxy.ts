import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
	const isAuthenticated = request.cookies.get("accessToken");

	const protectedRoutes = ["/dashboard"];
	const authRoutes = [
		"/login",
		"/signup",
		"/reset-password",
		"/forgot-password",
		"/verify",
	];

	if (
		!isAuthenticated &&
		protectedRoutes.includes(request.nextUrl.pathname)
	) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	if (isAuthenticated && authRoutes.includes(request.nextUrl.pathname)) {
		const dashboardUrl = new URL("/dashboard", request.url);
		return NextResponse.redirect(dashboardUrl);
	}

	return NextResponse.next();
}
