"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/use-sign-up";
import { LoaderCircle } from "lucide-react";

export function SignUpForm() {
	const { form, isLoadingSignUp } = useSignUp();

	return (
		<Form {...form}>
			<div className="flex flex-col gap-4 px-6 py-12 rounded-lg shadow-md text-left">
				<span className="text-muted-foreground">
					Digite seu nome, email e senha para se cadastrar
				</span>

				<form onSubmit={form.handleSubmitForm} className="space-y-4 w-[400px]">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Digite seu nome" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Digite seu email"
										className="bg-white"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Digite sua senha"
										className="bg-white"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						{isLoadingSignUp && <LoaderCircle className="animate-spin" />}

						{!isLoadingSignUp && "Confirmar"}
					</Button>
				</form>
			</div>
		</Form>
	);
}
