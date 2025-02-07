import { CircleHelp, PersonStanding } from "lucide-react";

export function Heading() {
	return (
		<div className="bg-zinc-100 text-muted-foreground flex py-2 px-4 justify-end text-xs">
			<nav className="flex items-center gap-8">
				<span className="flex items-center gap-2">
					<PersonStanding size={20} />
					Acessibilidade
				</span>

				<span className="flex items-center gap-2">
					<CircleHelp size={20} />
					Tire suas dúvidas
				</span>
			</nav>
		</div>
	);
}
