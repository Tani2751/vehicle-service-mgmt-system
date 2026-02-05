
import { eq } from "drizzle-orm";
import { db } from "../db.js";
import { roles, userRoles, users } from "../drizzle/schema.js";
import  argon2  from "argon2";

export async function seedSuperAdmin() {
const hashPassword = await argon2.hash("ChangeMe123!");
  const [admin] = await db
    .insert(users)
    .values({
      username: "admin",
      email: "admin@system.local",
      password: hashPassword,
      isEmailValid: true,
    })
    .onDuplicateKeyUpdate({
      set: { email: "admin@system.local" },
    })
    .$returningId();

  const [role] = await db
    .select()
    .from(roles)
    .where(eq(roles.name, "super_admin"));

  await db
    .insert(userRoles)
    .values({
      userId: admin.id,
      roleId: role.id,
    })
    .onDuplicateKeyUpdate({
      set: {
        userId: admin.id,
        roleId: role.id,
      },
    });
}
