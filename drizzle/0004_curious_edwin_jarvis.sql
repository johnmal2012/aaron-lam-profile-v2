ALTER TABLE "physician_profile" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "physician_profile" ADD CONSTRAINT "physician_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "physician_profile_user_id_idx" ON "physician_profile" USING btree ("user_id");