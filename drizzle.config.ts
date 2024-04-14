import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import { connect } from "http2";
dotenv.config({ path: ".env" });


export default {
    driver: "pg",
    schema: "./src/lib/db/schema.ts",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config;