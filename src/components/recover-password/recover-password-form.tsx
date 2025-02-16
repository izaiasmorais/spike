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
import { useRecoverPassword } from "@/hooks/use-recover-password";
import { LoaderCircle } from "lucide-react";

export function RecoverPasswordForm() {
	const { form, isLoadingRecoverPassword } = useRecoverPassword();

	return (
		<Form {...form}>
			<div className="flex flex-col gap-4 px-6 py-12 rounded-lg shadow-md text-left">
				<span className="text-muted-foreground">
					Digite seu email para recuperar sua senha.
				</span>

				<form onSubmit={form.handleSubmitForm} className="space-y-4 w-[400px]">
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

					<Button type="submit" className="w-full">
						{isLoadingRecoverPassword && (
							<LoaderCircle className="animate-spin" />
						)}

						{!isLoadingRecoverPassword && "Recuperar Senha"}
					</Button>
				</form>
			</div>
		</Form>
	);
}
