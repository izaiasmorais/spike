import { ProductPrices } from "@/components/products/product-prices";
import { ProductSizes } from "@/components/products/product-sizes";
import { StarRating } from "@/components/products/star-rating";
import { Button } from "@/components/ui/button";
import { products } from "@/mocks/products";
import Image from "next/image";

interface ProductProps {
	params: {
		slug: string;
	};
}

export default function Product({ params }: ProductProps) {
	const product = products.find((product) => product.slug === params.slug);

	if (!product) {
		return <h1>Product not found</h1>;
	}

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
