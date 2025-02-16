"use client";
import { CircleUserRound, LogIn, LogOut, User } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth";
import Link from "next/link";
import { useCartStore } from "@/stores/cart";

export function Menu() {
	const { logout, isAuthenticated, user } = useAuthStore();
	const { clearCart } = useCartStore();

	function handleLogOut() {
		logout();
		clearCart();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<CircleUserRound size={28} className="cursor-pointer" />
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56 mr-4">
				<DropdownMenuGroup>
					{isAuthenticated && user && (
						<>
							<DropdownMenuLabel className="flex flex-col items-start gap-0 font-normal">
								<strong>{user.name}</strong>
								<span className="text-muted-foreground">{user.email}</span>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />
						</>
					)}

					<Link href="/meus-pedidos" className="flex items-center">
						<DropdownMenuItem className="cursor-pointer  w-full">
							<User className="h-4 w-4" />
							<span>Meus Pedidos</span>
						</DropdownMenuItem>
					</Link>

					{!isAuthenticated && (
						<>
							<DropdownMenuSeparator />

							<Link href="/entrar" className="flex items-center">
								<DropdownMenuItem
									className="cursor-pointer w-full"
									onClick={() => handleLogOut()}
								>
									<LogIn className="h-4 w-4" />
									<span>Entrar</span>
								</DropdownMenuItem>
							</Link>
						</>
					)}

					{isAuthenticated && (
						<>
							<DropdownMenuSeparator />

							<DropdownMenuItem
								className="cursor-pointer w-full"
								onClick={() => handleLogOut()}
								asChild
							>
								<Link href="/entrar" className="flex items-center">
									<LogOut className="h-4 w-4" />
									<span>Sair</span>
								</Link>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
