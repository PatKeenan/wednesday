ALTER TABLE "mid-week-gc_score" DROP CONSTRAINT "mid-week-gc_score_golfer_mid-week-gc_golfer_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "score_golfer_idx";--> statement-breakpoint
ALTER TABLE "mid-week-gc_score" ADD COLUMN "golferId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_score" ADD CONSTRAINT "mid-week-gc_score_golferId_mid-week-gc_golfer_id_fk" FOREIGN KEY ("golferId") REFERENCES "public"."mid-week-gc_golfer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "score_golfer_idx" ON "mid-week-gc_score" ("golferId");--> statement-breakpoint
ALTER TABLE "mid-week-gc_score" DROP COLUMN IF EXISTS "golfer";