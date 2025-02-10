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

export function Menu() {
	const { logout, isAuthenticated, user } = useAuthStore();

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
									onClick={() => logout()}
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

							<Link href="/entrar" className="flex items-center">
								<DropdownMenuItem
									className="cursor-pointer w-full"
									onClick={() => logout()}
								>
									<LogOut className="h-4 w-4" />
									<span>Sair</span>
								</DropdownMenuItem>
							</Link>
						</>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
