import { Search, ShoppingCart } from "lucide-react";

export function Header() {
	return (
		<header className="py-4 px-8 flex items-center justify-between bg-slate-50">
			<h1 className="text-3xl font-extrabold tracking-wider">Spike</h1>

			<div
				className="py-2 px-4 rounded-full w-[500px] md:flex items-center justify-between border
			bg-white hidden"
			>
				<input
					type="text"
					placeholder="Pesquisar..."
					className="outline-none"
				/>

				<Search />
			</div>

			<ShoppingCart />
		</header>
	);
}
