import { SignUpForm } from "@/components/sign-up/sign-up-form";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Cadastro",
};

export default function SignUp() {
	return (
		<div className="w-full h-screen flex items-center justify-center col-span-2">
			<div className="flex flex-col gap-8">
				<div className="w-full text-center">
					<h1 className="text-3xl font-bold">Spike</h1>
				</div>

				<SignUpForm />

				<div>
					<Button className="w-full" variant="link" asChild>
						<Link href="/entrar">Já possui uma conta? Conecte-se</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
