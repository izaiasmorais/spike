export default function Cart() {
	return (
		<div className="w-full max-w-[1200px] mx-auto py-8 px-4 grid grid-cols-2 gap-8">
			<div className="flex flex-col gap-6">
				<h2 className="text-lg font-bold">Meu carrinho</h2>

				<div className="flex gap-4 border rounded-md p-4 w-full">
					<div className="w-24 h-24 bg-muted rounded-md"></div>

					<div className="flex flex-col">
						<strong>Tênis Nike Ja 1</strong>
						<span className="text-muted-foreground">Tamanho: 41</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-6">
				<h2 className="text-lg font-bold">Meu carrinho</h2>

				<div className="w-full border rounded-md p-4 bg-muted">
					<div className="flex justify-between items-center">
						<span>Subtotal (1 item)</span>
						<strong>R$ 899,99</strong>
					</div>
				</div>
			</div>
		</div>
	);
}
