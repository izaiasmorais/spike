import { useFormMutation } from "./use-form-mutation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { recoverPassword } from "@/api/auth/recover-password";
import { z } from "zod";

const recoverPasswordFormSchema = z.object({
	email: z.string().email("Digite um email válido."),
});

export function useRecoverPassword() {
	const { mutate: signInFn, isPending: isLoadingRecoverPassword } = useMutation({
		mutationFn: recoverPassword,
		onSuccess: (response) => {
			if (response.success) {
				console.log(response.data.link);
				return;
			}

			if (response.error === "Invalid Credentials") {
				toast.error("Email inválido.");
			}
		},
	});

	const form = useFormMutation({
		schema: recoverPasswordFormSchema,
		defaultValues: {
			email: "",
		},
		onSubmit: (data) => {
			signInFn({
				...data,
			});
		},
	});

	return {
		form,
		isLoadingRecoverPassword,
	};
}
