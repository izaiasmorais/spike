"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "@/api/auth/sign-in";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import Cookies from "universal-cookie";

const signInFormSchema = z.object({
	email: z.string().email("Digite um email válido."),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;

export default function SignIn() {
	const router = useRouter();

	const { handleSubmit, register } = useForm<SignInFormData>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(signInFormSchema),
	});

	const { mutate: signInFn, isPending } = useMutation({
		mutationFn: signIn,
		mutationKey: ["signIn"],
		onError: (error) => {
			if (error instanceof Error) {
				if (error.message !== "Invalid Credentials") {
					toast.error("Credenciais inválidas.");
				}
			}
		},

		onSuccess: (data) => {
			if (data?.data.token) {
				router.push("/");

				const cookies = new Cookies();

				cookies.set("access_token", data.data.token, {
					path: "/",
					maxAge: 60 * 60,
				});
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
		<div className="grid w-full min-h-screen grid-cols-1 md:grid-cols-3 px-4 md:px-0">
			<div className="min-h-screen bg-muted/50 flex-col hidden md:flex px-2 md:px-0">
				<div className="flex items-start p-6 justify-start">
					<h1 className="flex items-center gap-1 text-2xl leading-tight font-medium">
						<Image
							src={"/image.png"}
							alt="Símbolo da Saúde Azul"
							width={512}
							height={512}
							className="w-10 h-10"
						/>
						Prescrições
					</h1>
				</div>

				<div className="h-full w-full flex items-center justify-center">
					<div className="flex-col">
						<h1 className="text-5xl font-semibold leading-tight">
							Seja <br /> Bem-vindo
						</h1>
						<span className="text-muted-foreground">
							Um trabalho simplificado espera por você.
						</span>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center col-span-2">
				<form
					className="flex flex-col w-[400px] gap-5"
					onSubmit={handleSubmit(handleSignIn, onFormError)}
				>
					<h1 className="text-xl font-medium">Entrar</h1>
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
		</div>
	);
}
