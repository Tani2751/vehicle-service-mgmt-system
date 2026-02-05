import { boolean, unique, int, decimal, mysqlTable, primaryKey, text, timestamp, date, varchar, mysqlEnum, year } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: int('id').autoincrement().primaryKey(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).default(null),
  isEmailValid: boolean('is_email_valid').default(false).notNull(),
  avatar: text('avatar'),
  address: text('address'),
  garageId: int("garage_id").references(() => garages.id),
  phoneNumber: varchar("phone_number", { length: 20 }).default(null).unique(),
  city: text('city'),
  disabled: boolean("disabled").default(false).notNull(),
  isActive: boolean('is_active').default(false).notNull(),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});



export const sessions = mysqlTable('sessions', {
  id: int('id').autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  valid: boolean('valid').default(true).notNull(),
  userAgent: text('user_agent').notNull(),
  ip: varchar('ip', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});


export const userInvites = mysqlTable('user_invites', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('user_id').notNull().references(() => users.id, {onDelete:"cascade"}),
  token: varchar('token_hash', {length: 100}).notNull(),
  expiresAt: timestamp('expires_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  usedAt: timestamp('used_at')
})

export const roles = mysqlTable("roles", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 50 }).unique().notNull()
});


export const permissions = mysqlTable("permissions", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  description: varchar("description", { length: 255 })
});


export const userRoles = mysqlTable(
  "user_roles",
  {
    userId: int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    roleId: int("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.roleId),
  })
);


export const rolePermissions = mysqlTable(
  "role_permissions",
  {
    roleId: int("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: int("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" })
  },
  (table) => ({
    pk: primaryKey(table.roleId, table.permissionId)
  })
);



export const vehicles = mysqlTable("vehicles", {
  id: int("id").autoincrement().primaryKey(),

  customerId: int("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),

  vehicleType: mysqlEnum("vehicle_type", [
    "bike",
    "scooter",
  ]).notNull(),

  registrationNumber: varchar("registration_number", { length: 20 })
    .notNull()
    .unique(),

  make: varchar("make", { length: 50 }).notNull(), // Hero, Honda
  model: varchar("model", { length: 50 }).notNull(), // Activa, Splendor
  variant: varchar("variant", { length: 50 }),

  year: year("manufacture_year"),

  fuelType: mysqlEnum("fuel_type", [
    "petrol",
    "electric",
  ]).notNull(),

  odometerKm: int("odometer_km").default(0),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});


export const jobCards = mysqlTable("job_cards", {
  id: int("id").autoincrement().primaryKey(),

  jobCardNumber: varchar("job_card_number", { length: 20 })
    .notNull()
    .unique(),

  uuid: varchar("uuid", { length: 36 })
    .notNull()
    .unique(),

  customerId: int("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  vehicleId: int("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),

  garageId: int("garage_id")
  .notNull()
  .references(() => garages.id),

  serviceType: mysqlEnum("service_type", [
    "regular",     // normal servicing
    "accidental", // accident repair
  ]).notNull(),

  priority: mysqlEnum("priority", [
    "low",
    "normal",
    "high",
  ]).default("normal"),

  source: mysqlEnum("source", [
    "walk_in",
    "pickup",
    "breakdown",
  ]).default("walk_in"),

  // subscriptionId: int("subscription_id"),
  // isSubscriptionApplied: boolean("is_subscription_applied")
  //   .default(false),

  serviceAdvisorId: int("service_advisor_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  // assignedMechanicId: int("assigned_mechanic_id").references(() => users.id, { onDelete: "cascade" }),

  status: mysqlEnum("status", [
    "checked_in",
    "inspection_in_progress",
    "work_in_progress",
    "waiting_for_parts",
    "completed",
    "delivered",
    "cancelled",
  ]).default("checked_in"),

  expectedDeliveryDate: date("expected_delivery_date"),
  actualDeliveryDate: date("actual_delivery_date"),

  // invoiceId: int("invoice_id"),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  closedAt: timestamp("closed_at"),
});



export const inspectionRecords = mysqlTable("inspection_records", {
  id: int("id").autoincrement().primaryKey(),

  jobCardId: int("job_card_id").notNull().references(() => jobCards.id, {onDelete: "cascade"}),

  inspectionType: mysqlEnum("inspection_type", [
    "pre_service",
    "post_service",
  ]).notNull(),


  inspectedById: int("inspected_by_id").notNull().references(() => users.id, {onDelete: "cascade"}),

  odometerKm: int("odometer_km"),

  fuelLevel: mysqlEnum("fuel_level", [
    "empty",
    "low",
    "quarter",
    "half",
    "three_quarter",
    "full",
  ]),

  overallCondition: mysqlEnum("overall_condition", [
    "good",
    "average",
    "poor",
  ]),

  remarks: text("remarks"),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});


export const inspectionPhotos = mysqlTable("inspection_photos", {
  id: int("id").autoincrement().primaryKey(),

  inspectionId: int("inspection_id").notNull().references(() => inspectionRecords.id, {onDelete: "cascade"}),

  photoType: mysqlEnum("photo_type", [
    "before",
    "after",
  ]).notNull(),

  view: mysqlEnum("view", [
    "front",
    "left",
    "right",
    "rear",
    "meter_console",
    "engine",
    "exhaust",
    "damage",
  ]).notNull(),

  imageUrl: varchar("image_url", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});



export const inspectionDamages = mysqlTable("inspection_damages", {
  id: int("id").autoincrement().primaryKey(),

  inspectionId: int("inspection_id").notNull().references(() => inspectionRecords.id, {onDelete: "cascade"}),

  part: mysqlEnum("part", [
    "front_fender",
    "headlamp",
    "left_panel",
    "right_panel",
    "fuel_tank",
    "seat",
    "silencer",
    "alloy_wheel",
    "mirror",
    "indicator",
  ]).notNull(),

  damageType: mysqlEnum("damage_type", [
    "scratch",
    "dent",
    "crack",
    "broken",
  ]).notNull(),

  severity: mysqlEnum("severity", [
    "minor",
    "major",
  ]),

  remarks: text("remarks"),
});


export const inspectionChecklistItems = mysqlTable("inspection_checklist_items", {
  id: int("id").autoincrement().primaryKey(),

  inspectionId: int("inspection_id").notNull().references(() => inspectionRecords.id, {onDelete: "cascade"}),

  item: mysqlEnum("item", [
    "engine_oil",
    "brakes",
    "front_tyre",
    "rear_tyre",
    "chain_sprocket",
    "battery",
    "clutch",
    "accelerator",
    "lights",
    "horn",
    "indicators",
    "self_start",
    "kick_start",
  ]).notNull(),

  status: mysqlEnum("status", [
    "good",
    "needs_attention",
    "replace",
  ]).notNull(),

  remarks: text("remarks"),
});


export const jobCardIssues = mysqlTable("job_card_issues", {
  id: int("id").autoincrement().primaryKey(),

  jobCardId: int("job_card_id").notNull().references(() => jobCards.id, {onDelete: "cascade"}),


  reportedById: int("reported_by_id").references(() => users.id, {onDelete: "cascade"}),

  categoryId: int("category_id")
  .notNull()
  .references(() => serviceCategories.id),

  shortdescription: varchar("short_description", { length: 100 }).notNull(),

  description: text("description").notNull(),

  severity: mysqlEnum("severity", [
    "low",
    "medium",
    "high",
  ]).default("medium"),

  status: mysqlEnum("status", [
    "open",
    "in_progress",
    "resolved",
    "ignored",
  ]).default("open"),

  resolutionNotes: text("resolution_notes"),

  resolvedAt: timestamp("resolved_at"),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});


export const serviceCategories = mysqlTable("service_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
});


export const serviceTasks = mysqlTable("service_tasks", {
  
  id: int("id").autoincrement().primaryKey(),

  jobCardId: int("job_card_id").notNull().references(() => jobCards.id, {onDelete: "cascade"}),

  issueId: int("issue_id").notNull().references(() => jobCardIssues.id, {onDelete: "cascade"}),

  taskType: mysqlEnum("task_type", [
    "labour",
    "add_on"
  ]).notNull(),

  categoryId: int("category_id")
  .notNull()
  .references(() => serviceCategories.id),

  taskName: varchar("task_name", { length: 100 }).notNull(),
  description: text("description"),

  assignedMechanicId: int("assigned_mechanic_id").references(() => users.id, {onDelete: "cascade"}),


  status: mysqlEnum("status", [
    "pending",
    "in_progress",
    "completed",
    "cancelled",
  ]).default("pending"),


  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),


  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})


export const invoices = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),

  uuid: varchar("uuid", { length: 36 }).notNull().unique(),

  invoiceNumber: varchar("invoice_number", { length: 50 }).notNull().unique(),

  jobCardId: int("job_card_id").notNull().references(() => jobCards.id, {onDelete: "cascade"}),

  subtotalAmount: decimal("subtotal_amount", { precision: 10, scale: 2 }).notNull(),

  taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).default("0.00"),

  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});



export const invoiceItems = mysqlTable("invoice_items", {
  id: int("id").autoincrement().primaryKey(),

  invoiceId: int("invoice_id").notNull().references(() => invoices.id, {onDelete: "cascade"}),

  itemType: mysqlEnum("item_type", [
    "labour",
    "part",
    "add_on",
  ]).notNull(),

  partId: int("part_id").references(() => parts.id),

  description: varchar("description", { length: 255 }).notNull(),

  quantity: int("quantity").default(1),

  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),

  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});


export const parts = mysqlTable("parts", {
  id: int("id").autoincrement().primaryKey(),

  uuid: varchar("uuid", { length: 36 }).notNull().unique(),

  name: varchar("name", { length: 150 }).notNull(),

  categoryId: int("category_id")
  .notNull()
  .references(() => serviceCategories.id),

  sellingPrice: decimal("selling_price", {
    precision: 10,
    scale: 2,
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});



export const partsStock = mysqlTable("parts_stock", {
  id: int("id").autoincrement().primaryKey(),

  partId: int("part_id").notNull().references(() => parts.id, { onDelete: "cascade" }),

  garageId: int("garage_id")
  .notNull()
  .references(() => garages.id, { onDelete: "cascade" }),
  
  quantityAvailable: int("quantity_available").default(0),

  reorderLevel: int("reorder_level").default(5),

  updatedAt: timestamp("updated_at").defaultNow(),
});



export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),

  customerId: int("customer_id").notNull().references(() => users.id, {onDelete: "cascade"}),

  planName: varchar("plan_name", { length: 100 }).notNull(),

  totalServices: int("total_services").default(4),

  validFrom: timestamp("valid_from").notNull(),

  validTill: timestamp("valid_till").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});


export const subscriptionUsage = mysqlTable("subscription_usage", {
  id: int("id").autoincrement().primaryKey(),

  subscriptionId: int("subscription_id").notNull().references(() => subscriptions.id, {onDelete: "cascade"}),

  jobCardId: int("job_card_id").notNull().references(() => jobCards.id, {onDelete: "cascade"}),

  serviceDate: timestamp("service_date").defaultNow(),
});


export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),

  invoiceId: int("invoice_id")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }),

  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),

  mode: mysqlEnum("payment_mode", [
    "cash",
    "upi",
    "card",
    "bank_transfer",
  ]).notNull(),

  reference: varchar("reference", { length: 100 }), // UPI ref, txn id

  status: mysqlEnum("status", [
    "success",
    "failed",
    "refunded",
  ]).default("success"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});



export const jobCardStatusHistory = mysqlTable("job_card_status_history", {
  id: int("id").autoincrement().primaryKey(),

  jobCardId: int("job_card_id")
    .notNull()
    .references(() => jobCards.id, { onDelete: "cascade" }),

  fromStatus: mysqlEnum("from_status", [
    "checked_in",
    "inspection_in_progress",
    "work_in_progress",
    "waiting_for_parts",
    "completed",
    "delivered",
    "cancelled",
  ]),

  toStatus: mysqlEnum("to_status", [
    "checked_in",
    "inspection_in_progress",
    "work_in_progress",
    "waiting_for_parts",
    "completed",
    "delivered",
    "cancelled",
  ]).notNull(),

  changedBy: int("changed_by")
    .references(() => users.id),

  reason: varchar("reason", { length: 255 }), // delay, customer request

  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const partsUsage = mysqlTable("parts_usage", {
  id: int("id").autoincrement().primaryKey(),

  partId: int("part_id")
    .notNull()
    .references(() => parts.id),

  serviceTaskId: int("service_task_id")
    .notNull()
    .references(() => serviceTasks.id, { onDelete: "cascade" }),

  quantity: int("quantity").notNull(),

  usedAt: timestamp("used_at").defaultNow().notNull(),
});



export const garages = mysqlTable("garages", {
  id: int("id").autoincrement().primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  address: text("address"),

  isActive: boolean("is_active").default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});



// booking slot

export const serviceBooking = mysqlTable("service_bookings", {
  id: int("id").autoincrement().primaryKey(),

  uuid: varchar("uuid", {length:36}).notNull().unique(),

  customerId:  int("customer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  vehicleId: int("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),
  garageId: int("garage_id").notNull().references(() => garages.id, { onDelete: "cascade" }),
  serviceDate: date("service_date").notNull(),

  status: mysqlEnum("status", [
    "payment_pending",
    "confirmed",
    "expired",
    "cancelled",
    "converted"
  ]).notNull().default("payment_pending"),

  expiresAt: timestamp("expires_at"),

  jobCardId: int("job_card_id").references(() => jobCards.id, {
    onDelete: "set null",
  }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),

})




export const dailyBookingCapacity = mysqlTable(
  "daily_booking_capacity",
  {
    id: int("id").autoincrement().primaryKey(),

    garageId: int("garage_id")
      .notNull()
      .references(() => garages.id, { onDelete: "cascade" }),

    serviceDate: date("service_date").notNull(),

    totalSlots: int("total_slots").notNull(),

    bookedSlots: int("booked_slots").notNull().default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    // One row per garage per date
    uniqueGarageDate: unique().on(table.garageId, table.serviceDate),
  })
);


export const garageCalendar = mysqlTable(
  "garage_calendar",
  {
    id: int("id").autoincrement().primaryKey(),

    garageId: int("garage_id")
      .notNull()
      .references(() => garages.id, { onDelete: "cascade" }),

    calendarDate: date("calendar_date").notNull(),

    isClosed: boolean("is_closed").notNull().default(false),

    totalSlots: int("total_slots"), 
    // nullable → override defaultDailySlots if set

    reason: text("reason"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    // One rule per garage per date
    uniqueGarageDate: unique().on(table.garageId, table.calendarDate),
  })
);



// relationships



export const partsUsageRelations = relations(partsUsage, ({ one }) => ({
  part: one(parts, {
    fields: [partsUsage.partId],
    references: [parts.id],
  }),
  serviceTask: one(serviceTasks, {
    fields: [partsUsage.serviceTaskId],
    references: [serviceTasks.id],
  }),
}));


export const jobCardStatusHistoryRelations = relations(
  jobCardStatusHistory,
  ({ one }) => ({
    jobCard: one(jobCards, {
      fields: [jobCardStatusHistory.jobCardId],
      references: [jobCards.id],
    }),
    changedByUser: one(users, {
      fields: [jobCardStatusHistory.changedBy],
      references: [users.id],
    }),
  })
);



export const paymentsRelations = relations(payments, ({ one }) => ({
  invoice: one(invoices, {
    fields: [payments.invoiceId],
    references: [invoices.id],
  }),
}));


export const usersRelations = relations(users, ({ many }) => ({
  vehicles: many(vehicles),
  sessions: many(sessions),
  userRoles: many(userRoles),
  serviceBooking: many(serviceBooking)
}));


export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
  rolePermissions: many(rolePermissions)
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions)
}));


export const vehicleRelations = relations(vehicles, ({ one, many }) => ({
  customer: one(users, {
    fields: [vehicles.customerId],
    references: [users.id],
  }),
  jobCards: many(jobCards),
}));


export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));


export const jobCardsRelations = relations(jobCards, ({ one, many }) => ({
  customer: one(users, {
    fields: [jobCards.customerId],
    references: [users.id],
  }),
  vehicle: one(vehicles, {
    fields: [jobCards.vehicleId],
    references: [vehicles.id],
  }),
  serviceAdvisor: one(users, {
    fields: [jobCards.serviceAdvisorId],
    references: [users.id],
  }),
  inspections: many(inspectionRecords),
}));


export const inspectionRecordsRelations = relations(inspectionRecords,({ one, many }) => ({
    jobCard: one(jobCards, {
      fields: [inspectionRecords.jobCardId],
      references: [jobCards.id],
    }),
    inspector: one(users, {
      fields: [inspectionRecords.inspectedById],
      references: [users.id],
    }),
    photos: many(inspectionPhotos),
    damages: many(inspectionDamages),
    checklistItems: many(inspectionChecklistItems),
  })
);



export const inspectionPhotosRelations = relations(
  inspectionPhotos,
  ({ one }) => ({
    inspection: one(inspectionRecords, {
      fields: [inspectionPhotos.inspectionId],
      references: [inspectionRecords.id],
    }),
  })
);


export const inspectionDamagesRelations = relations(
  inspectionDamages,
  ({ one }) => ({
    inspection: one(inspectionRecords, {
      fields: [inspectionDamages.inspectionId],
      references: [inspectionRecords.id],
    }),
  })
);


export const inspectionChecklistItemsRelations = relations(
  inspectionChecklistItems,
  ({ one }) => ({
    inspection: one(inspectionRecords, {
      fields: [inspectionChecklistItems.inspectionId],
      references: [inspectionRecords.id],
    }),
  })
);


export const jobCardIssuesRelations = relations( jobCardIssues, ({one}) => ({
  reporter: one(users, {
    fields: [jobCardIssues.reportedById],
     references: [users.id],
  }),
  jobCard: one(jobCards, {
    fields: [jobCardIssues.jobCardId],
    references: [jobCards.id],
  })
}))


export const invoicesRelations = relations(invoices, ({one, many}) => ({
  jobCard: one(jobCards, {
    fields: [invoices.jobCardId],
    references: [jobCards.id]
  }),
  payments: many(payments),
}))


export const serviceCategoryRelaionships = relations(serviceCategories, 
  ({many}) => ({
    jobCardIssues: many(jobCardIssues),
    serviceTasks: many(serviceTasks),
    parts: many(parts),
  }) )