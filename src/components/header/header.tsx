import CartIcon from "./cart-icon";
import Link from "next/link";
import { Search } from "lucide-react";
import { Menu } from "./menu";

export function Header() {
	return (
		<header className="py-4 px-8 flex items-center justify-between bg-muted/50">
			<Link href="/">
				<h1 className="text-3xl font-bold tracking-wide">Spike</h1>
			</Link>

			<div
				className="py-2 px-4 rounded-full w-[500px] md:flex items-center justify-between
			bg-white hidden"
			>
				<input
					type="text"
					placeholder="Pesquisar..."
					className="outline-none"
				/>

				<Search size={16} className="text-muted-foreground" />
			</div>

			<div className="flex items-center space-x-4">
				<Menu />

				<CartIcon />
			</div>
		</header>
	);
}
