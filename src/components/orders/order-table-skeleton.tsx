import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export function OrderTableSkeleton() {
	return Array.from({ length: 5 }).map((_, index) => {
		return (
			<TableRow key={index} className="h-[53px]">
				<TableCell>
					<Skeleton className="h-4 w-[150px]" />
				</TableCell>

				<TableCell>
					<Skeleton className="h-4 w-[150px]" />
				</TableCell>

				<TableCell>
					<Skeleton className="h-4 w-[100px]" />
				</TableCell>

				<TableCell>
					<Skeleton className="h-4 w-[150px]" />
				</TableCell>

				<TableCell>
					<Skeleton className="h-4 w-[75px]" />
				</TableCell>

				<TableCell>
					<Skeleton className="h-4 w-[50px]" />
				</TableCell>
			</TableRow>
		);
	});
}
