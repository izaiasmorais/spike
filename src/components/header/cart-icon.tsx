"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart";

export default function CartIcon() {
	const { cart } = useCartStore();

	return (
		<Link href="/carrinho" className="relative">
			<ShoppingCart size={28} className="text-black" />

			{cart.length >= 0 && (
				<div
					className="absolute -top-2 -right-4 bg-black text-white
				h-6 w-6 text-xs flex items-center justify-center rounded-full"
				>
					{cart.length}
				</div>
			)}
		</Link>
	);
}
