import { ProductDetails } from "@/components/products/product-details";
import { stripe } from "@/lib/stripe";
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
		defaultPriceId: price.id,
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

export default async function ProductDetailsContainer({
	params,
}: ProductProps) {
	const product = await fetchProductBySlug(params.slug);

	return <ProductDetails product={product} />;
}
