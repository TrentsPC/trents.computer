CREATE TABLE "cinema_added_by" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"person_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cinema_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"tmdb_id" integer NOT NULL,
	"media_type" text NOT NULL,
	"title" text NOT NULL,
	"year" text,
	"poster_path" text,
	"genres" text[] DEFAULT '{}' NOT NULL,
	"content_rating" text,
	"content_rating_detail" text,
	"overview" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cinema_added_by" ADD CONSTRAINT "cinema_added_by_item_id_cinema_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."cinema_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "cinema_added_by_unique" ON "cinema_added_by" USING btree ("item_id","person_name");--> statement-breakpoint
CREATE UNIQUE INDEX "cinema_items_tmdb_unique" ON "cinema_items" USING btree ("tmdb_id","media_type");