import type { Order } from "@/app/api/orders/route";
import axios from "axios";

interface GetOrdersRequestBody {
	email: string;
}

export async function getOrders({
	email,
}: GetOrdersRequestBody): Promise<Order[]> {
	try {
		const orders = await axios.get<Order[]>("/api/orders", {
			params: {
				email,
			},
		});

		return orders.data;
	} catch (error) {
		throw error;
	}
}
