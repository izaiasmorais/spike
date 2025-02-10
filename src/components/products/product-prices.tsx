import type { Product } from "@/@types/product";

interface ProductPricesProps {
	product: Product;
}

export function ProductPrices({ product }: ProductPricesProps) {
	return (
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
	);
}
