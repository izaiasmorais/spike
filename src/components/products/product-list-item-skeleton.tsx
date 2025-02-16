import { Skeleton } from "@/components/ui/skeleton";

export function ProductListItemSkeleton() {
	return (
		<div className="flex flex-col gap-5 overflow-hidden rounded-lg cursor-pointer">
			<Skeleton className="w-[350px] h-[350px] rounded-md" />

			<div className="flex flex-col text-left gap-2">
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-6 w-3/4" />
				<Skeleton className="h-4 w-1/4" />
			</div>
		</div>
	);
}
