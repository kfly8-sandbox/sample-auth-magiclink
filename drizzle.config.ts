import * as dotenv from 'dotenv';
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: '.dev.vars' });

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema",
  dialect: "postgresql",
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: ignore
    url: process.env.DATABASE_URL_ADMIN!,
  },
});

