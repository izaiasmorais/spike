export interface HTTPSuccessResponse {
	success: true;
	error: null;
}

export interface HTTPErrorResponse {
	success: false;
	error: string;
}
