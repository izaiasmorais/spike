"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/api/auth/sign-in";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { z } from "zod";
import Link from "next/link";

const signInFormSchema = z.object({
	email: z.string().email("Digite um email válido."),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;

export default function SignIn() {
	const router = useRouter();
	const { authenticate } = useAuthStore();

	const { handleSubmit, register } = useForm<SignInFormData>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(signInFormSchema),
	});

	const { mutate: signInFn, isPending } = useMutation({
		mutationFn: signIn,
		mutationKey: ["sign-in"],
		onError: (error) => {
			if (error instanceof Error) {
				if (error.message !== "Invalid Credentials") {
					toast.error("Credenciais inválidas.");
				}
			}
		},
		onSuccess: (data) => {
			if (data.data) {
				authenticate(data.data);
				router.push("/");
			}
		},
	});

	const onFormError: SubmitErrorHandler<SignInFormData> = (errors) => {
		if (errors.email) {
			toast.error(errors.email.message);
			return;
		}

		if (errors.password) {
			toast.error(errors.password.message);
			return;
		}
	};

	function handleSignIn(data: SignInFormData) {
		signInFn(data);
	}

	return (
		<div className="w-full h-screen flex items-center justify-center col-span-2">
			<form
				className="flex flex-col w-[400px] gap-5"
				onSubmit={handleSubmit(handleSignIn, onFormError)}
			>
				<div className="w-full text-center mb-8">
					<h1 className="text-3xl font-bold">Spike</h1>
				</div>
				<strong className="text-xl font-medium">Entrar</strong>
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
					<Button>
						{isPending && <LoaderCircle className="animate-spin" />}

						{!isPending && "Entrar"}
					</Button>

					<Link href="/cadastro">
						<Button
							variant="link"
							className="justify-start p-0 text-muted-foreground"
						>
							Não possui uma conta? Cadastre-se
						</Button>
					</Link>
				</div>
			</form>
		</div>
	);
}
