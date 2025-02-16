import type { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface SignInRequest {
	email: string;
	password: string;
}

interface SignInSuccessResponse extends HTTPSuccessResponse {
	data: {
		token: string;
	};
}

interface SignInErrorResponse extends HTTPErrorResponse {
	data: null;
}

type SignInResponse = SignInSuccessResponse | SignInErrorResponse;

export async function signIn(
	credentials: SignInRequest
): Promise<SignInResponse> {
	try {
		const response = await api.post<SignInSuccessResponse>(
			"/auth/sign-in",
			credentials
		);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response?.data) {
			return error.response.data;
		}

		return {
			success: false,
			error: "Erro desconhecido",
			data: null,
		};
	}
}
