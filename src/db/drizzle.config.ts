import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const connectionStr = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || '';

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionStr.split('?')[0],
    ssl: false,
  },
});
