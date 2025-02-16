import { z } from "zod";

import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
	NEXT_PUBLIC_APP_URL: z.string(),
	NEXT_PUBLIC_DEV_API_URL: z.string(),
	NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
	STRIPE_SECRET_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
