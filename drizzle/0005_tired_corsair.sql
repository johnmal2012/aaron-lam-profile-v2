ALTER TABLE "physician_profile" RENAME COLUMN "expertise" TO "expertises";--> statement-breakpoint
ALTER TABLE "physician_profile" RENAME COLUMN "credential" TO "credentials";--> statement-breakpoint
ALTER TABLE "physician_sections" ADD COLUMN "quote" text;--> statement-breakpoint
ALTER TABLE "physician_sections" ADD COLUMN "highlights" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "physician_sections" ADD COLUMN " message" text;--> statement-breakpoint
ALTER TABLE "physician_sections" ADD COLUMN "hero_facts" jsonb;