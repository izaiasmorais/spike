"use client";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useCart, type CartItem } from "@/stores/cart";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

interface CartProductProps {
	product: CartItem;
}

export function CartProduct({ product }: CartProductProps) {
	const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

	return (
		<div className="flex gap-4 border rounded-md p-4 w-full justify-between">
			<div className="flex gap-4">
				<Image
					src={`${product.imageUrl}`}
					width={128}
					height={128}
					alt={product.title}
					className="rounded-lg"
				/>

				<div className="flex flex-col justify-between">
					<div className="flex flex-col">
						<strong>{product.title}</strong>
						<span className="text-muted-foreground">
							Tamanho: {product.size}
						</span>
					</div>

					<div className="flex gap-2 items-center mt-4">
						<Button
							variant="outline"
							className="w-8 h-8"
							onClick={() => decreaseQuantity(product.defaultPriceId)}
							disabled={product.quantity === 1}
						>
							<Minus />
						</Button>

						<div className="w-8 h-8 border rounded-sm flex items-center justify-center">
							{product.quantity}
						</div>

						<Button
							variant="outline"
							className="w-8 h-8"
							onClick={() => increaseQuantity(product.defaultPriceId)}
							disabled={product.quantity === 3}
						>
							<Plus />
						</Button>
					</div>
				</div>
			</div>

			<div className="flex justify-between items-end flex-col">
				<Trash
					className="text-muted-foreground cursor-pointer hover:text-red-500"
					size={18}
					onClick={() => removeFromCart(product.defaultPriceId)}
				/>

				<div className="flex flex-col gap-1 items-end">
					{product.onSale && product.priceWithoutPromotion && (
						<div className="flex gap-2 text-xs">
							<span className="text-muted-foreground line-through ">
								{formatPrice(product.priceWithoutPromotion)}
							</span>
							<span className="text-green-700">
								-{product.promotionPercentage}%
							</span>
						</div>
					)}

					<strong>{formatPrice(product.price)}</strong>
				</div>
			</div>
		</div>
	);
}
