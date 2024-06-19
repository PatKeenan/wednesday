ALTER TABLE "mid-week-gc_score" DROP CONSTRAINT "mid-week-gc_score_holeId_mid-week-gc_hole_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_score" ADD CONSTRAINT "mid-week-gc_score_holeId_mid-week-gc_hole_id_fk" FOREIGN KEY ("holeId") REFERENCES "public"."mid-week-gc_hole"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
