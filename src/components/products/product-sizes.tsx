import { Dispatch, SetStateAction } from "react";

interface ProductSizesProps {
	productSizes: number[];
	availableSizes: number[];
	onSetSize: Dispatch<SetStateAction<number | null>>;
	selectedSize: number | null;
}

export function ProductSizes({
	productSizes,
	availableSizes,
	onSetSize,
	selectedSize,
}: ProductSizesProps) {
	function handleSetSize(size: number) {
		if (selectedSize === null) {
			onSetSize(size);
		}

		if (selectedSize !== null && selectedSize === size) {
			onSetSize(null);
		}

		if (selectedSize !== null && selectedSize !== size) {
			onSetSize(size);
		}
	}

	return (
		<div className="flex flex-col gap-4 mt-4">
			<span>Selecione um tamanho</span>

			<div className="flex items-center gap-2">
				{productSizes.map((size) => {
					if (availableSizes.includes(size)) {
						return (
							<div
								className={`rounded-md w-10 h-10 border flex items-center justify-center
									cursor-pointer hover:bg-muted/50 ${
										size === selectedSize ? "border-2 border-black" : ""
									}`}
								onClick={() => handleSetSize(size)}
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
