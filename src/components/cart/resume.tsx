import Link from "next/link";
import { Button } from "../ui/button";

export function Resume() {
	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-lg font-bold">Resumo da compra</h2>

			<div className="w-full border rounded-md flex flex-col gap-6 p-4 bg-muted">
				<div className="flex justify-between items-center">
					<span>Subtotal (1 item)</span>
					<strong>R$ 899,99</strong>
				</div>

				<hr />

				<div className="flex justify-between items-center">
					<strong className="text-sm">Valor total</strong>
					<strong className="text-sm">R$ 899,99 no Cartão</strong>
				</div>

				<div className="flex flex-col gap-4">
					<Button className="py-5 font-bold">Finalizar</Button>

					<Link href="/">
						<Button variant="outline" className="w-full py-5 font-bold">
							Continuar comprando
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
