"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import { useMutation } from "@tanstack/react-query";
import { checkout } from "@/api/stripe/checkout";
import { LoaderCircle } from "lucide-react";

export function CartOrderResume() {
	const { cart, cartCount, calculateTotal } = useCartStore();
	const router = useRouter();
	const itemsDescription = cartCount() > 1 ? "Itens" : "Item";

	const checkoutItems = cart.map((item) => ({
		priceId: item.defaultPriceId,
		quantity: item.quantity,
	}));

	const { mutate: mutationFn, isPending } = useMutation({
		mutationKey: ["checkout"],
		mutationFn: () => checkout({ checkoutItems }),
		onSuccess: (result) => {
			router.push(result.session_url);
		},
	});

	function handleCheckout() {
		mutationFn();
	}

	if (cart.length === 0) {
		return (
			<div className="flex flex-col gap-6">
				<h2 className="text-lg font-bold">Resumo da compra</h2>

				<div
					className="w-full border rounded-md flex flex-col gap-6 p-8 bg-muted
				items-center justify-center"
				>
					Não há itens no carrinho
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-lg font-bold">Resumo da compra</h2>

			<div className="w-full border rounded-md flex flex-col gap-6 p-4 bg-muted">
				<div className="flex justify-between items-center">
					<span>
						Subtotal ({cartCount()} {itemsDescription})
					</span>
					<strong>{formatPrice(calculateTotal())}</strong>
				</div>

				<hr />

				<div className="flex justify-between items-center">
					<strong className="text-sm">Valor total</strong>
					<strong className="text-sm">
						{formatPrice(calculateTotal())} no Cartão
					</strong>
				</div>

				<div className="flex flex-col gap-4">
					<Button className="py-5 font-bold" onClick={handleCheckout}>
						{isPending && <LoaderCircle className="animate-spin" />}

						{!isPending && "Finalizar compra"}
					</Button>

					<Link href="/">
						<Button variant="outline" className="w-full py-5 font-bold">
							Continuar comprando
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
