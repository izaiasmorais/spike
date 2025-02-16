import type { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface RecoverPasswordRequest {
	email: string;
}

interface RecoverPasswordSuccessResponse extends HTTPSuccessResponse {
	data: {
		link: string;
	};
}

interface RecoverPasswordErrorResponse extends HTTPErrorResponse {
	data: null;
}

type RecoverPasswordResponse =
	| RecoverPasswordSuccessResponse
	| RecoverPasswordErrorResponse;

export async function recoverPassword(
	credentials: RecoverPasswordRequest
): Promise<RecoverPasswordResponse> {
	try {
		const response = await api.post<RecoverPasswordSuccessResponse>(
			"/auth/recover-password",
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
