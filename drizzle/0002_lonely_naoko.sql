ALTER TABLE "private"."email_verification_tokens" RENAME COLUMN "email" TO "hashedEmail";--> statement-breakpoint
ALTER TABLE "private"."sensitive_users" RENAME COLUMN "email" TO "hashed_email";--> statement-breakpoint
DROP INDEX "private"."email_authorization_token_unique_index";--> statement-breakpoint
DROP INDEX "private"."email_unique_index";--> statement-breakpoint
DROP INDEX "private"."email_short_authorization_code_unique_index";--> statement-breakpoint
ALTER TABLE "private"."email_verification_tokens" ADD COLUMN "encrypted_email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "private"."sensitive_users" ADD COLUMN "encrypted_email" varchar(255) NOT NULL;--> statement-breakpoint
CREATE INDEX "email_verification_tokens_device_fingerprint_hash_index" ON "private"."email_verification_tokens" USING btree ("device_fingerprint_hash");--> statement-breakpoint
CREATE UNIQUE INDEX "hashed_email_unique_index" ON "private"."sensitive_users" USING btree ("hashed_email");--> statement-breakpoint
CREATE UNIQUE INDEX "email_short_authorization_code_unique_index" ON "private"."email_verification_tokens" USING btree ("hashedEmail","hashed_short_authorization_code");--> statement-breakpoint
ALTER TABLE "private"."email_verification_tokens" DROP COLUMN "hashed_authorization_token";