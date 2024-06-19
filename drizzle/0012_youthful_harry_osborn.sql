DO $$ BEGIN
 ALTER TABLE "mid-week-gc_score" ADD CONSTRAINT "mid-week-gc_score_holeId_mid-week-gc_hole_id_fk" FOREIGN KEY ("holeId") REFERENCES "public"."mid-week-gc_hole"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_score" ADD CONSTRAINT "mid-week-gc_score_roundId_mid-week-gc_round_id_fk" FOREIGN KEY ("roundId") REFERENCES "public"."mid-week-gc_round"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mid-week-gc_score" ADD CONSTRAINT "mid-week-gc_score_golferId_mid-week-gc_golfer_id_fk" FOREIGN KEY ("golferId") REFERENCES "public"."mid-week-gc_golfer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
