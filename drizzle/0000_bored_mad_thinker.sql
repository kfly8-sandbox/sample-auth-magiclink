CREATE SCHEMA "private";
--> statement-breakpoint
CREATE TABLE "private"."email_verification_tokens" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"hashed_authorization_token" varchar(255) NOT NULL,
	"hashed_short_authorization_code" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"expired_at" timestamp NOT NULL,
	"verified_count" integer DEFAULT 0 NOT NULL,
	"last_verified_at" timestamp,
	"device_fingerprint_hash" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "private"."refresh_tokens" (
	"id" uuid PRIMARY KEY NOT NULL,
	"hashed_refresh_token" varchar(255) NOT NULL,
	"expired_at" timestamp NOT NULL,
	"user_id" uuid NOT NULL,
	"rotation_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "private"."sensitive_users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"email" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_devices" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"device_fingerprint_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"icon_url" varchar(255),
	"biography" text,
	"language" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "private"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "private"."sensitive_users" ADD CONSTRAINT "sensitive_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_devices" ADD CONSTRAINT "user_devices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "email_authorization_token_unique_index" ON "private"."email_verification_tokens" USING btree ("email","hashed_authorization_token");--> statement-breakpoint
CREATE UNIQUE INDEX "email_short_authorization_code_unique_index" ON "private"."email_verification_tokens" USING btree ("email","hashed_short_authorization_code");--> statement-breakpoint
CREATE INDEX "email_verification_tokens_expired_at_index" ON "private"."email_verification_tokens" USING btree ("expired_at");--> statement-breakpoint
CREATE UNIQUE INDEX "refresh_tokens_hashed_refresh_token_unique_index" ON "private"."refresh_tokens" USING btree ("hashed_refresh_token");--> statement-breakpoint
CREATE INDEX "refresh_tokens_expired_at_index" ON "private"."refresh_tokens" USING btree ("expired_at");--> statement-breakpoint
CREATE UNIQUE INDEX "user_unique_index" ON "private"."sensitive_users" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "email_unique_index" ON "private"."sensitive_users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "user_device_unique_index" ON "user_devices" USING btree ("user_id","device_fingerprint_hash");