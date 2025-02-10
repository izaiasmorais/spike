"use client";
import { Product } from "@/@types/product";
import { ProductPrices } from "@/components/products/product-prices";
import { ProductSizes } from "@/components/products/product-sizes";
import { StarRating } from "@/components/products/star-rating";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Cookie from "universal-cookie";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/stores/cart";

interface ProductDetailsProps {
	product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
	const [size, setSize] = useState<number | null>(null);
	const router = useRouter();
	const cookies = new Cookie();
	const { addToCart } = useCart();

	function handleAddProductToCart() {
		if (cookies.get("access_token") === undefined) {
			router.push("/entrar");
			return;
		}

		if (size === null) {
			toast.info("Selecione um tamanho para adicionar ao carrinho");
			return;
		}

		addToCart(product, size);
	}

	return (
		<section
			className="max-w-[1200px] w-full mx-auto py-8 px-4 grid gap-8
		sm:grid-cols-2"
		>
			<Image
				src={`${product.images[0]}`}
				width={500}
				height={500}
				alt={product.title}
				className="rounded-lg"
			/>

			<div className="flex flex-col gap-2">
				<h1 className="text-2xl">{product.title}</h1>
				<span className="text-muted-foreground">{product.category}</span>

				<div className="flex items-center gap-1">
					<StarRating rating={product.rating} />
				</div>

				<ProductPrices product={product} />

				<ProductSizes
					productSizes={product.sizes}
					availableSizes={product.availableSizes}
					onSetSize={setSize}
					selectedSize={size}
				/>

				<Button
					className="rounded-full px-8 mt-8 py-6"
					onClick={() => handleAddProductToCart()}
				>
					Adicionar ao carrinho
				</Button>

				<div className="mt-4 w-[300px]">
					<p>{product.description}</p>
				</div>
			</div>
		</section>
	);
}
