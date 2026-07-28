ALTER TABLE "physician_sections" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "physician_sections" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "physician_profile" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "physician_profile" ADD COLUMN "deleted_at" timestamp;