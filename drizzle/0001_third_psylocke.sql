ALTER TABLE "physician_profile" ADD COLUMN "clinics" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "physician_profile" DROP COLUMN "clinic_name";--> statement-breakpoint
ALTER TABLE "physician_profile" DROP COLUMN "clinic_address";