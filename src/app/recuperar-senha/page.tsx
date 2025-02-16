import { RecoverPasswordForm } from "@/components/recover-password/recover-password-form";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Recuperar Senha",
};

export default function RecoverPassword() {
	return (
		<div className="w-full h-screen flex items-center justify-center col-span-2">
			<div className="flex flex-col gap-8">
				<div className="w-full text-center">
					<h1 className="text-3xl font-bold">Spike</h1>
				</div>

				<RecoverPasswordForm />

				<div>
					<Button className="w-full" variant="link" asChild>
						<Link href="/entrar">Já possui uma conta? Entre</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
