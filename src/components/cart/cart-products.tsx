import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";

export function CartProducts() {
	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-lg font-bold">Meu carrinho</h2>

			<div className="flex gap-4 border rounded-md p-4 w-full justify-between">
				<div className="flex gap-4">
					<div className="w-32 h-32 bg-muted rounded-md" />

					<div className="flex flex-col justify-between">
						<div className="flex flex-col">
							<strong>Tênis Nike Ja 1</strong>
							<span className="text-muted-foreground">Tamanho: 41</span>
						</div>

						<div className="flex gap-2 items-center mt-4">
							<Button variant="outline" className="w-8 h-8">
								<Minus />
							</Button>

							<div className="w-8 h-8 border rounded-sm flex items-center justify-center">
								3
							</div>

							<Button variant="outline" className="w-8 h-8">
								<Plus />
							</Button>
						</div>
					</div>
				</div>

				<div className="flex justify-between items-end flex-col">
					<Trash className="text-muted-foreground" size={18} />

					<div className="flex flex-col gap-1">
						<div className="flex gap-2 text-xs">
							<span className="text-muted-foreground">R$ 1.299,99</span>
							<span className="text-green-700">-34%</span>
						</div>

						<strong>R$ 200,00</strong>
					</div>
				</div>
			</div>
		</div>
	);
}
