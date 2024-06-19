ALTER TABLE "mid-week-gc_score" ADD COLUMN "strokes" integer;--> statement-breakpoint
ALTER TABLE "mid-week-gc_score" DROP COLUMN IF EXISTS "score";