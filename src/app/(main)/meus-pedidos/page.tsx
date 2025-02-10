"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/stripe/orders";
import { useAuthStore } from "@/stores/auth";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/utils/formatPrice";
import { Badge } from "@/components/ui/badge";
import { OrderItemDialog } from "@/components/orders/order-items";

export default function MeusPedidos() {
	const { user } = useAuthStore();
	const { data, isPending } = useQuery({
		queryKey: ["orders"],
		queryFn: () =>
			getOrders({
				email: user?.email ?? "",
			}),
	});

	if (data)
		return (
			<div className="max-w-[1200px] w-full mx-auto py-8 px-4 flex flex-col gap-4">
				<h1 className="font-bold text-xl">Meus Pedidos</h1>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/50">
								<TableHead>Id do pedido</TableHead>
								<TableHead>Data</TableHead>
								<TableHead>Valor</TableHead>
								<TableHead>Forma de Pagamento</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Detalhes</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{!isPending &&
								data.length > 0 &&
								data.map((order) => (
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
												<Badge className="px-3 rounded-full bg-black text-white">
													Pago
												</Badge>
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
								))}
						</TableBody>
					</Table>
				</div>
			</div>
		);
}
