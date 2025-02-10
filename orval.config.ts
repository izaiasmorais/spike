import { defineConfig } from "orval";

export default defineConfig({
	client: {
		input: {
			target: "./swagger.json",
		},
		output: {
			mode: "split",
			target: "./src/http/generated/api.ts",
			client: "react-query",
			httpClient: "axios",
			clean: true,
			override: {
				fetch: {
					includeHttpResponseReturnType: true,
				},
			},
		},
	},
});
