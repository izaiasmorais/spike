export function EmptyState() {
	return (
		<div className="flex w-full items-center justify-center h-[300px] text-center px-2">
			<div className="flex flex-col w-full max-w-[400px]">
				<div className="w-full flex justify-start">
					<div className="bg-background border-2 border-muted p-2 rounded-xl flex items-center gap-2 w-full max-w-[380px]">
						<div className="rounded-full bg-muted h-12 w-12" />
						<div className="gap-2 flex flex-col flex-1">
							<div className="bg-muted h-4 rounded-full w-full" />
							<div className="bg-muted/50 h-4 rounded-full w-3/4" />
						</div>
					</div>
				</div>

				<div className="flex w-full justify-end">
					<div className="bg-background border-2 border-muted p-2 rounded-xl flex items-center gap-2 w-full max-w-[380px] -mt-4">
						<div className="rounded-full bg-muted h-12 w-12" />
						<div className="gap-2 flex flex-col flex-1">
							<div className="bg-muted h-4 rounded-full w-full" />
							<div className="bg-muted/50 h-4 rounded-full w-3/4" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
