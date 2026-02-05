
import { db } from "../db.js";
import { roles } from "../drizzle/schema.js";


const ROLE_NAMES = [
  "super_admin",
  "garage_admin",
  "service_advisor",
  "inspectionist",
  "mechanic",
  "customer",
];

export async function seedRoles() {
    for (const name of ROLE_NAMES) {
        await db
            .insert(roles)
            .values({ name })
            .onDuplicateKeyUpdate({set: {name}})
    }
}