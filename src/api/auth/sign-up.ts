import type { HTTPResponse } from "@/@types/http";
import { User } from "@/@types/user";
import { api } from "@/lib/axios";

interface SignUpResponseBody extends HTTPResponse {
	data: null;
}

export async function signUp({
	name,
	email,
	password,
}: Omit<User, "id">): Promise<SignUpResponseBody> {
	try {
		const response = await api.post("/auth/sign-up", {
			name,
			email,
			password,
		});

		return response.data;
	} catch (error) {
		throw error;
	}
}
