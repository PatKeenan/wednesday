ALTER TABLE "mid-week-gc_score" ALTER COLUMN "score" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "mid-week-gc_score" ADD COLUMN "putts" integer;--> statement-breakpoint
ALTER TABLE "mid-week-gc_score" ADD COLUMN "name" varchar(256);--> statement-breakpoint
ALTER TABLE "mid-week-gc_score" ADD COLUMN "meta" jsonb;