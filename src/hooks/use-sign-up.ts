import { useFormMutation } from "./use-form-mutation";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth/sign-up";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const signUpFormSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório."),
	email: z.string().email("Digite um email válido."),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export function useSignUp() {
	const router = useRouter();

	const form = useFormMutation({
		schema: signUpFormSchema,
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		onSubmit: (data) => {
			signUpFn({
				...data,
			});
		},
	});

	const { mutate: signUpFn, isPending: isLoadingSignUp } = useMutation({
		mutationFn: signUp,
		onSuccess: (response) => {
			if (response.success) {
				toast.success("Conta criada com sucesso!", {
					action: {
						label: "Ir para a página de login",
						onClick: () => router.push(`/entrar?email=${form.watch("email")}`),
					},
				});
				return;
			}

			if (response.error === "User already exists") {
				toast.error("Este email já está em uso.");
			}
		},
	});

	return {
		form,
		isLoadingSignUp,
	};
}
