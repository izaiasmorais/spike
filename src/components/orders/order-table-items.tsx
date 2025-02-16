import { formatPrice } from "@/utils/formatPrice";
import { TableRow, TableCell } from "../ui/table";
import { OrderItemDialog } from "./order-items";
import { Order } from "@/app/api/orders/route";
import { Badge } from "../ui/badge";

interface OrderTableItemsProps {
	order: Order;
}

export function OrderTableItems({ order }: OrderTableItemsProps) {
	return (
		<TableRow key={order.id}>
			<TableCell>
				<p className="truncate w-[100px]">{order.id}</p>
			</TableCell>

			<TableCell>{order.date}</TableCell>

			<TableCell>{formatPrice(order.total)}</TableCell>

			<TableCell>
				{order.paymentMethod === "card" && "Cartão de crédito"}
			</TableCell>

			<TableCell>
				{order.status === "paid" && (
					<Badge className="px-3 rounded-full bg-black text-white">Pago</Badge>
				)}

				{order.status !== "paid" && (
					<Badge className="px-3 rounded-full bg-red-500 text-white">
						Não pago
					</Badge>
				)}
			</TableCell>

			<TableCell>
				<OrderItemDialog items={order.items} />
			</TableCell>
		</TableRow>
	);
}
