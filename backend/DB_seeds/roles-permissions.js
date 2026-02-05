
import { db } from "../db.js";
import { permissions, rolePermissions, roles } from "../drizzle/schema.js";


export async function seedRolePermissions() {
  const [allRoles, allPermissions] = await Promise.all([
    db.select().from(roles),
    db.select().from(permissions),
  ]);

  const roleMap = Object.fromEntries(
    allRoles.map(r => [r.name, r.id])
  );

  const permMap = Object.fromEntries(
    allPermissions.map(p => [p.name, p.id])
  );

  const mappings = [
    {
      role: "super_admin",
      permissions: Object.keys(permMap),
    },
    {
      role: "garage_admin",
      permissions: [
        "booking.create",
        "jobcard.create",
        "jobcard.update",
        "inventory.manage",
      ],
    },
    {
      role: "service_advisor",
      permissions: [
        "jobcard.create",
        "jobcard.update",
        "jobcard.assign",
      ],
    },
    {
      role: "mechanic",
      permissions: ["jobcard.view"],
    },
    {
      role: "customer",
      permissions: ["booking.create", "booking.cancel"],
    },
  ];

  for (const map of mappings) {
    for (const perm of map.permissions) {
      await db
        .insert(rolePermissions)
        .values({
          roleId: roleMap[map.role],
          permissionId: permMap[perm],
        })
        .onDuplicateKeyUpdate({
          set: {
            roleId: roleMap[map.role],
            permissionId: permMap[perm],
          },
        });
    }
  }
}
