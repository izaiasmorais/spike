import { ProductsList } from "@/components/products/products-list";

export default function Home() {
	return (
		<section id="home" className="max-w-[1200px] mx-auto px-4 py-8">
			<ProductsList />
		</section>
	);
}
