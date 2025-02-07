"use client";
import Image from "next/image";
import { StarRating } from "./star-rating";
import { Product } from "@/@types/product";
import { useEffect, useState } from "react";
import { ProductsListItemSkeleton } from "./products-list-item-skeleton";

interface ProductsListItemProps {
	product: Product;
}

export function ProductsListItem({ product }: ProductsListItemProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 300);
	});

	if (isLoading) {
		return <ProductsListItemSkeleton />;
	}

	return (
		<div className="flex flex-col gap-5 overflow-hidden rounded-lg cursor-pointer">
			<Image
				src={product.images[0]}
				width={350}
				height={350}
				alt={product.title}
				className="rounded-md overflow-hidden"
			/>

			<div className="flex flex-col text-left gap-2">
				<h3 className="font-medium">{product.title}</h3>

				<span className="text-muted-foreground">{product.category}</span>

				<div className="flex items-center gap-2">
					<span>
						{new Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(product.price)}
					</span>
					<span className="line-through text-muted-foreground">
						{product.priceWithoutPromotion &&
							new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(product.priceWithoutPromotion)}
					</span>
					<span className="text-green-700">
						{product.promotionPercentage && `-${product.promotionPercentage}%`}
					</span>
				</div>

				<div className="flex items-center gap-1">
					<StarRating rating={product.rating} />
				</div>
			</div>
		</div>
	);
}
