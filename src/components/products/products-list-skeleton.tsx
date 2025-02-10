import { Skeleton } from "../ui/skeleton";

export function ProductsListSkeleton() {
	return (
		<div className="w-full justify-center flex items-center gap-6 flex-wrap">
			{Array.from({ length: 10 }).map((_, index) => {
				return (
					<div
						key={index}
						className="flex flex-col gap-5 overflow-hidden rounded-lg cursor-pointer"
					>
						<Skeleton className="w-[350px] h-[350px]" />

						<div className="flex flex-col text-left gap-2">
							<Skeleton className="w-[300px] h-6" />

							<Skeleton className="w-[100px] h-6" />

							<Skeleton className="w-[250px] h-6" />

							<Skeleton className="w-[150px] h-6" />
						</div>
					</div>
				);
			})}
		</div>
	);
}
