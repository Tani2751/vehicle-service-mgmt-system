CREATE TABLE `daily_booking_capacity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`garage_id` int NOT NULL,
	`service_date` date NOT NULL,
	`total_slots` int NOT NULL,
	`booked_slots` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `daily_booking_capacity_id` PRIMARY KEY(`id`),
	CONSTRAINT `daily_booking_capacity_garage_id_service_date_unique` UNIQUE(`garage_id`,`service_date`)
);
--> statement-breakpoint
CREATE TABLE `garage_calendar` (
	`id` int AUTO_INCREMENT NOT NULL,
	`garage_id` int NOT NULL,
	`calendar_date` date NOT NULL,
	`is_closed` boolean NOT NULL DEFAULT false,
	`total_slots` int,
	`reason` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `garage_calendar_id` PRIMARY KEY(`id`),
	CONSTRAINT `garage_calendar_garage_id_calendar_date_unique` UNIQUE(`garage_id`,`calendar_date`)
);
--> statement-breakpoint
CREATE TABLE `garages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`address` text,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `garages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inspection_checklist_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inspection_id` int NOT NULL,
	`item` enum('engine_oil','brakes','front_tyre','rear_tyre','chain_sprocket','battery','clutch','accelerator','lights','horn','indicators','self_start','kick_start') NOT NULL,
	`status` enum('good','needs_attention','replace') NOT NULL,
	`remarks` text,
	CONSTRAINT `inspection_checklist_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inspection_damages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inspection_id` int NOT NULL,
	`part` enum('front_fender','headlamp','left_panel','right_panel','fuel_tank','seat','silencer','alloy_wheel','mirror','indicator') NOT NULL,
	`damage_type` enum('scratch','dent','crack','broken') NOT NULL,
	`severity` enum('minor','major'),
	`remarks` text,
	CONSTRAINT `inspection_damages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inspection_photos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inspection_id` int NOT NULL,
	`photo_type` enum('before','after') NOT NULL,
	`view` enum('front','left','right','rear','meter_console','engine','exhaust','damage') NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `inspection_photos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inspection_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_card_id` int NOT NULL,
	`inspection_type` enum('pre_service','post_service') NOT NULL,
	`inspected_by_id` int NOT NULL,
	`odometer_km` int,
	`fuel_level` enum('empty','low','quarter','half','three_quarter','full'),
	`overall_condition` enum('good','average','poor'),
	`remarks` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inspection_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoice_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`invoice_id` int NOT NULL,
	`item_type` enum('labour','part','add_on') NOT NULL,
	`part_id` int,
	`description` varchar(255) NOT NULL,
	`quantity` int DEFAULT 1,
	`unit_price` decimal(10,2) NOT NULL,
	`total_price` decimal(10,2) NOT NULL,
	CONSTRAINT `invoice_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(36) NOT NULL,
	`invoice_number` varchar(50) NOT NULL,
	`job_card_id` int NOT NULL,
	`subtotal_amount` decimal(10,2) NOT NULL,
	`tax_amount` decimal(10,2) DEFAULT '0.00',
	`total_amount` decimal(10,2) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `invoices_id` PRIMARY KEY(`id`),
	CONSTRAINT `invoices_uuid_unique` UNIQUE(`uuid`),
	CONSTRAINT `invoices_invoice_number_unique` UNIQUE(`invoice_number`)
);
--> statement-breakpoint
CREATE TABLE `job_card_issues` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_card_id` int NOT NULL,
	`reported_by_id` int,
	`category_id` int NOT NULL,
	`short_description` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`severity` enum('low','medium','high') DEFAULT 'medium',
	`status` enum('open','in_progress','resolved','ignored') DEFAULT 'open',
	`resolution_notes` text,
	`resolved_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `job_card_issues_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `job_card_status_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_card_id` int NOT NULL,
	`from_status` enum('checked_in','inspection_in_progress','work_in_progress','waiting_for_parts','completed','delivered','cancelled'),
	`to_status` enum('checked_in','inspection_in_progress','work_in_progress','waiting_for_parts','completed','delivered','cancelled') NOT NULL,
	`changed_by` int,
	`reason` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `job_card_status_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `job_cards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_card_number` varchar(20) NOT NULL,
	`uuid` varchar(36) NOT NULL,
	`customer_id` int NOT NULL,
	`vehicle_id` int NOT NULL,
	`garage_id` int NOT NULL,
	`service_type` enum('regular','accidental') NOT NULL,
	`priority` enum('low','normal','high') DEFAULT 'normal',
	`source` enum('walk_in','pickup','breakdown') DEFAULT 'walk_in',
	`service_advisor_id` int NOT NULL,
	`status` enum('checked_in','inspection_in_progress','work_in_progress','waiting_for_parts','completed','delivered','cancelled') DEFAULT 'checked_in',
	`expected_delivery_date` date,
	`actual_delivery_date` date,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`closed_at` timestamp,
	CONSTRAINT `job_cards_id` PRIMARY KEY(`id`),
	CONSTRAINT `job_cards_job_card_number_unique` UNIQUE(`job_card_number`),
	CONSTRAINT `job_cards_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `parts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(36) NOT NULL,
	`name` varchar(150) NOT NULL,
	`category_id` int NOT NULL,
	`selling_price` decimal(10,2) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `parts_id` PRIMARY KEY(`id`),
	CONSTRAINT `parts_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `parts_stock` (
	`id` int AUTO_INCREMENT NOT NULL,
	`part_id` int NOT NULL,
	`garage_id` int NOT NULL,
	`quantity_available` int DEFAULT 0,
	`reorder_level` int DEFAULT 5,
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `parts_stock_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parts_usage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`part_id` int NOT NULL,
	`service_task_id` int NOT NULL,
	`quantity` int NOT NULL,
	`used_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `parts_usage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`invoice_id` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`payment_mode` enum('cash','upi','card','bank_transfer') NOT NULL,
	`reference` varchar(100),
	`status` enum('success','failed','refunded') DEFAULT 'success',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(255),
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `permissions_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`role_id` int NOT NULL,
	`permission_id` int NOT NULL,
	CONSTRAINT `role_permissions_role_id_permission_id_pk` PRIMARY KEY(`role_id`,`permission_id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `service_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(36) NOT NULL,
	`customer_id` int NOT NULL,
	`vehicle_id` int NOT NULL,
	`garage_id` int NOT NULL,
	`service_date` date NOT NULL,
	`status` enum('payment_pending','confirmed','expired','cancelled','converted') NOT NULL DEFAULT 'payment_pending',
	`expires_at` timestamp,
	`job_card_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `service_bookings_id` PRIMARY KEY(`id`),
	CONSTRAINT `service_bookings_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `service_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	CONSTRAINT `service_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `service_categories_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `service_tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_card_id` int NOT NULL,
	`issue_id` int NOT NULL,
	`task_type` enum('labour','add_on') NOT NULL,
	`category_id` int NOT NULL,
	`task_name` varchar(100) NOT NULL,
	`description` text,
	`assigned_mechanic_id` int,
	`status` enum('pending','in_progress','completed','cancelled') DEFAULT 'pending',
	`started_at` timestamp,
	`completed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `service_tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`valid` boolean NOT NULL DEFAULT true,
	`user_agent` text NOT NULL,
	`ip` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscription_usage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subscription_id` int NOT NULL,
	`job_card_id` int NOT NULL,
	`service_date` timestamp DEFAULT (now()),
	CONSTRAINT `subscription_usage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customer_id` int NOT NULL,
	`plan_name` varchar(100) NOT NULL,
	`total_services` int DEFAULT 4,
	`valid_from` timestamp NOT NULL,
	`valid_till` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_invites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token_hash` varchar(100) NOT NULL,
	`expires_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`used_at` timestamp,
	CONSTRAINT `user_invites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`user_id` int NOT NULL,
	`role_id` int NOT NULL,
	CONSTRAINT `user_roles_user_id_role_id_pk` PRIMARY KEY(`user_id`,`role_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) DEFAULT null,
	`is_email_valid` boolean NOT NULL DEFAULT false,
	`avatar` text,
	`address` text,
	`garage_id` int,
	`phone_number` varchar(20) DEFAULT null,
	`city` text,
	`disabled` boolean NOT NULL DEFAULT false,
	`is_active` boolean NOT NULL DEFAULT false,
	`last_login_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_phone_number_unique` UNIQUE(`phone_number`)
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customer_id` int NOT NULL,
	`vehicle_type` enum('bike','scooter') NOT NULL,
	`registration_number` varchar(20) NOT NULL,
	`make` varchar(50) NOT NULL,
	`model` varchar(50) NOT NULL,
	`variant` varchar(50),
	`manufacture_year` year,
	`fuel_type` enum('petrol','electric') NOT NULL,
	`odometer_km` int DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `vehicles_id` PRIMARY KEY(`id`),
	CONSTRAINT `vehicles_registration_number_unique` UNIQUE(`registration_number`)
);
--> statement-breakpoint
ALTER TABLE `daily_booking_capacity` ADD CONSTRAINT `daily_booking_capacity_garage_id_garages_id_fk` FOREIGN KEY (`garage_id`) REFERENCES `garages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `garage_calendar` ADD CONSTRAINT `garage_calendar_garage_id_garages_id_fk` FOREIGN KEY (`garage_id`) REFERENCES `garages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inspection_checklist_items` ADD CONSTRAINT `inspection_checklist_items_inspection_id_inspection_records_id_fk` FOREIGN KEY (`inspection_id`) REFERENCES `inspection_records`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inspection_damages` ADD CONSTRAINT `inspection_damages_inspection_id_inspection_records_id_fk` FOREIGN KEY (`inspection_id`) REFERENCES `inspection_records`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inspection_photos` ADD CONSTRAINT `inspection_photos_inspection_id_inspection_records_id_fk` FOREIGN KEY (`inspection_id`) REFERENCES `inspection_records`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inspection_records` ADD CONSTRAINT `inspection_records_job_card_id_job_cards_id_fk` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inspection_records` ADD CONSTRAINT `inspection_records_inspected_by_id_users_id_fk` FOREIGN KEY (`inspected_by_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `invoice_items` ADD CONSTRAINT `invoice_items_invoice_id_invoices_id_fk` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `invoice_items` ADD CONSTRAINT `invoice_items_part_id_parts_id_fk` FOREIGN KEY (`part_id`) REFERENCES `parts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_job_card_id_job_cards_id_fk` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_card_issues` ADD CONSTRAINT `job_card_issues_job_card_id_job_cards_id_fk` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_card_issues` ADD CONSTRAINT `job_card_issues_reported_by_id_users_id_fk` FOREIGN KEY (`reported_by_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_card_issues` ADD CONSTRAINT `job_card_issues_category_id_service_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_card_status_history` ADD CONSTRAINT `job_card_status_history_job_card_id_job_cards_id_fk` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_card_status_history` ADD CONSTRAINT `job_card_status_history_changed_by_users_id_fk` FOREIGN KEY (`changed_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_cards` ADD CONSTRAINT `job_cards_customer_id_users_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_cards` ADD CONSTRAINT `job_cards_vehicle_id_vehicles_id_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_cards` ADD CONSTRAINT `job_cards_garage_id_garages_id_fk` FOREIGN KEY (`garage_id`) REFERENCES `garages`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_cards` ADD CONSTRAINT `job_cards_service_advisor_id_users_id_fk` FOREIGN KEY (`service_advisor_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parts` ADD CONSTRAINT `parts_category_id_service_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parts_stock` ADD CONSTRAINT `parts_stock_part_id_parts_id_fk` FOREIGN KEY (`part_id`) REFERENCES `parts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parts_stock` ADD CONSTRAINT `parts_stock_garage_id_garages_id_fk` FOREIGN KEY (`garage_id`) REFERENCES `garages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parts_usage` ADD CONSTRAINT `parts_usage_part_id_parts_id_fk` FOREIGN KEY (`part_id`) REFERENCES `parts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parts_usage` ADD CONSTRAINT `parts_usage_service_task_id_service_tasks_id_fk` FOREIGN KEY (`service_task_id`) REFERENCES `service_tasks`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_invoice_id_invoices_id_fk` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_permissions_id_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_bookings` ADD CONSTRAINT `service_bookings_customer_id_users_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_bookings` ADD CONSTRAINT `service_bookings_vehicle_id_vehicles_id_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_bookings` ADD CONSTRAINT `service_bookings_garage_id_garages_id_fk` FOREIGN KEY (`garage_id`) REFERENCES `garages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_bookings` ADD CONSTRAINT `service_bookings_job_card_id_job_cards_id_fk` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_tasks` ADD CONSTRAINT `service_tasks_job_card_id_job_cards_id_fk` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_tasks` ADD CONSTRAINT `service_tasks_issue_id_job_card_issues_id_fk` FOREIGN KEY (`issue_id`) REFERENCES `job_card_issues`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_tasks` ADD CONSTRAINT `service_tasks_category_id_service_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_tasks` ADD CONSTRAINT `service_tasks_assigned_mechanic_id_users_id_fk` FOREIGN KEY (`assigned_mechanic_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscription_usage` ADD CONSTRAINT `subscription_usage_subscription_id_subscriptions_id_fk` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscription_usage` ADD CONSTRAINT `subscription_usage_job_card_id_job_cards_id_fk` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_customer_id_users_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_invites` ADD CONSTRAINT `user_invites_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_garage_id_garages_id_fk` FOREIGN KEY (`garage_id`) REFERENCES `garages`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_customer_id_users_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;