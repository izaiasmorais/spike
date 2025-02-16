"use client";
import { Product } from "@/@types/product";
import { ProductPrices } from "@/components/products/product-prices";
import { ProductSizes } from "@/components/products/product-sizes";
import { StarRating } from "@/components/products/star-rating";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cart";
import Image from "next/image";
import Cookies from "js-cookie";

interface ProductDetailsProps {
	product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
	const [size, setSize] = useState<number | null>(null);
	const router = useRouter();
	const { addToCart } = useCartStore();

	function handleAddProductToCart() {
		if (Cookies.get("access_token") === undefined) {
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
				alt={product.title}
				width={500}
				height={500}
				quality={100}
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
