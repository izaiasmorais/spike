import { ProductPrices } from "@/components/products/product-prices";
import { ProductSizes } from "@/components/products/product-sizes";
import { StarRating } from "@/components/products/star-rating";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Stripe from "stripe";

async function fetchProductBySlug(slug: string) {
	const response = await stripe.products.list({
		expand: ["data.default_price"],
	});

	const product = response.data.find(
		(p) => p.metadata.slug === slug
	) as Stripe.Product;
	const price = product.default_price as Stripe.Price;

	return {
		title: product.name,
		description: product.description ?? "",
		price: price.unit_amount ? price.unit_amount / 100 : 0,
		images: product.images || null,
		category: product.metadata.category,
		onSale: product.metadata.onSale === "true",
		priceWithoutPromotion:
			product.metadata.priceWithoutPromotion === "null"
				? null
				: Number(product.metadata.priceWithoutPromotion) / 100,
		promotionPercentage:
			product.metadata.promotionPercentage === "null"
				? null
				: Number(product.metadata.promotionPercentage),
		rating: Number(product.metadata.rating),
		sizes: product.metadata.sizes?.split(", ").map(Number) || [],
		availableSizes:
			product.metadata.availableSizes?.split(", ").map(Number) || [],
		slug: product.metadata.slug,
	};
}

interface ProductProps {
	params: {
		slug: string;
	};
}

export default async function ProductDetails({ params }: ProductProps) {
	const product = await fetchProductBySlug(params.slug);

	return (
		<section className="max-w-[1200px] w-full mx-auto py-8 px-4 flex gap-8">
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
				/>

				<Button className="rounded-full px-8 mt-8 py-6">
					Adicionar ao carrinho
				</Button>

				<div className="mt-4 w-[300px]">
					<p>{product.description}</p>
				</div>
			</div>
		</section>
	);
}
