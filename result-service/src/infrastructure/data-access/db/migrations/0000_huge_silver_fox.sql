
CREATE TABLE "analysis_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"process_id" uuid,
	"review_id" text,
	"review" text,
	"sentiment" text,
	"score" integer,
	"remarks" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
