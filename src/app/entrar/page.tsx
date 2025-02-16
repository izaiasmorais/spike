import { SignInForm } from "@/components/sign-in/sign-in-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignIn() {
	return (
		<div className="w-full h-screen flex items-center justify-center col-span-2">
			<div className="flex flex-col gap-8">
				<div className="w-full text-center">
					<h1 className="text-3xl font-bold">Spike</h1>
				</div>

				<SignInForm />

				<div>
					<Button className="w-full" variant="link" asChild>
						<Link href="/recuperar-senha">Esqueci a senha</Link>
					</Button>

					<Button className="w-full" variant="link" asChild>
						<Link href="/cadastro">Não possui uma conta? Cadastre-se</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
