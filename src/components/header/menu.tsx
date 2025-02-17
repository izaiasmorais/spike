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
import { useRouter } from "next/navigation";

export function Menu() {
	const { logout, isAuthenticated, user } = useAuthStore();
	const { clearCart } = useCartStore();
	const router = useRouter();

	function handleLogOut() {
		router.push("/entrar");
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

					<DropdownMenuItem className="cursor-pointer  w-full" asChild>
						<Link href="/meus-pedidos" className="flex items-center">
							<User className="h-4 w-4" />
							<span>Meus Pedidos</span>
						</Link>
					</DropdownMenuItem>

					{!isAuthenticated && (
						<>
							<DropdownMenuSeparator />

							<DropdownMenuItem className="cursor-pointer w-full" asChild>
								<Link href={"/entrar"}>
									<LogIn className="h-4 w-4" />
									<span>Entrar</span>
								</Link>
							</DropdownMenuItem>
						</>
					)}

					{isAuthenticated && (
						<>
							<DropdownMenuSeparator />

							<DropdownMenuItem
								className="cursor-pointer w-full"
								onClick={() => handleLogOut()}
							>
								<LogOut className="h-4 w-4" />
								<span>Sair</span>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
