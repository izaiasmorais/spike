"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth/sign-up";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";
import Link from "next/link";

const signUpFormSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório."),
	email: z.string().email("Digite um email válido."),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
	const router = useRouter();

	const { handleSubmit, register, watch } = useForm<SignUpFormData>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		resolver: zodResolver(signUpFormSchema),
	});

	const { mutate: signUpFn, isPending } = useMutation({
		mutationFn: signUp,
		mutationKey: ["signUp"],
		onError: (error) => {
			if (error instanceof Error) {
				if (error.message === "Email already registered") {
					toast.error("Este email já está em uso!");
				}

				if (error.message !== "Email already registered") {
					toast.error("Ocorreu um erro ao criar a conta!");
				}
			}
		},

		onSuccess: () => {
			toast.success("Conta criada com sucesso!", {
				action: {
					label: "Entrar",
					onClick: () => router.push(`/entrar?email=${watch("email")}`),
				},
			});
		},
	});

	const onFormError: SubmitErrorHandler<SignUpFormData> = (errors) => {
		if (errors.name) {
			toast.error(errors.name.message);
			return;
		}

		if (errors.email) {
			toast.error(errors.email.message);
			return;
		}

		if (errors.password) {
			toast.error(errors.password.message);
			return;
		}
	};

	function handleSignUp(data: SignUpFormData) {
		signUpFn(data);
	}

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<form
				className="flex flex-col w-[400px] gap-5"
				onSubmit={handleSubmit(handleSignUp, onFormError)}
			>
				<div className="w-full text-center mb-8">
					<h1 className="text-3xl font-bold">Spike</h1>
				</div>
				<strong className="text-xl font-medium">Cadastre-se</strong>
				<div className="flex flex-col gap-2">
					<Label htmlFor="name">Nome*</Label>
					<Input
						id="name"
						type="text"
						placeholder="Digite um nome"
						{...register("name")}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="email">E-mail</Label>
					<Input
						id="email"
						type="email"
						placeholder="Digite um email"
						{...register("email")}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="password">Senha</Label>

					<Input
						id="password"
						type="password"
						placeholder="Digite uma senha"
						{...register("password")}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<Button type="submit">
						{isPending && <LoaderCircle className="animate-spin" />}

						{!isPending && "Confirmar"}
					</Button>

					<Link href="/entrar">
						<Button
							variant="link"
							className="justify-start p-0 text-muted-foreground"
						>
							Já possui uma conta? Entre
						</Button>
					</Link>
				</div>
			</form>
		</div>
	);
}
