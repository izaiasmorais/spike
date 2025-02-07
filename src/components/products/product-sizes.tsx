interface ProductSizesProps {
	productSizes: number[];
	availableSizes: number[];
}

export function ProductSizes({
	productSizes,
	availableSizes,
}: ProductSizesProps) {
	return (
		<div className="flex flex-col gap-4 mt-4">
			<span>Selecione um tamanho</span>

			<div className="flex items-center gap-2">
				{productSizes.map((size) => {
					if (availableSizes.includes(size)) {
						return (
							<div
								className="rounded-md w-10 h-10 border flex items-center justify-center
									cursor-pointer hover:bg-muted/50"
							>
								{size}
							</div>
						);
					}

					if (!availableSizes.includes(size)) {
						return (
							<div
								className="rounded-md w-10 h-10 border flex items-center justify-center
									bg-muted cursor-not-allowed"
							>
								{size}
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}
