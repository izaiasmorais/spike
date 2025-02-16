"use client";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { OrderTableItems } from "@/components/orders/order-table-items";
import { OrderTableSkeleton } from "@/components/orders/order-table-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { getOrders } from "@/api/stripe/orders";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";

export function OrderTable() {
	const { user } = useAuthStore();
	const { data, isPending: isLoadingOrders } = useQuery({
		queryKey: ["orders"],
		queryFn: () =>
			getOrders({
				email: user?.email ?? "",
			}),
	});

	const isEmpty =
		(!isLoadingOrders && !data) ||
		(!isLoadingOrders && data && data.length === 0);

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted/50">
						<TableHead className="w-[200px] min-w-[200px]">
							Id do pedido
						</TableHead>
						<TableHead className="w-[200px] min-w-[200px]">Data</TableHead>
						<TableHead className="w-[200px] min-w-[200px]">Valor</TableHead>
						<TableHead className="w-[200px] min-w-[200px]">
							Forma de Pagamento
						</TableHead>
						<TableHead className="w-[100px] min-w-[100px]">Status</TableHead>
						<TableHead className="w-[100px] min-w-[100px]">Detalhes</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{isLoadingOrders && <OrderTableSkeleton />}

					{!isLoadingOrders &&
						data &&
						data.length > 0 &&
						data.map((order) => (
							<OrderTableItems key={order.id} order={order} />
						))}
				</TableBody>
			</Table>

			{isEmpty && <EmptyState />}
		</div>
	);
}
