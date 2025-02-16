import { ProductDetails } from "@/components/products/product-details";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Stripe from "stripe";

export const metadata: Metadata = {
	title: "Produto",
};

interface ProductPageProps {
	params: {
		slug: string;
	};
}

async function fetchProductBySlug(slug: string) {
	const response = await stripe.products.list({
		expand: ["data.default_price"],
	});

	const product = response.data.find(
		(p) => p.metadata.slug === slug
	) as Stripe.Product;

	if (!product) return null;

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

export default async function ProductPage({ params }: ProductPageProps) {
	const product = await fetchProductBySlug(params.slug);

	if (!product) {
		notFound();
	}

	return <ProductDetails product={product} />;
}
