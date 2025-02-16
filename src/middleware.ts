import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const url = request.nextUrl.clone();
	const cookies = parse(request.headers.get("cookie") || "");
	const userToken = cookies["access_token"];
	const isUserAuthenticated = !!userToken;

	if (
		isUserAuthenticated &&
		(pathname === "/entrar" || pathname === "/cadastro")
	) {
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}
