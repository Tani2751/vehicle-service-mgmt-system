import { db } from "../db.js";
import { seedPermissions } from "./permissions.js";
import { seedRolePermissions } from "./roles-permissions.js";
import { seedRoles } from "./roles.js";
import { seedGarage } from "./seed_garage.js";
import { seedSuperAdmin } from "./users.js";


async function run() {
  try {
    await db.transaction(async () => {
      await seedRoles();
      await seedPermissions();
      await seedRolePermissions();
      await seedSuperAdmin();
      await seedGarage()
    });

    console.log("✅ Seed completed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed", err);
    process.exit(1);
  }
}

run();
