import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./drizzle/schema.js";

console.log("mysql://root:Tanish2751@@localhost:3306/VSMS", 5);

const pool = mysql.createPool({
  uri: "mysql://root:Tanish2751@@localhost:3306/VSMS",
});

export const db = drizzle(pool, {
  schema,
  mode: "default", // 🔥 REQUIRED
});