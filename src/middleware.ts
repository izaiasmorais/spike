import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const url = request.nextUrl.clone();

	const cookies = parse(request.headers.get("cookie") || "");
	const userToken = cookies["access_token"];

	const isUserAuthenticated = userToken ? true : false;
	const privateRoutes = ["/meus-pedidos"];

	if (
		isUserAuthenticated &&
		(pathname === "/entrar" || pathname === "/cadastro")
	) {
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	if (!isUserAuthenticated) {
		url.pathname = "/entrar";

		if (privateRoutes.includes(pathname)) {
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}
