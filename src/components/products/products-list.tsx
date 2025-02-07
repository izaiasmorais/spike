import { products } from "@/mocks/products";
import { ProductsListItem } from "./products-list-item";

export function ProductsList() {
	return (
		<div className="w-full justify-center flex items-center gap-6 flex-wrap">
			{products.map((product) => {
				return <ProductsListItem key={product.title} product={product} />;
			})}
		</div>
	);
}
