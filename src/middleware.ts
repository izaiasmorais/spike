import { NextResponse, type NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
	const url = request.nextUrl.clone();
	const path = url.pathname;
	const userToken = request.cookies.get("access_token")?.value;

	if (path !== "/meus-pedidos") {
		return NextResponse.next();
	}

	if (userToken) {
		try {
			jwtDecode(userToken);
			return NextResponse.next();
		} catch (error) {
			console.error("Token inválido:", error);
		}
	}

	url.pathname = "/entrar";
	return NextResponse.redirect(url);
}
