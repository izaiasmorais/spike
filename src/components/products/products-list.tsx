import { Product } from "@/@types/product";
import { stripe } from "@/lib/stripe";
import { Stripe } from "stripe";
import { ProductsListItem } from "./products-list-item";

async function fetchProducts(): Promise<Product[]> {
	const response = (await stripe.products.list({
		expand: ["data.default_price"],
	})) as Stripe.Response<Stripe.ApiList<Stripe.Product>>;

	return response.data.map((product) => {
		const price = product.default_price as Stripe.Price;

		return {
			id: product.id,
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
	});
}

export default async function ProductList() {
	const products = await fetchProducts();

	return (
		<div className="w-full justify-center flex items-center gap-6 flex-wrap">
			{products.map((product) => (
				<ProductsListItem key={product.title} product={product} />
			))}
		</div>
	);
}
