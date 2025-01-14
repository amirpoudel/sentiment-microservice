CREATE TABLE "process_reviews" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"is_process_from_file" boolean,
	"is_bulk_process" boolean,
	"total_process_count" integer,
	"total_input_length" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
