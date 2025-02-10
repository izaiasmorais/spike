import { create } from "zustand";
import Cookies from "js-cookie";

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthData {
	token: string;
	user: User;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	authenticate: (data: AuthData) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: !!Cookies.get("access_token"),
	user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,

	authenticate: (data) => {
		Cookies.set("user", JSON.stringify(data.user), {
			expires: 1,
			secure: true,
		});
		Cookies.set("access_token", data.token, { expires: 1, secure: true });
		set({ isAuthenticated: true, user: data.user });
	},

	logout: () => {
		Cookies.remove("access_token");
		Cookies.remove("user");
		set({ isAuthenticated: false, user: null });
	},
}));
