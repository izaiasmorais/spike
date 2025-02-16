import Products from "@/components/products/products-list";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
};

export default async function Home() {
	return (
		<div className="w-full max-w-[1200px] mx-auto py-8 px-4">
			<Products />
		</div>
	);
}
