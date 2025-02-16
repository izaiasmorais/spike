import { useFormMutation } from "./use-form-mutation";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth/sign-in";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthStore } from "@/stores/auth";

const signInFormSchema = z.object({
	email: z.string().email("Digite um email válido."),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export function useSignIn() {
	const router = useRouter();
	const { authenticate } = useAuthStore()

	const { mutate: signInFn, isPending: isLoadingSignIn } = useMutation({
		mutationFn: signIn,
		onSuccess: (response) => {
			if (response.success) {
				authenticate(response.data);
				router.push("/");
				return;
			}

			if (response.error === "Invalid Credentials") {
				toast.error("Email ou senha inválidos.");
			}
		},
	});

	const form = useFormMutation({
		schema: signInFormSchema,
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: (data) => {
			signInFn({
				...data,
			});
		},
	});

	return {
		form,
		isLoadingSignIn,
	};
}
