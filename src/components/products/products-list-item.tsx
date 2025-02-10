import Image from "next/image";
import { ProductPrices } from "./product-prices";
import { StarRating } from "./star-rating";
import { Product } from "@/@types/product";
import Link from "next/link";

interface ProductsListItemProps {
	product: Product;
}

export function ProductsListItem({ product }: ProductsListItemProps) {
	return (
		<Link
			href={`/produto/${product.slug}`}
			className="flex flex-col gap-5 overflow-hidden rounded-lg cursor-pointer"
		>
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

				<ProductPrices product={product} />

				<div className="flex items-center gap-1">
					<StarRating rating={product.rating} />
				</div>
			</div>
		</Link>
	);
}
