import { CartProducts } from "@/components/cart/cart-products";
import { Resume } from "@/components/cart/resume";

export default function Cart() {
	return (
		<div className="w-full max-w-[1200px] mx-auto py-8 px-4 grid md:grid-cols-2 gap-8">
			<CartProducts />

			<Resume />
		</div>
	);
}
