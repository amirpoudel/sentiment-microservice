CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"bulk_process_id" uuid NOT NULL,
	"user_id" uuid,
	"title" text NOT NULL,
	"sentiment" text NOT NULL,
	"score" integer,
	"remarks" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
