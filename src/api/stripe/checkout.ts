import axios from "axios";

interface CheckoutRequestBody {
	checkoutItems: {
		priceId: string;
		quantity: number;
	}[];
}

interface CheckoutResponseBody {
	session_url: string;
}

export async function checkout({
	checkoutItems,
}: CheckoutRequestBody): Promise<CheckoutResponseBody> {
	try {
		const response = await axios.post<CheckoutResponseBody>(
			"/api/checkout",
			checkoutItems,
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		return response.data;
	} catch (error) {
		throw error;
	}
}
