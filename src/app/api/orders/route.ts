import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export interface OrderItem {
	id: string;
	title: string | null;
	quantity: number;
	price: number;
	image: string | null;
}

export interface Order {
	id: string;
	date: string;
	total: number;
	items: OrderItem[];
	paymentMethod: string;
	status: string;
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const userEmail = searchParams.get("email");

		if (!userEmail) {
			return NextResponse.json(
				{ error: "E-mail é obrigatório" },
				{ status: 400 }
			);
		}

		const sessions = await stripe.checkout.sessions.list();
		const userSessions = sessions.data.filter(
			(session) => session.customer_details?.email === userEmail
		);

		const orders: Order[] = await Promise.all(
			userSessions.map(async (session): Promise<Order> => {
				const lineItems = await stripe.checkout.sessions.listLineItems(
					session.id
				);

				const productsWithImages: OrderItem[] = await Promise.all(
					lineItems.data.map(async (item): Promise<OrderItem> => {
						if (!item.price || !item.price.product) {
							return {
								id: item.id,
								title: item.description || null,
								quantity: item.quantity || 0,
								price: 0,
								image: null,
							};
						}

						const product = await stripe.products.retrieve(
							item.price.product as string
						);

						return {
							id: item.id,
							title: item.description || null,
							quantity: item.quantity || 0,
							price: item.amount_total ? item.amount_total / 100 : 0,
							image: product.images.length > 0 ? product.images[0] : null,
						};
					})
				);

				return {
					id: session.id,
					paymentMethod: session.payment_method_types[0],
					status: session.payment_status,
					date: new Date(session.created * 1000).toLocaleString("pt-BR"),
					total: session.amount_total ? session.amount_total / 100 : 0,
					items: productsWithImages,
				};
			})
		);

		return NextResponse.json(orders);
	} catch (error) {
		console.error("Erro ao buscar pedidos:", error);
		return NextResponse.json(
			{ error: "Erro ao buscar pedidos" },
			{ status: 500 }
		);
	}
}
