
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './drizzle/schema.js',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Tanish2751@",
    database: "VSMS",
  },
});
