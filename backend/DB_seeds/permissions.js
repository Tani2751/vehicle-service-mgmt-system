import { db } from "../db.js";
import { permissions } from "../drizzle/schema.js";


const PERMISSIONS = [
  "booking.create",
  "booking.cancel",
  "jobcard.create",
  "jobcard.update",
  "jobcard.assign",
  "jobcard.view",
  "invoice.create",
  "payment.create",
  "inventory.manage",
  "inspectionRecord.create",
  "inspectionRecord.update",
  "inspectionRecord.delete",

];


export async function seedPermissions() {
  for (const name of PERMISSIONS) {
    await db
      .insert(permissions)
      .values({ name })
      .onDuplicateKeyUpdate({ set: { name } });
  }
}            