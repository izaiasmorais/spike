import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CheckoutItem {
	priceId: string;
	quantity: number;
}

export async function POST(req: Request) {
	try {
		const body = await req.json();

		if (!Array.isArray(body) || body.length === 0) {
			return NextResponse.json(
				{ error: "Lista de produtos inválida" },
				{ status: 400 }
			);
		}

		const lineItems = body.map((item: CheckoutItem) => ({
			price: item.priceId,
			quantity: Math.min(item.quantity, 3),
			adjustable_quantity: {
				enabled: true,
				minimum: 1,
				maximum: 3,
			},
		}));

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: lineItems,
			billing_address_collection: "required",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/sucesso`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/carrinho`,
		});

		return NextResponse.json({
			session_url: session.url,
		});
	} catch (error) {
		console.error("Erro ao criar sessão de checkout:", error);
		return NextResponse.json(
			{ error: "Erro ao processar o checkout" },
			{ status: 500 }
		);
	}
}
