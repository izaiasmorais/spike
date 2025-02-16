import { OrderTable } from "@/components/orders/order-table";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Meus Pedidos",
};

export default function MyOrder() {
	return (
		<div className="max-w-[1200px] w-full mx-auto py-8 px-4 flex flex-col gap-4">
			<h1 className="font-bold text-xl">Meus Pedidos</h1>

			<OrderTable />
		</div>
	);
}
