import { useFormMutation } from "./use-form-mutation";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth/sign-in";
import { toast } from "sonner";
import { z } from "zod";
import Cookies from "js-cookie";

const signInFormSchema = z.object({
	email: z.string().email("Digite um email válido."),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export function useSignIn() {
	const router = useRouter();

	const { mutate: signInFn, isPending: isLoadingSignIn } = useMutation({
		mutationFn: signIn,
		onSuccess: (response) => {
			if (response.success) {
				Cookies.set("access_token", response.data.token, {
					expires: 1 / 24,
				});
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
