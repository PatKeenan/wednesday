ALTER TABLE "mid-week-gc_score" ADD COLUMN "drive" varchar(256);--> statement-breakpoint
ALTER TABLE "mid-week-gc_score" DROP COLUMN IF EXISTS "name";