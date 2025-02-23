import type { OrderItem } from "@/app/api/orders/route";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ReceiptText } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface OrderItemDialogProps {
	items: OrderItem[];
}

export function OrderItemDialog({ items }: OrderItemDialogProps) {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="outline">
					<ReceiptText />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader className="flex flex-col gap-4">
					<DialogTitle>Produtos</DialogTitle>

					<div className="flex flex-col gap-4">
						{items.map((item) => (
							<div key={item.id} className="flex gap-4">
								<Image
									src={item.image ?? ""}
									alt={item.title ?? ""}
									width={128}
									height={128}
									quality={100}
									className="rounded-md"
									priority
								/>

								<div>
									<strong>{item.title}</strong>
									<p>Quantidade: {item.quantity}</p>
									<p>Preço Total: R$ {item.price}</p>
								</div>
							</div>
						))}
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
