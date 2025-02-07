import { Skeleton } from "../ui/skeleton";

export function ProductsListItemSkeleton() {
	return (
		<div className="flex flex-col gap-5 overflow-hidden rounded-lg cursor-pointer">
			<Skeleton className="w-[350px] h-[350px]" />

			<div className="flex flex-col text-left gap-2">
				<Skeleton className="w-[300px] h-6" />

				<Skeleton className="w-[100px] h-6" />

				<Skeleton className="w-[250px] h-6" />

				<Skeleton className="w-[150px] h-6" />
			</div>
		</div>
	);
}
