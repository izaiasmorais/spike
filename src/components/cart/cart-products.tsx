"use client";
import { useCartStore } from "@/stores/cart";
import { CartProduct } from "./cart-product";

export function CartProducts() {
	const { cart } = useCartStore();

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-lg font-bold">Meu carrinho</h2>

			{cart.length === 0 && (
				<div className="w-full border rounded-md p-8 flex items-center justify-center">
					Seu carrinho está vazio.
				</div>
			)}

			{cart.map((product) => (
				<CartProduct key={product.defaultPriceId} product={product} />
			))}
		</div>
	);
}
